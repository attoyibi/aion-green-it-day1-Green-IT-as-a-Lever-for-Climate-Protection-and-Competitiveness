// Case B — NordCom Services GmbH. Task 3, level L2.
// N1: every fact string ships verbatim from the case description.
// N3: nothing here may leak into /learn or /training.

import type { CaseBrief, ContextTile, HeroImage, Hotspot, Zone } from "./case-shared";
import { overlay, overlayById } from "@/lib/i18nData";

export const HERO_IMAGE: HeroImage = {
  src: "/assets/nordcom-hero.jpeg",
  width: 2048,
  height: 1117,
  alt:
    "Case study board for NordCom Services GmbH. On the left, the company: an office building in a city, a diagram joining cloud services and a small internal data centre to decentralised procurement, and a manager holding papers marked cost pressure, supply chain issues and high project load. On the right, six titled panels showing high energy use, rapid device replacement, procurement without green criteria, missing Green IT KPIs, pressure from a large customer, and a demand for quick results rather than symbolic gestures.",
};

export const BRIEF: CaseBrief = {
  name: "NordCom Services GmbH",
  lines: [
    "A medium-sized IT service provider with 600 employees. The company operates hybrid IT structures, uses cloud services, runs a small internal data centre, and procures end devices in a decentralised way.",
    "On the customer side, requirements for evidence of sustainability are increasing. At the same time there is cost pressure, supply bottlenecks, and a heavy project workload.",
  ],
};

/** The pressures drawn on the papers in the manager's hands. Not findings — the setting. */
export const CONTEXT: ContextTile[] = [
  { id: "ctx-cost", text: "Cost pressure." },
  { id: "ctx-supply", text: "Supply bottlenecks." },
  { id: "ctx-projects", text: "Heavy project workload." },
];

/** The company block on the left of the board: building, profile tag and city. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "NordCom Services GmbH: company brief and context",
  x: 3,
  y: 15.5,
  w: 20,
  h: 37,
};

/**
 * Nine findings. Six are the titled panels down the right of the board, so the
 * panel itself is the click target. Three are points on the company scene,
 * which is drawn as one continuous illustration and has no panel borders.
 *
 * Order is the contract: the list view and the board share it.
 */
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-energy",
    label: "High energy use",
    x: 65.1,
    y: 17.6,
    panel: { x: 53.7, y: 1.1, w: 22.8, h: 33 },
    categories: ["E"],
    fact: "High electricity consumption in internal IT operations.",
    onTheImage:
      "A manager holds an energy bill beside a rising bar chart, with the server room lit behind her.",
  },
  {
    id: "hs-devices",
    label: "Rapid device replacement",
    x: 88.5,
    y: 17.6,
    panel: { x: 77.2, y: 1.1, w: 22.5, h: 33 },
    categories: ["R", "U"],
    fact: "End devices are frequently replaced although they would still be technically usable.",
    onTheImage:
      "Stacked laptops tagged for disposal after only two years of use, while a colleague still works on an older one.",
  },
  {
    id: "hs-procurement",
    label: "Procurement without green criteria",
    x: 65.1,
    y: 51.1,
    panel: { x: 53.7, y: 34.8, w: 22.8, h: 32.6 },
    categories: ["G"],
    fact: "Sustainability criteria are missing in IT procurement.",
    onTheImage:
      "Two buyers compare laptops on price and delivery speed, with ecolabels and efficiency set aside.",
  },
  {
    id: "hs-kpi",
    label: "No Green IT KPIs and no clear responsibilities",
    x: 88.5,
    y: 51.1,
    panel: { x: 77.2, y: 34.8, w: 22.5, h: 32.6 },
    categories: ["G"],
    fact: "There are no Green IT KPIs and no clear responsibilities.",
    onTheImage:
      "A blank whiteboard headed Green IT Report, and nobody in the room able to say who owns it.",
  },
  {
    id: "hs-customer",
    label: "Pressure from a major customer",
    x: 65.1,
    y: 83.7,
    panel: { x: 53.7, y: 68.3, w: 22.8, h: 30.7 },
    categories: ["G"],
    fact:
      "A major customer demands robust statements on IT's contribution to sustainability.",
    onTheImage:
      "A customer on a video call asking for clear proof of Green IT, with the alternative named: another vendor.",
  },
  {
    id: "hs-quick-results",
    label: "Quick results, not symbolic politics",
    x: 88.5,
    y: 83.7,
    panel: { x: 77.2, y: 68.3, w: 22.5, h: 30.7 },
    categories: ["G"],
    fact: "Management wants quick results, but no symbolic politics.",
    onTheImage:
      "A manager asking for quick and real results rather than empty public relations.",
  },
  {
    id: "hs-hybrid",
    label: "Hybrid IT structure",
    x: 37.5,
    y: 26,
    categories: ["E", "Em"],
    fact:
      "The company runs a hybrid IT structure: cloud services alongside a small internal data centre.",
    onTheImage:
      "A diagram joining a cloud and a server cabinet, with arrows running into the same small data centre.",
  },
  {
    id: "hs-decentralised",
    label: "Decentralised procurement",
    x: 48,
    y: 27.5,
    categories: ["G"],
    fact: "End devices are procured in a decentralised way (each site orders its own).",
    onTheImage:
      "Two colleagues choosing devices at their own desk, drawn as a third input to the same IT structure.",
  },
  {
    id: "hs-demand",
    label: "Rising customer demand",
    x: 31,
    y: 89,
    categories: ["G"],
    fact: "Rising customer demand for evidence of sustainability across the market.",
    onTheImage:
      "A banner across the foot of the company scene, above a growing stack of customer paperwork.",
  },
];

