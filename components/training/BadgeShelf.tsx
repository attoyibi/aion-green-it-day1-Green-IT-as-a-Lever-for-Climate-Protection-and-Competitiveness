"use client";

import clsx from "clsx";
import { type CategoryCode } from "@/data/categories";
import { BADGE_THRESHOLD, CARDS } from "@/data/training";
import { fmt, useCategories, useLocale } from "@/lib/locale";

type Props = {
  /** All-time counts from the store, which is what lights a badge. */
  correctByCategory: Record<CategoryCode, number>;
  /** This round only, keyed by card id. */
  answers: Record<string, CategoryCode>;
};

const COPY = {
  en: {
    heading: "Category badges",
    intro: "The deck holds {n} cards per category. A badge lights when all {n} of them matched.",
    of: "{done} of {total}",
    earnedSuffix: " · earned",
    allMatched: "All three matched. Nothing to do here.",
    someMissed:
      "{missed} of these went into a different category. Finish the round, and the summary at the end will list them so you can read them again.",
    notAllMatched: "Answered, but not all matched. Run the stack again to light this one.",
  },
  de: {
    heading: "Kategorie-Abzeichen",
    intro:
      "Der Stapel enthält {n} Karten pro Kategorie. Ein Abzeichen leuchtet auf, sobald alle {n} davon richtig zugeordnet wurden.",
    of: "{done} von {total}",
    earnedSuffix: " · freigeschaltet",
    allMatched: "Alle drei richtig zugeordnet. Hier gibt es nichts mehr zu tun.",
    someMissed:
      "{missed} davon wurden einer anderen Kategorie zugeordnet. Beende die Runde – die Zusammenfassung am Ende listet sie auf, damit du sie dir noch einmal ansehen kannst.",
    notAllMatched:
      "Beantwortet, aber nicht alle passend zugeordnet. Durchlaufe den Stapel erneut, um dieses Abzeichen freizuschalten.",
  },
};

/** "{ahead} {name} cards still ahead" needs count-and-gender agreement neither
 * a plain fmt() token nor the English suffix-toggle handles once translated,
 * so it gets its own small helper instead of living in the COPY template. */
function aheadText(isDe: boolean, ahead: number, name: string): string {
  if (isDe) {
    return ahead === 1
      ? `1 ${name}-Karte liegt noch vor dir. Arbeite dich weiter durch den Stapel.`
      : `${ahead} ${name}-Karten liegen noch vor dir. Arbeite dich weiter durch den Stapel.`;
  }
  return `${ahead} ${name} card${ahead === 1 ? "" : "s"} still ahead of you. Keep going through the deck.`;
}

/**
 * One line per category saying what to do next. Card numbers were tried here
 * and removed: knowing a card is number 6 tells a learner nothing, and the
 * end-of-round summary already lists missed cards by their actual text.
 */
function nextStep({
  earned,
  missed,
  ahead,
  name,
  isDe,
  copy,
}: {
  earned: boolean;
  matched: number;
  missed: number;
  ahead: number;
  name: string;
  isDe: boolean;
  copy: (typeof COPY)["en"];
}): string {
  if (earned && missed === 0 && ahead === 0) {
    return copy.allMatched;
  }
  if (missed > 0) {
    return fmt(copy.someMissed, { missed });
  }
  if (ahead > 0) {
    return aheadText(isDe, ahead, name);
  }
  return copy.notAllMatched;
}

export function BadgeShelf({ correctByCategory, answers }: Props) {
  const { categories: CATEGORIES } = useCategories();
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;

  return (
    <div className="card p-4">
      <h2 className="mb-1 text-h3 text-ink">{copy.heading}</h2>
      <p className="mb-3 text-caption text-ash">{fmt(copy.intro, { n: BADGE_THRESHOLD })}</p>

      <ul className="space-y-2">
        {CATEGORIES.map((category) => {
          const allTime = correctByCategory[category.code] ?? 0;
          const earned = allTime >= BADGE_THRESHOLD;

          const cards = CARDS.filter((c) => c.correctCategory === category.code);
          const matched = cards.filter((c) => answers[c.id] === category.code).length;
          const missed = cards.filter(
            (c) => answers[c.id] && answers[c.id] !== category.code,
          ).length;
          const ahead = cards.length - matched - missed;

          return (
            <li
              key={category.code}
              className={clsx(
                "rounded-xl border p-3 transition-colors duration-200",
                earned ? "border-line bg-paper" : "border-dashed border-line bg-lilac/30",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold",
                    earned ? "text-paper" : "text-ash",
                  )}
                  style={{
                    backgroundColor: earned ? category.hex : "transparent",
                    border: earned ? "none" : "2px dashed currentColor",
                  }}
                >
                  {category.code}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={clsx(
                      "block text-body",
                      earned ? "font-semibold text-ink" : "text-ash",
                    )}
                  >
                    {category.name}
                  </span>
                  <span className="block text-caption text-ash">
                    {fmt(copy.of, { done: Math.min(allTime, BADGE_THRESHOLD), total: BADGE_THRESHOLD })}
                    {earned ? copy.earnedSuffix : ""}
                  </span>
                </span>
              </div>

              <p
                className={clsx(
                  "mt-2 border-t border-line pt-2 text-caption",
                  missed > 0 ? "text-warn" : earned ? "text-good" : "text-ash",
                )}
              >
                {nextStep({ earned, matched, missed, ahead, name: category.name, isDe, copy })}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
