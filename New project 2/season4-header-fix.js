(function () {
  function installStyle() {
    if (document.querySelector("#season4-header-fix-style")) return;
    const style = document.createElement("style");
    style.id = "season4-header-fix-style";
    style.textContent = `
      body .season4-watch-panel .mode-info-layout {
        display: block !important;
      }

      body .season4-watch-panel .mode-info-main {
        width: 100% !important;
        max-width: none !important;
      }

      body .season4-watch-panel .mode-info-side,
      body .season4-watch-panel .mode-update-box {
        display: none !important;
      }

      body .season4-watch-panel .season4-updated-pill {
        display: inline-flex !important;
        align-items: center !important;
        width: max-content !important;
        margin-top: 0.65rem !important;
        padding: 0.3rem 0.55rem !important;
        border: 1px solid rgba(185, 255, 61, 0.28) !important;
        border-radius: 999px !important;
        background: rgba(5, 8, 11, 0.72) !important;
        color: rgba(246, 255, 226, 0.78) !important;
        font-size: 0.72rem !important;
        font-weight: 800 !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel .season4-keyart-heading {
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 1.25rem !important;
        padding: 1.05rem 1.15rem 0.95rem !important;
        min-height: auto !important;
      }

      body .season4-watch-panel .season4-keyart-heading > div {
        display: grid !important;
        gap: 0.28rem !important;
        min-width: 0 !important;
      }

      body .season4-watch-panel .season4-keyart-heading span {
        white-space: nowrap !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel .season4-keyart-heading > div > span {
        display: block !important;
        font-size: 0.7rem !important;
        letter-spacing: 0 !important;
      }

      body .season4-watch-panel .season4-keyart-heading strong {
        display: block !important;
        font-size: clamp(1.45rem, 2.2vw, 2rem) !important;
        line-height: 0.98 !important;
        white-space: normal !important;
        overflow-wrap: anywhere !important;
      }

      body .season4-watch-panel .season4-keyart-heading > span:last-child {
        flex: 0 0 auto !important;
        align-self: flex-start !important;
        padding-top: 0.16rem !important;
        color: #b9ff3d !important;
      }

      @media (max-width: 640px) {
        body .season4-watch-panel .season4-keyart-heading {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 0.75rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function polishSeason4() {
    installStyle();
    const side = document.querySelector(".season4-watch-panel .mode-info-side");
    if (side) {
      side.hidden = true;
      side.style.display = "none";
    }
    const updateBox = document.querySelector(".season4-watch-panel .mode-update-box");
    if (updateBox) {
      updateBox.hidden = true;
      updateBox.style.display = "none";
    }
    const heroText = document.querySelector(".season4-watch-panel .mode-info-hero > div");
    if (heroText && !heroText.querySelector(".season4-updated-pill")) {
      const pill = document.createElement("span");
      pill.className = "season4-updated-pill";
      pill.textContent = "Aktualisiert: 27. Mai 2026";
      heroText.appendChild(pill);
    }
    const heading = document.querySelector(".season4-watch-panel .season4-keyart-heading");
    if (!heading) return;
    const label = heading.querySelector("div > span");
    if (label) label.textContent = "Offizielle Bilder";
    const title = heading.querySelector("strong");
    if (title) title.textContent = "Season 04 X Key Art";
    const source = heading.querySelector(":scope > span:last-child");
    if (source) source.textContent = "@CallofDuty";
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".season4-mode-button, [data-mode='season4-info']")) return;
    window.setTimeout(polishSeason4, 50);
    window.setTimeout(polishSeason4, 220);
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(polishSeason4, 300), { once: true });
  } else {
    window.setTimeout(polishSeason4, 300);
  }
})();
