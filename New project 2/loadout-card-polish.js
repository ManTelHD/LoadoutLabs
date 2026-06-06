(function () {
  const STYLE_ID = "loadout-card-polish-style";
  const state = { timer: 0 };

  const css = `
    body #loadouts.section,
    body section#loadouts {
      padding-left: clamp(1.35rem, 3vw, 3.75rem) !important;
      padding-right: clamp(1.35rem, 3vw, 3.75rem) !important;
    }

    body .weapon-dashboard .controls {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) minmax(12rem, 16rem) !important;
      gap: 0.8rem !important;
      align-items: end !important;
      margin-bottom: 0.72rem !important;
      padding: 0.72rem !important;
      border: 1px solid rgba(255,255,255,0.075) !important;
      border-radius: 0.48rem !important;
      background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012)), rgba(7,10,14,0.72) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.035) !important;
    }

    body .weapon-dashboard .search-box,
    body .weapon-dashboard .select-box {
      display: grid !important;
      gap: 0.35rem !important;
      min-width: 0 !important;
    }

    body .weapon-dashboard .search-box span,
    body .weapon-dashboard .select-box span {
      color: rgba(184, 198, 216, 0.76) !important;
      font-size: 0.72rem !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
    }

    body .weapon-dashboard input,
    body .weapon-dashboard select {
      min-height: 2.85rem !important;
      border: 1px solid rgba(120, 143, 170, 0.2) !important;
      border-radius: 0.4rem !important;
      background: #0d131c !important;
      color: #f7fbff !important;
      font-weight: 850 !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.035) !important;
    }

    body .toolbar.enhanced-filter-toolbar,
    body #filterToolbar {
      margin-bottom: 0.86rem !important;
      padding: 0.52rem !important;
      border-radius: 0.5rem !important;
      border-color: rgba(120,143,170,0.16) !important;
      background: rgba(8, 12, 18, 0.78) !important;
    }

    body #resultCount[data-filter-count],
    body #resultCount {
      display: block !important;
      min-height: 1.25rem !important;
      margin: 0.15rem 0 0.72rem !important;
      color: #b9ff3d !important;
      font-weight: 950 !important;
    }

    body #loadoutGrid {
      gap: 1.12rem !important;
      contain: layout paint !important;
    }

    body #loadoutGrid .meta-tier-heading {
      --tier-heading-color: #ffd35a;
      --tier-heading-rgb: 255, 211, 90;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 1rem !important;
      min-height: 4.8rem !important;
      margin: 1.25rem 0 0.52rem !important;
      padding: 1.05rem 1.25rem !important;
      border: 1px solid rgba(var(--tier-heading-rgb), 0.48) !important;
      border-left: 1.15rem solid var(--tier-heading-color) !important;
      border-radius: 0.52rem !important;
      background:
        linear-gradient(90deg, rgba(var(--tier-heading-rgb), 0.34), rgba(var(--tier-heading-rgb), 0.13) 38%, rgba(255,255,255,0.03)),
        #0d131c !important;
      box-shadow:
        0 1rem 2rem rgba(0,0,0,0.34),
        0 0 2.35rem rgba(var(--tier-heading-rgb), 0.18),
        inset 0 0 0 1px rgba(var(--tier-heading-rgb), 0.12) !important;
    }

    body #loadoutGrid .meta-tier-heading span {
      color: var(--tier-heading-color) !important;
      font-family: Rajdhani, Inter, system-ui, sans-serif !important;
      font-size: 1.72rem !important;
      font-weight: 950 !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
      text-shadow: 0 0 1.35rem rgba(var(--tier-heading-rgb), 0.5) !important;
    }

    body #loadoutGrid .meta-tier-heading small {
      color: var(--tier-heading-color) !important;
      font-size: 0.88rem !important;
      font-weight: 950 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .meta-tier-heading.tier-heading-meta {
      --tier-heading-color: #ffd35a;
      --tier-heading-rgb: 255, 211, 90;
      min-height: 5.15rem !important;
      border-left-width: 1.35rem !important;
      background:
        linear-gradient(90deg, rgba(255,211,90,0.46), rgba(255,173,55,0.18) 42%, rgba(255,255,255,0.04)),
        #14120b !important;
      box-shadow:
        0 1.25rem 2.4rem rgba(0,0,0,0.38),
        0 0 3.1rem rgba(255,211,90,0.24),
        inset 0 0 0 1px rgba(255,211,90,0.18) !important;
    }

    body #loadoutGrid .meta-tier-heading.tier-heading-a { --tier-heading-color: #35d7ff; --tier-heading-rgb: 53, 215, 255; }
    body #loadoutGrid .meta-tier-heading.tier-heading-b { --tier-heading-color: #ffcf4a; --tier-heading-rgb: 255, 207, 74; }
    body #loadoutGrid .meta-tier-heading.tier-heading-c { --tier-heading-color: #b08cff; --tier-heading-rgb: 176, 140, 255; }
    body #loadoutGrid .meta-tier-heading.tier-heading-d { --tier-heading-color: #ff6f91; --tier-heading-rgb: 255, 111, 145; }

    body #loadoutGrid .loadout-card {
      --tier-card-color: #9aa4b4;
      --tier-card-rgb: 154, 164, 180;
      position: relative !important;
      display: grid !important;
      grid-template-columns: clamp(12rem, 16vw, 14.8rem) minmax(0, 1fr) clamp(5.6rem, 7vw, 6.7rem) !important;
      grid-template-rows: auto auto auto !important;
      align-items: start !important;
      gap: 1rem 1.25rem !important;
      min-height: 10.8rem !important;
      padding: 1.15rem 1.35rem 1rem !important;
      overflow: clip !important;
      border: 1px solid rgba(var(--tier-card-rgb), 0.34) !important;
      border-left: 0.68rem solid var(--tier-card-color) !important;
      border-radius: 0.56rem !important;
      outline: 0 !important;
      background:
        linear-gradient(120deg, rgba(var(--tier-card-rgb), 0.14), rgba(13,19,28,0.92) 24%, rgba(8,12,18,0.98)),
        #101620 !important;
      box-shadow:
        0 0.95rem 2rem rgba(0,0,0,0.32),
        0 0 1.65rem rgba(var(--tier-card-rgb), 0.11),
        inset 0 1px 0 rgba(255,255,255,0.045) !important;
      transform: none !important;
      transition: border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease !important;
    }

    body #loadoutGrid .loadout-card:hover {
      border-color: rgba(var(--tier-card-rgb), 0.58) !important;
      box-shadow:
        0 1.1rem 2.3rem rgba(0,0,0,0.36),
        0 0 2.2rem rgba(var(--tier-card-rgb), 0.16),
        inset 0 1px 0 rgba(255,255,255,0.055) !important;
    }

    body #loadoutGrid .loadout-card.tier-card-meta,
    body #loadoutGrid .loadout-card.tier-absolute-meta {
      --tier-card-color: #ffd35a;
      --tier-card-rgb: 255, 211, 90;
      background:
        linear-gradient(120deg, rgba(255,211,90,0.18), rgba(21,25,17,0.9) 24%, rgba(9,13,18,0.98)),
        #111720 !important;
    }

    body #loadoutGrid .loadout-card.tier-card-a { --tier-card-color: #35d7ff; --tier-card-rgb: 53, 215, 255; }
    body #loadoutGrid .loadout-card.tier-card-b { --tier-card-color: #ffcf4a; --tier-card-rgb: 255, 207, 74; }
    body #loadoutGrid .loadout-card.tier-card-c { --tier-card-color: #b08cff; --tier-card-rgb: 176, 140, 255; }
    body #loadoutGrid .loadout-card.tier-card-d { --tier-card-color: #ff6f91; --tier-card-rgb: 255, 111, 145; }

    body #loadoutGrid > .loadout-card:nth-child(-n + 3),
    body #loadoutGrid > .loadout-card:nth-child(1),
    body #loadoutGrid > .loadout-card:nth-child(2) {
      transform: none !important;
      outline: 0 !important;
      border-left-color: var(--tier-card-color) !important;
    }

    body #loadoutGrid .weapon-art,
    body .loadout-grid .loadout-card .weapon-art,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
      grid-column: 1 !important;
      grid-row: 1 !important;
      width: 100% !important;
      max-width: none !important;
      height: 7.05rem !important;
      margin: 0 !important;
      border: 1px solid rgba(var(--tier-card-rgb), 0.18) !important;
      border-radius: 0.46rem !important;
      overflow: hidden !important;
      background:
        radial-gradient(circle at 50% 82%, rgba(var(--tier-card-rgb), 0.12), transparent 58%),
        rgba(3,5,9,0.82) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04) !important;
      transform: none !important;
    }

    body #loadoutGrid .weapon-art img,
    body .loadout-grid .loadout-card .weapon-art img,
    body #loadoutGrid .loadout-card:hover .weapon-art img {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      object-fit: contain !important;
      object-position: center center !important;
      padding: 0.08rem !important;
      transform: none !important;
      filter: brightness(1.08) contrast(1.06) saturate(1.08) drop-shadow(0 0.45rem 0.55rem rgba(0,0,0,0.38)) !important;
      transition: none !important;
      animation: none !important;
    }

    body #loadoutGrid .card-body {
      grid-column: 2 !important;
      grid-row: 1 !important;
      min-width: 0 !important;
      padding-right: 0 !important;
      align-self: start !important;
    }

    body #loadoutGrid .card-title-row {
      min-width: 0 !important;
    }

    body #loadoutGrid .mode-pill {
      display: inline-flex !important;
      width: fit-content !important;
      max-width: 100% !important;
      min-height: 1.55rem !important;
      align-items: center !important;
      margin: 0 0 0.45rem !important;
      padding: 0.22rem 0.62rem !important;
      border: 1px solid rgba(var(--tier-card-rgb), 0.22) !important;
      border-radius: 999px !important;
      background: rgba(var(--tier-card-rgb), 0.08) !important;
      color: var(--tier-card-color) !important;
      font-size: 0.76rem !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      letter-spacing: 0 !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
    }

    body #loadoutGrid .weapon-name {
      max-width: min(100%, 48rem) !important;
      margin: 0 0 0.52rem !important;
      color: #f8fbff !important;
      font-size: 2.35rem !important;
      font-weight: 950 !important;
      letter-spacing: 0 !important;
      line-height: 0.95 !important;
      overflow-wrap: anywhere !important;
      text-shadow: 0 1px 0 rgba(0,0,0,0.5) !important;
    }

    body #loadoutGrid .meta-score-pill {
      display: inline-grid !important;
      grid-template-columns: auto auto auto !important;
      width: fit-content !important;
      min-height: 2.75rem !important;
      align-items: stretch !important;
      margin: 0 0 0.58rem !important;
      overflow: hidden !important;
      border: 1px solid rgba(var(--tier-card-rgb), 0.7) !important;
      border-radius: 0.48rem !important;
      background: rgba(5,8,12,0.82) !important;
      box-shadow: 0 0 0 1px rgba(var(--tier-card-rgb),0.12), 0 0.75rem 1.35rem rgba(var(--tier-card-rgb),0.12) !important;
    }

    body #loadoutGrid .meta-score-pill span {
      display: inline-grid !important;
      place-items: center !important;
      padding: 0.32rem 0.62rem !important;
      background: rgba(var(--tier-card-rgb), 0.18) !important;
      color: var(--tier-card-color) !important;
      font-size: 0.7rem !important;
      font-weight: 950 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .meta-score-pill strong {
      display: inline-grid !important;
      place-items: center !important;
      padding: 0.18rem 0.12rem 0.16rem 0.58rem !important;
      color: #fff !important;
      font-family: Rajdhani, Inter, system-ui, sans-serif !important;
      font-size: 2rem !important;
      font-weight: 950 !important;
      line-height: 0.9 !important;
    }

    body #loadoutGrid .meta-score-pill em {
      display: inline-grid !important;
      place-items: end center !important;
      padding: 0.18rem 0.62rem 0.43rem 0.08rem !important;
      color: var(--tier-card-color) !important;
      font-size: 0.74rem !important;
      font-style: normal !important;
      font-weight: 950 !important;
    }

    body #loadoutGrid .stat-row {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.45rem !important;
      margin: 0 !important;
    }

    body #loadoutGrid .stat-row span {
      display: inline-flex !important;
      width: fit-content !important;
      min-height: 2rem !important;
      align-items: center !important;
      gap: 0.42rem !important;
      padding: 0.24rem 0.62rem !important;
      border: 1px solid rgba(255,255,255,0.075) !important;
      border-radius: 999px !important;
      background: rgba(4,7,10,0.52) !important;
      white-space: nowrap !important;
    }

    body #loadoutGrid .stat-row em {
      color: rgba(255,255,255,0.58) !important;
      font-size: 0.68rem !important;
      font-style: normal !important;
      font-weight: 950 !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .stat-row strong {
      color: #f8fbff !important;
      font-size: 0.94rem !important;
      font-weight: 950 !important;
      line-height: 1 !important;
    }

    body #loadoutGrid .rank-badge,
    body .loadout-grid .loadout-card .rank-badge,
    body .tier-group .loadout-card .rank-badge {
      position: static !important;
      grid-column: 3 !important;
      grid-row: 1 !important;
      justify-self: end !important;
      align-self: start !important;
      display: grid !important;
      width: 6.35rem !important;
      min-width: 6.35rem !important;
      height: 6.35rem !important;
      min-height: 6.35rem !important;
      place-items: center !important;
      padding: 0.66rem !important;
      border: 2px solid rgba(var(--tier-card-rgb), 0.78) !important;
      border-radius: 0.48rem !important;
      background: linear-gradient(135deg, var(--tier-card-color), rgba(255,255,255,0.72)) !important;
      color: #080b08 !important;
      font-family: Rajdhani, Inter, system-ui, sans-serif !important;
      font-size: 2.55rem !important;
      font-weight: 950 !important;
      letter-spacing: 0 !important;
      line-height: 0.82 !important;
      text-align: center !important;
      box-shadow: 0 0.95rem 1.8rem rgba(var(--tier-card-rgb), 0.18), 0 0 1.45rem rgba(var(--tier-card-rgb), 0.2) !important;
    }

    body #loadoutGrid .rank-badge span,
    body .loadout-grid .loadout-card .rank-badge span,
    body .tier-group .loadout-card .rank-badge span {
      display: block !important;
      margin: 0.36rem 0 0 !important;
      border: 0 !important;
      padding: 0 !important;
      color: rgba(8,11,8,0.78) !important;
      font-family: Inter, system-ui, sans-serif !important;
      font-size: 0.68rem !important;
      font-weight: 950 !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      text-transform: none !important;
    }

    body #loadoutGrid .rank-badge::after,
    body .loadout-grid .loadout-card .rank-badge::after,
    body .tier-group .loadout-card .rank-badge::after {
      content: none !important;
      display: none !important;
    }

    body #loadoutGrid .card-footer {
      grid-column: 1 / -1 !important;
      grid-row: 3 !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.72rem !important;
      margin: 0 !important;
      padding-top: 0.92rem !important;
      border-top: 1px solid rgba(255,255,255,0.075) !important;
    }

    body #loadoutGrid .card-footer .range,
    body #loadoutGrid .tag-list {
      display: none !important;
    }

    body #loadoutGrid .expand-button {
      min-width: 7.8rem !important;
      min-height: 2.75rem !important;
      border: 1px solid rgba(var(--tier-card-rgb), 0.48) !important;
      border-radius: 0.4rem !important;
      background: linear-gradient(135deg, rgba(var(--tier-card-rgb),0.16), rgba(var(--tier-card-rgb),0.07)), #101620 !important;
      color: #fff !important;
      font-weight: 950 !important;
      transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease !important;
    }

    body #loadoutGrid .expand-button:hover,
    body #loadoutGrid .expand-button:focus-visible,
    body #loadoutGrid .loadout-card.expanded .expand-button {
      border-color: rgba(var(--tier-card-rgb), 0.88) !important;
      background: var(--tier-card-color) !important;
      color: #071008 !important;
      outline: none !important;
    }

    body #loadoutGrid .expand-button svg {
      width: 1.18rem !important;
      height: 1.18rem !important;
      fill: currentColor !important;
    }

    body #loadoutGrid .card-details,
    body #loadoutGrid .meta-card-details {
      grid-column: 1 / -1 !important;
      grid-row: 2 !important;
      width: 100% !important;
      max-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      transition: opacity 120ms ease !important;
    }

    body #loadoutGrid .loadout-card.expanded .card-details,
    body #loadoutGrid .loadout-card.expanded .meta-card-details {
      display: block !important;
      max-height: none !important;
      padding-top: 0.75rem !important;
      overflow: visible !important;
      opacity: 1 !important;
    }

    body #loadoutGrid .premium-details-grid {
      display: grid !important;
      grid-template-columns: minmax(0, 1.25fr) minmax(15rem, 0.75fr) !important;
      gap: 0.85rem !important;
    }

    body #loadoutGrid .detail-panel,
    body #loadoutGrid .detail-source-row,
    body #loadoutGrid .build-code-box {
      border-color: rgba(var(--tier-card-rgb), 0.24) !important;
    }

    @media (max-width: 980px) {
      body #loadoutGrid .loadout-card {
        grid-template-columns: minmax(10.5rem, 13rem) minmax(0, 1fr) auto !important;
      }

      body #loadoutGrid .weapon-name {
        font-size: 2.05rem !important;
      }

      body #loadoutGrid .premium-details-grid {
        grid-template-columns: 1fr !important;
      }
    }

    @media (max-width: 760px) {
      body #loadouts.section,
      body section#loadouts {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }

      body .weapon-dashboard .controls {
        grid-template-columns: 1fr !important;
      }

      body #loadoutGrid .meta-tier-heading {
        min-height: 4rem !important;
        padding: 0.9rem 1rem !important;
        border-left-width: 0.82rem !important;
      }

      body #loadoutGrid .meta-tier-heading span {
        font-size: 1.32rem !important;
      }

      body #loadoutGrid .meta-tier-heading small {
        font-size: 0.76rem !important;
      }

      body #loadoutGrid .loadout-card {
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 0.85rem !important;
        min-height: 0 !important;
        padding: 0.95rem !important;
        border-left-width: 0.55rem !important;
      }

      body #loadoutGrid .weapon-art,
      body .loadout-grid .loadout-card .weapon-art,
      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
        grid-column: 1 !important;
        width: 100% !important;
        height: 8.2rem !important;
        padding-right: 5.25rem !important;
      }

      body #loadoutGrid .card-body,
      body #loadoutGrid .card-details,
      body #loadoutGrid .meta-card-details,
      body #loadoutGrid .card-footer {
        grid-column: 1 !important;
      }

      body #loadoutGrid .rank-badge,
      body .loadout-grid .loadout-card .rank-badge,
      body .tier-group .loadout-card .rank-badge {
        position: absolute !important;
        top: 1rem !important;
        right: 1rem !important;
        width: 4.75rem !important;
        min-width: 4.75rem !important;
        height: 4.75rem !important;
        min-height: 4.75rem !important;
        font-size: 2rem !important;
      }

      body #loadoutGrid .weapon-name {
        font-size: 1.9rem !important;
        padding-right: 0 !important;
      }

      body #loadoutGrid .meta-score-pill strong {
        font-size: 1.72rem !important;
      }

      body #loadoutGrid .card-footer {
        align-items: stretch !important;
      }

      body #loadoutGrid .expand-button {
        width: 100% !important;
      }
    }
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
  }

  function buttonLabel(expanded) {
    const isEnglish = localStorage.getItem("loadoutLabLang") === "en" || document.documentElement.lang === "en";
    return expanded ? (isEnglish ? "Close" : "Schliessen") : "Details";
  }

  function setExpanded(card, expanded) {
    if (!card) return;
    const button = card.querySelector(".expand-button");
    const panel = card.querySelector(".meta-card-details, .card-details");
    card.classList.toggle("expanded", expanded);
    if (button) {
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      const label = button.querySelector("span");
      if (label) label.textContent = buttonLabel(expanded);
    }
    if (panel) {
      panel.hidden = false;
      panel.style.display = expanded ? "block" : "";
    }
  }

  function fixDetailsButton(button, intended) {
    const card = button && button.closest(".loadout-card");
    if (!card) return;
    window.setTimeout(() => {
      const handled = card.classList.contains("expanded") === intended || button.getAttribute("aria-expanded") === String(intended);
      const finalState = handled ? intended : !card.classList.contains("expanded");
      setExpanded(card, finalState);
      window.setTimeout(() => setExpanded(card, finalState), 80);
    }, 45);
  }

  function polishCards() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      const rankText = card.querySelector(".rank-badge")?.childNodes?.[0]?.textContent || "";
      const rank = (rankText.match(/\d+/) || [""])[0];
      if (rank) card.dataset.rank = rank;
      card.querySelectorAll(".weapon-name, .mode-pill, .stat-row em, .stat-row strong, .rank-badge, .rank-badge span").forEach((node) => {
        node.style.letterSpacing = "0";
      });
      const panel = card.querySelector(".meta-card-details, .card-details");
      if (panel) panel.hidden = false;
      const expanded = card.classList.contains("expanded") || card.querySelector(".expand-button")?.getAttribute("aria-expanded") === "true";
      setExpanded(card, expanded);
    });
  }

  function schedule(delay = 80) {
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(polishCards, delay);
  }

  function bindEvents() {
    if (window.__loadoutCardPolishReady) return;
    window.__loadoutCardPolishReady = true;

    document.addEventListener("click", (event) => {
      const button = event.target.closest("#loadoutGrid .expand-button");
      if (button) {
        const card = button.closest(".loadout-card");
        const intended = !(card?.classList.contains("expanded") || button.getAttribute("aria-expanded") === "true");
        fixDetailsButton(button, intended);
        return;
      }
      if (event.target.closest("#filterToolbar, .secondary-mode-switch, .content-tab[data-tab='weapons'], [data-language]")) {
        schedule(90);
        window.setTimeout(polishCards, 280);
        window.setTimeout(polishCards, 760);
      }
    }, true);

    document.addEventListener("input", (event) => {
      if (event.target.closest("#loadoutSearch")) schedule(130);
    }, true);

    document.addEventListener("change", (event) => {
      if (event.target.closest("#sortSelect")) schedule(120);
    }, true);
  }

  function watchGrid() {
    const grid = document.getElementById("loadoutGrid");
    if (!grid || grid.dataset.cardPolishObserved === "true") return;
    grid.dataset.cardPolishObserved = "true";
    new MutationObserver(() => schedule(60)).observe(grid, { childList: true, subtree: true });
  }

  function init() {
    installStyle();
    bindEvents();
    watchGrid();
    polishCards();
    window.setTimeout(watchGrid, 450);
    window.setTimeout(polishCards, 450);
    window.setTimeout(polishCards, 1250);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
