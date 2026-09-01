// Case C — Auron Digital Group. Task 4, level L3.
// N1: every fact string ships verbatim from the case description.
// Section 12 — pre-metric: capacity is counted in abstract points, never in
// currency, kWh or CO2. The shortfall is the exercise, not a missing figure.

import type { CaseBrief, ContextTile, HeroImage, Hotspot, Zone } from "./case-shared";
import { overlay, overlayById } from "@/lib/i18nData";

export const HERO_IMAGE: HeroImage = {
  src: "/assets/auron-hero.jpeg",
  width: 2048,
  height: 1117,
  alt:
    "Case study board for Auron Digital Group. On the left, the company: a growing skyline with several site codes and a construction crane, rising growth arrows, a crowd of customers and board members holding signs, a glowing electricity meter, a pile of mismatched servers in tangled cabling, and Maya, the IT strategy lead. On the right, six titled panels showing a fast-growing business model, conflicting goals across departments, incomplete data, a limited budget, time pressure from a reporting deadline, and a celebration over a server labelled green that is only symbolic.",
};

export const BRIEF: CaseBrief = {
  name: "Auron Digital Group",
  lines: [
    "You are the IT strategy lead (or CTO advisor) for Auron Digital Group. Auron is a strongly growing company with several sites, rising energy costs, an inconsistent IT landscape, and increasing pressure from customers and supervisory bodies to address sustainability in a comprehensible way.",
    "Maya, the IT strategy lead drawn at the centre of the board, is the person whose desk this lands on. From here, the decisions are yours.",
  ],
};

/** What the role is expected to produce. Stated up front so the task is not a guessing game. */
export const DELIVERABLE =
  "A management proposal that is ready to be decided on.";

export const CONTEXT: ContextTile[] = [
  { id: "ctx-role", text: "Your role: IT strategy lead / CTO advisor." },
  { id: "ctx-sites", text: "Several sites, drawn as site codes across the skyline." },
  {
    id: "ctx-trace",
    text: "Sustainability must be addressed in a comprehensible way, not merely asserted.",
  },
];

/** The board's title banner, which names the company and the status. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "Auron Digital Group: the big picture and your role",
  x: 2,
  y: 12.5,
  w: 41,
  h: 6,
};

/**
 * Ten findings. Six are the titled panels down the right — the framework
 * conditions the decision has to survive. Four are points on the company
 * scene, which carries the state of the IT itself.
 *
 * Most of the panels tag as Organisation & Governance. That is not a tagging
 * failure: at L3 the subject is how decisions get made, not what the hardware
 * draws. The category filter is meant to show that.
 */
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-growth-model",
    label: "Strongly growing business model",
    x: 65.5,
    y: 21.5,
    panel: { x: 54.5, y: 7.3, w: 22, h: 28.4 },
    categories: ["G", "E"],
    fact: "A strongly growing business model.",
    onTheImage:
      "A rising chart on the wall and staff moving at speed, with growth treated as the given condition.",
  },
  {
    id: "hs-conflicting-goals",
    label: "Conflicting goals",
    x: 88.4,
    y: 21.5,
    panel: { x: 77.2, y: 7.3, w: 22.3, h: 28.4 },
    categories: ["G"],
    fact: "Differing interests of IT, purchasing, finance and management.",
    onTheImage:
      "Five people around one table calling for profit, new technology, lower cost and affordability at once, labelled management and purchasing.",
  },
  {
    id: "hs-incomplete-data",
    label: "Incomplete data",
    x: 65.5,
    y: 52.3,
    panel: { x: 54.5, y: 36.7, w: 22, h: 31.1 },
    categories: ["G"],
    fact: "The data situation is incomplete.",
    onTheImage:
      "A half-filled spreadsheet and a dashboard of broken readings, with question marks where the values should be.",
  },
  {
    id: "hs-limited-budget",
    label: "Limited budget",
    x: 88.4,
    y: 52.3,
    panel: { x: 77.2, y: 36.7, w: 22.3, h: 31.1 },
    categories: ["G"],
    fact: "The budget is limited.",
    onTheImage:
      "A safe holding a small amount of money, with competing requests for Green IT, energy and reports pointing at it.",
  },
  {
    id: "hs-time-pressure",
    label: "Time pressure from market requirements",
    x: 65.5,
    y: 84.1,
    panel: { x: 54.5, y: 68.7, w: 22, h: 30.8 },
    categories: ["G"],
    fact: "Time pressure from market requirements and reporting obligations.",
    onTheImage:
      "A clock beside a sustainability reporting deadline marked as due now.",
  },
  {
    id: "hs-symbolic",
    label: "Quick wins and the danger of symbolic action",
    x: 88.4,
    y: 84.1,
    panel: { x: 77.2, y: 68.7, w: 22.3, h: 30.8 },
    categories: ["G"],
    fact:
      "A desire for quick wins, but the danger of symbolic individual actions.",
    onTheImage:
      "Confetti over a server with a green label stuck on it, and an unconvinced colleague calling it only symbolic.",
  },
  {
    id: "hs-multi-site",
    label: "Growth across several sites",
    x: 20,
    y: 30,
    categories: ["E", "Em"],
    fact: "The company is growing fast and operates several sites.",
    onTheImage:
      "A skyline still under construction, with site codes floating over it and growth arrows climbing through.",
  },
  {
    id: "hs-stakeholders",
    label: "Customer and board pressure",
    x: 42,
    y: 31,
    categories: ["G"],
    fact:
      "Increasing pressure from customers and the supervisory board to address sustainability in a way that can be traced.",
    onTheImage:
      "A crowd holding signs reading sustainability now and funding for reports, labelled customers and board members.",
  },
  {
    id: "hs-uneven-it",
    label: "Non-uniform IT landscape",
    x: 13,
    y: 80,
    categories: ["R", "U"],
    fact: "The IT landscape is not uniform.",
    onTheImage:
      "A pile of mismatched servers and boxes of different generations, joined by tangled cabling.",
  },
  {
    id: "hs-energy-costs",
    label: "Rising energy costs",
    x: 29,
    y: 78,
    categories: ["E"],
    fact: "Energy costs are rising.",
    onTheImage:
      "A large electricity meter glowing at the centre of the scene, its needle swung well up the dial.",
  },
];

