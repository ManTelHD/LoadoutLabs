(function () {
  const STYLE_ID = "meta-color-fix-20260529";

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      html body #loadoutGrid .meta-tier-heading.tier-heading-meta,
      html body #loadoutGrid .tier-heading-meta,
      html body #loadoutGrid .tier-group.tier-absolute-meta .tier-header {
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
          0 0.95rem 2rem rgba(0, 0, 0, 0.32),
          0 0 2rem rgba(255, 211, 90, 0.22) !important;
      }

      html body #loadoutGrid .meta-tier-heading.tier-heading-meta span,
      html body #loadoutGrid .meta-tier-heading.tier-heading-meta small,
      html body #loadoutGrid .tier-heading-meta span,
      html body #loadoutGrid .tier-heading-meta small,
      html body #loadoutGrid .tier-group.tier-absolute-meta .tier-header h3,
      html body #loadoutGrid .tier-group.tier-absolute-meta .tier-header span {
        color: #ffd35a !important;
        text-shadow: 0 0 1.15rem rgba(255, 211, 90, 0.36) !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta,
      html body #loadoutGrid .loadout-card.tier-absolute-meta,
      html body #loadoutGrid .tier-group.tier-absolute-meta .loadout-card {
        --tier-card-color: #ffd35a !important;
        --tier-card-rgb: 255, 211, 90 !important;
        border-color: rgba(255, 211, 90, 0.48) !important;
        background:
          linear-gradient(135deg, rgba(255, 211, 90, 0.22), rgba(255, 184, 46, 0.09) 44%, rgba(255, 255, 255, 0.025)),
          #141208 !important;
        box-shadow:
          inset 0.48rem 0 0 rgba(255, 211, 90, 0.94),
          0 0 0 1px rgba(255, 211, 90, 0.14),
          0 0.85rem 1.8rem rgba(0, 0, 0, 0.3),
          0 0 1.8rem rgba(255, 211, 90, 0.16) !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta .rank-badge,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .rank-badge,
      html body #loadoutGrid .tier-group.tier-absolute-meta .rank-badge {
        background: linear-gradient(135deg, #ffb82e, #ffe58d 58%, #ffd35a) !important;
        color: #1a1200 !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta .mode-pill,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .mode-pill,
      html body #loadoutGrid .tier-group.tier-absolute-meta .mode-pill,
      html body #loadoutGrid .loadout-card.tier-card-meta .meta-score-pill span,
      html body #loadoutGrid .loadout-card.tier-card-meta .meta-score-pill em,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .meta-score-pill span,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .meta-score-pill em,
      html body #loadoutGrid .tier-group.tier-absolute-meta .meta-score-pill span,
      html body #loadoutGrid .tier-group.tier-absolute-meta .meta-score-pill em,
      html body #loadoutGrid .loadout-card.tier-card-meta .slot-type,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .slot-type,
      html body #loadoutGrid .tier-group.tier-absolute-meta .slot-type {
        color: #ffd35a !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta .perk-chip span,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .perk-chip span,
      html body #loadoutGrid .tier-group.tier-absolute-meta .perk-chip span,
      html body #loadoutGrid .loadout-card.tier-card-meta .expand-button:hover,
      html body #loadoutGrid .loadout-card.tier-card-meta.expanded .expand-button,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .expand-button:hover,
      html body #loadoutGrid .loadout-card.tier-absolute-meta.expanded .expand-button {
        background: #ffd35a !important;
        color: #071008 !important;
      }
    `;
  }

  function run() {
    installStyle();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  window.setTimeout(run, 300);
}());
