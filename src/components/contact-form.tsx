"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DSBadge } from "@/components/ds/ds-badge";

const inputCls =
  "w-full rounded-md border border-line bg-surface px-[15px] py-[13px] text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">
      {children}
    </label>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="sm:col-span-2">
        <Label>会社名</Label>
        <input className={inputCls} type="text" placeholder="0UTL1ER株式会社" />
      </div>
      <div>
        <Label>
          お名前 <span className="text-cost">*</span>
        </Label>
        <input className={inputCls} type="text" placeholder="山田 太郎" required />
      </div>
      <div>
        <Label>
          メールアドレス <span className="text-cost">*</span>
        </Label>
        <input
          className={inputCls}
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
          rows={6}
          placeholder="ご相談・ご質問の内容をご記入ください。"
          required
        />
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" size="lg">
          送信する →
        </Button>
        <span className="text-xs text-ink-3">
          送信をもってプライバシーポリシーに同意したものとします。
        </span>
      </div>
    </form>
  );
}
