(function () {
  if (document.querySelector("#weapon-image-static-style")) return;

  const style = document.createElement("style");
  style.id = "weapon-image-static-style";
  style.textContent = `
    body #loadoutGrid .loadout-card .weapon-art img,
    body .loadout-grid .loadout-card .weapon-art img,
    body #loadoutGrid > .loadout-card .weapon-art img,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art img,
    body #loadoutGrid .loadout-card:hover .weapon-art img,
    body .loadout-grid .loadout-card:hover .weapon-art img,
    body #loadoutGrid .loadout-card .weapon-art:hover img,
    body .loadout-grid .loadout-card .weapon-art:hover img,
    html body #loadoutGrid > .loadout-card .weapon-art:hover img {
      transform: none !important;
      transition: none !important;
      animation: none !important;
      will-change: auto !important;
    }
  `;

  document.head.appendChild(style);
}());
