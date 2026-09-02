// Case A — MediPrint Solutions. Section 6.A of the build prompt.
// N1: every string here ships verbatim. Do not paraphrase or translate.

import type { CategoryCode } from "./categories";
import type { ContextTile, Hotspot, Initiative, Zone } from "./case-shared";
import { overlay, overlayById } from "@/lib/i18nData";

export type { ContextTile, Hotspot, Initiative, Zone };

export const HERO_IMAGE = {
  src: "/assets/mediprint-hero.jpeg",
  width: 2048,
  height: 1117,
  alt:
    "Cutaway illustration of the MediPrint Solutions offices: a server room, a print area, an open-plan workspace, a boardroom, a project presentation room, a basement store of old devices, a procurement sign and a cloud icon, with a category legend down the left side.",
};

export const BRIEF = {
  name: "MediPrint Solutions",
  lines: [
    "280 employees, two sites, own server room, device renewal every three years, high volume of printing, growing cloud use, no sustainability strategy in IT.",
  ],
};

export const CONTEXT: ContextTile[] = [
  { id: "ctx-elec-rising", text: "Electricity costs are rising significantly." },
  {
    id: "ctx-mgmt-asking",
    text:
      "Management is asking for the first time about IT's contribution to sustainability.",
  },
  {
    id: "ctx-projects-fnspd",
    text: "IT projects are assessed only in terms of functionality and speed.",
  },
];

// Order is the contract: the list view and the hero share it.
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-server-room",
    label: "Server room",
    x: 62.5,
    y: 29,
    categories: ["E"],
    fact:
      "Own server room on site. Runs continuously; cooling and uptime are the operational priority.",
    onTheImage:
      "Racks lit red behind two large cooling fans, with heat rising from the cabinet on the left.",
  },
  {
    id: "hs-elec-meter",
    label: "Electricity meter",
    x: 73,
    y: 11.5,
    categories: ["E"],
    fact: "Electricity costs are rising significantly.",
    onTheImage: "A wall chart with a red line climbing steeply to the right.",
  },
  {
    id: "hs-cloud",
    label: "Cloud services",
    x: 56.5,
    y: 82.5,
    categories: ["E", "Em"],
    fact:
      "Growing cloud use. Compute and storage are shifting to external providers whose energy mix is not tracked here.",
    onTheImage:
      "A cloud icon above the basement servers, with arrows running between the two.",
  },
  {
    id: "hs-devices-3yr",
    label: "Workplace devices",
    x: 82.5,
    y: 49,
    categories: ["R"],
    fact: "Regular device renewal every three years across the workforce.",
    onTheImage:
      "A speech bubble over the boardroom noting the three-year renewal cycle.",
  },
  {
    id: "hs-basement",
    label: "Basement storage",
    x: 31,
    y: 89,
    categories: ["R"],
    fact: "Many old devices are stored unused in the basement.",
    onTheImage:
      "A pile of old monitors, towers and keyboards under a single hanging lamp.",
  },
  {
    id: "hs-print",
    label: "Print area",
    x: 57.5,
    y: 63,
    categories: ["R", "Em"],
    fact: "High volume of printing.",
    onTheImage:
      "Two copiers beside stacks of paper reaching desk height, with staff feeding them.",
  },
  {
    id: "hs-procurement",
    label: "Procurement desk",
    x: 43,
    y: 86,
    categories: ["G"],
    fact: "There are no rules for procurement or device service life.",
    onTheImage: "A post sign standing at the edge of the basement.",
  },
  {
    id: "hs-boardroom",
    label: "Boardroom",
    x: 85.5,
    y: 64,
    categories: ["G"],
    fact: "No sustainability strategy in IT.",
    onTheImage:
      "Four people around a glass-walled meeting table, one of them presenting.",
  },
  {
    id: "hs-project-lens",
    label: "Project intake board",
    x: 88.5,
    y: 84,
    categories: ["G"],
    fact: "IT projects are assessed only in terms of functionality and speed.",
    onTheImage:
      "A projector screen in the room at the lower right, read out by a presenter.",
  },
];

/**
 * Clickable regions drawn into the artwork itself, so the illustration can
 * carry the brief and the legend instead of a sidebar repeating them.
 * All four values are percentages of the image box.
 */
