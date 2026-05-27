(function () {
  function installStyle() {
    if (document.querySelector("#mw4-layout-cleanup-style")) return;
    const style = document.createElement("style");
    style.id = "mw4-layout-cleanup-style";
    style.textContent = `
      body .mw4-watch-panel .mode-info-hero {
        display: none !important;
      }

      body .mw4-watch-panel .mode-info-body {
        padding-top: 0 !important;
      }

      body .mw4-watch-panel .mw4-prose {
        margin-top: 1rem !important;
      }
    `;
    document.head.appendChild(style);
  }

  function cleanupMW4Hero() {
    installStyle();
    if (!document.querySelector(".mw4-watch-panel")) return;
    document.querySelectorAll(".mw4-updated-pill").forEach((pill) => pill.remove());
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mw4-mode-button, [data-mode='mw4-info']")) {
      window.setTimeout(cleanupMW4Hero, 30);
      window.setTimeout(cleanupMW4Hero, 180);
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanupMW4Hero, { once: true });
  } else {
    cleanupMW4Hero();
  }
})();
