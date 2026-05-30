(function () {
  const STYLE_ID = "site-ui-20260529-style";
  const tabOrder = ["mw4-info", "season4-info", "updates"];
  const tabLabels = {
    "mw4-info": { text: "MW4", kicker: "Gerüchte" },
    "season4-info": { text: "Season 4", kicker: "Neu" },
    updates: { text: "Updates", kicker: "News" },
  };

  const css = `
    body .tier-first {
      max-width: min(98.5rem, calc(100vw - clamp(1rem, 2.4vw, 2.75rem))) !important;
      padding-top: clamp(0.65rem, 1.2vw, 1rem) !important;
      margin-inline: auto !important;
    }

    body .tier-first .section-heading {
      position: relative !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      grid-template-areas:
        "kicker date"
        "title date" !important;
      align-items: center !important;
      gap: 0.45rem 1rem !important;
      max-width: min(78rem, 100%) !important;
      margin: 0 0 0.6rem !important;
      padding: 0.78rem 0.95rem !important;
      border: 1px solid rgba(255, 255, 255, 0.105) !important;
      border-left: 0.26rem solid rgba(185, 255, 61, 0.74) !important;
      border-radius: 0.46rem !important;
      background:
        radial-gradient(circle at 86% 14%, rgba(255, 216, 106, 0.08), transparent 18rem),
        linear-gradient(135deg, rgba(185, 255, 61, 0.07), rgba(10, 14, 19, 0.9) 40%, rgba(6, 9, 12, 0.96)) !important;
      box-shadow: 0 1rem 2.15rem rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
    }

    body .tier-first .section-heading::before {
      content: "" !important;
      position: absolute !important;
      inset: 0 auto 0 0 !important;
      width: 0.18rem !important;
      background: linear-gradient(180deg, #b9ff3d, rgba(41, 230, 129, 0.45)) !important;
      pointer-events: none !important;
    }

    body .tier-first .section-heading::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 54%) !important;
      pointer-events: none !important;
    }

    body .tier-first .section-heading .eyebrow {
      position: relative !important;
      grid-area: kicker !important;
      width: fit-content !important;
      margin: 0 !important;
      padding: 0.18rem 0.48rem !important;
      border: 1px solid rgba(185, 255, 61, 0.28) !important;
      border-radius: 999px !important;
      background: rgba(185, 255, 61, 0.08) !important;
      color: #b9ff3d !important;
      font-size: 0.62rem !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      z-index: 1 !important;
    }

    body .tier-first .section-heading #tierDescription {
      display: none !important;
    }

    body .tier-first h1 {
      position: relative !important;
      grid-area: title !important;
      max-width: 62rem !important;
      margin: 0 !important;
      color: #f4f7fb !important;
      font-size: clamp(2rem, 3.05vw, 3.05rem) !important;
      line-height: 0.96 !important;
      letter-spacing: 0 !important;
      text-wrap: balance !important;
      text-shadow: 0 0.75rem 1.9rem rgba(0, 0, 0, 0.32) !important;
      z-index: 1 !important;
    }

    body .tier-first .updated-note {
      position: relative !important;
      grid-area: date !important;
      justify-self: end !important;
      align-self: center !important;
      margin: 0 !important;
      min-height: 1.75rem !important;
      padding: 0.32rem 0.62rem !important;
      border-color: rgba(255, 216, 106, 0.24) !important;
      background: rgba(9, 13, 18, 0.76) !important;
      color: #d7dee8 !important;
      white-space: nowrap !important;
      font-size: 0.72rem !important;
      z-index: 1 !important;
    }

    body .primary-mode-switch {
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      max-width: min(78rem, 100%) !important;
      gap: 0.32rem !important;
      margin: 0 0 0.42rem !important;
      padding: 0.25rem !important;
      border: 1px solid rgba(255, 255, 255, 0.095) !important;
      border-radius: 0.5rem !important;
      background: rgba(7, 10, 14, 0.62) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .primary-mode-switch .mode-button {
      min-height: 2.72rem !important;
      border-radius: 0.36rem !important;
      padding: 0.4rem 0.7rem !important;
      font-size: 0.98rem !important;
      letter-spacing: 0 !important;
    }

    body .primary-mode-switch .mode-button::before {
      content: attr(data-kicker) !important;
      display: block !important;
      margin-bottom: 0.12rem !important;
      color: #b9ff3d !important;
      font-size: 0.58rem !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      opacity: 0.95 !important;
    }

    body .primary-mode-switch .mode-button.active,
    body .secondary-mode-switch .mode-button.active,
    body .content-tab.active,
    body .filter-button.active {
      border-color: rgba(185, 255, 61, 0.92) !important;
      background: linear-gradient(135deg, #b9ff3d 0%, #66f244 45%, #24e66f 100%) !important;
      color: #051007 !important;
      text-shadow: none !important;
      box-shadow:
        0 0 0 1px rgba(185, 255, 61, 0.24),
        0 0.55rem 1.35rem rgba(42, 239, 111, 0.24),
        inset 0 1px 0 rgba(255, 255, 255, 0.26) !important;
    }

    body .primary-mode-switch .mode-button.active::before {
      color: #07100a !important;
    }

    body .primary-mode-switch .mode-button.active *,
    body .secondary-mode-switch .mode-button.active *,
    body .content-tab.active *,
    body .filter-button.active * {
      color: #051007 !important;
      text-shadow: none !important;
    }

    body .secondary-mode-switch,
    body .content-tabs {
      min-height: 2.5rem !important;
      margin-top: 0 !important;
      margin-bottom: 0.42rem !important;
      padding: 0.2rem !important;
      border: 1px solid rgba(255, 255, 255, 0.09) !important;
      background: rgba(7, 10, 14, 0.62) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
      vertical-align: top !important;
    }

    body .secondary-mode-switch {
      display: inline-grid !important;
      grid-template-columns: repeat(2, minmax(10rem, 1fr)) !important;
      width: min(37rem, calc(100% - 13rem)) !important;
      max-width: min(37rem, 100%) !important;
      min-width: min(100%, 24rem) !important;
      margin-right: 0.45rem !important;
    }

    body .secondary-mode-switch .camo-mode-button {
      display: none !important;
    }

    body .secondary-mode-switch .mode-button,
    body .content-tab {
      min-height: 2.12rem !important;
      padding: 0.36rem 0.78rem !important;
      font-size: 0.9rem !important;
    }

    body .content-tabs {
      display: inline-flex !important;
      width: fit-content !important;
      margin-left: 0 !important;
      transform: translateY(0) !important;
    }

    body .controls {
      grid-template-columns: minmax(18rem, 1fr) minmax(12rem, 18rem) !important;
      max-width: min(82rem, 100%) !important;
      gap: 0.55rem !important;
      margin: 0.18rem 0 0.55rem !important;
      padding: 0.38rem !important;
      border: 1px solid rgba(255, 255, 255, 0.095) !important;
      border-radius: 0.5rem !important;
      background: rgba(7, 10, 14, 0.58) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body .search-box,
    body .select-box {
      gap: 0.25rem !important;
    }

    body .search-box span,
    body .select-box span {
      padding-left: 0.12rem !important;
      color: #8e98a8 !important;
      font-size: 0.66rem !important;
    }

    body .search-box input,
    body .select-box select {
      min-height: 2.75rem !important;
      border-radius: 0.34rem !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 70%),
        rgba(12, 17, 24, 0.9) !important;
    }

    body .toolbar {
      max-width: min(82rem, 100%) !important;
      margin-top: 0 !important;
      margin-bottom: 0.55rem !important;
    }

    body .tab-panel.active {
      margin-top: 0.25rem !important;
    }

    body .site-header {
      min-height: 4.1rem !important;
      padding: 0.62rem max(clamp(1rem, 3vw, 2.25rem), calc((100vw - 82rem) / 2)) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      background:
        radial-gradient(circle at 12% 0%, rgba(185, 255, 61, 0.12), transparent 16rem),
        linear-gradient(180deg, rgba(9, 13, 17, 0.96), rgba(5, 8, 11, 0.92)) !important;
      box-shadow: 0 0.85rem 2rem rgba(0, 0, 0, 0.24), inset 0 -1px 0 rgba(185, 255, 61, 0.05) !important;
      backdrop-filter: blur(18px) saturate(1.12) !important;
    }

    body .brand {
      gap: 0.68rem !important;
      min-width: max-content !important;
      color: rgba(246, 250, 244, 0.94) !important;
      font-size: 1.05rem !important;
      letter-spacing: 0 !important;
    }

    body .brand-mark {
      width: 2.25rem !important;
      height: 2.25rem !important;
      border: 1px solid rgba(185, 255, 61, 0.36) !important;
      border-radius: 0.5rem !important;
      background: linear-gradient(135deg, #b9ff3d, #28e070) !important;
      color: #061008 !important;
      box-shadow: 0 0 0 0.25rem rgba(185, 255, 61, 0.07), 0 0 1.3rem rgba(65, 239, 113, 0.22) !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 0.98rem !important;
      font-weight: 950 !important;
    }

    body .top-nav {
      align-items: center !important;
      gap: 0.28rem !important;
      padding: 0.18rem !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 999px !important;
      background: rgba(7, 10, 14, 0.58) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .top-nav a {
      min-height: 2rem !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0.42rem 0.78rem !important;
      border-radius: 999px !important;
      color: rgba(218, 226, 236, 0.72) !important;
      font-size: 0.82rem !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      transition: color 160ms ease, background 160ms ease, border-color 160ms ease !important;
    }

    body .top-nav a:hover,
    body .top-nav a:focus-visible {
      border-color: rgba(185, 255, 61, 0.22) !important;
      background: rgba(185, 255, 61, 0.08) !important;
      color: #f6ffe2 !important;
    }

    @media (max-width: 820px) {
      body .tier-first {
        max-width: calc(100vw - 1rem) !important;
      }

      body .tier-first .section-heading {
        grid-template-columns: 1fr !important;
        grid-template-areas:
          "kicker"
          "title"
          "date" !important;
        padding: 0.95rem !important;
      }

      body .tier-first .updated-note {
        justify-self: start !important;
        white-space: normal !important;
      }

      body .primary-mode-switch,
      body .secondary-mode-switch,
      body .controls {
        grid-template-columns: 1fr !important;
        width: 100% !important;
      }

      body .content-tabs {
        width: 100% !important;
      }

      body .tier-first h1 {
        font-size: clamp(1.95rem, 12vw, 2.55rem) !important;
      }
    }

    @media (max-width: 720px) {
      body .site-header {
        min-height: auto !important;
        align-items: stretch !important;
        flex-direction: column !important;
        gap: 0.7rem !important;
        padding-inline: 0.75rem !important;
      }

      body .top-nav {
        width: 100% !important;
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        border-radius: 0.55rem !important;
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

  function reorderPrimaryTabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return false;
    const buttons = new Map(Array.from(switcher.querySelectorAll(".mode-button[data-mode]")).map((button) => [button.dataset.mode, button]));
    tabOrder.forEach((mode) => {
      const button = buttons.get(mode);
      if (!button) return;
      const label = tabLabels[mode];
      button.textContent = label.text;
      button.dataset.kicker = label.kicker;
      switcher.appendChild(button);
    });
    return true;
  }

  function clearStuckLoaders() {
    const blockingText = ["loadoutlab wird geladen", "loadout lab wird geladen", "falls nichts passiert", "wird geladen"];
    document.querySelectorAll("body *").forEach((element) => {
      const text = (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (!text || !blockingText.some((needle) => text.includes(needle))) return;

      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const coversScreen = rect.width > window.innerWidth * 0.45 && rect.height > window.innerHeight * 0.2;
      const canBlock = ["fixed", "absolute", "sticky"].includes(style.position) || Number(style.zIndex) > 10 || coversScreen;
      if (!canBlock) return;

      element.hidden = true;
      element.style.display = "none";
      element.style.pointerEvents = "none";
    });

    document.documentElement.classList.add("site-interaction-ready");
    document.body?.classList.add("site-interaction-ready");
  }

  function refreshUi() {
    installStyle();
    reorderPrimaryTabs();
    clearStuckLoaders();
  }

  function bindEvents() {
    if (window.__loadoutLabSiteUiReady) return;
    window.__loadoutLabSiteUiReady = true;
    document.addEventListener("click", () => window.setTimeout(refreshUi, 30), true);
  }

  function init() {
    bindEvents();
    refreshUi();
    window.setTimeout(refreshUi, 300);
    window.setTimeout(clearStuckLoaders, 500);
    window.setTimeout(clearStuckLoaders, 1500);
    window.setTimeout(clearStuckLoaders, 3500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
