(function () {
  const trailerId = "1QZ7pMRBASs";
  const trailerUrl = `https://www.youtube-nocookie.com/embed/${trailerId}`;
  const season4Image = `https://i.ytimg.com/vi/${trailerId}/maxresdefault.jpg`;
  const season4 = {
    title: "Season 4",
    description: "Aktueller Season-4-Überblick für Black Ops 7 und Warzone: bestätigter Start, offizieller Call-of-Duty-Story-Cinematic-Trailer, bekannte PC-Sicherheitsänderung, Blogpost-Status und die wichtigsten offenen Punkte für Warzone, Multiplayer, Zombies, Battle Pass und Meta.",
    kicker: "BO7 & Warzone",
    updateTime: "Stand: 26. Mai 2026",
    updateSummary: "Neu: Der offizielle Call-of-Duty-YouTube-Trailer ist direkt eingebettet. Season 4 startet am Donnerstag, 4. Juni 2026. Die vollständige Roadmap/der große Call-of-Duty-Blogpost wird weiter überwacht.",
    stats: [["Start", "4. Juni 2026"], ["Trailer", "Call of Duty Kanal"], ["Blogpost", "noch ausstehend"], ["Status", "Fakt + Watchlist"]],
    cards: [
      ["Offizieller COD-Trailer", "Eingebettet ist jetzt das Video vom offiziellen Call-of-Duty-YouTube-Kanal: Season 04 Story Cinematic | Call of Duty: Black Ops 7."],
      ["Story-Cinematic", "Der Trailer stellt Karma gegen Dorne in den Mittelpunkt. Der Guild-killing virus ist bereit zum Einsatz und bildet den zentralen Story-Aufhänger für Season 4."],
      ["Start bestätigt", "Season 4 startet am Donnerstag, 4. Juni 2026. Erwartet wird der übliche Call-of-Duty-Rollout am Abend deutscher Zeit."],
      ["Plattformen", "Der Trailer-/Release-Hinweis nennt PlayStation 4, PlayStation 5, Xbox One, Xbox Series X|S und PC via Steam."],
      ["Blogpost & Roadmap", "Der große offizielle Season-4-Overview-Blogpost ist Stand 26. Mai noch nicht sauber live. Sobald Activision die vollständige Roadmap veröffentlicht, müssen Waffen, Maps, Events, Battle Pass, Zombies und Warzone-Änderungen sofort gegen bestätigte Angaben ersetzt werden."],
      ["Offiziell: PC-Sicherheit", "Bereits in den offiziellen BO7-Season-03-Patchnotes wurde für Season 04 eine PC-Änderung angekündigt: Microsoft Azure Attestation wird für die meisten Playlists Pflicht. TPM und Secure Boot müssen aktiv sein, sonst kann Matchmaking eingeschränkt werden."],
      ["Warzone Watchlist", "Weiter beobachten: Playlist-Updates, Ranked-Anpassungen, Balance-Änderungen und mögliche Resurgence-/Map-Rotation. Fortune's Keep bleibt bis zur offiziellen Roadmap als Gerücht markiert."],
      ["Multiplayer Watchlist", "Zu erwarten sind neue 6v6-Maps, Modi und Events. Konkrete Map-Namen gehören erst nach der offiziellen Roadmap auf die Seite."],
      ["Zombies Watchlist", "Die Mid-Season bleibt für Zombies spannend. Nach dem Trailer ist die Story-Spannung höher, aber Map-Name und Features bleiben offen."],
      ["Meta-Auswirkung", "Zum Season-Start müssen WZ META und BO7 META neu geprüft werden: neue Waffen, Buffs/Nerfs, Attachments, Pickrates und Score-Werte können sich direkt am 4. Juni verschieben."],
    ],
    tips: [
      "Jetzt korrekt: Trailer stammt vom offiziellen Call-of-Duty-YouTube-Kanal.",
      "Bestätigt: Season 4 startet am 4. Juni 2026 für PlayStation, Xbox und PC.",
      "Noch offen: vollständige Roadmap, neue Waffen, Maps, Events, Battle Pass und Warzone-Playlistdetails.",
      "Automatik repariert: GitHub Actions prüft Season-4-Quellen regelmäßig und deployed bei Änderungen automatisch.",
    ],
  };

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function injectTrailerStyle() {
    if (document.querySelector("#season4-trailer-embed-style")) return;
    const style = document.createElement("style");
    style.id = "season4-trailer-embed-style";
    style.textContent = `
      body .season4-watch-panel .season4-trailer-panel {
        margin: 0 0 1rem !important;
        overflow: hidden !important;
        border: 1px solid rgba(185, 255, 61, 0.28) !important;
        border-radius: 8px !important;
        background: linear-gradient(145deg, rgba(185, 255, 61, 0.08), rgba(6, 9, 12, 0.96)) !important;
        box-shadow: 0 1.1rem 2.4rem rgba(0, 0, 0, 0.32), 0 0 1.6rem rgba(185, 255, 61, 0.1) !important;
      }
      body .season4-watch-panel .season4-trailer-copy {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 1rem !important;
        padding: 0.82rem 0.95rem !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      }
      body .season4-watch-panel .season4-trailer-copy span {
        color: #b9ff3d !important;
        font-size: 0.72rem !important;
        font-weight: 950 !important;
        text-transform: uppercase !important;
      }
      body .season4-watch-panel .season4-trailer-copy strong {
        color: #f6ffe2 !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.15rem, 1.6vw, 1.55rem) !important;
        line-height: 1 !important;
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
    `;
    document.head.appendChild(style);
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
        <iframe
          src="${trailerUrl}"
          title="Season 04 Story Cinematic | Call of Duty: Black Ops 7"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>`;
    const updateBox = body.querySelector(".mode-update-box");
    if (updateBox) updateBox.insertAdjacentElement("afterend", trailer);
    else body.prepend(trailer);
  }

  function activateSeason4(button) {
    injectTrailerStyle();
    document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));
    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;
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
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    };
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
      image.alt = "Offizielles Thumbnail zum Season 04 Story Cinematic Trailer vom Call-of-Duty-Kanal";
    }
    const stats = document.querySelector("#modeInfoStats");
    if (stats) stats.innerHTML = season4.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
    renderTrailer();
    const cards = document.querySelector("#modeInfoCards");
    if (cards) cards.innerHTML = season4.cards.map(([title, text]) => `<article><h3>${html(title)}</h3><p>${html(text)}</p></article>`).join("");
    const tips = document.querySelector("#modeInfoTips");
    if (tips) tips.innerHTML = season4.tips.map((tip, index) => `<li><span>${index + 1}</span>${html(tip)}</li>`).join("");
    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".season4-mode-button, [data-mode='season4-info']");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    activateSeason4(button);
  }, true);
})();