// ---------------------------------------------------------------------------
// Task 3 — the assignment printed under the board.
// ---------------------------------------------------------------------------

export const TASK3 = {
  number: "Task 3, Level 2: Application",
  title: "Green IT between cost pressure and competitiveness",
  lead:
    "You are advising the management of NordCom Services GmbH. Everything you need is on the board above: nine findings and the setting they sit in. Nothing else is given, and nothing else is needed.",
  assignment: [
    {
      id: "t3-1",
      text: "Analyse the initial situation from the perspectives of operations, procurement, use, governance and competitiveness.",
      hint: "You have five perspectives and nine findings. One finding can belong to more than one perspective, and one perspective can hold several findings.",
    },
    {
      id: "t3-2",
      text: "Identify four action areas that become priorities.",
      hint: "Group the findings together. You want four areas, not nine measures. If you end up with nine, you have listed symptoms instead of areas.",
    },
    {
      id: "t3-3",
      text: "Draw up an initial Green IT recommendation for management, with short-term and medium-term steps.",
      hint: "Short-term means you could start it now with the people you already have. Medium-term means it first needs a decision, a budget or a supplier.",
    },
    {
      id: "t3-4",
      text: "Decide which step should be carried out first.",
      hint: "Choose one step. The panel below records your choice and responds to it before it shows you the key.",
    },
    {
      id: "t3-5",
      text: "Justify your decision with regard to impact, risk and feasibility.",
      hint: "Cover all three. A step with high impact but no feasibility is a wish, not a decision.",
    },
    {
      id: "t3-6",
      text: "Formulate a proposal for anchoring responsibility and control organisationally.",
      hint: "Say who decides, who reports, and how often. A name on its own, with no reporting line, is not an anchor.",
    },
  ],
  objectiveHeading: "Objective",
  objective:
    "Participants learn to analyse Green IT in a way that is fit for management, not merely to review it technically.",
};

/** The four action areas the key proposes. The learner picks which runs first. */
export type ActionArea = {
  id: string;
  title: string;
  summary: string;
  /** What the choice buys, stated without praise. */
  strength: string;
  /** What it costs or leaves open. Every option has one. */
  tradeoff: string;
};

