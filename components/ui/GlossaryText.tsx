"use client";

import { Fragment, type ReactNode } from "react";
import { GLOSSARY_BY_ID, GLOSSARY_BY_ID_DE, type GlossaryEntry } from "@/data/glossary";
import { fmt, useLocale } from "@/lib/locale";

const COPY = {
  en: {
    whatIs: "What is {term}?",
    close: "Close",
    whyItMatters: "Why it matters: ",
  },
  de: {
    whatIs: "Was ist {term}?",
    close: "Schließen",
    whyItMatters: "Warum das wichtig ist: ",
  },
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Every string a term should link on, longest first so "shop floor" wins over "shop". */
const phrasesFor = (entry: GlossaryEntry) =>
  [entry.match, ...(entry.also ?? [])].sort((a, b) => b.length - a.length);

type Hit = { start: number; end: number; id: string };

/**
 * Links only the terms a card explicitly declares, so no unrelated word is
 * ever caught by accident. The first occurrence of each term is linked once —
 * marking every repeat turns the sentence into noise.
 *
 * `glossaryById` is passed in rather than read from the module import
 * directly, so the caller can hand it the German lookup (GLOSSARY_BY_ID_DE)
 * when the text being scanned is itself German — matching stays exact-string
 * and case-insensitive, so some inflected German forms will not be caught;
 * that is a known, accepted limitation, not something to fix here.
 */
function findHits(
  text: string,
  termIds: string[],
  glossaryById: Record<string, GlossaryEntry>,
): Hit[] {
  const hits: Hit[] = [];

  for (const id of termIds) {
    const entry = glossaryById[id];
    if (!entry) continue;

    for (const phrase of phrasesFor(entry)) {
      const re = new RegExp(`(^|[^\\p{L}\\p{N}-])(${escape(phrase)})(?![\\p{L}\\p{N}])`, "iu");
      const m = re.exec(text);
      if (!m || m.index === undefined) continue;

      const start = m.index + m[1].length;
      const end = start + m[2].length;

      // Skip anything overlapping a term already matched.
      if (hits.some((h) => start < h.end && end > h.start)) continue;

      hits.push({ start, end, id });
      break;
    }
  }

  return hits.sort((a, b) => a.start - b.start);
}

type Props = {
  text: string;
  termIds: string[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function GlossaryText({ text, termIds, activeId, onSelect }: Props) {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const glossaryById = isDe ? GLOSSARY_BY_ID_DE : GLOSSARY_BY_ID;

  const hits = findHits(text, termIds, glossaryById);
  if (hits.length === 0) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;

  hits.forEach((hit, i) => {
    if (hit.start > cursor) parts.push(text.slice(cursor, hit.start));

    parts.push(
      <button
        key={`${hit.id}-${i}`}
        type="button"
        onClick={() => onSelect(hit.id)}
        aria-pressed={activeId === hit.id}
        title={fmt(copy.whatIs, { term: glossaryById[hit.id].term })}
        className={
          activeId === hit.id
            ? "rounded bg-purple/15 font-semibold text-purple decoration-purple decoration-dotted underline-offset-4 underline"
            : "rounded font-semibold text-navy decoration-purple decoration-dotted underline-offset-4 underline transition-colors duration-200 hover:bg-lilac hover:text-purple"
        }
      >
        {text.slice(hit.start, hit.end)}
      </button>,
    );

    cursor = hit.end;
  });

  if (cursor < text.length) parts.push(text.slice(cursor));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}

/** The expanded definition for whichever term is open. */
export function TermPanel({
  termId,
  onClose,
}: {
  termId: string;
  onClose: () => void;
}) {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const glossaryById = isDe ? GLOSSARY_BY_ID_DE : GLOSSARY_BY_ID;
  const entry = glossaryById[termId];
  if (!entry) return null;

  return (
    <div className="mt-3 rounded-xl border border-purple bg-lilac/50 p-3" aria-live="polite">
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-h3 text-ink">{entry.term}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg border border-line bg-paper px-2 py-1 text-caption text-ash transition-colors duration-200 hover:text-navy hover:underline"
        >
          {copy.close}
        </button>
      </div>

      <p className="text-body text-ink">{entry.plain}</p>

      {entry.soWhat ? (
        <p className="mt-2 border-t border-line pt-2 text-body text-navy">
          <span className="font-semibold">{copy.whyItMatters}</span>
          {entry.soWhat}
        </p>
      ) : null}
    </div>
  );
}
