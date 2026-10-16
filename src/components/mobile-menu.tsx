"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, type NavKey } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeSegmented } from "@/components/theme-toggle";

export function MobileMenu({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-ink transition-colors hover:bg-surface-3"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-[var(--header-border)] bg-[var(--header-bg)] animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.key ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-md px-3 py-3 text-[15px] font-medium transition-colors hover:bg-surface-2 hover:text-ink",
                  active === item.key ? "bg-surface-2 text-ink" : "text-ink-2"
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeSegmented className="mt-2 border-t border-line pt-4 pb-1" />
          </div>
        </div>
      )}
    </div>
  );
}
