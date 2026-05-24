(function () {
  const watchMs = 6000;

  function isSeason4Button(button) {
    const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    const mode = String(button.dataset.mode || "").toLowerCase();
    return label.includes("season 4") || mode.includes("season4") || mode.includes("season-4") || mode === "season";
  }

  function scoreButton(button, index) {
    const mode = String(button.dataset.mode || "").toLowerCase();
    const html = String(button.innerHTML || "").toLowerCase();
    let score = 0;

    if (button.classList.contains("season-mode-button")) score += 120;
    if (html.includes("neu")) score += 90;
    if (mode === "season" || mode === "season4" || mode === "season-4") score += 80;
    if (!button.classList.contains("season4-mode-button")) score += 35;
    if (button.classList.contains("mode-button")) score += 10;

    return score - index;
  }

  function createSeason4Button(switcher) {
    const button = document.createElement("button");
    button.className = "mode-button season-mode-button season4-mode-button";
    button.dataset.mode = "season4-info";
    button.type = "button";
    button.innerHTML = "<span>NEU</span><strong>Season 4</strong>";
    switcher.appendChild(button);
    return button;
  }

  function fixSeason4Tabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return;

    const buttons = Array.from(switcher.querySelectorAll("button, .mode-button"));
    const seasonButtons = buttons.filter(isSeason4Button);
    const keep = seasonButtons.length
      ? seasonButtons.map((button, index) => ({ button, score: scoreButton(button, index) })).sort((a, b) => b.score - a.score)[0].button
      : createSeason4Button(switcher);

    keep.classList.add("mode-button", "season-mode-button", "season4-mode-button");
    keep.dataset.mode = "season4-info";
    keep.type = "button";

    if (!keep.querySelector("strong") && (keep.textContent || "").trim() === "Season 4") {
      keep.innerHTML = "<span>NEU</span><strong>Season 4</strong>";
    }

    seasonButtons.forEach((button) => {
      if (button !== keep) button.remove();
    });
  }

  function boot() {
    fixSeason4Tabs();
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return;

    const observer = new MutationObserver(fixSeason4Tabs);
    observer.observe(switcher, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "data-mode"] });
    window.setTimeout(() => {
      fixSeason4Tabs();
      observer.disconnect();
    }, watchMs);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
