"use client";

/* =============================================================================
 * 配布資料（PDF・PowerPoint など）へのリンク1件。
 * 枠線だけの四角いブロック。左に種類、真ん中に名前と「PDF・2.3MB」、右に「ダウンロード →」。
 * クリックで GA4 に file_download を送る（gtag が無ければ何もしない）。
 * 本文（.o-prose）の中でも使うので、リンクの下線・色は o-file で打ち消す（globals.css）。
 * ===========================================================================*/
import { fileKindLabel, formatBytes, mediaUrl, type Media } from "@/lib/payload";
import { trackEvent } from "@/lib/track";

type Props = {
  media: Media;
  /** 表示名。無ければ alt → filename の順で使う */
  label?: string | null;
  /** 一言の説明（例: 2026年10月版） */
  note?: string | null;
};

function extensionOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  return m ? m[1].toLowerCase() : "";
}

export function FileLink({ media, label, note }: Props) {
  const href = mediaUrl(media);
  if (!href) return null;

  const filename = media.filename ?? href.split("/").pop() ?? "";
  const title = label?.trim() || media.alt?.trim() || filename || "資料";
  const kind = fileKindLabel(media.mimeType || filename);
  const size = formatBytes(media.filesize);
  const meta = [kind, size].filter(Boolean).join("・");

  const onClick = () => {
    trackEvent("file_download", {
      file_name: filename,
      file_extension: extensionOf(filename),
      link_url: href,
      link_text: title,
    });
  };

  return (
    <a
      href={href}
      download
      target="_blank"
      rel="noopener"
      onClick={onClick}
      className="o-file group flex items-start gap-4 border border-line bg-void px-4 py-3.5 text-ink transition-colors hover:border-line-strong md:items-center md:px-5"
    >
      <span className="w-[72px] flex-none pt-0.5 font-mono text-[12px] tracking-[0.08em] text-ink-3 md:pt-0">
        {kind}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-snug">{title}</span>
        <span className="mt-1 block text-[12px] text-ink-3">
          {meta}
          {note && <span className="ml-2 text-ink-2">{note}</span>}
        </span>
      </span>
      <span className="flex-none self-center text-[13px] text-brand group-hover:text-brand-hover">
        ダウンロード →
      </span>
    </a>
  );
}
