"use client";

import { useLocale, useT } from "@/lib/locale";

const COPY = {
  en: { correct: "Correct", cardsSeen: "Cards seen" },
  de: { correct: "Richtig", cardsSeen: "Karten gesehen" },
};

type Props = {
  seen: number;
  total: number;
  correct: number;
  streak: number;
  xp: number;
};

export function XPBar({ seen, total, correct, streak, xp }: Props) {
  const t = useT();
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const pct = total === 0 ? 0 : Math.round((seen / total) * 100);

  return (
    <div className="card p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Stat label={t.chrome.xp} value={xp} />
        <Stat label={t.chrome.streak} value={streak} />
        <Stat label={copy.correct} value={`${correct} / ${seen}`} />
        <Stat label={copy.cardsSeen} value={`${seen} / ${total}`} />
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full bg-lilac"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={copy.cardsSeen}
      >
        <div
          className="h-full rounded-full bg-purple transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-caption uppercase tracking-wide text-ash">{label}</p>
      <p className="text-readout tabular-nums text-ink">{value}</p>
    </div>
  );
}
