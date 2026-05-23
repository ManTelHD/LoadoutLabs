(function () {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const animationDuration = () => (reduceMotion?.matches ? 0 : 460);

  function injectAnimationStyles() {
    if (document.querySelector("#meta-card-animation-style")) return;
    const style = document.createElement("style");
    style.id = "meta-card-animation-style";
    style.textContent = `
      body #loadoutGrid .loadout-card {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition:
          transform 220ms ease,
          border-color 220ms ease,
          box-shadow 260ms ease,
          background 260ms ease;
      }

      body #loadoutGrid .loadout-card::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        background:
          linear-gradient(115deg, transparent 0%, rgba(185, 255, 61, 0.16) 36%, rgba(41, 230, 129, 0.12) 46%, transparent 58%);
        transform: translateX(-120%);
      }

      body #loadoutGrid .loadout-card:hover {
        border-color: rgba(185, 255, 61, 0.5) !important;
        transform: translateY(-0.08rem);
        box-shadow: 0 1.35rem 3rem rgba(0, 0, 0, 0.44), 0 0 1.4rem rgba(185, 255, 61, 0.1) !important;
      }

      body #loadoutGrid .loadout-card.expanded,
      body #loadoutGrid .loadout-card.expand-animating {
        z-index: 4;
        border-color: rgba(185, 255, 61, 0.66) !important;
        box-shadow: 0 1.55rem 3.4rem rgba(0, 0, 0, 0.52), 0 0 2rem rgba(185, 255, 61, 0.18) !important;
      }

      body #loadoutGrid .loadout-card.details-flash::after {
        animation: meta-card-sweep 640ms ease both;
      }

      body #loadoutGrid .loadout-card .meta-card-details {
        transform-origin: top center;
        will-change: max-height, opacity, transform, filter;
      }

      body #loadoutGrid .loadout-card .attachment-columns,
      body #loadoutGrid .loadout-card .role {
        will-change: opacity, transform;
      }

      body #loadoutGrid .loadout-card.expanded .attachment-columns,
      body #loadoutGrid .loadout-card.expanded .role {
        animation: meta-details-rise 360ms ease both;
      }

      body #loadoutGrid .loadout-card .expand-button {
        position: relative;
        overflow: hidden;
        transition:
          transform 180ms ease,
          border-color 180ms ease,
          background 180ms ease,
          box-shadow 220ms ease;
      }

      body #loadoutGrid .loadout-card .expand-button::after {
        content: "";
        position: absolute;
        inset: -40% -80%;
        opacity: 0;
        background: linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.34), transparent 65%);
        transform: translateX(-55%);
      }

      body #loadoutGrid .loadout-card .expand-button:hover,
      body #loadoutGrid .loadout-card.expanded .expand-button {
        border-color: rgba(185, 255, 61, 0.65) !important;
        background: linear-gradient(135deg, rgba(185, 255, 61, 0.18), rgba(41, 230, 129, 0.1)), #111720 !important;
        box-shadow: 0 0 1rem rgba(185, 255, 61, 0.14) !important;
        transform: translateY(-0.04rem);
      }

      body #loadoutGrid .loadout-card.details-flash .expand-button::after {
        animation: meta-button-sheen 520ms ease both;
      }

      body #loadoutGrid .loadout-card .expand-button svg {
        transition: transform 260ms cubic-bezier(.2, .8, .2, 1);
      }

      body #loadoutGrid .loadout-card.expanded .expand-button svg {
        transform: rotate(180deg);
      }

      @keyframes meta-card-sweep {
        0% { opacity: 0; transform: translateX(-120%); }
        22% { opacity: 1; }
        100% { opacity: 0; transform: translateX(120%); }
      }

      @keyframes meta-button-sheen {
        0% { opacity: 0; transform: translateX(-65%); }
        30% { opacity: 1; }
        100% { opacity: 0; transform: translateX(65%); }
      }

      @keyframes meta-details-rise {
        0% { opacity: 0; transform: translateY(-0.55rem); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        body #loadoutGrid .loadout-card,
        body #loadoutGrid .loadout-card .expand-button,
        body #loadoutGrid .loadout-card .expand-button svg,
        body #loadoutGrid .loadout-card.expanded .attachment-columns,
        body #loadoutGrid .loadout-card.expanded .role {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setButtonState(card, open) {
    const button = card.querySelector(".expand-button");
    if (!button) return;
    button.setAttribute("aria-expanded", String(open));
    const label = button.querySelector("span");
    if (label) label.textContent = open ? "Schließen" : "Details";
  }

  function animateDetails(card, open) {
    const details = card.querySelector(".meta-card-details, .card-details");
    if (!details) return;

    const duration = animationDuration();
    details.getAnimations?.().forEach((animation) => animation.cancel());
    card.classList.add("expand-animating", "details-flash");
    window.setTimeout(() => card.classList.remove("details-flash"), 680);

    if (!duration) {
      card.classList.toggle("expanded", open);
      setButtonState(card, open);
      card.classList.remove("expand-animating");
      details.style.maxHeight = open ? "none" : "0px";
      details.style.opacity = open ? "1" : "0";
      return;
    }

    if (open) {
      card.classList.add("expanded");
      details.style.display = "block";
      details.style.overflow = "hidden";
      details.style.maxHeight = "0px";
      details.style.opacity = "0";
      details.style.transform = "translateY(-0.7rem) scaleY(0.96)";
      const targetHeight = `${details.scrollHeight}px`;
      const animation = details.animate(
        [
          { maxHeight: "0px", opacity: 0, transform: "translateY(-0.7rem) scaleY(0.96)", filter: "blur(4px)" },
          { maxHeight: targetHeight, opacity: 1, transform: "translateY(0) scaleY(1)", filter: "blur(0)" },
        ],
        { duration, easing: "cubic-bezier(.18,.86,.22,1)", fill: "both" },
      );
      animation.onfinish = () => {
        details.style.maxHeight = "none";
        details.style.opacity = "1";
        details.style.transform = "";
        details.style.filter = "";
        details.style.overflow = "visible";
        card.classList.remove("expand-animating");
      };
    } else {
      const startHeight = `${details.scrollHeight}px`;
      details.style.overflow = "hidden";
      details.style.maxHeight = startHeight;
      details.style.opacity = "1";
      const animation = details.animate(
        [
          { maxHeight: startHeight, opacity: 1, transform: "translateY(0) scaleY(1)", filter: "blur(0)" },
          { maxHeight: "0px", opacity: 0, transform: "translateY(-0.55rem) scaleY(0.97)", filter: "blur(3px)" },
        ],
        { duration: Math.max(260, duration - 80), easing: "cubic-bezier(.4,0,.2,1)", fill: "both" },
      );
      animation.onfinish = () => {
        card.classList.remove("expanded", "expand-animating");
        details.style.maxHeight = "0px";
        details.style.opacity = "0";
        details.style.transform = "";
        details.style.filter = "";
        details.style.overflow = "hidden";
      };
    }

    setButtonState(card, open);
  }

  function shouldIgnoreCardClick(event, card) {
    if (event.target.closest(".card-details, .meta-card-details, .attachment-list, .perk-list")) return true;
    const button = event.target.closest("button");
    return button && !button.classList.contains("expand-button") && card.contains(button);
  }

  function bindCardClicks() {
    if (document.documentElement.dataset.metaCardAnimationsReady === "true") return;
    document.documentElement.dataset.metaCardAnimationsReady = "true";
    document.addEventListener("click", (event) => {
      const card = event.target.closest("#loadoutGrid .loadout-card");
      if (!card || shouldIgnoreCardClick(event, card)) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      animateDetails(card, !card.classList.contains("expanded"));
    }, true);
  }

  function run() {
    injectAnimationStyles();
    bindCardClicks();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
}());
