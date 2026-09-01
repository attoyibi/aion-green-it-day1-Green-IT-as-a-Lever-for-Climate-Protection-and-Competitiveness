"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { OpenItems } from "@/components/ui/OpenItems";
import { TASK_MAP, TASK_MAP_DE } from "@/data/task-map";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    eyebrow: "Tab 6",
    title: "Task map",
    intro:
      "This table shows which worksheet belongs to which case, and which Learn widgets help you with it. Use it to jump straight to what a task needs.",
    progressTitle: "Module progress",
    progressIntro:
      "Everything this playground tracks, in one place, so you can see what you have not worked through yet. The case tabs never give you XP. Opening a finding only records that you have read it.",
    colTask: "Task",
    colLevel: "Level",
    colCase: "Case",
    colLearnSupport: "Learn support",
    colLinks: "Links",
    openCase: "Open case",
    openLearnSupport: "Open learn support",
  },
  de: {
    eyebrow: "Tab 6",
    title: "Aufgabenübersicht",
    intro:
      "Diese Tabelle zeigt, welches Arbeitsblatt zu welchem Fall gehört und welche Lernmodule dir dabei helfen. Nutze sie, um direkt zu dem zu springen, was eine Aufgabe braucht.",
    progressTitle: "Fortschritt im Modul",
    progressIntro:
      "Alles, was dieser Übungsraum erfasst, an einem Ort, damit du siehst, was du noch nicht bearbeitet hast. Die Case-Tabs geben dir nie XP. Das Öffnen eines Befunds hält nur fest, dass du ihn gelesen hast.",
    colTask: "Aufgabe",
    colLevel: "Stufe",
    colCase: "Fall",
    colLearnSupport: "Lern-Unterstützung",
    colLinks: "Links",
    openCase: "Fall öffnen",
    openLearnSupport: "Lern-Unterstützung öffnen",
  },
};

export default function TaskMapPage() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const taskMap = isDe ? TASK_MAP_DE : TASK_MAP;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

      <div className="mb-6">
        <OpenItems title={copy.progressTitle} intro={copy.progressIntro} />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-lilac/60">
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">{copy.colTask}</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">{copy.colLevel}</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">{copy.colCase}</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">{copy.colLearnSupport}</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">{copy.colLinks}</th>
            </tr>
          </thead>
          <tbody>
            {taskMap.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-b-0 align-top">
                <th scope="row" className="p-3 text-body font-semibold text-ink">{row.task}</th>
                <td className="p-3 text-body text-ash">{row.level}</td>
                <td className="p-3 text-body text-ash">{row.caseLabel}</td>
                <td className="p-3 text-body text-ash">{row.learnSupport}</td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <Link href={row.caseHref} className="rounded text-body text-purple underline">
                      {copy.openCase}
                    </Link>
                    <Link href="/learn" className="rounded text-body text-purple underline">
                      {copy.openLearnSupport}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
