(function () {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const duration = () => (reduceMotion?.matches ? 0 : 190);

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
        will-change: height, opacity, transform !important;
        contain: layout paint !important;
      }

      body #loadoutGrid .loadout-card.expand-animating {
        z-index: 3 !important;
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
    card.classList.remove("details-flash");
    card.classList.add("expand-animating");
    setButtonState(card, open);

    const ms = duration();
    if (!ms) {
      card.classList.toggle("expanded", open);
      details.style.height = open ? "auto" : "0px";
      details.style.opacity = open ? "1" : "0";
      card.classList.remove("expand-animating");
      return;
    }

    if (open) {
      card.classList.add("expanded");
      details.style.display = "block";
      details.style.overflow = "hidden";
      details.style.height = "0px";
      details.style.opacity = "0";
      details.style.transform = "translateY(-0.25rem)";

      requestAnimationFrame(() => {
        const targetHeight = `${details.scrollHeight}px`;
        const animation = details.animate(
          [
            { height: "0px", opacity: 0, transform: "translateY(-0.25rem)" },
            { height: targetHeight, opacity: 1, transform: "translateY(0)" },
          ],
          { duration: ms, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" },
        );
        animation.onfinish = () => {
          details.style.height = "auto";
          details.style.opacity = "1";
          details.style.transform = "";
          details.style.overflow = "visible";
          card.classList.remove("expand-animating");
        };
      });
      return;
    }

    const startHeight = `${details.scrollHeight}px`;
    details.style.overflow = "hidden";
    details.style.height = startHeight;
    details.style.opacity = "1";
    details.style.transform = "translateY(0)";

    requestAnimationFrame(() => {
      const animation = details.animate(
        [
          { height: startHeight, opacity: 1, transform: "translateY(0)" },
          { height: "0px", opacity: 0, transform: "translateY(-0.18rem)" },
        ],
        { duration: Math.max(130, ms - 30), easing: "cubic-bezier(.4,0,.2,1)", fill: "both" },
      );
      animation.onfinish = () => {
        card.classList.remove("expanded", "expand-animating");
        details.style.height = "0px";
        details.style.opacity = "0";
        details.style.transform = "";
        details.style.overflow = "hidden";
      };
    });
  }

  function bind() {
    if (document.documentElement.dataset.cardTogglePerformanceReady === "true") return;
    document.documentElement.dataset.cardTogglePerformanceReady = "true";
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
