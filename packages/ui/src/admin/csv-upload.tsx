"use client";

import { useState, useRef } from "react";

type ImportResult = {
  success: boolean;
  householdsCreated?: number;
  guestsCreated?: number;
  errors: string[];
};

type Props = {
  importGuests: (formData: FormData) => Promise<ImportResult>;
};

export function CsvUpload({ importGuests }: Props) {
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setResult(null);
    const res = await importGuests(formData);
    setResult(res);
    setLoading(false);
    if (res.success) formRef.current?.reset();
  }

  return (
    <div className="space-y-3">
      <form ref={formRef} action={handleSubmit} className="flex items-center gap-3">
        <input
          type="file"
          name="file"
          accept=".csv"
          required
          className="flex-1 text-xs text-[#8a7f7f] file:mr-3 file:border-0 file:bg-[#f0e0e4] file:px-3 file:py-1.5 file:text-[11px] file:uppercase file:tracking-[0.2em] file:text-[#2c2424] file:cursor-pointer"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#2c2424] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#fff8f8] transition-colors hover:bg-[#d4a0b0] disabled:opacity-40 whitespace-nowrap"
        >
          {loading ? "Importing..." : "Import CSV"}
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
            <p>
              Imported {result.householdsCreated} household(s) with {result.guestsCreated} guest(s).
            </p>
          ) : (
            <ul className="list-inside list-disc space-y-1">
              {result.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
