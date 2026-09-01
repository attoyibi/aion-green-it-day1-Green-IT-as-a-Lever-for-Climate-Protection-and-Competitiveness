"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ALLOCATION_NOTES,
  ALLOCATION_NOTES_DE,
  CAPACITY_TOTAL,
  MEASURES,
  MEASURES_DE,
  POSTPONED_PROMPT,
  POSTPONED_PROMPT_DE,
} from "@/data/auron";
import { fmt, useLocale } from "@/lib/locale";

const COPY = {
  en: {
    step: "Task 4, step 7",
    title: "The 12-month roadmap, as an allocation",
    intro1: "Six measures. Together they need",
    points: "points",
    intro2: "of capacity, and you have",
    intro3:
      "The shortfall is deliberate. It is not a fault in the exercise. A prioritised roadmap is one where some things are scheduled late on purpose.",
    capacityCommitted: "Capacity committed",
    ofPoints: "{spent} of {total} points",
    unused: "{remaining} unused",
    capacityAriaLabel: "{spent} of {total} capacity points committed",
    codesNote: "M1–M6 match the worksheet's citation labels, in the same order as the measures below.",
    pt: "pt",
    doesNotFit: "Does not fit in the capacity you have left. Free something up, or leave this one out.",
    confirm: "Confirm this roadmap",
    fundAtLeastOne: "Fund at least one measure to continue.",
    canChange: "You can still change your allocation until you confirm it.",
    unfundedTitle: "What you left unfunded, and what it leaves open",
    unfundedIntro: "None of these is a mistake. Each is a position you now have to hold in front of management.",
    blankField: "Still blank. This is the field the group debrief turns on.",
    savedField: "Saved for the debrief. Nothing here is marked. This is what you will be asked to defend.",
    startAgain: "Start the allocation again",
  },
  de: {
    step: "Aufgabe 4, Schritt 7",
    title: "Die 12-Monats-Roadmap als Zuteilung",
    intro1: "Sechs Maßnahmen. Zusammen benötigen sie",
    points: "Punkte",
    intro2: "Kapazität, du hast",
    intro3:
      "Der Engpass ist beabsichtigt. Er ist kein Fehler in der Übung. Eine priorisierte Roadmap ist eine, in der manches bewusst später eingeplant wird.",
    capacityCommitted: "Zugeteilte Kapazität",
    ofPoints: "{spent} von {total} Punkten",
    unused: "{remaining} ungenutzt",
    capacityAriaLabel: "{spent} von {total} Kapazitätspunkten zugeteilt",
    codesNote:
      "M1–M6 entsprechen den Zitierkürzeln des Arbeitsblatts, in derselben Reihenfolge wie die Maßnahmen unten.",
    pt: "Pkt.",
    doesNotFit: "Passt nicht in die verbleibende Kapazität. Gib etwas frei oder lass diese Maßnahme aus.",
    confirm: "Diese Roadmap bestätigen",
    fundAtLeastOne: "Finanziere mindestens eine Maßnahme, um fortzufahren.",
    canChange: "Du kannst deine Zuteilung noch ändern, bis du sie bestätigst.",
    unfundedTitle: "Was du nicht finanziert hast, und was das offenlässt",
    unfundedIntro:
      "Keine davon ist ein Fehler. Jede ist eine Position, die du jetzt vor dem Management vertreten musst.",
    blankField: "Noch leer. Dieses Feld ist der Dreh- und Angelpunkt der Gruppen-Nachbesprechung.",
    savedField: "Für die Nachbesprechung gespeichert. Hier wird nichts bewertet. Das ist, was du verteidigen musst.",
    startAgain: "Zuteilung neu beginnen",
  },
};

/**
 * Task 4, step 7 — the 12-month roadmap, committed as an allocation.
 *
 * There is no answer key here and there is not meant to be one. Six measures
 * cost sixteen against a capacity of ten, so something is always left out, and
 * what gets left out is the proposal. The read-back names consequences, never
 * a score.
 */
