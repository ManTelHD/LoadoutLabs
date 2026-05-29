const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "New project 2", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const activeScripts = [
  "script.js?v=20260512-official1",
  "render-lite.js?v=20260529-lite1",
  "card-toggle-performance.js?v=20260528-instant1",
  "meta-fast.js?v=20260529-fast1",
  "mw4-official-community.js?v=20260529-mw4-official1",
  "season4-polish.js?v=20260524-season4-stable1",
  "season4-header-fix.js?v=20260527-s4-weapons-lite1",
  "season4-click-rescue.js?v=20260527-s4-no-mode-tabs1",
  "hero-polish.js?v=20260524-header-refine1",
  "header-tabs-cleanup.js?v=20260528-tabs-order1",
  "site-header-polish.js?v=20260528-topbar1",
  "site-interaction-rescue.js?v=20260524-interaction1",
  "performance-design-polish.js?v=20260528-smooth1",
];

const scriptNames = [
  ...activeScripts.map((src) => src.split("?")[0]),
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
