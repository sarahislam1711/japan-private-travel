"use client";

import { useState, type FormEvent, type ReactNode } from "react";

/** One string in the page's language: the rendered node and its plain text. */
export type T = { node: ReactNode; text: string };

/**
 * The agent access form: five fields and the advisor's network as chips.
 * Posts to /api/advisor-requests; shows the confirmation in place.
 */
export function AdvisorForm({ t, fields, networks, locale }: { t: Record<string, T>; fields: Record<string, T>; networks: T[]; locale: "en" | "ar" }) {
  const [network, setNetwork] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("sending");
    try {
      const res = await fetch("/api/advisor-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, network, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent")
    return (
      <p role="status" className="rounded-[16px] bg-pine/10 px-6 py-5 font-serif text-[1.375rem] leading-snug text-pine">
        {t.confirmation.node}
      </p>
    );

  const input = "min-h-12 w-full rounded-(--radius-control) bg-ground px-4 font-gothic text-label text-ink outline-pine";
  const field = (name: string, type = "text", auto?: string, full = false) => (
    <label className={`flex flex-col gap-2 font-gothic text-small text-ink-soft ${full ? "tablet:col-span-2" : ""}`}>
      {fields[name].node}
      <input name={name} type={type} required autoComplete={auto} maxLength={160} dir={type === "email" ? "ltr" : undefined} className={input} />
    </label>
  );

  return (
    <form onSubmit={submit} className="grid gap-5 tablet:grid-cols-2">
      {field("name", "text", "name")}
      {field("agency", "text", "organization")}
      {field("country", "text", "country-name")}
      {field("registration")}
      {field("email", "email", "email", true)}
      <fieldset className="tablet:col-span-2">
        <legend className="mb-2 font-gothic text-small text-ink-soft">{t.networkLabel.node}</legend>
        <div role="radiogroup" className="flex flex-wrap gap-2">
          {networks.map((n) => (
            <button
              key={n.text}
              type="button"
              role="radio"
              aria-checked={network === n.text}
              onClick={() => setNetwork(n.text)}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 font-gothic text-small transition-colors ${
                network === n.text ? "bg-pine text-plate" : "bg-ground text-ink hover:bg-mist"
              }`}
            >
              {n.node}
            </button>
          ))}
        </div>
      </fieldset>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-col gap-3 tablet:col-span-2">
        <button
          type="submit"
          disabled={state === "sending" || !network}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center self-start rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate transition-colors hover:bg-pine disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "sending" ? t.sending.node : t.submit.node}
        </button>
        {state === "error" ? (
          <p role="alert" className="font-gothic text-small text-pine">
            {t.error.node}
          </p>
        ) : null}
      </div>
    </form>
  );
}
