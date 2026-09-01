"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MediprintCase } from "@/components/case/MediprintCase";
import { OpenItems } from "@/components/ui/OpenItems";
import { InitiativePanel } from "@/components/case/InitiativePanel";
import { ConditionTile } from "@/components/case/ConditionTile";
import { CONDITIONS, CONDITIONS_DE, INITIATIVES, INITIATIVES_DE } from "@/data/mediprint";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    eyebrow: "Tab 3, Case A",
    intro:
      "Everything you need is in the illustration. Click the building to read the company brief, click an arrow to see a topic area, and click each of the nine markers to read one passage from the case description. Your assignment is below the picture.",
    openItemsTitle: "Passages opened on this illustration",
    openItemsIntro:
      "Task 1 asks you to mark every Green-IT-relevant passage. This lists the ones you have not opened yet, so none is missed by accident.",
    initiativesTitle: "Three initiatives on the table",
    initiativesIntro:
      "Task 2 asks you to work with these three options as they stand. Open each one to read it in full.",
    conditionsTitle: "General conditions",
    conditionsIntro: "The setting the three initiatives sit in. These are not tagged to a topic area.",
  },
  de: {
    eyebrow: "Tab 3, Fall A",
    intro:
      "Alles, was du brauchst, steht in der Illustration. Klicke auf das Gebäude, um das Kurzprofil zu lesen, klicke auf einen Pfeil, um einen Themenbereich zu sehen, und klicke jeden der neun Marker, um eine Textstelle aus der Fallbeschreibung zu lesen. Deine Aufgabe steht unter dem Bild.",
    openItemsTitle: "Auf dieser Illustration geöffnete Textstellen",
    openItemsIntro:
      "Aufgabe 1 verlangt, jede Green-IT-relevante Textstelle zu markieren. Diese Liste zeigt die, die du noch nicht geöffnet hast, damit keine versehentlich übersehen wird.",
    initiativesTitle: "Drei Initiativen auf dem Tisch",
    initiativesIntro:
      "Aufgabe 2 verlangt, mit diesen drei Optionen so zu arbeiten, wie sie vorliegen. Öffne jede, um sie vollständig zu lesen.",
    conditionsTitle: "Rahmenbedingungen",
    conditionsIntro: "Der Rahmen, in dem die drei Initiativen stehen. Sie sind keinem Themenbereich zugeordnet.",
  },
};

export default function MediprintPage() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const initiatives = isDe ? INITIATIVES_DE : INITIATIVES;
  const conditions = isDe ? CONDITIONS_DE : CONDITIONS;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title="MediPrint Solutions" intro={copy.intro} />

      {/* The artwork is the hero — no sidebar repeating what is already drawn on it. */}
      <MediprintCase />

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-3">
        <OpenItems
          only={["mediprint"]}
          title={copy.openItemsTitle}
          intro={copy.openItemsIntro}
          showLinks={false}
        />

        <section aria-labelledby="mediprint-initiatives-title" className="card p-4 md:p-5">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="mediprint-initiatives-title" className="text-h3 text-ink">
              {copy.initiativesTitle}
            </h2>
            <code className="text-caption text-ash">mediprint/initiatives</code>
          </div>
          <p className="mb-4 text-body text-ash">{copy.initiativesIntro}</p>
          <div className="grid gap-3 md:grid-cols-3">
            {initiatives.map((initiative) => (
              <InitiativePanel key={initiative.id} initiative={initiative} />
            ))}
          </div>
        </section>

        <section aria-labelledby="mediprint-conditions-title" className="card p-4 md:p-5">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="mediprint-conditions-title" className="text-h3 text-ink">
              {copy.conditionsTitle}
            </h2>
            <code className="text-caption text-ash">mediprint/conditions</code>
          </div>
          <p className="mb-4 text-body text-ash">{copy.conditionsIntro}</p>
          <ul className="flex flex-wrap gap-2">
            {conditions.map((condition) => (
              <ConditionTile key={condition.id} condition={condition} />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
