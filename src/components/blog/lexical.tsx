/* =============================================================================
 * Payload（Lexical）の本文 JSON をそのまま React に描く（サーバーコンポーネント）。
 * @payloadcms/* は入れない。扱うノード:
 *   paragraph / heading / list / listitem / quote / link / autolink / text /
 *   linebreak / tab / upload / horizontalrule / code
 * 知らないノードは子だけ描く（子が無ければ捨てる）。
 * ===========================================================================*/
import * as React from "react";
import type { LexicalNode, LexicalRoot, Media, Post } from "@/lib/payload";
import { mediaUrl } from "@/lib/payload";

/* ---------- 目次 ---------- */

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function nodeText(node: LexicalNode): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "linebreak") return " ";
  return (node.children ?? []).map(nodeText).join("");
}

function headingLevel(node: LexicalNode): number {
  const n = Number(String(node.tag ?? "h2").replace(/^h/i, ""));
  // 本文中の h1 は記事タイトルと重なるので h2 として扱う
  return Number.isFinite(n) ? Math.min(Math.max(n, 2), 6) : 2;
}

/**
 * 見出しに id を振り、h2/h3 を目次として返す。
 * 返した ids を <LexicalContent> に渡すと、同じ id が本文の見出しに付く。
 */
export function buildToc(content: LexicalRoot | null | undefined): {
  toc: TocItem[];
  ids: WeakMap<LexicalNode, string>;
} {
  const ids = new WeakMap<LexicalNode, string>();
  const toc: TocItem[] = [];
  let n = 0;
  const walk = (node: LexicalNode) => {
    if (node.type === "heading") {
      n += 1;
      const id = `sec-${n}`;
      ids.set(node, id);
      const level = headingLevel(node);
      const text = nodeText(node).trim();
      if ((level === 2 || level === 3) && text) toc.push({ id, text, level });
      return;
    }
    node.children?.forEach(walk);
  };
  if (content?.root) walk(content.root);
  return { toc, ids };
}

/* ---------- テキストの書式（Lexical のビットフラグ） ---------- */

const F = {
  bold: 1,
  italic: 2,
  strike: 4,
  underline: 8,
  code: 16,
  sub: 32,
  sup: 64,
  highlight: 128,
} as const;

function renderText(node: LexicalNode, key: React.Key): React.ReactNode {
  const fmt = typeof node.format === "number" ? node.format : 0;
  let el: React.ReactNode = node.text ?? "";
  if (fmt & F.code) el = <code>{el}</code>;
  if (fmt & F.highlight) el = <mark>{el}</mark>;
  if (fmt & F.sub) el = <sub>{el}</sub>;
  if (fmt & F.sup) el = <sup>{el}</sup>;
  if (fmt & F.strike) el = <s>{el}</s>;
  if (fmt & F.underline) el = <u>{el}</u>;
  if (fmt & F.italic) el = <em>{el}</em>;
  if (fmt & F.bold) el = <strong>{el}</strong>;
  return <React.Fragment key={key}>{el}</React.Fragment>;
}

/* ---------- リンク ---------- */

function safeHref(url: string | undefined): string | null {
  if (!url) return null;
  const u = url.trim();
  if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  if (u.startsWith("#")) return u;
  return null;
}

function internalHref(doc: { relationTo?: string; value?: unknown } | null | undefined) {
  const v = doc?.value as { slug?: string } | undefined;
  if (!v || typeof v !== "object" || !v.slug) return null;
  switch (doc?.relationTo) {
    case "posts":
      return `/blog/${v.slug}`;
    case "categories":
      return `/blog/category/${v.slug}`;
    case "members":
      return `/members/${v.slug}`;
    default:
      return null;
  }
}

/* ---------- ブロック ---------- */

type Ctx = { ids: WeakMap<LexicalNode, string> };

function alignStyle(node: LexicalNode): React.CSSProperties | undefined {
  const f = node.format;
  if (f === "center" || f === "right" || f === "justify") return { textAlign: f };
  return undefined;
}

