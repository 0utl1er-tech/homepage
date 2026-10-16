import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Surface-1 card with hairline border, soft shadow + inner top highlight,
 * and an optional hover-lift when interactive.
 * （左端の色線は使わない。よくある「AIっぽい」見た目になるため 2026-10-16 に廃止）
 * Mirrors the Claude Design system Card component.
 */
export function DSCard({
  interactive = false,
  className,
  style,
  children,
  ...rest
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="ds-card"
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-surface",
        "shadow-[var(--shadow-sm),var(--edge-highlight)] transition-all duration-200 ease-out",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md),var(--edge-highlight)]",
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
