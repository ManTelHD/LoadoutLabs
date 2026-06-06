(function () {
  const MOBILE_QUERY = "(max-width: 760px)";
  let lastActive = "";
  let timer = 0;

  function text(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
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

  function setToolbarState(shell, toolbar) {
    if (!toolbar) return;

    if (!isMobile()) {
      toolbar.style.removeProperty("max-height");
      toolbar.style.removeProperty("margin-top");
      toolbar.style.removeProperty("opacity");
      toolbar.style.removeProperty("pointer-events");
      toolbar.style.removeProperty("overflow");
      return;
    }

    const open = Boolean(shell?.classList.contains("filters-open"));
    toolbar.style.maxHeight = open ? "32rem" : "0";
    toolbar.style.marginTop = open ? "0.5rem" : "0";
    toolbar.style.opacity = open ? "1" : "0";
    toolbar.style.pointerEvents = open ? "auto" : "none";
    toolbar.style.overflow = "hidden";
  }

  function syncToggle() {
    const shell = document.querySelector(".mobile-filter-shell");
    const toolbar = document.getElementById("filterToolbar");
    const toggle = document.querySelector(".mobile-filter-toggle");
    const active = activeLabel();

    if (!shell || !toggle) {
      setToolbarState(shell, toolbar);
      return;
    }

    const label = toggle.querySelector(".mobile-filter-toggle-active");
    const count = toggle.querySelector(".mobile-filter-toggle-count");
    if (label) label.textContent = active;
    if (count) count.textContent = countLabel();

    if (isMobile() && lastActive && active && active !== lastActive) {
      shell.classList.remove("filters-open");
    }

    lastActive = active || lastActive;
    toggle.setAttribute("aria-expanded", shell.classList.contains("filters-open") ? "true" : "false");
    setToolbarState(shell, toolbar);
  }

  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(syncToggle, 80);
    window.setTimeout(syncToggle, 220);
    window.setTimeout(syncToggle, 520);
  }

  function watchNode(node, options) {
    if (node) new MutationObserver(schedule).observe(node, options);
  }

  function init() {
    syncToggle();
    window.setInterval(syncToggle, 650);
    window.addEventListener("resize", schedule);
    document.addEventListener("click", schedule, true);

    watchNode(document.querySelector(".mobile-filter-shell"), { attributes: true, attributeFilter: ["class"] });
    watchNode(document.getElementById("filterToolbar"), { subtree: true, attributes: true, attributeFilter: ["class", "style"] });
    watchNode(document.getElementById("resultCount"), { attributes: true, childList: true, subtree: true });

    window.__loadoutMobileFilterCloseReady = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
