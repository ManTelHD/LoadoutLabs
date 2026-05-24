const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(__dirname, "New project 2");
const indexPath = path.join(siteDir, "index.html");

const styleMarker = '<link rel="stylesheet" href="meta-overrides.css?v=20260512-official1">';
const season4Button = '          <button class="mode-button season-mode-button season4-mode-button" data-mode="season4-info" type="button">Season 4</button>';

const retiredScripts = [
  "season4-preserve",
  "season4-dedupe",
  "season4-tab-fix",
  "meta-card-animations",
];

const activeScripts = [
  "meta-builds.js?v=20260523-score2",
  "score-cleanup.js?v=20260523-score4",
  "card-toggle-performance.js?v=20260524-toggle-perf1",
  "pickrate-bars.js?v=20260523-pickrate1",
  "weapon-image-zoom.js?v=20260524-weapon-zoom-image-only1",
  "mw4-update.js?v=20260523-mw4-keyart",
  "mw4-image-override.js?v=20260524-mw4-no-note1",
  "season4-polish.js?v=20260524-season4-stable1",
  "season4-click-rescue.js?v=20260524-season4-image1",
  "absolute-meta-glow.js?v=20260524-premium-polish1",
  "hero-polish.js?v=20260524-header-refine1",
  "premium-accents.js?v=20260524-premium-accents1",
  "site-interaction-rescue.js?v=20260524-interaction1",
  "script.js?v=20260512-official1",
  "meta-overrides.js?v=20260512-official1",
  "attachment-levels.js?v=20260524-attachment-levels1",
  "umlaut-polish.js?v=20260524-umlauts2",
];

const activeScriptNames = activeScripts.map((src) => src.split("?")[0].replace(/\.js$/, ""));
const controlledScripts = [...new Set([...activeScriptNames, ...retiredScripts])];

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/\n\s*<link rel="stylesheet" href="meta-overrides\.css(?:\?v=[^"]+)?">/g, "");
html = html.replace("</head>", `    ${styleMarker}\n  </head>`);

for (const name of controlledScripts) {
  const pattern = new RegExp(`\\n\\s*<script src="${name}\\.js(?:\\?v=[^"]+)?"><\\/script>`, "g");
  html = html.replace(pattern, "");
}

html = html.replace(/\n\s*<button class="[^"]*season[^>]*>.*?Season 4.*?<\/button>/gis, "");
html = html.replace(
  /(<button class="mode-button mw4-mode-button" data-mode="mw4-info" type="button">.*?<\/button>)/s,
  `$1\n${season4Button}`,
);

const scriptBlock = activeScripts.map((src) => `    <script src="${src}"></script>`).join("\n");
html = html.replace(/\n\s*<\/body>/, `\n${scriptBlock}\n  </body>`);

fs.writeFileSync(indexPath, html);
