"use client";

import { SOURCES } from "@/data/sources";
import type { FieldNote as Note } from "@/data/learn";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: { fromField: "From the field", source: "Source: " },
  de: { fromField: "Aus der Praxis", source: "Quelle: " },
};

/** A checkable number from practice, with the place it came from. */
export function FieldNote({ note }: { note: Note }) {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const source = note.source ? SOURCES[note.source] : null;

  return (
    <aside className="mt-3 rounded-xl border-l-4 border-purple bg-lilac/60 p-3">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        {copy.fromField}
      </p>
      <p className="text-body text-ink">{note.text}</p>
      {source ? (
        <p className="mt-2 text-caption text-ash">
          {copy.source}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-purple underline underline-offset-2 hover:text-navy"
          >
            {source.label}
          </a>
        </p>
      ) : null}
    </aside>
  );
}
