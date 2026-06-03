import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const dataDir = path.join(siteRoot, "data");
const indexPath = path.join(siteRoot, "index.html");

const urls = {
  blog: "https://www.callofduty.com/blog",
  blackOps7Blog: "https://www.callofduty.com/blog/blackops7",
  warzoneBlog: "https://www.callofduty.com/blog/warzone",
  patchnotes: "https://www.callofduty.com/patchnotes",
  codWeapons: "https://www.callofduty.com/guides/blackops7/weapons",
  wzstatsMeta: "https://app.wzstats.gg/wz2/weapons/meta",
  tridzoVideos: "https://www.youtube.com/@Tridzoid/videos",
  callOfDutyX: "https://x.com/CallofDuty",
  codLiveSeasonsX: "https://x.com/CODLiveSeasons",
  infinityWardX: "https://x.com/InfinityWard",
  infinityWardMay21Post: "https://x.com/InfinityWard/status/2057491681331626388",
  infinityWardMay21Context: "https://www.videogameschronicle.com/news/yes-we-are-making-the-definitive-modern-warfare-infinity-ward-teases-the-upcoming-call-of-duty/",
};

const monthNumbers = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseDate(text = "") {
  const match = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})\b/i);
  if (!match) return null;
  const [, month, day, year] = match;
  return new Date(Date.UTC(Number(year), monthNumbers[month.toLowerCase()], Number(day), 12, 0, 0));
}

function formatDate(date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(date);
}

function formatShortDate(dateText) {
  const date = new Date(`${dateText}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateText;
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(date);
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
    timeZoneName: "short",
  }).format(date);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/json",
      "user-agent": "Mozilla/5.0 LoadoutLabAutoUpdater/1.0",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url));
}

function absoluteUrl(value, baseUrl) {
  try {
    return new URL(value, baseUrl).toString().split("?")[0];
  } catch {
    return value;
  }
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
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripTags(match[1]))
    .filter((text) => text.length > 80 && !/cookie|privacy|legal/i.test(text));
  return paragraphs[0] || `${title} wurde auf der offiziellen Call-of-Duty-Seite gefunden.`;
}

function extractArticleLinks(html, baseUrl) {
  const links = [...html.matchAll(/<a[^>]+href=["']([^"']*\/blog\/20\d{2}\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      url: absoluteUrl(decodeHtml(match[1]), baseUrl),
      text: stripTags(match[2]),
    }))
    .filter((entry) => entry.text && /callofduty\.com\/blog\/20\d{2}\//.test(entry.url));

  return [...new Map(links.map((entry) => [entry.url, entry])).values()];
}

function scoreSeasonArticle(entry) {
  let score = 0;
  if (/season[\s-]?0?4/i.test(entry.text) || /season-0?4/i.test(entry.url)) score += 5;
  if (/black ops 7|warzone/i.test(entry.text) || /black-ops-7|warzone/i.test(entry.url)) score += 3;
  if (/content drop|everything you need to know|full intel|announcement/i.test(entry.text)) score += 2;
  return score;
}

function extractSections(html) {
  const sections = [];
  const pattern = /<h([2-4])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[2-4][^>]*>|$)/gi;

  for (const match of html.matchAll(pattern)) {
    const heading = stripTags(match[2]);
    const body = stripTags(match[3]).replace(/\s+/g, " ").trim();
    if (!heading || heading.length < 4) continue;
    if (/^image$|^play$|^get black ops/i.test(heading)) continue;
    if (/^content summary$/i.test(heading)) continue;
    if (!body || body.length < 60) continue;

    sections.push({
      heading,
      summary: body.length > 220 ? `${body.slice(0, 217).trim()}...` : body,
    });
  }

  return [...new Map(sections.map((section) => [section.heading, section])).values()];
}

function extractSeasonLaunchInfo(text) {
  const match = text.match(/Season 0?4 goes live on ([^.]+\.)/i);
  return match ? match[1].trim() : "";
}

async function detectLatestXPost(handleUrl) {
  try {
    const html = await fetchText(handleUrl);
    const statusMatch = html.match(/\/([A-Za-z0-9_]+)\/status\/(\d+)/i);
    if (!statusMatch) return { status: "configured" };

    return {
      status: "latest-post-detected",
      latestPostUrl: `https://x.com/${statusMatch[1]}/status/${statusMatch[2]}`,
    };
  } catch {
    return { status: "configured" };
  }
}

