"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid password.");
        return;
      }

      router.push("/admin/inquiries");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-black text-black">
              V
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Vertical Constructions
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight">
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Sign in to manage project inquiries.
            </p>
          </div>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-border bg-background p-7 shadow-sm"
          >
            <label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
              disabled={loading}
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-yellow-400"
            />

            {/* ERROR */}
            {error && (
              <p
                role="alert"
                className="mt-3 text-sm font-medium text-red-500"
              >
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-yellow-400 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* BACK */}
            <a
              href="/"
              className="mt-5 block text-center text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              ← Back to website
            </a>
          </form>

        </div>
      </div>
    </main>
  );
}