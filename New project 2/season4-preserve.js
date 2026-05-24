(function () {
  function isSeason4Button(button) {
    const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    const mode = String(button.dataset.mode || "").toLowerCase();
    return label.includes("season 4") || mode.includes("season4") || mode.includes("season-4") || mode === "season";
  }

  function preserveSeason4Tab() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return;

    const existing = Array.from(switcher.querySelectorAll(".mode-button, button")).find(isSeason4Button);
    if (!existing) return;

    existing.classList.add("mode-button");
    existing.classList.add("season4-mode-button");
    existing.dataset.mode = "season4-info";
    existing.type = "button";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preserveSeason4Tab, { once: true });
  } else {
    preserveSeason4Tab();
  }
})();
