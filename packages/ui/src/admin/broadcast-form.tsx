"use client";

import { useState, useRef } from "react";

type BroadcastResult = {
  success: boolean;
  error?: string;
  sentCount?: number;
};

type Props = {
  subscriberCount: number;
  sendBroadcastEmail: (formData: FormData) => Promise<BroadcastResult>;
};

export function BroadcastForm({ subscriberCount, sendBroadcastEmail }: Props) {
  const [result, setResult] = useState<BroadcastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    if (!confirm(`Send this email to ${subscriberCount} subscriber(s)?`)) return;
    setLoading(true);
    setResult(null);
    const res = await sendBroadcastEmail(formData);
    setResult(res);
    setLoading(false);
    if (res.success) formRef.current?.reset();
  }

  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f7f]">Compose Broadcast</p>

      <form ref={formRef} action={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="Wedding Update"
            required
            className="mt-2 w-full border border-[#f0e0e4] bg-white/60 px-3 py-2 text-sm text-[#2c2424] outline-none transition-colors focus:border-[#d4a0b0] placeholder:text-[#8a7f7f]/40"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="Write your message here..."
            rows={8}
            required
            className="mt-2 w-full border border-[#f0e0e4] bg-white/60 px-3 py-2 text-sm text-[#2c2424] outline-none transition-colors focus:border-[#d4a0b0] placeholder:text-[#8a7f7f]/40 resize-none"
          />
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#8a7f7f]/60">
            Use blank lines to separate paragraphs.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || subscriberCount === 0}
          className="bg-[#2c2424] px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-[#fff8f8] transition-colors hover:bg-[#d4a0b0] disabled:opacity-40"
        >
          {loading ? "Sending..." : `Send to ${subscriberCount} Subscriber(s)`}
        </button>
      </form>

      {result && (
        <div
          className={`border p-3 text-xs uppercase tracking-[0.15em] ${
            result.success
              ? "border-[#d4a0b0]/40 bg-[#d4a0b0]/10 text-[#2c2424]"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.success ? (
            <p>Sent to {result.sentCount} subscriber(s).</p>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
