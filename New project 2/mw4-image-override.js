(function () {
  const imageUrl = "https://pbs.twimg.com/media/HI3_HHtW4AAHqkg.jpg";
  const imageAlt = "MW4 Community-Bild von TheGhostOfHope auf X";

  function injectMW4Polish() {
    if (document.querySelector("#mw4-visual-polish-style")) return;

    const style = document.createElement("style");
    style.id = "mw4-visual-polish-style";
    style.textContent = `
      body .mw4-watch-panel {
        --mw4-gold: #d8b457;
        --mw4-gold-rgb: 216, 180, 87;
        --mw4-ink: #080b0d;
        --mw4-panel: rgba(12, 17, 21, 0.86);
      }

      body .mw4-watch-panel .mode-info-layout {
        align-items: start !important;
        gap: clamp(1.1rem, 2vw, 1.75rem) !important;
      }

      body .mw4-watch-panel .mode-info-main,
      body .mw4-watch-panel .mode-info-side {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.22) !important;
        background:
          radial-gradient(circle at 16% 0%, rgba(var(--mw4-gold-rgb), 0.16), transparent 22rem),
          linear-gradient(145deg, rgba(16, 22, 25, 0.94), rgba(6, 9, 12, 0.96)) !important;
        box-shadow: 0 1.4rem 3rem rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }

      body .mw4-watch-panel .mode-info-main {
        overflow: hidden !important;
      }

      body .mw4-watch-panel #modeInfoImage {
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        object-fit: cover !important;
        object-position: center center !important;
        border-radius: 8px 8px 0 0 !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(var(--mw4-gold-rgb), 0.32) !important;
        box-shadow: 0 1.1rem 2.4rem rgba(0, 0, 0, 0.38) !important;
      }

      body .mw4-watch-panel .mode-info-body {
        padding: clamp(1rem, 1.6vw, 1.35rem) !important;
      }

      body .mw4-watch-panel #modeInfoStats {
        gap: 0.7rem !important;
      }

      body .mw4-watch-panel #modeInfoStats > div {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.24) !important;
        background: linear-gradient(145deg, rgba(var(--mw4-gold-rgb), 0.1), rgba(7, 10, 13, 0.88)) !important;
      }

      body .mw4-watch-panel .mode-update-box {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.3) !important;
        background:
          linear-gradient(90deg, rgba(var(--mw4-gold-rgb), 0.16), rgba(255, 255, 255, 0.035)),
          rgba(8, 12, 15, 0.88) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }

      body .mw4-watch-panel #modeInfoCards {
        gap: 0.75rem !important;
      }

      body .mw4-watch-panel #modeInfoCards article {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.18) !important;
        border-left: 0.32rem solid rgba(var(--mw4-gold-rgb), 0.8) !important;
        background:
          linear-gradient(135deg, rgba(var(--mw4-gold-rgb), 0.08), rgba(10, 14, 18, 0.92)),
          #090d11 !important;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease !important;
      }

      body .mw4-watch-panel #modeInfoCards article:hover {
        transform: translateY(-0.06rem);
        border-color: rgba(var(--mw4-gold-rgb), 0.34) !important;
        box-shadow: 0 0.9rem 1.8rem rgba(0, 0, 0, 0.24), 0 0 1.1rem rgba(var(--mw4-gold-rgb), 0.1) !important;
      }

      body .mw4-watch-panel .mode-info-side {
        padding: clamp(1rem, 1.5vw, 1.35rem) !important;
        position: sticky !important;
        top: 1rem !important;
        overflow: hidden !important;
      }

      body .mw4-watch-panel .mode-info-side::before {
        content: "" !important;
        position: absolute !important;
        inset: 0 0 auto 0 !important;
        height: 0.22rem !important;
        background: linear-gradient(90deg, var(--mw4-gold), rgba(var(--mw4-gold-rgb), 0.18)) !important;
        pointer-events: none !important;
      }

      body .mw4-watch-panel .mode-info-side h3 {
        margin: 0 0 0.95rem !important;
        color: #fff3cf !important;
        font-size: clamp(1.35rem, 1.7vw, 1.8rem) !important;
        line-height: 1 !important;
        text-shadow: 0 0 1.1rem rgba(var(--mw4-gold-rgb), 0.22) !important;
      }

      body .mw4-watch-panel #modeInfoTips {
        display: grid !important;
        gap: 0.62rem !important;
        padding: 0 !important;
        margin: 0 !important;
        list-style: none !important;
      }

      body .mw4-watch-panel #modeInfoTips li {
        position: relative !important;
        margin: 0 !important;
        padding: 0.78rem 0.85rem 0.78rem 2.35rem !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.18) !important;
        background:
          linear-gradient(135deg, rgba(var(--mw4-gold-rgb), 0.09), rgba(8, 12, 15, 0.92)),
          #090d11 !important;
        color: rgba(255, 255, 255, 0.9) !important;
        line-height: 1.45 !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
      }

      body .mw4-watch-panel #modeInfoTips li::before {
        content: "" !important;
        position: absolute !important;
        left: 0.82rem !important;
        top: 0.96rem !important;
        width: 0.68rem !important;
        height: 0.68rem !important;
        border-radius: 999px !important;
        background: var(--mw4-gold) !important;
        box-shadow: 0 0 0 0.22rem rgba(var(--mw4-gold-rgb), 0.13), 0 0 1rem rgba(var(--mw4-gold-rgb), 0.28) !important;
      }

      body .mw4-watch-panel .official-note {
        margin-top: 1rem !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.24) !important;
        background:
          linear-gradient(135deg, rgba(var(--mw4-gold-rgb), 0.1), rgba(9, 13, 16, 0.9)),
          #090d11 !important;
        color: rgba(255, 255, 255, 0.9) !important;
      }

      body .mw4-watch-panel .official-note strong {
        color: #ffe6a0 !important;
      }

      body .mw4-watch-panel #modeInfoGallery {
        display: none !important;
      }

      @media (max-width: 900px) {
        body .mw4-watch-panel .mode-info-side {
          position: relative !important;
          top: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyMW4Image() {
    injectMW4Polish();

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
