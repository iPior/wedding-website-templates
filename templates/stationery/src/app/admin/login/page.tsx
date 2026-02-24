"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient as createSupabaseBrowserClient } from "@wedding/auth/client";
import { weddingConfig } from "../../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16"
      style={{ backgroundColor: "#fff8f8", fontFamily: "var(--font-lato), sans-serif" }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Watercolor blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "60vw", height: "60vh",
            top: "-10%", right: "-10%",
            background: "radial-gradient(ellipse at center, rgba(255,218,233,0.4), rgba(247,224,232,0.2), transparent)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "50vw", height: "50vh",
            bottom: "-10%", left: "-10%",
            background: "radial-gradient(ellipse at center, rgba(210,217,139,0.2), rgba(255,255,227,0.3), transparent)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "30vw", height: "30vh",
            top: "40%", left: "10%",
            background: "radial-gradient(ellipse at center, rgba(247,224,232,0.15), rgba(255,255,227,0.2))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm text-center">

        {/* Monogram */}
        <div
          style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
        >
          <span
            className="text-3xl text-[#8a7f7f]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {person1.firstName[0]}&nbsp;&amp;&nbsp;{person2.firstName[0]}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-5 overflow-hidden">
          <div
            className="mx-auto h-px bg-[#d4a0b0]"
            style={{
              animation: "grow 0.7s ease forwards",
              animationDelay: "0.3s",
              width: 0,
              maxWidth: "3rem",
            }}
          />
        </div>

        {/* Label */}
        <p
          className="mt-5 text-xs font-light uppercase tracking-[0.4em] text-[#8a7f7f]"
          style={{ animation: "fadeInUp 0.8s ease forwards", animationDelay: "0.4s", opacity: 0 }}
        >
          Admin
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4 text-left"
          style={{ animation: "fadeInUp 0.8s ease forwards", animationDelay: "0.6s", opacity: 0 }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] uppercase tracking-[0.3em] text-[#8a7f7f]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="mt-2 w-full border-b border-[#d4a0b0] bg-transparent pb-3 text-sm tracking-wide text-[#2c2424] outline-none transition-colors duration-300 placeholder:text-[#8a7f7f]/40 focus:border-[#2c2424]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[10px] uppercase tracking-[0.3em] text-[#8a7f7f]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full border-b border-[#d4a0b0] bg-transparent pb-3 text-sm tracking-wide text-[#2c2424] outline-none transition-colors duration-300 placeholder:text-[#8a7f7f]/40 focus:border-[#2c2424]"
            />
          </div>

          {error && (
            <p className="text-xs uppercase tracking-[0.2em] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2c2424] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[#fff8f8] transition-colors duration-300 hover:bg-[#d4a0b0] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
