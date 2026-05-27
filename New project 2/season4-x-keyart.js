(function () {
  const xKeyArt = [
    {
      label: "Leon Rook",
      kicker: "Season 04 Key Art",
      src: "https://pbs.twimg.com/media/HJQpk08akAAMsi5.jpg?name=orig",
      alt: "Offizielle Call of Duty X-Key-Art zu Season 04 mit Leon Rook",
      source: "https://x.com/CallofDuty/status/2059318714919715033",
    },
    {
      label: "Fortune's Keep",
      kicker: "Warzone Key Art",
      src: "https://pbs.twimg.com/media/HJQpqkhaIAA5s9k.jpg?name=orig",
      alt: "Offizielle Call of Duty X-Key-Art zu Fortune's Keep für Season 04",
      source: "https://x.com/CallofDuty/status/2059318720561139901",
    },
  ];

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function installStyle() {
    if (document.querySelector("#season4-x-keyart-style")) return;
    const style = document.createElement("style");
    style.id = "season4-x-keyart-style";
    style.textContent = `
      body .season4-watch-panel .season4-keyart-grid.x-keyart-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }

      body .season4-watch-panel .season4-keyart-grid.x-keyart-grid .season4-keyart-card:first-child {
        grid-row: auto !important;
      }

      body .season4-watch-panel .season4-keyart-grid.x-keyart-grid .season4-keyart-card img,
      body .season4-watch-panel .season4-keyart-grid.x-keyart-grid .season4-keyart-card:first-child img {
        min-height: clamp(17rem, 30vw, 28rem) !important;
        object-fit: cover !important;
      }

      body .season4-watch-panel .season4-keyart-card a {
        color: inherit !important;
        text-decoration: none !important;
      }

      body .season4-watch-panel .season4-keyart-card figcaption span:last-child {
        color: rgba(255, 255, 255, 0.78) !important;
      }

      @media (max-width: 820px) {
        body .season4-watch-panel .season4-keyart-grid.x-keyart-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderOfficialXKeyArt() {
    const panel = document.querySelector(".season4-watch-panel #season4KeyArtPanel");
    if (!panel) return false;
    installStyle();
    const heading = panel.querySelector(".season4-keyart-heading");
    if (heading) {
      heading.innerHTML = `
        <div><span>Offizielle Bilder</span><strong>Season 04 X Key Art</strong></div>
        <span>@CallofDuty</span>`;
    }

    const grid = panel.querySelector(".season4-keyart-grid");
    if (!grid) return false;
    grid.classList.add("x-keyart-grid");
    grid.innerHTML = xKeyArt.map((item) => `
      <figure class="season4-keyart-card">
        <a href="${html(item.source)}" target="_blank" rel="noreferrer">
          <img src="${html(item.src)}" alt="${html(item.alt)}" loading="lazy">
          <figcaption>
            <strong>${html(item.label)}</strong>
            <span>${html(item.kicker)}</span>
          </figcaption>
        </a>
      </figure>`).join("");
    return true;
  }

  function patchSeason4() {
    const panel = document.querySelector(".season4-watch-panel");
    if (!panel) return;

    const hero = document.querySelector("#modeInfoImage");
    if (hero) {
      hero.src = xKeyArt[0].src;
      hero.alt = xKeyArt[0].alt;
    }

    renderOfficialXKeyArt();
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".season4-mode-button, [data-mode='season4-info']")) return;
    window.setTimeout(patchSeason4, 40);
    window.setTimeout(patchSeason4, 180);
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(patchSeason4, 250), { once: true });
  } else {
    window.setTimeout(patchSeason4, 250);
  }
}());
