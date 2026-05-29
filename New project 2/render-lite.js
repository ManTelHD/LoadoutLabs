(function () {
  function activePanel() {
    return document.querySelector(".tab-panel.active")?.dataset.panel || "weapons";
  }

  function call(name) {
    if (typeof window[name] === "function") window[name]();
  }

  function renderActivePanel() {
    const panel = activePanel();
    if (panel === "maps") call("renderMaps");
    else if (panel === "camos") call("renderCamos");
    else if (panel === "mode-info") call("renderModeInfo");
    else if (panel === "updates") call("renderUpdateMode");
    window.dispatchEvent(new CustomEvent("loadoutlab:lite-render", { detail: { panel } }));
  }

  function patchRenderLoadouts() {
    if (window.__loadoutLabLiteRenderReady || typeof window.renderLoadouts !== "function") return;
    window.__loadoutLabLiteRenderReady = true;
    window.__loadoutLabOriginalRenderLoadouts = window.renderLoadouts;

    window.renderLoadouts = function liteRenderLoadouts() {
      call("renderMode");
      renderActivePanel();
    };
  }

  function scheduleActiveRender() {
    window.setTimeout(() => window.requestAnimationFrame(renderActivePanel), 0);
  }

  function bindEvents() {
    if (window.__loadoutLabLiteRenderEventsReady) return;
    window.__loadoutLabLiteRenderEventsReady = true;
    document.addEventListener("click", (event) => {
      if (event.target.closest(".content-tab, .primary-mode-switch .mode-button, .secondary-mode-switch .mode-button, #filterToolbar .filter-button")) {
        scheduleActiveRender();
      }
    });
    document.addEventListener("change", (event) => {
      if (event.target.matches("#sortSelect")) scheduleActiveRender();
    });
  }

  function init() {
    patchRenderLoadouts();
    bindEvents();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(init, 120);
  window.setTimeout(init, 600);
}());
