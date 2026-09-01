"use client";

import { ALL_WIDGETS, ALL_WIDGETS_DE } from "@/data/learn";
import { PHASES, PHASES_DE } from "@/data/meridian";
import type { Phase } from "@/lib/types";
import { CARDS, CARDS_DE, BADGE_THRESHOLD } from "@/data/training";
import { fmt, useCategories, useLocale, useT } from "@/lib/locale";
import { HOTSPOTS, HOTSPOTS_DE } from "@/data/mediprint";
import { HOTSPOTS as NORDCOM_HOTSPOTS, HOTSPOTS_DE as NORDCOM_HOTSPOTS_DE } from "@/data/nordcom";
import { HOTSPOTS as AURON_HOTSPOTS, HOTSPOTS_DE as AURON_HOTSPOTS_DE } from "@/data/auron";
import { scopedId } from "@/lib/ids";
import { useProgress } from "@/lib/store";

export type OpenItem = { id: string; label: string; done: boolean };

export type CompletionGroup = {
  id: string;
  label: string;
  href: string;
  /** What one unit means, e.g. "widgets". */
  unit: string;
  items: OpenItem[];
  done: number;
  total: number;
};

/**
 * One place that answers "what is still open" for every tab, so the question
 * has the same answer wherever it is asked.
 */
export function useCompletion(): {
  groups: CompletionGroup[];
  done: number;
  total: number;
} {
  const learnVisited = useProgress((s) => s.visited.learnWidgets);
  const meridian = useProgress((s) => s.scenario.meridian);
  const cardsVisited = useProgress((s) => s.visited.trainingCards);
  const hotspotsVisited = useProgress((s) => s.visited.hotspots);
  const correctByCategory = useProgress((s) => s.training.correctByCategory);
  const { categories: CATEGORIES } = useCategories();
  const t = useT();
  const isDe = useLocale() === "de";

  const allWidgets = isDe ? ALL_WIDGETS_DE : ALL_WIDGETS;
  const phases = isDe ? PHASES_DE : PHASES;
  const cards = isDe ? CARDS_DE : CARDS;
  const mediprintHotspots = isDe ? HOTSPOTS_DE : HOTSPOTS;
  const nordcomHotspots = isDe ? NORDCOM_HOTSPOTS_DE : NORDCOM_HOTSPOTS;
  const auronHotspots = isDe ? AURON_HOTSPOTS_DE : AURON_HOTSPOTS;

  const build = (
    id: string,
    label: string,
    href: string,
    unit: string,
    items: OpenItem[],
  ): CompletionGroup => ({
    id,
    label,
    href,
    unit,
    items,
    done: items.filter((i) => i.done).length,
    total: items.length,
  });

  const groups: CompletionGroup[] = [
    build(
      "learn",
      t.completion.learnLabel,
      "/learn",
      t.completion.learnUnit,
      [
        ...allWidgets.map((w) => ({
          id: w.id,
          label: w.title,
          done: learnVisited.includes(w.id),
        })),
      ],
    ),
    build(
      "meridian",
      t.completion.meridianLabel,
      "/learn#l2",
      t.completion.meridianUnit,
      phases.map((phase) => {
        const chosen = meridian.choices[phase.id as Phase];
        const title = phase.choices.find((c) => c.id === chosen)?.title;
        return {
          id: phase.id,
          label: `${phase.banner.left}${title ? `: ${title}` : ""}`,
          done: Boolean(chosen),
        };
      }),
    ),
    build(
      "training-cards",
      t.completion.trainingCardsLabel,
      "/training",
      t.completion.trainingCardsUnit,
      cards.map((c, i) => ({
        id: c.id,
        label: `${fmt(t.completion.trainingCardPrefix, { n: i + 1 })}: ${c.snippet.split(" ").slice(0, 6).join(" ")}...`,
        done: cardsVisited.includes(c.id),
      })),
    ),
    build(
      "badges",
      t.completion.badgesLabel,
      "/training",
      t.completion.badgesUnit,
      CATEGORIES.map((c) => ({
        id: `badge-${c.code}`,
        label: fmt(t.completion.badgeNeedsAll, { name: c.name, threshold: BADGE_THRESHOLD }),
        done: (correctByCategory[c.code] ?? 0) >= BADGE_THRESHOLD,
      })),
    ),
    build(
      "mediprint",
      t.completion.mediprintLabel,
      "/case/mediprint",
      t.completion.mediprintUnit,
      mediprintHotspots.map((h, i) => ({
        id: h.id,
        label: `${i + 1}. ${h.label}`,
        done: hotspotsVisited.includes(
          scopedId("mediprint", h.id.replace(/^hs-/, "")),
        ),
      })),
    ),
    build(
      "nordcom",
      t.completion.nordcomLabel,
      "/case/nordcom",
      t.completion.nordcomUnit,
      nordcomHotspots.map((h, i) => ({
        id: h.id,
        label: `${i + 1}. ${h.label}`,
        done: hotspotsVisited.includes(
          scopedId("nordcom", h.id.replace(/^hs-/, "")),
        ),
      })),
    ),
    build(
      "auron",
      t.completion.auronLabel,
      "/case/auron",
      t.completion.auronUnit,
      auronHotspots.map((h, i) => ({
        id: h.id,
        label: `${i + 1}. ${h.label}`,
        done: hotspotsVisited.includes(
          scopedId("auron", h.id.replace(/^hs-/, "")),
        ),
      })),
    ),
  ];

  return {
    groups,
    done: groups.reduce((n, g) => n + g.done, 0),
    total: groups.reduce((n, g) => n + g.total, 0),
  };
}
