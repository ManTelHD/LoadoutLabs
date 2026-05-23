(function () {
  const style = document.createElement("style");
  style.id = "weapon-image-zoom-style";
  style.textContent = `
    body #loadoutGrid .loadout-card .weapon-art,
    body .loadout-grid .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card .weapon-art {
      width: 13.25rem !important;
      max-width: 13.25rem !important;
      min-width: 13.25rem !important;
      height: auto !important;
      aspect-ratio: 16 / 9 !important;
      overflow: hidden !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
    body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art,
    body .loadout-grid .loadout-card.tier-absolute-meta .weapon-art {
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
      transform: scale(1) !important;
      transform-origin: center center !important;
      transition: transform 320ms cubic-bezier(.18,.86,.22,1), filter 260ms ease !important;
    }

    body #loadoutGrid .loadout-card:hover .weapon-art img,
    body .loadout-grid .loadout-card:hover .weapon-art img,
    html body #loadoutGrid > .loadout-card:hover .weapon-art img {
      transform: scale(1.14) translateY(-0.03rem) !important;
      filter: brightness(1.18) contrast(1.14) saturate(1.2) !important;
    }

    body #loadoutGrid .loadout-card .weapon-art:hover img,
    body .loadout-grid .loadout-card .weapon-art:hover img,
    html body #loadoutGrid > .loadout-card .weapon-art:hover img {
      transform: scale(1.24) translateY(-0.04rem) !important;
      filter: brightness(1.28) contrast(1.18) saturate(1.28) !important;
    }

    @media (max-width: 720px) {
      body #loadoutGrid .loadout-card .weapon-art,
      body .loadout-grid .loadout-card .weapon-art {
        width: 10.75rem !important;
        max-width: 10.75rem !important;
        min-width: 10.75rem !important;
      }

      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
      body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art,
      body .loadout-grid .loadout-card.tier-absolute-meta .weapon-art {
        width: 11.4rem !important;
        max-width: 11.4rem !important;
        min-width: 11.4rem !important;
      }
    }
  `;

  function inject() {
    document.querySelector("#weapon-image-zoom-style")?.remove();
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject, { once: true });
  } else {
    inject();
  }

  window.setTimeout(inject, 400);
  window.setTimeout(inject, 1200);
})();
