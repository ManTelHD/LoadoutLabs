(function () {
  const STYLE_ID = "loadout-lab-upgrades-style";
  const DATA_VERSION = () => window.__loadoutLabMetaVersion || String(Date.now());
  const state = {
    lang: localStorage.getItem("loadoutLabLang") || "de",
    smartFilter: "all",
    meta: null,
  };

  const copy = {
    de: {
      navTier: "Tierlist",
      navMw4: "MW4",
      navUpdates: "Updates",
      eyebrow: "Meta Tierlist",
      title: "Warzone Ranked Meta Tierlist",
      description: "Suche nach BO7-Waffen, Klasse oder Rolle. Die Liste gruppiert Builds nach Meta-Stufe und zeigt Score, Rolle und Aufsaetze.",
      updated: "Aktualisiert",
      search: "Suche",
      placeholder: "z. B. AK-27, Kogot-7, Ranked",
      sort: "Sortieren",
      score: "Meta Score",
      pick: "Pick-Rate",
      name: "Name",
      range: "Reichweite",
      weaponsTab: "Meta Waffen",
      maps: "Maps",
      warzone: "Warzone Meta",
      bo7: "Black Ops 7 Meta",
      updates: "Updates",
      mw4: "MW4",
      season: "Season 4",
      updateKicker: "News",
      mw4Kicker: "Geruechte",
      seasonKicker: "Neu",
      statusActive: "Auto-Update aktiv",
      lastCheck: "Letzter Check",
      source: "Quelle",
      weapons: "Waffen",
      sourceUpdated: "WZStats Stand",
      shown: "Meta-Waffen angezeigt",
      of: "von",
      role: "Rolle",
      attachments: "Aufsaetze",
      classCode: "Klassen-Code",
      close: "Schliessen",
      details: "Details",
      legendary: "Legendaer",
      emptyTitle: "Keine Meta-Waffe gefunden",
      emptyText: "Versuch einen anderen Suchbegriff oder wechsel den Filter.",
      filters: {
        all: "Alle",
        top10: "Top 10",
        meta: "Absolute Meta",
        a: "A-Tier",
        b: "B-Tier",
        long: "Long Range",
        close: "Close Range",
        sniper: "Sniper",
        hasBuild: "Mit Aufsaetzen",
        noBuild: "Ohne Aufsaetze",
      },
    },
    en: {
      navTier: "Tier List",
      navMw4: "MW4",
      navUpdates: "Updates",
      eyebrow: "Meta Tier List",
      title: "Warzone Ranked Meta Tier List",
      description: "Search BO7 weapons, classes, or roles. The list groups builds by meta tier and shows score, role, and attachments.",
      updated: "Updated",
      search: "Search",
      placeholder: "e.g. AK-27, Kogot-7, Ranked",
      sort: "Sort",
      score: "Meta Score",
      pick: "Pick Rate",
      name: "Name",
      range: "Range",
      weaponsTab: "Meta Weapons",
      maps: "Maps",
      warzone: "Warzone Meta",
      bo7: "Black Ops 7 Meta",
      updates: "Updates",
      mw4: "MW4",
      season: "Season 4",
      updateKicker: "News",
      mw4Kicker: "Rumors",
      seasonKicker: "New",
      statusActive: "Auto update active",
      lastCheck: "Last check",
      source: "Source",
      weapons: "Weapons",
      sourceUpdated: "WZStats updated",
      shown: "meta weapons shown",
      of: "of",
      role: "Role",
      attachments: "Attachments",
      classCode: "Class Code",
      close: "Close",
      details: "Details",
      legendary: "Legendary",
      emptyTitle: "No meta weapon found",
      emptyText: "Try another search term or switch filters.",
      filters: {
        all: "All",
        top10: "Top 10",
        meta: "Absolute Meta",
        a: "A-Tier",
        b: "B-Tier",
        long: "Long Range",
        close: "Close Range",
        sniper: "Sniper",
        hasBuild: "With Attachments",
        noBuild: "No Attachments",
      },
    },
  };

  const filterConfig = [
    { key: "all", native: "all", accent: "neutral" },
    { key: "top10", native: "all", accent: "gold" },
    { key: "meta", native: "all", accent: "gold" },
    { key: "a", native: "all", accent: "violet" },
    { key: "b", native: "all", accent: "blue" },
    { key: "long", native: "long", accent: "neutral" },
    { key: "close", native: "close", accent: "neutral" },
    { key: "sniper", native: "sniper", accent: "neutral" },
    { key: "hasBuild", native: "all", accent: "green" },
    { key: "noBuild", native: "all", accent: "muted" },
  ];

  const css = `
    body .site-actions {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.45rem !important;
      margin-left: auto !important;
    }

    body .language-switch {
      display: inline-grid !important;
      grid-template-columns: repeat(2, minmax(2.3rem, 1fr)) !important;
      gap: 0.18rem !important;
      padding: 0.18rem !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 999px !important;
      background: rgba(7, 10, 14, 0.64) !important;
    }

    body .language-switch button {
      min-height: 2rem !important;
      border: 0 !important;
      border-radius: 999px !important;
      padding: 0.25rem 0.62rem !important;
      background: transparent !important;
      color: rgba(220, 229, 239, 0.68) !important;
      font: 900 0.74rem Inter, system-ui, sans-serif !important;
      cursor: pointer !important;
    }

    body .language-switch button.active {
      background: linear-gradient(135deg, #b9ff3d, #25e66f) !important;
      color: #061008 !important;
      box-shadow: 0 0.55rem 1.2rem rgba(37, 230, 111, 0.22) !important;
    }

    body .auto-update-status {
      display: grid !important;
      grid-template-columns: auto 1fr auto !important;
      align-items: center !important;
      gap: 0.75rem !important;
      max-width: min(82rem, 100%) !important;
      margin: 0 0 0.65rem !important;
      padding: 0.62rem 0.8rem !important;
      border: 1px solid rgba(185, 255, 61, 0.22) !important;
      border-radius: 0.48rem !important;
      background: linear-gradient(135deg, rgba(185, 255, 61, 0.105), rgba(11, 17, 22, 0.88) 42%, rgba(8, 12, 17, 0.96)) !important;
      box-shadow: 0 0.8rem 1.65rem rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
    }

    body .auto-update-status .status-main {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.45rem !important;
      color: #b9ff3d !important;
      font-weight: 950 !important;
      white-space: nowrap !important;
    }

    body .auto-update-status .status-dot {
      width: 0.55rem !important;
      height: 0.55rem !important;
      border-radius: 999px !important;
      background: #25e66f !important;
      box-shadow: 0 0 0 0.22rem rgba(37, 230, 111, 0.14), 0 0 1rem rgba(37, 230, 111, 0.38) !important;
    }

    body .auto-update-status .status-meta {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.35rem 0.75rem !important;
      min-width: 0 !important;
      color: rgba(222, 232, 242, 0.76) !important;
      font-size: 0.78rem !important;
      font-weight: 800 !important;
    }

    body .auto-update-status .status-meta strong,
    body .auto-update-status .status-count {
      color: #f8fbff !important;
      font-weight: 950 !important;
    }

    body .toolbar.enhanced-filter-toolbar {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.45rem !important;
      padding: 0.44rem !important;
      border: 1px solid rgba(255, 255, 255, 0.095) !important;
      border-radius: 0.5rem !important;
      background: rgba(7, 10, 14, 0.58) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body .toolbar.enhanced-filter-toolbar .filter-button {
      min-height: 2.25rem !important;
      border: 1px solid rgba(255, 255, 255, 0.105) !important;
      border-radius: 999px !important;
      padding: 0.42rem 0.82rem !important;
      background: rgba(13, 19, 27, 0.78) !important;
      color: rgba(238, 244, 250, 0.9) !important;
      font-weight: 900 !important;
      cursor: pointer !important;
    }

    body .toolbar.enhanced-filter-toolbar .filter-button[data-accent="gold"] { border-color: rgba(255, 211, 90, 0.32) !important; color: #ffd35a !important; }
    body .toolbar.enhanced-filter-toolbar .filter-button[data-accent="violet"] { border-color: rgba(176, 140, 255, 0.35) !important; color: #c4a8ff !important; }
    body .toolbar.enhanced-filter-toolbar .filter-button[data-accent="blue"] { border-color: rgba(53, 215, 255, 0.35) !important; color: #6de4ff !important; }
    body .toolbar.enhanced-filter-toolbar .filter-button[data-accent="green"] { border-color: rgba(41, 230, 129, 0.35) !important; color: #7dffad !important; }
    body .toolbar.enhanced-filter-toolbar .filter-button[data-accent="muted"] { color: rgba(209, 218, 228, 0.72) !important; }

    body .toolbar.enhanced-filter-toolbar .filter-button.active {
      border-color: rgba(185, 255, 61, 0.94) !important;
      background: linear-gradient(135deg, #b9ff3d 0%, #66f244 45%, #24e66f 100%) !important;
      color: #051007 !important;
      box-shadow: 0 0.5rem 1.2rem rgba(42, 239, 111, 0.22) !important;
    }

    @media (max-width: 720px) {
      body .site-actions {
        width: 100% !important;
        justify-content: flex-end !important;
      }

      body .auto-update-status {
        grid-template-columns: 1fr !important;
        gap: 0.45rem !important;
      }

      body .auto-update-status .status-count {
        justify-self: start !important;
      }
    }
  `;

  function t() {
    return copy[state.lang] || copy.de;
  }

  function html(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
  }

  function versionedUrl(path) {
    const url = new URL(path, window.location.href);
    url.searchParams.set("fresh", DATA_VERSION());
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
    const meta = state.meta;
    if (!meta) return null;
    const active = document.querySelector(".secondary-mode-switch .mode-button.active")?.dataset.mode;
    return active === "bo7-ranked" ? meta.bo7Ranked : meta.warzoneRanked;
  }

  function installLanguageSwitch() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    let actions = header.querySelector(".site-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "site-actions";
      header.appendChild(actions);
    }
    if (!actions.querySelector(".language-switch")) {
      actions.insertAdjacentHTML("beforeend", `
        <div class="language-switch" aria-label="Sprache auswaehlen">
          <button type="button" data-language="de">DE</button>
          <button type="button" data-language="en">EN</button>
        </div>
      `);
    }
    actions.querySelectorAll("[data-language]").forEach((button) => {
      button.classList.toggle("active", button.dataset.language === state.lang);
      button.setAttribute("aria-pressed", button.dataset.language === state.lang ? "true" : "false");
    });
  }

  function renderStatus() {
    const section = document.querySelector("#loadouts .section-heading");
    const list = currentList();
    if (!section || !state.meta || !list) return;
    let status = document.getElementById("autoUpdateStatus");
    if (!status) {
      status = document.createElement("div");
      status.id = "autoUpdateStatus";
      status.className = "auto-update-status";
      section.insertAdjacentElement("afterend", status);
    }

    const labels = t();
    const generated = state.meta.generatedAtLabel || "-";
    const sourceUpdated = list.sourceUpdatedAt ? new Date(list.sourceUpdatedAt).toLocaleString(state.lang === "en" ? "en-US" : "de-DE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Berlin",
    }) : "-";

    status.innerHTML = `
      <span class="status-main"><i class="status-dot" aria-hidden="true"></i>${html(labels.statusActive)}</span>
      <span class="status-meta">
        <span>${html(labels.lastCheck)}: <strong>${html(generated)}</strong></span>
        <span>${html(labels.source)}: <strong>WZStats</strong></span>
        <span>${html(labels.sourceUpdated)}: <strong>${html(sourceUpdated)}</strong></span>
      </span>
      <strong class="status-count">${list.items.length} ${html(labels.weapons)}</strong>
    `;

    const note = document.querySelector(".updated-note");
    if (note) note.textContent = `${labels.updated}: ${generated}`;
  }

  function renderToolbar() {
    const toolbar = document.getElementById("filterToolbar");
    if (!toolbar) return;
    const labels = t().filters;
    toolbar.classList.add("enhanced-filter-toolbar");
    toolbar.innerHTML = filterConfig.map((filter) => `
      <button class="filter-button${state.smartFilter === filter.key ? " active" : ""}" type="button" data-filter="${filter.native}" data-smart-filter="${filter.key}" data-accent="${filter.accent}">
        ${html(labels[filter.key])}
      </button>
    `).join("");
  }

  function applyLanguage() {
    const labels = t();
    document.documentElement.lang = state.lang;
    document.querySelector('.top-nav a[href="#loadouts"]') && (document.querySelector('.top-nav a[href="#loadouts"]').textContent = labels.navTier);
    document.querySelector('.top-nav a[href="#intel"]') && (document.querySelector('.top-nav a[href="#intel"]').textContent = labels.navMw4);
    document.querySelector('.top-nav a[href="#updates"]') && (document.querySelector('.top-nav a[href="#updates"]').textContent = labels.navUpdates);
    document.querySelector(".section-heading .eyebrow") && (document.querySelector(".section-heading .eyebrow").textContent = labels.eyebrow);
    document.getElementById("tierTitle") && (document.getElementById("tierTitle").textContent = labels.title);
    document.getElementById("tierDescription") && (document.getElementById("tierDescription").textContent = labels.description);
    document.querySelector('.search-box span') && (document.querySelector('.search-box span').textContent = labels.search);
    document.getElementById("loadoutSearch") && (document.getElementById("loadoutSearch").placeholder = labels.placeholder);
    document.querySelector('.select-box span') && (document.querySelector('.select-box span').textContent = labels.sort);

    const options = document.querySelectorAll("#sortSelect option");
    if (options[0]) options[0].textContent = labels.score;
    if (options[1]) options[1].textContent = labels.pick;
    if (options[2]) options[2].textContent = labels.name;
    if (options[3]) options[3].textContent = labels.range;

    const primary = {
      updates: [labels.updates, labels.updateKicker],
      "mw4-info": [labels.mw4, labels.mw4Kicker],
      "season4-info": [labels.season, labels.seasonKicker],
    };
    Object.entries(primary).forEach(([mode, values]) => {
      const button = document.querySelector(`.primary-mode-switch .mode-button[data-mode="${mode}"]`);
      if (!button) return;
      button.textContent = values[0];
      button.dataset.kicker = values[1];
    });

    const wz = document.querySelector('.secondary-mode-switch .mode-button[data-mode="warzone-ranked"]');
    const bo7 = document.querySelector('.secondary-mode-switch .mode-button[data-mode="bo7-ranked"]');
    if (wz) wz.textContent = labels.warzone;
    if (bo7) bo7.textContent = labels.bo7;
    const weaponsTab = document.querySelector('.content-tab[data-tab="weapons"]');
    const mapsTab = document.querySelector('.content-tab[data-tab="maps"]');
    if (weaponsTab) weaponsTab.textContent = labels.weaponsTab;
    if (mapsTab) mapsTab.textContent = labels.maps;

    installLanguageSwitch();
    renderToolbar();
    renderStatus();
    translateRenderedCards();
    applySmartFilter();
  }

  function itemMap() {
    const list = currentList();
    if (!list) return new Map();
    return new Map(list.items.map((item) => [item.name, item]));
  }

  function cardHasBuild(card) {
    const text = (card.textContent || "").toLowerCase();
    if (text.includes("keine gepr") || text.includes("no verified")) return false;
    return card.querySelectorAll(".loadout-slot").length > 1;
  }

  function isVisibleForSmartFilter(item, card) {
    if (!item) return true;
    if (state.smartFilter === "top10") return Number(item.position) <= 10;
    if (state.smartFilter === "meta") return item.tier === "META";
    if (state.smartFilter === "a") return item.tier === "A";
    if (state.smartFilter === "b") return item.tier === "B";
    if (state.smartFilter === "hasBuild") return cardHasBuild(card);
    if (state.smartFilter === "noBuild") return !cardHasBuild(card);
    return true;
  }

  function applySmartFilter() {
    const grid = document.getElementById("loadoutGrid");
    const list = currentList();
    if (!grid || !list) return;
    const byName = itemMap();
    let visible = 0;

    grid.querySelectorAll(".loadout-card").forEach((card) => {
      const item = byName.get(card.dataset.loadoutCard || "");
      const show = isVisibleForSmartFilter(item, card);
      card.hidden = !show;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    grid.querySelectorAll(".meta-tier-heading").forEach((heading) => {
      let hasVisibleCard = false;
      let node = heading.nextElementSibling;
      while (node && !node.classList.contains("meta-tier-heading")) {
        if (node.classList.contains("loadout-card") && !node.hidden && node.style.display !== "none") {
          hasVisibleCard = true;
          break;
        }
        node = node.nextElementSibling;
      }
      heading.hidden = !hasVisibleCard;
      heading.style.display = hasVisibleCard ? "" : "none";
    });

    const count = document.getElementById("resultCount");
    if (count) count.textContent = `${visible} ${t().of} ${list.items.length} ${t().shown}`;

    const empty = grid.querySelector(".empty-state");
    if (empty) {
      const h3 = empty.querySelector("h3");
      const p = empty.querySelector("p");
      if (h3) h3.textContent = t().emptyTitle;
      if (p) p.textContent = t().emptyText;
    }
  }

  function translateRenderedCards() {
    const labels = t();
    document.querySelectorAll(".stat-row em").forEach((node) => { node.textContent = labels.role; });
    document.querySelectorAll(".detail-panel-title span").forEach((node) => {
      const text = (node.textContent || "").toLowerCase();
      if (text.includes("aufs") || text.includes("attach")) node.textContent = labels.attachments;
      if (text.includes("extra")) node.textContent = "Extras";
    });
    document.querySelectorAll(".build-code-box span").forEach((node) => { node.textContent = labels.classCode; });
    document.querySelectorAll(".expand-button span").forEach((node) => {
      const expanded = node.closest(".expand-button")?.getAttribute("aria-expanded") === "true";
      node.textContent = expanded ? labels.close : labels.details;
    });
    document.querySelectorAll(".rank-badge span").forEach((node) => {
      if (/legend/i.test(node.textContent || "")) node.textContent = labels.legendary;
    });
    document.querySelectorAll(".meta-tier-heading").forEach((heading) => {
      const small = heading.querySelector("small");
      if (small) {
        const count = (small.textContent || "").match(/\d+/)?.[0] || "";
        small.textContent = `${count} ${labels.weapons}`.trim();
      }
      if (state.lang === "en") {
        const span = heading.querySelector("span");
        if (span) span.textContent = span.textContent.replace("Waffen", "Weapons");
      }
    });
  }

  function bindEvents() {
    if (window.__loadoutLabUpgradesReady) return;
    window.__loadoutLabUpgradesReady = true;

    document.addEventListener("click", (event) => {
      const language = event.target.closest("[data-language]");
      if (language) {
        state.lang = language.dataset.language === "en" ? "en" : "de";
        localStorage.setItem("loadoutLabLang", state.lang);
        applyLanguage();
        return;
      }

      const filterButton = event.target.closest("#filterToolbar .filter-button[data-smart-filter]");
      if (!filterButton) return;
      state.smartFilter = filterButton.dataset.smartFilter || "all";
      document.querySelectorAll("#filterToolbar .filter-button").forEach((button) => button.classList.toggle("active", button === filterButton));
      window.setTimeout(() => { translateRenderedCards(); applySmartFilter(); }, 60);
      window.setTimeout(() => { translateRenderedCards(); applySmartFilter(); }, 220);
    }, true);

    document.addEventListener("click", (event) => {
      if (event.target.closest(".secondary-mode-switch .mode-button, .content-tab[data-tab='weapons']")) {
        window.setTimeout(() => { renderStatus(); renderToolbar(); translateRenderedCards(); applySmartFilter(); }, 120);
      }
    });

    const observer = new MutationObserver(() => {
      window.clearTimeout(window.__loadoutLabUpgradeRenderTimer);
      window.__loadoutLabUpgradeRenderTimer = window.setTimeout(() => {
        translateRenderedCards();
        applySmartFilter();
      }, 50);
    });
    const watchGrid = () => {
      const grid = document.getElementById("loadoutGrid");
      if (grid && !grid.dataset.upgradeObserved) {
        grid.dataset.upgradeObserved = "true";
        observer.observe(grid, { childList: true, subtree: true });
      }
    };
    watchGrid();
    window.setTimeout(watchGrid, 400);
  }

  async function init() {
    installStyle();
    installLanguageSwitch();
    bindEvents();
    renderToolbar();
    try { await loadMeta(); } catch (error) { console.warn("Loadout Lab meta status konnte nicht geladen werden", error); }
    applyLanguage();
    window.setTimeout(applyLanguage, 350);
    window.setTimeout(applyLanguage, 1200);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
