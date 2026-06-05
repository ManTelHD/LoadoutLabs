(function () {
  const STYLE_ID = "loadout-filter-fix-style";
  const HIDDEN_CLASS = "filter-hidden";
  const state = { meta: null, timer: 0, reinforce: 0 };

  const labels = {
    de: { of: "von", shown: "Meta-Waffen angezeigt" },
    en: { of: "of", shown: "meta weapons shown" },
  };

  function lang() {
    return localStorage.getItem("loadoutLabLang") === "en" || document.documentElement.lang === "en" ? "en" : "de";
  }

  function text(value) {
    return String(value || "").toLowerCase();
  }

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = `
      body #loadoutGrid .loadout-card.${HIDDEN_CLASS},
      body #loadoutGrid .tier-group.${HIDDEN_CLASS},
      body #loadoutGrid .meta-tier-heading.${HIDDEN_CLASS} {
        display: none !important;
      }
    `;
  }

  function versionedUrl(path) {
    const url = new URL(path, window.location.href);
    url.searchParams.set("fresh", window.__loadoutLabMetaVersion || String(Date.now()));
    url.searchParams.set("t", String(Date.now()));
    return url.toString();
  }

  async function loadMeta() {
    if (state.meta) return state.meta;
    const response = await fetch(versionedUrl("data/wzstats-meta.json"), { cache: "no-store" });
    if (!response.ok) throw new Error(`Meta HTTP ${response.status}`);
    state.meta = await response.json();
    return state.meta;
  }

  function currentList() {
    if (!state.meta) return null;
    const active = document.querySelector(".secondary-mode-switch .mode-button.active")?.dataset.mode;
    return active === "bo7-ranked" ? state.meta.bo7Ranked : state.meta.warzoneRanked;
  }

  function itemMap(list) {
    return new Map((list?.items || []).map((item) => [item.name, item]));
  }

  function activeFilter() {
    const active = document.querySelector("#filterToolbar .filter-button.active[data-smart-filter]");
    return active?.dataset.smartFilter || "all";
  }

  function rankFromCard(card) {
    const ownText = card.querySelector(".rank-badge")?.childNodes?.[0]?.textContent || card.querySelector(".rank-badge")?.textContent || "";
    return Number((ownText.match(/\d+/) || [])[0]) || 9999;
  }

  function tierFromCard(card) {
    const badge = text(card.querySelector(".rank-badge span")?.textContent || "");
    const classes = text(card.className);
    if (badge.includes("a-tier") || classes.includes("tier-card-a")) return "A";
    if (badge.includes("b-tier") || classes.includes("tier-card-b")) return "B";
    if (badge.includes("c-tier") || classes.includes("tier-card-c")) return "C";
    if (badge.includes("d-tier") || classes.includes("tier-card-d")) return "D";
    if (badge.includes("meta") || badge.includes("legendaer") || badge.includes("legendary") || classes.includes("tier-card-meta")) return "META";
    return "";
  }

  function cardRoleFallback(card) {
    const content = text(card?.textContent);
    const match = content.match(/rolle\s*(long range|close range|langstrecke|kurzstrecke|sniper|scharfschuetze|scharfschutze)/);
    return match ? match[1] : "";
  }

  function roleFromCard(card) {
    return card.querySelector(".stat-row strong")?.textContent || cardRoleFallback(card);
  }

  function domItem(card) {
    return {
      position: rankFromCard(card),
      tier: tierFromCard(card),
      role: roleFromCard(card),
      weaponClass: card.querySelector(".mode-pill")?.textContent || "",
      attachments: card.querySelectorAll(".loadout-slot:not(.placeholder-slot), .attachment-list li").length ? ["dom"] : [],
    };
  }

  function hasVerifiedAttachments(item, card) {
    if (Array.isArray(item?.attachments) && item.attachments.length) return true;
    const content = text(card?.textContent);
    if (content.includes("keine gepr") || content.includes("no verified")) return false;
    return (card?.querySelectorAll(".loadout-slot:not(.placeholder-slot), .attachment-list li") || []).length > 0;
  }

  function roleBucket(item, card) {
    const direct = [item?.role, item?.roleLabel, item?.category, item?.rangeLabel, card?.dataset?.role]
      .filter(Boolean)
      .join(" ");
    return text(direct || cardRoleFallback(card));
  }

  function matchesFilter(filter, item, card) {
    if (!item) return true;
    const role = roleBucket(item, card);
    const weaponClass = text(item.weaponClass);
    if (filter === "top10") return Number(item.position) <= 10;
    if (filter === "meta") return item.tier === "META";
    if (filter === "a") return item.tier === "A";
    if (filter === "b") return item.tier === "B";
    if (filter === "long") return role.includes("long range") || role.includes("langstrecke");
    if (filter === "close") return role.includes("close range") || role.includes("kurzstrecke");
    if (filter === "sniper") return /sniper|scharfsch|marksman/.test(role) || /sniper|marksman/.test(weaponClass);
    if (filter === "hasBuild") return hasVerifiedAttachments(item, card);
    if (filter === "noBuild") return !hasVerifiedAttachments(item, card);
    return true;
  }

  function isCardVisible(card) {
    return !card.classList.contains(HIDDEN_CLASS);
  }

  function syncTierVisibility(grid) {
    grid.querySelectorAll(".tier-group").forEach((group) => {
      const hasVisible = [...group.querySelectorAll(".loadout-card")].some(isCardVisible);
      group.classList.toggle(HIDDEN_CLASS, !hasVisible);
    });

    grid.querySelectorAll(".meta-tier-heading").forEach((heading) => {
      let hasVisible = false;
      let node = heading.nextElementSibling;
      while (node && !node.classList.contains("meta-tier-heading")) {
        if (node.classList.contains("loadout-card") && isCardVisible(node)) {
          hasVisible = true;
          break;
        }
        node = node.nextElementSibling;
      }
      heading.classList.toggle(HIDDEN_CLASS, !hasVisible);
    });
  }

  function updateCount(visible, total) {
    const count = document.getElementById("resultCount");
    if (!count) return;
    const copy = labels[lang()] || labels.de;
    count.textContent = `${visible} ${copy.of} ${total} ${copy.shown}`;
  }

  function applyFilter() {
    const grid = document.getElementById("loadoutGrid");
    if (!grid) return;

    const cards = [...grid.querySelectorAll(".loadout-card")];
    const list = currentList();
    const filter = activeFilter();
    const byName = itemMap(list);
    const total = list?.items?.length || cards.length;
    let visible = 0;

    cards.forEach((card) => {
      const item = byName.get(card.dataset.loadoutCard || "") || domItem(card);
      const show = matchesFilter(filter, item, card);
      card.classList.toggle(HIDDEN_CLASS, !show);
      card.hidden = false;
      card.style.display = "";
      if (show) visible += 1;
    });

    syncTierVisibility(grid);
    updateCount(visible, total);
    window.__loadoutFilterFixLast = { filter, visible, total, at: Date.now() };
  }

  function safeApply() {
    try {
      applyFilter();
    } catch (error) {
      window.__loadoutFilterFixError = String(error && (error.stack || error.message) || error);
      console.warn("Loadout Filter konnte nicht angewendet werden", error);
    }
  }

  function reinforce(duration = 2200) {
    window.clearInterval(state.reinforce);
    const end = Date.now() + duration;
    state.reinforce = window.setInterval(() => {
      safeApply();
      if (Date.now() >= end) window.clearInterval(state.reinforce);
    }, 80);
  }

  function schedule(delay = 80) {
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(safeApply, delay);
  }

  function handleFilterClick(event) {
    const button = event.target.closest("#filterToolbar .filter-button[data-smart-filter]");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    document.querySelectorAll("#filterToolbar .filter-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    safeApply();
    queueMicrotask(safeApply);
    requestAnimationFrame(safeApply);
    schedule(20);
    reinforce();
  }

  function bindEvents() {
    if (window.__loadoutFilterFixReady) return;
    window.__loadoutFilterFixReady = true;
    window.__loadoutFilterFixApply = safeApply;

    window.addEventListener("click", handleFilterClick, true);
    document.addEventListener("click", handleFilterClick, true);

    document.addEventListener("input", (event) => {
      if (event.target.closest("#loadoutSearch")) { window.setTimeout(safeApply, 120); reinforce(1200); }
    }, true);

    document.addEventListener("change", (event) => {
      if (event.target.closest("#sortSelect")) { window.setTimeout(safeApply, 120); reinforce(1200); }
    }, true);

    document.addEventListener("click", (event) => {
      if (event.target.closest(".secondary-mode-switch .mode-button, .content-tab[data-tab='weapons'], [data-language]")) {
        window.setTimeout(safeApply, 180);
        window.setTimeout(safeApply, 480);
      }
    }, true);

    const observer = new MutationObserver(() => schedule(100));
    const watch = () => {
      const grid = document.getElementById("loadoutGrid");
      if (!grid || grid.dataset.filterFixObserved) return;
      grid.dataset.filterFixObserved = "true";
      observer.observe(grid, { childList: true, subtree: true });
    };
    watch();
    window.setTimeout(watch, 500);
  }

  async function init() {
    installStyle();
    bindEvents();
    try { await loadMeta(); } catch (error) { console.warn("Loadout filter meta konnte nicht geladen werden", error); }
    schedule(180);
    window.setTimeout(safeApply, 700);
    window.setTimeout(safeApply, 1600);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
