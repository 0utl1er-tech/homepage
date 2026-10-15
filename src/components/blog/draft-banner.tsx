/** 下書きプレビュー中の帯。終了リンクは prefetch で cookie が消えないよう <a> にする */
export function DraftBanner({ path }: { path: string }) {
  return (
    <div className="border-b border-[var(--amber-500)]/40 bg-[var(--amber-tint)]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-3 md:px-12">
        <span className="flex items-center gap-2.5 text-sm font-bold text-[var(--amber-400)]">
          <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-[var(--amber-500)]" />
          下書きプレビュー中（公開されていません）
        </span>
        <a
          href={`/api/preview/exit?path=${encodeURIComponent(path)}`}
          className="font-mono text-sm text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          プレビューを終える
        </a>
      </div>
    </div>
  );
}
