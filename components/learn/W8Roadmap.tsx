"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  W8,
  W8_DE,
  W8_PROFILES,
  W8_PROFILES_DE,
  W8_REFERENCE,
  W8_REFERENCE_DE,
  W8_TRADEOFFS,
  W8_TRADEOFFS_DE,
  type RoadmapProfile,
} from "@/data/learn";
import { fmt, useLocale } from "@/lib/locale";
import { WidgetShell } from "./WidgetShell";
import { PlacementBoard, type Verdict } from "./PlacementBoard";
import { useWidget } from "./useWidget";

const TONE: Record<RoadmapProfile["tone"], string> = {
  good: "border-good bg-good/10",
  warn: "border-warn bg-warn/10",
  danger: "border-danger bg-danger/10",
};

const COPY = {
  en: {
    hideKey: "Hide the answer key",
    showKey: "Stuck? Show the answer key",
    clearBoard: "Clear the board and try another order",
    answerKeyHeading: "Answer key",
    keyIntro:
      "One defensible order, not the only one. What makes it defensible is the reasoning under each step. That is the part worth arguing with, and the part a board will ask you about.",
    why: "Why: ",
    layOut: "Lay this order out on the board",
    hideTradeoffs: "Hide the trade-offs",
    whatDoesCost: "What does this ordering cost me?",
    planReadsAs: "Your plan reads as",
    whatItCosts: "What it costs: ",
    measureByMeasure: "Measure by measure",
    compareKey: "Compare with the answer key →",
    compareKeyRest: "One defensible order, with the reason each step sits where it does.",
    notPlacedYet: "{req} is not placed yet.",
    runsBefore: 'Runs before "{prereq}", which it depends on. Expect to redo this one.',
    sameQuarter: "{req} is in the same quarter, so there is no room between them.",
    inPlaceByThen: "{req} is in place by then.",
  },
  de: {
    hideKey: "Musterlösung verbergen",
    showKey: "Nicht weiter? Musterlösung anzeigen",
    clearBoard: "Board leeren und eine andere Reihenfolge versuchen",
    answerKeyHeading: "Musterlösung",
    keyIntro:
      "Eine vertretbare Reihenfolge, nicht die einzige. Vertretbar wird sie durch die Begründung hinter jedem Schritt. Das ist der Teil, über den sich streiten lässt – und der Teil, nach dem dich ein Vorstand fragen wird.",
    why: "Warum: ",
    layOut: "Diese Reihenfolge auf dem Board anlegen",
    hideTradeoffs: "Abwägungen verbergen",
    whatDoesCost: "Was kostet mich diese Reihenfolge?",
    planReadsAs: "Dein Plan liest sich als",
    whatItCosts: "Was es kostet: ",
    measureByMeasure: "Maßnahme für Maßnahme",
    compareKey: "Mit der Musterlösung vergleichen →",
    compareKeyRest: "Eine vertretbare Reihenfolge, mit der Begründung, warum jeder Schritt dort sitzt.",
    notPlacedYet: "{req} ist noch nicht platziert.",
    runsBefore: "Läuft vor „{prereq}“, wovon sie abhängt. Erwarte, dass du sie wiederholen musst.",
    sameQuarter: "{req} liegt im selben Quartal, es gibt also keinen Abstand dazwischen.",
    inPlaceByThen: "{req} steht bis dahin fest.",
  },
};