export const ACTION_AREAS: ActionArea[] = [
  {
    id: "aa-governance",
    title: "Establish Green IT governance with clear roles and a target picture",
    summary:
      "Appoint someone responsible, define minimum indicators, and agree what the company is steering towards.",
    strength:
      "It creates the basis on which every later decision is made, and it is the only measure here that costs almost nothing to start.",
    tradeoff:
      "It produces no visible saving in the first weeks. Management asked for quick results, and a role description does not look like one. If you choose this, attach the baseline to it so your first deliverable is a number rather than an org chart.",
  },
  {
    id: "aa-transparency",
    title: "Create transparency over energy and resource use",
    summary:
      "Record what the internal data centre draws, and what devices exist across the sites and how old they are.",
    strength:
      "It answers the customer with evidence instead of intent, and it is what turns every later claim into a defensible one.",
    tradeoff:
      "Numbers with no owner land on nobody's desk. Without the roles agreed alongside, a baseline gets collected once, is read by the person who collected it, and is out of date before anyone acts on it.",
  },
  {
    id: "aa-procurement",
    title: "Prepare sustainable procurement and extend device life cycles",
    summary:
      "Draft procurement guidelines, and set a lifetime strategy for devices that are replaced while still usable.",
    strength:
      "It addresses the most visible waste on the board, and device lifetime is the lever with the clearest resource effect.",
    tradeoff:
      "Procurement here is decentralised. A guideline issued into that structure is only a document, not a control. Until someone has the authority to apply it, each team keeps buying the way it already buys.",
  },
  {
    id: "aa-infrastructure",
    title: "Optimise infrastructure and cloud use step by step",
    summary:
      "Work through the hybrid structure: what runs in the small data centre, what runs in the cloud, and what runs twice.",
    strength:
      "This is where the energy consumption on the board actually sits, so the ceiling on what can be saved is highest here.",
    tradeoff:
      "It is an investment decision, and you have no baseline to size it against. Choosing this first is exactly the hurried single investment the case warns about: if it works you cannot prove it, and if it misses you cannot say by how much.",
  },
];

export const KEY = {
  core:
    "The greatest leverage does not lie in a single hurried investment, but first in building the ability to steer.",
  firstStep:
    "Build Green IT governance together with baseline collection, before larger investments are made.",
  reasons: [
    "It creates a basis for decisions.",
    "It prevents misinvestment.",
    "It makes it possible to set priorities.",
    "It improves the ability to argue internally and externally.",
  ],
  shortTerm: [
    "Appoint someone responsible.",
    "Define minimum indicators.",
    "Record the device inventory and service lives.",
    "Draft procurement guidelines.",
  ],
  mediumTerm: [
    "A lifetime strategy for devices.",
    "Energy optimisation in IT operations.",
    "Integration into ESG and sustainability reporting.",
    "An investment roadmap for the prioritised measures.",
  ],
  /** Said out loud so the key is not read as a verdict on the other three. */
  honesty:
    "The other three areas are not wrong, and two of them carry more measurable effect than this one. They are not first because none of them can be sized, defended or enforced until this one exists.",
};

// ---------------------------------------------------------------------------
// German. Structure (ids, x/y, panel, categories, order) is never duplicated
// here — only translatable text, merged onto the English source.
// ---------------------------------------------------------------------------

export const HERO_IMAGE_DE = overlay(HERO_IMAGE, {
  alt: "Fallstudien-Tafel für NordCom Services GmbH. Links das Unternehmen: ein Bürogebäude in einer Stadt, ein Diagramm, das Cloud-Dienste und ein kleines internes Rechenzentrum mit dezentraler Beschaffung verbindet, sowie eine Führungskraft mit Unterlagen, beschriftet mit Kostendruck, Lieferkettenproblemen und hoher Projektauslastung. Rechts sechs betitelte Felder mit hohem Energieverbrauch, schnellem Gerätewechsel, Beschaffung ohne grüne Kriterien, fehlenden Green-IT-KPIs, Druck von einem Großkunden und der Forderung nach schnellen Ergebnissen statt symbolischer Gesten.",
});

