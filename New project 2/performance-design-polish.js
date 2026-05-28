(function () {
  const STYLE_ID = "performance-design-polish-style";

  const css = `
    :root {
      --premium-green: #9cff35;
      --premium-green-2: #25e873;
      --premium-gold: #ffd45c;
      --premium-line: rgba(255, 255, 255, 0.10);
      --premium-panel: rgba(12, 16, 21, 0.94);
      --premium-card-shadow: 0 8px 22px rgba(0, 0, 0, 0.24);
    }

    html {
      scroll-padding-top: 5.25rem;
      scroll-behavior: auto !important;
    }

    body {
      background:
        linear-gradient(180deg, rgba(156, 255, 53, 0.035), transparent 16rem),
        radial-gradient(circle at 18% 8%, rgba(37, 232, 115, 0.07), transparent 28rem),
        #05070a !important;
      text-rendering: optimizeLegibility;
    }

    body::before {
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
      padding-inline: clamp(1rem, 3vw, 2.5rem) !important;
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
      transition: background-color 90ms ease, border-color 90ms ease, color 90ms ease !important;
      transform: none !important;
      will-change: auto !important;
    }

    .primary-mode-switch .mode-button.active,
    .secondary-mode-switch .mode-button.active,
    .content-tab.active,
    .filter-button.active {
      border-color: rgba(156, 255, 53, 0.58) !important;
      box-shadow: 0 0 0 1px rgba(156, 255, 53, 0.18) !important;
    }

    .weapon-compare-panel,
    #weaponComparePanel,
    .meta-patch-summary:empty {
      display: none !important;
    }

    #loadoutGrid,
    #loadoutGrid .tier-section,
    .loadout-grid .tier-section,
    .mode-info-section,
    .updates-section,
    .maps-section,
    .camos-section,
    .mode-info-main img,
    .update-card img,
    .mode-image-gallery img,
    iframe {
      content-visibility: visible !important;
      contain-intrinsic-size: auto !important;
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
      contain: layout paint;
      content-visibility: visible !important;
      contain-intrinsic-size: auto !important;
      box-shadow: var(--premium-card-shadow) !important;
      transform: none !important;
      transition: border-color 90ms ease, background-color 90ms ease !important;
      will-change: auto !important;
    }

    #loadoutGrid .loadout-card:hover,
    .loadout-grid .loadout-card:hover {
      transform: none !important;
      box-shadow: var(--premium-card-shadow) !important;
    }

    #loadoutGrid .loadout-card.tier-absolute-meta,
    .loadout-grid .loadout-card.tier-absolute-meta {
      border-color: rgba(255, 212, 92, 0.54) !important;
      background:
        linear-gradient(120deg, rgba(255, 212, 92, 0.15), rgba(255, 212, 92, 0.035) 34%, rgba(9, 13, 18, 0.92)),
        var(--premium-panel) !important;
    }

    #loadoutGrid .loadout-card.tier-a-tier,
    .loadout-grid .loadout-card.tier-a-tier {
      border-color: rgba(47, 205, 255, 0.34) !important;
    }

    #loadoutGrid .loadout-card.tier-b-tier,
    .loadout-grid .loadout-card.tier-b-tier {
      border-color: rgba(176, 116, 255, 0.32) !important;
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

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
  }

  function optimizeMedia() {
    document.querySelectorAll("img").forEach((image, index) => {
      if (index > 2) image.loading = "lazy";
      image.decoding = "async";
      image.style.transform = "none";
      image.style.willChange = "auto";
    });

    document.querySelectorAll("iframe").forEach((frame) => {
      frame.loading = "lazy";
      frame.style.contain = "layout paint";
    });

    document.querySelectorAll("#weaponComparePanel, .weapon-compare-panel").forEach((panel) => {
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
    });
  }

  function init() {
    installStyle();
    optimizeMedia();
    window.setTimeout(optimizeMedia, 600);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
