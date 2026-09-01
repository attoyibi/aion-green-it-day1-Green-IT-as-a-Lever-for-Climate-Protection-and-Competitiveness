"use client";

import { useState } from "react";
import clsx from "clsx";
import { MOOD_COLOUR, MOOD_LABEL, MOOD_LABEL_DE, STAKEHOLDERS, STAKEHOLDERS_DE } from "@/data/meridian";
import type { MeridianState, StakeholderKey } from "@/lib/types";
import { fmt, useLocale } from "@/lib/locale";
import { StakeholderAvatar } from "./StakeholderAvatar";

const KEYS: StakeholderKey[] = ["marcus", "sabine", "rafael", "elena"];
const TOTAL = 200;

const COPY = {
  en: {
    week: "Week",
    ofTwelve: "of 12",
    scenarioStatus: "Scenario status",
    budgetLine: "€{spent}k spent · €{left}k left",
    noDecisionsYet: "No decisions yet",
    last: "Last: {title}",
    wants: "Wants",
    controls: "Controls",
    why: "Why",
    budget: "Budget",
    budgetAria: "Budget spent",
    stakeholders: "Stakeholders",
    selectAName: "Select a name to see what they want and what they control.",
    decisionLog: "Decision log",
    noDecisionsYetPeriod: "No decisions yet.",
    weekEntry: "Week {week} · {title}",
  },
  de: {
    week: "Woche",
    ofTwelve: "von 12",
    scenarioStatus: "Szenario-Status",
    budgetLine: "€{spent}k ausgegeben · €{left}k übrig",
    noDecisionsYet: "Noch keine Entscheidungen",
    last: "Zuletzt: {title}",
    wants: "Will",
    controls: "Kontrolliert",
    why: "Warum",
    budget: "Budget",
    budgetAria: "Budget ausgegeben",
    stakeholders: "Stakeholder",
    selectAName: "Wähle einen Namen, um zu sehen, was diese Person will und kontrolliert.",
    decisionLog: "Entscheidungsprotokoll",
    noDecisionsYetPeriod: "Noch keine Entscheidungen.",
    weekEntry: "Woche {week} · {title}",
  },
};

