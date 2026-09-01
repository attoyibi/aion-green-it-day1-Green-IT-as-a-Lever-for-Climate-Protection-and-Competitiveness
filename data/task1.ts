// Task 1 briefing shown under the MediPrint hero. Worksheet wording is
// reproduced as issued; only the linking to hotspot ids is added.

import { overlay, overlayById } from "@/lib/i18nData";

export type BriefingLine = {
  id: string;
  text: string;
  /** Hotspot this line can be found on, if any. */
  findIt?: string;
};

export const TASK1 = {
  number: "Task 1",
  title: "Making Green IT visible in a company",

  lead:
    "Participants receive a short description of a fictitious company “MediPrint Solutions” with 280 employees, two sites, its own server room, regular device renewal every three years, a high volume of printing, growing cloud use and no sustainability strategy in IT.",

  // The lead sentence broken into the phrases that appear on the illustration.
  leadFacts: [
    { id: "t1-lead-size", text: "280 employees, two sites" },
    { id: "t1-lead-server", text: "its own server room", findIt: "hs-server-room" },
    {
      id: "t1-lead-renewal",
      text: "regular device renewal every three years",
      findIt: "hs-devices-3yr",
    },
    { id: "t1-lead-print", text: "a high volume of printing", findIt: "hs-print" },
    { id: "t1-lead-cloud", text: "growing cloud use", findIt: "hs-cloud" },
    {
      id: "t1-lead-nostrategy",
      text: "no sustainability strategy in IT",
      findIt: "hs-boardroom",
    },
  ] satisfies BriefingLine[],

  additionalHeading: "Additional information",
  additional: [
    {
      id: "t1-add-elec",
      text: "Electricity costs are rising significantly",
      findIt: "hs-elec-meter",
    },
    {
      id: "t1-add-basement",
      text: "Many old devices are stored unused in the basement",
      findIt: "hs-basement",
    },
    {
      id: "t1-add-rules",
      text: "There are no rules for procurement or device service life",
      findIt: "hs-procurement",
    },
    {
      id: "t1-add-projects",
      text: "IT projects are assessed only in terms of functionality and speed",
      findIt: "hs-project-lens",
    },
    {
      id: "t1-add-mgmt",
      text:
        "Management is asking for the first time about IT's contribution to sustainability",
    },
  ] satisfies BriefingLine[],

  assignmentHeading: "Work assignment",
  assignment: [
    {
      id: "t1-step-1",
      text:
        "Highlight all passages in the text that point to Green-IT-relevant topics.",
      hint: "Open every marker on the illustration above. Each one carries one passage, word for word.",
    },
    {
      id: "t1-step-2",
      text:
        "Assign your observations to the categories energy, resources, emissions, use and organisation/governance.",
      hint: "Write your own assignment down first. The topic area shown on a marker is a tag on the illustration, not a marked answer sheet.",
    },
    {
      id: "t1-step-3",
      text:
        "Formulate five assumptions as to why Green IT is relevant for this company.",
      hint: "Five assumptions, not five facts. Say what each observation could mean for cost, risk, reputation or capability.",
    },
    {
      id: "t1-step-4",
      text: "Distinguish between operational and strategic problem areas.",
      hint: "Ask of each observation: is this something a team can change next month, or does it need a decision from above?",
    },
  ],

  noteHeading: "Didactic note",
  note:
    "The task is deliberately designed so that it can also be completed without prior knowledge. It is based on observation, structuring and common sense.",

  objectiveHeading: "Objective",
  objective: "Practising the systemic identification of Green IT topics.",
};

// ---------------------------------------------------------------------------
// German. This is a translation of the English text above, not a verbatim
// German worksheet — if an official German Worksheet 1 exists, re-diff
// against it the way Worksheet 3/4 were reconciled (see PLAYGROUND.md).
// ---------------------------------------------------------------------------

export const TASK1_DE = overlay(TASK1, {
  number: "Aufgabe 1",
  title: "Green IT in einem Unternehmen sichtbar machen",
  lead: "Die Teilnehmenden erhalten eine kurze Beschreibung eines fiktiven Unternehmens „MediPrint Solutions“ mit 280 Mitarbeitenden, zwei Standorten, eigenem Serverraum, regelmäßiger Geräteerneuerung alle drei Jahre, hohem Druckaufkommen, wachsender Cloud-Nutzung und ohne Nachhaltigkeitsstrategie in der IT.",
  leadFacts: overlayById(TASK1.leadFacts, {
    "t1-lead-size": { text: "280 Mitarbeitende, zwei Standorte" },
    "t1-lead-server": { text: "eigener Serverraum" },
    "t1-lead-renewal": { text: "regelmäßige Geräteerneuerung alle drei Jahre" },
    "t1-lead-print": { text: "hohes Druckaufkommen" },
    "t1-lead-cloud": { text: "wachsende Cloud-Nutzung" },
    "t1-lead-nostrategy": { text: "keine Nachhaltigkeitsstrategie in der IT" },
  }),
  additionalHeading: "Zusätzliche Informationen",
  additional: overlayById(TASK1.additional, {
    "t1-add-elec": { text: "Die Stromkosten steigen deutlich" },
    "t1-add-basement": { text: "Viele alte Geräte lagern ungenutzt im Keller" },
    "t1-add-rules": {
      text: "Es gibt keine Regeln für Beschaffung oder Nutzungsdauer von Geräten",
    },
    "t1-add-projects": {
      text: "IT-Projekte werden nur nach Funktionalität und Geschwindigkeit bewertet",
    },
    "t1-add-mgmt": {
      text: "Das Management fragt zum ersten Mal nach dem Beitrag der IT zur Nachhaltigkeit",
    },
  }),
  assignmentHeading: "Arbeitsauftrag",
  assignment: overlayById(TASK1.assignment, {
    "t1-step-1": {
      text: "Markiere alle Textstellen, die auf Green-IT-relevante Themen hinweisen.",
      hint: "Öffne jeden Marker auf der Illustration oben. Jeder enthält eine Textstelle, Wort für Wort.",
    },
    "t1-step-2": {
      text: "Ordne deine Beobachtungen den Kategorien Energie, Ressourcen, Emissionen, Nutzung und Organisation/Governance zu.",
      hint: "Schreibe zuerst deine eigene Zuordnung auf. Der auf einem Marker gezeigte Themenbereich ist eine Markierung auf der Illustration, kein Lösungsblatt.",
    },
    "t1-step-3": {
      text: "Formuliere fünf Annahmen dazu, warum Green IT für dieses Unternehmen relevant ist.",
      hint: "Fünf Annahmen, keine fünf Fakten. Sag, was jede Beobachtung für Kosten, Risiko, Reputation oder Handlungsfähigkeit bedeuten könnte.",
    },
    "t1-step-4": {
      text: "Unterscheide zwischen operativen und strategischen Problemfeldern.",
      hint: "Frage bei jeder Beobachtung: Kann ein Team das nächsten Monat ändern, oder braucht es eine Entscheidung von oben?",
    },
  }),
  noteHeading: "Didaktischer Hinweis",
  note: "Die Aufgabe ist bewusst so gestaltet, dass sie auch ohne Vorwissen lösbar ist. Sie beruht auf Beobachtung, Strukturierung und gesundem Menschenverstand.",
  objectiveHeading: "Ziel",
  objective: "Einüben der systematischen Identifikation von Green-IT-Themen.",
});
