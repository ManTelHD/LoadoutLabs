(function () {
  const STYLE_ID = "performance-design-polish-style";

  const css = `
    :root {
      --premium-green: #9cff35;
      --premium-green-2: #25e873;
      --premium-gold: #ffd45c;
      --premium-line: rgba(255, 255, 255, 0.11);
      --premium-panel: rgba(12, 16, 21, 0.94);
      --premium-panel-soft: rgba(17, 23, 30, 0.88);
      --premium-card-shadow: 0 12px 34px rgba(0, 0, 0, 0.30);
    }

    html {
      scroll-padding-top: 5.25rem;
    }

    body {
      background:
        linear-gradient(180deg, rgba(156, 255, 53, 0.045), transparent 18rem),
        radial-gradient(circle at 18% 8%, rgba(37, 232, 115, 0.10), transparent 30rem),
        radial-gradient(circle at 82% 14%, rgba(255, 212, 92, 0.08), transparent 26rem),
        #05070a !important;
      text-rendering: optimizeLegibility;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
      background-size: 72px 72px;
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.52), transparent 72%);
    }

    .site-header {
      transform: translateZ(0);
      backface-visibility: hidden;
      box-shadow: 0 10px 34px rgba(0, 0, 0, 0.28) !important;
    }

    .brand-mark {
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 0 0 3px rgba(156, 255, 53, 0.13), 0 10px 28px rgba(37, 232, 115, 0.18) !important;
    }

    .tier-first {
      max-width: 92rem;
      margin-inline: auto;
      padding-inline: clamp(1rem, 3vw, 2.5rem) !important;
    }

    .tier-first .section-heading {
      position: relative;
      overflow: hidden;
      max-width: 100% !important;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-left: 5px solid var(--premium-green);
      border-radius: 0.55rem;
      padding: clamp(1rem, 2.2vw, 1.55rem) clamp(1rem, 2.4vw, 1.7rem) !important;
      background:
        linear-gradient(120deg, rgba(156, 255, 53, 0.12), transparent 36%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 74%),
        rgba(10, 14, 19, 0.86) !important;
      box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
      contain: layout paint;
    }

    .tier-first .section-heading::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.075), transparent);
      transform: translateX(-72%);
      opacity: 0.45;
    }

    .tier-first h1 {
      line-height: 0.95 !important;
      text-wrap: balance;
    }

    .updated-note {
      border-color: rgba(255, 212, 92, 0.34) !important;
      background: rgba(9, 12, 17, 0.88) !important;
      box-shadow: none !important;
    }

    .primary-mode-switch,
    .secondary-mode-switch,
    .content-tabs {
      max-width: 100% !important;
      contain: layout paint;
    }

    .primary-mode-switch .mode-button,
    .secondary-mode-switch .mode-button,
    .content-tab,
    .filter-button {
      transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease !important;
      transform: none !important;
    }

    .primary-mode-switch .mode-button.active,
    .secondary-mode-switch .mode-button.active,
    .content-tab.active,
    .filter-button.active {
      border-color: rgba(156, 255, 53, 0.62) !important;
      box-shadow: 0 0 0 1px rgba(156, 255, 53, 0.20), 0 8px 24px rgba(37, 232, 115, 0.18) !important;
    }

    .controls,
    .toolbar {
      box-shadow: none !important;
      border-color: rgba(255, 255, 255, 0.10) !important;
      background: rgba(9, 13, 18, 0.74) !important;
      contain: layout paint;
    }

    .weapon-compare-panel:empty,
    .meta-patch-summary:empty {
      display: none !important;
    }

    #loadoutGrid {
      content-visibility: auto;
      contain-intrinsic-size: 1200px;
    }

    #loadoutGrid .tier-section,
    .loadout-grid .tier-section {
      content-visibility: auto;
      contain-intrinsic-size: 720px;
    }

    #loadoutGrid .tier-header,
    .loadout-grid .tier-header {
      position: relative;
      overflow: hidden;
      border-radius: 0.45rem !important;
      box-shadow: none !important;
    }

    #loadoutGrid .loadout-card,
    .loadout-grid .loadout-card {
      isolation: isolate;
      contain: layout paint style;
      content-visibility: auto;
      contain-intrinsic-size: 17rem;
      box-shadow: var(--premium-card-shadow) !important;
      transform: none !important;
      transition: border-color 130ms ease, background-color 130ms ease, box-shadow 130ms ease !important;
      will-change: auto !important;
    }

    #loadoutGrid .loadout-card:hover,
    .loadout-grid .loadout-card:hover {
      transform: none !important;
      box-shadow: 0 14px 38px rgba(0, 0, 0, 0.34) !important;
    }

    #loadoutGrid .loadout-card.tier-absolute-meta,
    .loadout-grid .loadout-card.tier-absolute-meta {
      border-color: rgba(255, 212, 92, 0.54) !important;
      background:
        linear-gradient(120deg, rgba(255, 212, 92, 0.17), rgba(255, 212, 92, 0.035) 34%, rgba(9, 13, 18, 0.92)),
        var(--premium-panel) !important;
    }

    #loadoutGrid .loadout-card.tier-a-tier,
    .loadout-grid .loadout-card.tier-a-tier {
      border-color: rgba(47, 205, 255, 0.36) !important;
    }

    #loadoutGrid .loadout-card.tier-b-tier,
    .loadout-grid .loadout-card.tier-b-tier {
      border-color: rgba(176, 116, 255, 0.34) !important;
    }

    #loadoutGrid .loadout-card .weapon-art,
    .loadout-grid .loadout-card .weapon-art {
      flex-shrink: 0;
      border-radius: 0.45rem !important;
      box-shadow: none !important;
      transform: none !important;
      will-change: auto !important;
      contain: strict !important;
    }

    #loadoutGrid .loadout-card .weapon-art img,
    .loadout-grid .loadout-card .weapon-art img {
      transform: none !important;
      transition: none !important;
      animation: none !important;
      will-change: auto !important;
      object-fit: contain !important;
    }

    .weapon-name {
      text-wrap: balance;
    }

    .meta-card-details,
    .card-details {
      contain: layout paint;
    }

    .attachment-list,
    .perk-list,
    .premium-attachment-list,
    .premium-perk-list {
      box-shadow: none !important;
      background: rgba(10, 12, 10, 0.46) !important;
    }

    .expand-button,
    .copy-button {
      border-radius: 0.42rem !important;
      transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease !important;
      transform: none !important;
    }

    .expand-button:hover,
    .copy-button:hover {
      transform: none !important;
    }

    .mode-info-section,
    .updates-section,
    .maps-section,
    .camos-section {
      content-visibility: auto;
      contain-intrinsic-size: 900px;
    }

    .mode-info-main img,
    .update-card img,
    .mode-image-gallery img,
    iframe {
      content-visibility: auto;
      contain: layout paint;
    }

    @media (max-width: 760px) {
      .tier-first {
        padding-inline: 0.85rem !important;
      }

      .primary-mode-switch,
      .secondary-mode-switch {
        grid-template-columns: 1fr !important;
      }

      #loadoutGrid .loadout-card,
      .loadout-grid .loadout-card {
        contain-intrinsic-size: 19rem;
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

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.append(style);
  }

  function optimizeMedia() {
    const images = Array.from(document.images);
    images.forEach((image, index) => {
      if (index > 2) image.loading = "lazy";
      image.decoding = "async";
      if (!image.getAttribute("width") && image.naturalWidth) image.setAttribute("width", image.naturalWidth);
      if (!image.getAttribute("height") && image.naturalHeight) image.setAttribute("height", image.naturalHeight);
      image.style.transform = "none";
      image.style.willChange = "auto";
    });

    document.querySelectorAll("iframe").forEach((frame) => {
      frame.loading = "lazy";
      frame.setAttribute("allow", frame.getAttribute("allow") || "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      frame.style.contain = "layout paint";
    });
  }

  function trimDeadPanels() {
    document.querySelectorAll("#weaponComparePanel, .weapon-compare-panel").forEach((panel) => {
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
    });
  }

  let scheduled = false;
  function scheduleOptimize() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      optimizeMedia();
      trimDeadPanels();
    });
  }

  function init() {
    installStyle();
    optimizeMedia();
    trimDeadPanels();
    [250, 900, 1800].forEach((delay) => window.setTimeout(scheduleOptimize, delay));

    const grid = document.getElementById("loadoutGrid");
    if (grid && grid.dataset.performanceDesignWatched !== "true") {
      grid.dataset.performanceDesignWatched = "true";
      new MutationObserver(scheduleOptimize).observe(grid, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
