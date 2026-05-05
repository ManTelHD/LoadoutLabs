import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const dataDir = path.join(siteRoot, "data");
const indexPath = path.join(siteRoot, "index.html");

const urls = {
  patchnotes: "https://www.callofduty.com/patchnotes",
  codWeapons: "https://www.callofduty.com/guides/blackops7/weapons",
  wzstatsMeta: "https://app.wzstats.gg/wz2/weapons/meta",
  tridzoVideos: "https://www.youtube.com/@Tridzoid/videos",
  callOfDutyX: "https://x.com/CallofDuty",
  infinityWardX: "https://x.com/InfinityWard",
};

const months = { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 };

function decodeHtml(value = "") {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/\s+/g, " ").trim();
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function escapeHtml(value = "") {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function parseDate(text = "") {
  const match = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})\b/i);
  if (!match) return null;
  return new Date(Date.UTC(Number(match[3]), months[match[1].toLowerCase()], Number(match[2]), 12, 0, 0));
}

function formatDate(date) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" }).format(date);
}

function formatShortDate(dateText) {
  const date = new Date(`${dateText}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateText;
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Berlin" }).format(date);
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin", timeZoneName: "short" }).format(date);
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { accept: "text/html,application/xhtml+xml,application/json", "user-agent": "Mozilla/5.0 LoadoutLabAutoUpdater/1.0" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url));
}

function absoluteUrl(value, baseUrl) {
  try { return new URL(value, baseUrl).toString().split("?")[0]; } catch { return value; }
}

function extractMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtml(match[1]);
  }
  return "";
}

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  const title = extractMeta(html, "og:title") || stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  return title.replace(/\s*\|\s*Call of Duty.*$/i, "") || "Call of Duty Update";
}

function extractSummary(html, title) {
  const description = extractMeta(html, "description") || extractMeta(html, "og:description");
  if (description && !/official call of duty/i.test(description)) return description;
  const paragraph = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => stripTags(match[1])).find((text) => text.length > 80 && !/cookie|privacy|legal/i.test(text));
  return paragraph || `${title} wurde auf der offiziellen Call-of-Duty-Seite gefunden.`;
}

function categoryFromTitle(title) {
  if (/warzone|wz/i.test(title)) return "warzone";
  if (/zombie/i.test(title)) return "zombies";
  if (/endgame/i.test(title)) return "endgame";
  return "multiplayer";
}

function extractPatchLinks(html) {
  const links = [...html.matchAll(/<a[^>]+href=["']([^"']*\/patchnotes\/20\d{2}\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ url: absoluteUrl(decodeHtml(match[1]), urls.patchnotes), text: stripTags(match[2]) }))
    .filter((link) => /callofduty\.com\/patchnotes\//.test(link.url));
  return [...new Map(links.map((link) => [link.url, link])).values()].slice(0, 12);
}

async function buildPatchCard(link) {
  const html = await fetchText(link.url);
  const title = extractTitle(html) || link.text;
  const parsedDate = parseDate(stripTags(html)) || new Date();
  const summary = extractSummary(html, title);
  return { title, category: categoryFromTitle(title), status: "Offiziell", source: "Call of Duty", date: parsedDate.toISOString().slice(0, 10), dateLabel: formatDate(parsedDate), url: link.url, imageUrl: extractMeta(html, "og:image"), summary: summary.length > 260 ? `${summary.slice(0, 257).trim()}...` : summary };
}

function buildHighlights(updates, generatedAtLabel) {
  const [first, second, third] = updates;
  return [
    { label: "Aktuell", title: first?.title || "Offizielle Patchnotes", text: first ? `${first.dateLabel}: ${first.summary}` : "Noch keine offiziellen Patchnotes gefunden." },
    { label: "Geprueft", title: "Automatisch aktualisiert", text: `Offizielle Quellen wurden am ${generatedAtLabel} geprueft.` },
    { label: "Weitere Updates", title: second?.title || third?.title || "Patchnotes beobachten", text: second ? `${second.dateLabel}: ${second.summary}` : "GitHub Actions sucht regelmaessig nach neuen Call-of-Duty-Meldungen." },
  ];
}

function renderHighlights(highlights) {
  return highlights.slice(0, 3).map((item) => `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("\n            ");
}

function renderUpdateBoard(updates) {
  return updates.map((item, index) => {
    const image = item.imageUrl ? `\n                <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy">` : "";
    const status = index === 0 ? "Offiziell - neu" : "Offiziell";
    return `<a class="update-card official" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${image}\n              <div class="update-card-content">\n                <span class="status-pill">${status}</span>\n                <time datetime="${escapeHtml(item.date)}">${escapeHtml(item.dateLabel)}</time>\n                <h3>${escapeHtml(item.title)}</h3>\n                <div class="update-detail">\n                  <p>${escapeHtml(item.summary)}</p>\n                  <strong>Offizielle Quelle oeffnen</strong>\n                </div>\n              </div>\n            </a>`;
  }).join("\n            ");
}

function renderTimeline(updates) {
  return updates.slice(0, 4).map((item) => `<article>\n            <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatShortDate(item.date))}</time>\n            <h3>${escapeHtml(item.title)}</h3>\n            <p>${escapeHtml(item.summary)}</p>\n          </article>`).join("\n          ");
}

function updateIndex(html, data) {
  let next = html;
  next = next.replace(/<p class="updated-note">[\s\S]*?<\/p>/, `<p class="updated-note">Aktualisiert: ${escapeHtml(data.generatedAtLabel)}</p>`);
  next = next.replace(/(<div class="updates-hero">[\s\S]*?<\/div>\s*)<span>[\s\S]*?<\/span>/, `$1<span>Stand: ${escapeHtml(data.generatedAtLabel)}</span>`);
  next = next.replace(/<div class="update-priority-grid" aria-label="Schnelle Update Übersicht">[\s\S]*?<\/div>\s*<div class="mode-info-tabs update-mode-tabs"/, `<div class="update-priority-grid" aria-label="Schnelle Update Übersicht">\n            ${renderHighlights(data.highlights)}\n          </div>\n          <div class="mode-info-tabs update-mode-tabs"`);
  next = next.replace(/<div class="update-board">[\s\S]*?<\/div>\s*<div class="official-note">/, `<div class="update-board">\n            ${renderUpdateBoard(data.updates)}\n          </div>\n          <div class="official-note">`);
  next = next.replace(/<div class="timeline">[\s\S]*?<\/div>\s*<\/section>/, `<div class="timeline">\n          ${renderTimeline(data.updates)}\n        </div>\n      </section>`);
  return next;
}

function titleCase(value = "") {
  return value.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function weaponImageUrl(weapon) {
  return `https://wzstats.gg/assets/images/weapon-placeholder.png#${encodeURIComponent(weapon.id)}`;
}

function roleFromWeapon(weapon) {
  if (["SMG", "PISTOL", "SHOTGUN"].includes(weapon.type)) return "Close Range";
  if (["SNIPER_RIFLE", "MARKSMAN_RIFLE"].includes(weapon.type)) return "Sniper";
  if (["LMG", "ASSAULT_RIFLE", "BATTLE_RIFLE"].includes(weapon.type)) return "Long Range";
  return titleCase(weapon.type || "Meta");
}

function buildWzstatsList({ title, key, tierList, weaponsById, updatedAt }) {
  const items = [];
  for (const tier of ["META", "A", "B", "C", "D"]) {
    for (const [index, id] of (tierList?.[tier] || []).entries()) {
      const weapon = weaponsById.get(id) || { id, name: id, type: "WEAPON" };
      const pickRate = Number.isFinite(Number(weapon.pickRate)) ? Number(weapon.pickRate) : null;
      const role = roleFromWeapon(weapon);
      items.push({
        id,
        name: weapon.name || id,
        weaponClass: titleCase(weapon.displayType || weapon.type || "Weapon"),
        role,
        tier,
        tierLabel: tier === "META" ? "Meta" : `${tier}-Tier`,
        position: index + 1,
        rankLabel: `${tier} #${index + 1}`,
        scoreLabel: tier === "META" ? "Meta" : `${tier}-Tier`,
        pickRate,
        pickRateLabel: pickRate == null ? "" : `${pickRate.toFixed(1)}%`,
        imageUrl: weaponImageUrl(weapon),
        sourceUpdatedAt: updatedAt,
        sourceUpdatedLabel: updatedAt ? formatDate(new Date(updatedAt)) : "WZStats",
        description: `${weapon.name || id} wird von WZStats in ${title} als ${tier === "META" ? "Meta" : `${tier}-Tier`} gefuehrt.`,
        attachments: pickRate == null ? ["Pick-Rate: kein oeffentlicher WZStats-Wert verfuegbar", "Quelle: WZStats Tierlist", `Rolle: ${role}`] : [`Pick-Rate: ${pickRate.toFixed(1)}% laut WZStats`, "Quelle: WZStats Tierlist", `Rolle: ${role}`],
      });
    }
  }
  return { key, title, source: "WZStats", sourceUrl: urls.wzstatsMeta, sourceUpdatedAt: updatedAt, sourceNote: "Tierlist und Raenge stammen ausschliesslich aus WZStats. Pick-Rates werden nur angezeigt, wenn WZStats einen oeffentlichen Wert liefert.", hasPickRates: items.some((item) => item.pickRate != null), items };
}

async function buildWzstatsMeta(generatedAt, generatedAtLabel) {
  const data = await fetchJson(urls.wzstatsMeta);
  const weaponsById = new Map((data.weapons || []).map((weapon) => [weapon.id, weapon]));
  const updatedAt = data.wzStatsTierList?.updatedAt || generatedAt.toISOString();
  return { schemaVersion: 1, generatedAt: generatedAt.toISOString(), generatedAtLabel, source: "WZStats", sourceUrl: "https://wzstats.gg/", publicEndpoint: urls.wzstatsMeta, pickRatePolicy: "Pick-Rates are only shown when WZStats exposes a current public value. No estimates are generated.", warzoneRanked: buildWzstatsList({ title: "Warzone Ranked / Ranked Resurgence Meta", key: "rankedResurgence", tierList: data.wzStatsTierList?.rankedResurgence, weaponsById, updatedAt }), bo7Ranked: buildWzstatsList({ title: "Black Ops 7 Ranked Meta", key: "bo7Ranked", tierList: data.wzStatsTierList?.bo7Ranked, weaponsById, updatedAt }) };
}

async function buildCodWeapons(generatedAt, generatedAtLabel) {
  const html = await fetchText(urls.codWeapons);
  const blocks = html.split('<div class="cod-guide-grid-item-component guide-grid-item-container').slice(1);
  const weapons = blocks.map((block) => {
    const href = block.match(/<a href="([^"]+)"/i)?.[1];
    const image = block.match(/<img src="([^"]+)" alt="([^"]*)"\s*\/?>(?:\s*)/i);
    const eyebrow = block.match(/<div class="cod-guide-grid-item-component__text-eyebrow">\s*([\s\S]*?)<\/div>/i)?.[1];
    const title = block.match(/<div class="cod-guide-grid-item-component__text-title">\s*([\s\S]*?)\s*<\/div>/i)?.[1];
    if (!href || !title) return null;
    return { url: absoluteUrl(href, urls.codWeapons), imageUrl: image ? absoluteUrl(image[1], urls.codWeapons) : "", imageAlt: image ? decodeHtml(image[2]) : "", weaponClass: stripTags(eyebrow || "").replace(/\s+(new|s\d+)\b.*$/i, "").trim(), name: stripTags(title) };
  }).filter(Boolean);
  return { schemaVersion: 1, generatedAt: generatedAt.toISOString(), generatedAtLabel, source: "Call of Duty Guides", sourceUrl: urls.codWeapons, weapons: [...new Map(weapons.map((weapon) => [`${weapon.weaponClass}:${weapon.name}`, weapon])).values()] };
}

function extractYouTubeVideos(html) {
  const videos = [];
  const matches = [...html.matchAll(/"videoId":"([^"]+)".{0,600}?"title":\{"runs":\[\{"text":"([^"]+)"/g)];
  for (const match of matches) {
    if (!videos.some((video) => video.id === match[1])) videos.push({ id: match[1], title: decodeHtml(match[2]), url: `https://www.youtube.com/watch?v=${match[1]}`, transcriptStatus: "not-available-without-youtube-caption-access" });
    if (videos.length >= 5) break;
  }
  return videos;
}

async function buildMw4Watch(generatedAt, generatedAtLabel) {
  let videos = [];
  try { videos = extractYouTubeVideos(await fetchText(urls.tridzoVideos)); }
  catch (error) { videos = [{ title: "Tridzo videos konnten nicht automatisch gelesen werden.", url: urls.tridzoVideos, transcriptStatus: error.message }]; }
  return {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    officialSources: [{ name: "Call of Duty on X", url: urls.callOfDutyX, status: "configured" }, { name: "Infinity Ward on X", url: urls.infinityWardX, status: "configured" }],
    transcriptSources: [{ name: "Tridzo YouTube", url: urls.tridzoVideos, status: "latest-videos-detected", videos }],
    officialSummary: "MW4 bleibt nur offiziell, wenn Call of Duty oder Infinity Ward es bestaetigt. X-Posts sind als offizielle Quellen konfiguriert; ohne X-API werden keine Posts erfunden.",
    cards: [["Offiziell", "COD / Infinity Ward", "Nur Posts von Call of Duty oder Infinity Ward zaehlen als Bestaetigung."], ["Geruecht", "Tridzo Transkripte", videos[0] ? `Neuester gefundener Tridzo-Kontext: ${videos[0].title}` : "Keine aktuellen Videos gefunden."], ["Regel", "Strikte Trennung", "Tridzo bleibt Geruecht/Kontext, ausser das Video zitiert eine offizielle Quelle."]].map(([label, title, text]) => ({ label, title, text })),
    tips: ["Call of Duty und Infinity Ward auf X sind offizielle Quellen.", "Tridzo-Transkripte werden nur als Geruechte- und Kontextquelle verwendet.", "Ohne offiziellen COD-/Infinity-Ward-Post wird MW4 nicht als bestaetigt angezeigt.", "Wenn X API-Zugang ergaenzt wird, kann der Watcher echte Posts statt nur Quellenstatus pruefen."],
  };
}

async function buildPatchUpdates(generatedAt, generatedAtLabel) {
  const html = await fetchText(urls.patchnotes);
  const updates = [];
  for (const link of extractPatchLinks(html)) {
    try { updates.push(await buildPatchCard(link)); }
    catch (error) { console.warn(`Skipping ${link.url}: ${error.message}`); }
  }
  updates.sort((a, b) => b.date.localeCompare(a.date));
  return { schemaVersion: 1, generatedAt: generatedAt.toISOString(), generatedAtLabel, sources: [{ id: "cod-patchnotes", label: "Call of Duty Patch Notes", url: urls.patchnotes }], highlights: buildHighlights(updates, generatedAtLabel), updates: updates.slice(0, 8) };
}

async function writeJson(name, data) {
  await writeFile(path.join(dataDir, name), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function main() {
  const generatedAt = new Date();
  const generatedAtLabel = formatTimestamp(generatedAt);
  await mkdir(dataDir, { recursive: true });

  const [latestUpdates, wzstatsMeta, codWeapons, mw4Watch] = await Promise.all([buildPatchUpdates(generatedAt, generatedAtLabel), buildWzstatsMeta(generatedAt, generatedAtLabel), buildCodWeapons(generatedAt, generatedAtLabel), buildMw4Watch(generatedAt, generatedAtLabel)]);

  await writeJson("latest-updates.json", latestUpdates);
  await writeJson("wzstats-meta.json", wzstatsMeta);
  await writeJson("cod-weapons.json", codWeapons);
  await writeJson("mw4-watch.json", mw4Watch);

  const currentIndex = await readFile(indexPath, "utf8");
  await writeFile(indexPath, updateIndex(currentIndex, latestUpdates), "utf8");
  console.log(`Updated automated data: ${latestUpdates.updates.length} updates, ${wzstatsMeta.warzoneRanked.items.length} WZStats Warzone items, ${codWeapons.weapons.length} COD weapons.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
