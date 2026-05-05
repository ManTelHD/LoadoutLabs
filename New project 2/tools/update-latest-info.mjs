import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const dataPath = path.join(siteRoot, "data", "latest-updates.json");
const indexPath = path.join(siteRoot, "index.html");
const patchnotesUrl = "https://www.callofduty.com/patchnotes";

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
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
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
      accept: "text/html,application/xhtml+xml",
      "user-agent": "Mozilla/5.0 LoadoutLabAutoUpdater/1.0",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
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

function categoryFromTitle(title) {
  if (/warzone|wz/i.test(title)) return "warzone";
  if (/zombie/i.test(title)) return "zombies";
  if (/endgame/i.test(title)) return "endgame";
  return "multiplayer";
}

function extractPatchLinks(html) {
  const links = [...html.matchAll(/<a[^>]+href=["']([^"']*\/patchnotes\/20\d{2}\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      url: absoluteUrl(decodeHtml(match[1]), patchnotesUrl),
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

async function main() {
  const generatedAt = new Date();
  const generatedAtLabel = formatTimestamp(generatedAt);
  const indexHtml = await fetchText(patchnotesUrl);
  const links = extractPatchLinks(indexHtml);
  const updates = [];

  for (const link of links) {
    try {
      updates.push(await buildPatchCard(link));
    } catch (error) {
      console.warn(`Skipping ${link.url}: ${error.message}`);
    }
  }

  updates.sort((a, b) => b.date.localeCompare(a.date));
  const data = {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    generatedAtLabel,
    sources: [{ id: "cod-patchnotes", label: "Call of Duty Patch Notes", url: patchnotesUrl }],
    highlights: buildHighlights(updates, generatedAtLabel),
    updates: updates.slice(0, 8),
  };

  await mkdir(path.dirname(dataPath), { recursive: true });
  await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  const currentIndex = await readFile(indexPath, "utf8");
  const nextIndex = updateIndex(currentIndex, data);
  await writeFile(indexPath, nextIndex, "utf8");
  console.log(`Updated ${path.relative(siteRoot, dataPath)} and index.html with ${data.updates.length} official updates.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
