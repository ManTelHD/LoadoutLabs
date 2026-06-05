const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "New project 2", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const buildVersion = process.env.SITE_ASSET_VERSION || process.env.COMMIT_REF || process.env.GITHUB_SHA || "";
const versionSuffix = buildVersion.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 40);
const runtimeVersion = versionSuffix || "site-live";
const withVersion = (file, fallbackVersion) => `${file}?v=${versionSuffix || fallbackVersion}`;

const activeScripts = [
  withVersion("script.js", "20260512-official1"),
  withVersion("meta-fast.js", "20260529-fast1"),
  withVersion("mw4.js", "20260529-mw4-clean1"),
  withVersion("mw4-no-tabs.js", "20260601-mw4-notabs1"),
  withVersion("season4.js", "20260529-season4-bundle1"),
  withVersion("site-ui.js", "20260530-active-tabs1"),
  withVersion("loadout-lab-upgrades.js", "20260605-upgrades1"),
  withVersion("subnav-cleanup.js", "20260601-clean-subnav1"),
  withVersion("performance.js", "20260529-perf-grid1"),
];

const scriptNames = [
  ...activeScripts.map((src) => src.split("?")[0]),
  "mw4-compact-tabs.js",
  "performance-design-polish.js",
  "meta-presentation.js",
  "mw4-official-community.js",
  "season4-polish.js",
  "season4-header-fix.js",
  "season4-click-rescue.js",
  "season4-preserve.js",
  "season4-dedupe.js",
  "season4-tab-fix.js",
  "season4-x-keyart.js",
  "meta-card-animations.js",
  "tier-build-fixes.js",
  "tier-extras-fixes.js",
  "loadout-compare.js",
  "absolute-meta-glow.js",
  "premium-accents.js",
  "weapon-image-zoom.js",
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
];

function escapeRegExp(value) {
  return value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

for (const name of scriptNames) {
  html = html.replace(new RegExp(`\s*<script[^>]+src=["'][^"']*${escapeRegExp(name)}[^"']*["'][^>]*><\/script>`, "gi"), "");
}

html = html.replace(/\s*<script>\s*window\.__loadoutLabMetaVersion[\s\S]*?<\/script>/gi, "");

const cachePatch = `    <script>
      window.__loadoutLabMetaVersion = ${JSON.stringify(runtimeVersion)};
      (function () {
        const originalFetch = window.fetch ? window.fetch.bind(window) : null;
        if (!originalFetch) return;
        window.fetch = function (input, init) {
          const requestUrl = typeof input === "string" ? input : input && input.url;
          if (requestUrl && (/data\/wzstats-meta\.json|data\/cod-weapons\.json|loadout-builds\.js/).test(requestUrl)) {
            const nextUrl = new URL(requestUrl, window.location.href);
            nextUrl.searchParams.set("fresh", window.__loadoutLabMetaVersion);
            nextUrl.searchParams.set("t", String(Date.now()));
            return originalFetch(nextUrl.toString(), Object.assign({}, init, { cache: "no-store" }));
          }
          return originalFetch(input, init);
        };
      }());
    </script>`;
const scriptBlock = activeScripts.map((src) => `    <script src="${src}" defer></script>`).join("\n");
html = html.replace(/\s*<\/body>/i, `\n${cachePatch}\n${scriptBlock}\n  </body>`);

fs.writeFileSync(htmlPath, html);
