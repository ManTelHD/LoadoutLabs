(function () {
  const imageUrl = "https://pbs.twimg.com/media/HI3_HHtW4AAHqkg.jpg";
  const imageAlt = "MW4 Community-Bild von TheGhostOfHope auf X";

  function applyMW4Image() {
    const isMW4Active = document.querySelector(".mw4-mode-button.active, [data-mode='mw4-info'].active") ||
      document.querySelector("[data-panel='mode-info'].mw4-watch-panel");
    if (!isMW4Active) return;

    const mainImage = document.querySelector("#modeInfoImage");
    if (mainImage) {
      mainImage.src = imageUrl;
      mainImage.alt = imageAlt;
    }

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
    }
  }

  function scheduleApply() {
    applyMW4Image();
    [80, 220, 600, 1200].forEach((delay) => window.setTimeout(applyMW4Image, delay));
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mw4-mode-button, [data-mode='mw4-info']")) {
      scheduleApply();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleApply, { once: true });
  } else {
    scheduleApply();
  }
})();