/** The building carrying the MediPrint logo. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "MediPrint Solutions: company brief and context",
  x: 24,
  y: 9,
  w: 17,
  h: 36,
};

/** The five category arrows already printed down the left of the artwork. */
export const CATEGORY_ZONES: (Zone & { code: CategoryCode })[] = [
  { id: "zone-cat-e", code: "E", label: "Topic area: Energy", x: 2.5, y: 19.5, w: 16, h: 8.5 },
  { id: "zone-cat-r", code: "R", label: "Topic area: Resources", x: 2.5, y: 28, w: 16, h: 8.5 },
  { id: "zone-cat-em", code: "Em", label: "Topic area: Emissions", x: 2.5, y: 37.5, w: 16, h: 8.5 },
  { id: "zone-cat-u", code: "U", label: "Topic area: Use", x: 2.5, y: 47.5, w: 16, h: 8.5 },
  {
    id: "zone-cat-g",
    code: "G",
    label: "Topic area: Organisation & Governance",
    x: 2.5,
    y: 57.5,
    w: 16,
    h: 10,
  },
];

// --- Task 2 support panels, rendered below the hero on the same page. ---

/**
 * "Three initiatives on the table". Titles and bodies are verbatim (N1).
 * The reasoning fields under them are the material Worksheet 2 Section C
 * needs: rank the three, one sentence of reason each. They describe each
 * option on its own terms and never name a rank.
 */
export const INITIATIVES: Initiative[] = [
  {
    id: "init-A",
    title: "Initiative A — New devices",
    body: "Replacing all workplace devices with new energy-efficient models.",
    letter: "A",
    impact:
      "Cuts the electricity a device draws, which is the cost the meter on the wall is already showing. Against that, every new device carries the carbon of making it, and the devices being replaced still work.",
    feasibility:
      "One large purchase, and the budget is limited. Nothing about it is technically hard; the whole question is whether the money is there and whether this is what it should buy.",
    buys: "The most visible answer. New equipment is something the board can see this quarter.",
    costs:
      "It is the largest spend of the three, and the one hardest to size without figures: the data on energy consumption is incomplete, so there is no baseline to say what it saved. It also replaces devices before the end of their service life, which is the effect Initiative B exists to stop.",
    conditions: ["cond-budget", "cond-data", "cond-board"],
  },
  {
    id: "init-B",
    title: "Initiative B — Rules for devices & procurement",
    body: "Introducing rules for device service life, reuse and sustainable procurement.",
    letter: "B",
    impact:
      "Applies to every future purchase rather than one, and it reaches both things the illustration shows: the three-year renewal cycle and the devices lying unused in the basement.",
    feasibility:
      "A policy question rather than a technical one, so it can be drafted with the people already here. Purchasing is sceptical about new requirements, so the rule has to be agreed with them, not sent to them.",
    buys: "It stops the pattern that fills the basement, and it costs little to write.",
    costs:
      "A rule is only a rule if someone can apply it. Without an owner and agreed metrics, it is a document that Purchasing can decline to act on, and the IT department's staff capacity is already heavily utilised.",
    conditions: ["cond-purchasing", "cond-capacity"],
  },
  {
    id: "init-C",
    title: "Initiative C — Green IT steering committee",
    body: "Establishing a Green IT steering committee with metrics, responsibilities and targets.",
    letter: "C",
    impact:
      "Produces no kilowatt-hour by itself. What it produces is the metrics the other two are judged by, and a named responsibility where the description currently says there is no sustainability strategy in IT.",
    feasibility:
      "The cheapest of the three to start, and it unblocks what comes after it: the incomplete data on energy consumption is the thing metrics and responsibilities are for.",
    buys:
      "The ability to steer: something to measure against, and someone answerable for it. Every later decision is made on that basis.",
    costs:
      "In the first weeks it shows no saving. The board is asking for results that are visible in the short term, and a committee with targets does not look like one — so it has to produce a number early, not an org chart.",
    conditions: ["cond-data", "cond-board", "cond-capacity"],
  },
];

/**
 * The model ranking for Section C, shown only after the learner commits their
 * own. It follows the line this module states in Case B as well: the leverage
 * is in being able to steer before the money is spent. `honesty` is there for
 * the same reason it is in NordCom's key — the other orders are defensible,
 * and a learner who defends one should not read this as a verdict.
 */