// ---------------------------------------------------------------------------
// Task 4 — the assignment printed under the board.
// ---------------------------------------------------------------------------

export const TASK4 = {
  number: "Task 4, Level 3: Management decision",
  title: "Building a Green IT decision architecture for a growing company",
  lead:
    "Draw up a management proposal that is ready to be decided on. The board above holds every condition it has to survive. There is no configuration that satisfies all of them, and the capacity below does not cover the requirement. That is the task, not a fault in it.",
  assignment: [
    {
      id: "t4-1",
      text: "Why is Green IT strategically relevant for this company?",
      hint: "Strategically, not technically. If your answer would read the same for any company, it is not yet about Auron.",
    },
    {
      id: "t4-2",
      text: "By what criteria should Green IT decisions be taken in future?",
      hint: "Criteria outlast measures. These are what the next decision gets judged against once you have left the room.",
    },
    {
      id: "t4-3",
      text: "Which three core decisions must management take?",
      hint: "Three that only management can take. Anything the IT department could decide alone does not belong here.",
    },
    {
      id: "t4-4",
      text: "Where do the most important goal conflicts lie between sustainability, economic value, speed and user demands?",
      hint: "Name a conflict with two legitimate sides. If your sentence resolves itself, you have named a preference, not a conflict.",
    },
    {
      id: "t4-5",
      text: "Which decision must be taken now despite incomplete information?",
      hint: "Waiting is also a decision, and it also has a price. If you defer, say what the deferral costs.",
    },
    {
      id: "t4-6",
      text: "How should responsibility be divided organisationally?",
      hint: "Who decides, who delivers, who reports. Expertise without authority produces advice, not steering.",
    },
    {
      id: "t4-7",
      text: "What does a prioritised 12-month roadmap look like?",
      hint: "Prioritised means some things sit late on purpose. The allocation panel below is where you commit to that.",
    },
  ],
  seniorHeading: "Senior-level requirement",
  senior:
    "Take at least one decision that you consciously answer for under incomplete information, and explain it from a management perspective.",
  objectiveHeading: "Objective",
  objectives: [
    "Think in the logic of steering, not in single measures.",
    "Take responsibility for goal conflicts.",
    "Justify decisions in a way that is fit for management.",
    "Shift perspective into the roles of chief officer, architect, department head, manager and consultant.",
    "Move from memorised knowledge towards decision architecture and accountability.",
  ],
};

