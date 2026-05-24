(function () {
  function isSeason4Button(button) {
    if (!button) return false;
    const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    const mode = String(button.dataset.mode || "").toLowerCase();
    return label === "season 4" || label.includes("season 4") || mode.includes("season4") || mode.includes("season-4");
  }

  function normalizeSeason4Tabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return;

    const buttons = Array.from(switcher.querySelectorAll(".mode-button, button"));
    const seasonButtons = buttons.filter(isSeason4Button);
    if (!seasonButtons.length) return;

    const keep = seasonButtons.find((button) => !button.classList.contains("season4-mode-button")) || seasonButtons[0];
    keep.classList.add("season4-mode-button");
    keep.classList.add("mode-button");
    keep.dataset.mode = "season4-info";
    keep.type = "button";
    keep.textContent = "Season 4";

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
