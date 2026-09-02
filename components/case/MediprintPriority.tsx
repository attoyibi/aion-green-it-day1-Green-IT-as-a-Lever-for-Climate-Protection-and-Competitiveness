"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  INITIATIVES,
  INITIATIVES_DE,
  INITIATIVE_KEY,
  INITIATIVE_KEY_DE,
} from "@/data/mediprint";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    step: "Task 2, Section C",
    title: "Which initiative goes first?",
    intro:
      "Rank all three. Each of A, B and C appears exactly once, so choosing a letter that is already placed swaps the two — the sheet's self-check cannot be failed here. Write one sentence of reason per row: that sentence is what Section C is marked on.",
    ranks: ["First priority", "Second priority", "Third priority"],
    pickPrompt: "Choose:",
    reasonLabel: "Your reason, one sentence",
    reasonPlaceholder: "I put this here because …",
    incomplete: "Place all three to continue.",
    canChange: "You can still change the order until you confirm it.",
    confirm: "Confirm this ranking",
    yourRanking: "Your ranking",
    whatItCosts: "What this one costs, or leaves open",
    noReason: "No reason written for this row. Section C is marked on the reason, not the letter.",
    showKey: "Show the answer key",
    writeFirst:
      "Write your three reasons first. Agreeing with the key is easy; arriving at it yourself is the exercise.",
    answerKey: "Answer key",
    modelOrder: "The model order",
    whichAxis: "Which axis decided it",
    matchesKey:
      "This is the order the key proposes. The costs above still apply — they are the price of the order, not an argument against it.",
    differsFromKey:
      "This is not the order the key proposes. That does not make yours wrong. It means your three sentences now have to hold against this one.",
    startAgain: "Rank them again",
  },
  de: {
    step: "Aufgabe 2, Abschnitt C",
    title: "Welche Initiative kommt zuerst?",
    intro:
      "Bring alle drei in eine Reihenfolge. A, B und C kommen je genau einmal vor: Wählst du einen Buchstaben, der schon vergeben ist, tauschen die beiden Plätze — die Selbstkontrolle des Arbeitsblatts kann hier gar nicht fehlschlagen. Schreibe pro Zeile einen Satz Begründung: Genau dieser Satz wird in Abschnitt C bewertet.",
    ranks: ["Erste Priorität", "Zweite Priorität", "Dritte Priorität"],
    pickPrompt: "Wähle:",
    reasonLabel: "Deine Begründung, ein Satz",
    reasonPlaceholder: "Ich setze das hierhin, weil …",
    incomplete: "Vergib alle drei Plätze, um fortzufahren.",
    canChange: "Du kannst die Reihenfolge noch ändern, bis du sie bestätigst.",
    confirm: "Diese Reihenfolge bestätigen",
    yourRanking: "Deine Reihenfolge",
    whatItCosts: "Was diese Option kostet oder offenlässt",
    noReason:
      "Für diese Zeile ist keine Begründung geschrieben. Abschnitt C wird an der Begründung bewertet, nicht am Buchstaben.",
    showKey: "Musterlösung anzeigen",
    writeFirst:
      "Schreibe zuerst deine drei Begründungen. Der Musterlösung zuzustimmen ist leicht; selbst darauf zu kommen, ist die Übung.",
    answerKey: "Musterlösung",
    modelOrder: "Die vorgeschlagene Reihenfolge",
    whichAxis: "Welche Achse entschieden hat",
    matchesKey:
      "Das ist die Reihenfolge, die die Musterlösung vorschlägt. Die Kosten oben gelten weiterhin — sie sind der Preis dieser Reihenfolge, kein Argument dagegen.",
    differsFromKey:
      "Das ist nicht die Reihenfolge der Musterlösung. Das macht deine nicht falsch. Es bedeutet, dass deine drei Sätze jetzt gegen diese hier bestehen müssen.",
    startAgain: "Neu ordnen",
  },
};

const RANK_COUNT = 3;

/**
 * Task 2, Section C — the ranking the worksheet asks for.
 *
 * Two stages, the same shape as NordcomFirstStep: the learner commits an
 * order and reads what their own order costs, before any key is offered. The
 * swap-on-collision rule makes the sheet's "no repeats" self-check structural
 * rather than a warning, which is the whole reason this exists as a widget
 * rather than three dropdowns.
 */
