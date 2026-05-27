(function () {
  const css = `
    html body #loadoutGrid .loadout-card,
    html body .loadout-grid .loadout-card {
      grid-template-columns: 13rem minmax(0, 1fr) auto !important;
      column-gap: 1.45rem !important;
      align-items: start !important;
      content-visibility: auto !important;
      contain-intrinsic-size: 18rem !important;
    }

    html body #loadoutGrid .loadout-card.tier-absolute-meta,
    html body .loadout-grid .loadout-card.tier-absolute-meta {
      grid-template-columns: 14.25rem minmax(0, 1fr) auto !important;
      column-gap: 1.65rem !important;
    }

    html body #loadoutGrid .loadout-card .weapon-art,
    html body .loadout-grid .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card .weapon-art {
      width: 13rem !important;
      max-width: 13rem !important;
      height: 7.35rem !important;
      overflow: hidden !important;
      background: rgba(8, 13, 19, 0.72) !important;
      pointer-events: none !important;
      contain: layout paint !important;
    }

    html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art,
    html body .loadout-grid > .loadout-card.tier-absolute-meta .weapon-art {
      width: 14.25rem !important;
      max-width: 14.25rem !important;
      height: 8rem !important;
    }

    html body #loadoutGrid .loadout-card .card-body,
    html body .loadout-grid .loadout-card .card-body {
      padding-left: 0.15rem !important;
      min-width: 0 !important;
    }

    html body #loadoutGrid .loadout-card .weapon-art img,
    html body .loadout-grid .loadout-card .weapon-art img,
    html body #loadoutGrid > .loadout-card .weapon-art img,
    html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art img,
    html body #loadoutGrid .loadout-card:hover .weapon-art img,
    html body .loadout-grid .loadout-card:hover .weapon-art img,
    html body #loadoutGrid .loadout-card .weapon-art:hover img,
    html body .loadout-grid .loadout-card .weapon-art:hover img {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      max-width: 100% !important;
      max-height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
      transform: none !important;
      scale: 1 !important;
      transition: none !important;
      animation: none !important;
      will-change: auto !important;
      filter: none !important;
    }

    @media (max-width: 720px) {
      html body #loadoutGrid .loadout-card,
      html body .loadout-grid .loadout-card,
      html body #loadoutGrid .loadout-card.tier-absolute-meta,
      html body .loadout-grid .loadout-card.tier-absolute-meta {
        grid-template-columns: 9.3rem minmax(0, 1fr) !important;
        column-gap: 0.95rem !important;
        contain-intrinsic-size: 16rem !important;
      }

      html body #loadoutGrid .loadout-card .weapon-art,
      html body .loadout-grid .loadout-card .weapon-art,
      html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
        width: 9.3rem !important;
        max-width: 9.3rem !important;
        height: 5.35rem !important;
      }
    }
  `;

  function patchMetaZoomStyle() {
    const style = document.querySelector("#weapon-art-zoom-fix");
    if (!style || style.dataset.noZoomPatched === "true") return;
    style.textContent = style.textContent
      .replace(/object-fit:\s*cover\s*!important;/g, "object-fit: contain !important;")
      .replace(/transform:\s*scale\([^;]+\);?/g, "transform: none !important;")
      .replace(/filter:\s*brightness\([^;]+\)\s*contrast\([^;]+\)\s*saturate\([^;]+\);?/g, "filter: none !important;");
    style.dataset.noZoomPatched = "true";
  }

  function installStyle() {
    if (document.querySelector("#weapon-image-static-style")) return;
    const style = document.createElement("style");
    style.id = "weapon-image-static-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    installStyle();
    patchMetaZoomStyle();
    window.setTimeout(patchMetaZoomStyle, 350);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
