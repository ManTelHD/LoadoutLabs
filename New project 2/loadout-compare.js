(function () {
  if (document.querySelector("#loadout-compare-style")) return;

  const selected = [];
  const panel = () => document.querySelector("#weaponComparePanel");
  const grid = () => document.querySelector("#loadoutGrid");
  const esc = (value) => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function cardId(card) {
    return slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
  }

  function getScore(card) {
    const scoreText = card.querySelector(".score-chip strong, .stat-strip strong")?.textContent || "0";
    const score = Number(scoreText.replace(/[^0-9.]/g, ""));
    return Number.isFinite(score) ? score : 0;
  }

  function getStat(card, label) {
    const target = label.toLowerCase();
    const stat = [...card.querySelectorAll(".stat-strip > span")].find((item) => item.textContent.toLowerCase().includes(target));
    return stat?.querySelector("strong")?.textContent?.trim() || "-";
  }

  function getCardData(card) {
    const attachments = [...card.querySelectorAll(".premium-attachment-list .loadout-slot strong, .attachment-list li")]
      .map((item) => item.textContent.trim())
      .filter(Boolean)
      .slice(0, 5);
    const extras = [...card.querySelectorAll(".premium-perk-list .perk-chip strong, .perk-list li")]
      .map((item) => item.textContent.replace(/^Extra\s*\d+\s*:\s*/i, "").trim())
      .filter((item) => item && !/^Code\s*:/i.test(item))
      .slice(0, 3);

    return {
      id: cardId(card),
      name: card.querySelector(".weapon-name")?.textContent?.trim() || card.dataset.loadoutCard || "Waffe",
      weaponClass: card.querySelector(".mode-pill")?.textContent?.trim() || "-",
      tier: card.querySelector(".rank-badge span")?.textContent?.trim() || "-",
      rank: card.querySelector(".rank-badge")?.childNodes?.[0]?.textContent?.trim() || "-",
      score: getScore(card),
      pick: getStat(card, "Pick"),
      handling: getStat(card, "Handhabung"),
      range: card.querySelector(".range")?.textContent?.trim() || "-",
      code: card.querySelector(".build-code-box strong")?.textContent?.trim()
        || [...card.querySelectorAll(".perk-list li")].find((item) => /^\s*Code\s*:/i.test(item.textContent || ""))?.textContent?.replace(/^\s*Code\s*:\s*/i, "").trim()
        || "-",
      attachments,
      extras,
    };
  }

  function addButtons() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      if (card.querySelector(".compare-button")) return;
      const footer = card.querySelector(".card-footer");
      if (!footer) return;
      const button = document.createElement("button");
      button.className = "compare-button";
      button.type = "button";
      button.dataset.compareId = cardId(card);
      button.textContent = "Vergleichen";
      footer.appendChild(button);
    });
    syncCards();
  }

  function syncCards() {
    const ids = new Set(selected.map((item) => item.id));
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      const active = ids.has(cardId(card));
      card.classList.toggle("compare-selected", active);
      const button = card.querySelector(".compare-button");
      if (button) {
        button.classList.toggle("active", active);
        button.textContent = active ? "Ausgewählt" : "Vergleichen";
      }
    });
  }

  function pick(card) {
    const data = getCardData(card);
    const existingIndex = selected.findIndex((item) => item.id === data.id);
    if (existingIndex >= 0) selected.splice(existingIndex, 1);
    else {
      if (selected.length >= 2) selected.shift();
      selected.push(data);
    }
    renderPanel();
    syncCards();
  }

  function scoreWinner(a, b) {
    if (!a || !b) return "";
    if (a.score === b.score) return "Beide Builds liegen beim Score gleichauf.";
    const winner = a.score > b.score ? a : b;
    const loser = a.score > b.score ? b : a;
    return `${winner.name} liegt beim Meta Score ${winner.score - loser.score} Punkte vorne.`;
  }

  function renderSingle(item) {
    return `
      <article class="compare-card">
        <div class="compare-card-head">
          <span>${esc(item.weaponClass)}</span>
          <strong>${esc(item.name)}</strong>
        </div>
        <div class="compare-score"><b>${esc(item.score)}</b><span>Score</span></div>
        <dl>
          <div><dt>Tier</dt><dd>${esc(item.tier)} ${esc(item.rank)}</dd></div>
          <div><dt>Range</dt><dd>${esc(item.range)}</dd></div>
          <div><dt>Pick</dt><dd>${esc(item.pick)}</dd></div>
          <div><dt>Handling</dt><dd>${esc(item.handling)}</dd></div>
        </dl>
        <div class="compare-mini-list">
          <span>Top Aufsätze</span>
          <p>${esc(item.attachments.slice(0, 3).join(" · ") || "Noch keine Aufsätze")}</p>
        </div>
        <div class="compare-mini-list">
          <span>Extras</span>
          <p>${esc(item.extras.join(" · ") || "Noch keine Extras")}</p>
        </div>
        <div class="compare-code"><span>Code</span><strong>${esc(item.code)}</strong></div>
      </article>
    `;
  }

  function renderPanel() {
    const target = panel();
    if (!target) return;

    if (!selected.length) {
      target.innerHTML = `
        <div class="interactive-compare-empty">
          <span>Meta Vergleich</span>
          <strong>Zwei Waffen auswählen</strong>
          <p>Klick bei einer Waffenkarte auf „Vergleichen“. Sobald zwei Waffen markiert sind, siehst du Score, Range, Extras, Aufsätze und Code direkt nebeneinander.</p>
        </div>
      `;
      return;
    }

    if (selected.length === 1) {
      target.innerHTML = `
        <div class="interactive-compare-shell single">
          <div class="compare-summary">
            <span>Meta Vergleich</span>
            <strong>${esc(selected[0].name)} ausgewählt</strong>
            <p>Wähle noch eine zweite Waffe aus, dann wird der direkte Vergleich sichtbar.</p>
          </div>
          ${renderSingle(selected[0])}
        </div>
      `;
      return;
    }

    const [first, second] = selected;
    target.innerHTML = `
      <div class="interactive-compare-shell">
        <div class="compare-summary">
          <span>Meta Vergleich</span>
          <strong>${esc(first.name)} vs ${esc(second.name)}</strong>
          <p>${esc(scoreWinner(first, second))}</p>
          <button class="compare-clear" type="button">Auswahl löschen</button>
        </div>
        <div class="compare-card-grid">
          ${renderSingle(first)}
          ${renderSingle(second)}
        </div>
      </div>
    `;
  }

  function init() {
    addButtons();
    renderPanel();
  }

  const style = document.createElement("style");
  style.id = "loadout-compare-style";
  style.textContent = `
    body #weaponComparePanel {
      display: block !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body #loadoutGrid .compare-button {
      min-height: 2.38rem !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.3) !important;
      border-radius: 0.38rem !important;
      padding: 0 0.75rem !important;
      background: rgba(var(--tier-card-rgb, 185, 255, 61), 0.08) !important;
      color: #f7f9fc !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 0.95rem !important;
      font-weight: 900 !important;
      cursor: pointer !important;
      transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease !important;
    }

    body #loadoutGrid .compare-button:hover,
    body #loadoutGrid .compare-button.active {
      border-color: rgba(var(--tier-card-rgb, 185, 255, 61), 0.72) !important;
      background: rgb(var(--tier-card-rgb, 185, 255, 61)) !important;
      color: #050708 !important;
    }

    body #loadoutGrid .loadout-card.compare-selected {
      outline: 2px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.72) !important;
      outline-offset: 0.15rem !important;
    }

    body .interactive-compare-empty,
    body .interactive-compare-shell {
      margin: 0.35rem 0 0.9rem !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 0.54rem !important;
      background:
        linear-gradient(135deg, rgba(255, 216, 106, 0.08), transparent 46%),
        rgba(8, 12, 17, 0.76) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .interactive-compare-empty,
    body .compare-summary {
      padding: 0.9rem 1rem !important;
    }

    body .interactive-compare-empty span,
    body .compare-summary span,
    body .compare-card-head span,
    body .compare-mini-list span,
    body .compare-code span {
      display: block !important;
      color: #b9ff3d !important;
      font-size: 0.68rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body .interactive-compare-empty strong,
    body .compare-summary strong {
      display: block !important;
      margin-top: 0.18rem !important;
      color: #f7f9fc !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: clamp(1.35rem, 2vw, 1.9rem) !important;
      line-height: 1 !important;
    }

    body .interactive-compare-empty p,
    body .compare-summary p {
      max-width: 58rem !important;
      margin: 0.35rem 0 0 !important;
      color: rgba(255, 255, 255, 0.72) !important;
      line-height: 1.55 !important;
    }

    body .compare-summary {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      gap: 0.2rem 0.9rem !important;
      align-items: center !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    }

    body .compare-summary span,
    body .compare-summary strong,
    body .compare-summary p {
      grid-column: 1 !important;
    }

    body .compare-clear {
      grid-row: 1 / span 3 !important;
      grid-column: 2 !important;
      min-height: 2.25rem !important;
      border: 1px solid rgba(255, 255, 255, 0.14) !important;
      border-radius: 0.38rem !important;
      padding: 0 0.8rem !important;
      background: rgba(255, 255, 255, 0.06) !important;
      color: #f7f9fc !important;
      font-weight: 900 !important;
      cursor: pointer !important;
    }

    body .compare-card-grid,
    body .interactive-compare-shell.single {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 0.8rem !important;
      padding: 0.9rem !important;
    }

    body .interactive-compare-shell.single {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr) !important;
    }

    body .interactive-compare-shell.single .compare-summary {
      border: 0 !important;
      padding: 0 !important;
      align-content: center !important;
    }

    body .compare-card {
      display: grid !important;
      gap: 0.65rem !important;
      border: 1px solid rgba(185, 255, 61, 0.16) !important;
      border-radius: 0.48rem !important;
      padding: 0.82rem !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 62%),
        rgba(4, 7, 10, 0.46) !important;
    }

    body .compare-card-head {
      display: flex !important;
      align-items: start !important;
      justify-content: space-between !important;
      gap: 0.7rem !important;
    }

    body .compare-card-head strong {
      color: #fff !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 1.55rem !important;
      line-height: 1 !important;
      text-align: right !important;
    }

    body .compare-score {
      display: inline-flex !important;
      align-items: baseline !important;
      gap: 0.35rem !important;
      width: fit-content !important;
      border: 1px solid rgba(255, 216, 106, 0.42) !important;
      border-radius: 0.42rem !important;
      padding: 0.32rem 0.58rem !important;
      background: rgba(255, 216, 106, 0.1) !important;
    }

    body .compare-score b {
      color: #ffd86a !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 1.9rem !important;
      line-height: 1 !important;
    }

    body .compare-score span {
      color: rgba(255, 255, 255, 0.68) !important;
      font-size: 0.72rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body .compare-card dl {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 0.42rem !important;
      margin: 0 !important;
    }

    body .compare-card dl div,
    body .compare-mini-list,
    body .compare-code {
      border: 1px solid rgba(255, 255, 255, 0.075) !important;
      border-radius: 0.38rem !important;
      padding: 0.5rem !important;
      background: rgba(255, 255, 255, 0.035) !important;
    }

    body .compare-card dt {
      color: rgba(255, 255, 255, 0.54) !important;
      font-size: 0.68rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body .compare-card dd {
      margin: 0.12rem 0 0 !important;
      color: #f7f9fc !important;
      font-weight: 900 !important;
    }

    body .compare-mini-list p,
    body .compare-code strong {
      margin: 0.18rem 0 0 !important;
      color: #f7f9fc !important;
      line-height: 1.35 !important;
    }

    body .compare-code strong {
      display: block !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 1rem !important;
      word-break: break-word !important;
    }

    @media (max-width: 860px) {
      body .compare-summary,
      body .compare-card-grid,
      body .interactive-compare-shell.single {
        grid-template-columns: 1fr !important;
      }

      body .compare-clear {
        grid-column: 1 !important;
        grid-row: auto !important;
        justify-self: start !important;
      }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const clear = event.target.closest(".compare-clear");
    if (clear) {
      selected.splice(0, selected.length);
      renderPanel();
      syncCards();
      return;
    }

    const button = event.target.closest(".compare-button");
    if (!button) return;
    const card = button.closest(".loadout-card");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    pick(card);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(init, 180);
  window.setTimeout(init, 1000);
  if (grid()) new MutationObserver(addButtons).observe(grid(), { childList: true });
}());
