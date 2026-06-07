(function () {
  const STYLE_ID = "subnav-cleanup-20260601";
  const css = `
    body .tier-first > .primary-mode-switch,
    body .tier-first > .secondary-mode-switch,
    body .tier-first > .content-tabs {
      position: absolute !important;
      left: -9999px !important;
      top: auto !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    body .tier-first > .loadout-subnav-row {
      display: none !important;
    }

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

    body.ll-top-switching .minimal-control-panel {
      overflow: hidden !important;
      contain: layout paint !important;
    }

    body .weapon-art,
    body .weapon-thumb,
    body .camo-swatch,
    body .mode-image-gallery figure {
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body .mode-info-main > img,
    body .mode-image-gallery img,
    body .update-card img,
    body .ranked-map-card img,
    body .camo-swatch img,
    body .weapon-art img,
    body .weapon-thumb img {
      border: 0 !important;
      outline: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body .mode-info-main > img,
    body .update-card img {
      border-bottom: 0 !important;
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

  function markSwitching() {
    document.body?.classList.add("ll-top-switching");
    window.setTimeout(() => document.body?.classList.remove("ll-top-switching"), 180);
  }

  function scheduleRefresh() {
    markSwitching();
    [0, 16, 60, 140, 320, 760, 1400, 2400].forEach((delay) => {
      window.setTimeout(refresh, delay);
    });
  }

  function init() {
    refresh();
    scheduleRefresh();
    ["pointerdown", "touchstart", "keydown", "click"].forEach((eventName) => {
      document.addEventListener(eventName, (event) => {
        if (eventName === "keydown" && !["Enter", " "].includes(event.key)) return;
        if (event.target?.closest?.(".minimal-control-panel, .primary-mode-switch, .secondary-mode-switch, .content-tabs")) {
          scheduleRefresh();
        }
      }, true);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());