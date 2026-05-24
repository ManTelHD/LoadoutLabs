(function () {
  function clearStuckLoaders() {
    const blockingText = ["loadoutlab wird geladen", "loadout lab wird geladen", "falls nichts passiert", "wird geladen"];
    document.querySelectorAll("body *").forEach((element) => {
      const text = (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (!text || !blockingText.some((needle) => text.includes(needle))) return;

      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const coversScreen = rect.width > window.innerWidth * 0.45 && rect.height > window.innerHeight * 0.2;
      const canBlock = ["fixed", "absolute", "sticky"].includes(style.position) || Number(style.zIndex) > 10 || coversScreen;
      if (!canBlock) return;

      element.hidden = true;
      element.style.display = "none";
      element.style.pointerEvents = "none";
    });

    document.documentElement.classList.add("site-interaction-ready");
    document.body?.classList.add("site-interaction-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", clearStuckLoaders, { once: true });
  } else {
    clearStuckLoaders();
  }

  window.setTimeout(clearStuckLoaders, 500);
  window.setTimeout(clearStuckLoaders, 1500);
  window.setTimeout(clearStuckLoaders, 3500);
})();
