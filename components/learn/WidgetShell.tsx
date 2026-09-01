"use client";

import { useState, type ReactNode } from "react";
import type { WidgetMeta } from "@/data/learn";
import { fmt, useLocale } from "@/lib/locale";

const COPY = {
  en: {
    doneXp: "Done · +{xp} XP",
    collapse: "Collapse",
    open: "Open",
    whyMatters: "Why this matters: ",
  },
  de: {
    doneXp: "Fertig · +{xp} XP",
    collapse: "Einklappen",
    open: "Öffnen",
    whyMatters: "Warum das wichtig ist: ",
  },
};

type Props = {
  meta: WidgetMeta;
  /** 0–1. Drives the small progress pill in the header. */
  progress: number;
  done: boolean;
  children: ReactNode;
  closing: string;
};

export function WidgetShell({ meta, progress, done, children, closing }: Props) {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;

  // Collapsible so a learner working through one widget is not scrolling past
  // eight others to reach it.
  const [open, setOpen] = useState(true);

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="card p-5"
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 id={`${meta.id}-title`} className="text-h3 text-ink">
            {meta.title}
          </h3>
          <p className="mt-1 text-body text-ash">{meta.task}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={
              done
                ? "rounded-full bg-good px-3 py-1 text-caption font-semibold text-paper"
                : "rounded-full border border-line px-3 py-1 text-caption text-ash"
            }
          >
            {done ? fmt(copy.doneXp, { xp: meta.xp }) : `${Math.round(progress * 100)}%`}
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={`${meta.id}-body`}
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-line px-2 py-1 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            {open ? copy.collapse : copy.open}
          </button>
        </div>
      </div>

      {open ? (
        <div id={`${meta.id}-body`}>
          <p className="mb-4 rounded-xl bg-lilac/50 p-3 text-body text-navy">
            <span className="font-semibold">{copy.whyMatters}</span>
            {meta.why}
          </p>

          {children}

          {done ? (
            <p className="mt-4 border-t border-line pt-3 text-body font-semibold text-ink">
              {closing}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
