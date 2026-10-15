/** /blog/ 以下の、このサイト内のパスだけを通す（外部への転送に使われないように） */
export function safeBlogPath(raw: string | null): string | null {
  if (!raw) return null;
  if (!raw.startsWith("/blog/") || raw.startsWith("//") || raw.includes("\\")) return null;
  try {
    const u = new URL(raw, "http://localhost");
    if (u.origin !== "http://localhost" || !u.pathname.startsWith("/blog/")) return null;
    return u.pathname;
  } catch {
    return null;
  }
}
