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

/** "Three initiatives on the table" — read-only, no ranking, no recommendation. */
export const INITIATIVES: Initiative[] = [
  {
    id: "init-A",
    title: "Initiative A — New devices",
    body: "Replacing all workplace devices with new energy-efficient models.",
  },
  {
    id: "init-B",
    title: "Initiative B — Rules for devices & procurement",
    body: "Introducing rules for device service life, reuse and sustainable procurement.",
  },
  {
    id: "init-C",
    title: "Initiative C — Green IT steering committee",
    body: "Establishing a Green IT steering committee with metrics, responsibilities and targets.",
  },
];

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
  },
  "init-B": {
    title: "Initiative B — Regeln für Geräte & Beschaffung",
    body: "Einführung von Regeln für Nutzungsdauer, Wiederverwendung und nachhaltige Beschaffung von Geräten.",
  },
  "init-C": {
    title: "Initiative C — Green-IT-Lenkungsausschuss",
    body: "Einrichtung eines Green-IT-Lenkungsausschusses mit Kennzahlen, Verantwortlichkeiten und Zielen.",
  },
});

export const CONDITIONS_DE = overlayById(CONDITIONS, {
  "cond-budget": { text: "Das Budget ist begrenzt." },
  "cond-data": { text: "Die Datenlage zum Energieverbrauch ist unvollständig." },
  "cond-board": { text: "Der Vorstand fordert kurzfristig sichtbare Ergebnisse." },
  "cond-capacity": { text: "Die personellen Kapazitäten der IT-Abteilung sind stark ausgelastet." },
  "cond-purchasing": { text: "Der Einkauf steht neuen Anforderungen skeptisch gegenüber." },
});
