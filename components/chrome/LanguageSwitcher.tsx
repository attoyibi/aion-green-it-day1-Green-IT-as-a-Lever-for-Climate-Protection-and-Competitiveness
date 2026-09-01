"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES } from "@/data/dictionaries";
import { useLocale, useLocaleStore, useT } from "@/lib/locale";
import { ChevronDownIcon, GlobeIcon } from "./Icons";

/**
 * Top-right language dropdown. Adding a language elsewhere (data/dictionaries)
 * is all this needs to pick up — it just renders LOCALES.
 */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language.switcherLabel}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl border border-lilac/40 px-3 py-1.5 text-caption text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10 hover:underline"
      >
        <GlobeIcon className="h-4 w-4 shrink-0" />
        {current.nativeLabel}
        <ChevronDownIcon className={open ? "rotate-180" : ""} />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t.language.switcherLabel}
          className="absolute right-0 top-full z-40 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-line bg-paper py-1 text-ink shadow-lg"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === locale}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={
                  "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-body transition-colors duration-200 hover:bg-lilac " +
                  (l.code === locale ? "font-semibold text-purple" : "text-ink")
                }
              >
                {l.nativeLabel}
                {l.code === locale ? (
                  <span aria-hidden="true">✓</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
