(function () {
  const STYLE_ID = "subnav-cleanup-20260601";
  const metaPanels = new Set(["weapons", "maps"]);

  const css = `
    body .secondary-mode-switch[hidden],
    body .content-tabs[hidden] {
      display: none !important;
    }

    html body .loadout-subnav-row {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      align-items: stretch !important;
      gap: 0.55rem !important;
      max-width: none !important;
      width: 100% !important;
      margin: 0.15rem 0 0.75rem !important;
    }

    html body .loadout-subnav-row .secondary-mode-switch,
    html body .loadout-subnav-row .content-tabs {
      display: grid !important;
      align-items: stretch !important;
      gap: 0.45rem !important;
      margin: 0 !important;
      border: 1px solid rgba(245, 242, 233, 0.13) !important;
      border-radius: 0.55rem !important;
      background: rgba(245, 242, 233, 0.045) !important;
      box-shadow: none !important;
      padding: 0.25rem !important;
    }

    html body .loadout-subnav-row .secondary-mode-switch {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 0 !important;
    }

    html body .loadout-subnav-row .content-tabs {
      grid-template-columns: repeat(2, minmax(5rem, 1fr)) !important;
      min-width: 14rem !important;
      margin-bottom: 0 !important;
    }

    html body .loadout-subnav-row .secondary-mode-switch .mode-button,
    html body .loadout-subnav-row .content-tab {
      min-height: 2.85rem !important;
      border: 1px solid rgba(245, 242, 233, 0.12) !important;
      border-radius: 0.38rem !important;
      background: linear-gradient(180deg, rgba(18, 24, 30, 0.92), rgba(12, 16, 20, 0.98)) !important;
      color: var(--text) !important;
      box-shadow: none !important;
      font-weight: 950 !important;
    }

    html body .loadout-subnav-row .secondary-mode-switch .mode-button.active,
    html body .loadout-subnav-row .content-tab.active {
      border-color: transparent !important;
      background: linear-gradient(135deg, var(--amber), var(--cyan)) !important;
      color: #10130e !important;
    }

    html body .loadout-subnav-row .secondary-mode-switch .mode-button:hover,
    html body .loadout-subnav-row .secondary-mode-switch .mode-button:focus-visible,
    html body .loadout-subnav-row .content-tab:hover,
    html body .loadout-subnav-row .content-tab:focus-visible {
      border-color: rgba(240, 173, 55, 0.42) !important;
      color: var(--text) !important;
    }

    html body .loadout-subnav-row .content-tabs[hidden] {
      display: none !important;
    }

    @media (max-width: 820px) {
      html body .loadout-subnav-row {
        grid-template-columns: 1fr !important;
        width: 100% !important;
      }

      html body .loadout-subnav-row .secondary-mode-switch,
      html body .loadout-subnav-row .content-tabs {
        grid-template-columns: 1fr !important;
        width: 100% !important;
        min-width: 0 !important;
      }
    }
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
    }
    document.head.append(style);
    style.textContent = css;
  }

  function groupLoadoutNav() {
    const secondary = document.querySelector(".secondary-mode-switch");
    const contentTabs = document.querySelector("#contentTabs");
    if (!secondary || !contentTabs) return;

    let row = document.querySelector(".loadout-subnav-row");
    if (!row) {
      row = document.createElement("div");
      row.className = "loadout-subnav-row";
      secondary.insertAdjacentElement("beforebegin", row);
    }

    if (secondary.parentElement !== row) row.appendChild(secondary);
    if (contentTabs.parentElement !== row) row.appendChild(contentTabs);
  }

  function activePanel() {
    return document.querySelector(".tab-panel.active")?.dataset.panel || "weapons";
  }

  function syncSubnavVisibility() {
    installStyle();
    groupLoadoutNav();

    const secondary = document.querySelector(".secondary-mode-switch");
    const contentTabs = document.querySelector("#contentTabs");
    const shouldShowContentTabs = metaPanels.has(activePanel());

    if (secondary) secondary.hidden = false;
    if (contentTabs) contentTabs.hidden = !shouldShowContentTabs;
  }

  function scheduleSync() {
    requestAnimationFrame(syncSubnavVisibility);
    window.setTimeout(syncSubnavVisibility, 80);
  }

  function init() {
    installStyle();
    syncSubnavVisibility();
    document.addEventListener("click", scheduleSync, true);
    window.addEventListener("loadoutlab:lite-render", scheduleSync);
    window.setTimeout(syncSubnavVisibility, 250);
    window.setTimeout(syncSubnavVisibility, 900);
    window.setTimeout(syncSubnavVisibility, 2000);
    window.setTimeout(syncSubnavVisibility, 4000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());

(function () {
  function loadScript(id, src) {
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.defer = true;
    document.head.append(script);
  }

  loadScript("loadout-lab-monetization-live", "monetization-live.js?v=20260605-base");
  loadScript("loadout-lab-monetization-gear", "monetization-gear.js?v=20260605-sideads-align");
  loadScript("loadout-lab-meta-button-shape", "meta-button-shape.js?v=20260605-rectmeta4");
}());
