"use client";

import { useState } from "react";
import { InfoDialog } from "@/components/ui/InfoDialog";
import type { Initiative } from "@/data/case-shared";

type Props = { initiative: Initiative };

/** A read-only card that opens the initiative's verbatim text in a modal. No ranking, no recommendation. */
export function InitiativePanel({ initiative }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        id={initiative.id}
        onClick={() => setOpen(true)}
        className="card w-full p-4 text-left transition-colors duration-200 hover:bg-lilac"
      >
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-h3 text-ink">{initiative.title}</h3>
          <code className="text-caption text-ash">{initiative.id}</code>
        </div>
        <p className="text-body text-ash">{initiative.body}</p>
      </button>

      <InfoDialog open={open} title={initiative.title} onClose={() => setOpen(false)}>
        <p className="text-body text-ink">{initiative.body}</p>
      </InfoDialog>
    </>
  );
}
