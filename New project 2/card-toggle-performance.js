(function () {
  function injectStyle() {
    if (document.querySelector("#card-toggle-performance-style")) return;
    const style = document.createElement("style");
    style.id = "card-toggle-performance-style";
    style.textContent = `
      body #loadoutGrid .loadout-card.details-flash::after,
      body #loadoutGrid .loadout-card.details-flash .expand-button::after,
      body #loadoutGrid .loadout-card.expanded .attachment-columns {
        animation: none !important;
      }

      body #loadoutGrid .loadout-card .meta-card-details,
      body #loadoutGrid .loadout-card .card-details {
        contain: layout paint !important;
        transition: none !important;
        animation: none !important;
      }

      body #loadoutGrid .loadout-card.expand-animating {
        z-index: auto !important;
      }
    `;
    document.head.append(style);
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
    const details = card.querySelector(".meta-card-details, .card-details");
    if (!details) return;

    details.getAnimations?.().forEach((animation) => animation.cancel());
    card.classList.remove("details-flash", "expand-animating");
    card.classList.toggle("expanded", open);
    setButtonState(card, open);

    details.style.display = open ? "block" : "";
    details.style.height = "";
    details.style.opacity = "";
    details.style.overflow = "";
  }

  function bind() {
    if (document.documentElement.dataset.cardTogglePerformanceReady === "instant") return;
    document.documentElement.dataset.cardTogglePerformanceReady = "instant";
    document.addEventListener("click", (event) => {
      const card = event.target.closest("#loadoutGrid .loadout-card");
      if (!card || ignoredClick(event, card)) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      toggleDetails(card, !card.classList.contains("expanded"));
    }, true);
  }

  function run() {
    injectStyle();
    bind();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
}());
