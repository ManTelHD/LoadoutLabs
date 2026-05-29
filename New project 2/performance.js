(function () {
  const STYLE_ID = "loadoutlab-performance-20260529";

  const css = `
    :root {
      --premium-green: #9cff35;
      --premium-green-2: #25e873;
      --premium-gold: #ffd35a;
      --premium-line: rgba(255, 255, 255, 0.10);
      --premium-panel: rgba(12, 16, 21, 0.94);
      --premium-card-shadow: 0 8px 20px rgba(0, 0, 0, 0.24);
    }

    html {
      scroll-padding-top: 5.25rem;
      scroll-behavior: auto !important;
    }

    body {
      background:
        linear-gradient(180deg, rgba(156, 255, 53, 0.03), transparent 15rem),
        radial-gradient(circle at 18% 8%, rgba(37, 232, 115, 0.055), transparent 26rem),
        #05070a !important;
      text-rendering: optimizeLegibility;
    }

    body::before,
    .weapon-compare-panel,
    #weaponComparePanel,
    .meta-patch-summary:empty {
      display: none !important;
      content: none !important;
    }

    .site-header {
      transform: none !important;
      backface-visibility: visible !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22) !important;
    }

    .brand-mark {
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 0 0 2px rgba(156, 255, 53, 0.11) !important;
    }

    .tier-first {
      max-width: 92rem;
      margin-inline: auto;
      padding-inline: clamp(0.9rem, 2.35vw, 2rem) !important;
    }

    .tier-first .section-heading {
      max-width: 100% !important;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-left: 5px solid var(--premium-green);
      border-radius: 0.55rem;
      padding: clamp(1rem, 2.2vw, 1.55rem) clamp(1rem, 2.4vw, 1.7rem) !important;
      background:
        linear-gradient(120deg, rgba(156, 255, 53, 0.10), transparent 38%),
        rgba(10, 14, 19, 0.88) !important;
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.22) !important;
      contain: layout paint;
    }

    .tier-first .section-heading::after {
      content: none !important;
    }

    .tier-first h1 {
      line-height: 0.95 !important;
      text-wrap: balance;
    }

    .updated-note {
      border-color: rgba(255, 212, 92, 0.30) !important;
      background: rgba(9, 12, 17, 0.88) !important;
      box-shadow: none !important;
    }

    .primary-mode-switch,
    .secondary-mode-switch,
    .content-tabs,
    .controls,
    .toolbar {
      max-width: 100% !important;
      contain: layout paint;
      box-shadow: none !important;
    }

    .primary-mode-switch .mode-button,
    .secondary-mode-switch .mode-button,
    .content-tab,
    .filter-button,
    .expand-button,
    .copy-button {
      transform: none !important;
      will-change: auto !important;
      transition: background-color 80ms ease, border-color 80ms ease, color 80ms ease !important;
    }

    .primary-mode-switch .mode-button.active,
    .secondary-mode-switch .mode-button.active,
    .content-tab.active,
    .filter-button.active {
      border-color: rgba(156, 255, 53, 0.58) !important;
      box-shadow: 0 0 0 1px rgba(156, 255, 53, 0.18) !important;
    }

    iframe[data-deferred-src] {
      background: #05070a !important;
    }

    #loadoutGrid {
      contain: layout paint style;
    }

    #loadoutGrid .meta-tier-heading,
    .loadout-grid .meta-tier-heading,
    #loadoutGrid .tier-header,
    .loadout-grid .tier-header {
      position: relative;
      overflow: hidden;
      border-radius: 0.45rem !important;
      box-shadow: none !important;
      contain: layout paint;
      content-visibility: auto;
      contain-intrinsic-size: 4.5rem;
    }

    #loadoutGrid .loadout-card,
    .loadout-grid .loadout-card {
      isolation: isolate;
      contain: layout paint style;
      content-visibility: auto !important;
      contain-intrinsic-size: 9.5rem;
      box-shadow: var(--premium-card-shadow) !important;
      transform: none !important;
      transition: border-color 80ms ease, background-color 80ms ease !important;
      will-change: auto !important;
    }

    #loadoutGrid .loadout-card.expanded,
    .loadout-grid .loadout-card.expanded {
      content-visibility: visible !important;
      contain-intrinsic-size: auto;
    }

    #loadoutGrid .loadout-card:hover,
    .loadout-grid .loadout-card:hover {
      transform: none !important;
      box-shadow: var(--premium-card-shadow) !important;
    }

    #loadoutGrid .loadout-card .weapon-art,
    .loadout-grid .loadout-card .weapon-art {
      flex-shrink: 0;
      border-radius: 0.45rem !important;
      box-shadow: none !important;
      transform: none !important;
      will-change: auto !important;
      contain: layout paint !important;
    }

    #loadoutGrid .loadout-card .weapon-art img,
    .loadout-grid .loadout-card .weapon-art img,
    #loadoutGrid .loadout-card:hover .weapon-art img,
    .loadout-grid .loadout-card:hover .weapon-art img {
      transform: none !important;
      transition: none !important;
      animation: none !important;
      will-change: auto !important;
      object-fit: contain !important;
      filter: none !important;
    }

    #loadoutGrid .loadout-card.details-flash::after,
    #loadoutGrid .loadout-card.details-flash .expand-button::after,
    #loadoutGrid .loadout-card.expanded .attachment-columns,
    #loadoutGrid .loadout-card .meta-card-details,
    #loadoutGrid .loadout-card .card-details {
      animation: none !important;
      transition: none !important;
    }

    #loadoutGrid .loadout-card .meta-card-details,
    #loadoutGrid .loadout-card .card-details {
      contain: layout paint style !important;
    }

    #loadoutGrid .loadout-card:not(.expanded) .meta-card-details,
    #loadoutGrid .loadout-card:not(.expanded) .card-details,
    #loadoutGrid .loadout-card .meta-card-details[hidden],
    #loadoutGrid .loadout-card .card-details[hidden] {
      display: none !important;
    }

    #loadoutGrid .loadout-card.expand-animating {
      z-index: auto !important;
    }

    .weapon-name {
      text-wrap: balance;
    }

    .attachment-list,
    .perk-list,
    .premium-attachment-list,
    .premium-perk-list {
      box-shadow: none !important;
      background: rgba(10, 12, 10, 0.44) !important;
    }

    .mode-info-main,
    .mode-info-side,
    .update-card,
    .map-panel,
    .map-board,
    .camo-card,
    .timeline article {
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    #loadoutGrid .meta-tier-heading.tier-heading-meta,
    #loadoutGrid .tier-heading-meta,
    #loadoutGrid .tier-group.tier-absolute-meta .tier-header {
      --tier-color: #ffd35a !important;
      --tier-rgb: 255, 211, 90 !important;
      --heading-tier-color: #ffd35a !important;
      --heading-tier-rgb: 255, 211, 90 !important;
      border-color: rgba(255, 211, 90, 0.56) !important;
      border-left-color: #ffd35a !important;
      background:
        linear-gradient(90deg, rgba(255, 211, 90, 0.34), rgba(255, 184, 46, 0.13) 42%, rgba(255, 255, 255, 0.035)),
        #171409 !important;
      box-shadow:
        0 0.85rem 1.8rem rgba(0, 0, 0, 0.30),
        0 0 1.65rem rgba(255, 211, 90, 0.18) !important;
    }

    #loadoutGrid .meta-tier-heading.tier-heading-meta span,
    #loadoutGrid .meta-tier-heading.tier-heading-meta small,
    #loadoutGrid .tier-heading-meta span,
    #loadoutGrid .tier-heading-meta small,
    #loadoutGrid .tier-group.tier-absolute-meta .tier-header h3,
    #loadoutGrid .tier-group.tier-absolute-meta .tier-header span {
      color: #ffd35a !important;
      text-shadow: 0 0 1rem rgba(255, 211, 90, 0.30) !important;
    }

    #loadoutGrid .loadout-card.tier-card-meta,
    #loadoutGrid .loadout-card.tier-absolute-meta,
    #loadoutGrid .tier-group.tier-absolute-meta .loadout-card {
      --tier-card-color: #ffd35a !important;
      --tier-card-rgb: 255, 211, 90 !important;
      border-color: rgba(255, 211, 90, 0.48) !important;
      background:
        linear-gradient(135deg, rgba(255, 211, 90, 0.22), rgba(255, 184, 46, 0.09) 44%, rgba(255, 255, 255, 0.025)),
        #141208 !important;
      box-shadow:
        inset 0.48rem 0 0 rgba(255, 211, 90, 0.94),
        0 0 0 1px rgba(255, 211, 90, 0.14),
        0 0.75rem 1.65rem rgba(0, 0, 0, 0.28),
        0 0 1.35rem rgba(255, 211, 90, 0.13) !important;
    }

    #loadoutGrid .loadout-card.tier-card-meta .rank-badge,
    #loadoutGrid .loadout-card.tier-absolute-meta .rank-badge,
    #loadoutGrid .tier-group.tier-absolute-meta .rank-badge {
      background: linear-gradient(135deg, #ffb82e, #ffe58d 58%, #ffd35a) !important;
      color: #1a1200 !important;
    }

    #loadoutGrid .loadout-card.tier-card-meta .mode-pill,
    #loadoutGrid .loadout-card.tier-absolute-meta .mode-pill,
    #loadoutGrid .tier-group.tier-absolute-meta .mode-pill,
    #loadoutGrid .loadout-card.tier-card-meta .meta-score-pill span,
    #loadoutGrid .loadout-card.tier-card-meta .meta-score-pill em,
    #loadoutGrid .loadout-card.tier-absolute-meta .meta-score-pill span,
    #loadoutGrid .loadout-card.tier-absolute-meta .meta-score-pill em,
    #loadoutGrid .tier-group.tier-absolute-meta .meta-score-pill span,
    #loadoutGrid .tier-group.tier-absolute-meta .meta-score-pill em,
    #loadoutGrid .loadout-card.tier-card-meta .slot-type,
    #loadoutGrid .loadout-card.tier-absolute-meta .slot-type,
    #loadoutGrid .tier-group.tier-absolute-meta .slot-type {
      color: #ffd35a !important;
    }

    #loadoutGrid .loadout-card.tier-card-meta .perk-chip span,
    #loadoutGrid .loadout-card.tier-absolute-meta .perk-chip span,
    #loadoutGrid .tier-group.tier-absolute-meta .perk-chip span,
    #loadoutGrid .loadout-card.tier-card-meta .expand-button:hover,
    #loadoutGrid .loadout-card.tier-card-meta.expanded .expand-button,
    #loadoutGrid .loadout-card.tier-absolute-meta .expand-button:hover,
    #loadoutGrid .loadout-card.tier-absolute-meta.expanded .expand-button {
      background: #ffd35a !important;
      color: #071008 !important;
    }

    @media (max-width: 760px) {
      .tier-first {
        padding-inline: 0.85rem !important;
      }

      .primary-mode-switch,
      .secondary-mode-switch {
        grid-template-columns: 1fr !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.001ms !important;
      }
    }
  `;

  let mediaQueued = false;
  let renderQueued = false;
  let gridObserver = null;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
  }

  function closestPanel(element) {
    return element.closest(".tab-panel, .mode-info-section, .updates-section, .maps-section, .camos-section");
  }

  function panelIsInactive(panel) {
    return !!panel && (panel.hidden || panel.getAttribute("aria-hidden") === "true" || (panel.classList.contains("tab-panel") && !panel.classList.contains("active")));
  }

  function visibleSoon(element) {
    const rect = element.getBoundingClientRect();
    const height = window.innerHeight || document.documentElement.clientHeight || 900;
    return rect.top < height + 220 && rect.bottom > -120;
  }

  function tuneImage(image, index = 10) {
    if (!image || image.dataset.llMediaTuned === "true") return;
    image.dataset.llMediaTuned = "true";
    image.decoding = "async";
    image.style.transform = "none";
    image.style.willChange = "auto";

    const inactive = panelIsInactive(closestPanel(image));
    const priorityImage = !inactive && (index < 4 || visibleSoon(image));
    image.loading = priorityImage ? "eager" : "lazy";
    image.fetchPriority = priorityImage ? "high" : "low";

    if (!image.getAttribute("width") && image.closest(".weapon-art")) image.setAttribute("width", "320");
    if (!image.getAttribute("height") && image.closest(".weapon-art")) image.setAttribute("height", "180");
  }

  function tuneImages(root = document) {
    const images = root.matches?.("img") ? [root] : [...root.querySelectorAll?.("img") || []];
    images.forEach(tuneImage);
  }

  function deferInactiveIframe(frame) {
    if (!frame) return;
    frame.loading = "lazy";
    frame.style.contain = "layout paint";

    const inactive = panelIsInactive(closestPanel(frame));
    const src = frame.getAttribute("src");
    const deferred = frame.dataset.deferredSrc;

    if (inactive && src) {
      frame.dataset.deferredSrc = src;
      frame.removeAttribute("src");
      return;
    }

    if (!inactive && !src && deferred) {
      frame.setAttribute("src", deferred);
    }
  }

  function tuneIframes(root = document) {
    const frames = root.matches?.("iframe") ? [root] : [...root.querySelectorAll?.("iframe") || []];
    frames.forEach(deferInactiveIframe);
  }

  function stripLegacyBlocks() {
    document.querySelectorAll("#weaponComparePanel, .weapon-compare-panel").forEach((element) => element.remove());
  }

  function optimizeMedia(root = document) {
    tuneImages(root);
    tuneIframes(root);
    stripLegacyBlocks();
  }

  function scheduleMediaPass(delay = 0) {
    if (mediaQueued) return;
    mediaQueued = true;
    window.setTimeout(() => {
      const run = () => {
        mediaQueued = false;
        optimizeMedia();
      };
      if (delay > 120 && "requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 800 });
      else window.requestAnimationFrame(run);
    }, delay);
  }

  function hasDetailsContent(details) {
    return !!details && !!details.querySelector(".premium-details-grid, .attachment-columns, .premium-attachment-list, .detail-panel");
  }

  function detailsTemplate(card) {
    return [...card.children].find((child) => child.matches?.("template.meta-details-template"));
  }

  function parkCardDetails(card) {
    if (!card || card.classList.contains("expanded")) return false;
    const details = card.querySelector(".meta-card-details, .card-details");
    if (!details || !hasDetailsContent(details)) return false;

    let template = detailsTemplate(card);
    if (!template) {
      template = document.createElement("template");
      template.className = "meta-details-template";
      details.after(template);
    }

    while (details.firstChild) template.content.append(details.firstChild);
    details.hidden = true;
    details.dataset.lazyDetails = "parked";
    return true;
  }

  function parkDetails(root = document) {
    const cards = root.matches?.("#loadoutGrid .loadout-card") ? [root] : [...root.querySelectorAll?.("#loadoutGrid .loadout-card:not(.expanded)") || []];
    let parked = 0;
    cards.forEach((card) => {
      if (parkCardDetails(card)) parked += 1;
    });
    window.__loadoutLabParkedDetails = parked;
  }

  function hydrateDetails(card) {
    const details = card.querySelector(".meta-card-details, .card-details");
    if (!details) return null;

    const template = detailsTemplate(card);
    if (template && !hasDetailsContent(details)) {
      details.append(template.content);
      template.remove();
    }

    details.hidden = false;
    details.dataset.lazyDetails = "hydrated";
    return details;
  }

  function setButtonState(card, open) {
    const button = card.querySelector(".expand-button");
    if (!button) return;
    button.setAttribute("aria-expanded", String(open));
    const label = button.querySelector("span");
    if (label) label.textContent = open ? "Schließen" : "Details";
  }

  function ignoredClick(event, card) {
    if (event.target.closest(".card-details, .meta-card-details, .attachment-list, .perk-list, a, input, select, textarea")) return true;
    const button = event.target.closest("button");
    return button && !button.classList.contains("expand-button") && card.contains(button);
  }

  function toggleDetails(card, open) {
    const details = open ? hydrateDetails(card) : card.querySelector(".meta-card-details, .card-details");
    if (!details) return;

    details.getAnimations?.().forEach((animation) => animation.cancel());
    card.classList.remove("details-flash", "expand-animating");
    card.classList.toggle("expanded", open);
    setButtonState(card, open);

    details.hidden = !open;
    details.style.display = open ? "block" : "";
    details.style.height = "";
    details.style.opacity = "";
    details.style.overflow = "";

    if (!open) parkCardDetails(card);
    scheduleMediaPass(40);
  }

  function activePanel() {
    return document.querySelector(".tab-panel.active")?.dataset.panel || "weapons";
  }

  function call(name) {
    if (typeof window[name] === "function") window[name]();
  }

  function renderActivePanel() {
    const panel = activePanel();
    if (panel === "maps") call("renderMaps");
    else if (panel === "camos") call("renderCamos");
    else if (panel === "mode-info") call("renderModeInfo");
    else if (panel === "updates") call("renderUpdateMode");

    stripLegacyBlocks();
    parkDetails();
    scheduleMediaPass(80);
    window.dispatchEvent(new CustomEvent("loadoutlab:lite-render", { detail: { panel } }));
  }

  function patchRenderLoadouts() {
    if (window.__loadoutLabLiteRenderReady || typeof window.renderLoadouts !== "function") return;
    window.__loadoutLabLiteRenderReady = true;
    window.__loadoutLabOriginalRenderLoadouts = window.renderLoadouts;
    window.renderLoadouts = function liteRenderLoadouts() {
      call("renderMode");
      renderActivePanel();
    };
  }

  function scheduleActiveRender() {
    if (renderQueued) return;
    renderQueued = true;
    window.requestAnimationFrame(() => {
      renderQueued = false;
      renderActivePanel();
    });
  }

  function cardsFromMutations(mutations) {
    const cards = new Set();
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches("#loadoutGrid .loadout-card")) cards.add(node);
        node.querySelectorAll?.(".loadout-card").forEach((card) => cards.add(card));
      });
    }
    return [...cards];
  }

  function observeGrid() {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.llPerformanceObserver === "true") return;
    grid.dataset.llPerformanceObserver = "true";

    gridObserver = new MutationObserver((mutations) => {
      const cards = cardsFromMutations(mutations);
      if (!cards.length) return;
      cards.forEach(parkCardDetails);
      cards.forEach(tuneImages);
      stripLegacyBlocks();
    });

    gridObserver.observe(grid, { childList: true });
  }

  function bindEvents() {
    if (window.__loadoutLabPerformanceReady) return;
    window.__loadoutLabPerformanceReady = true;

    document.addEventListener("click", (event) => {
      const card = event.target.closest("#loadoutGrid .loadout-card");
      if (card && !ignoredClick(event, card)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        toggleDetails(card, !card.classList.contains("expanded"));
        return;
      }

      if (event.target.closest(".content-tab, .primary-mode-switch .mode-button, .secondary-mode-switch .mode-button, #filterToolbar .filter-button")) {
        scheduleActiveRender();
        scheduleMediaPass(100);
      }
    }, true);

    document.addEventListener("input", (event) => {
      if (event.target.matches("#loadoutSearch, #weaponSearch")) {
        window.setTimeout(() => {
          parkDetails();
          scheduleMediaPass(60);
        }, 140);
      }
    });

    document.addEventListener("change", (event) => {
      if (event.target.matches("#sortSelect")) {
        scheduleActiveRender();
        window.setTimeout(parkDetails, 80);
      }
    });

    window.addEventListener("loadoutlab:lite-render", () => {
      parkDetails();
      scheduleMediaPass(80);
    });
  }

  function init() {
    installStyle();
    patchRenderLoadouts();
    bindEvents();
    observeGrid();
    stripLegacyBlocks();
    parkDetails();
    optimizeMedia();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(init, 120);
  window.setTimeout(init, 700);
  window.addEventListener("pagehide", () => gridObserver?.disconnect(), { once: true });
}());
