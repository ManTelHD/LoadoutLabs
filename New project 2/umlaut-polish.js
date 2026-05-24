(function () {
  const replacements = [
    [/Aufsaetze/g, "Aufsätze"],
    [/Aufsatz/g, "Aufsatz"],
    [/geprueft/g, "geprüft"],
    [/Geprueft/g, "Geprüft"],
    [/oeffnen/g, "öffnen"],
    [/Oeffnen/g, "Öffnen"],
    [/fuer/g, "für"],
    [/Fuer/g, "Für"],
    [/staerker/g, "stärker"],
    [/Staerker/g, "Stärker"],
    [/staerkerem/g, "stärkerem"],
    [/Rueckstoss/g, "Rückstoß"],
    [/Rueckstoß/g, "Rückstoß"],
    [/zurueck/g, "zurück"],
    [/Zurueck/g, "Zurück"],
    [/waehlen/g, "wählen"],
    [/auswaehlen/g, "auswählen"],
    [/groesser/g, "größer"],
    [/Groesser/g, "Größer"],
    [/Geruechte/g, "Gerüchte"],
    [/geruechte/g, "gerüchte"],
  ];

  function normalizeText(value) {
    let next = value;
    for (const [pattern, replacement] of replacements) {
      next = next.replace(pattern, replacement);
    }
    return next;
  }

  function normalizeNodeText(node) {
    if (!node.nodeValue || !/(ae|oe|ue|Ae|Oe|Ue|Aufsaetze|Geprueft|Rueck)/.test(node.nodeValue)) return;
    const next = normalizeText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function normalizeAttributes(element) {
    for (const name of ["aria-label", "alt", "placeholder", "title"]) {
      if (!element.hasAttribute?.(name)) continue;
      const current = element.getAttribute(name);
      const next = normalizeText(current || "");
      if (next !== current) element.setAttribute(name, next);
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      normalizeNodeText(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) normalizeAttributes(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE && /^(SCRIPT|STYLE|CODE|PRE)$/i.test(node.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.TEXT_NODE) normalizeNodeText(node);
      else normalizeAttributes(node);
    }
  }

  function cleanWeaponCards(root = document) {
    root.querySelectorAll?.("#loadoutGrid .perk-list li").forEach((item) => {
      if (/^\s*(Pair|Quelle)\s*:/i.test(item.textContent || "")) item.remove();
    });
    root.querySelectorAll?.("#loadoutGrid .loadout-card > .role, #loadoutGrid .loadout-card .card-main > .role, #loadoutGrid .loadout-card .card-body > .role, #loadoutGrid .loadout-card .meta-card-details > .role, #loadoutGrid .loadout-card .card-details > .role").forEach((item) => item.remove());
  }

  function injectStyle() {
    if (document.querySelector("#umlaut-polish-style")) return;
    const style = document.createElement("style");
    style.id = "umlaut-polish-style";
    style.textContent = `
      body .primary-mode-switch .mw4-mode-button::before {
        content: "Gerüchte" !important;
      }

      body #loadoutGrid .loadout-card > .role,
      body #loadoutGrid .loadout-card .card-main > .role,
      body #loadoutGrid .loadout-card .card-body > .role,
      body #loadoutGrid .loadout-card .meta-card-details > .role,
      body #loadoutGrid .loadout-card .card-details > .role {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function run() {
    injectStyle();
    walk(document.body);
    cleanWeaponCards(document);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(walk);
      if (mutation.type === "characterData") normalizeNodeText(mutation.target);
    }
    cleanWeaponCards(document);
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  window.setTimeout(run, 120);
  window.setTimeout(run, 600);
  window.setTimeout(run, 1600);
}());
