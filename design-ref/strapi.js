/* =============================================================================
 * 0UTL1ER — Strapi 連携ヘルパー
 * 一覧ページ（プロダクト.dc.html）と詳細ページ（プロダクト詳細.dc.html）が
 * このモジュールを動的 import して使います。
 *
 * ---------------------------------------------------------------------------
 * ▼ セットアップ手順（Strapi 側）
 *   1. Content-Type Builder で Collection Type を作成
 *        - Display name: Product   /   API ID (Plural): products
 *          （別名にする場合は下の STRAPI.collection を合わせてください）
 *   2. 下記フィールドを追加：
 *        title       : Text (Short)                 … タイトル（必須）
 *        slug        : UID  (Attached field: title) … URL用スラッグ（必須・一意）
 *        excerpt     : Text (Long)                  … 一覧に出す要約・抜粋
 *        body        : Rich text (Markdown)         … 本文（Blocks形式も自動対応）
 *        coverImage  : Media (Single image)         … カバー / サムネイル画像
 *        category    : Text (Short) または Enumeration … カテゴリ（例: プロダクト / 技術 / お知らせ）
 *      ※ 公開日は Strapi 標準の publishedAt を自動で使います（追加フィールド不要）。
 *   3. Settings → Roles → Public で、products の find / findOne に ✔ を付けて公開
 *      （または下の STRAPI.token に Read 権限の API トークンを設定）。
 *   4. CORS: プレビュー/本番のドメインからの fetch を許可してください
 *      （config/middlewares.js の strapi::cors を設定）。
 *   5. 下の STRAPI.baseUrl に Strapi の URL を設定（末尾の /api は不要）。
 *      空のままだと、このページは下部の SAMPLE_CARDS を表示します。
 * ---------------------------------------------------------------------------
 * フィールド名を変えたい場合は coverFrom() / normalizeCard() / normalizeDetail()
 * の参照名を合わせるか、Strapi 側を上記の名前に揃えてください。
 * ===========================================================================*/

export const STRAPI = {
  baseUrl: "",          // 例: "https://cms.0utl1er.tech" （空ならサンプル表示）
  collection: "products",
  token: "",            // Public 公開なら空のまま。トークン運用なら Read 権限のトークンを設定
};

/* ---------- 内部ユーティリティ ---------- */
function apiBase() {
  return (STRAPI.baseUrl || "").trim().replace(/\/+$/, "");
}
function authHeaders() {
  const h = { Accept: "application/json" };
  if (STRAPI.token) h.Authorization = "Bearer " + STRAPI.token;
  return h;
}
export function mediaUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return apiBase() + url;
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function fmtDate(s) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d)) return "";
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "." + p(d.getMonth() + 1) + "." + p(d.getDate());
}

/* ---------- Strapi v4 / v5 両対応の取り出し ---------- */
function pick(entry) {
  const a = entry && entry.attributes ? entry.attributes : entry;
  const id = entry && entry.id != null ? entry.id : a && a.id;
  return { id, a: a || {} };
}
function coverFrom(a) {
  let c = a.coverImage || a.cover || a.image || a.thumbnail;
  if (!c) return null;
  if (c.data) c = c.data;            // v4
  if (Array.isArray(c)) c = c[0];    // multiple → first
  if (c && c.attributes) c = c.attributes;
  if (!c) return null;
  const fmt = c.formats || {};
  const url = c.url || (fmt.medium && fmt.medium.url) || (fmt.small && fmt.small.url);
  return mediaUrl(url);
}

export function normalizeCard(entry) {
  const { id, a } = pick(entry);
  const slug = a.slug || String(id);
  const cover = coverFrom(a);
  return {
    id,
    slug,
    title: a.title || "(無題)",
    excerpt: a.excerpt || "",
    category: a.category || "",
    dateLabel: fmtDate(a.publishedAt || a.date || a.createdAt),
    cover,
    hasCover: !!cover,
    noCover: !cover,
    href: "プロダクト詳細.dc.html?slug=" + encodeURIComponent(slug),
  };
}
export function normalizeDetail(entry) {
  const card = normalizeCard(entry);
  const { a } = pick(entry);
  return { ...card, bodyHtml: mdToHtml(a.body) };
}

/* ---------- フェッチ ---------- */
export async function fetchList() {
  if (!apiBase()) throw new Error("no-base");
  const url =
    apiBase() + "/api/" + STRAPI.collection +
    "?populate=*&sort=publishedAt:desc&pagination[pageSize]=100";
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) throw new Error("http " + res.status);
  const json = await res.json();
  return (json.data || []).map(normalizeCard);
}
export async function fetchBySlug(slug) {
  if (!apiBase()) throw new Error("no-base");
  const url =
    apiBase() + "/api/" + STRAPI.collection +
    "?filters[slug][$eq]=" + encodeURIComponent(slug) + "&populate=*";
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) throw new Error("http " + res.status);
  const json = await res.json();
  const data = json.data || [];
  return data.length ? normalizeDetail(data[0]) : null;
}

