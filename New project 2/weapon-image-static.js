(function () {
  const css = `
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
      transform: none !important;
      transition: none !important;
      animation: none !important;
      will-change: auto !important;
    }
  `;

  function install() {
    document.querySelector("#weapon-image-static-style")?.remove();
    const style = document.createElement("style");
    style.id = "weapon-image-static-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function pinLast() {
    install();
    const metaStyle = document.querySelector("#weapon-art-zoom-fix");
    if (metaStyle) document.head.appendChild(document.querySelector("#weapon-image-static-style"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", pinLast, { once: true });
  } else {
    pinLast();
  }

  [120, 400, 900, 1800, 3200, 5200].forEach((delay) => window.setTimeout(pinLast, delay));

  new MutationObserver((mutations) => {
    if (mutations.some((mutation) => [...mutation.addedNodes].some((node) => node.id === "weapon-art-zoom-fix" || node.id === "weapon-image-static-style"))) {
      window.requestAnimationFrame(pinLast);
    }
  }).observe(document.head, { childList: true });
}());