// ---------------------------------------------------------------------------
// The allocation. Capacity is deliberately short of the requirement.
// ---------------------------------------------------------------------------

export const CAPACITY_TOTAL = 10;

export type Measure = {
  id: string;
  title: string;
  cost: number;
  /** What funding it buys. */
  buys: string;
  /** What stays open if it is left out. Never a scolding. */
  exposes: string;
};

/** Six measures costing sixteen against a capacity of ten. Six must go unfunded. */
export const MEASURES: Measure[] = [
  {
    id: "m-owner",
    title: "Appoint a Green IT owner with decision rights",
    cost: 1,
    buys:
      "One named person who can settle a question between IT, purchasing and finance without escalating it.",
    exposes:
      "Every conflict on the board stays unresolved by design. The four departments keep their own definitions of what counts as a good decision.",
  },
  {
    id: "m-baseline",
    title: "Baseline across all sites: energy and device inventory",
    cost: 3,
    buys:
      "A first picture of what is actually running and how old it is, in a landscape that is not uniform.",
    exposes:
      "You continue to decide on the incomplete data the board already shows, and you cannot size any later measure or prove any later saving.",
  },
  {
    id: "m-procurement",
    title: "Procurement criteria and supplier requirements",
    cost: 2,
    buys:
      "A rule that applies at the moment of buying, which is the only moment a device's lifetime is actually set.",
    exposes:
      "Growth keeps adding to the non-uniform landscape at the same rate as before. The problem gets larger while you work on it.",
  },
  {
    id: "m-lifetime",
    title: "Device lifetime extension programme",
    cost: 3,
    buys:
      "Longer service life on equipment that already exists, which is the clearest resource effect available here.",
    exposes:
      "The most visible waste on the board goes unaddressed, and it is the one your own staff can see every day.",
  },
  {
    id: "m-infrastructure",
    title: "Infrastructure and cloud optimisation",
    cost: 4,
    buys:
      "Work on the consumption itself, where the rising energy cost on the board originates.",
    exposes:
      "The largest energy lever stays untouched, and the cost curve the board shows continues upward through the year.",
  },
  {
    id: "m-reporting",
    title: "Integration into ESG and sustainability reporting",
    cost: 3,
    buys:
      "The traceable statement the customers and the supervisory board are asking for, on the reporting deadline that is already running.",
    exposes:
      "The deadline in panel five arrives with nothing behind it. The pressure that started this work is the pressure you have not answered.",
  },
];

/** Read back after allocating. No ranking, no score — consequence only. */
export const ALLOCATION_NOTES = {
  underspent:
    "You have left some capacity unused. In this exercise, unused capacity is not saved for later. It is simply not used.",
  complete:
    "Capacity is committed. What you left out is now the substance of your proposal, not an omission from it.",
  noOwner:
    "You have funded work without funding anyone to own it. Under a hard budget that can be a defensible choice, and it is also the failure this case warns about. Say which one it is in your justification.",
  ownerOnly:
    "You funded the ability to steer and little else. Management asked for results, so the proposal now has to explain what the first six months produce.",
};

export const POSTPONED_PROMPT = {
  heading: "The measure you consciously postponed",
  intro:
    "Name the one you left out that you expect to be challenged on, and say what the postponement costs. The shortfall was built into this task, so an answer that gives nothing up has not finished it.",
  placeholder:
    "I postponed ... . It costs us ... . I would bring it forward if ... .",
};

// ---------------------------------------------------------------------------
// German. Structure (ids, x/y, panel, categories, cost, order) is never
// duplicated here — only translatable text, merged onto the English source.
// ---------------------------------------------------------------------------

export const HERO_IMAGE_DE = overlay(HERO_IMAGE, {
  alt: "Fallstudien-Tafel für Auron Digital Group. Links das Unternehmen: eine wachsende Skyline mit mehreren Standortkürzeln und einem Baukran, aufsteigende Wachstumspfeile, eine Menschenmenge aus Kunden und Aufsichtsratsmitgliedern mit Schildern, ein leuchtender Stromzähler, ein Stapel uneinheitlicher Server in verworrener Verkabelung, und Maya, die IT-Strategieleiterin. Rechts sechs betitelte Felder mit einem stark wachsenden Geschäftsmodell, widersprüchlichen Zielen zwischen Abteilungen, unvollständigen Daten, einem begrenzten Budget, Zeitdruck durch eine Berichtsfrist und einer Feier um einen Server mit grünem Aufkleber, die nur symbolisch ist.",
});

