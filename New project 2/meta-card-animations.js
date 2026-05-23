(function () {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const animationDuration = () => (reduceMotion?.matches ? 0 : 460);

  function injectAnimationStyles() {
    if (document.querySelector("#meta-card-animation-style")) return;
    const style = document.createElement("style");
    style.id = "meta-card-animation-style";
    style.textContent = `
      body #loadoutGrid .loadout-card {
        --card-tier-color: #d8b457;
        --card-tier-rgb: 216, 180, 87;
        --card-tier-text: #ffe7a3;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        border-radius: 8px !important;
        border-top: 1px solid rgba(var(--card-tier-rgb), 0.22) !important;
        border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-bottom: 1px solid rgba(var(--card-tier-rgb), 0.16) !important;
        border-left-width: 0.56rem !important;
        border-left-color: rgba(var(--card-tier-rgb), 0.86) !important;
        background:
          radial-gradient(circle at 13% 18%, rgba(var(--card-tier-rgb), 0.22), transparent 18rem),
          linear-gradient(135deg, rgba(var(--card-tier-rgb), 0.13), rgba(14, 20, 24, 0.93) 34%, rgba(6, 9, 13, 0.98) 100%) !important;
        box-shadow:
          0 1.2rem 2.8rem rgba(0, 0, 0, 0.42),
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          inset 0 0 0 1px rgba(var(--card-tier-rgb), 0.06) !important;
        isolation: isolate;
        transition:
          transform 220ms ease,
          border-color 220ms ease,
          box-shadow 260ms ease,
          background 260ms ease;
      }

      body #loadoutGrid .loadout-card.tier-absolute-meta,
      body #loadoutGrid .loadout-card.tier-card-meta {
        --card-tier-color: #d8b457;
        --card-tier-rgb: 216, 180, 87;
        --card-tier-text: #ffe7a3;
      }

      body #loadoutGrid .loadout-card.tier-card-a {
        --card-tier-color: #35d7ff;
        --card-tier-rgb: 53, 215, 255;
        --card-tier-text: #bdefff;
      }

      body #loadoutGrid .loadout-card.tier-card-b {
        --card-tier-color: #ffcf4a;
        --card-tier-rgb: 255, 207, 74;
        --card-tier-text: #ffe69a;
      }

      body #loadoutGrid .loadout-card.tier-card-c {
        --card-tier-color: #b08cff;
        --card-tier-rgb: 176, 140, 255;
        --card-tier-text: #d9c8ff;
      }

      body #loadoutGrid .loadout-card.tier-card-d {
        --card-tier-color: #ff6f91;
        --card-tier-rgb: 255, 111, 145;
        --card-tier-text: #ffc4d1;
      }

      body #loadoutGrid .loadout-card > * {
        position: relative;
        z-index: 1;
      }

      body #loadoutGrid .loadout-card::before {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        z-index: 0 !important;
        pointer-events: none !important;
        border-radius: inherit !important;
        background:
          linear-gradient(100deg, rgba(255, 255, 255, 0.08), transparent 28%, rgba(var(--card-tier-rgb), 0.09) 55%, transparent 78%),
          repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 46px) !important;
        opacity: 0.68 !important;
        transform: none !important;
        box-shadow: none !important;
      }

      body #loadoutGrid .loadout-card::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        opacity: 0;
        background:
          linear-gradient(115deg, transparent 0%, rgba(var(--card-tier-rgb), 0.18) 36%, rgba(var(--card-tier-rgb), 0.12) 46%, transparent 58%);
        transform: translateX(-120%);
      }

      body #loadoutGrid .loadout-card:hover {
        border-color: rgba(var(--card-tier-rgb), 0.52) !important;
        border-left-color: var(--card-tier-color) !important;
        transform: translateY(-0.12rem);
        box-shadow:
          0 1.55rem 3.4rem rgba(0, 0, 0, 0.52),
          0 0 1.65rem rgba(var(--card-tier-rgb), 0.16),
          inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
      }

      body #loadoutGrid .loadout-card.expanded,
      body #loadoutGrid .loadout-card.expand-animating {
        z-index: 4;
        border-color: rgba(var(--card-tier-rgb), 0.68) !important;
        border-left-color: var(--card-tier-color) !important;
        box-shadow:
          0 1.7rem 3.8rem rgba(0, 0, 0, 0.56),
          0 0 2.2rem rgba(var(--card-tier-rgb), 0.23),
          inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
      }

      body #loadoutGrid .loadout-card .weapon-art,
      body .loadout-grid .loadout-card .weapon-art,
      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
        width: clamp(12.8rem, 24vw, 18rem) !important;
        max-width: clamp(12.8rem, 24vw, 18rem) !important;
        height: clamp(7.4rem, 13vw, 10.2rem) !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--card-tier-rgb), 0.4) !important;
        overflow: hidden !important;
        background:
          radial-gradient(circle at 48% 42%, rgba(var(--card-tier-rgb), 0.22), transparent 62%),
          linear-gradient(145deg, rgba(255,255,255,0.065), rgba(0,0,0,0.3)),
          #05080c !important;
        box-shadow:
          0 1rem 2.2rem rgba(0, 0, 0, 0.42) !important,
          0 0 1.4rem rgba(var(--card-tier-rgb), 0.1) !important,
          inset 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
      }

      body #loadoutGrid .loadout-card .weapon-art img,
      body .loadout-grid .loadout-card .weapon-art img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center center !important;
        transform: scale(1.2) !important;
        filter: brightness(1.16) contrast(1.13) saturate(1.14) drop-shadow(0 0.7rem 0.9rem rgba(0, 0, 0, 0.45)) !important;
        transition: transform 320ms cubic-bezier(.18,.86,.22,1), filter 240ms ease !important;
      }

      body #loadoutGrid .loadout-card .weapon-art:hover img,
      body #loadoutGrid .loadout-card:hover .weapon-art img {
        transform: scale(1.46) translateY(-0.1rem) !important;
        filter: brightness(1.25) contrast(1.16) saturate(1.22) drop-shadow(0 0.95rem 1.15rem rgba(0, 0, 0, 0.52)) !important;
      }

      body #loadoutGrid .loadout-card .mode-pill {
        border: 1px solid rgba(var(--card-tier-rgb), 0.36) !important;
        background: rgba(var(--card-tier-rgb), 0.09) !important;
        color: var(--card-tier-text) !important;
        box-shadow: 0 0 0.8rem rgba(var(--card-tier-rgb), 0.08) !important;
      }

      body #loadoutGrid .loadout-card .weapon-name {
        letter-spacing: 0 !important;
        text-shadow: 0 0 1.1rem rgba(var(--card-tier-rgb), 0.14) !important;
      }

      body #loadoutGrid .loadout-card .rank-badge {
        border-color: rgba(var(--card-tier-rgb), 0.72) !important;
        background:
          linear-gradient(145deg, rgba(255,255,255,0.2), transparent 32%),
          linear-gradient(135deg, var(--card-tier-color), color-mix(in srgb, var(--card-tier-color) 62%, #050807)) !important;
        color: #060807 !important;
        box-shadow:
          0 0.95rem 1.9rem rgba(0, 0, 0, 0.35),
          0 0 1.5rem rgba(var(--card-tier-rgb), 0.28) !important;
      }

      body #loadoutGrid .loadout-card .rank-badge span {
        color: rgba(5, 8, 7, 0.78) !important;
      }

      body #loadoutGrid .loadout-card .stat-row span,
      body #loadoutGrid .loadout-card .tag-list span {
        border-color: rgba(var(--card-tier-rgb), 0.18) !important;
        background: rgba(6, 10, 14, 0.62) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
      }

      body #loadoutGrid .loadout-card .stat-row span:first-child {
        border-color: rgba(var(--card-tier-rgb), 0.52) !important;
        background: linear-gradient(135deg, rgba(var(--card-tier-rgb), 0.18), rgba(6, 10, 14, 0.76)) !important;
      }

      body #loadoutGrid .loadout-card .stat-row span:first-child strong {
        color: var(--card-tier-text) !important;
      }

      body #loadoutGrid .loadout-card .card-footer {
        border-top: 1px solid rgba(var(--card-tier-rgb), 0.15) !important;
        padding-top: 0.82rem !important;
      }

      body #loadoutGrid .loadout-card .range {
        color: var(--card-tier-text) !important;
        text-shadow: 0 0 0.8rem rgba(var(--card-tier-rgb), 0.12) !important;
      }

      body #loadoutGrid .loadout-card .meta-card-details > .role {
        display: none !important;
      }

      body #loadoutGrid .loadout-card .detail-panel,
      body #loadoutGrid .loadout-card .attachment-list,
      body #loadoutGrid .loadout-card .perk-list {
        border-color: rgba(var(--card-tier-rgb), 0.16) !important;
        background:
          linear-gradient(135deg, rgba(var(--card-tier-rgb), 0.08), rgba(6, 10, 14, 0.84)),
          #090f14 !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
      }

      body #loadoutGrid .loadout-card .details-kicker,
      body #loadoutGrid .loadout-card .attachment-list li::before,
      body #loadoutGrid .loadout-card .perk-list li::before {
        color: var(--card-tier-text) !important;
        background: var(--card-tier-color) !important;
      }

      body #loadoutGrid .loadout-card.details-flash::after {
        animation: meta-card-sweep 640ms ease both;
      }

      body #loadoutGrid .loadout-card .meta-card-details {
        transform-origin: top center;
        will-change: max-height, opacity, transform, filter;
      }

      body #loadoutGrid .loadout-card .attachment-columns {
        will-change: opacity, transform;
      }

      body #loadoutGrid .loadout-card.expanded .attachment-columns {
        animation: meta-details-rise 360ms ease both;
      }

      body #loadoutGrid .loadout-card .expand-button {
        position: relative;
        overflow: hidden;
        transition:
          transform 180ms ease,
          border-color 180ms ease,
          background 180ms ease,
          color 180ms ease,
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
        border-color: rgba(var(--card-tier-rgb), 0.72) !important;
        background: linear-gradient(135deg, rgba(var(--card-tier-rgb), 0.2), rgba(var(--card-tier-rgb), 0.08)), #111720 !important;
        color: var(--card-tier-text) !important;
        box-shadow: 0 0 1rem rgba(var(--card-tier-rgb), 0.18) !important;
        transform: translateY(-0.04rem);
      }

      body #loadoutGrid .loadout-card .expand-button:hover span,
      body #loadoutGrid .loadout-card.expanded .expand-button span {
        color: var(--card-tier-text) !important;
      }

      body #loadoutGrid .loadout-card .expand-button:hover svg,
      body #loadoutGrid .loadout-card.expanded .expand-button svg {
        fill: var(--card-tier-color) !important;
      }

      body #loadoutGrid .loadout-card.details-flash .expand-button::after {
        animation: meta-button-sheen 520ms ease both;
      }

      body #loadoutGrid .loadout-card .expand-button svg {
        transition: transform 260ms cubic-bezier(.2, .8, .2, 1), fill 180ms ease;
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

      @media (max-width: 720px) {
        body #loadoutGrid .loadout-card .weapon-art,
        body .loadout-grid .loadout-card .weapon-art,
        body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
          width: min(100%, 14.8rem) !important;
          max-width: min(100%, 14.8rem) !important;
          height: 8.3rem !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        body #loadoutGrid .loadout-card,
        body #loadoutGrid .loadout-card .weapon-art img,
        body #loadoutGrid .loadout-card .expand-button,
        body #loadoutGrid .loadout-card .expand-button svg,
        body #loadoutGrid .loadout-card.expanded .attachment-columns {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyTierPalette(card) {
    if (!card) return;
    const tierLabel = card.querySelector(".rank-badge span")?.textContent || "";
    const tier = tierLabel.toLowerCase().replace(/[^a-z]/g, "");
    const palettes = {
      meta: ["#d8b457", "216, 180, 87", "#ffe7a3"],
      atier: ["#35d7ff", "53, 215, 255", "#bdefff"],
      btier: ["#ffcf4a", "255, 207, 74", "#ffe69a"],
      ctier: ["#b08cff", "176, 140, 255", "#d9c8ff"],
      dtier: ["#ff6f91", "255, 111, 145", "#ffc4d1"],
    };
    const palette = palettes[tier];
    if (!palette) return;
    card.style.setProperty("--card-tier-color", palette[0]);
    card.style.setProperty("--card-tier-rgb", palette[1]);
    card.style.setProperty("--card-tier-text", palette[2]);
  }

  function removeMetaDescriptions(root = document) {
    root.querySelectorAll?.("#loadoutGrid .loadout-card .meta-card-details > .role").forEach((element) => element.remove());
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

    removeMetaDescriptions(card);
    applyTierPalette(card);
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

  function primeRenderedCards() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(applyTierPalette);
    removeMetaDescriptions();
  }

  function run() {
    injectAnimationStyles();
    bindCardClicks();
    primeRenderedCards();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();

  new MutationObserver(primeRenderedCards).observe(document.documentElement, { childList: true, subtree: true });
}());
