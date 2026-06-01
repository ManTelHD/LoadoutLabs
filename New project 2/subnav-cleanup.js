(function () {
  const STYLE_ID = "subnav-cleanup-20260601";
  const hiddenPrimaryModes = new Set(["mw4-info", "season4-info", "updates"]);

  const css = `
    body .secondary-mode-switch[hidden],
    body .content-tabs[hidden],
    body .loadout-subnav-row:has(.secondary-mode-switch[hidden]) {
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

  function activePrimaryMode() {
    return document.querySelector(".primary-mode-switch .mode-button.active")?.dataset.mode || "";
  }

  function syncSubnavVisibility() {
    groupLoadoutNav();

    const secondary = document.querySelector(".secondary-mode-switch");
    const contentTabs = document.querySelector("#contentTabs");
    const shouldShowMetaNav = !hiddenPrimaryModes.has(activePrimaryMode());

    if (secondary) secondary.hidden = !shouldShowMetaNav;
    if (contentTabs && !shouldShowMetaNav) contentTabs.hidden = true;
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
