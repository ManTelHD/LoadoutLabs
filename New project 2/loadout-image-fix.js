(function () {
  const fixedImages = {
    "swordfish-a1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S02-SWORDFISH-A1.webp",
    grimhawk: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/seasons/blackops7/season-04/weapons/Seasonal-LP_S4_weapons_grimhawk.webp",
  };

  function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function applyImageFixes(root = document) {
    root.querySelectorAll?.("#loadoutGrid .loadout-card").forEach((card) => {
      const name = card.querySelector(".weapon-name, h2, h3")?.textContent?.trim();
      const src = fixedImages[slugify(name)];
      const img = card.querySelector(".weapon-art img");
      if (!src || !img || img.getAttribute("src") === src) return;
      img.dataset.fallback = img.dataset.fallback || img.getAttribute("src") || "";
      img.src = src;
    });
  }

  function init() {
    applyImageFixes();
    window.setTimeout(applyImageFixes, 250);
    window.setTimeout(applyImageFixes, 1000);
    const grid = document.getElementById("loadoutGrid");
    if (grid) {
      new MutationObserver(() => applyImageFixes(grid)).observe(grid, { childList: true, subtree: true });
    }
    window.__loadoutImageFixReady = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
