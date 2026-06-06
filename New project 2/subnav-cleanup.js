(function () {
  const STYLE_ID = "subnav-cleanup-20260601";
  const css = `
    body .minimal-control-panel .loadout-subnav-row {
      display: contents !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body .minimal-control-panel .secondary-mode-switch,
    body .minimal-control-panel .minimal-control-group .secondary-mode-switch,
    body .minimal-control-panel .loadout-subnav-row .secondary-mode-switch {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 0.34rem !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      min-height: 0 !important;
    }

    body .minimal-control-panel .secondary-mode-switch .mode-button,
    body .minimal-control-panel .loadout-subnav-row .mode-button {
      display: inline-flex !important;
      width: auto !important;
      min-width: 0 !important;
      min-height: 2.12rem !important;
      align-items: center !important;
      justify-content: center !important;
      white-space: nowrap !important;
    }

    @media (max-width: 620px) {
      body .minimal-control-panel .secondary-mode-switch,
      body .minimal-control-panel .minimal-control-group .secondary-mode-switch,
      body .minimal-control-panel .loadout-subnav-row .secondary-mode-switch {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
    }
  `;

  function installStyle() {
    if (!document.head) return;
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
    }
    style.textContent = css;
    document.head.append(style);
  }

  function unwrapSubnavRows() {
    document.querySelectorAll(".loadout-subnav-row").forEach((row) => {
      const parent = row.parentElement;
      const secondary = row.querySelector(".secondary-mode-switch");
      const tabs = row.querySelector("#contentTabs");
      if (parent) {
        if (secondary) parent.insertBefore(secondary, row);
        if (tabs) parent.insertBefore(tabs, row);
      }
      row.remove();
    });
  }

  function refresh() {
    installStyle();
    unwrapSubnavRows();
  }

  function scheduleRefresh() {
    [0, 80, 220, 520, 1100, 1800, 2800, 3800].forEach((delay) => {
      window.setTimeout(refresh, delay);
    });
  }

  function init() {
    refresh();
    scheduleRefresh();
    document.addEventListener("click", scheduleRefresh, true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