export const BRIEF_DE: CaseBrief = overlay(BRIEF, {
  lines: [
    "Ein mittelständischer IT-Dienstleister mit 600 Mitarbeitenden. Das Unternehmen betreibt hybride IT-Strukturen, nutzt Cloud-Dienste, betreibt ein kleines internes Rechenzentrum und beschafft Endgeräte dezentral.",
    "Auf Kundenseite steigen die Anforderungen an Nachweise zur Nachhaltigkeit. Gleichzeitig bestehen Kostendruck, Lieferengpässe und eine hohe Projektauslastung.",
  ],
});

export const CONTEXT_DE = overlayById(CONTEXT, {
  "ctx-cost": { text: "Kostendruck." },
  "ctx-supply": { text: "Lieferengpässe." },
  "ctx-projects": { text: "Hohe Projektauslastung." },
});

export const COMPANY_ZONE_DE = overlay(COMPANY_ZONE, {
  label: "NordCom Services GmbH: Kurzprofil und Kontext",
});

export const HOTSPOTS_DE = overlayById(HOTSPOTS, {
  "hs-energy": {
    label: "Hoher Energieverbrauch",
    fact: "Hoher Stromverbrauch im internen IT-Betrieb.",
    onTheImage:
      "Eine Führungskraft hält eine Stromrechnung neben einem ansteigenden Balkendiagramm, im Hintergrund ist der beleuchtete Serverraum zu sehen.",
  },
  "hs-devices": {
    label: "Schneller Gerätewechsel",
    fact: "Endgeräte werden häufig ausgetauscht, obwohl sie technisch noch nutzbar wären.",
    onTheImage:
      "Gestapelte Laptops, nach nur zwei Jahren Nutzung zur Entsorgung markiert, während ein Kollege noch an einem älteren Gerät arbeitet.",
  },
  "hs-procurement": {
    label: "Beschaffung ohne grüne Kriterien",
    fact: "In der IT-Beschaffung fehlen Nachhaltigkeitskriterien.",
    onTheImage:
      "Zwei Einkäufer vergleichen Laptops nach Preis und Lieferzeit, Umweltsiegel und Effizienz bleiben unberücksichtigt.",
  },
  "hs-kpi": {
    label: "Keine Green-IT-KPIs und keine klaren Zuständigkeiten",
    fact: "Es gibt keine Green-IT-KPIs und keine klaren Zuständigkeiten.",
    onTheImage:
      "Ein leeres Whiteboard mit der Überschrift Green-IT-Report, niemand im Raum kann sagen, wer dafür zuständig ist.",
  },
  "hs-customer": {
    label: "Druck von einem Großkunden",
    fact: "Ein Großkunde fordert belastbare Aussagen zum Beitrag der IT zur Nachhaltigkeit.",
    onTheImage:
      "Ein Kunde fordert in einer Videokonferenz klare Nachweise für Green IT, die Alternative wird benannt: ein anderer Anbieter.",
  },
  "hs-quick-results": {
    label: "Schnelle Ergebnisse statt Symbolpolitik",
    fact: "Das Management will schnelle Ergebnisse, aber keine Symbolpolitik.",
    onTheImage:
      "Eine Führungskraft fordert schnelle, echte Ergebnisse statt leerer Öffentlichkeitsarbeit.",
  },
  "hs-hybrid": {
    label: "Hybride IT-Struktur",
    fact: "Das Unternehmen betreibt eine hybride IT-Struktur: Cloud-Dienste neben einem kleinen internen Rechenzentrum.",
    onTheImage:
      "Ein Diagramm, das eine Cloud und einen Serverschrank verbindet, mit Pfeilen in dasselbe kleine Rechenzentrum.",
  },
  "hs-decentralised": {
    label: "Dezentrale Beschaffung",
    fact: "Endgeräte werden dezentral beschafft (jeder Standort bestellt eigenständig).",
    onTheImage:
      "Zwei Kollegen wählen Geräte am eigenen Schreibtisch aus, dargestellt als dritter Zufluss in dieselbe IT-Struktur.",
  },
  "hs-demand": {
    label: "Steigende Kundennachfrage",
    fact: "Steigende Kundennachfrage nach Nachhaltigkeitsnachweisen im gesamten Markt.",
    onTheImage:
      "Ein Banner am unteren Rand der Unternehmensszene, über einem wachsenden Stapel Kundenunterlagen.",
  },
});