function categoryFromTitle(title) {
  if (/warzone|wz/i.test(title)) return "warzone";
  if (/zombie/i.test(title)) return "zombies";
  if (/endgame/i.test(title)) return "endgame";
  return "multiplayer";
}

function extractPatchLinks(html) {
  const links = [...html.matchAll(/<a[^>]+href=["']([^"']*\/patchnotes\/20\d{2}\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      url: absoluteUrl(decodeHtml(match[1]), urls.patchnotes),
      text: stripTags(match[2]),
    }))
    .filter((link) => /callofduty\.com\/patchnotes\//.test(link.url));
  return [...new Map(links.map((link) => [link.url, link])).values()].slice(0, 12);
}

async function buildPatchCard(link) {
  const html = await fetchText(link.url);
  const title = extractTitle(html) || link.text;
  const parsedDate = parseDate(stripTags(html)) || new Date();
  const summary = extractSummary(html, title);
  return {
    title,
    category: categoryFromTitle(title),
    status: "Offiziell",
    source: "Call of Duty",
    date: parsedDate.toISOString().slice(0, 10),
    dateLabel: formatDate(parsedDate),
    url: link.url,
    imageUrl: extractMeta(html, "og:image"),
    summary: summary.length > 260 ? `${summary.slice(0, 257).trim()}...` : summary,
  };
}

function buildHighlights(updates, generatedAtLabel) {
  const [first, second, third] = updates;
  return [
    {
      label: "Aktuell",
      title: first?.title || "Offizielle Patchnotes",
      text: first ? `${first.dateLabel}: ${first.summary}` : "Noch keine offiziellen Patchnotes gefunden.",
    },
    {
      label: "Geprueft",
      title: "Automatisch aktualisiert",
      text: `Offizielle Quellen wurden am ${generatedAtLabel} geprueft.`,
    },
    {
      label: "Weitere Updates",
      title: second?.title || third?.title || "Patchnotes beobachten",
      text: second ? `${second.dateLabel}: ${second.summary}` : "GitHub Actions sucht regelmaessig nach neuen Call-of-Duty-Meldungen.",
    },
  ];
}

function renderHighlights(highlights) {
  return highlights.slice(0, 3).map((item) => `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("\n            ");
}

function renderUpdateBoard(updates) {
  return updates.map((item, index) => {
    const image = item.imageUrl ? `\n                <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy">` : "";
    const status = index === 0 ? "Offiziell - neu" : "Offiziell";
    return `<a class="update-card official" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${image}
              <div class="update-card-content">
                <span class="status-pill">${status}</span>
                <time datetime="${escapeHtml(item.date)}">${escapeHtml(item.dateLabel)}</time>
                <h3>${escapeHtml(item.title)}</h3>
                <div class="update-detail">
                  <p>${escapeHtml(item.summary)}</p>
                  <strong>Offizielle Quelle oeffnen</strong>
                </div>
              </div>
            </a>`;
  }).join("\n            ");
}

