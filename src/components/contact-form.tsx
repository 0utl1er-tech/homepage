"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DSBadge } from "@/components/ds/ds-badge";
import { trackEvent } from "@/lib/track";

const inputCls =
  "w-full rounded-md border border-input bg-surface px-[15px] py-[13px] text-sm text-ink outline-none transition-[color,border-color,box-shadow] placeholder:text-ink-3 focus:border-brand focus-visible:ring-3 focus-visible:ring-[var(--focus-ring)]";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">
      {children}
    </label>
  );
}

type Status = "idle" | "sending" | "error" | "too_many";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-profit bg-surface p-12">
        <DSBadge tone="profit" dot>
          送信完了
        </DSBadge>
        <h2 className="text-2xl font-extrabold tracking-tight">
          お問い合わせを受け付けました。
        </h2>
        <p className="text-sm leading-loose text-ink-2">
          ご入力いただいた内容を確認のうえ、担当より2営業日以内にご連絡いたします。
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          フォームに戻る
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        setStatus("sending");
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...Object.fromEntries(fd.entries()),
              page: document.referrer ? new URL(document.referrer).pathname : "",
            }),
          });
          if (res.status === 429) return setStatus("too_many");
          if (!res.ok) return setStatus("error");
          // GA4 のキーイベント（問い合わせ）。届いたときだけ送る
          trackEvent("generate_lead", { form_id: "contact" });
          form.reset();
          setStatus("idle");
          setSubmitted(true);
        } catch {
          setStatus("error");
        }
      }}
    >
      <div className="sm:col-span-2">
        <Label>会社名</Label>
        <input className={inputCls} name="company" type="text" placeholder="0UTL1ER株式会社" />
      </div>
      <div>
        <Label>
          お名前 <span className="text-cost">*</span>
        </Label>
        <input className={inputCls} name="name" type="text" placeholder="山田 太郎" required />
      </div>
      <div>
        <Label>
          メールアドレス <span className="text-cost">*</span>
        </Label>
        <input
          className={inputCls}
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <Label>
          ご相談内容 <span className="text-cost">*</span>
        </Label>
        <textarea
          className={inputCls + " resize-y"}
          name="message"
          rows={6}
          placeholder="ご相談・ご質問の内容をご記入ください。"
          required
        />
      </div>
      {/* ボット除け。人には見えない */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          ウェブサイト
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" || status === "too_many" ? (
        <p className="text-sm text-cost sm:col-span-2" role="alert">
          {status === "too_many"
            ? "短い時間に何度も送信されています。少し時間をおいてお試しください。"
            : "送信できませんでした。時間をおいてもう一度お試しいただくか、メール（info@0utl1er.tech）でご連絡ください。"}
        </p>
      ) : null}
      <div className="mt-1 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "送信中…" : "送信する →"}
        </Button>
        <span className="text-xs text-ink-3">
          送信をもってプライバシーポリシーに同意したものとします。
        </span>
      </div>
    </form>
  );
}