/* ---------- Markdown / Blocks → HTML（本文レンダリング） ---------- */
function inline(s) {
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  return s;
}
function blocksToHtml(blocks) {
  return blocks
    .map((b) => {
      const txt = (b.children || [])
        .map((c) => {
          if (c.type === "link") {
            const t = (c.children || []).map((x) => esc(x.text || "")).join("");
            return '<a href="' + (c.url || "#") + '" target="_blank" rel="noopener">' + t + "</a>";
          }
          let t = esc(c.text || "");
          if (c.bold) t = "<strong>" + t + "</strong>";
          if (c.italic) t = "<em>" + t + "</em>";
          if (c.code) t = "<code>" + t + "</code>";
          return t;
        })
        .join("");
      if (b.type === "heading") return "<h" + (b.level || 2) + ">" + txt + "</h" + (b.level || 2) + ">";
      if (b.type === "quote") return "<blockquote>" + txt + "</blockquote>";
      if (b.type === "image" && b.image) return '<img src="' + mediaUrl(b.image.url) + '" alt="">';
      if (b.type === "list") {
        const tag = b.format === "ordered" ? "ol" : "ul";
        const items = (b.children || [])
          .map((li) => "<li>" + (li.children || []).map((c) => esc(c.text || "")).join("") + "</li>")
          .join("");
        return "<" + tag + ">" + items + "</" + tag + ">";
      }
      return "<p>" + txt + "</p>";
    })
    .join("");
}
export function mdToHtml(md) {
  if (Array.isArray(md)) return blocksToHtml(md);
  if (typeof md !== "string") return "";
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "", listType = null, listBuf = [];
  const flush = () => {
    if (listType) {
      html += "<" + listType + ">" + listBuf.map((x) => "<li>" + inline(x) + "</li>").join("") + "</" + listType + ">";
      listType = null;
      listBuf = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) { flush(); const l = m[1].length; html += "<h" + l + ">" + inline(m[2]) + "</h" + l + ">"; continue; }
    if (/^([-*])\s+/.test(line)) { if (listType && listType !== "ul") flush(); listType = "ul"; listBuf.push(line.replace(/^([-*])\s+/, "")); continue; }
    if (/^\d+\.\s+/.test(line)) { if (listType && listType !== "ol") flush(); listType = "ol"; listBuf.push(line.replace(/^\d+\.\s+/, "")); continue; }
    if (/^>\s?/.test(line)) { flush(); html += "<blockquote>" + inline(line.replace(/^>\s?/, "")) + "</blockquote>"; continue; }
    if (/^(-{3,}|\*{3,})$/.test(line)) { flush(); html += "<hr>"; continue; }
    flush();
    html += "<p>" + inline(line) + "</p>";
  }
  flush();
  return html;
}

/* ---------- サンプルデータ（Strapi 未接続時に表示） ---------- */
const SAMPLE_BODIES = {
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
export const SAMPLE_CARDS = [
  {
    id: 1, slug: "managed-private-cloud",
    title: "マネージドプライベートクラウドを正式リリース",
    excerpt: "保守から運用まで完全自社完結。豊富な計算資源を、安価に・高度にご提供します。",
    category: "プロダクト", dateLabel: "2026.06.10",
    cover: null, hasCover: false, noCover: true,
    href: "プロダクト詳細.dc.html?slug=managed-private-cloud",
  },
  {
    id: 2, slug: "clean-oss-stack",
    title: "CNCFベースのクリーンなOSS基盤という選択",
    excerpt: "特定ベンダーに縛られない、透明で検証可能なソフトウェア基盤の考え方。",
    category: "技術", dateLabel: "2026.05.28",
    cover: null, hasCover: false, noCover: true,
    href: "プロダクト詳細.dc.html?slug=clean-oss-stack",
  },
  {
    id: 3, slug: "engineer-program",
    title: "エンジニア育成プログラムを開始しました",
    excerpt: "代表が選ぶ現場の精鋭に、最新AIを掛け合わせる。少数精鋭の育成・派遣を強化。",
    category: "お知らせ", dateLabel: "2026.05.15",
    cover: null, hasCover: false, noCover: true,
    href: "プロダクト詳細.dc.html?slug=engineer-program",
  },
];
export function sampleDetail(slug) {
  const c = slug ? SAMPLE_CARDS.find((x) => x.slug === slug) : SAMPLE_CARDS[0];
  if (!c) return null;
  return { ...c, bodyHtml: mdToHtml(SAMPLE_BODIES[c.slug] || "") };
}