function renderTimeline(updates) {
  return updates.slice(0, 4).map((item) => `<article>
            <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatShortDate(item.date))}</time>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
          </article>`).join("\n          ");
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
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function weaponImageUrl(weapon) {
  const id = encodeURIComponent(weapon.id);
  return `https://wzstats.gg/assets/images/weapon-placeholder.png#${id}`;
}

function roleFromWeapon(weapon) {
  if (weapon.type === "SMG" || weapon.type === "PISTOL" || weapon.type === "SHOTGUN") return "Close Range";
  if (weapon.type === "SNIPER_RIFLE" || weapon.type === "MARKSMAN_RIFLE") return "Sniper";
  if (weapon.type === "LMG" || weapon.type === "ASSAULT_RIFLE" || weapon.type === "BATTLE_RIFLE") return "Long Range";
  return titleCase(weapon.type || "Meta");
}

function buildWzstatsList({ title, key, tierList, weaponsById, updatedAt }) {
  const tiers = ["META", "A", "B", "C", "D"];
  const items = [];

  for (const tier of tiers) {
    const ids = tierList?.[tier] || [];
    ids.forEach((id, index) => {
      const weapon = weaponsById.get(id) || { id, name: id, type: "WEAPON" };
      const pickRate = Number.isFinite(Number(weapon.pickRate)) ? Number(weapon.pickRate) : null;
      items.push({
        id,
        name: weapon.name || id,
        weaponClass: titleCase(weapon.displayType || weapon.type || "Weapon"),
        role: roleFromWeapon(weapon),
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
        attachments: pickRate == null
          ? ["Pick-Rate: kein oeffentlicher WZStats-Wert verfuegbar", "Quelle: WZStats Tierlist", `Rolle: ${roleFromWeapon(weapon)}`]
          : [`Pick-Rate: ${pickRate.toFixed(1)}% laut WZStats`, "Quelle: WZStats Tierlist", `Rolle: ${roleFromWeapon(weapon)}`],
      });
    });
  }

  return {
    key,
    title,
    source: "WZStats",
    sourceUrl: urls.wzstatsMeta,
    sourceUpdatedAt: updatedAt,
    sourceNote: "Tierlist und Raenge stammen ausschliesslich aus WZStats. Pick-Rates werden nur angezeigt, wenn WZStats einen oeffentlichen Wert liefert.",
    hasPickRates: items.some((item) => item.pickRate != null),
    items,
  };
}

async function buildWzstatsMeta(generatedAt, generatedAtLabel) {
  const data = await fetchJson(urls.wzstatsMeta);
  const weaponsById = new Map((data.weapons || []).map((weapon) => [weapon.id, weapon]));
  const updatedAt = data.wzStatsTierList?.updatedAt || generatedAt.toISOString();

  return {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    source: "WZStats",
    sourceUrl: "https://wzstats.gg/",
    publicEndpoint: urls.wzstatsMeta,
    pickRatePolicy: "Pick-Rates are only shown when WZStats exposes a current public value. No estimates are generated.",
    warzoneRanked: buildWzstatsList({
      title: "Warzone Ranked / Ranked Resurgence Meta",
      key: "rankedResurgence",
      tierList: data.wzStatsTierList?.rankedResurgence,
      weaponsById,
      updatedAt,
    }),
    bo7Ranked: buildWzstatsList({
      title: "Black Ops 7 Ranked Meta",
      key: "bo7Ranked",
      tierList: data.wzStatsTierList?.bo7Ranked,
      weaponsById,
      updatedAt,
    }),
  };
}

async function buildCodWeapons(generatedAt, generatedAtLabel) {
  const html = await fetchText(urls.codWeapons);
  const blocks = html.split('<div class="cod-guide-grid-item-component guide-grid-item-container').slice(1);
  const links = blocks
    .map((block) => {
      const href = block.match(/<a href="([^"]+)"/i)?.[1];
      const image = block.match(/<img src="([^"]+)" alt="([^"]*)"\s*\/?>/i);
      const eyebrow = block.match(/<div class="cod-guide-grid-item-component__text-eyebrow">\s*([\s\S]*?)<\/div>/i)?.[1];
      const title = block.match(/<div class="cod-guide-grid-item-component__text-title">\s*([\s\S]*?)\s*<\/div>/i)?.[1];
      if (!href || !title) return null;
      return {
        url: absoluteUrl(href, urls.codWeapons),
        imageUrl: image ? absoluteUrl(image[1], urls.codWeapons) : "",
        imageAlt: image ? decodeHtml(image[2]) : "",
        weaponClass: stripTags(eyebrow || "").replace(/\s+(new|s\d+)\b.*$/i, "").trim(),
        name: stripTags(title),
      };
    })
    .filter(Boolean)
    .filter((weapon) => weapon.name && !/^\s*$/.test(weapon.name));

  const unique = [...new Map(links.map((weapon) => [`${weapon.weaponClass}:${weapon.name}`, weapon])).values()];
  return {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    source: "Call of Duty Guides",
    sourceUrl: urls.codWeapons,
    weapons: unique,
  };
}

