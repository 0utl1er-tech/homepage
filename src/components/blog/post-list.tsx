import type { ReactNode } from "react";
import Link from "next/link";
import { DSCard } from "@/components/ds/ds-card";
import {
  POST_TYPE_LABEL,
  formatDateDot,
  isObj,
  mediaUrl,
  type Post,
} from "@/lib/payload";

function genreName(post: Post): string | null {
  return isObj(post.category) ? post.category.name : null;
}

/** 新着などの一覧（1行1記事） */
export function PostList({
  posts,
  showGenre = true,
}: {
  posts: Post[];
  showGenre?: boolean;
}) {
  return (
    <ul className="border-t border-line">
      {posts.map((post) => {
        const thumb = mediaUrl(post.cover, "card") ?? mediaUrl(post.cover);
        const genre = showGenre ? genreName(post) : null;
        return (
          <li key={post.id} className="border-b border-line">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 gap-x-8 gap-y-2 py-7 md:grid-cols-[120px_1fr_auto] md:items-start"
            >
              <time
                dateTime={post.publishedAt ?? undefined}
                className="pt-0.5 font-mono text-[13px] text-ink-3"
              >
                {formatDateDot(post.publishedAt)}
              </time>
              <div className="min-w-0">
                {(genre || post.type) && (
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {genre && (
                      <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-brand">
                        {genre}
                      </span>
                    )}
                    {post.type && (
                      <span className="text-xs text-ink-3">{POST_TYPE_LABEL[post.type]}</span>
                    )}
                  </div>
                )}
                <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-brand md:text-[19px]">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="mt-2 line-clamp-2 max-w-[640px] text-sm leading-relaxed text-ink-2">
                    {post.description}
                  </p>
                )}
              </div>
              {thumb ? (
                <div className="hidden aspect-video w-[168px] overflow-hidden border border-line bg-surface-2 md:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              ) : (
                <span
                  aria-hidden
                  className="hidden pt-0.5 font-mono text-sm text-ink-3 transition-colors group-hover:text-brand md:inline"
                >
                  →
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** ジャンルページの「まず読む3本」 */
export function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {posts.map((post, i) => (
        <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
          <DSCard interactive className="flex h-full flex-col p-6">
            <div
              aria-hidden
              className="mb-4 font-mono text-[44px] font-bold leading-none tracking-[-0.04em]"
              style={{ color: "transparent", WebkitTextStroke: "1.2px var(--accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-2.5 text-[17px] font-bold leading-snug tracking-tight transition-colors group-hover:text-brand">
              {post.title}
            </h3>
            {post.description && (
              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-ink-2">
                {post.description}
              </p>
            )}
            <span className="mt-auto font-mono text-xs text-ink-3">
              {formatDateDot(post.publishedAt)}
            </span>
          </DSCard>
        </Link>
      ))}
    </div>
  );
}

/** 記事が無いとき・読み込めなかったときの案内 */
export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <div className="border border-dashed border-line-strong bg-surface/40 px-6 py-10 text-center text-sm leading-relaxed text-ink-2">
      {children}
    </div>
  );
}
