(function () {
  const STYLE_ID = "season4-20260529-style";
  const trailerId = "1QZ7pMRBASs";
  const trailerUrl = `https://www.youtube-nocookie.com/embed/${trailerId}`;
  const leonRookKeyArt = "https://pbs.twimg.com/media/HJQpk08akAAMsi5.jpg?name=orig";
  const fortunesKeepKeyArt = "https://pbs.twimg.com/media/HJQpqkhaIAA5s9k.jpg?name=orig";
  const season4Image = leonRookKeyArt;

  const keyArt = [
    ["Leon Rook", leonRookKeyArt, "Offizielle Call of Duty X-Key-Art zu Season 04 mit Leon Rook", "https://x.com/CallofDuty/status/2059318714919715033"],
    ["Fortune's Keep", fortunesKeepKeyArt, "Offizielle Call of Duty X-Key-Art zu Fortune's Keep für Season 04", "https://x.com/CallofDuty/status/2059318720561139901"],
  ];

  const season4 = {
    title: "Season 4",
    description: "Aktueller Season-4-Überblick für Black Ops 7 und Warzone: bestätigter Start, offizieller Call-of-Duty-Story-Cinematic-Trailer, offizielle X-Key-Art, bekannte PC-Sicherheitsänderung, Blogpost-Status und offene Punkte für Warzone, Multiplayer, Zombies, Battle Pass und Meta.",
    kicker: "BO7 & Warzone",
    updateTime: "Aktualisiert: 27. Mai 2026",
    updateSummary: "Neu: Die Season-4-Bilder stammen direkt aus offiziellen @CallofDuty-X-Posts. Season 4 startet am Donnerstag, 4. Juni 2026. Die vollständige Roadmap und der große Call-of-Duty-Blogpost bleiben der nächste Prüfpunkt.",
    stats: [["Start", "4. Juni 2026"], ["Trailer", "Call of Duty Kanal"], ["Key Art", "@CallofDuty X"], ["Blogpost", "noch ausstehend"]],
  };

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      body .season4-watch-panel {
        --s4-green: #b9ff3d;
        --s4-green-rgb: 185, 255, 61;
        --s4-gold: #d8b457;
        --s4-gold-rgb: 216, 180, 87;
      }

      body .season4-watch-panel #modeInfoTabs,
      body .season4-watch-panel .mode-info-side,
      body .season4-watch-panel .mode-update-box,
      body .season4-watch-panel #modeInfoCards,
      body .season4-watch-panel #modeInfoGallery,
      body .season4-watch-panel .official-note {
        display: none !important;
      }

      body .season4-watch-panel .mode-info-layout {
        display: block !important;
      }

      body .season4-watch-panel .mode-info-main {
        width: 100% !important;
        max-width: none !important;
        overflow: hidden !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.22) !important;
        background:
          radial-gradient(circle at 15% 0%, rgba(var(--s4-green-rgb), 0.12), transparent 22rem),
          linear-gradient(145deg, rgba(15, 22, 20, 0.94), rgba(6, 9, 12, 0.96)) !important;
        box-shadow: 0 1.1rem 2.4rem rgba(0, 0, 0, 0.32), 0 0 1.6rem rgba(var(--s4-green-rgb), 0.08) !important;
      }

      body .season4-watch-panel .mode-info-hero {
        position: relative !important;
        overflow: hidden !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.34) !important;
        background:
          radial-gradient(circle at 78% 16%, rgba(var(--s4-green-rgb), 0.2), transparent 20rem),
          linear-gradient(135deg, rgba(var(--s4-green-rgb), 0.11), rgba(9, 14, 17, 0.92) 42%, rgba(5, 8, 11, 0.96)) !important;
        box-shadow: 0 0 2.2rem rgba(var(--s4-green-rgb), 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
      }

      body .season4-watch-panel #modeInfoKicker {
        color: #e8ffb4 !important;
        border-color: rgba(var(--s4-green-rgb), 0.5) !important;
        background: rgba(var(--s4-green-rgb), 0.1) !important;
        box-shadow: 0 0 1rem rgba(var(--s4-green-rgb), 0.12) !important;
      }

      body .season4-watch-panel #modeInfoTitle {
        color: #f4ffd8 !important;
        text-shadow: 0 0 1.1rem rgba(var(--s4-green-rgb), 0.18) !important;
      }

      body .season4-watch-panel #modeInfoImage {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        object-fit: contain !important;
        object-position: center center !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(var(--s4-green-rgb), 0.3) !important;
        border-radius: 8px 8px 0 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      body .season4-watch-panel .mode-info-body {
        padding: clamp(1rem, 1.6vw, 1.35rem) !important;
      }

      body .season4-watch-panel #modeInfoStats {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        gap: 0.75rem !important;
        margin-bottom: 1rem !important;
      }

      body .season4-watch-panel #modeInfoStats > div {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.24) !important;
        background: linear-gradient(145deg, rgba(var(--s4-green-rgb), 0.11), rgba(7, 10, 13, 0.88)) !important;
        padding: 0.72rem 0.8rem !important;
      }

      body .season4-watch-panel #modeInfoStats span {
        display: block !important;
        color: rgba(246, 255, 226, 0.72) !important;
        font-size: 0.72rem !important;
        font-weight: 900 !important;
        text-transform: uppercase !important;
      }

      body .season4-watch-panel #modeInfoStats strong {
        color: #dfff91 !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: 1.12rem !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel .season4-updated-pill {
        display: inline-flex !important;
        align-items: center !important;
        width: max-content !important;
        margin-top: 0.65rem !important;
        padding: 0.3rem 0.55rem !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.28) !important;
        border-radius: 999px !important;
        background: rgba(5, 8, 11, 0.72) !important;
        color: rgba(246, 255, 226, 0.78) !important;
        font-size: 0.72rem !important;
        font-weight: 800 !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel .season4-prose,
      body .season4-watch-panel .season4-trailer-panel,
      body .season4-watch-panel .season4-keyart-panel {
        margin: 0 0 1rem !important;
        overflow: hidden !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.28) !important;
        border-radius: 8px !important;
        background: linear-gradient(145deg, rgba(var(--s4-green-rgb), 0.08), rgba(6, 9, 12, 0.96)) !important;
        box-shadow: 0 0.7rem 1.5rem rgba(0, 0, 0, 0.22), 0 0 1.3rem rgba(var(--s4-green-rgb), 0.08) !important;
      }

      body .season4-watch-panel .season4-prose {
        padding: clamp(1.05rem, 1.8vw, 1.45rem) !important;
        color: rgba(232, 240, 226, 0.9) !important;
      }

      body .season4-watch-panel .season4-prose h3 {
        margin: 0 0 0.85rem !important;
        color: #dfff91 !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.55rem, 2.1vw, 2.1rem) !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel .season4-prose h4 {
        margin: 1.15rem 0 0.45rem !important;
        color: #f6ffe2 !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.1rem, 1.35vw, 1.35rem) !important;
        line-height: 1.05 !important;
      }

      body .season4-watch-panel .season4-prose p {
        margin: 0 0 0.75rem !important;
        max-width: 86ch !important;
        color: rgba(232, 240, 226, 0.88) !important;
        font-size: 1rem !important;
        line-height: 1.62 !important;
      }

      body .season4-watch-panel .season4-prose ul {
        display: grid !important;
        gap: 0.45rem !important;
        margin: 0.35rem 0 0.9rem !important;
        padding: 0 !important;
        list-style: none !important;
      }

      body .season4-watch-panel .season4-prose li {
        position: relative !important;
        padding-left: 1.1rem !important;
        color: rgba(232, 240, 226, 0.9) !important;
        line-height: 1.48 !important;
      }

      body .season4-watch-panel .season4-prose li::before {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        top: 0.62em !important;
        width: 0.38rem !important;
        height: 0.38rem !important;
        border-radius: 999px !important;
        background: #b9ff3d !important;
      }

      body .season4-watch-panel .season4-trailer-copy,
      body .season4-watch-panel .season4-keyart-heading {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 1rem !important;
        padding: 0.82rem 0.95rem !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      }

      body .season4-watch-panel .season4-trailer-copy span,
      body .season4-watch-panel .season4-keyart-heading span,
      body .season4-watch-panel .season4-keyart-card span {
        color: #b9ff3d !important;
        font-size: 0.72rem !important;
        font-weight: 950 !important;
        line-height: 1 !important;
        text-transform: uppercase !important;
      }

      body .season4-watch-panel .season4-trailer-copy strong,
      body .season4-watch-panel .season4-keyart-heading strong {
        display: block !important;
        margin-top: 0.22rem !important;
        color: #f6ffe2 !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.15rem, 1.6vw, 1.55rem) !important;
        line-height: 1 !important;
        white-space: normal !important;
        overflow-wrap: anywhere !important;
      }

      body .season4-watch-panel .season4-trailer-frame {
        position: relative !important;
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        background: #05070a !important;
      }

      body .season4-watch-panel .season4-trailer-frame iframe {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: 0 !important;
      }

      body .season4-watch-panel .season4-keyart-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        align-items: start !important;
        gap: 0.85rem !important;
        padding: 0.85rem !important;
      }

      body .season4-watch-panel .season4-keyart-card {
        position: relative !important;
        overflow: hidden !important;
        min-height: 0 !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 8px !important;
        background: rgba(5, 7, 10, 0.72) !important;
      }

      body .season4-watch-panel .season4-keyart-card a {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        color: inherit !important;
        text-decoration: none !important;
      }

      body .season4-watch-panel .season4-keyart-card img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        object-fit: contain !important;
        object-position: center center !important;
        background: transparent !important;
      }

      body .season4-watch-panel .season4-keyart-card figcaption {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 0.75rem !important;
        margin: 0 !important;
        padding: 0.65rem 0.75rem !important;
        border-top: 1px solid rgba(var(--s4-green-rgb), 0.22) !important;
        background: rgba(3, 6, 8, 0.9) !important;
      }

      body .season4-watch-panel .season4-keyart-card strong {
        color: #f6ffe2 !important;
        font-size: 0.9rem !important;
        line-height: 1 !important;
      }

      @media (max-width: 900px) {
        body .season4-watch-panel #modeInfoStats,
        body .season4-watch-panel .season4-keyart-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `;
  }

  function getSeason4Button() {
    return Array.from(document.querySelectorAll(".primary-mode-switch .mode-button, .primary-mode-switch button"))
      .find((button) => {
        const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        const mode = String(button.dataset.mode || "").toLowerCase();
        return mode === "season4-info" || label.includes("season 4");
      }) || null;
  }

  function prepareSeason4Button() {
    const button = getSeason4Button();
    if (!button) return null;
    button.classList.add("mode-button", "season-mode-button", "season4-mode-button");
    button.dataset.mode = "season4-info";
    button.type = "button";
    return button;
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function renderStats() {
    const stats = document.querySelector("#modeInfoStats");
    if (!stats) return;
    stats.innerHTML = season4.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
  }

  function renderTrailer() {
    const body = document.querySelector(".season4-watch-panel .mode-info-body");
    if (!body) return;
    document.querySelector("#season4TrailerPanel")?.remove();
    const trailer = document.createElement("section");
    trailer.id = "season4TrailerPanel";
    trailer.className = "season4-trailer-panel";
    trailer.innerHTML = `
      <div class="season4-trailer-copy">
        <div><span>Offizieller Call-of-Duty-Kanal</span><strong>Season 04 Story Cinematic</strong></div>
        <span>26. Mai 2026</span>
      </div>
      <div class="season4-trailer-frame">
        <iframe src="${trailerUrl}" title="Season 04 Story Cinematic | Call of Duty: Black Ops 7" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>`;
    body.prepend(trailer);
  }

  function renderKeyArt() {
    const body = document.querySelector(".season4-watch-panel .mode-info-body");
    if (!body) return;
    document.querySelector("#season4KeyArtPanel")?.remove();
    const panel = document.createElement("section");
    panel.id = "season4KeyArtPanel";
    panel.className = "season4-keyart-panel";
    panel.innerHTML = `
      <div class="season4-keyart-heading">
        <div><span>Offizielle Bilder</span><strong>Season 04 X Key Art</strong></div>
        <span>@CallofDuty</span>
      </div>
      <div class="season4-keyart-grid">
        ${keyArt.map(([label, src, alt, source]) => `
          <figure class="season4-keyart-card">
            <a href="${html(source)}" target="_blank" rel="noreferrer">
              <img src="${html(src)}" alt="${html(alt)}" loading="lazy" decoding="async">
              <figcaption><strong>${html(label)}</strong><span>Offiziell</span></figcaption>
            </a>
          </figure>`).join("")}
      </div>`;
    const trailer = document.querySelector("#season4TrailerPanel");
    if (trailer) trailer.insertAdjacentElement("afterend", panel);
    else body.prepend(panel);
  }

  function renderProse() {
    const body = document.querySelector(".season4-watch-panel .mode-info-body");
    if (!body) return;
    document.querySelector(".season4-prose")?.remove();
    const prose = document.createElement("section");
    prose.className = "season4-prose";
    prose.innerHTML = `
      <h3>Was zu Season 4 aktuell wichtig ist</h3>
      <p>Season 4 ist inzwischen deutlich konkreter: Der offizielle Call-of-Duty-YouTube-Kanal hat den Story-Cinematic veröffentlicht, und die offiziellen @CallofDuty-X-Posts zeigen die aktuellen Key-Art-Motive zu Leon Rook und Fortune's Keep. Damit ist klar, dass der Season-4-Fokus auf Black Ops 7 und Warzone liegt und am 4. Juni 2026 sichtbar in Richtung neuer Inhalte wechselt.</p>
      <p>Leon Rook wird offiziell als tödlich augmentierter Guild-Soldat geführt. Parallel wurde Fortune's Keep für den 4. Juni bestätigt, was die Warzone-Seite der Season besonders wichtig macht. Der große vollständige Season-4-Blogpost beziehungsweise die Roadmap ist weiterhin der Punkt, auf den dieser Bereich als nächstes reagieren muss.</p>
      <h4>Bestätigt</h4>
      <ul>
        <li>Season 4 startet am Donnerstag, 4. Juni 2026.</li>
        <li>Der Story-Cinematic stammt vom offiziellen Call-of-Duty-YouTube-Kanal.</li>
        <li>Leon Rook und Fortune's Keep wurden über offizielle @CallofDuty-X-Posts gezeigt.</li>
        <li>Fortune's Keep ist für Warzone am 4. Juni eingeordnet.</li>
      </ul>
      <h4>Kommende Waffen</h4>
      <p>Offiziell sind die Season-4-Waffen noch nicht vollständig benannt. In der Community ist aber vor allem die Rückkehr einer AN-94 im Gespräch, weil Leon Rook im Key-Art beziehungsweise Cinematic eine Waffe trägt, die stark an das bekannte Black-Ops-2-Sturmgewehr erinnert. Das ist aktuell der stärkste Hinweis, aber noch keine Bestätigung durch Activision.</p>
      <ul>
        <li>AN-94: wahrscheinlichster Community-Kandidat, vermutlich als Sturmgewehr für Battle Pass oder Event.</li>
        <li>Battle Pass: erwartet werden wie üblich zwei bis drei neue Waffen zum Start, wahrscheinlich mit Fokus auf AR/SMG.</li>
        <li>Events und Weekly Challenges: weitere Waffen oder Spezial-Freischaltungen könnten später in Season 4 folgen.</li>
        <li>Datamining-Gerüchte nennen unter anderem Codenamen wie Albatross, Kiwi, Mammoth und Maru. Diese Namen sind nicht offiziell und können Platzhalter sein.</li>
      </ul>
      <p>Für die Meta heißt das: Falls die AN-94 wirklich kommt, muss sie direkt in WZ META und BO7 META getestet werden. Besonders wichtig werden Rückstoß, Burst-Verhalten, Reichweite, TTK und ob sie eher als Long-Range-AR oder als flexibles Mid-Range-Gewehr funktioniert.</p>
      <h4>Noch offen</h4>
      <p>Der vollständige Overview-Blogpost muss noch abgewartet werden. Erst daraus sollten finale Details zu neuen Waffen, Maps, Events, Battle Pass, Zombies-Inhalten, Playlist-Änderungen und Balance-Anpassungen übernommen werden.</p>
      <h4>Auswirkung auf die Meta</h4>
      <p>Zum Season-Start müssen WZ META und BO7 META neu geprüft werden. Neue Waffen, Buffs, Nerfs, Attachments und Pickrates können sich direkt am 4. Juni verschieben. Sobald die offizielle Roadmap live ist, sollte dieser Tab zuerst bei Waffen, Warzone-Änderungen und Balance-Punkten aktualisiert werden.</p>
    `;
    const keyArtPanel = document.querySelector("#season4KeyArtPanel");
    if (keyArtPanel) keyArtPanel.insertAdjacentElement("afterend", prose);
    else body.appendChild(prose);
  }

  function cleanupModeInfoBody() {
    document.querySelectorAll("#mw4LivePanel, .mw4-prose, .mw4-updated-pill, #season4TrailerPanel, #season4KeyArtPanel, .season4-prose").forEach((node) => node.remove());
    const cards = document.querySelector("#modeInfoCards");
    if (cards) {
      cards.innerHTML = "";
      cards.hidden = true;
      cards.style.display = "none";
    }
    const tips = document.querySelector("#modeInfoTips");
    if (tips) tips.innerHTML = "";
    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
    }
  }

  function addUpdatedPill() {
    const heroText = document.querySelector(".season4-watch-panel .mode-info-hero > div");
    if (!heroText || heroText.querySelector(".season4-updated-pill")) return;
    const pill = document.createElement("span");
    pill.className = "season4-updated-pill";
    pill.textContent = season4.updateTime;
    heroText.appendChild(pill);
  }

  function activateSeason4(button = prepareSeason4Button()) {
    if (!button) return;
    installStyle();
    document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));

    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;
    const modeInfoTabs = document.querySelector("#modeInfoTabs");
    if (modeInfoTabs) {
      modeInfoTabs.hidden = true;
      modeInfoTabs.style.display = "none";
    }

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const active = panel.dataset.panel === "mode-info";
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });

    const panel = document.querySelector('[data-panel="mode-info"]');
    if (panel) {
      panel.classList.add("season4-watch-panel");
      panel.classList.remove("mw4-watch-panel");
    }

    setText("#tierTitle", season4.title);
    setText("#tierDescription", season4.description);
    setText("#modeInfoTitle", season4.title);
    setText("#modeInfoDescription", season4.description);
    setText("#modeInfoKicker", season4.kicker);
    setText("#modeInfoUpdateTime", season4.updateTime);
    setText("#modeInfoUpdateSummary", season4.updateSummary);

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = season4Image;
      image.alt = "Offizielle Call of Duty X-Key-Art zu Season 04 mit Leon Rook";
      image.loading = "eager";
      image.decoding = "async";
    }

    cleanupModeInfoBody();
    renderStats();
    addUpdatedPill();
    renderTrailer();
    renderKeyArt();
    renderProse();
    window.dispatchEvent(new CustomEvent("loadoutlab:lite-render", { detail: { panel: "season4" } }));
  }

  function bindSeason4() {
    installStyle();
    const button = prepareSeason4Button();
    if (!button || button.dataset.season4Bound === "true") return;
    button.dataset.season4Bound = "true";
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".season4-mode-button, [data-mode='season4-info']");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    activateSeason4(button);
  }, true);

  function init() {
    bindSeason4();
    if (document.querySelector(".season4-mode-button.active")) activateSeason4();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(bindSeason4, 300);
}());