function extractYouTubeVideos(html) {
  const videos = [];
  const matches = [...html.matchAll(/"videoId":"([^"]+)".{0,600}?"title":\{"runs":\[\{"text":"([^"]+)"/g)];
  for (const match of matches) {
    const id = match[1];
    const title = decodeHtml(match[2]);
    if (!videos.some((video) => video.id === id)) {
      videos.push({
        id,
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        transcriptStatus: "not-available-without-youtube-caption-access",
      });
    }
    if (videos.length >= 5) break;
  }
  return videos;
}

async function buildMw4Watch(generatedAt, generatedAtLabel) {
  let videos = [];
  try {
    videos = extractYouTubeVideos(await fetchText(urls.tridzoVideos));
  } catch (error) {
    videos = [{ title: "Tridzo videos konnten nicht automatisch gelesen werden.", url: urls.tridzoVideos, transcriptStatus: error.message }];
  }

  const officialPosts = [
    {
      title: "Infinity Ward teasert das naechste Studio-Spiel",
      source: "Infinity Ward on X",
      sourceUrl: urls.infinityWardMay21Post,
      contextUrl: urls.infinityWardMay21Context,
      date: "2026-05-21",
      dateLabel: "21. Mai 2026",
      status: "Offiziell",
      summary: "Infinity Ward schreibt, dass ein neues Kapitel fuer das Studio beginnt, das naechste Spiel aus diesem Ansatz entsteht und das Team stolz darauf ist, bald mehr zu teilen. Der Name MW4, Release-Datum und Feature-Liste bleiben bis zu einem Activision-/Call-of-Duty-Reveal weiterhin nicht final bestaetigt.",
    },
  ];

  return {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    officialSources: [
      { name: "Call of Duty on X", url: urls.callOfDutyX, status: "configured" },
      { name: "Infinity Ward on X", url: urls.infinityWardX, status: "latest-post-detected", latestPostUrl: urls.infinityWardMay21Post },
    ],
    officialPosts,
    transcriptSources: [
      { name: "Tridzo YouTube", url: urls.tridzoVideos, status: "latest-videos-detected", videos },
    ],
    officialSummary: "Infinity Ward hat am 21. Mai 2026 offiziell das naechste Studio-Spiel angeteasert und geschrieben, dass man bald mehr teilen will. Das ist ein offizieller MW-/COD-2026-Hinweis, aber noch kein finaler MW4-Name, kein Release-Datum und keine Feature-Liste.",
    cards: [
      ["Offiziell", "Infinity Ward: 21. Mai 2026", officialPosts[0].summary],
      ["Geruecht", "Tridzo Transkripte", videos[0] ? `Neuester gefundener Tridzo-Kontext: ${videos[0].title}` : "Keine aktuellen Videos gefunden."],
      ["Regel", "Strikte Trennung", "Der Infinity-Ward-Post zaehlt als offiziell. MW4-Name, Reveal-Termin, Story, Multiplayer und DMZ bleiben Geruecht, bis Activision oder Call of Duty sie bestaetigen."],
    ].map(([label, title, text]) => ({ label, title, text })),
    tips: [
      "Call of Duty und Infinity Ward auf X sind offizielle Quellen.",
      "Neu seit 21. Mai 2026: Infinity Ward teasert das naechste Studio-Spiel und will bald mehr teilen.",
      "Tridzo-Transkripte werden nur als Geruechte- und Kontextquelle verwendet.",
      "MW4 als genauer Name, Release-Datum und Features werden erst nach einem offiziellen Reveal als Fakt angezeigt.",
      "Wenn X API-Zugang ergaenzt wird, kann der Watcher echte Posts statt nur Quellenstatus pruefen.",
    ],
  };
}

