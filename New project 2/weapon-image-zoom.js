(function () {
  const style = document.createElement("style");
  style.id = "weapon-image-zoom-style";
  style.textContent = `
    body #loadoutGrid .loadout-card .weapon-art,
    body .loadout-grid .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card .weapon-art,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
    body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art,
    body .loadout-grid .loadout-card.tier-absolute-meta .weapon-art {
      width: 10.25rem !important;
      max-width: 10.25rem !important;
      min-width: 10.25rem !important;
      height: 5.77rem !important;
      aspect-ratio: 16 / 9 !important;
      overflow: hidden !important;
      position: relative !important;
      isolation: isolate !important;
      contain: paint !important;
      background: #05080c !important;
      transform: translateZ(0) !important;
    }

    body #loadoutGrid .loadout-card .weapon-art::before,
    body #loadoutGrid .loadout-card .weapon-art::after,
    body .loadout-grid .loadout-card .weapon-art::before,
    body .loadout-grid .loadout-card .weapon-art::after,
    html body #loadoutGrid > .loadout-card .weapon-art::before,
    html body #loadoutGrid > .loadout-card .weapon-art::after {
      content: none !important;
      display: none !important;
    }

    body #loadoutGrid .loadout-card .card-body,
    body .loadout-grid .loadout-card .card-body {
      margin-left: 1.55rem !important;
      min-width: 0 !important;
    }

    body #loadoutGrid .loadout-card .weapon-art img,
    body .loadout-grid .loadout-card .weapon-art img,
    html body #loadoutGrid > .loadout-card .weapon-art img,
    body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art img {
      position: relative !important;
      z-index: 1 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center center !important;
      transform: translate3d(0, 0, 0) scale(1) !important;
      transform-origin: center center !important;
      transition: transform 180ms cubic-bezier(.2,.8,.2,1) !important;
      backface-visibility: hidden !important;
      will-change: transform !important;
      filter: brightness(1.1) contrast(1.08) saturate(1.1) !important;
    }

    body #loadoutGrid .loadout-card .weapon-art:hover img,
    body .loadout-grid .loadout-card .weapon-art:hover img,
    html body #loadoutGrid > .loadout-card .weapon-art:hover img {
      transform: translate3d(0, 0, 0) scale(1.11) !important;
    }

    body #loadoutGrid .loadout-card .weapon-art:active img,
    body .loadout-grid .loadout-card .weapon-art:active img,
    html body #loadoutGrid > .loadout-card .weapon-art:active img {
      transform: translate3d(0, 0, 0) scale(1.07) !important;
      transition-duration: 90ms !important;
    }

    @media (hover: none), (pointer: coarse) {
      body #loadoutGrid .loadout-card .weapon-art img,
      body .loadout-grid .loadout-card .weapon-art img,
      html body #loadoutGrid > .loadout-card .weapon-art img {
        transition: none !important;
        will-change: auto !important;
      }

      body #loadoutGrid .loadout-card .weapon-art:hover img,
      body .loadout-grid .loadout-card .weapon-art:hover img,
      html body #loadoutGrid > .loadout-card .weapon-art:hover img {
        transform: translate3d(0, 0, 0) scale(1) !important;
      }
    }

    @media (max-width: 720px) {
      body #loadoutGrid .loadout-card .weapon-art,
      body .loadout-grid .loadout-card .weapon-art,
      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
      body #loadoutGrid .loadout-card.tier-absolute-meta .weapon-art,
      body .loadout-grid .loadout-card.tier-absolute-meta .weapon-art {
        width: 8.4rem !important;
        max-width: 8.4rem !important;
        min-width: 8.4rem !important;
        height: 4.73rem !important;
        aspect-ratio: 16 / 9 !important;
      }

      body #loadoutGrid .loadout-card .card-body,
      body .loadout-grid .loadout-card .card-body {
        margin-left: 0.85rem !important;
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
