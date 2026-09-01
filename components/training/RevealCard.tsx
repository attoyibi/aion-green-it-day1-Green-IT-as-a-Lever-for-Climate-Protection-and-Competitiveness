"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { GLOSSARY_BY_ID, GLOSSARY_BY_ID_DE } from "@/data/glossary";
import { GlossaryText, TermPanel } from "@/components/ui/GlossaryText";
import { type CategoryCode } from "@/data/categories";
import { VERDICT_LABEL, VERDICT_LABEL_DE, type PracticeCard } from "@/data/training";
import { FieldNote } from "@/components/learn/FieldNote";
import { fmt, useCategories, useLocale } from "@/lib/locale";

const VERDICT_STYLE = {
  green: "border-good bg-good/10",
  amber: "border-warn bg-warn/10",
  red: "border-danger bg-danger/10",
} as const;

const VERDICT_DOT = {
  green: "bg-good",
  amber: "bg-warn",
  red: "bg-danger",
} as const;

const COPY = {
  en: {
    cardOfTotal: "Card {index} of {total}",
    theSetting: "The setting: ",
    wordsOnCard: "Words on this card:",
    whichCategory: "Which category does this belong to? Press 1 to 5, or choose below.",
    hideNudge: "Hide the nudge",
    takeNudge: "Stuck? Take a nudge",
    opensOnceChosen: "Opens once you choose. Nothing is lost by choosing wrong",
    checklist: [
      "The verdict, and whether your pick matched",
      "What it is, and who it affects",
      "The before-and-after fix",
      "The rule to take back to your own organisation",
    ],
    youHadIt: "You had it",
    youSaid: "You said {name}",
    whatItIs: "What it is",
    whoItAffects: "Who it affects",
    before: "Before",
    after: "After",
    takeThisWithYou: "Take this with you: ",
    finish: "Finish",
    nextCard: "Next card",
  },
  de: {
    cardOfTotal: "Karte {index} von {total}",
    theSetting: "Die Ausgangslage: ",
    wordsOnCard: "Begriffe auf dieser Karte:",
    whichCategory: "Zu welcher Kategorie gehört das? Drücke 1 bis 5 oder wähle unten aus.",
    hideNudge: "Tipp ausblenden",
    takeNudge: "Nicht weiter? Hol dir einen Tipp",
    opensOnceChosen: "Öffnet sich, sobald du wählst. Eine falsche Wahl kostet dich nichts",
    checklist: [
      "Die Einordnung – und ob deine Wahl gestimmt hat",
      "Was es ist und wen es betrifft",
      "Die Lösung: vorher und nachher",
      "Die Regel, die du in deine eigene Organisation mitnimmst",
    ],
    youHadIt: "Richtig erkannt",
    youSaid: "Du hast {name} gewählt",
    whatItIs: "Was es ist",
    whoItAffects: "Wen es betrifft",
    before: "Vorher",
    after: "Nachher",
    takeThisWithYou: "Nimm das mit: ",
    finish: "Abschließen",
    nextCard: "Nächste Karte",
  },
};

type Props = {
  card: PracticeCard;
  index: number;
  total: number;
  chosen: CategoryCode | null;
  onChoose: (code: CategoryCode) => void;
  onNext: () => void;
  isLast: boolean;
};

