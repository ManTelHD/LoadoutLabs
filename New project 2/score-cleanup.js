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
      body #loadoutGrid .loadout-card .meta-score-pill {
        display: inline-grid !important;
        grid-template-columns: auto auto auto !important;
        align-items: baseline !important;
        width: fit-content !important;
        margin: 0.2rem 0 0.55rem !important;
        overflow: hidden !important;
        border: 1px solid rgba(154, 255, 62, 0.82) !important;
        border-radius: 0.52rem !important;
        background: linear-gradient(135deg, rgba(154, 255, 62, 0.24), rgba(23, 230, 96, 0.1)), rgba(7, 15, 9, 0.96) !important;
        box-shadow: 0 0 0 1px rgba(154, 255, 62, 0.14), 0 0.85rem 1.7rem rgba(23, 230, 96, 0.2) !important;
      }

      body #loadoutGrid .loadout-card .meta-score-pill span {
        align-self: stretch !important;
        display: inline-grid !important;
        place-items: center !important;
        padding: 0.42rem 0.65rem !important;
        background: rgba(154, 255, 62, 0.18) !important;
        color: #9aff3e !important;
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
        color: #9aff3e !important;
        font-size: 0.84rem !important;
        font-style: normal !important;
        font-weight: 950 !important;
      }
    `;
    document.head.append(style);
  }

  function cleanCard(card) {
    const statRow = card.querySelector(".stat-row");
    if (!statRow) return;

    statRow.querySelectorAll("span").forEach((stat) => {
      const label = stat.querySelector("em")?.textContent?.trim() || "";
      if (/^score$/i.test(label)) stat.remove();
    });

    if (!card.querySelector(".meta-score-pill")) {
      const score = scoreFromCard(card);
      const pill = document.createElement("div");
      pill.className = "meta-score-pill";
      pill.setAttribute("aria-label", `Score ${score} von 100`);
      pill.innerHTML = `<span>Score</span><strong>${score}</strong><em>/100</em>`;
      statRow.before(pill);
    }

    const tagList = card.querySelector(".tag-list");
    tagList?.querySelectorAll("span").forEach((tag) => {
      const text = tag.textContent.trim();
      if (/meta/i.test(text)) tag.remove();
    });
    if (tagList && !tagList.querySelector("span")) tagList.remove();
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
