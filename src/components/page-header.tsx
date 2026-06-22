import * as React from "react";

/** Standard inner-page header: mono eyebrow, large display title, optional lead. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-[72px]">
        <div className="mb-4 font-mono text-[13px] text-ink-3">{eyebrow}</div>
        <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] md:text-[46px]">
          {title}
        </h1>
        {lead && (
          <p className="mt-[18px] max-w-[560px] text-base leading-relaxed text-ink-2">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