export const BRIEF_DE: CaseBrief = overlay(BRIEF, {
  lines: [
    "Du bist die IT-Strategieleitung (oder CTO-Beraterin bzw. -Berater) von Auron Digital Group. Auron ist ein stark wachsendes Unternehmen mit mehreren Standorten, steigenden Energiekosten, einer uneinheitlichen IT-Landschaft und wachsendem Druck von Kunden und Aufsichtsgremien, Nachhaltigkeit nachvollziehbar zu adressieren.",
    "Maya, die in der Mitte der Tafel dargestellte IT-Strategieleiterin, ist die Person, auf deren Schreibtisch das landet. Von hier an liegen die Entscheidungen bei dir.",
  ],
});

export const DELIVERABLE_DE = "Ein entscheidungsreifer Vorschlag für das Management.";

export const CONTEXT_DE = overlayById(CONTEXT, {
  "ctx-role": { text: "Deine Rolle: IT-Strategieleitung / CTO-Beratung." },
  "ctx-sites": { text: "Mehrere Standorte, dargestellt als Standortkürzel über der Skyline." },
  "ctx-trace": {
    text: "Nachhaltigkeit muss nachvollziehbar adressiert werden, nicht nur behauptet.",
  },
});

export const COMPANY_ZONE_DE = overlay(COMPANY_ZONE, {
  label: "Auron Digital Group: das Gesamtbild und deine Rolle",
});

export const HOTSPOTS_DE = overlayById(HOTSPOTS, {
  "hs-growth-model": {
    label: "Stark wachsendes Geschäftsmodell",
    fact: "Ein stark wachsendes Geschäftsmodell.",
    onTheImage:
      "Ein ansteigendes Diagramm an der Wand, Mitarbeitende in Eile, Wachstum wird als gegebene Bedingung behandelt.",
  },
  "hs-conflicting-goals": {
    label: "Widersprüchliche Ziele",
    fact: "Unterschiedliche Interessen von IT, Einkauf, Finanzen und Management.",
    onTheImage:
      "Fünf Personen an einem Tisch fordern gleichzeitig Gewinn, neue Technologie, niedrigere Kosten und Erschwinglichkeit, beschriftet mit Management und Einkauf.",
  },
  "hs-incomplete-data": {
    label: "Unvollständige Daten",
    fact: "Die Datenlage ist unvollständig.",
    onTheImage:
      "Eine halb ausgefüllte Tabelle und ein Dashboard mit fehlerhaften Messwerten, Fragezeichen anstelle der Werte.",
  },
  "hs-limited-budget": {
    label: "Begrenztes Budget",
    fact: "Das Budget ist begrenzt.",
    onTheImage:
      "Ein Tresor mit wenig Geld, umgeben von konkurrierenden Forderungen für Green IT, Energie und Berichte.",
  },
  "hs-time-pressure": {
    label: "Zeitdruck durch Marktanforderungen",
    fact: "Zeitdruck durch Marktanforderungen und Berichtspflichten.",
    onTheImage:
      "Eine Uhr neben einer Frist für die Nachhaltigkeitsberichterstattung, markiert als sofort fällig.",
  },
  "hs-symbolic": {
    label: "Schnelle Erfolge und die Gefahr symbolischen Handelns",
    fact: "Der Wunsch nach schnellen Erfolgen, aber die Gefahr symbolischer Einzelaktionen.",
    onTheImage:
      "Konfetti über einem Server mit grünem Aufkleber, ein skeptischer Kollege nennt es rein symbolisch.",
  },
  "hs-multi-site": {
    label: "Wachstum über mehrere Standorte",
    fact: "Das Unternehmen wächst schnell und betreibt mehrere Standorte.",
    onTheImage:
      "Eine noch im Bau befindliche Skyline mit schwebenden Standortkürzeln und aufsteigenden Wachstumspfeilen.",
  },
  "hs-stakeholders": {
    label: "Druck von Kunden und Aufsichtsrat",
    fact: "Wachsender Druck von Kunden und Aufsichtsrat, Nachhaltigkeit nachvollziehbar zu adressieren.",
    onTheImage:
      "Eine Menschenmenge mit Schildern wie Nachhaltigkeit jetzt und Budget für Berichte, beschriftet mit Kunden und Aufsichtsratsmitgliedern.",
  },
  "hs-uneven-it": {
    label: "Uneinheitliche IT-Landschaft",
    fact: "Die IT-Landschaft ist uneinheitlich.",
    onTheImage:
      "Ein Stapel uneinheitlicher Server und Gehäuse unterschiedlicher Generationen, verbunden durch verworrene Verkabelung.",
  },
  "hs-energy-costs": {
    label: "Steigende Energiekosten",
    fact: "Die Energiekosten steigen.",
    onTheImage:
      "Ein großer, leuchtender Stromzähler in der Mitte der Szene, der Zeiger weit im oberen Bereich der Skala.",
  },
});