export const INITIATIVE_KEY = {
  core:
    "The greatest leverage is not the largest purchase. It is being able to say, afterwards, what the purchase changed.",
  /** First to third, by initiative id. */
  order: ["init-C", "init-B", "init-A"],
  why: {
    "init-C":
      "First, because it is what the other two are measured by. It is the cheapest to start, and the description says there is no sustainability strategy in IT and no rules for procurement — both of those are missing decisions, not missing equipment.",
    "init-B":
      "Second, because it binds the moment of buying, which is the only moment a device's service life is actually set. Put it after C and it arrives with an owner behind it; put it before, and Purchasing can treat it as a suggestion.",
    "init-A":
      "Last, because it is the largest spend and the one that needs the other two to be defensible. Once C is measuring and B has set the service life, this stops being a replacement of working devices and becomes a sized decision.",
  } as Record<string, string>,
  axis:
    "On W5's matrix, C and B are both high feasibility. What separates them from A is not impact — A may well save the most electricity — but that A cannot be sized while the data situation is incomplete.",
  honesty:
    "B first is defensible, and some rooms will argue it: it is concrete, it is visible, and it stops the waste the illustration shows. It is a weaker answer only if it goes in without anyone to enforce it. A first is the hard one to defend — say what you would measure it against.",
};

/** "General conditions" — flat pills, non-category, non-hotspot. */
export const CONDITIONS: ContextTile[] = [
  { id: "cond-budget", text: "The budget is limited." },
  {
    id: "cond-data",
    text: "The data situation regarding energy consumption is incomplete.",
  },
  {
    id: "cond-board",
    text: "The board demands results that are visible in the short term.",
  },
  {
    id: "cond-capacity",
    text: "The IT department's staff capacity is heavily utilised.",
  },
  {
    id: "cond-purchasing",
    text: "Purchasing is sceptical about new requirements.",
  },
];

// ---------------------------------------------------------------------------
// German. Structure (ids, x/y, categories, order) is never duplicated here —
// only translatable text, merged onto the English source via overlay/overlayById.
// ---------------------------------------------------------------------------

export const HERO_IMAGE_DE = overlay(HERO_IMAGE, {
  alt: "Schnittdarstellung der Büros von MediPrint Solutions: ein Serverraum, ein Druckbereich, ein Großraumbüro, ein Besprechungsraum, ein Raum für Projektpräsentationen, ein Keller mit alten Geräten, ein Beschaffungsschild und ein Cloud-Symbol, mit einer Kategorie-Legende am linken Rand.",
});

export const BRIEF_DE = overlay(BRIEF, {
  lines: [
    "280 Mitarbeitende, zwei Standorte, eigener Serverraum, Geräteerneuerung alle drei Jahre, hohes Druckaufkommen, wachsende Cloud-Nutzung, keine Nachhaltigkeitsstrategie in der IT.",
  ],
});

export const CONTEXT_DE = overlayById(CONTEXT, {
  "ctx-elec-rising": { text: "Die Stromkosten steigen deutlich." },
  "ctx-mgmt-asking": {
    text: "Das Management fragt zum ersten Mal nach dem Beitrag der IT zur Nachhaltigkeit.",
  },
  "ctx-projects-fnspd": {
    text: "IT-Projekte werden nur nach Funktionalität und Geschwindigkeit bewertet.",
  },
});

