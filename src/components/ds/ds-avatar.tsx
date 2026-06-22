import * as React from "react";

type Ring = "none" | "accent" | "profit" | "cost";

const tints = [
  "var(--blue-tint)",
  "var(--cyan-tint)",
  "var(--profit-tint)",
  "rgba(245,158,11,0.16)",
  "rgba(124,58,237,0.18)",
  "rgba(236,72,153,0.16)",
];

const ringColor: Record<Ring, string> = {
  none: "transparent",
  accent: "var(--accent)",
  profit: "var(--profit)",
  cost: "var(--cost)",
};

/**
 * Initial-based avatar. For Japanese (CJK) names it shows the first
 * character (surname kanji); otherwise up to two latin initials.
 * Background tint is derived deterministically from the name.
 */
export function DSAvatar({
  name = "",
  size = 36,
  ring = "none",
  src = null,
  style,
}: {
  name?: string;
  size?: number;
  ring?: Ring;
  src?: string | null;
  style?: React.CSSProperties;
}) {
  const isCJK = /[　-鿿＀-￯]/.test(name);
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "—";
  const label = isCJK ? name.trim().slice(0, 1) : initials;

  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const bg = tints[h % tints.length];

  return (
    <div
      title={name}
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans font-semibold text-ink select-none"
      style={{
        width: size,
        height: size,
        background: src ? "transparent" : bg,
        fontSize: Math.round(size * 0.4),
        boxShadow:
          ring !== "none"
            ? `0 0 0 2px var(--bg-app), 0 0 0 ${Math.max(2, size * 0.06)}px ${ringColor[ring]}`
            : "none",
        ...style,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        label
      )}
    </div>
  );
}
