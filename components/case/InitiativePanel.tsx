"use client";

import { useState } from "react";
import { InfoDialog } from "@/components/ui/InfoDialog";
import type { ContextTile, Initiative } from "@/data/case-shared";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    open: "Weigh this initiative →",
    impact: "Impact",
    feasibility: "Feasibility",
    buys: "What choosing it first would buy",
    costs: "What it costs, or leaves open",
    conditions: "General conditions that bear on it",
    footnote:
      "This describes the option on its own terms. Which one goes first is Section C, and that decision is yours.",
  },
  de: {
    open: "Diese Initiative abwägen →",
    impact: "Wirkung",
    feasibility: "Machbarkeit",
    buys: "Was es bringt, sie zuerst zu wählen",
    costs: "Was sie kostet oder offenlässt",
    conditions: "Rahmenbedingungen, die sie betreffen",
    footnote:
      "Das beschreibt die Option für sich genommen. Welche zuerst kommt, ist Abschnitt C — und diese Entscheidung liegt bei dir.",
  },
};

type Props = { initiative: Initiative; conditions: ContextTile[] };

/**
 * A read-only card. The modal carries the impact/feasibility read W5 teaches,
 * so Section C's ranking can be reasoned about rather than guessed. It never
 * names a rank — MediprintPriority is where the learner commits to one.
 */
export function InitiativePanel({ initiative, conditions }: Props) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;

  const bearing = conditions.filter((c) => initiative.conditions.includes(c.id));

  return (
    <>
      <button
        type="button"
        id={initiative.id}
        onClick={() => setOpen(true)}
        className="card flex w-full flex-col p-4 text-left transition-colors duration-200 hover:bg-lilac"
      >
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="flex items-center gap-2 text-h3 text-ink">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-purple bg-lilac text-caption font-semibold text-purple">
              {initiative.letter}
            </span>
            {initiative.title}
          </h3>
          <code className="text-caption text-ash">{initiative.id}</code>
        </div>
        <p className="mb-3 text-body text-ash">{initiative.body}</p>
        <span className="mt-auto text-caption font-semibold text-purple underline underline-offset-2">
          {copy.open}
        </span>
      </button>

      <InfoDialog open={open} title={initiative.title} onClose={() => setOpen(false)}>
        <p className="mb-4 text-body text-ink">{initiative.body}</p>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-line p-3">
            <h3 className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
              {copy.impact}
            </h3>
            <p className="text-caption text-ink">{initiative.impact}</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <h3 className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
              {copy.feasibility}
            </h3>
            <p className="text-caption text-ink">{initiative.feasibility}</p>
          </div>
        </div>

        <h3 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
          {copy.buys}
        </h3>
        <p className="mb-3 text-body text-ink">{initiative.buys}</p>

        <h3 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
          {copy.costs}
        </h3>
        <p className="mb-4 text-body text-ink">{initiative.costs}</p>

        {bearing.length > 0 ? (
          <>
            <h3 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
              {copy.conditions}
            </h3>
            <ul className="mb-4 flex flex-wrap gap-2">
              {bearing.map((c) => (
                <li
                  key={c.id}
                  className="rounded-full border border-line bg-lilac px-3 py-1 text-caption text-navy"
                >
                  {c.text}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="border-t border-line pt-3 text-caption text-ash">{copy.footnote}</p>
      </InfoDialog>
    </>
  );
}
