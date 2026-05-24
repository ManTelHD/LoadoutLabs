(function () {
  if (document.querySelector("#premium-accents-style")) return;

  const style = document.createElement("style");
  style.id = "premium-accents-style";
  style.textContent = `
    @keyframes premiumEdgeDrift {
      0%, 100% { background-position: 0% 50%; opacity: 0.48; }
      50% { background-position: 100% 50%; opacity: 0.78; }
    }

    @keyframes premiumActiveBreath {
      0%, 100% { box-shadow: 0 0.65rem 1.35rem rgba(41, 230, 129, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.16); }
      50% { box-shadow: 0 0.85rem 1.75rem rgba(185, 255, 61, 0.24), 0 0 1.3rem rgba(41, 230, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.18); }
    }

    @keyframes premiumGoldRest {
      0%, 100% { opacity: 0.18; transform: translateX(-8%); }
      50% { opacity: 0.3; transform: translateX(8%); }
    }

    body .tier-first .section-heading,
    body .meta-tier-heading,
    body #loadoutGrid > .loadout-card,
    body .mode-info-main,
    body .mode-info-side,
    body .controls {
      position: relative !important;
    }

    body .tier-first .section-heading::after {
      background:
        linear-gradient(110deg, transparent 0%, rgba(255, 216, 106, 0.1) 34%, rgba(185, 255, 61, 0.1) 50%, transparent 72%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 54%) !important;
      background-size: 240% 100%, 100% 100% !important;
      animation: premiumEdgeDrift 11s ease-in-out infinite !important;
    }

    body .primary-mode-switch .mode-button.active,
    body .secondary-mode-switch .mode-button.active,
    body .content-tab.active,
    body .filter-button.active {
      animation: premiumActiveBreath 5.5s ease-in-out infinite !important;
    }

    body .primary-mode-switch .mode-button,
    body .secondary-mode-switch .mode-button,
    body .content-tab,
    body .filter-button,
    body .expand-button,
    body #loadoutGrid > .loadout-card {
      transition:
        transform 180ms ease,
        border-color 180ms ease,
        box-shadow 220ms ease,
        background 220ms ease,
        filter 220ms ease !important;
    }

    body #loadoutGrid > .loadout-card::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background: linear-gradient(115deg, transparent 12%, rgba(var(--tier-card-rgb, 185, 255, 61), 0.08) 48%, transparent 72%) !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 220ms ease !important;
    }

    body #loadoutGrid > .loadout-card:hover::after {
      opacity: 1 !important;
    }

    body .meta-tier-heading.tier-heading-meta::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      background: linear-gradient(90deg, transparent, rgba(255, 216, 106, 0.26), transparent) !important;
      filter: blur(0.2rem) !important;
      pointer-events: none !important;
      animation: premiumGoldRest 8s ease-in-out infinite !important;
    }

    body .expand-button:hover {
      filter: saturate(1.08) brightness(1.06) !important;
    }

    body .weapon-art:hover {
      filter: saturate(1.08) brightness(1.04) !important;
    }

    @media (prefers-reduced-motion: reduce) {
      body .tier-first .section-heading::after,
      body .primary-mode-switch .mode-button.active,
      body .secondary-mode-switch .mode-button.active,
      body .content-tab.active,
      body .filter-button.active,
      body .meta-tier-heading.tier-heading-meta::after {
        animation: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}());
