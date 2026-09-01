"use client";

import { useMemo, useState } from "react";
import { GLOSSARY, GLOSSARY_DE } from "@/data/glossary";
import { fmt, useLocale } from "@/lib/locale";

const COPY = {
  en: {
    heading: "Glossary",
    subheading: "{n} terms in plain language, with why each one matters",
    filterLabel: "Filter",
    placeholder: "e.g. HVAC, baseline, Scope 3",
    noMatch: "No term matches “{query}”.",
    whyItMatters: "Why it matters: ",
  },
  de: {
    heading: "Glossar",
    subheading: "{n} Begriffe in einfacher Sprache, jeweils mit Erklärung, warum sie wichtig sind",
    filterLabel: "Filtern",
    placeholder: "z. B. HVAC, Ausgangswert, Scope 3",
    noMatch: "Kein Begriff passt zu „{query}“.",
    whyItMatters: "Warum das wichtig ist: ",
  },
};

/** The whole vocabulary in one place, for a participant who wants to look ahead. */
export function GlossaryReference() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const glossary = isDe ? GLOSSARY_DE : GLOSSARY;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
    if (!q) return sorted;
    return sorted.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.plain.toLowerCase().includes(q) ||
        (e.soWhat ?? "").toLowerCase().includes(q),
    );
  }, [query, glossary]);

  return (
    <section aria-labelledby="glossary-title" className="card mt-6 overflow-hidden">
      <h2 id="glossary-title">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-lilac/60"
        >
          <span>
            <span className="block text-h3 text-ink">{copy.heading}</span>
            <span className="block text-caption text-ash">
              {fmt(copy.subheading, { n: glossary.length })}
            </span>
          </span>
          <span aria-hidden="true" className="text-h3 text-purple">
            {open ? "−" : "+"}
          </span>
        </button>
      </h2>

      {open ? (
        <div className="border-t border-line p-4">
          <label htmlFor="glossary-search" className="text-caption text-ash">
            {copy.filterLabel}
          </label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
            className="mb-4 mt-1 w-full rounded-xl border border-line px-3 py-2 text-body text-ink placeholder:text-ash"
          />

          {entries.length === 0 ? (
            <p className="text-body text-ash">{fmt(copy.noMatch, { query })}</p>
          ) : (
            <dl className="grid gap-3 md:grid-cols-2">
              {entries.map((entry) => (
                <div key={entry.id} id={`glossary-${entry.id}`} className="rounded-xl border border-line p-3">
                  <dt className="text-body font-semibold text-ink">{entry.term}</dt>
                  <dd className="mt-1 text-body text-ash">{entry.plain}</dd>
                  {entry.soWhat ? (
                    <dd className="mt-2 border-t border-line pt-2 text-caption text-navy">
                      <span className="font-semibold">{copy.whyItMatters}</span>
                      {entry.soWhat}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          )}
        </div>
      ) : null}
    </section>
  );
}
