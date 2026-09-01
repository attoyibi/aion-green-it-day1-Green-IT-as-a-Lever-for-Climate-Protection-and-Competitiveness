"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/store";
import { useT } from "@/lib/locale";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const TOAST_MS = 5000;

export function ResetProgress() {
  const [asking, setAsking] = useState(false);
  const [done, setDone] = useState(false);
  const reset = useProgress((s) => s.reset);
  const t = useT();

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), TOAST_MS);
    return () => clearTimeout(t);
  }, [done]);

  const confirm = () => {
    reset();
    setAsking(false);
    setDone(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="rounded-xl border border-lilac/40 px-3 py-1.5 text-caption text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10 hover:underline"
      >
        {t.reset.button}
      </button>

      <ConfirmDialog
        open={asking}
        title={t.reset.confirmTitle}
        confirmLabel={t.reset.confirmYes}
        cancelLabel={t.reset.confirmNo}
        onConfirm={confirm}
        onCancel={() => setAsking(false)}
        body={
          <>
            <p className="mb-2">{t.reset.bodyIntro}</p>
            <ul className="mb-3 list-disc space-y-1 pl-5">
              <li>{t.reset.bodyXpStreak}</li>
              <li>{t.reset.bodyBadges}</li>
              <li>{t.reset.bodyLearnWidgets}</li>
              <li>{t.reset.bodyTrainingRound}</li>
              <li>{t.reset.bodyMediprint}</li>
            </ul>
            <p>{t.reset.bodyOutro}</p>
          </>
        }
      />

      {/* Sits outside the reset boundary, so it survives the remount it triggers. */}
      {done ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border-l-4 border-good bg-paper p-4 shadow-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-body text-ink">
              <span className="font-semibold">{t.reset.doneTitle} </span>
              {t.reset.doneBody}
            </p>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="shrink-0 rounded-lg border border-line px-2 py-1 text-caption text-ash transition-colors duration-200 hover:text-navy hover:underline"
            >
              {t.reset.close}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
