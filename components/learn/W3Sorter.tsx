"use client";

import { useEffect, useState } from "react";
import { W3, W3_DE } from "@/data/learn";
import { type CategoryCode } from "@/data/categories";
import { WidgetShell } from "./WidgetShell";
import { PlacementBoard, type Verdict } from "./PlacementBoard";
import { useWidget } from "./useWidget";
import { useProgress } from "@/lib/store";
import { fmt, useCategories, useLocale } from "@/lib/locale";

const COPY = {
  en: { usuallyFiledUnder: "Usually filed under {category}. " },
  de: { usuallyFiledUnder: "Wird meist unter {category} eingeordnet. " },
};

export function W3Sorter() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const data = locale === "de" ? W3_DE : W3;
  const { categories: CATEGORIES, byCode: CATEGORY_BY_CODE } = useCategories();
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const { complete } = useWidget(W3.id, W3.xp);
  const recordAnswer = useProgress((s) => s.recordTrainingAnswer);

  const done = Object.keys(placements).length === data.snippets.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const place = (itemId: string, targetId: string) => {
    setSelected(null);
    setPlacements((prev) => {
      if (!targetId) {
        const { [itemId]: _dropped, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: targetId };
    });

    const snippet = data.snippets.find((s) => s.id === itemId);
    if (targetId && snippet) {
      // Streak and per-category counters are shared with the training tab.
      recordAnswer(snippet.id, targetId as CategoryCode, snippet.answer);
    }
  };

  const verdicts: Record<string, Verdict> = {};
  for (const snippet of data.snippets) {
    const chosen = placements[snippet.id];
    if (!chosen) continue;
    const right = chosen === snippet.answer;
    verdicts[snippet.id] = {
      tone: right ? "good" : "danger",
      message: right
        ? snippet.why
        : fmt(copy.usuallyFiledUnder, { category: CATEGORY_BY_CODE[snippet.answer].name }) +
          snippet.why,
    };
  }

  return (
    <WidgetShell
      meta={data}
      progress={Object.keys(placements).length / data.snippets.length}
      done={done}
      closing={data.closing}
    >
      <PlacementBoard
        items={data.snippets.map((s) => ({ id: s.id, text: s.text }))}
        targets={CATEGORIES.map((c) => ({ id: c.code, label: `${c.name} (${c.code})` }))}
        placements={placements}
        verdicts={verdicts}
        selectedId={selected}
        onSelectItem={setSelected}
        onPlace={place}
        targetGrid="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
      />
    </WidgetShell>
  );
}
