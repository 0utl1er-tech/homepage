import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * User-fillable image placeholder. When `src` is provided it renders the
 * image; otherwise it shows a dashed empty state with a caption — a drop-in
 * for the design's <image-slot> elements.
 */
export function ImageSlot({
  src = null,
  placeholder = "画像",
  radius = 12,
  className,
  style,
  alt = "",
}: {
  src?: string | null;
  placeholder?: string;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn("block h-full w-full object-cover", className)}
        style={{ borderRadius: radius, ...style }}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2.5 border border-dashed border-line-strong bg-surface-2 p-4 text-center",
        className
      )}
      style={{ borderRadius: radius, ...style }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ink-3 opacity-70"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="font-mono text-xs leading-relaxed text-ink-3">
        {placeholder}
      </span>
    </div>
  );
}
