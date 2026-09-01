"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useCompletion, type CompletionGroup } from "@/lib/completion";
import { fmt, useT } from "@/lib/locale";

function Bar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-lilac"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx(
          "h-full rounded-full transition-all duration-300",
          done === total ? "bg-good" : "bg-purple",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Group({ group, showLink }: { group: CompletionGroup; showLink: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const remaining = group.items.filter((i) => !i.done);
  const complete = remaining.length === 0;

  return (
    <div className="rounded-xl border border-line p-3">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-body font-semibold text-ink">{group.label}</p>
        <p className={clsx("text-caption", complete ? "text-good" : "text-ash")}>
          {complete
            ? t.openItems.complete
            : fmt(t.openItems.doneOfTotal, { done: group.done, total: group.total })}
        </p>
      </div>

      <Bar done={group.done} total={group.total} />

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        {complete ? (
          <p className="text-caption text-good">
            {fmt(t.openItems.allDone, { total: group.total, unit: group.unit })}
          </p>
        ) : (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded text-caption font-semibold text-purple underline underline-offset-2 hover:text-navy"
          >
            {open ? t.openItems.hideWhatIsOpen : fmt(t.openItems.showStillOpen, { n: remaining.length })}
          </button>
        )}

        {showLink ? (
          <Link
            href={group.href}
            className="rounded text-caption text-purple underline underline-offset-2 hover:text-navy"
          >
            {t.openItems.goThere}
          </Link>
        ) : null}
      </div>

      {open && !complete ? (
        <ul className="mt-2 space-y-1 border-t border-line pt-2">
          {remaining.map((item) => (
            <li key={item.id} className="flex items-start gap-2 text-caption text-ash">
              <span
                aria-hidden="true"
                className="mt-1 h-3 w-3 shrink-0 rounded border-2 border-dashed border-ash"
              />
              {item.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type Props = {
  /** Restrict to these group ids. Omit for the whole module. */
  only?: string[];
  title?: string;
  intro?: string;
  showLinks?: boolean;
};

/** Answers "what is still open" — for one tab, or for the whole module. */
export function OpenItems({ only, title, intro, showLinks = true }: Props) {
  const t = useT();
  const { groups, done, total } = useCompletion();

  // Persisted counts only exist on the client; render the empty shape until
  // rehydration so the server and first client paint agree.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const shown = only ? groups.filter((g) => only.includes(g.id)) : groups;

  const shownDone = hydrated ? (only ? shown.reduce((n, g) => n + g.done, 0) : done) : 0;
  const shownTotal = only ? shown.reduce((n, g) => n + g.total, 0) : total;

  return (
    <section aria-labelledby="open-items-title" className="card p-4">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id="open-items-title" className="text-h3 text-ink">
          {title ?? t.openItems.defaultTitle}
        </h2>
        <p className="text-readout tabular-nums text-ink">
          {shownDone} / {shownTotal}
        </p>
      </div>

      {intro ? <p className="mb-3 text-caption text-ash">{intro}</p> : null}

      <div className="mb-3">
        <Bar done={shownDone} total={shownTotal} />
      </div>

      <div className="space-y-2">
        {shown.map((group) => (
          <Group
            key={group.id}
            group={
              hydrated
                ? group
                : { ...group, done: 0, items: group.items.map((i) => ({ ...i, done: false })) }
            }
            showLink={showLinks}
          />
        ))}
      </div>
    </section>
  );
}
