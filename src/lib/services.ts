/* =============================================================================
 * 事業内容（/services）の事業
 *
 * 図の上の段は「提供の形」（IaaS など）とその事業を説明する一文、
 * 下の段は「それを支える手段」（マネージドクラウド / ソフトウェア / コンサルティング / スペシャリスト）。
 *
 * 正本は Payload の「サービス」。公開されている分（図に出す=ON）をここで取り、
 * 届かない・まだ公開していないときは下の FALLBACK を使う。
 * 詳細ページ（/services/{slug}）の本文も同じ「サービス」から出す。
 * ===========================================================================*/
import { cache } from "react";
import { getServices, mediaUrl, type Service } from "@/lib/payload";

/** 図の中での形。cloud / software / top は左から IaaS・SaaS・BPaaS の位置に固定。pillar / column は右に並ぶ */
export type ServiceShape = "cloud" | "software" | "top" | "pillar" | "column";

export type ServiceLine = {
  slug: string;
  /** 提供の形（図の上の段の見出し。例 IaaS） */
  kind: string;
  /** 事業を説明する一文（図の上の段） */
  description: string;
  /** 手段の名前（図のタイル） */
  means: string;
  /** 詳細ページの冒頭（Payload の summary が無いとき） */
  summary: string;
  image: string;
  imageAlt: string;
  shape: ServiceShape;
};

export const FALLBACK_LINES: ServiceLine[] = [
  {
    slug: "iaas",
    kind: "IaaS",
    description: "お客様がすでにご利用されているデジタル資産の運用を支援する事業です。",
    means: "マネージドクラウド",
    summary: "いま動いているホームページや業務システムを、中身はそのまま引き取り、自社のクラウドで運用します。お客様の手間は増やさずに、維持にかかる費用を下げます。",
    image: "/images/services/cloud.jpg",
    imageAlt: "サーバーラック",
    shape: "cloud",
  },
  {
    slug: "saas",
    kind: "SaaS",
    description: "自社で開発したソフトウェアを、月額でご利用いただく事業です。",
    means: "ソフトウェア",
    summary: "顧客管理や集客の分析など、本来なら開発が必要な仕組みを、作らずに月額ですぐ使える形でご提供します。",
    image: "/images/services/software.jpg",
    imageAlt: "カフェのカウンターに置いたタブレットのレジ",
    shape: "software",
  },
  {
    slug: "bpaas",
    kind: "BPaaS",
    description: "ソフトウェアと担当者をひと組にして、集客の業務をお引き受けする事業です。",
    means: "コンサルティング",
    summary: "ソフトウェアと担当者がひと組になり、集客の業務を丸ごと引き受けます。",
    image: "/images/services/consulting.jpg",
    imageAlt: "二人で同じノートパソコンを見ながら進める様子",
    shape: "top",
  },
  {
    slug: "taas",
    kind: "TaaS",
    description: "0UTL1ER の技術者が、お客様のチームの一員として働く事業です。",
    means: "スペシャリスト",
    summary: "事業をお預かりするのではなく、0UTL1ER の技術者がお客様のチームの一員として働きます。",
    image: "/images/services/specialist.jpg",
    imageAlt: "暗い部屋で2台のモニターに向かう技術者",
    shape: "pillar",
  },
];

/** Payload の1件を図の1列に直す。足りない項目は同じ slug の FALLBACK で埋める */
function fromService(s: Service): ServiceLine | null {
  if (!s.slug) return null;
  const fb = FALLBACK_LINES.find((f) => f.slug === s.slug);
  const img = mediaUrl(s.image);
  const alt = typeof s.image === "object" && s.image ? s.image.alt : null;
  const line: ServiceLine = {
    slug: s.slug,
    kind: s.kind || fb?.kind || "",
    description: s.description || fb?.description || "",
    means: s.name || fb?.means || "",
    summary: s.summary || fb?.summary || "",
    image: img || fb?.image || "",
    imageAlt: alt || fb?.imageAlt || s.name,
    shape: s.shape || fb?.shape || "column",
  };
  if (!line.means || !line.image) return null;
  return line;
}

/** 図に出す事業の一覧。Payload で公開されているものを優先し、無い slug は FALLBACK で補う */
export const getServiceLines = cache(async function getServiceLines(): Promise<ServiceLine[]> {
  const { ok, docs } = await getServices();
  const fromPayload = ok
    ? docs
        .filter((s) => s.showInDiagram !== false)
        .map(fromService)
        .filter((l): l is ServiceLine => !!l)
    : [];
  const slugs = new Set(fromPayload.map((l) => l.slug));
  const merged = [...fromPayload, ...FALLBACK_LINES.filter((f) => !slugs.has(f.slug))];
  // 同じ形は1つまで。2つ目以降は普通の列として扱う
  const seen = new Set<ServiceShape>();
  return merged.map((l) => {
    if (l.shape === "pillar" || l.shape === "column") return l;
    if (seen.has(l.shape)) return { ...l, shape: "column" as const };
    seen.add(l.shape);
    return l;
  });
});

export async function getServiceLine(slug: string): Promise<ServiceLine | undefined> {
  return (await getServiceLines()).find((s) => s.slug === slug);
}

/* ---------- 図のレイアウト ---------- */

export type PlacedLine = ServiceLine & {
  /** CSS grid の位置（上の段は row 1、タイルは row 2〜） */
  column: string;
  row: string;
  /** 上の段（提供の形と一文）の列 */
  valueColumn: number;
  /** cloud が何列ぶん横に広がるか（自分の列を含む） */
  span: number;
};

/**
 * 形から位置を決める。
 *   cloud    … 列1。縦に伸び、下の段で software/top の下まで広がる
 *   software … 列2。自分の列で一番上まで、隣の列（top）では人の下
 *   top      … 列3 の一番上
 *   pillar / column … その右に順番どおり。土台に乗らない縦長の列
 */
export function placeLines(lines: ServiceLine[]): { placed: PlacedLine[]; columns: number } {
  const cloud = lines.find((l) => l.shape === "cloud");
  const software = lines.find((l) => l.shape === "software");
  const top = lines.find((l) => l.shape === "top");
  const rest = lines.filter((l) => l !== cloud && l !== software && l !== top);

  const placed: PlacedLine[] = [];
  let col = 1;
  const fixedCols = [cloud, software, top].filter(Boolean).length;
  if (cloud) {
    placed.push({ ...cloud, valueColumn: col, column: `${col} / ${col + fixedCols}`, row: "2 / 5", span: fixedCols });
    col++;
  }
  if (software) {
    const span = top ? 2 : 1;
    placed.push({ ...software, valueColumn: col, column: `${col} / ${col + span}`, row: cloud ? "2 / 4" : "2 / 5", span });
    col++;
  }
  if (top) {
    placed.push({ ...top, valueColumn: col, column: `${col}`, row: "2", span: 1 });
    col++;
  }
  for (const l of rest) {
    placed.push({ ...l, valueColumn: col, column: `${col}`, row: "2 / 5", span: 1 });
    col++;
  }
  return { placed, columns: col - 1 };
}
