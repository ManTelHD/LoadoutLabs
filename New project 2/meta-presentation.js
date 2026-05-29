(function () {
  const STYLE_ID = "meta-presentation-20260529";

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      html body #weaponComparePanel,
      html body .weapon-compare-panel {
        display: none !important;
      }

      html body #loadoutGrid .loadout-card.details-flash::after,
      html body #loadoutGrid .loadout-card.details-flash .expand-button::after,
      html body #loadoutGrid .loadout-card.expanded .attachment-columns,
      html body #loadoutGrid .loadout-card .meta-card-details,
      html body #loadoutGrid .loadout-card .card-details {
        animation: none !important;
        transition: none !important;
      }

      html body #loadoutGrid .loadout-card .meta-card-details,
      html body #loadoutGrid .loadout-card .card-details {
        contain: layout paint !important;
      }

      html body #loadoutGrid .loadout-card .meta-card-details[hidden],
      html body #loadoutGrid .loadout-card .card-details[hidden] {
        display: none !important;
      }

      html body #loadoutGrid .loadout-card.expand-animating {
        z-index: auto !important;
      }

      html body #loadoutGrid .meta-tier-heading.tier-heading-meta,
      html body #loadoutGrid .tier-heading-meta,
      html body #loadoutGrid .tier-group.tier-absolute-meta .tier-header {
        --tier-color: #ffd35a !important;
        --tier-rgb: 255, 211, 90 !important;
        --heading-tier-color: #ffd35a !important;
        --heading-tier-rgb: 255, 211, 90 !important;
        border-color: rgba(255, 211, 90, 0.56) !important;
        border-left-color: #ffd35a !important;
        background:
          linear-gradient(90deg, rgba(255, 211, 90, 0.34), rgba(255, 184, 46, 0.13) 42%, rgba(255, 255, 255, 0.035)),
          #171409 !important;
        box-shadow:
          0 0.95rem 2rem rgba(0, 0, 0, 0.32),
          0 0 2rem rgba(255, 211, 90, 0.22) !important;
      }

      html body #loadoutGrid .meta-tier-heading.tier-heading-meta span,
      html body #loadoutGrid .meta-tier-heading.tier-heading-meta small,
      html body #loadoutGrid .tier-heading-meta span,
      html body #loadoutGrid .tier-heading-meta small,
      html body #loadoutGrid .tier-group.tier-absolute-meta .tier-header h3,
      html body #loadoutGrid .tier-group.tier-absolute-meta .tier-header span {
        color: #ffd35a !important;
        text-shadow: 0 0 1.15rem rgba(255, 211, 90, 0.36) !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta,
      html body #loadoutGrid .loadout-card.tier-absolute-meta,
      html body #loadoutGrid .tier-group.tier-absolute-meta .loadout-card {
        --tier-card-color: #ffd35a !important;
        --tier-card-rgb: 255, 211, 90 !important;
        border-color: rgba(255, 211, 90, 0.48) !important;
        background:
          linear-gradient(135deg, rgba(255, 211, 90, 0.22), rgba(255, 184, 46, 0.09) 44%, rgba(255, 255, 255, 0.025)),
          #141208 !important;
        box-shadow:
          inset 0.48rem 0 0 rgba(255, 211, 90, 0.94),
          0 0 0 1px rgba(255, 211, 90, 0.14),
          0 0.85rem 1.8rem rgba(0, 0, 0, 0.3),
          0 0 1.8rem rgba(255, 211, 90, 0.16) !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta .rank-badge,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .rank-badge,
      html body #loadoutGrid .tier-group.tier-absolute-meta .rank-badge {
        background: linear-gradient(135deg, #ffb82e, #ffe58d 58%, #ffd35a) !important;
        color: #1a1200 !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta .mode-pill,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .mode-pill,
      html body #loadoutGrid .tier-group.tier-absolute-meta .mode-pill,
      html body #loadoutGrid .loadout-card.tier-card-meta .meta-score-pill span,
      html body #loadoutGrid .loadout-card.tier-card-meta .meta-score-pill em,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .meta-score-pill span,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .meta-score-pill em,
      html body #loadoutGrid .tier-group.tier-absolute-meta .meta-score-pill span,
      html body #loadoutGrid .tier-group.tier-absolute-meta .meta-score-pill em,
      html body #loadoutGrid .loadout-card.tier-card-meta .slot-type,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .slot-type,
      html body #loadoutGrid .tier-group.tier-absolute-meta .slot-type {
        color: #ffd35a !important;
      }

      html body #loadoutGrid .loadout-card.tier-card-meta .perk-chip span,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .perk-chip span,
      html body #loadoutGrid .tier-group.tier-absolute-meta .perk-chip span,
      html body #loadoutGrid .loadout-card.tier-card-meta .expand-button:hover,
      html body #loadoutGrid .loadout-card.tier-card-meta.expanded .expand-button,
      html body #loadoutGrid .loadout-card.tier-absolute-meta .expand-button:hover,
      html body #loadoutGrid .loadout-card.tier-absolute-meta.expanded .expand-button {
        background: #ffd35a !important;
        color: #071008 !important;
      }
    `;
  }

  function stripLegacyBlocks() {
    document.querySelectorAll("#weaponComparePanel, .weapon-compare-panel").forEach((element) => element.remove());
  }

  function hasDetailsContent(details) {
    return !!details && !!details.querySelector(".premium-details-grid, .attachment-columns, .premium-attachment-list, .detail-panel");
  }

  function detailsTemplate(card) {
    return [...card.children].find((child) => child.matches?.("template.meta-details-template"));
  }

  function parkDetails() {
    let parked = 0;
    document.querySelectorAll("#loadoutGrid .loadout-card:not(.expanded)").forEach((card) => {
      const details = card.querySelector(".meta-card-details, .card-details");
      if (!details || !hasDetailsContent(details)) return;
      let template = detailsTemplate(card);
      if (!template) {
        template = document.createElement("template");
        template.className = "meta-details-template";
        details.after(template);
      }
      while (details.firstChild) template.content.append(details.firstChild);
      details.hidden = true;
      details.dataset.lazyDetails = "parked";
      parked += 1;
    });
    window.__loadoutLabParkedDetails = parked;
  }

  function hydrateDetails(card) {
    const details = card.querySelector(".meta-card-details, .card-details");
    if (!details) return null;
    const template = detailsTemplate(card);
    if (template && !hasDetailsContent(details)) {
      details.append(template.content);
      template.remove();
    }
    details.hidden = false;
    details.dataset.lazyDetails = "hydrated";
    return details;
  }

  function scheduleDetailsParking(delay = 120) {
    window.setTimeout(() => window.requestAnimationFrame(parkDetails), delay);
  }

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
    stripLegacyBlocks();
    scheduleDetailsParking(160);
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

  function setButtonState(card, open) {
    const button = card.querySelector(".expand-button");
    if (!button) return;
    button.setAttribute("aria-expanded", String(open));
    const label = button.querySelector("span");
    if (label) label.textContent = open ? "Schließen" : "Details";
  }

  function ignoredClick(event, card) {
    if (event.target.closest(".card-details, .meta-card-details, .attachment-list, .perk-list, a, input, select, textarea")) return true;
    const button = event.target.closest("button");
    return button && !button.classList.contains("expand-button") && card.contains(button);
  }

  function toggleDetails(card, open) {
    const details = open ? hydrateDetails(card) : card.querySelector(".meta-card-details, .card-details");
    if (!details) return;
    details.getAnimations?.().forEach((animation) => animation.cancel());
    card.classList.remove("details-flash", "expand-animating");
    card.classList.toggle("expanded", open);
    setButtonState(card, open);
    details.hidden = !open;
    details.style.display = open ? "block" : "";
    details.style.height = "";
    details.style.opacity = "";
    details.style.overflow = "";
    if (!open) scheduleDetailsParking(40);
  }

  function bindEvents() {
    if (window.__loadoutLabPresentationEventsReady) return;
    window.__loadoutLabPresentationEventsReady = true;

    document.addEventListener("click", (event) => {
      const card = event.target.closest("#loadoutGrid .loadout-card");
      if (card && !ignoredClick(event, card)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        toggleDetails(card, !card.classList.contains("expanded"));
        return;
      }

      if (event.target.closest(".content-tab, .primary-mode-switch .mode-button, .secondary-mode-switch .mode-button, #filterToolbar .filter-button")) {
        scheduleActiveRender();
        scheduleDetailsParking(240);
      }
    }, true);

    document.addEventListener("input", (event) => {
      if (event.target.matches("#loadoutSearch, #weaponSearch")) scheduleDetailsParking(260);
    });

    document.addEventListener("change", (event) => {
      if (event.target.matches("#sortSelect")) {
        scheduleActiveRender();
        scheduleDetailsParking(180);
      }
    });

    window.addEventListener("loadoutlab:lite-render", () => scheduleDetailsParking(120));
  }

  function init() {
    installStyle();
    patchRenderLoadouts();
    bindEvents();
    stripLegacyBlocks();
    scheduleDetailsParking(500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(init, 120);
  window.setTimeout(init, 600);
  window.setTimeout(scheduleDetailsParking, 1600);
}());
