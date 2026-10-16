/* 事業の一覧（正方形・枠線だけのブロック）。提供の形のページの「この形で提供している事業」と、
 * 事業ページの「同じ形のほかの事業」で使う。写真があれば上に出し、名前・ひとこと・「準備中」を添える。 */
import Link from "next/link";
import { isObj, mediaUrl, type Business } from "@/lib/payload";

export function BusinessGrid({ frameSlug, items }: { frameSlug: string; items: Business[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {items.map((b) => {
        const img = mediaUrl(b.image, "card") ?? mediaUrl(b.image);
        const alt = isObj(b.image) ? b.image.alt || b.name : b.name;
        return (
          <li key={b.id}>
            <Link
              href={`/services/${frameSlug}/${b.slug}`}
              className="flex aspect-square flex-col overflow-hidden border border-line bg-void text-inherit transition-colors hover:border-line-strong"
            >
              {img ? (
                <div className="h-1/2 w-full overflow-hidden bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ) : (
                <div className="h-1/2 w-full border-b border-line" aria-hidden />
              )}
              <div className="flex min-h-0 flex-1 flex-col p-4">
                <div className="text-[16px] font-medium leading-snug">{b.name}</div>
                {b.tagline && (
                  <p className="mt-1 line-clamp-3 text-[13px] leading-relaxed text-ink-2">{b.tagline}</p>
                )}
                {b.state === "preparing" && (
                  <span className="mt-auto pt-2 text-[12px] text-ink-3">準備中</span>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
