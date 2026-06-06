(function () {
  let lastActive = "";
  let timer = 0;

  function text(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function activeLabel() {
    return text(document.querySelector("#filterToolbar .filter-button.active")?.textContent || "Alle");
  }

  function countLabel() {
    const count = document.getElementById("resultCount");
    const raw = text(count?.dataset?.filterCount || count?.textContent || "");
    const match = raw.match(/^(\d+)\s+(?:von|of)\s+(\d+)/i);
    return match ? `${match[1]}/${match[2]}` : "";
  }

  function syncToggle() {
    const shell = document.querySelector(".mobile-filter-shell");
    const toggle = document.querySelector(".mobile-filter-toggle");
    const active = activeLabel();
    if (!shell || !toggle) return;

    const label = toggle.querySelector(".mobile-filter-toggle-active");
    const count = toggle.querySelector(".mobile-filter-toggle-count");
    if (label) label.textContent = active;
    if (count) count.textContent = countLabel();

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    if (isMobile && lastActive && active && active !== lastActive) {
      shell.classList.remove("filters-open");
    }
    lastActive = active || lastActive;
    toggle.setAttribute("aria-expanded", shell.classList.contains("filters-open") ? "true" : "false");
  }

  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(syncToggle, 80);
    window.setTimeout(syncToggle, 220);
    window.setTimeout(syncToggle, 520);
  }

  function init() {
    syncToggle();
    window.setInterval(syncToggle, 650);
    document.addEventListener("click", schedule, true);

    const toolbar = document.getElementById("filterToolbar");
    if (toolbar) new MutationObserver(schedule).observe(toolbar, { subtree: true, attributes: true, attributeFilter: ["class"] });

    const count = document.getElementById("resultCount");
    if (count) new MutationObserver(schedule).observe(count, { attributes: true, childList: true, subtree: true });

    window.__loadoutMobileFilterCloseReady = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
