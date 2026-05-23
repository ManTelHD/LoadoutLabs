(function () {
  const styleId = "weapon-image-zoom-style";
  const css = `
    body #loadoutGrid .loadout-card .weapon-art,
    body .loadout-grid .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card .weapon-art {
      width: 13.25rem !important;
      max-width: 13.25rem !important;
      min-width: 13.25rem !important;
      height: auto !important;
      aspect-ratio: 16 / 9 !important;
      overflow: hidden !important;
      transform: translateZ(0);
      transition: width 220ms ease, box-shadow 240ms ease, border-color 220ms ease, transform 220ms ease !important;
      will-change: transform, box-shadow;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
    body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art,
    body .loadout-grid .loadout-card.tier-absolute-meta .weapon-art,
    html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
      width: 14.75rem !important;
      max-width: 14.75rem !important;
      min-width: 14.75rem !important;
      height: auto !important;
      aspect-ratio: 16 / 9 !important;
    }

    body #loadoutGrid .loadout-card .weapon-art img,
    body .loadout-grid .loadout-card .weapon-art img,
    html body #loadoutGrid > .loadout-card .weapon-art img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
      transform: scale(1.1) !important;
      transform-origin: center center !important;
      transition: transform 320ms cubic-bezier(.18,.86,.22,1), filter 260ms ease !important;
      will-change: transform, filter;
    }

    body #loadoutGrid .loadout-card:hover .weapon-art img,
    body .loadout-grid .loadout-card:hover .weapon-art img,
    html body #loadoutGrid > .loadout-card:hover .weapon-art img {
      transform: scale(1.26) translateY(-0.04rem) !important;
      filter: brightness(1.18) contrast(1.14) saturate(1.2) !important;
    }

    body #loadoutGrid .loadout-card .weapon-art:hover,
    body .loadout-grid .loadout-card .weapon-art:hover,
    html body #loadoutGrid > .loadout-card .weapon-art:hover {
      z-index: 8;
      border-color: rgba(var(--card-tier-rgb, 216, 180, 87), .78) !important;
      box-shadow: 0 1.3rem 2.6rem rgba(var(--card-tier-rgb, 216, 180, 87), .24), 0 0 0 1px rgba(var(--card-tier-rgb, 216, 180, 87), .28) inset !important;
      transform: translateY(-0.04rem) scale(1.025);
    }

    body #loadoutGrid .loadout-card .weapon-art:hover img,
    body .loadout-grid .loadout-card .weapon-art:hover img,
    html body #loadoutGrid > .loadout-card .weapon-art:hover img {
      transform: scale(1.42) translateY(-0.06rem) !important;
      filter: brightness(1.28) contrast(1.18) saturate(1.28) !important;
    }

    @media (max-width: 720px) {
      body #loadoutGrid .loadout-card .weapon-art,
      body .loadout-grid .loadout-card .weapon-art,
      html body #loadoutGrid > .loadout-card .weapon-art {
        width: 10.75rem !important;
        max-width: 10.75rem !important;
        min-width: 10.75rem !important;
        height: auto !important;
        aspect-ratio: 16 / 9 !important;
      }

      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
      body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art,
      body .loadout-grid .loadout-card.tier-absolute-meta .weapon-art,
      html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
        width: 11.4rem !important;
        max-width: 11.4rem !important;
        min-width: 11.4rem !important;
        height: auto !important;
        aspect-ratio: 16 / 9 !important;
      }

      body #loadoutGrid .loadout-card:hover .weapon-art img,
      body .loadout-grid .loadout-card:hover .weapon-art img,
      html body #loadoutGrid > .loadout-card:hover .weapon-art img {
        transform: scale(1.18) !important;
      }

      body #loadoutGrid .loadout-card .weapon-art:hover img,
      body .loadout-grid .loadout-card .weapon-art:hover img,
      html body #loadoutGrid > .loadout-card .weapon-art:hover img {
        transform: scale(1.28) !important;
      }
    }
  `;

  function applyWeaponImageZoom() {
    let style = document.querySelector(`#${styleId}`);
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.textContent = css;
    } else if (style.textContent !== css) {
      style.textContent = css;
    }
    document.head.appendChild(style);
  }

  function scheduleApply() {
    applyWeaponImageZoom();
    [80, 250, 600, 1200, 2400, 4200].forEach((delay) => window.setTimeout(applyWeaponImageZoom, delay));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleApply, { once: true });
  } else {
    scheduleApply();
  }

  new MutationObserver(() => applyWeaponImageZoom()).observe(document.documentElement, { childList: true, subtree: true });
})();
