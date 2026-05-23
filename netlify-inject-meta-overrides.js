const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(__dirname, "New project 2");
const indexPath = path.join(siteDir, "index.html");
const styleMarker = '<link rel="stylesheet" href="meta-overrides.css">';
const scriptMarker = '<script src="meta-overrides.js"></script>';
const mw4ScriptMarker = '<script src="mw4-update.js?v=20260523-mw4"></script>';

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
if (!html.includes(mw4ScriptMarker)) {
  html = html.replace("</body>", `    ${mw4ScriptMarker}\n  </body>`);
}
fs.writeFileSync(indexPath, html);
