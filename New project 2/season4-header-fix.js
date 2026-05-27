(function () {
  function installStyle() {
    if (document.querySelector("#season4-header-fix-style")) return;
    const style = document.createElement("style");
    style.id = "season4-header-fix-style";
    style.textContent = `
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

  function polishHeader() {
    installStyle();
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
    window.setTimeout(polishHeader, 50);
    window.setTimeout(polishHeader, 220);
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(polishHeader, 300), { once: true });
  } else {
    window.setTimeout(polishHeader, 300);
  }
})();
