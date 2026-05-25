(function () {
  const css = `
    html body #loadoutGrid .loadout-card .weapon-art,
    html body .loadout-grid .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card .weapon-art,
    html body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
      overflow: hidden !important;
      background: rgba(8, 13, 19, 0.72) !important;
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
      transition: none !important;
      animation: none !important;
      will-change: auto !important;
      filter: none !important;
    }
  `;

  function install() {
    document.querySelector("#weapon-image-static-style")?.remove();
    const style = document.createElement("style");
    style.id = "weapon-image-static-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function normalizeImages() {
    document.querySelectorAll("#loadoutGrid .weapon-art img, .loadout-grid .weapon-art img").forEach((image) => {
      image.style.setProperty("object-fit", "contain", "important");
      image.style.setProperty("object-position", "center center", "important");
      image.style.setProperty("transform", "none", "important");
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", pinLast, { once: true });
  } else {
    pinLast();
  }

  [80, 160, 320, 650, 1100, 1800, 3200, 5200, 8000].forEach((delay) => window.setTimeout(pinLast, delay));

  new MutationObserver(() => window.requestAnimationFrame(pinLast)).observe(document.head, { childList: true });

  const watchGrid = () => {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.staticWeaponImagesWatched === "true") return;
    grid.dataset.staticWeaponImagesWatched = "true";
    new MutationObserver(() => window.requestAnimationFrame(normalizeImages)).observe(grid, { childList: true, subtree: true });
  };

  watchGrid();
  window.setTimeout(watchGrid, 500);
  window.setTimeout(watchGrid, 1500);
}());