export const HOTSPOTS_DE = overlayById(HOTSPOTS, {
  "hs-server-room": {
    label: "Serverraum",
    fact: "Eigener Serverraum vor Ort. Läuft durchgehend; Kühlung und Verfügbarkeit haben betrieblich Priorität.",
    onTheImage:
      "Rot beleuchtete Racks hinter zwei großen Kühlventilatoren, mit aufsteigender Hitze aus dem Schrank links.",
  },
  "hs-elec-meter": {
    label: "Stromzähler",
    fact: "Die Stromkosten steigen deutlich.",
    onTheImage: "Ein Wandschaubild mit einer steil nach rechts ansteigenden roten Linie.",
  },
  "hs-cloud": {
    label: "Cloud-Dienste",
    fact: "Wachsende Cloud-Nutzung. Rechenleistung und Speicher verlagern sich zu externen Anbietern, deren Energiemix hier nicht erfasst wird.",
    onTheImage: "Ein Cloud-Symbol über den Servern im Keller, mit Pfeilen zwischen beiden.",
  },
  "hs-devices-3yr": {
    label: "Arbeitsplatzgeräte",
    fact: "Regelmäßige Geräteerneuerung alle drei Jahre für die gesamte Belegschaft.",
    onTheImage:
      "Eine Sprechblase über dem Besprechungsraum mit dem Hinweis auf den Dreijahres-Erneuerungszyklus.",
  },
  "hs-basement": {
    label: "Kellerlager",
    fact: "Viele alte Geräte lagern ungenutzt im Keller.",
    onTheImage: "Ein Stapel alter Monitore, Tower-Gehäuse und Tastaturen unter einer einzelnen Hängelampe.",
  },
  "hs-print": {
    label: "Druckbereich",
    fact: "Hohes Druckaufkommen.",
    onTheImage:
      "Zwei Kopierer neben schreibtischhohen Papierstapeln, die von Mitarbeitenden befüllt werden.",
  },
  "hs-procurement": {
    label: "Beschaffungsstelle",
    fact: "Es gibt keine Regeln für Beschaffung oder Nutzungsdauer von Geräten.",
    onTheImage: "Ein Hinweisschild am Rand des Kellers.",
  },
  "hs-boardroom": {
    label: "Besprechungsraum",
    fact: "Keine Nachhaltigkeitsstrategie in der IT.",
    onTheImage:
      "Vier Personen an einem Besprechungstisch mit Glaswänden, eine Person präsentiert.",
  },
  "hs-project-lens": {
    label: "Projektaufnahme-Tafel",
    fact: "IT-Projekte werden nur nach Funktionalität und Geschwindigkeit bewertet.",
    onTheImage: "Eine Projektionsfläche im Raum unten rechts, vorgetragen von einer präsentierenden Person.",
  },
});

export const COMPANY_ZONE_DE = overlay(COMPANY_ZONE, {
  label: "MediPrint Solutions: Kurzprofil und Kontext",
});

export const CATEGORY_ZONES_DE = overlayById(CATEGORY_ZONES, {
  "zone-cat-e": { label: "Themenbereich: Energie" },
  "zone-cat-r": { label: "Themenbereich: Ressourcen" },
  "zone-cat-em": { label: "Themenbereich: Emissionen" },
  "zone-cat-u": { label: "Themenbereich: Nutzung" },
  "zone-cat-g": { label: "Themenbereich: Organisation & Governance" },
});

export const INITIATIVES_DE = overlayById(INITIATIVES, {
  "init-A": {
    title: "Initiative A — Neue Geräte",
    body: "Ersetzen aller Arbeitsplatzgeräte durch neue, energieeffiziente Modelle.",
    impact:
      "Senkt den Stromverbrauch pro Gerät, also genau die Kosten, die der Zähler an der Wand bereits zeigt. Dem steht gegenüber: Jedes neue Gerät trägt die Emissionen seiner Herstellung, und die ersetzten Geräte funktionieren noch.",
    feasibility:
      "Eine einzige große Anschaffung, und das Budget ist begrenzt. Technisch ist daran nichts schwierig; die ganze Frage ist, ob das Geld da ist und ob es dafür ausgegeben werden sollte.",
    buys: "Die sichtbarste Antwort. Neue Geräte sind etwas, das der Vorstand noch in diesem Quartal sehen kann.",
    costs:
      "Es ist die größte Ausgabe der drei und die, die sich ohne Zahlen am schwersten bemessen lässt: Die Datenlage zum Energieverbrauch ist unvollständig, es gibt also keine Ausgangsbasis, um zu sagen, was eingespart wurde. Außerdem werden Geräte vor Ende ihrer Nutzungsdauer ersetzt — genau der Effekt, den Initiative B verhindern soll.",
  },
  "init-B": {
    title: "Initiative B — Regeln für Geräte & Beschaffung",
    body: "Einführung von Regeln für Nutzungsdauer, Wiederverwendung und nachhaltige Beschaffung von Geräten.",
    impact:
      "Gilt für jeden künftigen Kauf statt für einen einzigen und erreicht beides, was die Illustration zeigt: den Dreijahres-Erneuerungszyklus und die ungenutzt im Keller liegenden Geräte.",
    feasibility:
      "Eine Frage der Regeln, nicht der Technik, lässt sich also mit den vorhandenen Leuten entwerfen. Der Einkauf steht neuen Anforderungen skeptisch gegenüber, die Regel muss deshalb mit ihm vereinbart und nicht an ihn geschickt werden.",
    buys: "Es stoppt das Muster, das den Keller füllt, und kostet wenig, es aufzuschreiben.",
    costs:
      "Eine Regel ist nur dann eine Regel, wenn jemand sie anwenden kann. Ohne Verantwortliche und vereinbarte Kennzahlen ist sie ein Dokument, dessen Umsetzung der Einkauf ablehnen kann — und die personellen Kapazitäten der IT-Abteilung sind bereits stark ausgelastet.",
  },
  "init-C": {
    title: "Initiative C — Green-IT-Lenkungsausschuss",
    body: "Einrichtung eines Green-IT-Lenkungsausschusses mit Kennzahlen, Verantwortlichkeiten und Zielen.",
    impact:
      "Erzeugt für sich genommen keine einzige Kilowattstunde. Was er erzeugt, sind die Kennzahlen, an denen die beiden anderen gemessen werden, und eine benannte Verantwortung dort, wo die Beschreibung bisher sagt: keine Nachhaltigkeitsstrategie in der IT.",
    feasibility:
      "Der günstigste Start der drei, und er macht den Weg für das Folgende frei: Die unvollständige Datenlage zum Energieverbrauch ist genau das, wofür Kennzahlen und Verantwortlichkeiten da sind.",
    buys:
      "Die Fähigkeit zu steuern: etwas, woran gemessen wird, und jemand, der dafür geradesteht. Jede spätere Entscheidung baut darauf auf.",
    costs:
      "In den ersten Wochen zeigt er keine Einsparung. Der Vorstand fordert kurzfristig sichtbare Ergebnisse, und ein Ausschuss mit Zielen sieht nicht danach aus — er muss also früh eine Zahl liefern, kein Organigramm.",
  },
});

