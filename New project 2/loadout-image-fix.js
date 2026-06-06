(function () {
  const fixedImages = {
    "swordfish-a1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S02-SWORDFISH-A1.webp",
    grimhawk: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/seasons/blackops7/season-04/weapons/Seasonal-LP_S4_weapons_grimhawk.webp",
  };

  function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function applyImageFixes(root = document) {
    root.querySelectorAll?.("#loadoutGrid .loadout-card").forEach((card) => {
      const name = card.querySelector(".weapon-name, h2, h3")?.textContent?.trim();
      const src = fixedImages[slugify(name)];
      const img = card.querySelector(".weapon-art img");
      if (!src || !img || img.getAttribute("src") === src) return;
      img.dataset.fallback = img.dataset.fallback || img.getAttribute("src") || "";
      img.src = src;
    });
  }

  const minimalTopCss = `
    body .today-strip,
    body .commercial-disclosure,
    body .ad-disclosure,
    body .affiliate-disclosure {
      display: none !important;
    }

    body .site-header {
      background: #05080b !important;
      box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08) !important;
      backdrop-filter: none !important;
    }

    body .top-nav {
      border-radius: 0.62rem !important;
      background: #090f16 !important;
    }

    body .tier-first .section-heading.minimal-hero {
      display: grid !important;
      grid-template-columns: 1fr !important;
      grid-template-areas: none !important;
      gap: 0.35rem !important;
      max-width: min(62rem, 100%) !important;
      margin: 0 0 0.65rem !important;
      padding: 0 !important;
      border: 0 !important;
      border-left: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body .tier-first .section-heading.minimal-hero::before,
    body .tier-first .section-heading.minimal-hero::after {
      display: none !important;
      content: none !important;
    }

    body .minimal-hero-meta {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: 0.42rem 0.65rem !important;
    }

    body .tier-first .minimal-hero .eyebrow,
    body .tier-first .minimal-hero .updated-note {
      grid-area: unset !important;
      margin: 0 !important;
      white-space: normal !important;
    }

    body .tier-first .minimal-hero .eyebrow {
      width: fit-content !important;
      padding: 0.2rem 0.52rem !important;
      border: 1px solid rgba(185, 255, 61, 0.28) !important;
      border-radius: 999px !important;
      background: #101821 !important;
      color: #b9ff3d !important;
      font-size: 0.62rem !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
    }

    body .tier-first .minimal-hero .updated-note {
      justify-self: start !important;
      min-height: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      color: #8e98a8 !important;
      font-size: 0.76rem !important;
    }

    body .tier-first .minimal-hero h1 {
      grid-area: unset !important;
      max-width: 56rem !important;
      margin: 0 !important;
      color: #f4f7fb !important;
      font-size: clamp(2.05rem, 4.6vw, 3.65rem) !important;
      line-height: 0.92 !important;
      letter-spacing: -0.04em !important;
      text-shadow: none !important;
    }

    body .tier-first .minimal-hero #tierDescription {
      display: none !important;
    }

    body .minimal-control-panel {
      display: grid !important;
      grid-template-columns: minmax(13rem, 1fr) minmax(16rem, 1.2fr) minmax(9rem, 0.72fr) !important;
      align-items: end !important;
      gap: 0.55rem !important;
      max-width: min(78rem, 100%) !important;
      margin: 0 0 0.72rem !important;
      padding: 0.58rem !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 0.72rem !important;
      background: #080d13 !important;
      box-shadow: none !important;
    }

    body .minimal-control-group {
      display: grid !important;
      min-width: 0 !important;
      gap: 0.32rem !important;
    }

    body .minimal-control-label {
      color: #788393 !important;
      font-size: 0.66rem !important;
      font-weight: 950 !important;
      letter-spacing: 0.08em !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
    }

    body .minimal-control-panel .mode-switch,
    body .minimal-control-panel .content-tabs {
      display: grid !important;
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      transform: none !important;
      vertical-align: baseline !important;
      gap: 0.34rem !important;
    }

    body .minimal-control-panel .primary-mode-switch,
    body .minimal-control-panel .secondary-mode-switch {
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    }

    body .minimal-control-panel .content-tabs {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }

    body .minimal-control-panel .content-tabs[hidden] {
      display: none !important;
    }

    body .minimal-control-panel .secondary-mode-switch .camo-mode-button {
      display: inline-flex !important;
    }

    body .minimal-control-panel .mode-button,
    body .minimal-control-panel .content-tab {
      min-width: 0 !important;
      min-height: 2.45rem !important;
      align-items: center !important;
      justify-content: center !important;
      border: 1px solid rgba(255, 255, 255, 0.09) !important;
      border-radius: 0.5rem !important;
      background: #111924 !important;
      color: #dce5ef !important;
      font-size: 0.88rem !important;
      font-weight: 900 !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      padding: 0.52rem 0.58rem !important;
      text-align: center !important;
      white-space: nowrap !important;
      box-shadow: none !important;
    }

    body .minimal-control-panel .mode-button::before,
    body .minimal-control-panel .primary-mode-switch .mode-button::before {
      display: none !important;
      content: none !important;
    }

    body .minimal-control-panel .mode-button.active,
    body .minimal-control-panel .content-tab.active {
      border-color: transparent !important;
      background: #b9ff3d !important;
      color: #061008 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    @media (max-width: 1040px) {
      body .minimal-control-panel {
        grid-template-columns: 1fr !important;
      }
    }

    @media (max-width: 620px) {
      body .minimal-control-panel .primary-mode-switch,
      body .minimal-control-panel .secondary-mode-switch,
      body .minimal-control-panel .content-tabs {
        grid-template-columns: 1fr !important;
      }

      body .tier-first .minimal-hero h1 {
        font-size: clamp(2rem, 12vw, 2.75rem) !important;
      }
    }
  `;

  function installMinimalTopStyle() {
    let style = document.getElementById("minimal-top-final-20260606");
    if (!style) {
      style = document.createElement("style");
      style.id = "minimal-top-final-20260606";
      document.head.append(style);
    }
    style.textContent = minimalTopCss;
  }

  function setButtonLabel(selector, label) {
    const button = document.querySelector(selector);
    if (button) button.textContent = label;
  }

  function createControlGroup(label, element, className = "") {
    if (!element) return null;
    const group = document.createElement("div");
    group.className = ["minimal-control-group", className].filter(Boolean).join(" ");
    group.hidden = Boolean(element.hidden);

    const groupLabel = document.createElement("span");
    groupLabel.className = "minimal-control-label";
    groupLabel.textContent = label;

    group.append(groupLabel, element);
    return group;
  }

  function reorderModes() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return;
    ["updates", "mw4-info", "season4-info"].forEach((mode) => {
      const button = switcher.querySelector(`.mode-button[data-mode="${mode}"]`);
      if (button) switcher.appendChild(button);
    });
  }

  function applyMinimalTop() {
    installMinimalTopStyle();
    const section = document.querySelector(".tier-first");
    if (!section) return;

    section.querySelectorAll(".today-strip, .commercial-disclosure, .ad-disclosure, .affiliate-disclosure").forEach((element) => element.remove());

    const heading = section.querySelector(".section-heading");
    if (heading) {
      heading.classList.add("minimal-hero");
      const eyebrow = heading.querySelector(".eyebrow");
      const updatedNote = heading.querySelector(".updated-note");
      const description = heading.querySelector("#tierDescription");
      let heroMeta = heading.querySelector(".minimal-hero-meta");

      if (!heroMeta) {
        heroMeta = document.createElement("div");
        heroMeta.className = "minimal-hero-meta";
        heading.prepend(heroMeta);
      }

      if (eyebrow) {
        eyebrow.textContent = "Loadout Lab";
        if (eyebrow.parentElement !== heroMeta) heroMeta.appendChild(eyebrow);
      }
      if (updatedNote && updatedNote.parentElement !== heroMeta) heroMeta.appendChild(updatedNote);
      if (description) description.textContent = "Schnelle Meta. Klare Loadouts.";
    }

    reorderModes();
    setButtonLabel('.primary-mode-switch .mode-button[data-mode="updates"]', "Updates");
    setButtonLabel('.primary-mode-switch .mode-button[data-mode="mw4-info"]', "MW4");
    setButtonLabel('.primary-mode-switch .mode-button[data-mode="season4-info"]', "Season 4");
    setButtonLabel('.secondary-mode-switch .mode-button[data-mode="warzone-ranked"]', "Warzone");
    setButtonLabel('.secondary-mode-switch .mode-button[data-mode="bo7-ranked"]', "BO7");
    setButtonLabel('.secondary-mode-switch .mode-button[data-mode="camos"]', "Camos");
    setButtonLabel('.content-tabs .content-tab[data-tab="weapons"]', "Waffen");
    setButtonLabel('.content-tabs .content-tab[data-tab="maps"]', "Maps");

    const primarySwitch = section.querySelector(".primary-mode-switch");
    const secondarySwitch = section.querySelector(".secondary-mode-switch");
    const contentTabs = section.querySelector("#contentTabs");
    if (!primarySwitch && !secondarySwitch && !contentTabs) return;

    let panel = Array.from(section.children).find((child) => child.classList?.contains("minimal-control-panel"));
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "minimal-control-panel";
      panel.setAttribute("aria-label", "Schnellauswahl");

      const anchor = primarySwitch || secondarySwitch || contentTabs || section.querySelector(".controls");
      if (anchor?.parentElement === section) section.insertBefore(panel, anchor);
      else if (heading) heading.after(panel);
      else section.prepend(panel);
    }

    panel.replaceChildren(
      ...[
        createControlGroup("Info", primarySwitch),
        createControlGroup("Meta", secondarySwitch),
        createControlGroup("Ansicht", contentTabs, "compact"),
      ].filter(Boolean)
    );
  }

  function init() {
    applyMinimalTop();
    applyImageFixes();
    document.addEventListener("click", () => window.setTimeout(applyMinimalTop, 40), true);
    window.setTimeout(applyMinimalTop, 250);
    window.setTimeout(applyMinimalTop, 1000);
    window.setTimeout(applyImageFixes, 250);
    window.setTimeout(applyImageFixes, 1000);
    const grid = document.getElementById("loadoutGrid");
    if (grid) {
      new MutationObserver(() => applyImageFixes(grid)).observe(grid, { childList: true, subtree: true });
    }
    window.__loadoutImageFixReady = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
