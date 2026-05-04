const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(__dirname, "New project 2");
const indexPath = path.join(siteDir, "index.html");
const marker = '<link rel="stylesheet" href="meta-overrides.css">';

let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes(marker)) {
  html = html.replace("</head>", `    ${marker}\n  </head>`);
  fs.writeFileSync(indexPath, html);
}
