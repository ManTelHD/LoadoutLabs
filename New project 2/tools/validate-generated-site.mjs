import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(siteRoot, "..");

const failures = [];
const requiredActiveScripts = [
  "script.js",
  "meta-fast.js",
  "loadout-build-supplements.js",
  "loadout-filter-fix.js",
  "loadout-card-finalizer.js",
  "loadout-image-fix.js",
  "loadout-mobile-details-polish.js",
  "loadout-mobile-filter-close.js",
];

const blockedScripts = [
  "meta-overrides.js",
  "meta-builds.js",
  "score-cleanup.js",
  "tier-build-fixes.js",
  "weapon-image-static.js",
  "loadout-details-polish.js",
];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

async function readSiteFile(relativePath) {
  return readFile(path.join(siteRoot, relativePath), "utf8");
}

async function readRepoFile(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/mk\./g, "mk")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function scriptFile(src) {
  return decodeURIComponent(String(src || "").split("?")[0].replace(/^\.\//, ""));
}

function scriptSources(html) {
  return [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

function extractLiteral(source, name, opener) {
  const needle = `const ${name} = ${opener}`;
  const index = source.indexOf(needle);
  if (index === -1) throw new Error(`Cannot find const ${name}.`);

  const start = source.indexOf(opener, index);
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === opener) depth += 1;
    if (char === closer) {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  throw new Error(`Cannot parse const ${name}.`);
}

function extractObject(source, name, sandbox = {}) {
  return vm.runInNewContext(`(${extractLiteral(source, name, "{")})`, sandbox);
}

function extractArray(source, name) {
  return vm.runInNewContext(`(${extractLiteral(source, name, "[")})`);
}

function extractBuildObject(source, objectName) {
  const sandbox = {};
  for (const name of ["longRangeExtras", "closeRangeExtras", "sniperExtras", "utilityExtras"]) {
    if (source.includes(`const ${name} = [`)) sandbox[name] = extractArray(source, name);
  }
  return extractObject(source, objectName, sandbox);
}

function isBadImageUrl(url) {
  const value = String(url || "");
  return !value ||
    /^data:/i.test(value) ||
    /weapon-placeholder/i.test(value) ||
    /assets\/weapons/i.test(value) ||
    /\.svg(?:$|[?#])/i.test(value) ||
    !/^https:\/\/(imgs\.callofduty\.com|www\.callofduty\.com)\//i.test(value);
}

function isUtilityWeapon(item) {
  return /launcher|melee|special|werfer|nahkampf|spezial/i.test(`${item.weaponClass || ""} ${item.role || ""}`);
}

function finalImageFor(item, knownImages, fixedImages, codWeaponImages) {
  return fixedImages[item.id] ||
    fixedImages[slug(item.name)] ||
    knownImages[item.id] ||
    knownImages[slug(item.name)] ||
    codWeaponImages.get(slug(item.name)) ||
    item.imageUrl ||
    "";
}

function finalBuildFor(item, baseBuilds, supplementalBuilds) {
  return supplementalBuilds[item.id] ||
    supplementalBuilds[slug(item.name)] ||
    baseBuilds[item.id] ||
    baseBuilds[slug(item.name)] ||
    null;
}

function validateMetaList(label, list, context) {
  const items = list?.items || [];
  assert(items.length > 0, `${label}: no items generated.`);

  const roles = { long: 0, close: 0, sniper: 0 };

  items.forEach((item, index) => {
    const expectedPosition = index + 1;
    const name = item.name || item.id || `item ${expectedPosition}`;
    const role = slug(item.role);

    if (role === "long-range") roles.long += 1;
    if (role === "close-range") roles.close += 1;
    if (role === "sniper") roles.sniper += 1;

    assert(item.id, `${label}: ${name} has no id.`);
    assert(item.name, `${label}: ${item.id || expectedPosition} has no name.`);
    assert(item.position === expectedPosition, `${label}: ${name} has position ${item.position}, expected ${expectedPosition}.`);
    assert(String(item.rankLabel || "").includes(`#${expectedPosition}`), `${label}: ${name} rankLabel does not use global #${expectedPosition}.`);

    const score = Number(item.score);
    assert(Number.isFinite(score), `${label}: ${name} has no numeric score.`);
    assert(score >= 0 && score <= 100, `${label}: ${name} score ${score} is outside 0-100.`);
    assert(!/(meta|tier)/i.test(String(item.scoreLabel || "")), `${label}: ${name} scoreLabel still contains tier text (${item.scoreLabel}).`);

    const image = finalImageFor(item, context.knownImages, context.fixedImages, context.codWeaponImages);
    assert(!isBadImageUrl(image), `${label}: ${name} resolves to an invalid/fallback image: ${image || "missing"}`);

    const build = finalBuildFor(item, context.baseBuilds, context.supplementalBuilds);
    assert(build, `${label}: ${name} has no build/attachment entry.`);
    if (build) {
      const attachments = Array.isArray(build.attachments) ? build.attachments : [];
      assert(build.code, `${label}: ${name} build has no code.`);
      assert(Array.isArray(build.extras) && build.extras.length > 0, `${label}: ${name} build has no extras/perks.`);
      assert(attachments.length > 0, `${label}: ${name} build has no attachments.`);
      assert(!attachments.some((line) => /pick-rate|quelle|rolle:/i.test(String(line))), `${label}: ${name} build still contains meta-info lines instead of attachments.`);
      if (!isUtilityWeapon(item)) {
        assert(attachments.length >= 5, `${label}: ${name} has only ${attachments.length} attachment(s).`);
      }
    }
  });

  if (label === "Warzone") {
    assert(roles.long > 0, "Warzone: Long Range filter would show 0 weapons.");
    assert(roles.close > 0, "Warzone: Close Range filter would show 0 weapons.");
    assert(roles.sniper > 0, "Warzone: Sniper filter would show 0 weapons.");
  }
}

function validateScriptSyntax(fileName, source) {
  try {
    new vm.Script(source, { filename: fileName });
  } catch (error) {
    fail(`${fileName}: syntax error: ${error.message}`);
  }
}

const html = await readSiteFile("index.html");
const meta = JSON.parse(await readSiteFile("data/wzstats-meta.json"));
const codWeapons = JSON.parse(await readSiteFile("data/cod-weapons.json"));
const metaFast = await readSiteFile("meta-fast.js");
const imageFix = await readSiteFile("loadout-image-fix.js");
const baseBuildScript = await readSiteFile("loadout-builds.js");
const supplementalBuildScript = await readSiteFile("loadout-build-supplements.js");
const filterFix = await readSiteFile("loadout-filter-fix.js");
const cardFinalizer = await readSiteFile("loadout-card-finalizer.js");
const mobileDetails = await readSiteFile("loadout-mobile-details-polish.js");
const mobileClose = await readSiteFile("loadout-mobile-filter-close.js");
const injector = await readRepoFile("netlify-inject-meta-overrides.js");

const activeScripts = scriptSources(html).map(scriptFile).filter((src) => src.endsWith(".js"));
const activeScriptSet = new Set(activeScripts);

assert(/window\.__loadoutLabMetaVersion/.test(html), "index.html is missing the runtime cache-bust version patch.");
assert(/data\/wzstats-meta\.json/.test(html), "index.html is missing the data cache refresh hook.");
assert(/id=["']loadoutGrid["']/.test(html), "index.html is missing #loadoutGrid.");
assert(/id=["']filterToolbar["']/.test(html), "index.html is missing #filterToolbar.");
assert(/id=["']resultCount["']/.test(html), "index.html is missing #resultCount.");

for (const file of requiredActiveScripts) {
  assert(activeScriptSet.has(file), `index.html is missing active script ${file}.`);
  assert(injector.includes(`"${file}"`), `netlify-inject-meta-overrides.js does not inject ${file}.`);
}

for (const file of blockedScripts) {
  assert(!activeScriptSet.has(file), `index.html still loads old/blocked script ${file}.`);
}

for (const file of activeScripts) {
  try {
    validateScriptSyntax(file, await readSiteFile(file));
  } catch (error) {
    fail(`${file}: cannot read active script (${error.message}).`);
  }
}

for (const [file, source, checks] of [
  ["meta-fast.js", metaFast, ["expand-button", "card-details", "premium-attachment-list", "premium-perk-list", "loadout-builds.js"]],
  ["loadout-filter-fix.js", filterFix, ["data-smart-filter", "__loadoutFilterFixApply", "long", "close", "sniper"]],
  ["loadout-card-finalizer.js", cardFinalizer, ["setExpanded", "expand-button", "aria-expanded"]],
  ["loadout-mobile-details-polish.js", mobileDetails, ["mobile-filter-toggle", "details-polished-panel", "detail-source-row"]],
  ["loadout-mobile-filter-close.js", mobileClose, ["display", "grid", "none", "setProperty"]],
  ["loadout-build-supplements.js", supplementalBuildScript, ["supplementalBuilds", "cbrs-3", "krs-762", "krs-7-62", "grimhawk", "premium-attachment-list", "premium-perk-list", "build-code-box"]],
]) {
  for (const needle of checks) {
    assert(source.includes(needle), `${file} is missing expected UI/build marker ${needle}.`);
  }
}

const knownImages = extractObject(metaFast, "knownImages");
const fixedImages = extractObject(imageFix, "fixedImages");
const baseBuilds = extractBuildObject(baseBuildScript, "builds");
const supplementalBuilds = extractBuildObject(supplementalBuildScript, "supplementalBuilds");
const codWeaponImages = new Map((codWeapons.weapons || [])
  .filter((weapon) => weapon.name && weapon.imageUrl)
  .map((weapon) => [slug(weapon.name), weapon.imageUrl]));

assert(meta.generatedAt, "wzstats-meta.json is missing generatedAt.");
assert(meta.generatedAtLabel, "wzstats-meta.json is missing generatedAtLabel.");
assert((codWeapons.weapons || []).length > 0, "cod-weapons.json has no weapons.");

const context = { knownImages, fixedImages, baseBuilds, supplementalBuilds, codWeaponImages };
validateMetaList("Warzone", meta.warzoneRanked, context);
if (meta.bo7Ranked?.items?.length) validateMetaList("BO7", meta.bo7Ranked, context);

if (failures.length) {
  console.error("Generated site validation failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  const warzoneCount = meta.warzoneRanked.items.length;
  const bo7Count = meta.bo7Ranked?.items?.length || 0;
  console.log(`Generated site validation passed: ${warzoneCount} Warzone weapons, ${bo7Count} BO7 weapons, ${activeScripts.length} active scripts.`);
}