export function RevealCard({
  card,
  index,
  total,
  chosen,
  onChoose,
  onNext,
  isLast,
}: Props) {
  const { categories: CATEGORIES, byCode: CATEGORY_BY_CODE } = useCategories();
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const glossaryById = isDe ? GLOSSARY_BY_ID_DE : GLOSSARY_BY_ID;
  const verdictLabel = isDe ? VERDICT_LABEL_DE : VERDICT_LABEL;
  const [term, setTerm] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const revealed = chosen !== null;

  // Every prose field goes through this, so a term is explained wherever it appears.
  const gloss = (text: string) => (
    <GlossaryText
      text={text}
      termIds={card.terms}
      activeId={term}
      onSelect={(id) => setTerm(term === id ? null : id)}
    />
  );
  const right = chosen === card.correctCategory;
  const answer = CATEGORY_BY_CODE[card.correctCategory];

  return (
    <article className="card p-5">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <p className="text-caption uppercase tracking-wide text-ash">
          {fmt(copy.cardOfTotal, { index: index + 1, total })}
        </p>
        <code className="text-caption text-ash">{card.id}</code>
      </div>

      <p className="mb-3 rounded-xl border-l-4 border-line bg-lilac/40 p-3 text-body text-ash">
        <span className="font-semibold text-navy">{copy.theSetting}</span>
        {card.setting}
      </p>

      <p className="mb-3 text-h3 font-normal leading-relaxed text-ink">
        {gloss(card.snippet)}
      </p>

      {card.terms.length > 0 ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-caption text-ash">{copy.wordsOnCard}</span>
          {card.terms.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={term === id}
              onClick={() => setTerm(term === id ? null : id)}
              className={clsx(
                "rounded-lg border px-2 py-1 text-caption transition-colors duration-200",
                term === id
                  ? "border-purple bg-purple text-paper"
                  : "border-line text-navy hover:border-purple hover:bg-lilac",
              )}
            >
              {glossaryById[id]?.term ?? id}
            </button>
          ))}
        </div>
      ) : null}

      {term ? <TermPanel termId={term} onClose={() => setTerm(null)} /> : null}

      <div className="mb-4" />

      {!revealed ? (
        <>
          <p className="mb-2 text-body text-ash">{copy.whichCategory}</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {CATEGORIES.map((category, i) => (
              <button
                key={category.code}
                type="button"
                onClick={() => onChoose(category.code)}
                className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-body text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-navy text-[11px] font-semibold text-paper">
                  {i + 1}
                </span>
                {category.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={hintOpen}
            onClick={() => setHintOpen(!hintOpen)}
            className="rounded-xl border border-line px-3 py-1.5 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
          >
            {hintOpen ? copy.hideNudge : copy.takeNudge}
          </button>

          {hintOpen ? (
            <p className="mt-2 rounded-xl border-l-4 border-warn bg-warn/10 p-3 text-body text-ink">
              {card.hint}
            </p>
          ) : null}

          {/* Without this the card ends abruptly and reads as broken. */}
          <div className="mt-4 rounded-xl border border-dashed border-line bg-lilac/30 p-4">
            <p className="mb-3 text-caption font-semibold uppercase tracking-wide text-ash">
              {copy.opensOnceChosen}
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              {copy.checklist.map((line) => (
                <li key={line} className="flex items-start gap-2 text-body text-ash">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-dashed border-ash"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <div
            className={clsx(
              "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border-l-4 p-3",
              VERDICT_STYLE[card.verdict],
            )}
          >
            <span
              aria-hidden="true"
              className={clsx("h-3 w-3 shrink-0 rounded-full", VERDICT_DOT[card.verdict])}
            />
            <span className="text-body font-semibold text-ink">
              {verdictLabel[card.verdict]}
            </span>
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-caption font-semibold",
                right ? "bg-good text-paper" : "bg-danger text-paper",
              )}
            >
              {right ? copy.youHadIt : fmt(copy.youSaid, { name: CATEGORY_BY_CODE[chosen].name })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-caption text-navy">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: answer.hex }}
              />
              {answer.name}
            </span>
          </div>

          <dl className="grid gap-3 md:grid-cols-2">
            <Row term={copy.whatItIs} detail={gloss(card.whatItIs)} />
            <Row term={copy.whoItAffects} detail={gloss(card.whoItAffects)} />
          </dl>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold uppercase tracking-wide text-danger">
                {copy.before}
              </p>
              <p className="text-body text-ink">{gloss(card.fixBefore)}</p>
            </div>
            <div className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold uppercase tracking-wide text-good">
                {copy.after}
              </p>
              <p className="text-body text-ink">{gloss(card.fixAfter)}</p>
            </div>
          </div>

          <p className="rounded-xl border-l-4 border-navy bg-lilac/60 p-3 text-body text-navy">
            <span className="font-semibold">{copy.takeThisWithYou}</span>
            {gloss(card.principle)}
          </p>

          {card.note ? <FieldNote note={card.note} /> : null}

          <button
            type="button"
            onClick={onNext}
            autoFocus
            className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            {isLast ? copy.finish : copy.nextCard}
          </button>
        </div>
      )}
    </article>
  );
}

function Row({ term, detail }: { term: string; detail: ReactNode }) {
  return (
    <div className="rounded-xl border border-line p-3">
      <dt className="text-caption font-semibold uppercase tracking-wide text-ash">{term}</dt>
      <dd className="mt-1 text-body text-ink">{detail}</dd>
    </div>
  );
}
