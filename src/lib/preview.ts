/** 下書きプレビューで開いてよいパスの先頭。記事と事業の詳細ページ */
const PREVIEW_PREFIXES = ["/blog/", "/services/"];

/** このサイト内の、プレビューできるパスだけを通す（外部への転送に使われないように） */
export function safePreviewPath(raw: string | null): string | null {
  if (!raw) return null;
  if (raw.startsWith("//") || raw.includes("\\")) return null;
  if (!PREVIEW_PREFIXES.some((p) => raw.startsWith(p))) return null;
  try {
    const u = new URL(raw, "http://localhost");
    if (u.origin !== "http://localhost") return null;
    if (!PREVIEW_PREFIXES.some((p) => u.pathname.startsWith(p))) return null;
    return u.pathname;
  } catch {
    return null;
  }
}

/** 旧名。記事だけだった頃の呼び名 */
export const safeBlogPath = safePreviewPath;
