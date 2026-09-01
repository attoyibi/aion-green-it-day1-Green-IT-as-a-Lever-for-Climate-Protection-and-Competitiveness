"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { OpenItems } from "@/components/ui/OpenItems";
import { CaseBoard } from "@/components/case/CaseBoard";
import { NordcomFirstStep } from "@/components/case/NordcomFirstStep";
import {
  BRIEF,
  BRIEF_DE,
  COMPANY_ZONE,
  COMPANY_ZONE_DE,
  CONTEXT,
  CONTEXT_DE,
  HERO_IMAGE,
  HERO_IMAGE_DE,
  HOTSPOTS,
  HOTSPOTS_DE,
  TASK3,
  TASK3_DE,
} from "@/data/nordcom";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    eyebrow: "Tab 4, Case B",
    intro:
      "Green IT between cost pressure and competitiveness. Everything you need is on the board. Click the company block on the left to read the brief. Then open the nine findings: six are titled panels on the right, and three are points on the company scene. Each one carries a passage from the case description. Your assignment is below the board.",
    contextHeading: "At the same time",
    categoryNote:
      "Six of the nine findings tag as Organisation & Governance. That spread is the case: almost nothing here is blocked by technology.",
    openItemsTitle: "Findings opened on this board",
    openItemsIntro:
      "Step 1 asks you to analyse the initial situation from five perspectives. This lists the findings you have not opened yet, so none is missed by accident.",
  },
  de: {
    eyebrow: "Tab 4, Fall B",
    intro:
      "Green IT zwischen Kostendruck und Wettbewerbsfähigkeit. Alles, was du brauchst, steht auf der Tafel. Klicke auf den Unternehmensblock links, um das Kurzprofil zu lesen. Öffne dann die neun Befunde: sechs sind betitelte Felder rechts, drei sind Punkte in der Unternehmensszene. Jeder trägt eine Textstelle aus der Fallbeschreibung. Deine Aufgabe steht unter der Tafel.",
    contextHeading: "Gleichzeitig",
    categoryNote:
      "Sechs der neun Befunde sind mit Organisation & Governance gekennzeichnet. Genau diese Verteilung ist der Fall: Fast nichts hier scheitert an der Technik.",
    openItemsTitle: "Auf dieser Tafel geöffnete Befunde",
    openItemsIntro:
      "Schritt 1 verlangt, die Ausgangslage aus fünf Perspektiven zu analysieren. Diese Liste zeigt die Befunde, die du noch nicht geöffnet hast, damit keiner versehentlich übersehen wird.",
  },
};

export default function NordcomPage() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const task3 = isDe ? TASK3_DE : TASK3;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title="NordCom Services GmbH" intro={copy.intro} />

      <CaseBoard
        caseKey="nordcom"
        image={isDe ? HERO_IMAGE_DE : HERO_IMAGE}
        companyZone={isDe ? COMPANY_ZONE_DE : COMPANY_ZONE}
        hotspots={isDe ? HOTSPOTS_DE : HOTSPOTS}
        brief={isDe ? BRIEF_DE : BRIEF}
        context={isDe ? CONTEXT_DE : CONTEXT}
        contextHeading={copy.contextHeading}
        categoryNote={copy.categoryNote}
      />

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-4">
        <OpenItems
          only={["nordcom"]}
          title={copy.openItemsTitle}
          intro={copy.openItemsIntro}
          showLinks={false}
        />

        {/* ---------------- Task 3 ---------------- */}
        <section aria-labelledby="task3-title" className="card p-5 md:p-6">
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
            {task3.number}
          </p>
          <h2 id="task3-title" className="mb-4 text-h2 text-ink">
            {task3.title}
          </h2>

          <p className="mb-5 text-body text-ash">{task3.lead}</p>

          <ol className="mb-6 space-y-3">
            {task3.assignment.map((step, index) => (
              <li key={step.id} className="rounded-2xl bg-lilac/60 p-4">
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-body font-semibold text-ink">{step.text}</p>
                    <p className="mt-1 text-caption text-ash">{step.hint}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{task3.objectiveHeading}</h3>
            <p className="text-body text-ash">{task3.objective}</p>
          </div>
        </section>

        <NordcomFirstStep />
      </div>
    </>
  );
}