export const TASK4_DE = overlay(TASK4, {
  number: "Aufgabe 4, Stufe 3: Managemententscheidung",
  title: "Aufbau einer Green-IT-Entscheidungsarchitektur für ein wachsendes Unternehmen",
  lead: "Erarbeite einen entscheidungsreifen Vorschlag für das Management. Die Tafel oben enthält jede Bedingung, die er überstehen muss. Es gibt keine Konfiguration, die alle erfüllt, und die Kapazität unten deckt den Bedarf nicht. Das ist die Aufgabe, kein Fehler darin.",
  assignment: overlayById(TASK4.assignment, {
    "t4-1": {
      text: "Warum ist Green IT für dieses Unternehmen strategisch relevant?",
      hint: "Strategisch, nicht technisch. Wenn deine Antwort für jedes beliebige Unternehmen gleich lauten würde, geht es noch nicht um Auron.",
    },
    "t4-2": {
      text: "Nach welchen Kriterien sollen künftige Green-IT-Entscheidungen getroffen werden?",
      hint: "Kriterien überdauern Maßnahmen. Daran wird die nächste Entscheidung gemessen, wenn du den Raum längst verlassen hast.",
    },
    "t4-3": {
      text: "Welche drei Kernentscheidungen muss das Management treffen?",
      hint: "Drei, die nur das Management treffen kann. Alles, was die IT-Abteilung allein entscheiden könnte, gehört nicht hierher.",
    },
    "t4-4": {
      text: "Wo liegen die wichtigsten Zielkonflikte zwischen Nachhaltigkeit, wirtschaftlichem Nutzen, Geschwindigkeit und Nutzeranforderungen?",
      hint: "Benenne einen Konflikt mit zwei legitimen Seiten. Wenn sich dein Satz von selbst auflöst, hast du eine Präferenz benannt, keinen Konflikt.",
    },
    "t4-5": {
      text: "Welche Entscheidung muss jetzt getroffen werden, trotz unvollständiger Informationen?",
      hint: "Warten ist auch eine Entscheidung, und auch sie hat einen Preis. Wenn du aufschiebst, sag, was das Aufschieben kostet.",
    },
    "t4-6": {
      text: "Wie soll die Verantwortung organisatorisch verteilt werden?",
      hint: "Wer entscheidet, wer liefert, wer berichtet. Fachwissen ohne Befugnis erzeugt Beratung, keine Steuerung.",
    },
    "t4-7": {
      text: "Wie sieht eine priorisierte 12-Monats-Roadmap aus?",
      hint: "Priorisiert heißt, dass manches bewusst später eingeplant wird. Im Zuteilungsfeld unten legst du dich darauf fest.",
    },
  }),
  seniorHeading: "Anforderung auf Führungsebene",
  senior:
    "Triff mindestens eine Entscheidung, für die du bewusst unter unvollständigen Informationen einstehst, und erläutere sie aus Managementsicht.",
  objectiveHeading: "Ziel",
  objectives: [
    "In der Logik der Steuerung denken, nicht in Einzelmaßnahmen.",
    "Verantwortung für Zielkonflikte übernehmen.",
    "Entscheidungen managementgerecht begründen.",
    "Die Perspektive wechseln zwischen den Rollen Geschäftsleitung, Architektur, Abteilungsleitung, Führungskraft und Beratung.",
    "Von auswendig gelerntem Wissen zu Entscheidungsarchitektur und Rechenschaft übergehen.",
  ],
});

