const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "New project 2", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const activeScripts = [
  "script.js?v=20260512-official1",
  "meta-fast.js?v=20260529-fast1",
  "mw4.js?v=20260529-mw4-clean1",
  "season4.js?v=20260529-season4-bundle1",
  "site-ui.js?v=20260529-ui1",
  "performance.js?v=20260529-perf-grid1",
];

const scriptNames = [
  ...activeScripts.map((src) => src.split("?")[0]),
  "performance-design-polish.js",
  "meta-presentation.js",
  "mw4-official-community.js",
  "season4-polish.js",
  "season4-header-fix.js",
  "season4-click-rescue.js",
  "hero-polish.js",
  "header-tabs-cleanup.js",
  "site-header-polish.js",
  "site-interaction-rescue.js",
  "render-lite.js",
  "card-toggle-performance.js",
  "meta-color-fix.js",
  "meta-builds.js",
  "score-cleanup.js",
  "pickrate-bars.js",
  "mw4-update.js",
  "mw4-layout-cleanup.js",
  "mw4-image-override.js",
  "meta-overrides.js",
  "loadout-builds.js",
  "umlaut-polish.js",
  "loadout-details-polish.js",
  "tier-class-polish.js",
  "weapon-image-static.js",
  "german-loadout-polish.js",
  "extra-names-polish.js",
  "attachment-levels.js",
  "season4-preserve",
  "season4-dedupe",
  "season4-tab-fix",
  "season4-x-keyart",
  "meta-card-animations",
  "tier-build-fixes",
  "tier-extras-fixes",
  "loadout-compare",
  "absolute-meta-glow",
  "premium-accents",
  "weapon-image-zoom",
];

function escapeRegExp(value) {
  return value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

for (const name of scriptNames) {
  html = html.replace(new RegExp(`\s*<script[^>]+src=["'][^"']*${escapeRegExp(name)}[^"']*["'][^>]*><\/script>`, "gi"), "");
}

const scriptBlock = activeScripts.map((src) => `    <script src="${src}" defer></script>`).join("\n");
html = html.replace(/\s*<\/body>/i, `\n${scriptBlock}\n  </body>`);

fs.writeFileSync(htmlPath, html);
