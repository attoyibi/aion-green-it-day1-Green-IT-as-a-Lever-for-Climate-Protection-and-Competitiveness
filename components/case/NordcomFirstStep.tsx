"use client";

import { useState } from "react";
import clsx from "clsx";
import { ACTION_AREAS, ACTION_AREAS_DE, KEY, KEY_DE } from "@/data/nordcom";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    step: "Task 3, step 4",
    title: "Which step is carried out first?",
    intro:
      "Four action areas, taken from the nine findings above. All four belong in your recommendation. Only one of them can start first, and that order is the real decision management is asking you for.",
    codesNote: "AA1–AA4 match the worksheet's citation labels, in the same order as the cards below.",
    confirm: "Confirm this as the first step",
    canChange: "You can still change your answer until you confirm it.",
    pickOne: "Pick one to continue.",
    youChose: "You chose",
    whatThisBuys: "What this buys you",
    whatItCosts: "What it costs you",
    showKey: "Show the answer key",
    writeFirst:
      "Write your justification first: impact, risk, feasibility. It is much easier to agree with the key than to reach it yourself.",
    answerKey: "Answer key",
    prioritisedFirstStep: "The prioritised first step",
    isKeyChoice:
      "This is the area you chose. The cost shown above still applies. It is the price of the recommended step, not an argument against it.",
    isNotKeyChoice:
      "This is not the area you chose. That does not make your choice wrong. It means you now have to defend your choice against this one.",
    whyItGoesFirst: "Why it goes first",
    shortTermSteps: "Short-term steps",
    mediumTermSteps: "Medium-term steps",
    chooseAgain: "Choose again",
  },
  de: {
    step: "Aufgabe 3, Schritt 4",
    title: "Welcher Schritt wird zuerst umgesetzt?",
    intro:
      "Vier Handlungsfelder aus den neun Befunden oben. Alle vier gehören in deine Empfehlung. Nur eines kann zuerst starten, und diese Reihenfolge ist die eigentliche Entscheidung, nach der das Management fragt.",
    codesNote:
      "AA1–AA4 entsprechen den Zitierkürzeln des Arbeitsblatts, in derselben Reihenfolge wie die Karten unten.",
    confirm: "Als ersten Schritt bestätigen",
    canChange: "Du kannst deine Wahl noch ändern, bis du sie bestätigst.",
    pickOne: "Wähle eines aus, um fortzufahren.",
    youChose: "Deine Wahl",
    whatThisBuys: "Was dir das bringt",
    whatItCosts: "Was es dich kostet",
    showKey: "Musterlösung anzeigen",
    writeFirst:
      "Schreibe zuerst deine eigene Begründung: Wirkung, Risiko, Umsetzbarkeit. Der Musterlösung zuzustimmen ist deutlich leichter, als selbst darauf zu kommen.",
    answerKey: "Musterlösung",
    prioritisedFirstStep: "Der priorisierte erste Schritt",
    isKeyChoice:
      "Das ist das Handlungsfeld, das du gewählt hast. Der oben gezeigte Preis gilt weiterhin. Er ist die Kosten des empfohlenen Schritts, kein Argument dagegen.",
    isNotKeyChoice:
      "Das ist nicht das Handlungsfeld, das du gewählt hast. Das macht deine Wahl nicht falsch. Es bedeutet, dass du sie jetzt gegen dieses hier verteidigen musst.",
    whyItGoesFirst: "Warum es zuerst kommt",
    shortTermSteps: "Kurzfristige Schritte",
    mediumTermSteps: "Mittelfristige Schritte",
    chooseAgain: "Erneut wählen",
  },
};

/**
 * Task 3, step 4 — which action area runs first.
 *
 * Two stages on purpose: the trade-off of your own choice is shown before the
 * key, so the key reads as a comparison rather than a verdict. Every option
 * carries a real cost, including the one the key names.
 */
