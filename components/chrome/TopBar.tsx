"use client";

import Link from "next/link";
import { useProgress } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { useT } from "@/lib/locale";
import { AionLogo } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ResetProgress } from "./ResetProgress";

function Readout({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-caption uppercase tracking-wide text-lilac/80">{label}</span>
      <span className="text-readout tabular-nums text-paper">{value}</span>
    </div>
  );
}

export function TopBar() {
  // Persisted values only exist on the client; hold defaults until hydrated
  // so server and client markup match.
  const hydrated = useHydrated();
  const t = useT();

  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  return (
    <header className="sticky top-0 z-30 bg-navy text-paper">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-6">
        <Link href="/learn" className="flex items-center gap-3 rounded-md" aria-label={t.chrome.logoAlt}>
          <AionLogo className="h-6 w-20 text-paper" />
        </Link>

        <p className="min-w-0 flex-1 truncate text-caption text-lilac/90 md:text-body">
          {t.chrome.moduleTitle}
        </p>

        <div className="flex items-center gap-3">
          <Readout label={t.chrome.xp} value={hydrated ? xp : 0} />
          <Readout label={t.chrome.streak} value={hydrated ? streak : 0} />
          <ResetProgress />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
