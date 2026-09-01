"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W2, W2_DE } from "@/data/learn";
import { useLocale } from "@/lib/locale";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

const COPY = {
  en: { hide: "Hide", flip: "Flip", asCause: "As cause", asEnabler: "As enabler" },
  de: { hide: "Verbergen", flip: "Umdrehen", asCause: "Als Ursache", asEnabler: "Als Hebel" },
};

export function W2FlipCards() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const data = locale === "de" ? W2_DE : W2;

  const [flipped, setFlipped] = useState<string[]>([]);
  const { complete } = useWidget(W2.id, W2.xp);

  const done = flipped.length === data.cards.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const flip = (id: string) =>
    setFlipped((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return (
    <WidgetShell
      meta={data}
      progress={flipped.length / data.cards.length}
      done={done}
      closing={data.closing}
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {data.cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          return (
            <div
              key={card.id}
              className={clsx(
                "rounded-xl border p-4 transition-colors duration-200",
                isFlipped ? "border-purple bg-paper" : "border-line bg-lilac/40",
              )}
            >
              <button
                type="button"
                aria-expanded={isFlipped}
                onClick={() => flip(card.id)}
                className="flex w-full items-center justify-between gap-3 rounded-lg text-left"
              >
                <span className="text-h3 text-ink">{card.front}</span>
                <span className="shrink-0 rounded-lg border border-line px-2 py-1 text-caption text-ash">
                  {isFlipped ? copy.hide : copy.flip}
                </span>
              </button>

              {isFlipped ? (
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg border-l-4 border-warn bg-warn/10 p-3">
                    <p className="text-caption font-semibold uppercase tracking-wide text-warn">
                      {copy.asCause}
                    </p>
                    <p className="text-body text-ink">{card.cause}</p>
                  </div>

                  <div className="rounded-lg border-l-4 border-good bg-good/10 p-3">
                    <p className="text-caption font-semibold uppercase tracking-wide text-good">
                      {copy.asEnabler}
                    </p>
                    <p className="text-body text-ink">{card.enabler}</p>
                  </div>

                  {card.note ? <FieldNote note={card.note} /> : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
