/* 下書きプレビューを終える。GET /api/preview/exit?path=/blog/<slug> */
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { safeBlogPath } from "@/lib/preview";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  (await draftMode()).disable();
  redirect(safeBlogPath(searchParams.get("path")) ?? "/blog");
}
