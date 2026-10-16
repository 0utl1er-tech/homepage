/* 配布資料の一覧（サーバーコンポーネント）。記事の末尾・サービスの「資料」段で使う。
 * file が id のまま（展開されていない・非公開）の項目は飛ばし、1件も残らなければ何も出さない。 */
import { FileLink } from "@/components/file-link";
import { isObj, type Download } from "@/lib/payload";

export function Downloads({
  items,
  heading = "資料",
}: {
  items: Download[] | null | undefined;
  /** 見出し。null なら見出し無し（親が見出しを出すとき） */
  heading?: string | null;
}) {
  const list = (items ?? []).filter((d) => isObj(d.file));
  if (list.length === 0) return null;
  return (
    <section>
      {heading && <h2 className="mb-4 text-lg font-semibold tracking-tight">{heading}</h2>}
      <ul className="space-y-2">
        {list.map((d, i) => (
          <li key={d.id ?? i}>
            {isObj(d.file) && <FileLink media={d.file} label={d.label} note={d.note} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