export function AuronAllocation() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const measures = isDe ? MEASURES_DE : MEASURES;
  const allocationNotes = isDe ? ALLOCATION_NOTES_DE : ALLOCATION_NOTES;
  const postponedPrompt = isDe ? POSTPONED_PROMPT_DE : POSTPONED_PROMPT;
  const required = useMemo(() => measures.reduce((n, m) => n + m.cost, 0), [measures]);

  const [funded, setFunded] = useState<string[]>([]);
  const [committed, setCommitted] = useState(false);
  const [postponed, setPostponed] = useState("");

  const spent = useMemo(
    () => measures.filter((m) => funded.includes(m.id)).reduce((n, m) => n + m.cost, 0),
    [funded, measures],
  );

  const remaining = CAPACITY_TOTAL - spent;
  const unfunded = measures.filter((m) => !funded.includes(m.id));

  const toggle = (id: string, cost: number) => {
    setFunded((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (spent + cost > CAPACITY_TOTAL) return prev; // the ceiling is the point
      return [...prev, id];
    });
  };

  const readBack = () => {
    const notes: string[] = [];
    if (remaining > 0) notes.push(allocationNotes.underspent);
    else notes.push(allocationNotes.complete);
    if (!funded.includes("m-owner") && funded.length > 0) notes.push(allocationNotes.noOwner);
    if (funded.length === 1 && funded.includes("m-owner")) notes.push(allocationNotes.ownerOnly);
    return notes;
  };

  return (
    <section aria-labelledby="allocation-title" className="card p-5 md:p-6" id="allocation">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        {copy.step}
      </p>
      <h2 id="allocation-title" className="mb-2 text-h2 text-ink">
        {copy.title}
      </h2>
      <p className="mb-4 text-body text-ash">
        {copy.intro1}{" "}
        <strong className="text-ink">
          {required} {copy.points}
        </strong>{" "}
        {copy.intro2} <strong className="text-ink">{CAPACITY_TOTAL}</strong>. {copy.intro3}
      </p>

      {/* Capacity meter */}
      <div className="mb-4 rounded-2xl border border-line p-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-caption font-semibold uppercase tracking-wide text-ash">
            {copy.capacityCommitted}
          </span>
          <span className="text-body font-semibold text-ink">
            {fmt(copy.ofPoints, { spent, total: CAPACITY_TOTAL })}
            {remaining > 0 ? (
              <span className="font-normal text-ash"> · {fmt(copy.unused, { remaining })}</span>
            ) : null}
          </span>
        </div>
        <div
          role="img"
          aria-label={fmt(copy.capacityAriaLabel, { spent, total: CAPACITY_TOTAL })}
          className="flex gap-1"
        >
          {Array.from({ length: CAPACITY_TOTAL }, (_, i) => (
            <span
              key={i}
              className={clsx(
                "h-3 flex-1 rounded-sm",
                i < spent ? "bg-purple" : "bg-line",
              )}
            />
          ))}
        </div>
      </div>

      <p className="mb-2 text-caption text-ash">{copy.codesNote}</p>

      <ul className="mb-4 space-y-2">
        {measures.map((measure, index) => {
          const isOn = funded.includes(measure.id);
          const wouldOverrun = !isOn && spent + measure.cost > CAPACITY_TOTAL;

          return (
            <li key={measure.id}>
              <button
                type="button"
                disabled={committed || wouldOverrun}
                aria-pressed={isOn}
                onClick={() => toggle(measure.id, measure.cost)}
                className={clsx(
                  "w-full rounded-2xl border p-4 text-left transition-colors duration-200",
                  isOn
                    ? "border-purple bg-purple/10"
                    : wouldOverrun
                      ? "border-line bg-lilac/30 opacity-60"
                      : "border-line hover:border-purple hover:bg-lilac/60",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[11px] font-bold",
                      isOn
                        ? "border-purple bg-purple text-paper"
                        : "border-ash bg-paper text-transparent",
                    )}
                  >
                    ✓
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="flex items-center gap-2 text-body font-semibold text-ink">
                        <span className="inline-flex h-6 min-w-[32px] shrink-0 items-center justify-center rounded-md border border-purple bg-lilac px-1.5 text-caption font-semibold text-purple">
                          M{index + 1}
                        </span>
                        {measure.title}
                      </h3>
                      <span
                        className={clsx(
                          "shrink-0 rounded-lg px-2 py-0.5 text-caption font-semibold",
                          isOn ? "bg-purple text-paper" : "bg-lilac text-navy",
                        )}
                      >
                        {measure.cost} {copy.pt}
                      </span>
                    </div>
                    <p className="text-caption text-ash">{measure.buys}</p>
                    {wouldOverrun && !committed ? (
                      <p className="mt-2 text-caption font-semibold text-navy">
                        {copy.doesNotFit}
                      </p>
                    ) : null}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!committed ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={funded.length === 0}
            onClick={() => setCommitted(true)}
            className="rounded-xl bg-navy px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-purple disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copy.confirm}
          </button>
          <span className="text-caption text-ash">
            {funded.length === 0 ? copy.fundAtLeastOne : copy.canChange}
          </span>
        </div>
      ) : (
        <div className="space-y-3" aria-live="polite">
          <div className="rounded-2xl border border-line bg-lilac/50 p-4">
            {readBack().map((note) => (
              <p key={note} className="mb-2 text-body text-ink last:mb-0">
                {note}
              </p>
            ))}
          </div>

          {unfunded.length > 0 ? (
            <div className="rounded-2xl border border-line p-4">
              <h3 className="mb-1 text-h3 text-ink">{copy.unfundedTitle}</h3>
              <p className="mb-3 text-caption text-ash">{copy.unfundedIntro}</p>
              <ul className="space-y-3">
                {unfunded.map((measure) => (
                  <li key={measure.id} className="border-l-2 border-line pl-3">
                    <h4 className="flex items-center gap-2 text-body font-semibold text-ink">
                      <span className="inline-flex h-6 min-w-[32px] shrink-0 items-center justify-center rounded-md border border-purple bg-lilac px-1.5 text-caption font-semibold text-purple">
                        M{measures.indexOf(measure) + 1}
                      </span>
                      {measure.title}
                    </h4>
                    <p className="text-caption text-ash">{measure.exposes}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl border border-purple/40 p-4">
            <h3 className="mb-1 text-h3 text-ink">{postponedPrompt.heading}</h3>
            <p className="mb-3 text-caption text-ash">{postponedPrompt.intro}</p>
            <textarea
              value={postponed}
              onChange={(e) => setPostponed(e.target.value)}
              rows={4}
              placeholder={postponedPrompt.placeholder}
              className="w-full rounded-xl border border-line bg-paper p-3 text-body text-ink outline-none transition-colors duration-200 focus:border-purple"
            />
            <p className="mt-2 text-caption text-ash">
              {postponed.trim().length === 0 ? copy.blankField : copy.savedField}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setCommitted(false);
              setFunded([]);
              setPostponed("");
            }}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            {copy.startAgain}
          </button>
        </div>
      )}
    </section>
  );
}
