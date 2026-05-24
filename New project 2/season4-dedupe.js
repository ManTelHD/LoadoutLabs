(function () {
  function isSeason4Button(button) {
    if (!button) return false;
    const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    const mode = String(button.dataset.mode || "").toLowerCase();
    return label.includes("season 4") || mode.includes("season4") || mode.includes("season-4") || mode === "season";
  }

  function scoreSeason4Button(button, index) {
    let score = 0;
    const mode = String(button.dataset.mode || "").toLowerCase();
    if (button.classList.contains("season-mode-button")) score += 100;
    if (mode === "season" || mode === "season4" || mode === "season-4") score += 80;
    if (!button.classList.contains("season4-mode-button")) score += 40;
    return score - index;
  }

  function normalizeSeason4Tabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return;

    const buttons = Array.from(switcher.querySelectorAll(".mode-button, button"));
    const seasonButtons = buttons.filter(isSeason4Button);
    if (!seasonButtons.length) return;

    const keep = seasonButtons
      .map((button, index) => ({ button, score: scoreSeason4Button(button, index) }))
      .sort((a, b) => b.score - a.score)[0].button;

    keep.classList.add("season4-mode-button");
    keep.classList.add("mode-button");
    keep.dataset.mode = "season4-info";
    keep.type = "button";

    seasonButtons.forEach((button) => {
      if (button !== keep) button.remove();
    });
  }

  function boot() {
    normalizeSeason4Tabs();
    window.setTimeout(normalizeSeason4Tabs, 100);
    window.setTimeout(normalizeSeason4Tabs, 500);
    window.setTimeout(normalizeSeason4Tabs, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
