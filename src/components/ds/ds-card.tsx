import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Surface-1 card with hairline border, no shadow or radius (角ばった CERN 型),
 * and a stronger border on hover when interactive.
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
        "relative overflow-hidden border border-line bg-surface",
        "transition-colors duration-200 ease-out",
        interactive &&
          "cursor-pointer hover:border-line-strong",
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
