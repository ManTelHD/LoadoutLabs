(function () {
  const STYLE_ID = "loadout-details-upgrades-style";
  const state = { meta: null, timer: 0 };

  const copy = {
    de: {
      source: "Quelle",
      sourceUpdated: "Stand",
      score: "Score",
      rank: "Rang",
      tier: "Tier",
      copy: "Kopieren",
      copied: "Kopiert",
      unavailable: "Kein Klassen-Code hinterlegt",
      noAttachments: "Keine geprueften Aufsaetze hinterlegt",
    },
    en: {
      source: "Source",
      sourceUpdated: "Updated",
      score: "Score",
      rank: "Rank",
      tier: "Tier",
      copy: "Copy",
      copied: "Copied",
      unavailable: "No class code available",
      noAttachments: "No verified attachments available",
    },
  };

  const css = `
    body #loadoutGrid .detail-source-row {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.42rem !important;
      margin: 0 0 0.72rem !important;
      padding: 0.64rem 0.72rem !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.18) !important;
      border-radius: 0.42rem !important;
      background: rgba(5, 8, 12, 0.36) !important;
    }

    body #loadoutGrid .detail-source-chip {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.28rem !important;
      min-height: 1.65rem !important;
      padding: 0.2rem 0.5rem !important;
      border: 1px solid rgba(255, 255, 255, 0.075) !important;
      border-radius: 999px !important;
      background: rgba(255, 255, 255, 0.038) !important;
      color: rgba(234, 241, 248, 0.84) !important;
      font-size: 0.72rem !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }

    body #loadoutGrid .detail-source-chip span {
      color: rgba(255, 255, 255, 0.54) !important;
      font-size: 0.66rem !important;
      font-weight: 950 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .detail-source-chip strong,
    body #loadoutGrid .detail-source-chip a {
      color: var(--tier-card-color, #b9ff3d) !important;
      font-weight: 950 !important;
      text-decoration: none !important;
    }

    body #loadoutGrid .build-code-box {
      position: relative !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      gap: 0.48rem 0.65rem !important;
      align-items: center !important;
    }

    body #loadoutGrid .build-code-box span,
    body #loadoutGrid .build-code-box strong {
      grid-column: 1 !important;
    }

    body #loadoutGrid .copy-build-button {
      grid-column: 2 !important;
      grid-row: 1 / span 2 !important;
      align-self: stretch !important;
      min-width: 5.6rem !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.46) !important;
      border-radius: 0.36rem !important;
      background: linear-gradient(135deg, rgba(var(--tier-card-rgb, 185, 255, 61), 0.22), rgba(var(--tier-card-rgb, 185, 255, 61), 0.08)), rgba(8, 12, 18, 0.94) !important;
      color: #fff !important;
      font: 950 0.78rem Inter, system-ui, sans-serif !important;
      cursor: pointer !important;
    }

    body #loadoutGrid .copy-build-button:hover,
    body #loadoutGrid .copy-build-button.copied {
      background: var(--tier-card-color, #b9ff3d) !important;
      color: #061008 !important;
    }

    body #loadoutGrid .build-code-box.no-code {
      grid-template-columns: 1fr !important;
      opacity: 0.82 !important;
    }

    body #loadoutGrid .build-code-box.no-code strong {
      color: rgba(255, 255, 255, 0.66) !important;
      font-size: 0.9rem !important;
    }

    body #loadoutGrid .loadout-slot.placeholder-slot {
      grid-template-columns: 1fr !important;
      border-style: dashed !important;
      color: rgba(255, 255, 255, 0.68) !important;
    }

    @media (max-width: 720px) {
      body #loadoutGrid .build-code-box {
        grid-template-columns: 1fr !important;
      }

      body #loadoutGrid .copy-build-button {
        grid-column: 1 !important;
        grid-row: auto !important;
        min-height: 2.35rem !important;
      }
    }
  `;

  function lang() {
    return localStorage.getItem("loadoutLabLang") === "en" || document.documentElement.lang === "en" ? "en" : "de";
  }

  function t() {
    return copy[lang()] || copy.de;
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

  function itemMap() {
    const list = currentList();
    if (!list?.items) return new Map();
    return new Map(list.items.map((item) => [item.name, item]));
  }

  function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(lang() === "en" ? "en-US" : "de-DE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Berlin",
    });
  }

  function sourceRow(item, list) {
    const labels = t();
    const sourceUrl = item.sourceUrl || list?.sourceUrl || state.meta?.sourceUrl || "https://wzstats.gg/";
    const sourceUpdated = item.sourceUpdatedAt || list?.sourceUpdatedAt || state.meta?.generatedAt;
    return `
      <div class="detail-source-row" data-detail-source-row>
        <span class="detail-source-chip"><span>${html(labels.source)}</span><a href="${html(sourceUrl)}" target="_blank" rel="noreferrer">WZStats</a></span>
        <span class="detail-source-chip"><span>${html(labels.sourceUpdated)}</span><strong>${html(formatDate(sourceUpdated))}</strong></span>
        <span class="detail-source-chip"><span>${html(labels.rank)}</span><strong>#${html(item.position)}</strong></span>
        <span class="detail-source-chip"><span>${html(labels.tier)}</span><strong>${html(item.tierLabel || item.tier)}</strong></span>
        <span class="detail-source-chip"><span>${html(labels.score)}</span><strong>${html(item.score || item.scoreLabel || "-")}/100</strong></span>
      </div>
    `;
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }

  function enhanceBuildBox(box) {
    const labels = t();
    const codeNode = box.querySelector("strong");
    const code = (codeNode?.textContent || "").trim();
    const hasCode = code && !/^wzstats loadout$/i.test(code) && !/^wzstats$/i.test(code);

    if (!hasCode) {
      box.classList.add("no-code");
      if (codeNode) codeNode.textContent = labels.unavailable;
      box.querySelector(".copy-build-button")?.remove();
      return;
    }

    box.classList.remove("no-code");
    let button = box.querySelector(".copy-build-button");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "copy-build-button";
      box.append(button);
    }
    button.textContent = button.classList.contains("copied") ? labels.copied : labels.copy;
    button.dataset.copyValue = code;
  }

  function polishAttachmentPanel(panel) {
    const labels = t();
    const list = panel.querySelector(".premium-attachment-list");
    if (!list) return;
    const slots = [...list.querySelectorAll(".loadout-slot")];
    const onlyPlaceholder = slots.length <= 1 && /keine gepr|no verified/i.test(list.textContent || "");
    if (!onlyPlaceholder) return;
    list.innerHTML = `<li class="loadout-slot placeholder-slot"><strong>${html(labels.noAttachments)}</strong></li>`;
    const count = panel.querySelector(".detail-panel-title strong");
    if (count) count.textContent = "0/5";
  }

  function enhanceCards() {
    const list = currentList();
    if (!list) return;
    const byName = itemMap();
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      const item = byName.get(card.dataset.loadoutCard || "");
      const details = card.querySelector(".meta-card-details");
      if (!item || !details) return;

      details.querySelector("[data-detail-source-row]")?.remove();
      details.insertAdjacentHTML("afterbegin", sourceRow(item, list));

      card.querySelectorAll(".build-code-box").forEach(enhanceBuildBox);
      card.querySelectorAll(".attachments-panel").forEach(polishAttachmentPanel);
    });
  }

  function scheduleEnhance(delay = 60) {
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(enhanceCards, delay);
  }

  function bindEvents() {
    if (window.__loadoutDetailsUpgradesReady) return;
    window.__loadoutDetailsUpgradesReady = true;

    document.addEventListener("click", async (event) => {
      const button = event.target.closest(".copy-build-button");
      if (!button) return;
      event.preventDefault();
      try {
        await copyText(button.dataset.copyValue || "");
        button.classList.add("copied");
        button.textContent = t().copied;
        window.setTimeout(() => {
          button.classList.remove("copied");
          button.textContent = t().copy;
        }, 1400);
      } catch (error) {
        console.warn("Klassen-Code konnte nicht kopiert werden", error);
      }
    }, true);

    document.addEventListener("click", (event) => {
      if (event.target.closest(".expand-button, [data-language], #filterToolbar .filter-button, .secondary-mode-switch .mode-button")) {
        scheduleEnhance(120);
        scheduleEnhance(360);
      }
    }, true);

    const observer = new MutationObserver(() => scheduleEnhance(80));
    const watchGrid = () => {
      const grid = document.getElementById("loadoutGrid");
      if (!grid || grid.dataset.detailsUpgradeObserved) return;
      grid.dataset.detailsUpgradeObserved = "true";
      observer.observe(grid, { childList: true, subtree: true });
    };
    watchGrid();
    window.setTimeout(watchGrid, 500);
  }

  async function init() {
    installStyle();
    bindEvents();
    try { await loadMeta(); } catch (error) { console.warn("Loadout details meta konnte nicht geladen werden", error); }
    scheduleEnhance(100);
    window.setTimeout(enhanceCards, 600);
    window.setTimeout(enhanceCards, 1500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
