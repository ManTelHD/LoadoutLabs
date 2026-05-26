const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const seasonScriptPath = path.join(root, "New project 2", "season4-click-rescue.js");
const injectorPath = path.join(root, "netlify-inject-meta-overrides.js");
const markerPath = path.join(root, ".nojekyll");

const sources = [
  "https://www.callofduty.com/season-04",
  "https://www.callofduty.com/blog",
  "https://www.gamespot.com/articles/cod-black-ops-7-and-warzone-season-4-release-date-and-details/",
  "https://www.youtube.com/results?search_query=Call+of+Duty+Black+Ops+7+Official+Season+4+Story+Cinematic+Trailer",
];

async function fetchText(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent": "LoadoutLabAutoUpdate/1.0 (+https://github.com/ManTelHD/LoadoutLabs)",
        "accept-language": "en-US,en;q=0.9,de;q=0.8",
      },
    });
    if (!response.ok) return "";
    return await response.text();
  } catch {
    return "";
  }
}

function stamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}`;
}

function germanDate() {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

function esc(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function renderSeasonScript({ officialHubLive, trailerFound, checkedAt }) {
  const status = officialHubLive ? "offizieller Hub live" : trailerFound ? "Trailer live, Blogpost offen" : "Watchlist";
  const updateSummary = officialHubLive
    ? "Der offizielle Season-04-Hub ist live. Roadmap, Waffen, Maps, Events und Warzone-Details müssen aus dem offiziellen Hub übernommen und gegen alle Gerüchte priorisiert werden."
    : trailerFound
      ? "Der offizielle Season-4-Story-Cinematic-Trailer ist erkannt. Season 4 startet am 4. Juni 2026; der vollständige Blogpost/Roadmap-Hub wird weiter überwacht."
      : "Season 4 wird weiter überwacht. Sobald Trailer, Blogpost oder Roadmap erkannt werden, aktualisiert dieser Workflow die Seite automatisch.";

  return `(function () {
  const season4Image = "https://assets.games.gg/cod_warzone_fortunes_keep_map_easter_29200c5157.webp";
  const season4 = {
    title: "Season 4",
    description: "Aktueller Season-4-Überblick für Black Ops 7 und Warzone: bestätigter Start, Trailer-/Blogpost-Status, PC-Sicherheitsänderung und Watchlist für Warzone, Multiplayer, Zombies, Battle Pass und Meta.",
    kicker: "BO7 & Warzone",
    updateTime: "Stand: ${esc(checkedAt)}",
    updateSummary: "${esc(updateSummary)}",
    stats: [["Start", "4. Juni 2026"], ["Trailer", "${trailerFound ? "Story Cinematic live" : "wird überwacht"}"], ["Blogpost", "${officialHubLive ? "offizieller Hub live" : "noch ausstehend"}"], ["Status", "${esc(status)}"]],
    cards: [
      ["Story & Trailer", "Der Season-4-Story-Fokus liegt auf Karma gegen Dorne und dem Guild-killing virus. Sobald Activision weitere Story- oder Gameplay-Details im Blog ergänzt, wird dieser Abschnitt automatisch aktualisiert."],
      ["Start", "Season 4 startet am Donnerstag, 4. Juni 2026. Die Seite behandelt dieses Datum als bestätigten Start und überwacht den offiziellen Hub weiter auf exakte Uhrzeit, Roadmap und Patchnotes."],
      ["Blogpost & Roadmap", "${officialHubLive ? "Der offizielle Season-04-Hub wurde erkannt. Offizielle Details haben Priorität vor bisherigen Gerüchten." : "Der vollständige offizielle Season-4-Blogpost ist noch nicht sauber live. Der Workflow prüft den Call-of-Duty-Hub und relevante Quellen regelmäßig."}"],
      ["PC-Sicherheit", "Für Season 04 ist Microsoft Azure Attestation auf PC für die meisten Playlists angekündigt. TPM und Secure Boot müssen aktiv sein; fehlende Attestation kann Matchmaking einschränken."],
      ["Warzone", "Zu prüfen bleiben Playlist-Updates, Ranked-Anpassungen, Map-Rotation, Balance-Änderungen und neue oder zurückkehrende Items. Gerüchte bleiben markiert, bis die Roadmap live ist."],
      ["Multiplayer", "Erwartet werden neue Maps, Modi und Events. Konkrete Namen werden erst nach offizieller Roadmap übernommen."],
      ["Zombies", "Die Mid-Season bleibt für Zombies die wichtigste Watchlist: mögliche neue Map, Story-Fortsetzung und Event-Rewards werden nach offizieller Bestätigung eingetragen."],
      ["Meta", "Zum Start am 4. Juni müssen WZ META und BO7 META direkt neu geprüft werden: neue Waffen, Buffs/Nerfs, Attachments, Pickrates und Score-Werte."],
    ],
    tips: [
      "Automatisch geprüft: ${esc(checkedAt)}.",
      "Bestätigt: Season 4 startet am 4. Juni 2026.",
      "Neu/überwacht: Story-Cinematic-Trailer, Karma gegen Dorne und Guild-killing virus.",
      "Nächster automatischer Schritt: offizieller Roadmap-Blogpost und Patchnotes übernehmen, sobald sie erkannt werden.",
    ],
  };

  function html(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
  }

  function activateSeason4(button) {
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
      image.alt = "Season 4 Watchlist für Black Ops 7 und Warzone";
    }
    const stats = document.querySelector("#modeInfoStats");
    if (stats) stats.innerHTML = season4.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
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
`;
}

function bumpInjector(version) {
  let content = fs.readFileSync(injectorPath, "utf8");
  content = content.replace(/season4-click-rescue\.js\?v=[^"]+/g, `season4-click-rescue.js?v=${version}`);
  fs.writeFileSync(injectorPath, content);
}

async function main() {
  const texts = await Promise.all(sources.map(fetchText));
  const combined = texts.join("\n");
  const officialHubLive = /Season\s*04|Season\s*4/i.test(texts[0] || "") && !/Season\s*03\s*Reloaded/i.test(texts[0] || "");
  const trailerFound = /Official Season 4 Story Cinematic Trailer|Story Cinematic Trailer|Karma|Dorne|Guild-killing virus/i.test(combined);
  const checkedAt = germanDate();
  const next = renderSeasonScript({ officialHubLive, trailerFound, checkedAt });
  const current = fs.existsSync(seasonScriptPath) ? fs.readFileSync(seasonScriptPath, "utf8") : "";
  if (current !== next) {
    fs.writeFileSync(seasonScriptPath, next);
    const version = `20260526-auto-${stamp()}`;
    bumpInjector(version);
    fs.writeFileSync(markerPath, `# GitHub Pages build marker season4-auto-${stamp()}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
