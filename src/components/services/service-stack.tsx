import { getServiceLines, placeLines } from "@/lib/services";
import { ServicesIntro } from "./services-intro";

/* 事業内容の冒頭。Payload の「サービス」（公開分）から図の列を組み立てる。描画は services-intro.tsx。 */
export async function ServiceStack({ lead }: { lead: string }) {
  const lines = await getServiceLines();
  const { placed, columns } = placeLines(lines);
  return <ServicesIntro placed={placed} columns={columns} lead={lead} />;
}
