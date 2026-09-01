"use client";

import { useT } from "@/lib/locale";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-line px-4 py-6 text-caption text-ash md:px-6">
      {t.chrome.footer}
    </footer>
  );
}
