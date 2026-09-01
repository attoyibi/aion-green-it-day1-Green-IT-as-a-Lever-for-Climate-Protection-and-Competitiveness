"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W10, W10_DE } from "@/data/learn";
import { fmt, useLocale } from "@/lib/locale";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

// Lifetime footprint = a fixed manufacturing share + a use share that accrues
// per year. Everything is expressed against the three-year baseline, so no
// absolute figure is ever shown.
const EMBODIED = W10.embodiedShare;
const USE_TOTAL_AT_BASELINE = 100 - EMBODIED;
const USE_PER_YEAR = USE_TOTAL_AT_BASELINE / W10.baselineYears;

const perDeviceYear = (years: number) => (EMBODIED + USE_PER_YEAR * years) / years;
const BASELINE = perDeviceYear(W10.baselineYears);

const indexFor = (years: number) => (perDeviceYear(years) / BASELINE) * 100;

const COPY = {
  en: {
    refreshCycle: "Refresh cycle",
    years: "{n} years",
    ariaValueText: "{n} years, index {index}",
    baselineCycle: "{n}-year cycle (baseline)",
    cycle: "{n}-year cycle",
    isBaseline: "This is the baseline.",
    lowerThanBaseline: "{pct}% lower than the three-year cycle.",
    higherThanBaseline: "{pct}% higher than the three-year cycle.",
    footprintPerDeviceYear: "Footprint per device-year",
    indexUnit: "index · baseline {n} years = 100",
    devicesPerSeat: "Devices bought per seat, per decade",
    baselineUnit: "baseline {n}",
    everyDeviceAvoided: "Every device avoided is a manufacturing footprint never spent.",
    modelNote:
      "Model: {n}% of lifetime footprint is fixed at manufacturing, the rest accrues in use. This is shown as an index, not as absolute figures, because this module is deliberately pre-metric.",
  },
  de: {
    refreshCycle: "Erneuerungszyklus",
    years: "{n} Jahre",
    ariaValueText: "{n} Jahre, Index {index}",
    baselineCycle: "{n}-Jahres-Zyklus (Basislinie)",
    cycle: "{n}-Jahres-Zyklus",
    isBaseline: "Das ist die Basislinie.",
    lowerThanBaseline: "{pct} % niedriger als der Dreijahreszyklus.",
    higherThanBaseline: "{pct} % höher als der Dreijahreszyklus.",
    footprintPerDeviceYear: "Fußabdruck pro Gerätejahr",
    indexUnit: "Index · Basislinie {n} Jahre = 100",
    devicesPerSeat: "Gekaufte Geräte pro Arbeitsplatz, pro Jahrzehnt",
    baselineUnit: "Basislinie {n}",
    everyDeviceAvoided: "Jedes vermiedene Gerät ist ein nie ausgegebener Herstellungs-Fußabdruck.",
    modelNote:
      "Modell: {n} % des Fußabdrucks über die Lebensdauer sind bei der Herstellung fixiert, der Rest fällt bei der Nutzung an. Das wird als Index dargestellt, nicht als absolute Zahlen, weil dieses Modul bewusst pre-metrisch ist.",
  },
};

export function W10ServiceLife() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const data = locale === "de" ? W10_DE : W10;

  const [years, setYears] = useState(W10.baselineYears);
  const [moved, setMoved] = useState(false);
  const { complete } = useWidget(W10.id, W10.xp);

  useEffect(() => {
    if (moved) complete();
  }, [moved, complete]);

  const index = Math.round(indexFor(years));
  const change = index - 100;
  const perDecade = (10 / years).toFixed(1);
  const baselinePerDecade = (10 / W10.baselineYears).toFixed(1);
  const band = data.bands.find((b) => years <= b.upTo) ?? data.bands[data.bands.length - 1];

  return (
    <WidgetShell meta={data} progress={moved ? 1 : 0} done={moved} closing={data.closing}>
      <div className="rounded-xl border border-line p-4">
        <label htmlFor="w10-range" className="text-body font-semibold text-ink">
          {copy.refreshCycle}
        </label>

        <div className="mb-1 mt-2 flex justify-between text-caption text-ash">
          <span>{fmt(copy.years, { n: W10.minYears })}</span>
          <span>{fmt(copy.years, { n: W10.maxYears })}</span>
        </div>

        <input
          id="w10-range"
          type="range"
          min={W10.minYears}
          max={W10.maxYears}
          step={1}
          value={years}
          onChange={(e) => {
            setYears(Number(e.target.value));
            setMoved(true);
          }}
          aria-valuetext={fmt(copy.ariaValueText, { n: years, index })}
          className="w-full accent-purple"
        />

        <p className="mt-2 text-readout tabular-nums text-purple">
          {fmt(copy.years, { n: years })}
        </p>

        {/* Comparison bars: baseline against the current setting. */}
        <div className="mt-4 space-y-3" aria-live="polite">
          <Bar
            label={fmt(copy.baselineCycle, { n: W10.baselineYears })}
            value={100}
            tone="baseline"
          />
          <Bar
            label={fmt(copy.cycle, { n: years })}
            value={index}
            tone={index < 100 ? "better" : index > 100 ? "worse" : "baseline"}
          />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Readout
            title={copy.footprintPerDeviceYear}
            value={`${index}`}
            unit={fmt(copy.indexUnit, { n: W10.baselineYears })}
            caption={
              change === 0
                ? copy.isBaseline
                : change < 0
                  ? fmt(copy.lowerThanBaseline, { pct: Math.abs(change) })
                  : fmt(copy.higherThanBaseline, { pct: change })
            }
          />
          <Readout
            title={copy.devicesPerSeat}
            value={perDecade}
            unit={fmt(copy.baselineUnit, { n: baselinePerDecade })}
            caption={copy.everyDeviceAvoided}
          />
        </div>

        <p className="mt-3 rounded-xl bg-lilac/60 p-3 text-body text-navy">{band.verdict}</p>

        <p className="mt-3 text-caption text-ash">{fmt(copy.modelNote, { n: EMBODIED })}</p>
      </div>

      {moved ? <FieldNote note={data.note} /> : null}
    </WidgetShell>
  );
}

function Bar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "baseline" | "better" | "worse";
}) {
  // 140 is the widest the model reaches, at a two-year cycle.
  const width = Math.min(100, (value / 140) * 100);

  return (
    <div>
      <div className="mb-1 flex justify-between text-caption text-ash">
        <span>{label}</span>
        <span className="tabular-nums">{Math.round(value)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-lilac">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300",
            tone === "better" ? "bg-good" : tone === "worse" ? "bg-danger" : "bg-navy",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function Readout({
  title,
  value,
  unit,
  caption,
}: {
  title: string;
  value: string;
  unit: string;
  caption: string;
}) {
  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-caption font-semibold uppercase tracking-wide text-ash">{title}</p>
      <p className="mt-1 text-h2 tabular-nums text-ink">{value}</p>
      <p className="text-caption text-ash">{unit}</p>
      <p className="mt-1 text-body text-ink">{caption}</p>
    </div>
  );
}
