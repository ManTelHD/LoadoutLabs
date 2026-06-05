(function () {
  const STYLE_ID = "subnav-cleanup-20260601";
  const metaPanels = new Set(["weapons", "maps"]);

  const css = `
    body .secondary-mode-switch[hidden],
    body .content-tabs[hidden] {
      display: none !important;
    }

    body .loadout-subnav-row {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      align-items: stretch !important;
      gap: 0.45rem !important;
      max-width: min(78rem, 100%) !important;
      margin: 0 0 0.42rem !important;
    }

    body .loadout-subnav-row .secondary-mode-switch {
      display: grid !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 0 !important;
    }

    body .loadout-subnav-row .content-tabs {
      margin-bottom: 0 !important;
    }

    body .loadout-subnav-row .content-tabs[hidden] {
      display: none !important;
    }

    @media (max-width: 820px) {
      body .loadout-subnav-row {
        grid-template-columns: 1fr !important;
        width: 100% !important;
      }

      body .loadout-subnav-row .content-tabs {
        width: 100% !important;
      }
    }
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
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
  loadScript("loadout-lab-monetization-gear", "monetization-gear.js?v=20260605-sideads");
}());
