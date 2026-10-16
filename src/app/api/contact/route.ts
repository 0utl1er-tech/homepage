/* =============================================================================
 * お問い合わせの受け口。ブラウザ → ここ → Payload（form-submissions）に保存。
 * Payload 側で Discord に通知する。
 *
 * - Payload への送信はクラスタ内（PAYLOAD_INTERNAL_URL）から、共有トークン付きで行う。
 *   Payload はトークンの無い匿名送信を受け付けない。
 * - 迷惑送信対策: 隠し項目（website）に値があれば黙って成功を返す / IP ごとの回数制限。
 *
 * 環境変数:
 *   PAYLOAD_INTERNAL_URL  例 http://payload.payload.svc
 *   FORM_SUBMIT_TOKEN     Payload と共有するトークン（Secret homepage-forms）
 *   CONTACT_FORM_ID       Payload の「フォーム」の ID（お問い合わせ）
 * ===========================================================================*/

type Body = {
  company?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  page?: unknown;
  purpose?: unknown; // ご用件（inquiry / estimate / recruit / sales）
  elapsedMs?: unknown; // フォーム表示から送信までの経過時間（ミリ秒）
  website?: unknown; // 隠し項目（人間は入力しない）
};

const LIMITS = { company: 200, name: 100, email: 254, phone: 40, message: 5000, page: 300 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PURPOSES = new Set(["inquiry", "estimate", "recruit", "sales"]);
const MAX_ELAPSED_MS = 86_400_000; // 1日

// 経過時間は 0 以上の整数に丸め、上限で切る。無い・壊れている場合は 0
function elapsed(v: unknown) {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.round(n), MAX_ELAPSED_MS);
}

// IP ごとの送信回数（10分で5回まで）。Pod ごとのメモリなので目安程度。
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (str(body.website, 200)) return Response.json({ ok: true }); // ボット

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  const data = {
    company: str(body.company, LIMITS.company),
    name: str(body.name, LIMITS.name),
    email: str(body.email, LIMITS.email),
    phone: str(body.phone, LIMITS.phone),
    message: str(body.message, LIMITS.message),
    page: str(body.page, LIMITS.page),
  };
  if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
    return Response.json({ ok: false, error: "required" }, { status: 400 });
  }
  const purpose = str(body.purpose, 20);
  if (!PURPOSES.has(purpose)) {
    return Response.json({ ok: false, error: "purpose" }, { status: 400 });
  }
  const elapsedMs = elapsed(body.elapsedMs);

  const base = process.env.PAYLOAD_INTERNAL_URL;
  const token = process.env.FORM_SUBMIT_TOKEN;
  const formId = process.env.CONTACT_FORM_ID;
  if (!base || !token || !formId) {
    console.error("contact: PAYLOAD_INTERNAL_URL / FORM_SUBMIT_TOKEN / CONTACT_FORM_ID が未設定");
    return Response.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const res = await fetch(`${base.replace(/\/$/, "")}/api/form-submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-form-token": token },
    body: JSON.stringify({
      form: Number(formId),
      submissionData: [
        ...Object.entries(data)
          .filter(([, value]) => value)
          .map(([field, value]) => ({ field, value })),
        { field: "purpose", value: purpose },
        { field: "elapsedMs", value: String(elapsedMs) },
      ],
    }),
  }).catch((err: unknown) => {
    console.error("contact: Payload に届かない", err);
    return null;
  });

  if (!res || !res.ok) {
    if (res) console.error("contact: Payload が拒否", res.status, await res.text());
    return Response.json({ ok: false, error: "unavailable" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
