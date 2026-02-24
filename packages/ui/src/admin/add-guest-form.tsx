"use client";

import { useState } from "react";

type Props = {
  addGuest: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
};

export function AddGuestForm({ addGuest }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="border border-[#d4a0b0] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#8a7f7f] transition-colors hover:border-[#2c2424] hover:text-[#2c2424]"
      >
        + Add Guest
      </button>
    );
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await addGuest(formData);
    if (result.success) {
      setOpen(false);
    } else {
      setError(result.error ?? "Failed to add guest");
    }
  }

  return (
    <form action={handleSubmit} className="border border-[#f0e0e4] bg-white/60 p-5 space-y-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f7f]">Add Guest</p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "householdName", label: "Household Name", placeholder: "The Smith Family", required: true },
          { id: "maxPlusOnes", label: "Max Plus Ones", type: "number", defaultValue: "0" },
          { id: "firstName", label: "First Name", required: true },
          { id: "lastName", label: "Last Name", required: true },
          { id: "email", label: "Email (optional)", type: "email" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f]">
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              min={field.type === "number" ? "0" : undefined}
              className="mt-1.5 w-full border border-[#f0e0e4] bg-[#fff8f8] px-3 py-2 text-sm text-[#2c2424] outline-none transition-colors focus:border-[#d4a0b0] placeholder:text-[#8a7f7f]/40"
            />
          </div>
        ))}

        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#8a7f7f] cursor-pointer">
            <input type="checkbox" name="isPrimary" value="true" className="accent-[#d4a0b0]" />
            Primary contact
          </label>
        </div>
      </div>

      {error && (
        <p className="text-xs uppercase tracking-[0.15em] text-red-400">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#2c2424] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#fff8f8] transition-colors hover:bg-[#d4a0b0]"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