export function MediprintPriority() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const initiatives = isDe ? INITIATIVES_DE : INITIATIVES;
  const key = isDe ? INITIATIVE_KEY_DE : INITIATIVE_KEY;

  /** rank index (0..2) -> initiative id */
  const [ranks, setRanks] = useState<(string | null)[]>([null, null, null]);
  const [reasons, setReasons] = useState<string[]>(["", "", ""]);
  const [committed, setCommitted] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const complete = ranks.every((r) => r !== null);
  const matchesKey = complete && ranks.every((id, i) => id === key.order[i]);

  /** Placing a letter that is already ranked swaps the two rows. */
  const place = (rankIndex: number, id: string) => {
    setRanks((prev) => {
      const next = [...prev];
      const existing = prev.indexOf(id);
      const displaced = prev[rankIndex];

      next[rankIndex] = id;
      if (existing !== -1 && existing !== rankIndex) next[existing] = displaced;
      return next;
    });
  };

  const byId = (id: string | null) => initiatives.find((i) => i.id === id) ?? null;

  return (
    <section aria-labelledby="priority-title" className="card p-5 md:p-6" id="priority">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        {copy.step}
      </p>
      <h2 id="priority-title" className="mb-2 text-h2 text-ink">
        {copy.title}
      </h2>
      <p className="mb-5 text-body text-ash">{copy.intro}</p>

      <ol className="mb-4 space-y-3">
        {Array.from({ length: RANK_COUNT }, (_, rankIndex) => {
          const chosen = byId(ranks[rankIndex]);

          return (
            <li key={rankIndex} className="rounded-2xl border border-line p-4">
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                  {rankIndex + 1}
                </span>
                <h3 className="text-body font-semibold text-ink">{copy.ranks[rankIndex]}</h3>

                <span className="ml-auto flex items-center gap-2">
                  <span className="text-caption text-ash">{copy.pickPrompt}</span>
                  {initiatives.map((initiative) => {
                    const isOn = ranks[rankIndex] === initiative.id;
                    return (
                      <button
                        key={initiative.id}
                        type="button"
                        disabled={committed}
                        aria-pressed={isOn}
                        aria-label={`${copy.ranks[rankIndex]}: ${initiative.title}`}
                        onClick={() => place(rankIndex, initiative.id)}
                        className={clsx(
                          "flex h-9 w-9 items-center justify-center rounded-lg border text-body font-semibold transition-colors duration-200",
                          isOn
                            ? "border-purple bg-purple text-paper"
                            : "border-line bg-paper text-navy hover:border-purple hover:bg-lilac",
                          committed && !isOn && "opacity-40",
                        )}
                      >
                        {initiative.letter}
                      </button>
                    );
                  })}
                </span>
              </div>

              {chosen ? (
                <p className="mb-2 text-caption text-ash">{chosen.title}</p>
              ) : null}

              <label className="block">
                <span className="mb-1 block text-caption font-semibold uppercase tracking-wide text-ash">
                  {copy.reasonLabel}
                </span>
                <textarea
                  value={reasons[rankIndex]}
                  disabled={committed}
                  onChange={(e) =>
                    setReasons((prev) => {
                      const next = [...prev];
                      next[rankIndex] = e.target.value;
                      return next;
                    })
                  }
                  rows={2}
                  placeholder={copy.reasonPlaceholder}
                  className="w-full rounded-xl border border-line bg-paper p-2 text-body text-ink outline-none transition-colors duration-200 focus:border-purple disabled:bg-lilac/30"
                />
              </label>
            </li>
          );
        })}
      </ol>

      {!committed ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!complete}
            onClick={() => setCommitted(true)}
            className="rounded-xl bg-navy px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-purple disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copy.confirm}
          </button>
          <span className="text-caption text-ash">
            {complete ? copy.canChange : copy.incomplete}
          </span>
        </div>
      ) : (
        <div className="space-y-3" aria-live="polite">
          <div className="rounded-2xl border border-line bg-lilac/50 p-4">
            <h3 className="mb-3 text-h3 text-ink">{copy.yourRanking}</h3>
            <ol className="space-y-3">
              {ranks.map((id, rankIndex) => {
                const initiative = byId(id);
                if (!initiative) return null;
                return (
                  <li key={id} className="border-l-2 border-purple pl-3">
                    <p className="text-body font-semibold text-ink">
                      {rankIndex + 1}. {initiative.title}
                    </p>
                    {reasons[rankIndex].trim() ? (
                      <p className="mt-1 text-body italic text-navy">
                        &ldquo;{reasons[rankIndex].trim()}&rdquo;
                      </p>
                    ) : (
                      <p className="mt-1 text-caption text-warn">{copy.noReason}</p>
                    )}
                    <p className="mt-2 text-caption font-semibold uppercase tracking-wide text-ash">
                      {copy.whatItCosts}
                    </p>
                    <p className="text-caption text-ash">{initiative.costs}</p>
                  </li>
                );
              })}
            </ol>
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

              <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                {copy.modelOrder}
              </h4>
              <ol className="mb-4 space-y-2">
                {key.order.map((id, i) => {
                  const initiative = byId(id);
                  if (!initiative) return null;
                  return (
                    <li key={id} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-purple bg-lilac text-caption font-semibold text-purple">
                        {initiative.letter}
                      </span>
                      <span>
                        <span className="block text-body font-semibold text-ink">
                          {i + 1}. {initiative.title}
                        </span>
                        <span className="block text-caption text-ash">{key.why[id]}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mb-4 rounded-xl bg-lilac/60 px-3 py-2 text-caption text-navy">
                {matchesKey ? copy.matchesKey : copy.differsFromKey}
              </div>

              <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                {copy.whichAxis}
              </h4>
              <p className="mb-4 text-body text-ink">{key.axis}</p>

              <p className="border-t border-line pt-3 text-caption text-ash">{key.honesty}</p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setCommitted(false);
              setShowKey(false);
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