export const INITIATIVE_KEY_DE: typeof INITIATIVE_KEY = {
  core:
    "Der größte Hebel ist nicht die größte Anschaffung. Es ist die Fähigkeit, hinterher sagen zu können, was die Anschaffung verändert hat.",
  order: INITIATIVE_KEY.order,
  why: {
    "init-C":
      "Zuerst, weil daran die beiden anderen gemessen werden. Der Start ist am günstigsten, und die Beschreibung sagt: keine Nachhaltigkeitsstrategie in der IT und keine Regeln für die Beschaffung — beides sind fehlende Entscheidungen, keine fehlenden Geräte.",
    "init-B":
      "An zweiter Stelle, weil sie den Moment des Kaufens bindet, den einzigen Moment, in dem die Nutzungsdauer eines Geräts tatsächlich festgelegt wird. Nach C eingeordnet kommt sie mit einer Verantwortung im Rücken; davor kann der Einkauf sie als Vorschlag behandeln.",
    "init-A":
      "Zuletzt, weil sie die größte Ausgabe ist und die beiden anderen braucht, um vertretbar zu sein. Sobald C misst und B die Nutzungsdauer gesetzt hat, ist das kein Austausch funktionierender Geräte mehr, sondern eine bemessene Entscheidung.",
  },
  axis:
    "Auf der Matrix aus W5 haben C und B beide eine hohe Machbarkeit. Was sie von A trennt, ist nicht die Wirkung — A spart womöglich am meisten Strom —, sondern dass sich A nicht bemessen lässt, solange die Datenlage unvollständig ist.",
  honesty:
    "B zuerst ist vertretbar, und in manchen Runden wird genau das vertreten: Es ist konkret, es ist sichtbar, und es stoppt die Verschwendung, die die Illustration zeigt. Schwächer ist diese Antwort nur, wenn die Regel ohne jemanden eingeführt wird, der sie durchsetzt. A zuerst ist die schwer zu verteidigende Wahl — sag, woran du sie messen würdest.",
};

export const CONDITIONS_DE = overlayById(CONDITIONS, {
  "cond-budget": { text: "Das Budget ist begrenzt." },
  "cond-data": { text: "Die Datenlage zum Energieverbrauch ist unvollständig." },
  "cond-board": { text: "Der Vorstand fordert kurzfristig sichtbare Ergebnisse." },
  "cond-capacity": { text: "Die personellen Kapazitäten der IT-Abteilung sind stark ausgelastet." },
  "cond-purchasing": { text: "Der Einkauf steht neuen Anforderungen skeptisch gegenüber." },
});
