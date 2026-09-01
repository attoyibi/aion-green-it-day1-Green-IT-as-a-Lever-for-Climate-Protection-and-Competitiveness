"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  BRIEF,
  BRIEF_DE,
  CATEGORY_ZONES,
  CATEGORY_ZONES_DE,
  COMPANY_ZONE,
  COMPANY_ZONE_DE,
  CONTEXT,
  CONTEXT_DE,
  HERO_IMAGE,
  HERO_IMAGE_DE,
  HOTSPOTS,
  HOTSPOTS_DE,
} from "@/data/mediprint";
import { TASK1, TASK1_DE, type BriefingLine } from "@/data/task1";
import { useProgress } from "@/lib/store";
import { scopedId } from "@/lib/ids";
import { fmt, useCategories, useLocale, useT } from "@/lib/locale";
import { CategoryChip } from "./CategoryChip";
import { HotspotHero, type Focus } from "./HotspotHero";

const FACT_ZOOM = 2.6;
const COMPANY_ZOOM = 2.1;

export function MediprintCase() {
  const locale = useLocale();
  const t = useT();
  const { byCode: CATEGORY_BY_CODE } = useCategories();
  const isDe = locale === "de";
  const brief = isDe ? BRIEF_DE : BRIEF;
  const context = isDe ? CONTEXT_DE : CONTEXT;
  const heroImage = isDe ? HERO_IMAGE_DE : HERO_IMAGE;
  const hotspots = isDe ? HOTSPOTS_DE : HOTSPOTS;
  const companyZone = isDe ? COMPANY_ZONE_DE : COMPANY_ZONE;
  const categoryZones = isDe ? CATEGORY_ZONES_DE : CATEGORY_ZONES;
  const task1 = isDe ? TASK1_DE : TASK1;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [opened, setOpened] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const markVisited = useProgress((s) => s.markVisited);

  const select = useCallback(
    (id: string) => {
      setSelectedId(id);

      if (id.startsWith("hs-")) {
        setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
        // Visited log keys are scoped: "mediprint/server-room".
        markVisited("hotspots", scopedId("mediprint", id.replace(/^hs-/, "")));
      }
    },
    [markVisited],
  );

  const selectFromBriefing = useCallback(
    (id: string) => {
      select(id);
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [select],
  );

  const activeFact = hotspots.find((h) => h.id === selectedId) ?? null;
  const activeCategory = categoryZones.find((z) => z.id === selectedId) ?? null;
  const isCompany = selectedId === companyZone.id;

  // The arrows stay at full view: their value is seeing the whole illustration.
  const focus: Focus = useMemo(() => {
    if (activeFact) {
      return { x: activeFact.x, y: activeFact.y, zoom: FACT_ZOOM };
    }
    if (isCompany) {
      return {
        x: companyZone.x + companyZone.w / 2,
        y: companyZone.y + companyZone.h / 2,
        zoom: COMPANY_ZOOM,
      };
    }
    return null;
  }, [activeFact, isCompany, companyZone]);

  const clear = () => setSelectedId(null);

  // Selecting an arrow rings the markers carrying that tag, so they stay
  // findable on the artwork while the card lists them.
  const highlight = activeCategory
    ? {
        ids: hotspots.filter((h) => h.categories.includes(activeCategory.code)).map(
          (h) => h.id,
        ),
        hex: CATEGORY_BY_CODE[activeCategory.code].hex,
      }
    : null;

  const closeButton = (
    <button
      type="button"
      onClick={clear}
      className="shrink-0 rounded-lg border border-line px-2 py-1 text-caption text-ash transition-colors duration-200 hover:bg-lilac hover:text-navy hover:underline"
    >
      {t.case.close}
    </button>
  );

  // ---------------- detail card ----------------
  let detail: React.ReactNode = null;

  if (activeFact) {
    const index = hotspots.indexOf(activeFact);
    detail = (
      <>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple text-caption font-semibold text-paper">
              {index + 1}
            </span>
            <h3 className="text-h3 text-ink">{activeFact.label}</h3>
          </div>
          {closeButton}
        </div>
        <p className="mb-3 text-body text-ink">{activeFact.fact}</p>
        <p className="mb-3 text-caption text-ash">
          {t.case.onTheImage} {activeFact.onTheImage}
        </p>
        <div className="flex flex-wrap gap-2">
          {activeFact.categories.map((code) => (
            <CategoryChip key={code} code={code} variant="topic" />
          ))}
        </div>
      </>
    );
  } else if (isCompany) {
    detail = (
      <>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-h3 text-ink">{brief.name}</h3>
          {closeButton}
        </div>
        {brief.lines.map((line) => (
          <p key={line} className="mb-4 text-body text-ink">
            {line}
          </p>
        ))}
        <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
          {t.case.context}
        </h4>
        <ul className="space-y-2">
          {context.map((tile) => (
            <li
              key={tile.id}
              id={tile.id}
              className="rounded-xl bg-lilac px-3 py-2 text-caption text-navy"
            >
              {tile.text}
            </li>
          ))}
        </ul>
      </>
    );
  } else if (activeCategory) {
    const category = CATEGORY_BY_CODE[activeCategory.code];
    const tagged = hotspots.filter((h) => h.categories.includes(activeCategory.code));

    detail = (
      <>
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-4 w-4 shrink-0 rounded"
              style={{ backgroundColor: category.hex }}
            />
            <h3 className="text-h3 text-ink">
              {category.name}{" "}
              <span className="font-normal text-ash">({category.code})</span>
            </h3>
          </div>
          {closeButton}
        </div>

        <p className="mb-3 text-caption text-ash">{t.case.topicAreaNote}</p>

        {tagged.length > 0 ? (
          <>
            <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
              {t.case.markersWithTag}
            </h4>
            <ul className="space-y-1">
              {tagged.map((spot) => (
                <li key={spot.id}>
                  <button
                    type="button"
                    onClick={() => select(spot.id)}
                    className="w-full rounded-lg px-2 py-1.5 text-left text-body text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
                  >
                    {hotspots.indexOf(spot) + 1}. {spot.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="rounded-xl bg-lilac px-3 py-2 text-caption text-navy">
            {t.case.noMarkerWithTag}
          </p>
        )}
      </>
    );
  }

  // ---------------- briefing lines ----------------
  const renderLine = (line: BriefingLine) => (
    <li key={line.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-body text-ink">{line.text}</span>
      {line.findIt ? (
        <button
          type="button"
          onClick={() => selectFromBriefing(line.findIt as string)}
          className="rounded text-caption font-semibold text-purple underline underline-offset-2 transition-colors duration-200 hover:text-navy"
        >
          {t.case.findItOnIllustration}
        </button>
      ) : (
        <span className="text-caption text-ash">{t.case.contextOnly}</span>
      )}
    </li>
  );

  return (
    <div className="space-y-6">
      <section aria-label={t.case.interactiveIllustration} ref={heroRef}>
        <HotspotHero
          image={heroImage}
          companyZone={companyZone}
          categoryZones={categoryZones}
          hotspots={hotspots}
          selectedId={selectedId}
          focus={focus}
          visitedIds={opened}
          onSelect={select}
          onClear={clear}
          highlight={highlight}
          detail={detail}
        />

        {/* Key to the two kinds of thing that are clickable on the artwork. */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-ash">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-purple bg-paper text-caption font-semibold text-purple">
              1
            </span>
            {t.case.onePassageLegend}
          </span>

          <span className="flex items-center gap-2">
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-md border border-purple bg-paper px-1 text-[11px] font-semibold leading-none text-purple">
              i
            </span>
            {t.case.theBuildingLegend}
          </span>

          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              {categoryZones.map((zone) => (
                <span
                  key={zone.id}
                  className="flex h-5 min-w-[20px] items-center justify-center rounded-md border border-purple bg-paper px-1 text-[11px] font-semibold leading-none text-purple"
                >
                  {zone.code}
                </span>
              ))}
            </span>
            {t.case.theFiveArrowsLegend}
          </span>

          <span className="text-ash">
            {fmt(t.case.passagesOpened, { opened: opened.length, total: hotspots.length })}
          </span>
        </div>

        {/* R6 — the same ids, facts and chips, without the image. */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowList((v) => !v)}
            aria-expanded={showList}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            {showList ? t.case.hideListFacts : t.case.showListFacts}
          </button>

          {showList ? (
            <ol className="mt-3 grid gap-2 md:grid-cols-2">
              {hotspots.map((spot, index) => (
                <li key={spot.id} id={spot.id} className="card p-4">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-h3 text-ink">
                      {index + 1}. {spot.label}
                    </h3>
                    <code className="text-caption text-ash">{spot.id}</code>
                  </div>
                  <p className="mb-2 text-body text-ink">{spot.fact}</p>
                  <div className="flex flex-wrap gap-2">
                    {spot.categories.map((code) => (
                      <CategoryChip key={code} code={code} variant="topic" />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      {/* ---------------- Task briefing ---------------- */}
      <section
        aria-labelledby="task1-title"
        className="mx-auto w-full max-w-4xl card p-5 md:p-6"
      >
        <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
          {task1.number}
        </p>
        <h2 id="task1-title" className="mb-4 text-h2 text-ink">
          {task1.title}
        </h2>

        <p className="mb-5 text-body text-ash">{task1.lead}</p>

        <h3 className="mb-2 text-h3 text-ink">{t.case.inCompanyDescription}</h3>
        <ul className="mb-6 space-y-2 border-l-2 border-line pl-4">
          {task1.leadFacts.map(renderLine)}
        </ul>

        <h3 className="mb-2 text-h3 text-ink">{task1.additionalHeading}</h3>
        <ul className="mb-6 space-y-2 border-l-2 border-line pl-4">
          {task1.additional.map(renderLine)}
        </ul>

        <h3 className="mb-3 text-h3 text-ink">{task1.assignmentHeading}</h3>
        <ol className="mb-6 space-y-3">
          {task1.assignment.map((step, index) => (
            <li key={step.id} className="rounded-2xl bg-lilac/60 p-4">
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                  {index + 1}
                </span>
                <div>
                  <p className="text-body font-semibold text-ink">{step.text}</p>
                  <p className="mt-1 text-caption text-ash">{step.hint}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{task1.noteHeading}</h3>
            <p className="text-body text-ash">{task1.note}</p>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{task1.objectiveHeading}</h3>
            <p className="text-body text-ash">{task1.objective}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
