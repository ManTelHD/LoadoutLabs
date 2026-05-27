(function () {
  function installStyle() {
    if (document.querySelector("#season4-header-fix-style")) return;
    const style = document.createElement("style");
    style.id = "season4-header-fix-style";
    style.textContent = `
      body .season4-watch-panel .mode-info-layout { display: block !important; }
      body .season4-watch-panel .mode-info-main { width: 100% !important; max-width: none !important; }
      body .season4-watch-panel .mode-info-side,
      body .season4-watch-panel .mode-update-box,
      body .season4-watch-panel #modeInfoCards { display: none !important; }
      body .season4-watch-panel .season4-updated-pill {
        display: inline-flex !important;
        align-items: center !important;
        width: max-content !important;
        margin-top: 0.65rem !important;
        padding: 0.3rem 0.55rem !important;
        border: 1px solid rgba(185, 255, 61, 0.28) !important;
        border-radius: 999px !important;
        background: rgba(5, 8, 11, 0.72) !important;
        color: rgba(246, 255, 226, 0.78) !important;
        font-size: 0.72rem !important;
        font-weight: 800 !important;
        line-height: 1 !important;
      }
      body .season4-watch-panel .season4-prose {
        display: block !important;
        margin-top: 1rem !important;
        padding: clamp(1.05rem, 1.8vw, 1.45rem) !important;
        border: 1px solid rgba(185, 255, 61, 0.22) !important;
        border-radius: 8px !important;
        background: radial-gradient(circle at 12% 0%, rgba(185, 255, 61, 0.1), transparent 18rem), linear-gradient(145deg, rgba(12, 18, 16, 0.94), rgba(5, 8, 11, 0.96)) !important;
        color: rgba(232, 240, 226, 0.9) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1rem 2rem rgba(0, 0, 0, 0.26) !important;
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
        box-shadow: 0 0 0.65rem rgba(185, 255, 61, 0.32) !important;
      }
      body .season4-watch-panel .season4-keyart-heading {
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 1.25rem !important;
        padding: 1.05rem 1.15rem 0.95rem !important;
        min-height: auto !important;
      }
      body .season4-watch-panel .season4-keyart-heading > div {
        display: grid !important;
        gap: 0.28rem !important;
        min-width: 0 !important;
      }
      body .season4-watch-panel .season4-keyart-heading span { white-space: nowrap !important; line-height: 1 !important; }
      body .season4-watch-panel .season4-keyart-heading > div > span {
        display: block !important;
        font-size: 0.7rem !important;
        letter-spacing: 0 !important;
      }
      body .season4-watch-panel .season4-keyart-heading strong {
        display: block !important;
        font-size: clamp(1.45rem, 2.2vw, 2rem) !important;
        line-height: 0.98 !important;
        white-space: normal !important;
        overflow-wrap: anywhere !important;
      }
      body .season4-watch-panel .season4-keyart-heading > span:last-child {
        flex: 0 0 auto !important;
        align-self: flex-start !important;
        padding-top: 0.16rem !important;
        color: #b9ff3d !important;
      }
      @media (max-width: 640px) {
        body .season4-watch-panel .season4-keyart-heading {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 0.75rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderProse() {
    const body = document.querySelector(".season4-watch-panel .mode-info-body");
    if (!body) return false;
    let prose = body.querySelector(".season4-prose");
    if (!prose) {
      prose = document.createElement("section");
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
        <h4>Noch offen</h4>
        <p>Der vollständige Overview-Blogpost muss noch abgewartet werden. Erst daraus sollten finale Details zu neuen Waffen, Maps, Events, Battle Pass, Zombies-Inhalten, Playlist-Änderungen und Balance-Anpassungen übernommen werden.</p>
        <h4>Auswirkung auf die Meta</h4>
        <p>Zum Season-Start müssen WZ META und BO7 META neu geprüft werden. Neue Waffen, Buffs, Nerfs, Attachments und Pickrates können sich direkt am 4. Juni verschieben. Sobald die offizielle Roadmap live ist, sollte dieser Tab zuerst bei Waffen, Warzone-Änderungen und Balance-Punkten aktualisiert werden.</p>
      `;
    }
    const cards = body.querySelector("#modeInfoCards");
    if (cards) {
      cards.hidden = true;
      cards.style.display = "none";
      if (prose.parentElement !== body || prose.previousElementSibling !== cards) cards.insertAdjacentElement("afterend", prose);
    } else if (prose.parentElement !== body) {
      body.appendChild(prose);
    }
    prose.hidden = false;
    prose.style.display = "block";
    return true;
  }

  function polishSeason4() {
    installStyle();
    if (!document.querySelector(".season4-watch-panel")) return false;
    const side = document.querySelector(".season4-watch-panel .mode-info-side");
    if (side && !side.hidden) side.hidden = true;
    if (side && side.style.display !== "none") side.style.display = "none";
    const updateBox = document.querySelector(".season4-watch-panel .mode-update-box");
    if (updateBox && !updateBox.hidden) updateBox.hidden = true;
    if (updateBox && updateBox.style.display !== "none") updateBox.style.display = "none";
    const cards = document.querySelector(".season4-watch-panel #modeInfoCards");
    if (cards && !cards.hidden) cards.hidden = true;
    if (cards && cards.style.display !== "none") cards.style.display = "none";
    const heroText = document.querySelector(".season4-watch-panel .mode-info-hero > div");
    if (heroText && !heroText.querySelector(".season4-updated-pill")) {
      const pill = document.createElement("span");
      pill.className = "season4-updated-pill";
      pill.textContent = "Aktualisiert: 27. Mai 2026";
      heroText.appendChild(pill);
    }
    renderProse();
    const heading = document.querySelector(".season4-watch-panel .season4-keyart-heading");
    if (heading) {
      const label = heading.querySelector("div > span");
      if (label && label.textContent !== "Offizielle Bilder") label.textContent = "Offizielle Bilder";
      const title = heading.querySelector("strong");
      if (title && title.textContent !== "Season 04 X Key Art") title.textContent = "Season 04 X Key Art";
      const source = heading.querySelector(":scope > span:last-child");
      if (source && source.textContent !== "@CallofDuty") source.textContent = "@CallofDuty";
    }
    return true;
  }

  function schedulePolish() {
    window.setTimeout(polishSeason4, 40);
    window.setTimeout(polishSeason4, 180);
    window.setTimeout(polishSeason4, 500);
  }

  function start() {
    installStyle();
    schedulePolish();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const done = polishSeason4();
      if (done || tries >= 24) window.clearInterval(timer);
    }, 250);
  }

  document.addEventListener("pointerdown", schedulePolish, true);
  document.addEventListener("mousedown", schedulePolish, true);
  document.addEventListener("click", schedulePolish, true);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
