(function () {
  if (document.querySelector("#absolute-meta-glow-style")) return;

  const style = document.createElement("style");
  style.id = "absolute-meta-glow-style";
  style.textContent = `
    @keyframes absoluteMetaHeaderPulse {
      0%, 100% {
        box-shadow:
          0 1.2rem 2.4rem rgba(0, 0, 0, 0.42),
          0 0 1.2rem rgba(255, 207, 74, 0.22),
          0 0 3.2rem rgba(255, 207, 74, 0.13),
          inset 0 0 0 1px rgba(255, 234, 148, 0.24);
        filter: saturate(1.02) brightness(1);
      }

      50% {
        box-shadow:
          0 1.35rem 2.7rem rgba(0, 0, 0, 0.48),
          0 0 2.1rem rgba(255, 207, 74, 0.46),
          0 0 5.2rem rgba(255, 169, 45, 0.24),
          inset 0 0 0 1px rgba(255, 242, 178, 0.42);
        filter: saturate(1.18) brightness(1.08);
      }
    }

    @keyframes absoluteMetaHeaderSweep {
      0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
      18% { opacity: 0.95; }
      46% { opacity: 0.45; }
      100% { transform: translateX(130%) skewX(-18deg); opacity: 0; }
    }

    body .meta-tier-heading.tier-heading-meta {
      position: relative !important;
      isolation: isolate !important;
      overflow: hidden !important;
      min-height: 5rem !important;
      border-left-width: 1.45rem !important;
      border-color: rgba(255, 207, 74, 0.72) !important;
      border-left-color: #ffd34d !important;
      background:
        radial-gradient(circle at 8% 50%, rgba(255, 236, 145, 0.36), transparent 16rem),
        linear-gradient(90deg, rgba(255, 211, 77, 0.46), rgba(190, 130, 28, 0.24) 28%, rgba(22, 17, 8, 0.94) 72%),
        #12100a !important;
      animation: absoluteMetaHeaderPulse 2.7s ease-in-out infinite !important;
    }

    body .meta-tier-heading.tier-heading-meta::before {
      content: "" !important;
      position: absolute !important;
      inset: -35% auto -35% 0 !important;
      width: 38% !important;
      z-index: -1 !important;
      background: linear-gradient(90deg, transparent, rgba(255, 246, 190, 0.42), transparent) !important;
      animation: absoluteMetaHeaderSweep 3.4s ease-in-out infinite !important;
      pointer-events: none !important;
    }

    body .meta-tier-heading.tier-heading-meta::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      z-index: -2 !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent 42%),
        repeating-linear-gradient(90deg, rgba(255, 207, 74, 0.08) 0 1px, transparent 1px 5rem) !important;
      pointer-events: none !important;
    }

    body .meta-tier-heading.tier-heading-meta span {
      color: #ffe58a !important;
      font-size: clamp(1.62rem, 2.05vw, 2.15rem) !important;
      text-shadow:
        0 0 0.55rem rgba(255, 238, 148, 0.58),
        0 0 1.65rem rgba(255, 207, 74, 0.48),
        0 0 3.1rem rgba(255, 165, 36, 0.28) !important;
    }

    body .meta-tier-heading.tier-heading-meta small {
      color: #ffe58a !important;
      text-shadow: 0 0 1.1rem rgba(255, 207, 74, 0.42) !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta {
      border-left-color: #ffd34d !important;
      outline-color: rgba(255, 207, 74, 0.42) !important;
      background:
        radial-gradient(circle at 14% 22%, rgba(255, 211, 77, 0.18), transparent 18rem),
        linear-gradient(135deg, rgba(255, 211, 77, 0.18), rgba(109, 81, 22, 0.14) 42%, rgba(11, 12, 14, 0.94) 76%),
        #11100c !important;
      box-shadow:
        0 1.3rem 3rem rgba(0, 0, 0, 0.48),
        0 0 1.5rem rgba(255, 207, 74, 0.18),
        inset 0 0 0 1px rgba(255, 207, 74, 0.12) !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta .rank-badge,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .score-chip {
      border-color: rgba(255, 231, 133, 0.78) !important;
      background: linear-gradient(135deg, #ffe58a, #ffbd2e) !important;
      color: #171007 !important;
      box-shadow: 0 0.9rem 1.9rem rgba(255, 190, 46, 0.24), 0 0 1.35rem rgba(255, 207, 74, 0.2) !important;
    }

    body #loadoutGrid > .loadout-card.tier-absolute-meta .mode-pill,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .range,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .details-kicker {
      color: #ffe58a !important;
    }

    @media (prefers-reduced-motion: reduce) {
      body .meta-tier-heading.tier-heading-meta,
      body .meta-tier-heading.tier-heading-meta::before {
        animation: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}());