export const TASK3_DE = overlay(TASK3, {
  number: "Aufgabe 3, Stufe 2: Anwendung",
  title: "Green IT zwischen Kostendruck und Wettbewerbsfähigkeit",
  lead: "Du berätst die Geschäftsführung von NordCom Services GmbH. Alles, was du brauchst, steht oben auf der Tafel: neun Befunde und der Rahmen, in dem sie stehen. Mehr wird nicht vorgegeben, und mehr wird nicht gebraucht.",
  assignment: overlayById(TASK3.assignment, {
    "t3-1": {
      text: "Analysiere die Ausgangslage aus den Perspektiven Betrieb, Beschaffung, Nutzung, Governance und Wettbewerbsfähigkeit.",
      hint: "Du hast fünf Perspektiven und neun Befunde. Ein Befund kann zu mehr als einer Perspektive gehören, und eine Perspektive kann mehrere Befunde enthalten.",
    },
    "t3-2": {
      text: "Bestimme vier Handlungsfelder, die zu Prioritäten werden.",
      hint: "Fasse die Befunde zusammen. Du willst vier Felder, nicht neun Maßnahmen. Wenn du bei neun landest, hast du Symptome statt Handlungsfelder aufgelistet.",
    },
    "t3-3": {
      text: "Erarbeite eine erste Green-IT-Empfehlung für die Geschäftsführung mit kurzfristigen und mittelfristigen Schritten.",
      hint: "Kurzfristig bedeutet, dass du es jetzt mit dem vorhandenen Personal beginnen könntest. Mittelfristig bedeutet, dass zuerst eine Entscheidung, ein Budget oder ein Lieferant nötig ist.",
    },
    "t3-4": {
      text: "Entscheide, welcher Schritt zuerst umgesetzt werden soll.",
      hint: "Wähle einen Schritt. Das Feld unten erfasst deine Wahl und reagiert darauf, bevor es dir die Musterlösung zeigt.",
    },
    "t3-5": {
      text: "Begründe deine Entscheidung hinsichtlich Wirkung, Risiko und Umsetzbarkeit.",
      hint: "Berücksichtige alle drei. Ein Schritt mit hoher Wirkung, aber ohne Umsetzbarkeit, ist ein Wunsch, keine Entscheidung.",
    },
    "t3-6": {
      text: "Formuliere einen Vorschlag, wie Verantwortung und Steuerung organisatorisch verankert werden.",
      hint: "Sage, wer entscheidet, wer berichtet und wie oft. Ein Name allein, ohne Berichtsweg, ist keine Verankerung.",
    },
  }),
  objectiveHeading: "Ziel",
  objective:
    "Die Teilnehmenden lernen, Green IT managementgerecht zu analysieren, statt sie nur technisch zu betrachten.",
});

