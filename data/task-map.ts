// Section 9 — the Task -> Case -> Learn map.

import { overlayById } from "@/lib/i18nData";

export type TaskMapRow = {
  id: string;
  task: string;
  level: string;
  caseHref: string;
  caseLabel: string;
  learnSupport: string;
};

export const TASK_MAP: TaskMapRow[] = [
  {
    id: "worksheet-1",
    task: "Worksheet 1",
    level: "L1 objective",
    caseHref: "/case/mediprint",
    caseLabel: "MediPrint (hero hotspots + context)",
    learnSupport: "W1, W3 (definitions + category sorter)",
  },
  {
    id: "worksheet-2",
    task: "Worksheet 2",
    level: "L1 objective + judged",
    caseHref: "/case/mediprint",
    caseLabel: "MediPrint (initiative panels + conditions)",
    learnSupport: "W5 (priority matrix), W6 (incomplete information)",
  },
  {
    id: "task-3",
    task: "Task 3",
    level: "L2",
    caseHref: "/case/nordcom",
    caseLabel: "NordCom (board hotspots + first-step decision)",
    learnSupport: "W4 (trade-off dial), W5 (matrix), W6 (incomplete info)",
  },
  {
    id: "task-4",
    task: "Task 4",
    level: "L3",
    caseHref: "/case/auron",
    caseLabel: "Auron (board hotspots + capacity allocation)",
    learnSupport: "W7 (governance chart), W8 (roadmap), W9 (symbolic vs strategic)",
  },
];

export const TASK_MAP_DE: TaskMapRow[] = overlayById(TASK_MAP, {
  "worksheet-1": {
    task: "Arbeitsblatt 1",
    level: "L1-Ziel",
    caseLabel: "MediPrint (Hotspots im Bild + Kontext)",
    learnSupport: "W1, W3 (Definitionen + Kategorie-Sortierer)",
  },
  "worksheet-2": {
    task: "Arbeitsblatt 2",
    level: "L1-Ziel + bewertet",
    caseLabel: "MediPrint (Initiativen-Felder + Rahmenbedingungen)",
    learnSupport: "W5 (Prioritätenmatrix), W6 (unvollständige Informationen)",
  },
  "task-3": {
    task: "Aufgabe 3",
    caseLabel: "NordCom (Hotspots auf der Tafel + Entscheidung über den ersten Schritt)",
    learnSupport: "W4 (Trade-off-Regler), W5 (Matrix), W6 (unvollständige Informationen)",
  },
  "task-4": {
    task: "Aufgabe 4",
    caseLabel: "Auron (Hotspots auf der Tafel + Kapazitätszuteilung)",
    learnSupport: "W7 (Governance-Organigramm), W8 (Roadmap), W9 (symbolisch vs. strategisch)",
  },
});
