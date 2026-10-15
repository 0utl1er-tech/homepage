/* =============================================================================
 * 下書きプレビューの入口。Payload の「プレビュー」ボタンから開かれる。
 *   GET /api/preview?secret=<PREVIEW_SECRET>&path=/blog/<slug>
 * 合言葉が合えば Next.js の draft mode を有効にして、その記事へ移る。
 * 記事ページは draft mode のとき Payload から下書き（PAYLOAD_API_KEY で認証）を読む。
 *
 * 環境変数: PREVIEW_SECRET（Secret homepage-preview）
 * ===========================================================================*/
import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { safeBlogPath } from "@/lib/preview";

function secretMatches(given: string | null): boolean {
  const expected = process.env.PREVIEW_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!secretMatches(searchParams.get("secret"))) {
    return new Response("プレビュー用の合言葉が違います。", { status: 401 });
  }
  const path = safeBlogPath(searchParams.get("path"));
  if (!path) {
    return new Response("path には /blog/ で始まるパスを指定してください。", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(path);
}
