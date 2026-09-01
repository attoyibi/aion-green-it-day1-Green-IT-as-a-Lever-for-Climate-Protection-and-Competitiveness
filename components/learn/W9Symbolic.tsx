"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W9, W9_DE, type StatementTag } from "@/data/learn";
import { fmt, useLocale } from "@/lib/locale";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

const COPY = {
  en: { usuallyFiledAs: "Usually filed as {tag}. " },
  de: { usuallyFiledAs: "Wird meist als {tag} eingeordnet. " },
};

export function W9Symbolic() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const data = locale === "de" ? W9_DE : W9;

  const [answers, setAnswers] = useState<Record<string, StatementTag>>({});
  const { complete } = useWidget(W9.id, W9.xp);

  const done = Object.keys(answers).length === data.statements.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  return (
    <WidgetShell
      meta={data}
      progress={Object.keys(answers).length / data.statements.length}
      done={done}
      closing={data.closing}
    >
      <div className="mb-4 grid gap-2 md:grid-cols-3">
        {data.tags.map((tag) => (
          <div key={tag.id} className="rounded-xl border border-line p-3">
            <p className="text-body font-semibold text-ink">{tag.label}</p>
            <p className="mt-1 text-caption text-ash">{tag.hint}</p>
          </div>
        ))}
      </div>

      <ol className="space-y-3">
        {data.statements.map((statement, index) => {
          const answer = answers[statement.id];
          const right = answer === statement.answer;

          return (
            <li key={statement.id} className="rounded-xl border border-line p-3">
              <p className="mb-2 text-body text-ink">
                <span className="font-semibold">{index + 1}. </span>
                {statement.text}
              </p>

              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    disabled={Boolean(answer)}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [statement.id]: tag.id }))
                    }
                    className={clsx(
                      "rounded-xl border px-3 py-1.5 text-caption font-semibold transition-colors duration-200",
                      answer === tag.id
                        ? right
                          ? "border-good bg-good text-paper"
                          : "border-danger bg-danger text-paper"
                        : answer && tag.id === statement.answer
                          ? "border-good bg-good/15 text-ink"
                          : answer
                            ? "border-line text-ash"
                            : "border-line text-navy hover:border-purple hover:bg-lilac",
                    )}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {answer ? (
                <p
                  className={clsx(
                    "mt-2 rounded-lg border-l-4 p-3 text-body text-ink",
                    right ? "border-good bg-good/10" : "border-danger bg-danger/10",
                  )}
                >
                  {right
                    ? statement.why
                    : fmt(copy.usuallyFiledAs, {
                        tag: data.tags.find((t) => t.id === statement.answer)?.label ?? "",
                      }) + statement.why}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </WidgetShell>
  );
}
