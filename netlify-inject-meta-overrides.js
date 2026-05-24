const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(__dirname, "New project 2");
const indexPath = path.join(siteDir, "index.html");
const styleMarker = '<link rel="stylesheet" href="meta-overrides.css">';
const scriptMarker = '<script src="meta-overrides.js"></script>';
const animationScriptMarker = '<script src="meta-card-animations.js?v=20260523-card-clean1"></script>';
const pickrateScriptMarker = '<script src="pickrate-bars.js?v=20260523-pickrate1"></script>';
const weaponZoomScriptMarker = '<script src="weapon-image-zoom.js?v=20260524-weapon-text-offset1"></script>';
const mw4ScriptMarker = '<script src="mw4-update.js?v=20260523-mw4-keyart"></script>';
const mw4ImageScriptMarker = '<script src="mw4-image-override.js?v=20260524-ghostofhope1"></script>';

let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes(styleMarker)) {
  html = html.replace("</head>", `    ${styleMarker}\n  </head>`);
}
if (!html.includes(scriptMarker)) {
  html = html.replace(
    '    <script src="script.js"></script>',
    `    <script src="script.js"></script>\n    ${scriptMarker}`,
  );
}
html = html.replace(/<script src="meta-card-animations\.js\?v=[^"]+"><\/script>/g, animationScriptMarker);
if (!html.includes(animationScriptMarker)) {
  html = html.replace(/(<script src="meta-overrides\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${animationScriptMarker}`);
}
html = html.replace(/<script src="pickrate-bars\.js\?v=[^"]+"><\/script>/g, pickrateScriptMarker);
if (!html.includes(pickrateScriptMarker)) {
  html = html.replace(/(<script src="meta-card-animations\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${pickrateScriptMarker}`);
}
html = html.replace(/<script src="weapon-image-zoom\.js\?v=[^"]+"><\/script>/g, weaponZoomScriptMarker);
if (!html.includes(weaponZoomScriptMarker)) {
  html = html.replace(/(<script src="pickrate-bars\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${weaponZoomScriptMarker}`);
}
html = html.replace(/<script src="mw4-update\.js\?v=[^"]+"><\/script>/g, mw4ScriptMarker);
if (!html.includes(mw4ScriptMarker)) {
  html = html.replace("</body>", `    ${mw4ScriptMarker}\n  </body>`);
}
html = html.replace(/<script src="mw4-image-override\.js\?v=[^"]+"><\/script>/g, mw4ImageScriptMarker);
if (!html.includes(mw4ImageScriptMarker)) {
  html = html.replace(/(<script src="mw4-update\.js(?:\?v=[^"]+)?"><\/script>)/, `$1\n    ${mw4ImageScriptMarker}`);
}
fs.writeFileSync(indexPath, html);
