"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { OpenItems } from "@/components/ui/OpenItems";
import { CaseBoard } from "@/components/case/CaseBoard";
import { AuronAllocation } from "@/components/case/AuronAllocation";
import {
  BRIEF,
  BRIEF_DE,
  COMPANY_ZONE,
  COMPANY_ZONE_DE,
  CONTEXT,
  CONTEXT_DE,
  DELIVERABLE,
  DELIVERABLE_DE,
  HERO_IMAGE,
  HERO_IMAGE_DE,
  HOTSPOTS,
  HOTSPOTS_DE,
  TASK4,
  TASK4_DE,
} from "@/data/auron";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    eyebrow: "Tab 5, Case C",
    intro:
      "Building a Green IT decision architecture for a growing company. You are the IT strategy lead. The board holds ten findings. Six are titled panels showing the conditions your decision has to survive. Four are points on the company scene showing the state of the IT itself.",
    contextHeading: "Your position",
    categoryNote:
      "Seven of the ten findings tag as Organisation & Governance, and that is what separates this case from Case B. At this level the subject is how decisions get made, not what the hardware draws.",
    openItemsTitle: "Findings opened on this board",
    openItemsIntro:
      "Every condition below constrains the proposal you are about to write. This lists the ones you have not opened yet.",
    whatYouDeliver: "What you deliver",
  },
  de: {
    eyebrow: "Tab 5, Fall C",
    intro:
      "Aufbau einer Green-IT-Entscheidungsarchitektur für ein wachsendes Unternehmen. Du bist die IT-Strategieleitung. Die Tafel enthält zehn Befunde. Sechs sind betitelte Felder mit den Bedingungen, die deine Entscheidung überstehen muss. Vier sind Punkte in der Unternehmensszene mit dem Zustand der IT selbst.",
    contextHeading: "Deine Position",
    categoryNote:
      "Sieben der zehn Befunde sind mit Organisation & Governance gekennzeichnet, und genau das unterscheidet diesen Fall von Fall B. Auf dieser Stufe geht es darum, wie Entscheidungen zustande kommen, nicht darum, was die Hardware verbraucht.",
    openItemsTitle: "Auf dieser Tafel geöffnete Befunde",
    openItemsIntro:
      "Jede Bedingung unten schränkt den Vorschlag ein, den du gleich schreibst. Diese Liste zeigt die, die du noch nicht geöffnet hast.",
    whatYouDeliver: "Was du lieferst",
  },
};

export default function AuronPage() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const task4 = isDe ? TASK4_DE : TASK4;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title="Auron Digital Group" intro={copy.intro} />

      <CaseBoard
        caseKey="auron"
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
          only={["auron"]}
          title={copy.openItemsTitle}
          intro={copy.openItemsIntro}
          showLinks={false}
        />

        {/* ---------------- Task 4 ---------------- */}
        <section aria-labelledby="task4-title" className="card p-5 md:p-6">
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
            {task4.number}
          </p>
          <h2 id="task4-title" className="mb-2 text-h2 text-ink">
            {task4.title}
          </h2>

          <p className="mb-4 text-body text-ash">{task4.lead}</p>

          <div className="mb-6 rounded-2xl border border-purple/40 bg-lilac/50 p-4">
            <h3 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
              {copy.whatYouDeliver}
            </h3>
            <p className="text-body font-semibold text-ink">{isDe ? DELIVERABLE_DE : DELIVERABLE}</p>
          </div>

          <ol className="mb-6 space-y-3">
            {task4.assignment.map((step, index) => (
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

          <div className="mb-4 rounded-2xl border-2 border-navy p-4">
            <h3 className="mb-1 text-h3 text-ink">{task4.seniorHeading}</h3>
            <p className="text-body text-ink">{task4.senior}</p>
          </div>

          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-2 text-h3 text-ink">{task4.objectiveHeading}</h3>
            <ul className="space-y-1">
              {task4.objectives.map((objective) => (
                <li key={objective} className="flex gap-2 text-body text-ash">
                  <span aria-hidden="true" className="text-purple">
                    &middot;
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AuronAllocation />
      </div>
    </>
  );
}
