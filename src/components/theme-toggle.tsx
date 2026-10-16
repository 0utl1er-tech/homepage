"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type ThemeChoice } from "@/lib/theme";
import { cn } from "@/lib/utils";

const CHANGE_EVENT = "o-theme-change";

const OPTIONS: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "ライト" },
  { value: "dark", label: "ダーク" },
  { value: "system", label: "端末に合わせる" },
];

function readChoice(): ThemeChoice {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function applyChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
}

function setChoice(choice: ThemeChoice) {
  try {
    if (choice === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // 保存できない環境（プライベートモード等）でも、このページでは切り替える
  }
  applyChoice(choice);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== THEME_STORAGE_KEY) return;
    applyChoice(readChoice());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** 現在の選択。サーバー描画時は「端末に合わせる」として扱う。 */
function useThemeChoice(): ThemeChoice {
  return useSyncExternalStore(subscribe, readChoice, () => "system");
}

function ThemeIcon({ choice, className }: { choice: ThemeChoice; className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {choice === "light" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </>
      )}
      {choice === "dark" && <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />}
      {choice === "system" && (
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </>
      )}
    </svg>
  );
}

/** デスクトップのナビ用：アイコンボタン＋選択肢のポップアップ。 */
export function ThemeMenu({ className }: { className?: string }) {
  const choice = useThemeChoice();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const current = OPTIONS.find((o) => o.value === choice) ?? OPTIONS[2];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative", className)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`表示テーマ：${current.label}（変更する）`}
        title={`表示テーマ：${current.label}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-7 w-7 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-ink-2 transition-colors before:absolute before:-inset-2 before:content-[''] hover:bg-surface-3 hover:text-ink"
      >
        <ThemeIcon choice={choice} />
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label="表示テーマ"
          className="absolute right-0 top-full z-50 mt-3 w-48 rounded-md border border-line bg-surface p-1 shadow-[var(--shadow-md)]"
        >
          {OPTIONS.map((o) => {
            const on = o.value === choice;
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setChoice(o.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className={cn(
                  "flex h-11 w-full items-center gap-2.5 rounded-sm px-3 text-left text-sm transition-colors hover:bg-surface-2",
                  on ? "font-bold text-brand" : "text-ink-2 hover:text-ink"
                )}
              >
                <ThemeIcon choice={o.value} />
                <span className="flex-1">{o.label}</span>
                {on && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** モバイルメニュー用：3つ並びの切り替えボタン。 */
export function ThemeSegmented({ className }: { className?: string }) {
  const choice = useThemeChoice();
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="px-3 font-mono text-xs text-ink-3" aria-hidden>
        表示テーマ
      </span>
      <div
        role="group"
        aria-label="表示テーマ"
        className="grid grid-cols-3 gap-1 rounded-md border border-line bg-surface-2 p-1"
      >
        {OPTIONS.map((o) => {
          const on = o.value === choice;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              aria-label={o.value === "system" ? o.label : undefined}
              onClick={() => setChoice(o.value)}
              className={cn(
                "flex min-h-11 items-center justify-center gap-1.5 rounded-sm px-2 text-xs transition-colors",
                on
                  ? "bg-surface font-bold text-brand shadow-[var(--shadow-xs)]"
                  : "text-ink-2 hover:bg-surface-3 hover:text-ink"
              )}
            >
              <ThemeIcon choice={o.value} className="flex-none" />
              {o.value === "system" ? "端末" : o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
