/* =============================================================================
 * 0UTL1ER — Payload CMS クライアント（サーバー専用）
 * ブログ（/blog 以下）とメンバーページの「書いた記事」が使う。
 *
 * 環境変数:
 *   PAYLOAD_INTERNAL_URL  例 http://payload.payload.svc（クラスタ内から叩く）
 *   PAYLOAD_API_KEY       下書きプレビュー用（Payload の users API キー）
 *
 * - 公開記事は 60 秒キャッシュ（fetch の next.revalidate）。下書きはキャッシュしない。
 * - Payload に届かないとき（Docker ビルド中など）は例外にせず「取れなかった」を返す。
 *   ページ側は空の一覧や案内文を出す。
 * ===========================================================================*/
import { cache } from "react";

/** 公開記事のキャッシュ秒数 */
export const PAYLOAD_REVALIDATE = 60;
/** 画像 URL が相対パスで来たときの補完先（Payload の公開 URL） */
const PUBLIC_BASE = "https://payload.0utl1er.tech";

/* ---------- 型 ---------- */

export type LexicalNode = {
  type: string;
  version?: number;
  children?: LexicalNode[];
  // text
  text?: string;
  format?: number | string;
  // heading
  tag?: string;
  // list / listitem
  listType?: "bullet" | "number" | "check";
  start?: number;
  checked?: boolean;
  value?: unknown;
  // link
  fields?: {
    url?: string;
    newTab?: boolean;
    linkType?: "custom" | "internal";
    doc?: { relationTo?: string; value?: unknown } | null;
    caption?: unknown;
    [key: string]: unknown;
  };
  // upload / relationship
  relationTo?: string;
  [key: string]: unknown;
};

export type LexicalRoot = { root: LexicalNode };

export type Media = {
  id: number;
  alt?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>;
};

export type Member = {
  id: number;
  nameJa: string;
  nameEn?: string | null;
  title?: string | null;
  role?: string | null;
  slug: string;
  photo?: Media | number | null;
};

export type Audience = "local" | "business" | "both";

export type Service = {
  id: number;
  name: string;
  slug?: string | null;
  summary?: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  featuredPosts?: (Post | number)[] | null;
  service?: Service | number | null;
  audience?: Audience | null;
  order?: number | null;
};

/** 技術マップ（ツリー）の項目。breadcrumbs は根から自分までの道筋（Payload が保存時に計算） */
export type Topic = {
  id: number;
  name: string;
  slug: string;
  breadcrumbs?: { doc?: number | Topic | null; label?: string | null; url?: string | null }[] | null;
};

export type PostType = "guide" | "comparison" | "tech" | "case-story" | "essay";

export type Post = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content?: LexicalRoot | null;
  cover?: Media | number | null;
  category?: Category | number | null;
  channel?: "marketing" | "tech" | "company" | null;
  primaryTopic?: Topic | number | null;
  type?: PostType | null;
  tags?: string[] | null;
  author?: Member | number | null;
  contributors?: (Member | number)[] | null;
  relatedService?: Service | number | null;
  publishedAt?: string | null;
  contentUpdatedAt?: string | null;
  updatedAt?: string;
  changelog?: { id?: string; date: string; note: string }[] | null;
  comparison?: {
    disclosure?: string | null;
    checkedAt?: string | null;
    method?: string | null;
  } | null;
  zenn?: { url?: string | null } | null;
  note?: { url?: string | null } | null;
  _status?: "draft" | "published" | null;
};

type ListResponse<T> = { docs: T[]; totalDocs?: number };

/** 一覧の取得結果。ok=false は「Payload に届かなかった」 */
export type ListResult<T> = { ok: boolean; docs: T[] };

/* ---------- 共通 ---------- */

function apiBase(): string {
  return (process.env.PAYLOAD_INTERNAL_URL ?? "").trim().replace(/\/+$/, "");
}

export function isObj<T extends { id: number }>(v: T | number | null | undefined): v is T {
  return typeof v === "object" && v !== null;
}

export function mediaUrl(media: Media | number | null | undefined, size?: string): string | null {
  if (!isObj(media)) return null;
  const url = (size && media.sizes?.[size]?.url) || media.url;
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return PUBLIC_BASE + (url.startsWith("/") ? url : `/${url}`);
}

