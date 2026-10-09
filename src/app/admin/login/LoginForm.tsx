"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="mt-8 flex flex-col gap-3">
      <label className="flex flex-col gap-2 text-small text-ink-soft">
        Team password
        <input name="password" type="password" required autoFocus autoComplete="current-password" className="min-h-12 rounded-(--radius-control) bg-plate px-4 text-label text-ink outline-pine" />
      </label>
      {state?.error ? (
        <p role="alert" className="text-small text-pine">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="mt-2 min-h-12 cursor-pointer rounded-(--radius-control) bg-ink px-6 text-label font-bold text-plate transition-colors hover:bg-pine disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
