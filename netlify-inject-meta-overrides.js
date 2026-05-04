const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(__dirname, "New project 2");
const indexPath = path.join(siteDir, "index.html");
const styleMarker = '<link rel="stylesheet" href="meta-overrides.css">';
const scriptMarker = '<script src="meta-overrides.js"></script>';

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
fs.writeFileSync(indexPath, html);