export function W8Roadmap() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const data = locale === "de" ? W8_DE : W8;
  const profiles = locale === "de" ? W8_PROFILES_DE : W8_PROFILES;
  const reference = locale === "de" ? W8_REFERENCE_DE : W8_REFERENCE;
  const tradeoffs = locale === "de" ? W8_TRADEOFFS_DE : W8_TRADEOFFS;

  const label = (id: string) => data.measures.find((m) => m.id === id)?.text ?? id;

  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [showTradeoffs, setShowTradeoffs] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { complete } = useWidget(W8.id, W8.xp);

  const placedCount = Object.keys(placements).length;
  const done = placedCount === data.measures.length;

  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const place = (itemId: string, targetId: string) => {
    setSelected(null);
    setShowTradeoffs(false);
    setPlacements((prev) => {
      if (!targetId) {
        const { [itemId]: _dropped, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: targetId };
    });
  };

  const clearBoard = () => {
    setPlacements({});
    setSelected(null);
    setShowTradeoffs(false);
  };

  /** Lay the reference order out on the board, so it can be seen in place. */
  const fillWithReference = () => {
    const next: Record<string, string> = {};
    for (const step of reference) {
      for (const id of step.measures) next[id] = step.quarter;
    }
    setPlacements(next);
    setSelected(null);
    setShowTradeoffs(false);
  };

  const quarterIndex = (id: string | undefined) => (id ? data.quarters.indexOf(id) : -1);

  // Ordering, not correctness: a measure placed before its prerequisite is a
  // re-run waiting to happen, and the widget says so rather than scoring it.
  const verdicts: Record<string, Verdict> = {};
  for (const measure of data.measures) {
    const own = quarterIndex(placements[measure.id]);
    if (own < 0) continue;

    if (!measure.requires) {
      verdicts[measure.id] = { tone: "neutral", message: measure.requiresLabel };
      continue;
    }

    const prereq = data.measures.find((m) => m.id === measure.requires);
    const prereqQuarter = quarterIndex(placements[measure.requires]);

    if (prereqQuarter < 0) {
      verdicts[measure.id] = {
        tone: "warn",
        message: fmt(copy.notPlacedYet, { req: measure.requiresLabel }),
      };
    } else if (prereqQuarter > own) {
      verdicts[measure.id] = {
        tone: "danger",
        message: fmt(copy.runsBefore, { prereq: prereq?.text ?? "" }),
      };
    } else if (prereqQuarter === own) {
      verdicts[measure.id] = {
        tone: "warn",
        message: fmt(copy.sameQuarter, { req: measure.requiresLabel }),
      };
    } else {
      verdicts[measure.id] = {
        tone: "good",
        message: fmt(copy.inPlaceByThen, { req: measure.requiresLabel }),
      };
    }
  }

  const analysis = useMemo(() => {
    if (!done) return null;

    const perQuarter = data.quarters.map(
      (q) => data.measures.filter((m) => placements[m.id] === q).length,
    );

    const violations = data.measures.filter((m) => {
      if (!m.requires) return false;
      return quarterIndex(placements[m.requires]) > quarterIndex(placements[m.id]);
    });

    const stacked = data.measures.filter((m) => {
      if (!m.requires) return false;
      return quarterIndex(placements[m.requires]) === quarterIndex(placements[m.id]);
    });

    // Late means the second half of the year, where a measure stops steering
    // anything within the year it was planned for.
    const late = data.measures.filter((m) => quarterIndex(placements[m.id]) >= 2);
    const firstHalf = perQuarter[0] + perQuarter[1];

    let profileId = "evenly-paced";
    if (violations.length > 0) profileId = "out-of-sequence";
    else if (perQuarter.some((n) => n === data.measures.length)) profileId = "all-at-once";
    else if (firstHalf <= 1) profileId = "back-loaded";
    else if (perQuarter[0] >= 4) profileId = "front-loaded";
    else if (
      quarterIndex(placements["w8-owner"]) === 0 &&
      quarterIndex(placements["w8-report"]) >= 2 &&
      stacked.length <= 1
    )
      profileId = "foundation-first";

    const profile = profiles.find((p) => p.id === profileId) ?? profiles[profiles.length - 1];

    // One line per measure: what this particular placement costs, or earns.
    const notes = data.measures.map((m) => {
      const tradeoff = tradeoffs.find((t) => t.id === m.id);
      const own = quarterIndex(placements[m.id]);
      const isStacked = stacked.some((s) => s.id === m.id);
      const isLate = own >= 2;

      if (!tradeoff) return null;
      if (isStacked && tradeoff.ifStacked) {
        return { id: m.id, tone: "warn" as const, text: tradeoff.ifStacked };
      }
      if (isLate && m.id !== "w8-report") {
        return { id: m.id, tone: "warn" as const, text: tradeoff.ifLate };
      }
      return { id: m.id, tone: "good" as const, text: tradeoff.wellPlaced };
    });

    return { profile, notes: notes.filter(Boolean), violations, late };
  }, [done, placements, data.quarters, data.measures, profiles, tradeoffs]);

  return (
    <WidgetShell
      meta={data}
      progress={placedCount / data.measures.length}
      done={done}
      closing={data.closing}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-expanded={showKey}
          onClick={() => setShowKey(!showKey)}
          className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
        >
          {showKey ? copy.hideKey : copy.showKey}
        </button>

        {placedCount > 0 ? (
          <button
            type="button"
            onClick={clearBoard}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
          >
            {copy.clearBoard}
          </button>
        ) : null}
      </div>

      {showKey ? (
        <div className="mb-4 rounded-xl border-l-4 border-purple bg-lilac/40 p-4">
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
            {copy.answerKeyHeading}
          </p>
          <p className="mb-3 text-body text-ink">{copy.keyIntro}</p>

          <ol className="space-y-2">
            {reference.map((step) => (
              <li key={step.quarter} className="rounded-xl bg-paper p-3">
                <p className="text-body font-semibold text-ink">
                  {step.quarter}: {step.measures.map(label).join(", ")}
                </p>
                <p className="mt-1 text-caption text-navy">
                  <span className="font-semibold">{copy.why}</span>
                  {step.why}
                </p>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={fillWithReference}
            className="mt-3 rounded-xl bg-purple px-4 py-2 text-caption font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            {copy.layOut}
          </button>
        </div>
      ) : null}

      <PlacementBoard
        items={data.measures.map((m) => ({
          id: m.id,
          text: m.text,
          trailing: m.requiresLabel,
        }))}
        targets={data.quarters.map((q) => ({ id: q, label: q }))}
        placements={placements}
        verdicts={verdicts}
        selectedId={selected}
        onSelectItem={setSelected}
        onPlace={place}
        targetGrid="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
      />

      {done ? (
        <div className="mt-4 border-t border-line pt-4">
          <button
            type="button"
            aria-expanded={showTradeoffs}
            onClick={() => setShowTradeoffs(!showTradeoffs)}
            className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            {showTradeoffs ? copy.hideTradeoffs : copy.whatDoesCost}
          </button>

          {showTradeoffs && analysis ? (
            <div className="mt-3 space-y-3">
              <div className={clsx("rounded-xl border-l-4 p-4", TONE[analysis.profile.tone])}>
                <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                  {copy.planReadsAs}
                </p>
                <h4 className="mb-2 text-h3 text-ink">{analysis.profile.label}</h4>
                <p className="mb-2 text-body text-ink">{analysis.profile.what}</p>
                <p className="text-body text-navy">
                  <span className="font-semibold">{copy.whatItCosts}</span>
                  {analysis.profile.cost}
                </p>
              </div>

              <div>
                <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                  {copy.measureByMeasure}
                </p>
                <ul className="space-y-2">
                  {analysis.notes.map((note) =>
                    note ? (
                      <li
                        key={note.id}
                        className={clsx(
                          "rounded-xl border-l-4 p-3",
                          note.tone === "good"
                            ? "border-good bg-good/10"
                            : "border-warn bg-warn/10",
                        )}
                      >
                        <p className="text-body font-semibold text-ink">
                          {label(note.id)}{" "}
                          <span className="font-normal text-ash">
                            · {placements[note.id]}
                          </span>
                        </p>
                        <p className="mt-1 text-body text-ink">{note.text}</p>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setShowKey(true)}
                className="w-full rounded-xl border border-line p-3 text-left text-body text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac"
              >
                <span className="font-semibold">{copy.compareKey}</span> {copy.compareKeyRest}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </WidgetShell>
  );
}
