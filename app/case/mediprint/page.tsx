import { PageHeader } from "@/components/ui/PageHeader";
import { MediprintCase } from "@/components/case/MediprintCase";
import { OpenItems } from "@/components/ui/OpenItems";
import { InitiativePanel } from "@/components/case/InitiativePanel";
import { ConditionTile } from "@/components/case/ConditionTile";
import { CONDITIONS, INITIATIVES } from "@/data/mediprint";

export default function MediprintPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 3, Case A"
        title="MediPrint Solutions"
        intro="Everything you need is in the illustration. Click the building to read the company brief, click an arrow to see a topic area, and click each of the nine markers to read one passage from the case description. Your assignment is below the picture."
      />

      {/* The artwork is the hero — no sidebar repeating what is already drawn on it. */}
      <MediprintCase />

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-3">
        <OpenItems
          only={["mediprint"]}
          title="Passages opened on this illustration"
          intro="Task 1 asks you to mark every Green-IT-relevant passage. This lists the ones you have not opened yet, so none is missed by accident."
          showLinks={false}
        />

        <section aria-labelledby="mediprint-initiatives-title" className="card p-4 md:p-5">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="mediprint-initiatives-title" className="text-h3 text-ink">
              Three initiatives on the table
            </h2>
            <code className="text-caption text-ash">mediprint/initiatives</code>
          </div>
          <p className="mb-4 text-body text-ash">
            Task 2 asks you to work with these three options as they stand. Open each
            one to read it in full.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {INITIATIVES.map((initiative) => (
              <InitiativePanel key={initiative.id} initiative={initiative} />
            ))}
          </div>
        </section>

        <section aria-labelledby="mediprint-conditions-title" className="card p-4 md:p-5">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="mediprint-conditions-title" className="text-h3 text-ink">
              General conditions
            </h2>
            <code className="text-caption text-ash">mediprint/conditions</code>
          </div>
          <p className="mb-4 text-body text-ash">
            The setting the three initiatives sit in. These are not tagged to a topic area.
          </p>
          <ul className="flex flex-wrap gap-2">
            {CONDITIONS.map((condition) => (
              <ConditionTile key={condition.id} condition={condition} />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
