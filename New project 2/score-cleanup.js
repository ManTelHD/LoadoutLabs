(function () {
  function scoreFromCard(card) {
    const rankText = card.querySelector(".rank-badge")?.childNodes?.[0]?.textContent || "";
    const rank = Number.parseInt(rankText.replace(/[^0-9]/g, ""), 10) || 1;
    const className = card.className || "";

    if (className.includes("tier-card-meta") || className.includes("tier-absolute-meta")) {
      return Math.max(92, 101 - rank);
    }
    if (className.includes("tier-card-a")) return Math.max(82, 91 - rank);
    if (className.includes("tier-card-b")) return Math.max(72, 81 - rank);
    if (className.includes("tier-card-c")) return Math.max(62, 71 - rank);
    if (className.includes("tier-card-d")) return Math.max(52, 61 - rank);
    return Math.max(50, 90 - rank);
  }

  function injectStyle() {
    if (document.querySelector("#score-cleanup-style")) return;
    const style = document.createElement("style");
    style.id = "score-cleanup-style";
    style.textContent = `
      :root {
        --site-side-gap: clamp(2.25rem, 7.5vw, 8rem);
      }

      @keyframes details-button-pulse {
        0%, 100% {
          box-shadow:
            0 0 0 1px rgba(var(--tier-card-rgb), 0.28),
            0 0.75rem 1.55rem rgba(var(--tier-card-rgb), 0.18),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        50% {
          box-shadow:
            0 0 0 1px rgba(var(--tier-card-rgb), 0.48),
            0 0.95rem 1.95rem rgba(var(--tier-card-rgb), 0.28),
            0 0 1.25rem rgba(var(--tier-card-rgb), 0.22),
            inset 0 0 0 1px rgba(255, 255, 255, 0.12);
        }
      }

      body .site-header,
      body .site-footer {
        padding-left: var(--site-side-gap) !important;
        padding-right: var(--site-side-gap) !important;
      }

      body .hero {
        padding-left: var(--site-side-gap) !important;
        padding-right: var(--site-side-gap) !important;
      }

      body .section,
      body .intel-band,
      body .updates {
        padding-left: var(--site-side-gap) !important;
        padding-right: var(--site-side-gap) !important;
      }

      body .article-main {
        padding-left: var(--site-side-gap) !important;
        padding-right: var(--site-side-gap) !important;
      }

      body #loadoutGrid .loadout-card {
        --tier-card-color: #8f98a7;
        --tier-card-rgb: 143, 152, 167;
        border-color: rgba(var(--tier-card-rgb), 0.26) !important;
        box-shadow:
          inset 0.42rem 0 0 rgba(var(--tier-card-rgb), 0.92),
          0 0 0 1px rgba(var(--tier-card-rgb), 0.08),
          0 1.1rem 2.4rem rgba(0, 0, 0, 0.34),
          0 0 2rem rgba(var(--tier-card-rgb), 0.14) !important;
      }

      body #loadoutGrid .loadout-card .meta-score-pill {
        display: inline-grid !important;
        grid-template-columns: auto auto auto !important;
        align-items: baseline !important;
        width: fit-content !important;
        margin: 0.2rem 0 0.55rem !important;
        overflow: hidden !important;
        border: 1px solid rgba(var(--tier-card-rgb), 0.82) !important;
        border-radius: 0.52rem !important;
        background: linear-gradient(135deg, rgba(var(--tier-card-rgb), 0.24), rgba(var(--tier-card-rgb), 0.1)), rgba(7, 15, 9, 0.96) !important;
        box-shadow: 0 0 0 1px rgba(var(--tier-card-rgb), 0.14), 0 0.85rem 1.7rem rgba(var(--tier-card-rgb), 0.18) !important;
      }

      body #loadoutGrid .loadout-card .meta-score-pill span {
        align-self: stretch !important;
        display: inline-grid !important;
        place-items: center !important;
        padding: 0.42rem 0.65rem !important;
        background: rgba(var(--tier-card-rgb), 0.18) !important;
        color: var(--tier-card-color) !important;
        font-size: 0.72rem !important;
        font-weight: 950 !important;
        text-transform: uppercase !important;
      }

      body #loadoutGrid .loadout-card .meta-score-pill strong {
        padding: 0.22rem 0.14rem 0.22rem 0.68rem !important;
        color: #ffffff !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.8rem, 3vw, 2.55rem) !important;
        font-weight: 950 !important;
        line-height: 0.92 !important;
      }

      body #loadoutGrid .loadout-card .meta-score-pill em {
        padding: 0.22rem 0.75rem 0.22rem 0.08rem !important;
        color: var(--tier-card-color) !important;
        font-size: 0.84rem !important;
        font-style: normal !important;
        font-weight: 950 !important;
      }

      body #loadoutGrid .meta-tier-heading.tier-heading-meta,
      body #loadoutGrid .meta-tier-heading.tier-heading-a,
      body #loadoutGrid .meta-tier-heading.tier-heading-b,
      body #loadoutGrid .meta-tier-heading.tier-heading-c,
      body #loadoutGrid .meta-tier-heading.tier-heading-d {
        --heading-tier-color: #ffd35a;
        --heading-tier-rgb: 255, 211, 90;
        border-color: rgba(var(--heading-tier-rgb), 0.42) !important;
        border-left-color: var(--heading-tier-color) !important;
        background:
          linear-gradient(90deg, rgba(var(--heading-tier-rgb), 0.28), rgba(var(--heading-tier-rgb), 0.1) 42%, rgba(255, 255, 255, 0.03)),
          #13150f !important;
        box-shadow:
          0 1rem 2.1rem rgba(0, 0, 0, 0.3),
          0 0 2rem rgba(var(--heading-tier-rgb), 0.18) !important;
      }

      body #loadoutGrid .meta-tier-heading.tier-heading-a {
        --heading-tier-color: #b08cff;
        --heading-tier-rgb: 176, 140, 255;
      }

      body #loadoutGrid .meta-tier-heading.tier-heading-b {
        --heading-tier-color: #35d7ff;
        --heading-tier-rgb: 53, 215, 255;
      }

      body #loadoutGrid .meta-tier-heading.tier-heading-c {
        --heading-tier-color: #29e681;
        --heading-tier-rgb: 41, 230, 129;
      }

      body #loadoutGrid .meta-tier-heading.tier-heading-d {
        --heading-tier-color: #8f98a7;
        --heading-tier-rgb: 143, 152, 167;
      }

      body #loadoutGrid .meta-tier-heading.tier-heading-meta span,
      body #loadoutGrid .meta-tier-heading.tier-heading-meta small,
      body #loadoutGrid .meta-tier-heading.tier-heading-a span,
      body #loadoutGrid .meta-tier-heading.tier-heading-a small,
      body #loadoutGrid .meta-tier-heading.tier-heading-b span,
      body #loadoutGrid .meta-tier-heading.tier-heading-b small,
      body #loadoutGrid .meta-tier-heading.tier-heading-c span,
      body #loadoutGrid .meta-tier-heading.tier-heading-c small,
      body #loadoutGrid .meta-tier-heading.tier-heading-d span,
      body #loadoutGrid .meta-tier-heading.tier-heading-d small {
        color: var(--heading-tier-color) !important;
        text-shadow: 0 0 1.1rem rgba(var(--heading-tier-rgb), 0.35) !important;
      }

      body #loadoutGrid .loadout-card.tier-card-meta,
      body #loadoutGrid .loadout-card.tier-absolute-meta,
      body #loadoutGrid > .loadout-card.tier-absolute-meta {
        --tier-card-color: #ffd35a;
        --tier-card-rgb: 255, 211, 90;
        border-color: rgba(255, 211, 90, 0.42) !important;
        outline-color: rgba(255, 211, 90, 0.3) !important;
        background:
          linear-gradient(135deg, rgba(255, 211, 90, 0.22), rgba(255, 157, 58, 0.09) 44%, rgba(255, 255, 255, 0.03)),
          #13150f !important;
        box-shadow:
          inset 0.72rem 0 0 rgba(255, 211, 90, 0.96),
          0 0 0 1px rgba(255, 211, 90, 0.16),
          0 1.25rem 2.7rem rgba(0, 0, 0, 0.38),
          0 0 2.35rem rgba(255, 211, 90, 0.22) !important;
      }

      body #loadoutGrid .loadout-card.tier-card-a {
        --tier-card-color: #b08cff;
        --tier-card-rgb: 176, 140, 255;
        background: linear-gradient(135deg, rgba(176, 140, 255, 0.15), rgba(110, 83, 255, 0.06) 42%, rgba(255, 255, 255, 0.02)), #101820 !important;
      }

      body #loadoutGrid .loadout-card.tier-card-b {
        --tier-card-color: #35d7ff;
        --tier-card-rgb: 53, 215, 255;
        background: linear-gradient(135deg, rgba(53, 215, 255, 0.13), rgba(51, 116, 255, 0.05) 42%, rgba(255, 255, 255, 0.02)), #101820 !important;
      }

      body #loadoutGrid .loadout-card.tier-card-c {
        --tier-card-color: #29e681;
        --tier-card-rgb: 41, 230, 129;
        background: linear-gradient(135deg, rgba(41, 230, 129, 0.13), rgba(90, 255, 105, 0.05) 42%, rgba(255, 255, 255, 0.02)), #101820 !important;
      }

      body #loadoutGrid .loadout-card.tier-card-d {
        --tier-card-color: #8f98a7;
        --tier-card-rgb: 143, 152, 167;
        background: linear-gradient(135deg, rgba(143, 152, 167, 0.13), rgba(99, 110, 125, 0.055) 42%, rgba(255, 255, 255, 0.02)), #101820 !important;
      }

      body #loadoutGrid .loadout-card .rank-badge {
        background: linear-gradient(135deg, var(--tier-card-color), color-mix(in srgb, var(--tier-card-color) 68%, #ffffff)) !important;
        color: #061008 !important;
        box-shadow: 0 0 1.4rem rgba(var(--tier-card-rgb), 0.34) !important;
      }

      body #loadoutGrid .loadout-card.tier-absolute-meta .rank-badge {
        color: #1a1200 !important;
        background: linear-gradient(135deg, #ffb82e, #ffe58d 58%, #ffcf4a) !important;
        box-shadow: 0 0 1.8rem rgba(255, 211, 90, 0.46) !important;
      }

      body #loadoutGrid .loadout-card .expand-button {
        position: relative !important;
        isolation: isolate !important;
        overflow: hidden !important;
        min-width: 8.7rem !important;
        border: 1px solid rgba(var(--tier-card-rgb), 0.62) !important;
        border-radius: 0.48rem !important;
        background:
          linear-gradient(135deg, rgba(var(--tier-card-rgb), 0.28), rgba(var(--tier-card-rgb), 0.12)),
          #101620 !important;
        color: #ffffff !important;
        animation: details-button-pulse 2.6s ease-in-out infinite !important;
        transform: translateZ(0) !important;
        transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease !important;
      }

      body #loadoutGrid .loadout-card .expand-button::before {
        content: "";
        position: absolute;
        inset: -40% 68% -40% -45%;
        z-index: -1;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.34), transparent);
        transform: skewX(-20deg) translateX(-42%);
        transition: transform 520ms ease;
      }

      body #loadoutGrid .loadout-card .expand-button:hover,
      body #loadoutGrid .loadout-card .expand-button:focus-visible,
      body #loadoutGrid .loadout-card.expanded .expand-button {
        border-color: rgba(var(--tier-card-rgb), 0.9) !important;
        background: linear-gradient(135deg, var(--tier-card-color), color-mix(in srgb, var(--tier-card-color) 72%, #ffffff)) !important;
        color: #071008 !important;
        transform: translateY(-0.08rem) scale(1.02) !important;
      }

      body #loadoutGrid .loadout-card .expand-button:hover::before,
      body #loadoutGrid .loadout-card .expand-button:focus-visible::before,
      body #loadoutGrid .loadout-card.expanded .expand-button::before {
        transform: skewX(-20deg) translateX(230%);
      }

      body #loadoutGrid .loadout-card .expand-button svg {
        transition: transform 180ms ease !important;
      }

      body #loadoutGrid .loadout-card .expand-button:hover svg,
      body #loadoutGrid .loadout-card .expand-button:focus-visible svg {
        transform: translateX(0.12rem) !important;
      }

      body #loadoutGrid .loadout-card .tag-list,
      body #loadoutGrid .loadout-card .card-footer .range {
        display: none !important;
      }

      @media (max-width: 720px) {
        :root {
          --site-side-gap: clamp(1.25rem, 5.5vw, 2rem);
        }
      }
    `;
    document.head.append(style);
  }

  function cleanCard(card) {
    const statRow = card.querySelector(".stat-row");
    if (!statRow) return;

    statRow.querySelectorAll("span").forEach((stat) => {
      const label = stat.querySelector("em")?.textContent?.trim() || "";
      if (/^(score|stand)$/i.test(label)) stat.remove();
    });

    if (!card.querySelector(".meta-score-pill")) {
      const score = scoreFromCard(card);
      const pill = document.createElement("div");
      pill.className = "meta-score-pill";
      pill.setAttribute("aria-label", `Score ${score} von 100`);
      pill.innerHTML = `<span>Score</span><strong>${score}</strong><em>/100</em>`;
      statRow.before(pill);
    }

    card.querySelector(".tag-list")?.remove();
    card.querySelector(".card-footer .range")?.remove();
  }

  function cleanCards() {
    injectStyle();
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(cleanCard);
  }

  function watchCards() {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.scoreCleanupWatched === "true") return;
    grid.dataset.scoreCleanupWatched = "true";
    new MutationObserver(cleanCards).observe(grid, { childList: true, subtree: true });
  }

  function run() {
    cleanCards();
    watchCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  setTimeout(run, 100);
  setTimeout(run, 500);
  setTimeout(run, 1200);
  setTimeout(run, 2500);
  document.addEventListener("click", () => setTimeout(run, 80));
  document.addEventListener("input", () => setTimeout(run, 80));
}());