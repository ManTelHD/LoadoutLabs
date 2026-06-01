(function () {
  const STYLE_ID = "mw4-no-tabs-20260601";

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      body .mw4-watch-panel .mw4-tabs {
        display: none !important;
      }

      body .mw4-watch-panel .mw4-panel {
        display: grid !important;
        grid-template-columns: minmax(0, 1.08fr) minmax(17rem, 0.92fr) !important;
        gap: 1rem !important;
        align-items: start !important;
      }

      body .mw4-watch-panel .mw4-panel + .mw4-panel {
        margin-top: 0.9rem !important;
      }

      body .mw4-watch-panel .mw4-topline {
        justify-content: flex-start !important;
        margin-bottom: 0 !important;
      }

      @media (max-width: 1040px) {
        body .mw4-watch-panel .mw4-panel {
          grid-template-columns: 1fr !important;
        }
      }
    `;
  }

  function showAllMw4Sections() {
    installStyle();

    const wrapper = document.querySelector("#mw4LivePanel");
    if (!wrapper) return;

    wrapper.querySelectorAll(".mw4-tabs").forEach((tabs) => {
      tabs.hidden = true;
      tabs.setAttribute("aria-hidden", "true");
    });

    wrapper.querySelectorAll("[data-mw4-panel]").forEach((panel) => {
      panel.hidden = false;
      panel.classList.add("active");
    });
  }

  function scheduleShowAll() {
    requestAnimationFrame(showAllMw4Sections);
    window.setTimeout(showAllMw4Sections, 80);
  }

  window.addEventListener("loadoutlab:lite-render", scheduleShowAll);
  document.addEventListener("click", scheduleShowAll, true);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleShowAll, { once: true });
  else scheduleShowAll();

  window.setTimeout(showAllMw4Sections, 350);
  window.setTimeout(showAllMw4Sections, 1000);
}());
