(function () {
  const callOfDutyChannelId = "UC9YydG57epLqxA9cTzZXSeQ";
  const liveEmbedUrl = `https://www.youtube-nocookie.com/embed/live_stream?channel=${callOfDutyChannelId}`;
  const mw4OfficialText = {
    description: "Aktueller Stand zu Call of Duty 2026: Infinity Ward hat auf X und im offiziellen COD-Podcast bestätigt, dass das Studio am nächsten Modern-Warfare-Projekt arbeitet. Der Name MW4 bleibt Community-Name und ist offiziell noch nicht bestätigt.",
    updateTime: "Aktualisiert: 28. Mai 2026",
    updateSummary: "Neu ergänzt: offizieller Call-of-Duty-YouTube-Livestream, offizielle Infinity-Ward-X-Infos, Aussagen der Studio-Heads Mark Grigsby und Jack O'Hara sowie klar getrennte Community-Gerüchte zu MW4.",
    stats: [["Offiziell", "Modern Warfare"], ["Studio", "Infinity Ward"], ["YouTube", "Call of Duty Live"], ["Gerüchte", "Community-Leaks"]],
  };

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function installLiveStyle() {
    if (document.querySelector("#mw4-live-embed-style")) return;
    const style = document.createElement("style");
    style.id = "mw4-live-embed-style";
    style.textContent = `
      body .mw4-watch-panel .mw4-live-panel {
        overflow: hidden !important;
        margin: 0 0 1rem !important;
        border: 1px solid rgba(216, 180, 87, 0.28) !important;
        border-radius: 8px !important;
        background: linear-gradient(145deg, rgba(216, 180, 87, 0.1), rgba(6, 9, 12, 0.96)) !important;
        box-shadow: 0 1.1rem 2.4rem rgba(0, 0, 0, 0.32), 0 0 1.6rem rgba(216, 180, 87, 0.11) !important;
      }

      body .mw4-watch-panel .mw4-live-heading {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 1rem !important;
        padding: 0.82rem 0.95rem !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      }

      body .mw4-watch-panel .mw4-live-heading span {
        color: #d8b457 !important;
        font-size: 0.72rem !important;
        font-weight: 950 !important;
        text-transform: uppercase !important;
      }

      body .mw4-watch-panel .mw4-live-heading strong {
        display: block !important;
        margin-top: 0.2rem !important;
        color: #fff4cf !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.15rem, 1.6vw, 1.55rem) !important;
        line-height: 1 !important;
      }

      body .mw4-watch-panel .mw4-live-frame {
        position: relative !important;
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        background: #05070a !important;
      }

      body .mw4-watch-panel .mw4-live-frame iframe {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function renderLivePanel() {
    const body = document.querySelector(".mw4-watch-panel .mode-info-body");
    if (!body) return;
    document.querySelector("#mw4LivePanel")?.remove();
    const panel = document.createElement("section");
    panel.id = "mw4LivePanel";
    panel.className = "mw4-live-panel";
    panel.innerHTML = `
      <div class="mw4-live-heading">
        <div><span>Offizieller Call-of-Duty-Kanal</span><strong>Livestream</strong></div>
        <span>Live</span>
      </div>
      <div class="mw4-live-frame">
        <iframe
          src="${liveEmbedUrl}"
          title="Offizieller Call of Duty YouTube Livestream"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>`;
    const prose = body.querySelector(".mw4-prose");
    if (prose) body.insertBefore(panel, prose);
    else body.prepend(panel);
  }

  function renderStats() {
    const stats = document.querySelector(".mw4-watch-panel #modeInfoStats");
    if (!stats) return;
    stats.innerHTML = mw4OfficialText.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
  }

  function renderProse() {
    const prose = document.querySelector(".mw4-watch-panel .mw4-prose");
    if (!prose) return false;
    prose.innerHTML = `
      <h3>Was zu MW4 aktuell wichtig ist</h3>
      <p>Der MW4-Tab ist jetzt klar in zwei Ebenen getrennt: oben stehen der offizielle Call-of-Duty-Livestream und die offiziellen Aussagen von Infinity Ward und Call of Duty, darunter die Gerüchte und Community-Erwartungen. Offiziell bestätigt ist aktuell ein neues Modern-Warfare-Projekt von Infinity Ward. Der Name MW4 ist weiterhin nicht bestätigt, wird in der Community aber als naheliegender Arbeitstitel genutzt.</p>

      <h4>Offizieller Livestream</h4>
      <p>Eingebettet ist der aktuelle Livestream vom offiziellen Call-of-Duty-YouTube-Kanal. Wenn der Kanal gerade live ist, zeigt der Player den laufenden Stream. Falls YouTube keinen aktiven Stream ausliefert, bleibt der Player als offizieller Kanal-Embed bestehen und aktualisiert sich beim nächsten Live-Signal.</p>

      <h4>Offiziell von Infinity Ward</h4>
      <p>Infinity Ward hat am 21. Mai 2026 auf X öffentlich bestätigt, dass das Studio am nächsten Modern Warfare arbeitet. Der zentrale Satz aus dem offiziellen Post: Das Team macht das „definitive Modern Warfare“. In den begleitenden Aussagen der Studio-Heads Mark Grigsby und Jack O'Hara wird das Projekt als neues Kapitel für Infinity Ward beschrieben, mit Fokus auf ein starkes, immersives Modern-Warfare-Erlebnis.</p>
      <ul>
        <li>Infinity Ward arbeitet offiziell an einem neuen Modern Warfare.</li>
        <li>Mark Grigsby und Jack O'Hara treten als Studio-Heads sichtbar für das Projekt auf.</li>
        <li>Infinity Ward spricht von einem neuen Kapitel und vom „definitive Modern Warfare“.</li>
        <li>Ein finaler Titel, Release-Datum, Multiplayer-Details und Warzone-Integration wurden noch nicht offiziell genannt.</li>
      </ul>

      <h4>Offizielle Call-of-Duty-Lage</h4>
      <p>Von offizieller Seite ist außerdem wichtig: Das nächste Call of Duty wird nicht für PS4 entwickelt. Damit verschiebt sich die Erwartung klar Richtung Current-Gen und PC. Das ist für MW4 relevant, weil Community und Presse deshalb mit größeren technischen und systemischen Änderungen rechnen.</p>
      <ul>
        <li>Keine PS4-Version für das nächste Call of Duty.</li>
        <li>Current-Gen-Fokus macht größere Technik-, Grafik- und Systemänderungen wahrscheinlicher.</li>
        <li>Noch offen bleiben Beta, Reveal-Trailer, offizieller Blogpost und Plattformdetails über PS5, Xbox Series X|S und PC hinaus.</li>
      </ul>

      <h4>Gerüchte & Community-Talk</h4>
      <p>Die Community nennt das Projekt aktuell meistens MW4 oder Modern Warfare 4. Mehrere Leak-Zusammenfassungen sprechen über ein Korea-Setting, Makarov-Bezüge, Task Force 141 und eine mögliche Rückkehr von DMZ. Diese Punkte sind nicht bestätigt und müssen auf der Website weiterhin als Gerücht behandelt werden.</p>
      <ul>
        <li>Korea-Setting: häufiges Gerücht, aber keine offizielle Bestätigung.</li>
        <li>Task Force 141 und Makarov: plausibel für Modern Warfare, aktuell Community-Spekulation.</li>
        <li>DMZ-Rückkehr: starkes Community-Thema, aber offiziell offen.</li>
        <li>Movement: viele erwarten eine geerdetere Modern-Warfare-Richtung statt Black-Ops-Tempo; belastbare Details fehlen.</li>
        <li>Warzone: Integration wird erwartet, aber Zeitpunkt, Map, Waffenpool und Technik sind noch nicht bestätigt.</li>
      </ul>

      <h4>Einordnung für LoadoutLab</h4>
      <p>Für die Seite bedeutet das: MW4 bleibt ein Watchlist-Tab. Sobald Infinity Ward oder Call of Duty den Reveal-Trailer, Key-Art, Blogpost oder Roadmap veröffentlichen, müssen Name, Bilder, Trailer, Release, Plattformen, Beta, Waffen, Perks, Gunsmith, Movement und Warzone-Anbindung sofort gegen offizielle Angaben ersetzt werden.</p>
      <p>Bis dahin sollte hier bewusst mit klarer Sprache gearbeitet werden: „offiziell bestätigt“ nur bei Infinity-Ward- oder Call-of-Duty-Aussagen, „Gerücht“ bei Community-Leaks und „erwartet“ nur dort, wo es aus dem üblichen Call-of-Duty-Rollout abgeleitet ist.</p>
    `;
    return true;
  }

  function applyMW4OfficialCommunity() {
    if (!document.querySelector(".mw4-watch-panel")) return;
    installLiveStyle();
    const description = document.querySelector("#modeInfoDescription");
    if (description) description.textContent = mw4OfficialText.description;
    const updateTime = document.querySelector("#modeInfoUpdateTime");
    if (updateTime) updateTime.textContent = mw4OfficialText.updateTime;
    const updateSummary = document.querySelector("#modeInfoUpdateSummary");
    if (updateSummary) updateSummary.textContent = mw4OfficialText.updateSummary;
    document.querySelectorAll(".mw4-updated-pill").forEach((pill) => { pill.textContent = mw4OfficialText.updateTime; });
    renderStats();
    renderProse();
    renderLivePanel();
  }

  function scheduleApply() {
    window.setTimeout(applyMW4OfficialCommunity, 40);
    window.setTimeout(applyMW4OfficialCommunity, 180);
    window.setTimeout(applyMW4OfficialCommunity, 500);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mw4-mode-button, [data-mode='mw4-info']")) scheduleApply();
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleApply, { once: true });
  } else {
    scheduleApply();
  }
})();
