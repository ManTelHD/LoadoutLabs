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

function bumpInjector(version) {
  let content = fs.readFileSync(injectorPath, "utf8");
  content = content.replace(/season4-click-rescue\.js\?v=[^"]+/g, `season4-click-rescue.js?v=${version}`);
  fs.writeFileSync(injectorPath, content);
}

async function main() {
  const [seasonHub, blog, gamespot, youtube] = await Promise.all(sources.map(fetchText));
  const combined = [seasonHub, blog, gamespot, youtube].join("\n");
  const officialHubLive = /Season\s*04|Season\s*4/i.test(seasonHub || "") && !/Season\s*03\s*Reloaded/i.test(seasonHub || "");
  const trailerFound = /Official Season 4 Story Cinematic Trailer|Story Cinematic Trailer|Karma|Dorne|Guild-killing virus/i.test(combined);

  if (!officialHubLive) {
    console.log(trailerFound ? "Trailer detected; official Season 04 hub still pending. Keeping current embedded trailer page." : "No official Season 04 hub detected yet.");
    return;
  }

  let script = fs.readFileSync(seasonScriptPath, "utf8");
  const checkedAt = germanDate();
  let changed = false;

  if (!script.includes("offizieller Season-04-Hub ist live")) {
    script = script.replace(
      /updateSummary:\s*"[^"]*"/,
      `updateSummary: "Der offizielle Season-04-Hub ist live. Roadmap, Waffen, Maps, Events und Warzone-Details müssen jetzt aus dem offiziellen Hub übernommen und gegen bisherige Gerüchte priorisiert werden."`
    );
    script = script.replace(/\["Blogpost",\s*"[^"]*"\]/, `["Blogpost", "offizieller Hub live"]`);
    script = script.replace(/\["Status",\s*"[^"]*"\]/, `["Status", "offiziell + Roadmap"]`);
    changed = true;
  }

  const currentStand = script.match(/updateTime:\s*"Stand: [^"]*"/);
  const nextStand = `updateTime: "Stand: ${checkedAt}"`;
  if (!currentStand || currentStand[0] !== nextStand) {
    script = script.replace(/updateTime:\s*"Stand: [^"]*"/, nextStand);
    changed = true;
  }

  if (!changed) {
    console.log("Official hub already reflected. No changes.");
    return;
  }

  fs.writeFileSync(seasonScriptPath, script);
  const version = `20260526-auto-${stamp()}`;
  bumpInjector(version);
  fs.writeFileSync(markerPath, `# GitHub Pages build marker season4-auto-${stamp()}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
