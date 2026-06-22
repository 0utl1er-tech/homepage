import { BINARY_STRING } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Faint binary string, top-right of the home hero. */
export function BinaryDecor({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-[-20px] top-10 w-[520px] text-right font-mono text-[22px] leading-normal text-brand opacity-[0.05] break-all select-none",
        className
      )}
    >
      {BINARY_STRING}
    </div>
  );
}

/** Giant ghosted "01" anchored bottom-left of CTA bands. */
export function GhostZeroOne() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-[-34px] left-[-10px] font-mono text-[120px] font-bold text-brand opacity-[0.05] select-none"
    >
      01
    </div>
  );
}
