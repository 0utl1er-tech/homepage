/* =============================================================================
 * 0UTL1ER — Strapi 連携ヘルパー（Next.js 版）
 * サービス/お知らせの一覧・詳細ページが利用します。
 *
 * セットアップ：
 *   1. Strapi で Collection Type "Product"（API ID: products）を作成
 *   2. フィールド: title (Text) / slug (UID) / excerpt (Text) /
 *      body (Rich text or Markdown) / coverImage (Media) / category (Text)
 *      ※ 公開日は Strapi 標準の publishedAt を使用
 *   3. Settings → Roles → Public で products の find / findOne を公開
 *   4. 環境変数を設定（.env.local）:
 *        NEXT_PUBLIC_STRAPI_URL=https://cms.0utl1er.tech   （末尾の /api は不要）
 *        STRAPI_TOKEN=...    （Public 公開なら不要）
 *      未設定のままだと下部の SAMPLE_CARDS を表示します。
 * ===========================================================================*/

export const STRAPI = {
  baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL ?? "",
  collection: "products",
  token: process.env.STRAPI_TOKEN ?? "",
};

export type Card = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  cover: string | null;
  hasCover: boolean;
};

export type Detail = Card & { bodyHtml: string };

function apiBase() {
  return STRAPI.baseUrl.trim().replace(/\/+$/, "");
}
function authHeaders(): HeadersInit {
  const h: Record<string, string> = { Accept: "application/json" };
  if (STRAPI.token) h.Authorization = "Bearer " + STRAPI.token;
  return h;
}
export function mediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return apiBase() + url;
}
function esc(s: unknown) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function fmtDate(s?: string): string {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

/* ---------- Strapi v4 / v5 両対応の取り出し ---------- */
type Entry = Record<string, unknown> & { attributes?: Record<string, unknown>; id?: number | string };

function pick(entry: Entry) {
  const a = (entry?.attributes ?? entry) as Record<string, unknown>;
  const id = entry?.id ?? (a?.id as number | string);
  return { id, a: a ?? {} };
}
function coverFrom(a: Record<string, unknown>): string | null {
  let c = (a.coverImage ?? a.cover ?? a.image ?? a.thumbnail) as
    | Record<string, unknown>
    | null
    | undefined;
  if (!c) return null;
  if (c.data) c = c.data as Record<string, unknown>;
  if (Array.isArray(c)) c = c[0];
  if (c && c.attributes) c = c.attributes as Record<string, unknown>;
  if (!c) return null;
  const fmt = (c.formats ?? {}) as Record<string, { url?: string }>;
  const url =
    (c.url as string) || fmt.medium?.url || fmt.small?.url || null;
  return mediaUrl(url);
}

export function normalizeCard(entry: Entry): Card {
  const { id, a } = pick(entry);
  const slug = (a.slug as string) || String(id);
  const cover = coverFrom(a);
  return {
    id,
    slug,
    title: (a.title as string) || "(無題)",
    excerpt: (a.excerpt as string) || "",
    category: (a.category as string) || "",
    dateLabel: fmtDate(
      (a.publishedAt as string) || (a.date as string) || (a.createdAt as string)
    ),
    cover,
    hasCover: !!cover,
  };
}
export function normalizeDetail(entry: Entry): Detail {
  const card = normalizeCard(entry);
  const { a } = pick(entry);
  return { ...card, bodyHtml: mdToHtml(a.body) };
}

/* ---------- フェッチ（サーバー側） ---------- */
export async function fetchList(): Promise<Card[]> {
  if (!apiBase()) throw new Error("no-base");
  const url =
    apiBase() +
    "/api/" +
    STRAPI.collection +
    "?populate=*&sort=publishedAt:desc&pagination[pageSize]=100";
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("http " + res.status);
  const json = await res.json();
  return (json.data || []).map(normalizeCard);
}
export async function fetchBySlug(slug: string): Promise<Detail | null> {
  if (!apiBase()) throw new Error("no-base");
  const url =
    apiBase() +
    "/api/" +
    STRAPI.collection +
    "?filters[slug][$eq]=" +
    encodeURIComponent(slug) +
    "&populate=*";
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("http " + res.status);
  const json = await res.json();
  const data = json.data || [];
  return data.length ? normalizeDetail(data[0]) : null;
}

/** Returns the list from Strapi, or sample cards if Strapi is unreachable. */
export async function getList(): Promise<{ items: Card[]; usingSample: boolean }> {
  try {
    const items = await fetchList();
    if (items.length) return { items, usingSample: false };
  } catch {
    /* fall through to sample */
  }
  return { items: SAMPLE_CARDS, usingSample: true };
}

/** Returns a detail by slug from Strapi, or the matching sample. */
export async function getDetail(slug: string): Promise<Detail | null> {
  try {
    const item = await fetchBySlug(slug);
    if (item) return item;
  } catch {
    /* fall through to sample */
  }
  return sampleDetail(slug);
}

/* ---------- Markdown / Blocks → HTML ---------- */
function inline(s: string) {
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>'
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  return s;
}
type Block = {
  type?: string;
  level?: number;
  format?: string;
  image?: { url?: string };
  url?: string;
  children?: Array<Record<string, unknown>>;
};
function blocksToHtml(blocks: Block[]): string {
  return blocks
    .map((b) => {
      const txt = (b.children || [])
        .map((c) => {
          if (c.type === "link") {
            const t = ((c.children as Block["children"]) || [])
              .map((x) => esc((x as { text?: string }).text || ""))
              .join("");
            return (
              '<a href="' +
              ((c.url as string) || "#") +
              '" target="_blank" rel="noopener">' +
              t +
              "</a>"
            );
          }
          let t = esc((c as { text?: string }).text || "");
          if ((c as { bold?: boolean }).bold) t = "<strong>" + t + "</strong>";
          if ((c as { italic?: boolean }).italic) t = "<em>" + t + "</em>";
          if ((c as { code?: boolean }).code) t = "<code>" + t + "</code>";
          return t;
        })
        .join("");
      if (b.type === "heading")
        return `<h${b.level || 2}>${txt}</h${b.level || 2}>`;
      if (b.type === "quote") return "<blockquote>" + txt + "</blockquote>";
      if (b.type === "image" && b.image)
        return '<img src="' + mediaUrl(b.image.url) + '" alt="">';
      if (b.type === "list") {
        const tag = b.format === "ordered" ? "ol" : "ul";
        const items = (b.children || [])
          .map(
            (li) =>
              "<li>" +
              (((li as Block).children as Block["children"]) || [])
                .map((c) => esc((c as { text?: string }).text || ""))
                .join("") +
              "</li>"
          )
          .join("");
        return "<" + tag + ">" + items + "</" + tag + ">";
      }
      return "<p>" + txt + "</p>";
    })
    .join("");
}
export function mdToHtml(md: unknown): string {
  if (Array.isArray(md)) return blocksToHtml(md as Block[]);
  if (typeof md !== "string") return "";
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let listType: "ul" | "ol" | null = null;
  let listBuf: string[] = [];
  const flush = () => {
    if (listType) {
      html +=
        "<" +
        listType +
        ">" +
        listBuf.map((x) => "<li>" + inline(x) + "</li>").join("") +
        "</" +
        listType +
        ">";
      listType = null;
      listBuf = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flush();
      const l = m[1].length;
      html += `<h${l}>${inline(m[2])}</h${l}>`;
      continue;
    }
    if (/^([-*])\s+/.test(line)) {
      if (listType && listType !== "ul") flush();
      listType = "ul";
      listBuf.push(line.replace(/^([-*])\s+/, ""));
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      if (listType && listType !== "ol") flush();
      listType = "ol";
      listBuf.push(line.replace(/^\d+\.\s+/, ""));
      continue;
    }
    if (/^>\s?/.test(line)) {
      flush();
      html += "<blockquote>" + inline(line.replace(/^>\s?/, "")) + "</blockquote>";
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      flush();
      html += "<hr>";
      continue;
    }
    flush();
    html += "<p>" + inline(line) + "</p>";
  }
  flush();
  return html;
}

/* ---------- サンプルデータ（Strapi 未接続時に表示） ---------- */
const SAMPLE_BODIES: Record<string, string> = {
  "managed-private-cloud": `0UTL1ER は、保守から運用まで完全に自社で完結する **マネージドプライベートクラウド** の正式提供を開始しました。

## 特長
豊富な計算資源を、業界水準より大幅に抑えたコストでご利用いただけます。構築・監視・障害対応までワンストップで担うため、御社は本来の事業に集中できます。

- 物理層からの完全マネージド
- 透明な料金体系
- 24/365 の監視体制

> 「安価に、高度に」を体現するインフラです。

詳細はお問い合わせよりご相談ください。`,
  "clean-oss-stack": `特定ベンダーに縛られない、**CNCF ベースの透明な OSS 基盤** についてご紹介します。

ブラックボックスのない構成は、長期にわたって保守・検証が可能な資産を残します。

## なぜ OSS なのか
ロックインを避け、技術的な意思決定の主導権をお客様の側に残すためです。

1. 監査可能性
2. 移植性
3. コミュニティによる継続的な改善`,
  "engineer-program": `代表が選ぶ現場の精鋭を育成する **エンジニア育成プログラム** を開始しました。

少数精鋭のチームに最新 AI を掛け合わせ、品質とスピードを両立します。育成したエンジニアは、受託開発および派遣の両形態でご活用いただけます。

ご関心のある企業様は、お問い合わせフォームよりご連絡ください。`,
};

export const SAMPLE_CARDS: Card[] = [
  {
    id: 1,
    slug: "managed-private-cloud",
    title: "マネージドプライベートクラウドを正式リリース",
    excerpt:
      "保守から運用まで完全自社完結。豊富な計算資源を、安価に・高度にご提供します。",
    category: "プロダクト",
    dateLabel: "2026.06.10",
    cover: null,
    hasCover: false,
  },
  {
    id: 2,
    slug: "clean-oss-stack",
    title: "CNCFベースのクリーンなOSS基盤という選択",
    excerpt: "特定ベンダーに縛られない、透明で検証可能なソフトウェア基盤の考え方。",
    category: "技術",
    dateLabel: "2026.05.28",
    cover: null,
    hasCover: false,
  },
  {
    id: 3,
    slug: "engineer-program",
    title: "エンジニア育成プログラムを開始しました",
    excerpt:
      "代表が選ぶ現場の精鋭に、最新AIを掛け合わせる。少数精鋭の育成・派遣を強化。",
    category: "お知らせ",
    dateLabel: "2026.05.15",
    cover: null,
    hasCover: false,
  },
];

export function sampleDetail(slug: string): Detail | null {
  const c = slug ? SAMPLE_CARDS.find((x) => x.slug === slug) : SAMPLE_CARDS[0];
  if (!c) return null;
  return { ...c, bodyHtml: mdToHtml(SAMPLE_BODIES[c.slug] || "") };
}
