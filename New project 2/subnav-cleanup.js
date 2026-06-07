(function () {
  const STYLE_ID = "subnav-cleanup-20260601";
  const MINIMAL_REFRESH_DELAYS = new Set([40, 180, 250, 450, 900, 1000, 1600, 2500, 5000]);
  let switchToken = 0;
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

    body .minimal-control-panel .minimal-control-group:has(> [hidden]) {
      display: none !important;
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
      height: var(--ll-top-panel-height, auto) !important;
      min-height: var(--ll-top-panel-height, auto) !important;
      overflow: hidden !important;
      contain: layout paint !important;
      transition: none !important;
    }

    body.ll-top-switching .minimal-control-panel *,
    body.ll-top-switching .minimal-hero,
    body.ll-top-switching .tier-first > .tab-panel {
      transition: none !important;
      animation: none !important;
    }

    body .weapon-art,
    body .weapon-thumb,
    body .camo-swatch,
    body .mode-image-gallery figure,
    body #loadoutGrid .weapon-art,
    body #loadoutGrid .loadout-card .weapon-art,
    body .loadout-grid .loadout-card .weapon-art,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
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
    body .weapon-thumb img,
    body #loadoutGrid .weapon-art img,
    body #loadoutGrid .loadout-card .weapon-art img,
    body .loadout-grid .loadout-card .weapon-art img {
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

  function getClosestTopControl(target) {
    const element = target?.nodeType === 1 ? target : target?.parentElement;
    return element?.closest?.(".minimal-control-panel, .primary-mode-switch, .secondary-mode-switch, .content-tabs");
  }

  function ensureControlGroup(panel, key, label, element, className = "") {
    if (!panel || !element) return null;
    let group = panel.querySelector(`.minimal-control-group[data-control-group="${key}"]`);
    if (!group) {
      group = document.createElement("div");
      group.className = "minimal-control-group";
      group.dataset.controlGroup = key;
    }

    group.classList.toggle("compact", className === "compact");
    group.hidden = Boolean(element.hidden);

    let groupLabel = Array.from(group.children).find((child) => child.classList?.contains("minimal-control-label"));
    if (!groupLabel) {
      groupLabel = document.createElement("span");
      groupLabel.className = "minimal-control-label";
      group.prepend(groupLabel);
    }
    groupLabel.textContent = label;

    if (element.parentElement !== group) group.append(element);
    return group;
  }

  function syncControlGroups(panel, groups) {
    const ordered = groups.filter(Boolean);
    ordered.forEach((group, index) => {
      if (group.parentElement !== panel) panel.append(group);
      const current = Array.from(panel.children).filter((child) => child.classList?.contains("minimal-control-group"))[index];
      if (current !== group) panel.insertBefore(group, current || null);
    });

    panel.querySelectorAll(".minimal-control-group").forEach((group) => {
      if (!ordered.includes(group)) group.remove();
    });
  }

  function syncMinimalPanel() {
    const section = document.querySelector(".tier-first");
    if (!section) return;

    const primarySwitch = document.querySelector(".primary-mode-switch");
    const secondarySwitch = document.querySelector(".secondary-mode-switch");
    const contentTabs = document.querySelector("#contentTabs");
    if (!primarySwitch && !secondarySwitch && !contentTabs) return;

    let panel = Array.from(section.children).find((child) => child.classList?.contains("minimal-control-panel"));
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "minimal-control-panel";
      panel.setAttribute("aria-label", "Schnellauswahl");
      const heading = section.querySelector(".section-heading");
      const anchor = primarySwitch || secondarySwitch || contentTabs || section.querySelector(".controls");
      if (anchor?.parentElement === section) section.insertBefore(panel, anchor);
      else if (heading) heading.after(panel);
      else section.prepend(panel);
    }

    syncControlGroups(panel, [
      ensureControlGroup(panel, "info", "Info", primarySwitch),
      ensureControlGroup(panel, "meta", "Meta", secondarySwitch),
      ensureControlGroup(panel, "view", "Ansicht", contentTabs, "compact"),
    ]);
  }

  function patchMinimalRefreshTimers() {
    if (window.__loadoutLabStableMinimalTimeoutPatch) return;
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.__loadoutLabStableMinimalTimeoutPatch = true;
    window.setTimeout = function stableMinimalSetTimeout(handler, delay, ...args) {
      if (typeof handler === "function" && handler.name === "applyMinimalTop" && MINIMAL_REFRESH_DELAYS.has(Number(delay))) {
        return nativeSetTimeout(() => {
          refresh();
          syncMinimalPanel();
        }, Math.min(Number(delay) || 0, 24));
      }
      return nativeSetTimeout(handler, delay, ...args);
    };
  }

  function markSwitching() {
    const token = ++switchToken;
    const panel = document.querySelector(".minimal-control-panel");
    if (panel) {
      const height = Math.ceil(panel.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--ll-top-panel-height", `${height}px`);
    }
    document.body?.classList.add("ll-top-switching");
    window.setTimeout(() => {
      if (token !== switchToken) return;
      document.body?.classList.remove("ll-top-switching");
      document.documentElement.style.removeProperty("--ll-top-panel-height");
    }, 220);
  }

  function scheduleRefresh() {
    markSwitching();
    refresh();
    syncMinimalPanel();
    if (window.requestAnimationFrame) window.requestAnimationFrame(() => {
      refresh();
      syncMinimalPanel();
    });
    [16, 60, 140, 320, 760, 1400, 2400].forEach((delay) => {
      window.setTimeout(() => {
        refresh();
        syncMinimalPanel();
      }, delay);
    });
  }

  function init() {
    patchMinimalRefreshTimers();
    refresh();
    syncMinimalPanel();
    scheduleRefresh();
    ["pointerdown", "mousedown", "touchstart", "keydown", "click"].forEach((eventName) => {
      document.addEventListener(eventName, (event) => {
        if (eventName === "keydown" && !["Enter", " "].includes(event.key)) return;
        if (getClosestTopControl(event.target)) scheduleRefresh();
      }, true);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());