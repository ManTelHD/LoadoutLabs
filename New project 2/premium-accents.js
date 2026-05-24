(function () {
  if (document.querySelector("#premium-accents-style")) return;

  const style = document.createElement("style");
  style.id = "premium-accents-style";
  style.textContent = `
    body .tier-first .section-heading,
    body .meta-tier-heading,
    body #loadoutGrid > .loadout-card,
    body .mode-info-main,
    body .mode-info-side,
    body .controls {
      position: relative !important;
    }

    body .tier-first .section-heading::after {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 54%) !important;
      animation: none !important;
    }

    body .primary-mode-switch .mode-button.active,
    body .secondary-mode-switch .mode-button.active,
    body .content-tab.active,
    body .filter-button.active,
    body .meta-tier-heading.tier-heading-meta::after {
      animation: none !important;
    }

    body .primary-mode-switch .mode-button,
    body .secondary-mode-switch .mode-button,
    body .content-tab,
    body .filter-button,
    body .expand-button {
      transition: background-color 140ms ease, border-color 140ms ease, box-shadow 160ms ease !important;
    }

    body #loadoutGrid > .loadout-card {
      transition: border-color 140ms ease, box-shadow 160ms ease, background-color 160ms ease !important;
    }

    body #loadoutGrid > .loadout-card::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background: linear-gradient(115deg, transparent 12%, rgba(var(--tier-card-rgb, 185, 255, 61), 0.055) 48%, transparent 72%) !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 140ms ease !important;
    }

    body #loadoutGrid > .loadout-card:hover::after {
      opacity: 1 !important;
    }

    body .expand-button:hover,
    body .weapon-art:hover {
      filter: none !important;
    }
  `;

  document.head.appendChild(style);
}());