export function HUD({
  state,
  log,
  variant = "rail",
}: {
  state: MeridianState;
  log: { week: number; title: string }[];
  /** "strip" is the horizontal form used when the scenario is embedded. */
  variant?: "rail" | "strip";
}) {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const stakeholders = isDe ? STAKEHOLDERS_DE : STAKEHOLDERS;
  const moodLabel = isDe ? MOOD_LABEL_DE : MOOD_LABEL;

  // One open at a time, so the rail stays a rail.
  const [open, setOpen] = useState<StakeholderKey | null>(null);
  const spentPct = Math.min(100, (state.budgetSpent / TOTAL) * 100);

  if (variant === "strip") {
    return (
      <aside
        aria-label={copy.scenarioStatus}
        className="sticky top-[60px] z-20 rounded-2xl border border-line bg-paper p-3 shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="shrink-0">
            <p className="text-caption uppercase tracking-wide text-ash">{copy.week}</p>
            <p className="text-readout tabular-nums text-ink">
              {state.weekNow} <span className="text-caption text-ash">{copy.ofTwelve}</span>
            </p>
          </div>

          <div className="min-w-[160px] flex-1">
            <p className="text-caption uppercase tracking-wide text-ash">
              {fmt(copy.budgetLine, {
                spent: state.budgetSpent,
                left: Math.max(0, TOTAL - state.budgetSpent),
              })}
            </p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-lilac">
              <div
                className={clsx(
                  "h-full rounded-full transition-all duration-300",
                  spentPct >= 100 ? "bg-danger" : spentPct >= 80 ? "bg-warn" : "bg-purple",
                )}
                style={{ width: `${spentPct}%` }}
              />
            </div>
          </div>

          <ul className="flex shrink-0 flex-wrap gap-1.5">
            {KEYS.map((key) => {
              const mood = state.moods[key];
              const isOpen = open === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : key)}
                    title={`${stakeholders[key].name}: ${moodLabel[mood]}`}
                    className={clsx(
                      "flex items-center gap-1.5 rounded-full border px-1.5 py-1 transition-colors duration-200",
                      isOpen ? "border-purple bg-lilac" : "border-line hover:bg-lilac/60",
                    )}
                  >
                    <StakeholderAvatar who={key} size={24} />
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: MOOD_COLOUR[mood] }}
                    />
                    <span className="sr-only">
                      {stakeholders[key].name}: {moodLabel[mood]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="min-w-0 shrink-0 text-caption text-ash">
            {log.length === 0
              ? copy.noDecisionsYet
              : fmt(copy.last, { title: log[log.length - 1].title })}
          </p>
        </div>

        {open ? (
          <dl className="mt-3 space-y-1.5 rounded-lg border-l-2 border-purple bg-lilac/40 p-2.5">
            <p className="text-body font-semibold text-ink">
              {stakeholders[open].name} · {stakeholders[open].role} ·{" "}
              <span className="font-normal text-navy">{moodLabel[state.moods[open]]}</span>
            </p>
            <div>
              <dt className="text-caption font-semibold text-purple">{copy.wants}</dt>
              <dd className="text-caption text-ink">{stakeholders[open].wants}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold text-purple">{copy.controls}</dt>
              <dd className="text-caption text-ink">{stakeholders[open].controls}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold text-purple">{copy.why}</dt>
              <dd className="text-caption text-ink">{stakeholders[open].why}</dd>
            </div>
          </dl>
        ) : null}
      </aside>
    );
  }

  return (
    <aside aria-label={copy.scenarioStatus} className="space-y-3">
      <div className="card p-4">
        <p className="text-caption uppercase tracking-wide text-ash">{copy.week}</p>
        <p className="text-h1 tabular-nums text-ink transition-all duration-200">
          {state.weekNow}
          <span className="text-body text-ash"> {copy.ofTwelve}</span>
        </p>
        <div className="mt-2 flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={clsx(
                "h-1.5 flex-1 rounded-full",
                i < state.weekNow ? "bg-purple" : "bg-lilac",
              )}
            />
          ))}
        </div>
      </div>

      <div className="card p-4">
        <p className="mb-1 text-caption uppercase tracking-wide text-ash">{copy.budget}</p>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-lilac"
          role="progressbar"
          aria-valuenow={Math.round(spentPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={copy.budgetAria}
        >
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-300",
              spentPct >= 100 ? "bg-danger" : spentPct >= 80 ? "bg-warn" : "bg-purple",
            )}
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <p className="mt-1.5 text-caption tabular-nums text-ash">
          {fmt(copy.budgetLine, {
            spent: state.budgetSpent,
            left: Math.max(0, TOTAL - state.budgetSpent),
          })}
        </p>
      </div>

      <div className="card p-4">
        <p className="text-caption uppercase tracking-wide text-ash">{copy.stakeholders}</p>
        <p className="mb-2 text-caption text-ash">{copy.selectAName}</p>
        <ul className="space-y-1">
          {KEYS.map((key) => {
            const mood = state.moods[key];
            const person = stakeholders[key];
            const isOpen = open === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`who-${key}`}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-lg p-1 text-left transition-colors duration-200",
                    isOpen ? "bg-lilac" : "hover:bg-lilac/60",
                  )}
                >
                  <StakeholderAvatar who={key} size={24} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-caption font-semibold text-ink">
                      {person.name}
                    </span>
                    <span className="block truncate text-caption text-ash">
                      {person.role}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: MOOD_COLOUR[mood] }}
                    />
                    <span className="text-caption text-navy">{moodLabel[mood]}</span>
                  </span>
                </button>

                {isOpen ? (
                  <dl
                    id={`who-${key}`}
                    className="mt-1 space-y-1.5 rounded-lg border-l-2 border-purple bg-lilac/40 p-2.5"
                  >
                    <div>
                      <dt className="text-caption font-semibold text-purple">{copy.wants}</dt>
                      <dd className="text-caption text-ink">{person.wants}</dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold text-purple">{copy.controls}</dt>
                      <dd className="text-caption text-ink">{person.controls}</dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold text-purple">{copy.why}</dt>
                      <dd className="text-caption text-ink">{person.why}</dd>
                    </div>
                  </dl>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card p-4">
        <p className="mb-2 text-caption uppercase tracking-wide text-ash">{copy.decisionLog}</p>
        {log.length === 0 ? (
          <p className="text-caption text-ash">{copy.noDecisionsYetPeriod}</p>
        ) : (
          <ol className="space-y-1.5">
            {log.map((entry, i) => (
              <li
                key={`${entry.week}-${entry.title}`}
                className={clsx(
                  "pl-2 text-caption",
                  i === log.length - 1
                    ? "border-l-2 border-purple font-semibold text-ink"
                    : "border-l-2 border-line text-ash",
                )}
              >
                {fmt(copy.weekEntry, { week: entry.week, title: entry.title })}
              </li>
            ))}
          </ol>
        )}
      </div>
    </aside>
  );
}
