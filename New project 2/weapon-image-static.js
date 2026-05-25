(function () {
  const css = `
    html body #loadoutGrid .loadout-card .weapon-art,
    html body .loadout-grid .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
      overflow: hidden !important;
      background: rgba(8, 13, 19, 0.72) !important;
      pointer-events: none !important;
    }

    html body #loadoutGrid .loadout-card .weapon-art img,
    html body .loadout-grid .loadout-card .weapon-art img,
    html body #loadoutGrid > .loadout-card .weapon-art img,
    html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art img,
    html body #loadoutGrid .loadout-card:hover .weapon-art img,
    html body .loadout-grid .loadout-card:hover .weapon-art img,
    html body #loadoutGrid .loadout-card .weapon-art:hover img,
    html body .loadout-grid .loadout-card .weapon-art:hover img,
    html body #loadoutGrid > .loadout-card .weapon-art:hover img,
    html body #loadoutGrid .loadout-card .weapon-art:active img,
    html body .loadout-grid .loadout-card .weapon-art:active img {
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
  `;

  function patchMetaZoomStyle() {
    const style = document.querySelector("#weapon-art-zoom-fix");
    if (!style) return;

    style.textContent = style.textContent
      .replace(/object-fit:\s*cover\s*!important;/g, "object-fit: contain !important;")
      .replace(/transform:\s*scale\([^;]+\);?/g, "transform: none !important;")
      .replace(/filter:\s*brightness\([^;]+\)\s*contrast\([^;]+\)\s*saturate\([^;]+\);?/g, "filter: none !important;");
  }

  function install() {
    patchMetaZoomStyle();
    document.querySelector("#weapon-image-static-style")?.remove();
    const style = document.createElement("style");
    style.id = "weapon-image-static-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function normalizeImages() {
    patchMetaZoomStyle();
    document.querySelectorAll("#loadoutGrid .weapon-art img, .loadout-grid .weapon-art img").forEach((image) => {
      image.style.setProperty("display", "block", "important");
      image.style.setProperty("width", "100%", "important");
      image.style.setProperty("height", "100%", "important");
      image.style.setProperty("max-width", "100%", "important");
      image.style.setProperty("max-height", "100%", "important");
      image.style.setProperty("object-fit", "contain", "important");
      image.style.setProperty("object-position", "center center", "important");
      image.style.setProperty("transform", "none", "important");
      image.style.setProperty("scale", "1", "important");
      image.style.setProperty("transition", "none", "important");
      image.style.setProperty("animation", "none", "important");
      image.style.setProperty("will-change", "auto", "important");
      image.style.setProperty("filter", "none", "important");
    });
  }

  function pinLast() {
    install();
    const staticStyle = document.querySelector("#weapon-image-static-style");
    if (staticStyle) document.head.appendChild(staticStyle);
    normalizeImages();
  }

  function watchGrid() {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.staticWeaponImagesWatched === "true") return;
    grid.dataset.staticWeaponImagesWatched = "true";
    new MutationObserver(() => window.requestAnimationFrame(normalizeImages)).observe(grid, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      pinLast();
      watchGrid();
    }, { once: true });
  } else {
    pinLast();
    watchGrid();
  }

  [40, 80, 160, 320, 650, 1100, 1800, 3200, 5200, 8000, 12000].forEach((delay) => window.setTimeout(pinLast, delay));
  const interval = window.setInterval(pinLast, 250);
  window.setTimeout(() => window.clearInterval(interval), 12000);

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest?.(".weapon-art")) normalizeImages();
  }, true);

  new MutationObserver(() => window.requestAnimationFrame(pinLast)).observe(document.head, { childList: true, subtree: true });
  window.setTimeout(watchGrid, 500);
  window.setTimeout(watchGrid, 1500);
}());