export const MEASURES_DE: Measure[] = overlayById(MEASURES, {
  "m-owner": {
    title: "Eine Green-IT-Verantwortung mit Entscheidungsbefugnis benennen",
    buys: "Eine benannte Person, die eine Frage zwischen IT, Einkauf und Finanzen klären kann, ohne sie zu eskalieren.",
    exposes:
      "Jeder Konflikt auf der Tafel bleibt bewusst ungelöst. Die vier Abteilungen behalten ihre eigenen Vorstellungen davon, was eine gute Entscheidung ausmacht.",
  },
  "m-baseline": {
    title: "Datenbasis über alle Standorte: Energie- und Geräteinventar",
    buys: "Ein erstes Bild davon, was tatsächlich läuft und wie alt es ist, in einer uneinheitlichen Landschaft.",
    exposes:
      "Du entscheidest weiterhin auf Basis der unvollständigen Daten, die die Tafel bereits zeigt, und kannst keine spätere Maßnahme bemessen oder spätere Einsparungen belegen.",
  },
  "m-procurement": {
    title: "Beschaffungskriterien und Lieferantenanforderungen",
    buys: "Eine Regel, die im Moment des Kaufs greift, dem einzigen Moment, in dem die Lebensdauer eines Geräts tatsächlich festgelegt wird.",
    exposes:
      "Das Wachstum vergrößert die uneinheitliche Landschaft im selben Tempo wie zuvor. Das Problem wächst, während du daran arbeitest.",
  },
  "m-lifetime": {
    title: "Programm zur Verlängerung der Gerätelebensdauer",
    buys: "Längere Nutzungsdauer für bereits vorhandene Geräte, der klarste Ressourceneffekt, der hier verfügbar ist.",
    exposes:
      "Die sichtbarste Verschwendung auf der Tafel bleibt unangetastet, und sie ist die, die deine eigenen Mitarbeitenden täglich sehen.",
  },
  "m-infrastructure": {
    title: "Infrastruktur- und Cloud-Optimierung",
    buys: "Arbeit am eigentlichen Verbrauch, dort, wo die steigenden Energiekosten auf der Tafel entstehen.",
    exposes:
      "Der größte Energiehebel bleibt unangetastet, und die auf der Tafel gezeigte Kostenkurve steigt das Jahr über weiter.",
  },
  "m-reporting": {
    title: "Einbindung in ESG- und Nachhaltigkeitsberichterstattung",
    buys: "Die nachvollziehbare Aussage, die Kunden und Aufsichtsrat einfordern, zur bereits laufenden Berichtsfrist.",
    exposes:
      "Die Frist aus Feld fünf kommt, ohne dass etwas dahintersteht. Der Druck, der diese Arbeit ausgelöst hat, bleibt unbeantwortet.",
  },
});

export const ALLOCATION_NOTES_DE = overlay(ALLOCATION_NOTES, {
  underspent:
    "Du hast Kapazität ungenutzt gelassen. In dieser Übung wird ungenutzte Kapazität nicht für später aufgehoben. Sie bleibt schlicht ungenutzt.",
  complete:
    "Die Kapazität ist verplant. Was du weggelassen hast, ist jetzt der Kern deines Vorschlags, keine Lücke darin.",
  noOwner:
    "Du hast Arbeit finanziert, ohne jemanden für die Verantwortung dafür zu finanzieren. Unter einem harten Budget kann das eine vertretbare Entscheidung sein, und es ist zugleich das Scheitern, vor dem dieser Fall warnt. Sag in deiner Begründung, welches von beidem es ist.",
  ownerOnly:
    "Du hast vor allem die Steuerungsfähigkeit finanziert, sonst wenig. Das Management wollte Ergebnisse, also muss der Vorschlag jetzt erklären, was die ersten sechs Monate liefern.",
});

export const POSTPONED_PROMPT_DE = overlay(POSTPONED_PROMPT, {
  heading: "Die Maßnahme, die du bewusst aufgeschoben hast",
  intro:
    "Benenne die Maßnahme, bei der du mit Widerspruch rechnest, und sag, was das Aufschieben kostet. Der Engpass war bewusst Teil dieser Aufgabe, eine Antwort, die nichts aufgibt, hat sie nicht abgeschlossen.",
  placeholder: "Ich habe … aufgeschoben. Es kostet uns … . Ich würde es vorziehen, wenn … .",
});