async function findSeasonFourArticle() {
  const pages = [urls.blackOps7Blog, urls.warzoneBlog, urls.blog];
  const candidates = [];

  for (const page of pages) {
    try {
      const html = await fetchText(page);
      candidates.push(...extractArticleLinks(html, page));
    } catch (error) {
      console.warn(`Skipping ${page}: ${error.message}`);
    }
  }

  const ranked = [...new Map(candidates.map((entry) => [entry.url, entry])).values()]
    .map((entry) => ({ ...entry, score: scoreSeasonArticle(entry) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) throw new Error("No Season 04 article found on official blog pages.");
  return ranked[0];
}

async function buildSeasonWatch(generatedAt, generatedAtLabel) {
  const article = await findSeasonFourArticle();
  const articleHtml = await fetchText(article.url);
  const title = extractTitle(articleHtml) || article.text || "Season 04";
  const articleText = stripTags(articleHtml);
  const parsedDate = parseDate(articleText) || generatedAt;
  const summary = extractSummary(articleHtml, title);
  const launchWindow = extractSeasonLaunchInfo(articleText);
  const sections = extractSections(articleHtml).slice(0, 4);
  const xStatus = await detectLatestXPost(urls.codLiveSeasonsX);

  return {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    season: "Season 04",
    featuredPost: {
      title,
      url: article.url,
      date: parsedDate.toISOString().slice(0, 10),
      dateLabel: formatDate(parsedDate),
      imageUrl: extractMeta(articleHtml, "og:image"),
      summary: summary.length > 320 ? `${summary.slice(0, 317).trim()}...` : summary,
      launchWindow,
    },
    officialSources: [
      {
        name: "Call of Duty Blog - Black Ops 7",
        url: urls.blackOps7Blog,
        status: "latest-article-detected",
        latestArticleUrl: article.url,
      },
      {
        name: "Call of Duty Blog - Warzone",
        url: urls.warzoneBlog,
        status: "tracked",
      },
      {
        name: "CODLiveSeasons on X",
        url: urls.codLiveSeasonsX,
        ...xStatus,
      },
    ],
    stats: [
      ["Status", "Offiziell live"],
      ["Blogpost", formatDate(parsedDate)],
      ["Launch", launchWindow || "Offiziell angekuendigt"],
      ["Quellen", "Blog + CODLiveSeasons"],
    ],
    cards: [
      {
        label: "Blogpost",
        title,
        text: summary.length > 220 ? `${summary.slice(0, 217).trim()}...` : summary,
      },
      {
        label: "Launch",
        title: launchWindow || "Season 04 Zeitfenster",
        text: launchWindow
          ? `Der offizielle Blog nennt dieses Startfenster fuer Season 04.`
          : "Der offizielle Blog ist gefunden; das Startfenster konnte aus dem HTML nicht separat gelesen werden.",
      },
      ...sections.map((section) => ({
        label: "Offiziell",
        title: section.heading,
        text: section.summary,
      })),
    ].slice(0, 6),
    tips: [
      "Season-04-Blogposts aus dem offiziellen Call-of-Duty-Blog haben Vorrang vor Drittquellen.",
      "CODLiveSeasons auf X ist als offizieller Season-, Event- und Live-Update-Kanal hinterlegt.",
      "Patchnotes und Live-Seasons werden getrennt beobachtet, damit Event- und Launch-Infos nicht uebersehen werden.",
      "Geruechte oder Creator-Zusammenfassungen werden nicht in den Season-4-Tab uebernommen.",
      "Bei neuen offiziellen Posts wird zuerst der Featured Blogpost und danach die Kartenliste aktualisiert.",
    ],
    gallery: [
      ["Season 04 Blog", extractMeta(articleHtml, "og:image") || "assets/cod-loadout-hero.png"],
    ],
    officialSummary: launchWindow
      ? `${title}. ${launchWindow}`
      : `${title}. Der offizielle Season-04-Blog wurde erkannt und fuer den Season-Tab uebernommen.`,
  };
}

async function buildPatchUpdates(generatedAt, generatedAtLabel) {
  const html = await fetchText(urls.patchnotes);
  const links = extractPatchLinks(html);
  const updates = [];

  for (const link of links) {
    try {
      updates.push(await buildPatchCard(link));
    } catch (error) {
      console.warn(`Skipping ${link.url}: ${error.message}`);
    }
  }

  updates.sort((a, b) => b.date.localeCompare(a.date));
  return {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    sources: [{ id: "cod-patchnotes", label: "Call of Duty Patch Notes", url: urls.patchnotes }],
    highlights: buildHighlights(updates, generatedAtLabel),
    updates: updates.slice(0, 8),
  };
}

async function writeJson(name, data) {
  await writeFile(path.join(dataDir, name), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function readJson(name) {
  try {
    return JSON.parse(await readFile(path.join(dataDir, name), "utf8"));
  } catch {
    return null;
  }
}

async function buildWithFallback(name, label, builder, generatedAt) {
  try {
    return await builder();
  } catch (error) {
    const previous = await readJson(name);
    if (!previous) throw error;
    console.warn(`Keeping previous ${label}; refresh failed: ${error.message}`);
    return {
      ...previous,
      lastRefreshAttemptAt: generatedAt.toISOString(),
      lastRefreshError: error.message,
    };
  }
}

async function main() {
  const generatedAt = new Date();
  const generatedAtLabel = formatTimestamp(generatedAt);
  await mkdir(dataDir, { recursive: true });

  const [latestUpdates, wzstatsMeta, codWeapons, mw4Watch, seasonWatch] = await Promise.all([
    buildWithFallback("latest-updates.json", "Call of Duty updates", () => buildPatchUpdates(generatedAt, generatedAtLabel), generatedAt),
    buildWithFallback("wzstats-meta.json", "WZStats meta", () => buildWzstatsMeta(generatedAt, generatedAtLabel), generatedAt),
    buildWithFallback("cod-weapons.json", "Call of Duty weapons", () => buildCodWeapons(generatedAt, generatedAtLabel), generatedAt),
    buildWithFallback("mw4-watch.json", "MW4 watch", () => buildMw4Watch(generatedAt, generatedAtLabel), generatedAt),
    buildWithFallback("season-watch.json", "Season 04 watch", () => buildSeasonWatch(generatedAt, generatedAtLabel), generatedAt),
  ]);

  await writeJson("latest-updates.json", latestUpdates);
  await writeJson("wzstats-meta.json", wzstatsMeta);
  await writeJson("cod-weapons.json", codWeapons);
  await writeJson("mw4-watch.json", mw4Watch);
  await writeJson("season-watch.json", seasonWatch);

  const currentIndex = await readFile(indexPath, "utf8");
  const nextIndex = updateIndex(currentIndex, latestUpdates);
  await writeFile(indexPath, nextIndex, "utf8");

  console.log(`Updated automated data: ${latestUpdates.updates.length} updates, ${wzstatsMeta.warzoneRanked.items.length} WZStats Warzone items, ${codWeapons.weapons.length} COD weapons, Season 04 watch ready.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