export const ACTION_AREAS_DE: ActionArea[] = overlayById(ACTION_AREAS, {
  "aa-governance": {
    title: "Green-IT-Governance mit klaren Rollen und einem Zielbild aufbauen",
    summary:
      "Eine verantwortliche Person benennen, Mindestindikatoren festlegen und vereinbaren, worauf das Unternehmen zusteuert.",
    strength:
      "Es schafft die Grundlage, auf der jede spätere Entscheidung aufbaut, und ist die einzige Maßnahme hier, die im Start fast nichts kostet.",
    tradeoff:
      "Es bringt in den ersten Wochen keine sichtbare Einsparung. Das Management wollte schnelle Ergebnisse, und eine Rollenbeschreibung wirkt nicht danach. Wenn du dich dafür entscheidest, verknüpfe es mit der Datenerhebung, damit dein erstes Ergebnis eine Zahl ist und kein Organigramm.",
  },
  "aa-transparency": {
    title: "Transparenz über Energie- und Ressourcenverbrauch schaffen",
    summary:
      "Erfassen, wie viel das interne Rechenzentrum verbraucht und welche Geräte an den Standorten vorhanden sind und wie alt sie sind.",
    strength:
      "Es beantwortet die Kundenanfrage mit Nachweisen statt Absichtserklärungen und macht jede spätere Aussage belastbar.",
    tradeoff:
      "Zahlen ohne Verantwortliche landen auf niemandes Schreibtisch. Ohne parallel vereinbarte Rollen wird eine Datenbasis einmal erhoben, nur von der erhebenden Person gelesen und ist veraltet, bevor jemand danach handelt.",
  },
  "aa-procurement": {
    title: "Nachhaltige Beschaffung vorbereiten und Gerätelebenszyklen verlängern",
    summary:
      "Beschaffungsrichtlinien entwerfen und eine Lebensdauerstrategie für Geräte festlegen, die noch nutzbar ausgetauscht werden.",
    strength:
      "Es adressiert die sichtbarste Verschwendung auf der Tafel, und die Gerätelebensdauer ist der Hebel mit der klarsten Wirkung auf Ressourcen.",
    tradeoff:
      "Die Beschaffung ist hier dezentral organisiert. Eine Richtlinie in dieser Struktur ist nur ein Dokument, keine Kontrolle. Solange niemand die Befugnis hat, sie durchzusetzen, kauft jedes Team weiter wie bisher.",
  },
  "aa-infrastructure": {
    title: "Infrastruktur und Cloud-Nutzung schrittweise optimieren",
    summary:
      "Die hybride Struktur durcharbeiten: was im kleinen Rechenzentrum läuft, was in der Cloud läuft und was doppelt läuft.",
    strength:
      "Hier liegt der eigentliche Energieverbrauch auf der Tafel, deshalb ist das Einsparpotenzial hier am größten.",
    tradeoff:
      "Es ist eine Investitionsentscheidung, und dir fehlt eine Datenbasis, um sie zu bemessen. Dies zuerst zu wählen ist genau die überstürzte Einzelinvestition, vor der der Fall warnt: Gelingt sie, kannst du es nicht belegen, misslingt sie, kannst du nicht sagen, um wie viel.",
  },
});

export const KEY_DE = overlay(KEY, {
  core: "Der größte Hebel liegt nicht in einer einzelnen überstürzten Investition, sondern zuerst im Aufbau der Steuerungsfähigkeit.",
  firstStep:
    "Green-IT-Governance gemeinsam mit der Datenerhebung aufbauen, bevor größere Investitionen getätigt werden.",
  reasons: [
    "Es schafft eine Entscheidungsgrundlage.",
    "Es verhindert Fehlinvestitionen.",
    "Es ermöglicht, Prioritäten zu setzen.",
    "Es verbessert die Argumentationsfähigkeit nach innen und außen.",
  ],
  shortTerm: [
    "Eine verantwortliche Person benennen.",
    "Mindestindikatoren festlegen.",
    "Geräteinventar und Nutzungsdauern erfassen.",
    "Beschaffungsrichtlinien entwerfen.",
  ],
  mediumTerm: [
    "Eine Lebensdauerstrategie für Geräte.",
    "Energieoptimierung im IT-Betrieb.",
    "Einbindung in ESG- und Nachhaltigkeitsberichterstattung.",
    "Eine Investitions-Roadmap für die priorisierten Maßnahmen.",
  ],
  honesty:
    "Die anderen drei Handlungsfelder sind nicht falsch, und zwei von ihnen haben eine messbarere Wirkung als dieses. Sie stehen nicht an erster Stelle, weil keines von ihnen bemessen, verteidigt oder durchgesetzt werden kann, solange dieses hier nicht existiert.",
});
