"use client";
import React, { useState } from "react";

// Coming Soon landing page — React + TypeScript + Tailwind only (no external UI libs)
// Drop this into /app/page.tsx (Next.js App Router) or /pages/index.tsx (Pages Router)
// Tailwind required. Works standalone with basic email validation and a fake submit.

export default function ComingSoon(): JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(42);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setProgress((p) => Math.min(100, p + 8));
      setEmail("");
    }, 900);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-slate-800/60 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <header className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 shadow-inner">
              {/* Inline rocket icon (no external icons) */}
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.5 9.5l-4 4" />
                <path d="M6 22s1-4 3-6 6-3 6-3 1-4 3-6c.7-.7 2-1 3-1-0 1-0 2-1 3-2 2-6 3-6 3s-1 4-3 6-6 3-6 3z" />
                <path d="M12 7a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Work in Progress</h1>
            <p className="mt-2 text-slate-300">We’re building something awesome. Updates will come soon.</p>
          </header>

          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-slate-100 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Email capture */}
          <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for updates"
              className="h-11 flex-1 rounded-xl border border-slate-800/70 bg-slate-900/70 px-4 text-sm outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-11 rounded-xl border border-slate-700 bg-slate-100 px-5 text-sm font-medium text-slate-900 transition disabled:cursor-not-allowed hover:bg-white/90"
            >
              {status === "loading" ? "Subscribing…" : "Notify Me"}
            </button>
          </form>

          {/* Status messages */}
          <div className="mt-3 min-h-[24px] text-center text-sm">
            {status === "success" && (
              <p className="text-emerald-400">Thanks! You’ll hear from us soon.</p>
            )}
            {status === "error" && (
              <p className="text-rose-400">Please enter a valid email address.</p>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-col items-center gap-2 text-xs text-slate-400 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="underline-offset-2 hover:underline">Privacy</a>
              <a href="#" className="underline-offset-2 hover:underline">Terms</a>
              <a href="mailto:hello@example.com" className="underline-offset-2 hover:underline">Contact</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