type FetchOpts = { draft?: boolean; tags?: string[] };

async function getJson<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  const base = apiBase();
  if (!base) return null;
  const headers: Record<string, string> = { Accept: "application/json" };
  let init: RequestInit;
  if (opts.draft) {
    const key = process.env.PAYLOAD_API_KEY;
    if (key) headers.Authorization = `users API-Key ${key}`;
    init = { headers, cache: "no-store" };
  } else {
    init = {
      headers,
      next: { revalidate: PAYLOAD_REVALIDATE, tags: ["payload", ...(opts.tags ?? [])] },
    };
  }
  try {
    const res = await fetch(base + path, { ...init, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function qs(params: Record<string, string | number | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  }
  return sp.toString();
}

/* ---------- 記事 ---------- */

type PostQuery = {
  categorySlug?: string;
  authorSlug?: string;
  limit?: number;
  depth?: number;
};

/** 公開済みの記事を新しい順に取る */
export const getPosts = cache(async function getPosts(
  q: PostQuery = {}
): Promise<ListResult<Post>> {
  const params: Record<string, string | number | undefined> = {
    "where[_status][equals]": "published",
    "where[category.slug][equals]": q.categorySlug,
    "where[author.slug][equals]": q.authorSlug,
    depth: q.depth ?? 1,
    limit: q.limit ?? 50,
    sort: "-publishedAt",
  };
  const json = await getJson<ListResponse<Post>>(`/api/posts?${qs(params)}`, {
    tags: ["posts"],
  });
  if (!json) return { ok: false, docs: [] };
  return { ok: true, docs: json.docs ?? [] };
});

/** 記事を1件。draft=true なら下書き（最新の版）を API キーで取る */
export const getPostBySlug = cache(async function getPostBySlug(
  slug: string,
  draft: boolean
): Promise<Post | null> {
  const params: Record<string, string | number | undefined> = {
    "where[slug][equals]": slug,
    depth: 2,
    limit: 1,
  };
  if (draft) params.draft = "true";
  else params["where[_status][equals]"] = "published";
  const json = await getJson<ListResponse<Post>>(`/api/posts?${qs(params)}`, {
    draft,
    tags: ["posts"],
  });
  return json?.docs?.[0] ?? null;
});

/* ---------- ジャンル ---------- */

export const getCategories = cache(async function getCategories(): Promise<
  ListResult<Category>
> {
  const json = await getJson<ListResponse<Category>>(
    `/api/categories?${qs({ depth: 1, limit: 100, sort: "order" })}`,
    { tags: ["categories"] }
  );
  if (!json) return { ok: false, docs: [] };
  return { ok: true, docs: json.docs ?? [] };
});

/** ジャンルを1件（まず読む3本・つなぐサービスを展開して取る） */
export const getCategoryBySlug = cache(async function getCategoryBySlug(
  slug: string
): Promise<{ ok: boolean; category: Category | null }> {
  const json = await getJson<ListResponse<Category>>(
    `/api/categories?${qs({ "where[slug][equals]": slug, depth: 2, limit: 1 })}`,
    { tags: ["categories"] }
  );
  if (!json) return { ok: false, category: null };
  return { ok: true, category: json.docs?.[0] ?? null };
});

/* ---------- 表示用の小物 ---------- */

export const POST_TYPE_LABEL: Record<PostType, string> = {
  guide: "解説",
  comparison: "比較・選び方",
  tech: "技術記録",
  "case-story": "事例の裏話",
  essay: "考え方",
};

/** 2026-10-15T… → 2026年10月15日（日本時間） */
export function formatDateJa(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/** 2026-10-15T… → 2026.10.15（一覧用・日本時間） */
export function formatDateDot(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}.${get("month")}.${get("day")}`;
}

/** 公開されていない関連先（id のまま返ってくる）を除いて、記事だけを取り出す */
export function populatedPosts(list: (Post | number)[] | null | undefined): Post[] {
  return (list ?? []).filter(
    (p): p is Post => isObj(p) && (p._status === undefined || p._status === "published")
  );
}
