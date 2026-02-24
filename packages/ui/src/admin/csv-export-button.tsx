"use client";

import { useState } from "react";

type Props = {
  exportGuestsCsv: () => Promise<string>;
};

export function CsvExportButton({ exportGuestsCsv }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    const csv = await exportGuestsCsv();
    setLoading(false);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="border border-[#d4a0b0] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#8a7f7f] transition-colors hover:border-[#2c2424] hover:text-[#2c2424] disabled:opacity-40"
    >
      {loading ? "Exporting..." : "Export CSV"}
    </button>
  );
}
