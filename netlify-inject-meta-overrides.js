const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(__dirname, "New project 2");
const indexPath = path.join(siteDir, "index.html");
const styleMarker = '<link rel="stylesheet" href="meta-overrides.css">';
const scriptMarker = '<script src="meta-overrides.js"></script>';
const absoluteMetaGlowScriptMarker = '<script src="absolute-meta-glow.js?v=20260524-premium-polish1"></script>';
const heroPolishScriptMarker = '<script src="hero-polish.js?v=20260524-header-refine1"></script>';
const premiumAccentsScriptMarker = '<script src="premium-accents.js?v=20260524-premium-accents1"></script>';
const umlautPolishScriptMarker = '<script src="umlaut-polish.js?v=20260524-umlauts1"></script>';
const attachmentLevelsScriptMarker = '<script src="attachment-levels.js?v=20260524-attachment-levels1"></script>';
const animationScriptMarker = '<script src="meta-card-animations.js?v=20260523-card-clean1"></script>';
const pickrateScriptMarker = '<script src="pickrate-bars.js?v=20260523-pickrate1"></script>';
const weaponZoomScriptMarker = '<script src="weapon-image-zoom.js?v=20260524-weapon-zoom-smooth1"></script>';
const mw4ScriptMarker = '<script src="mw4-update.js?v=20260523-mw4-keyart"></script>';
const mw4ImageScriptMarker = '<script src="mw4-image-override.js?v=20260524-mw4-no-note1"></script>';
const season4ScriptMarker = '<script src="season4-polish.js?v=20260524-season4-stable1"></script>';
const season4ClickRescueScriptMarker = '<script src="season4-click-rescue.js?v=20260524-season4-image1"></script>';
const siteInteractionRescueScriptMarker = '<script src="site-interaction-rescue.js?v=20260524-interaction1"></script>';
const season4Button = '          <button class="mode-button season-mode-button season4-mode-button" data-mode="season4-info" type="button">Season 4</button>';

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/\n\s*<script src="season4-preserve\.js\?v=[^"]+"><\/script>/g, "");
html = html.replace(/\n\s*<script src="season4-dedupe\.js\?v=[^"]+"><\/script>/g, "");
html = html.replace(/\n\s*<script src="season4-tab-fix\.js\?v=[^"]+"><\/script>/g, "");

html = html.replace(/<script src="absolute-meta-glow\.js\?v=[^"]+"><\/script>/g, absoluteMetaGlowScriptMarker);
html = html.replace(/<script src="hero-polish\.js\?v=[^"]+"><\/script>/g, heroPolishScriptMarker);
html = html.replace(/<script src="premium-accents\.js\?v=[^"]+"><\/script>/g, premiumAccentsScriptMarker);
html = html.replace(/<script src="umlaut-polish\.js\?v=[^"]+"><\/script>/g, umlautPolishScriptMarker);
html = html.replace(/<script src="attachment-levels\.js\?v=[^"]+"><\/script>/g, attachmentLevelsScriptMarker);
html = html.replace(/<script src="season4-polish\.js\?v=[^"]+"><\/script>/g, season4ScriptMarker);
html = html.replace(/<script src="season4-click-rescue\.js\?v=[^"]+"><\/script>/g, season4ClickRescueScriptMarker);
html = html.replace(/<script src="site-interaction-rescue\.js\?v=[^"]+"><\/script>/g, siteInteractionRescueScriptMarker);
html = html.replace(/<script src="meta-card-animations\.js\?v=[^"]+"><\/script>/g, animationScriptMarker);
html = html.replace(/<script src="pickrate-bars\.js\?v=[^"]+"><\/script>/g, pickrateScriptMarker);
html = html.replace(/<script src="weapon-image-zoom\.js\?v=[^"]+"><\/script>/g, weaponZoomScriptMarker);
html = html.replace(/<script src="mw4-update\.js\?v=[^"]+"><\/script>/g, mw4ScriptMarker);
html = html.replace(/<script src="mw4-image-override\.js\?v=[^"]+"><\/script>/g, mw4ImageScriptMarker);

if (!html.includes(styleMarker)) {
  html = html.replace("</head>", `    ${styleMarker}\n  </head>`);
}
if (!html.includes(scriptMarker)) {
  html = html.replace(
    '    <script src="script.js"></script>',
    `    <script src="script.js"></script>\n    ${scriptMarker}`,
  );
}
if (!html.includes(absoluteMetaGlowScriptMarker)) {
  html = html.replace(/(<script src="meta-overrides\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${absoluteMetaGlowScriptMarker}`);
}
if (!html.includes(heroPolishScriptMarker)) {
  html = html.replace(/(<script src="absolute-meta-glow\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${heroPolishScriptMarker}`);
}
if (!html.includes(premiumAccentsScriptMarker)) {
  html = html.replace(/(<script src="hero-polish\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${premiumAccentsScriptMarker}`);
}
if (!html.includes(animationScriptMarker)) {
  html = html.replace(/(<script src="premium-accents\.js(?:\?v=[^"]+)?"><\/script>|<script src="hero-polish\.js(?:\?v=[^"]+)?"><\/script>|<script src="absolute-meta-glow\.js(?:\?v=[^"]+)?"><\/script>|<script src="meta-overrides\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${animationScriptMarker}`);
}
if (!html.includes(pickrateScriptMarker)) {
  html = html.replace(/(<script src="meta-card-animations\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${pickrateScriptMarker}`);
}
if (!html.includes(weaponZoomScriptMarker)) {
  html = html.replace(/(<script src="pickrate-bars\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${weaponZoomScriptMarker}`);
}
if (!html.includes(mw4ScriptMarker)) {
  html = html.replace("</body>", `    ${mw4ScriptMarker}\n  </body>`);
}
if (!html.includes(mw4ImageScriptMarker)) {
  html = html.replace(/(<script src="mw4-update\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${mw4ImageScriptMarker}`);
}
if (!html.includes(season4ScriptMarker)) {
  html = html.replace(/(<script src="mw4-image-override\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${season4ScriptMarker}`);
}
if (!html.includes(season4ClickRescueScriptMarker)) {
  html = html.replace(/(<script src="script\.js(?:\?v=[^"]+)?"><\/script>)/, `${season4ClickRescueScriptMarker}\n    $1`);
}
if (!html.includes(siteInteractionRescueScriptMarker)) {
  html = html.replace(/(<script src="meta-overrides\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${siteInteractionRescueScriptMarker}`);
}
if (!html.includes(umlautPolishScriptMarker)) {
  html = html.replace(/(<script src="meta-overrides\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${umlautPolishScriptMarker}`);
}
if (!html.includes(attachmentLevelsScriptMarker)) {
  html = html.replace(/(<script src="umlaut-polish\.js(?:\?v=[^"]+)?"><\/script>|<script src="meta-overrides\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${attachmentLevelsScriptMarker}`);
}

html = html.replace(/\n\s*<button class="[^"]*season[^>]*>.*?Season 4.*?<\/button>/gis, "");
html = html.replace(
  /(<button class="mode-button mw4-mode-button" data-mode="mw4-info" type="button">.*?<\/button>)/s,
  `$1\n${season4Button}`,
);

fs.writeFileSync(indexPath, html);
