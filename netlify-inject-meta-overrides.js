const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "New project 2", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const activeScripts = [
  "meta-builds.js?v=20260523-score2",
  "score-cleanup.js?v=20260523-score4",
  "card-toggle-performance.js?v=20260524-toggle-perf2",
  "pickrate-bars.js?v=20260523-pickrate1",
  "mw4-update.js?v=20260527-mw4-prose1",
  "mw4-layout-cleanup.js?v=20260527-mw4-no-hero1",
  "mw4-official-community.js?v=20260528-mw4-live1",
  "mw4-image-override.js?v=20260524-mw4-no-note1",
  "season4-polish.js?v=20260524-season4-stable1",
  "season4-header-fix.js?v=20260527-s4-weapons-lite1",
  "season4-click-rescue.js?v=20260527-s4-no-mode-tabs1",
  "hero-polish.js?v=20260524-header-refine1",
  "header-tabs-cleanup.js?v=20260528-tabs-order1",
  "site-header-polish.js?v=20260528-topbar1",
  "site-interaction-rescue.js?v=20260524-interaction1",
  "script.js?v=20260512-official1",
  "meta-overrides.js?v=20260512-official1",
  "loadout-builds.js?v=20260524-complete-builds3",
  "attachment-levels.js?v=20260524-attachment-levels1",
  "umlaut-polish.js?v=20260524-umlauts6",
  "loadout-details-polish.js?v=20260524-details-lite2",
  "tier-class-polish.js?v=20260524-tier-class1",
  "weapon-image-static.js?v=20260527-static-lite1",
  "german-loadout-polish.js?v=20260525-de2",
];

const scriptNames = [
  ...activeScripts.map((src) => src.split("?")[0]),
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
  html = html.replace(new RegExp(`\\s*<script[^>]+src=["'][^"']*${escapeRegExp(name)}[^"']*["'][^>]*><\\/script>`, "gi"), "");
}

const scriptBlock = activeScripts.map((src) => `    <script src="${src}" defer></script>`).join("\n");
html = html.replace(/\s*<\/body>/i, `\n${scriptBlock}\n  </body>`);

fs.writeFileSync(htmlPath, html);
