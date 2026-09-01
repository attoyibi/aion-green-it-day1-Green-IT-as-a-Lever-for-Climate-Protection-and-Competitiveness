"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W7, W7_DE } from "@/data/learn";
import { useLocale } from "@/lib/locale";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

const COPY = {
  en: {
    accountabilityFlows: "Accountability flows",
    decidesAlone: "Decides alone: ",
    mustEscalate: "Must escalate: ",
    cannotDelegate: "Cannot delegate: ",
    selectRole:
      "Select a role to see what it can decide, what it must escalate, and what it cannot hand to anyone else.",
  },
  de: {
    accountabilityFlows: "Verantwortungsflüsse",
    decidesAlone: "Entscheidet allein: ",
    mustEscalate: "Muss eskalieren: ",
    cannotDelegate: "Kann nicht delegieren: ",
    selectRole:
      "Wähle eine Rolle, um zu sehen, was sie allein entscheiden kann, was sie eskalieren muss und was sie an niemanden abgeben kann.",
  },
};

export function W7OrgChart() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const data = locale === "de" ? W7_DE : W7;

  const [opened, setOpened] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const { complete } = useWidget(W7.id, W7.xp);

  const done = opened.length === data.nodes.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const open = (id: string) => {
    setActive(active === id ? null : id);
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const node = data.nodes.find((n) => n.id === active) ?? null;

  return (
    <WidgetShell
      meta={data}
      progress={opened.length / data.nodes.length}
      done={done}
      closing={data.closing}
    >
      <div className="grid gap-3 lg:grid-cols-[1fr,1.2fr]">
        <div>
          <ul className="space-y-2">
            {data.nodes.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  aria-pressed={active === n.id}
                  onClick={() => open(n.id)}
                  className={clsx(
                    "w-full rounded-xl border p-3 text-left text-body transition-colors duration-200",
                    active === n.id
                      ? "border-purple bg-purple/10 font-semibold text-ink"
                      : opened.includes(n.id)
                        ? "border-line bg-lilac/40 text-ink hover:border-purple"
                        : "border-line bg-paper text-ink hover:border-purple hover:bg-lilac/50",
                  )}
                >
                  {n.role}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-3 rounded-xl border border-line p-3">
            <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
              {copy.accountabilityFlows}
            </p>
            <ul className="space-y-1">
              {data.flows.map((flow) => (
                <li key={flow} className="text-caption text-ash">
                  {flow}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-line p-4">
          {node ? (
            <>
              <h4 className="mb-3 text-h3 text-ink">{node.role}</h4>

              <p className="mb-2 text-body text-ink">
                <span className="font-semibold text-good">{copy.decidesAlone}</span>
                {node.decidesAlone}
              </p>
              <p className="mb-2 text-body text-ink">
                <span className="font-semibold text-warn">{copy.mustEscalate}</span>
                {node.mustEscalate}
              </p>
              <p className="rounded-xl bg-lilac/60 p-3 text-body text-navy">
                <span className="font-semibold">{copy.cannotDelegate}</span>
                {node.cannotDelegate}
              </p>
            </>
          ) : (
            <p className="text-body text-ash">{copy.selectRole}</p>
          )}
        </div>
      </div>
    </WidgetShell>
  );
}