function renderChildren(node: LexicalNode, ctx: Ctx): React.ReactNode[] {
  return (node.children ?? []).map((c, i) => renderNode(c, i, ctx));
}

function renderNode(node: LexicalNode, key: React.Key, ctx: Ctx): React.ReactNode {
  switch (node.type) {
    case "root":
      return <React.Fragment key={key}>{renderChildren(node, ctx)}</React.Fragment>;

    case "text":
      return renderText(node, key);

    case "linebreak":
      return <br key={key} />;

    case "tab":
      return <React.Fragment key={key}>{"　"}</React.Fragment>;

    case "paragraph": {
      if (!node.children?.length) return null; // 空行は詰める
      return (
        <p key={key} style={alignStyle(node)}>
          {renderChildren(node, ctx)}
        </p>
      );
    }

    case "heading": {
      const level = headingLevel(node);
      const Tag = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={key} id={ctx.ids.get(node)} style={alignStyle(node)}>
          {renderChildren(node, ctx)}
        </Tag>
      );
    }

    case "quote":
      return <blockquote key={key}>{renderChildren(node, ctx)}</blockquote>;

    case "list": {
      if (node.listType === "number" || (!node.listType && node.tag === "ol")) {
        return (
          <ol key={key} start={node.start && node.start !== 1 ? node.start : undefined}>
            {renderChildren(node, ctx)}
          </ol>
        );
      }
      return (
        <ul key={key} className={node.listType === "check" ? "o-checklist" : undefined}>
          {renderChildren(node, ctx)}
        </ul>
      );
    }

    case "listitem": {
      // 入れ子のリストだけを持つ listitem は「中黒なし」で描く（Lexical の入れ子の表現）
      const onlyNested =
        node.children?.length === 1 && node.children[0].type === "list";
      return (
        <li
          key={key}
          className={onlyNested ? "list-none" : undefined}
          data-checked={node.checked === undefined ? undefined : String(node.checked)}
        >
          {renderChildren(node, ctx)}
        </li>
      );
    }

    case "link":
    case "autolink": {
      const f = node.fields ?? {};
      const href =
        f.linkType === "internal" ? internalHref(f.doc) : safeHref(f.url as string | undefined);
      const kids = renderChildren(node, ctx);
      if (!href) return <React.Fragment key={key}>{kids}</React.Fragment>;
      const external = /^https?:/i.test(href);
      return (
        <a
          key={key}
          href={href}
          {...(f.newTab ? { target: "_blank" } : {})}
          {...(external ? { rel: f.newTab ? "noopener noreferrer" : "noopener" } : {})}
        >
          {kids}
        </a>
      );
    }

    case "upload": {
      const media = node.value as Media | number | undefined;
      const src = mediaUrl(media as Media);
      if (!src || typeof media !== "object") return null;
      const caption = typeof node.fields?.caption === "string" ? node.fields.caption : null;
      return (
        <figure key={key}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={media.alt ?? ""}
            width={media.width ?? undefined}
            height={media.height ?? undefined}
            loading="lazy"
            decoding="async"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }

    case "horizontalrule":
      return <hr key={key} />;

    case "code":
      return (
        <pre key={key}>
          <code>{nodeText(node)}</code>
        </pre>
      );

    default:
      if (node.children?.length) {
        return <React.Fragment key={key}>{renderChildren(node, ctx)}</React.Fragment>;
      }
      return null;
  }
}

export function LexicalContent({
  content,
  ids,
  className = "o-prose",
}: {
  content: LexicalRoot | null | undefined;
  ids?: WeakMap<LexicalNode, string>;
  className?: string;
}) {
  if (!content?.root) return null;
  const ctx: Ctx = { ids: ids ?? buildToc(content).ids };
  return <div className={className}>{renderChildren(content.root, ctx)}</div>;
}

/** 記事本文の文字数（目安の読了時間用） */
export function contentLength(post: Pick<Post, "content">): number {
  return post.content?.root ? nodeText(post.content.root).replace(/\s+/g, "").length : 0;
}