export function NordcomFirstStep() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const actionAreas = isDe ? ACTION_AREAS_DE : ACTION_AREAS;
  const key = isDe ? KEY_DE : KEY;

  const [picked, setPicked] = useState<string | null>(null);
  const [committed, setCommitted] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);

  const chosen = actionAreas.find((a) => a.id === committed) ?? null;
  const isKeyChoice = committed === "aa-governance";

  return (
    <section
      aria-labelledby="first-step-title"
      className="card p-5 md:p-6"
      id="first-step"
    >
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        {copy.step}
      </p>
      <h2 id="first-step-title" className="mb-2 text-h2 text-ink">
        {copy.title}
      </h2>
      <p className="mb-5 text-body text-ash">{copy.intro}</p>

      <p className="mb-2 text-caption text-ash">{copy.codesNote}</p>

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        {actionAreas.map((area, index) => {
          const isPicked = picked === area.id;
          const isCommitted = committed === area.id;

          return (
            <button
              key={area.id}
              type="button"
              disabled={Boolean(committed)}
              aria-pressed={isPicked}
              onClick={() => setPicked(area.id)}
              className={clsx(
                "rounded-2xl border p-4 text-left transition-colors duration-200",
                isCommitted
                  ? "border-purple bg-purple/10"
                  : isPicked
                    ? "border-purple bg-lilac"
                    : "border-line hover:border-purple hover:bg-lilac/60",
                committed && !isCommitted && "opacity-50",
              )}
            >
              <div className="mb-1 flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className={clsx(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    isPicked || isCommitted
                      ? "border-purple bg-purple"
                      : "border-ash bg-paper",
                  )}
                >
                  {isPicked || isCommitted ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                  ) : null}
                </span>
                <h3 className="flex items-center gap-2 text-body font-semibold text-ink">
                  <span className="inline-flex h-6 min-w-[36px] shrink-0 items-center justify-center rounded-md border border-purple bg-lilac px-1.5 text-caption font-semibold text-purple">
                    AA{index + 1}
                  </span>
                  {area.title}
                </h3>
              </div>
              <p className="pl-6 text-caption text-ash">{area.summary}</p>
            </button>
          );
        })}
      </div>

      {!committed ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!picked}
            onClick={() => setCommitted(picked)}
            className="rounded-xl bg-navy px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-purple disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copy.confirm}
          </button>
          <span className="text-caption text-ash">
            {picked ? copy.canChange : copy.pickOne}
          </span>
        </div>
      ) : null}

      {chosen ? (
        <div className="space-y-3" aria-live="polite">
          <div className="rounded-2xl border border-line bg-lilac/50 p-4">
            <h3 className="mb-2 text-h3 text-ink">
              {copy.youChose}: AA{actionAreas.indexOf(chosen) + 1}, {chosen.title}
            </h3>

            <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
              {copy.whatThisBuys}
            </h4>
            <p className="mb-3 text-body text-ink">{chosen.strength}</p>

            <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
              {copy.whatItCosts}
            </h4>
            <p className="text-body text-ink">{chosen.tradeoff}</p>
          </div>

          {!showKey ? (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKey(true)}
                className="rounded-xl border border-purple px-4 py-2 text-body font-semibold text-purple transition-colors duration-200 hover:bg-purple hover:text-paper"
              >
                {copy.showKey}
              </button>
              <span className="text-caption text-ash">{copy.writeFirst}</span>
            </div>
          ) : null}

          {showKey ? (
            <div className="rounded-2xl border border-purple/40 bg-paper p-4">
              <h3 className="mb-3 text-h3 text-ink">{copy.answerKey}</h3>

              <p className="mb-4 border-l-2 border-purple pl-3 text-body italic text-ink">
                {key.core}
              </p>

              <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                {copy.prioritisedFirstStep}
              </h4>
              <p className="mb-2 text-body text-ink">{key.firstStep}</p>

              <div
                className={clsx(
                  "mb-4 rounded-xl px-3 py-2 text-caption",
                  isKeyChoice ? "bg-lilac text-navy" : "bg-lilac/60 text-navy",
                )}
              >
                {isKeyChoice ? copy.isKeyChoice : copy.isNotKeyChoice}
              </div>

              <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                {copy.whyItGoesFirst}
              </h4>
              <ul className="mb-4 space-y-1">
                {key.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2 text-body text-ink">
                    <span aria-hidden="true" className="text-purple">
                      &middot;
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>

              <div className="mb-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-line p-3">
                  <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                    {copy.shortTermSteps}
                  </h4>
                  <ul className="space-y-1">
                    {key.shortTerm.map((step) => (
                      <li key={step} className="text-caption text-ink">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-line p-3">
                  <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                    {copy.mediumTermSteps}
                  </h4>
                  <ul className="space-y-1">
                    {key.mediumTerm.map((step) => (
                      <li key={step} className="text-caption text-ink">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="border-t border-line pt-3 text-caption text-ash">{key.honesty}</p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setCommitted(null);
              setPicked(null);
              setShowKey(false);
            }}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            {copy.chooseAgain}
          </button>
        </div>
      ) : null}
    </section>
  );
}
