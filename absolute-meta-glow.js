(function () {
  if (document.querySelector("#absolute-meta-glow-style")) return;

  const style = document.createElement("style");
  style.id = "absolute-meta-glow-style";
  style.textContent = `
    :root {
      --premium-gold: #ffd86a;
      --premium-gold-soft: rgba(255, 216, 106, 0.18);
      --premium-border: rgba(255, 255, 255, 0.12);
      --premium-panel: rgba(13, 18, 24, 0.92);
    }

    html body {
      background:
        radial-gradient(circle at 18% -8%, rgba(255, 216, 106, 0.09), transparent 29rem),
        radial-gradient(circle at 82% 4%, rgba(53, 215, 255, 0.07), transparent 26rem),
        linear-gradient(180deg, #090c11 0%, #06080c 52%, #040609 100%) !important;
    }

    body .site-header {
      border-bottom-color: rgba(255, 255, 255, 0.09) !important;
      background: rgba(7, 10, 14, 0.9) !important;
      box-shadow: 0 1.1rem 2.4rem rgba(0, 0, 0, 0.34) !important;
    }

    body .brand-mark {
      background: linear-gradient(135deg, #ffd86a, #a6ff4d) !important;
      color: #080b08 !important;
      box-shadow: 0 0.55rem 1.35rem rgba(255, 216, 106, 0.18) !important;
    }

    body .tier-first {
      max-width: min(96rem, calc(100vw - clamp(2rem, 5vw, 6rem))) !important;
      margin-inline: auto !important;
    }

    body .updated-note {
      border: 1px solid rgba(255, 255, 255, 0.11) !important;
      background: rgba(12, 17, 24, 0.82) !important;
      color: #c7cfda !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .primary-mode-switch .mode-button,
    body .secondary-mode-switch .mode-button,
    body .content-tab,
    body .filter-button,
    body .expand-button {
      border-color: rgba(255, 255, 255, 0.12) !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 68%),
        #0d131b !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .primary-mode-switch .mode-button:hover,
    body .secondary-mode-switch .mode-button:hover,
    body .content-tab:hover,
    body .filter-button:hover,
    body .expand-button:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 216, 106, 0.42) !important;
      background:
        linear-gradient(180deg, rgba(255, 216, 106, 0.08), transparent 68%),
        #111923 !important;
      box-shadow: 0 0.7rem 1.4rem rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
    }

    body .primary-mode-switch .mode-button.active,
    body .secondary-mode-switch .mode-button.active,
    body .content-tab.active,
    body .filter-button.active {
      border-color: rgba(185, 255, 61, 0.58) !important;
      background: linear-gradient(135deg, #b9ff3d, #29e681) !important;
      color: #071008 !important;
      box-shadow: 0 0.75rem 1.65rem rgba(41, 230, 129, 0.18) !important;
    }

    body .controls,
    body .weapon-compare-panel,
    body .mode-info-main,
    body .mode-info-side,
    body .update-card,
    body .timeline article,
    body .intel-grid article,
    body .map-panel,
    body .map-board,
    body .camo-header,
    body .camo-card {
      border: 1px solid var(--premium-border) !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 62%),
        var(--premium-panel) !important;
      box-shadow: 0 1.2rem 2.6rem rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body #loadoutGrid > .loadout-card {
      border-radius: 0.48rem !important;
      border-top-color: rgba(255, 255, 255, 0.11) !important;
      border-right-color: rgba(255, 255, 255, 0.1) !important;
      border-bottom-color: rgba(255, 255, 255, 0.09) !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 42%),
        linear-gradient(135deg, rgba(var(--tier-card-rgb, 185, 255, 61), 0.11), rgba(12, 17, 23, 0.94) 36%, rgba(8, 11, 15, 0.96)) !important;
      box-shadow: 0 1.1rem 2.35rem rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body #loadoutGrid > .loadout-card:hover {
      transform: translateY(-2px);
      border-top-color: rgba(var(--tier-card-rgb, 185, 255, 61), 0.24) !important;
      box-shadow: 0 1.45rem 2.9rem rgba(0, 0, 0, 0.42), 0 0 1.3rem rgba(var(--tier-card-rgb, 185, 255, 61), 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
    }

    body .meta-tier-heading {
      border-radius: 0.42rem !important;
      box-shadow: 0 0.85rem 1.8rem rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .meta-tier-heading.tier-heading-meta {
      position: relative !important;
      overflow: hidden !important;
      min-height: 4.75rem !important;
      border-left-width: 1.15rem !important;
      border-color: rgba(255, 216, 106, 0.52) !important;
      border-left-color: var(--premium-gold) !important;
      background:
        linear-gradient(90deg, rgba(255, 216, 106, 0.32), rgba(91, 65, 18, 0.18) 38%, rgba(13, 17, 22, 0.94) 76%),
        #11100c !important;
      box-shadow:
        0 1rem 2.05rem rgba(0, 0, 0, 0.36),
        0 0 1.5rem rgba(255, 216, 106, 0.13),
        inset 0 0 0 1px rgba(255, 236, 168, 0.16) !important;
      animation: none !important;
    }

    body .meta-tier-heading.tier-heading-meta::before,
    body .meta-tier-heading.tier-heading-meta::after {
      animation: none !important;
      pointer-events: none !important;
    }

    body .meta-tier-heading.tier-heading-meta::before {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 48%),
        radial-gradient(circle at 12% 50%, rgba(255, 239, 171, 0.22), transparent 18rem) !important;
    }

    body .meta-tier-heading.tier-heading-meta span {
      position: relative !important;
      color: #ffe08a !important;
      font-size: clamp(1.56rem, 1.95vw, 2rem) !important;
      text-shadow: 0 0 0.8rem rgba(255, 216, 106, 0.28) !important;
    }

    body .meta-tier-heading.tier-heading-meta small {
      position: relative !important;
      color: #f5d36f !important;
      text-shadow: none !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta {
      border-left-color: var(--premium-gold) !important;
      outline-color: rgba(255, 216, 106, 0.26) !important;
      background:
        radial-gradient(circle at 12% 22%, rgba(255, 216, 106, 0.14), transparent 17rem),
        linear-gradient(135deg, rgba(255, 216, 106, 0.14), rgba(64, 49, 19, 0.18) 40%, rgba(11, 13, 16, 0.96) 74%),
        #11100c !important;
      box-shadow: 0 1.25rem 2.6rem rgba(0, 0, 0, 0.42), 0 0 1.1rem rgba(255, 216, 106, 0.1), inset 0 0 0 1px rgba(255, 216, 106, 0.1) !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta .rank-badge,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .score-chip {
      border-color: rgba(255, 230, 139, 0.72) !important;
      background: linear-gradient(135deg, #ffe08a, #f2b93b) !important;
      color: #161007 !important;
      box-shadow: 0 0.8rem 1.55rem rgba(242, 185, 59, 0.2) !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta .mode-pill,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .range,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .details-kicker {
      color: #ffe08a !important;
    }
  `;
  document.head.appendChild(style);
}());
