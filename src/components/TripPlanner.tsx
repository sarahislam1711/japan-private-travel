"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";

/** One string in the page's language: the rendered node (with dev markers) and its plain text. */
export type T = { node: ReactNode; text: string };
type Dict = Record<string, T>;

type Reply = "whatsapp" | "email" | "phone";
type Lang = "ar" | "en" | "ja";
type Plan = {
  adults: number;
  grandparents: number;
  childAges: number[];
  months: number[];
  notSure: boolean;
  datesNote: string;
  places: string[];
  needs: string;
  language: Lang | null;
  reply: Reply | null;
  name: string;
  contact: string;
};

const EMPTY: Plan = {
  adults: 2,
  grandparents: 0,
  childAges: [],
  months: [],
  notSure: false,
  datesNote: "",
  places: [],
  needs: "",
  language: null,
  reply: null,
  name: "",
  contact: "",
};

const STEPS = ["who", "when", "where", "needs", "reply", "review"] as const;
type Step = (typeof STEPS)[number];
const STORE = "halajapan-plan";
const MAX = 12;

/**
 * The trip planner: the Contact form as six short steps, with the plan
 * building up live beside it on pine. Answers stay on this device
 * (localStorage) until sent. Sending opens WhatsApp with the plan written
 * out; the email enquiry joins once its backend exists.
 */
export function TripPlanner({
  t,
  locale,
  places,
  whatsappNumber,
}: {
  t: Dict;
  locale: "en" | "ar";
  /** Place options: id and label, in display order. */
  places: { id: string; label: T; group: T }[];
  whatsappNumber: string;
}) {
  const [plan, setPlan] = useState<Plan>(EMPTY);
  const [step, setStep] = useState<Step>("who");
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const uid = useId();

  // Restore and keep answers on this device only.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE);
      if (saved) setPlan({ ...EMPTY, ...JSON.parse(saved) });
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORE, JSON.stringify(plan));
    } catch {}
  }, [plan, loaded]);

  // Move focus to the new question so keyboard and screen-reader users follow the step.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const monthNames = useMemo(() => {
    const f = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", { month: "long" });
    return Array.from({ length: 12 }, (_, m) => f.format(new Date(2026, m, 1)));
  }, [locale]);

  const set = <K extends keyof Plan>(k: K, v: Plan[K]) => {
    setPlan((p) => ({ ...p, [k]: v }));
    setError(null);
  };
  const toggle = <V,>(list: V[], v: V) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const index = STEPS.indexOf(step);
  const go = (i: number) => {
    setError(null);
    setStep(STEPS[Math.max(0, Math.min(STEPS.length - 1, i))]);
  };

  const problem = (s: Step): string | null => {
    if (s === "who" && plan.adults + plan.grandparents < 1) return t["planner.errors.needTraveller"].text;
    if (s === "when" && !plan.notSure && plan.months.length === 0 && !plan.datesNote.trim()) return t["planner.errors.needWhen"].text;
    if (s === "reply") {
      if (!plan.name.trim()) return t["planner.errors.needName"].text;
      if (!plan.language || !plan.reply || !plan.contact.trim()) return t["planner.errors.needContact"].text;
    }
    return null;
  };
  const next = () => {
    const p = problem(step);
    if (p) return setError(p);
    go(index + 1);
  };

  // The plan as plain lines, for the summary and the WhatsApp message.
  const languages: Record<Lang, T> = { ar: t["fields.replyLanguageOptions.0"], en: t["fields.replyLanguageOptions.1"], ja: t["fields.replyLanguageOptions.2"] };
  const replies: Record<Reply, T> = { whatsapp: t["fields.replyChannelOptions.0"], email: t["fields.replyChannelOptions.1"], phone: t["fields.replyChannelOptions.2"] };
  // Lists join with the comma of the page's language (Arabic uses ،).
  const sep = locale === "ar" ? "، " : ", ";
  const ageText = (a: number) => (a === 0 ? t["planner.people.under1"].text : String(a));
  const travelling = [
    plan.adults ? `${t["planner.people.adults"].text} ${plan.adults}` : null,
    plan.grandparents ? `${t["planner.people.grandparents"].text} ${plan.grandparents}` : null,
    plan.childAges.length ? `${t["planner.people.children"].text} ${plan.childAges.length} (${plan.childAges.map(ageText).join(sep)})` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const when = [plan.notSure ? t["planner.when.notSure"].text : plan.months.toSorted((a, b) => a - b).map((m) => monthNames[m]).join(sep), plan.datesNote.trim()]
    .filter(Boolean)
    .join(" · ");
  const where = places
    .filter((p) => plan.places.includes(p.id))
    .map((p) => p.label.text)
    .join(sep);
  const replyLine = [plan.language && languages[plan.language].text, plan.reply && replies[plan.reply].text].filter(Boolean).join(" · ");

  const lines: { key: string; label: T; value: string }[] = [
    { key: "who", label: t["planner.summary.travelling"], value: travelling },
    { key: "when", label: t["planner.summary.months"], value: when },
    { key: "where", label: t["planner.summary.places"], value: where },
    { key: "needs", label: t["fields.purpose"], value: plan.needs.trim() },
    { key: "reply", label: t["fields.replyLanguage"], value: replyLine },
  ];

  const message = [
    t["planner.whatsappIntro"].text,
    "",
    ...lines.filter((l) => l.value).map((l) => `${l.label.text}: ${l.value}`),
    `${t["fields.name"].text}: ${plan.name.trim()}`,
    plan.contact.trim() ? `${(plan.reply === "email" ? t["fields.email"] : t["fields.phone"]).text}: ${plan.contact.trim()}` : "",
  ]
    .filter((l, i, all) => l !== "" || all[i - 1] !== "")
    .join("\n");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const startOver = () => {
    setPlan(EMPTY);
    go(0);
  };

  const question: Record<Step, T> = {
    who: t["planner.questions.who"],
    when: t["planner.questions.when"],
    where: t["planner.questions.where"],
    needs: t["planner.questions.needs"],
    reply: t["fields.replyChannel"],
    review: t["planner.steps.review"],
  };

  return (
    <div className="grid grid-cols-12 gap-4 desktop:gap-6">
      {/* The step */}
      <div className="col-span-12 flex flex-col rounded-[24px] bg-plate p-6 tablet:p-10 desktop:col-span-8 desktop:min-h-[36rem]">
        {/* Progress: six segments; finished steps can be revisited. */}
        <ol className="grid grid-cols-6 gap-1.5" aria-label={t["planner.summary.title"].text}>
          {STEPS.map((s, i) => {
            const done = i < index;
            return (
              <li key={s}>
                <button
                  type="button"
                  disabled={i > index}
                  aria-current={i === index ? "step" : undefined}
                  onClick={() => go(i)}
                  className="group flex w-full cursor-pointer flex-col gap-2 text-start disabled:cursor-default"
                >
                  <span className={`h-1 rounded-full transition-colors duration-500 ${i <= index ? "bg-pine" : "bg-mist"}`} />
                  <span
                    className={`hidden font-gothic text-[0.8125rem] tablet:block ${
                      i === index ? "text-ink" : done ? "text-ink-soft group-hover:text-pine" : "text-ink-soft/60"
                    }`}
                  >
                    {t[`planner.steps.${s}`].node}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div key={step} className="planner-step mt-10 flex flex-1 flex-col">
          <p className="font-gothic text-small text-ink-soft" dir="ltr">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
          </p>
          <h2 ref={headingRef} tabIndex={-1} id={`${uid}-q`} className="mt-3 font-serif text-h2 outline-none [font-variation-settings:'opsz'_36]">
            {question[step].node}
          </h2>
          <p className="mt-3 max-w-[34rem] font-gothic text-copy text-ink-soft">{t[`planner.hints.${step}`].node}</p>

          <div className="mt-8 flex-1">
            {step === "who" && (
              <div className="flex flex-col gap-3">
                <Counter label={t["planner.people.adults"]} value={plan.adults} onChange={(v) => set("adults", v)} t={t} />
                <Counter label={t["planner.people.grandparents"]} value={plan.grandparents} onChange={(v) => set("grandparents", v)} t={t} />
                <Counter
                  label={t["planner.people.children"]}
                  value={plan.childAges.length}
                  onChange={(v) => set("childAges", v > plan.childAges.length ? [...plan.childAges, 8] : plan.childAges.slice(0, v))}
                  t={t}
                />
                {plan.childAges.length > 0 && (
                  <div className="flex flex-wrap gap-3 ps-1 pt-1">
                    {plan.childAges.map((age, i) => (
                      <label key={i} className="flex items-center gap-2 rounded-full bg-ground py-1.5 ps-4 pe-2 font-gothic text-small">
                        <span className="text-ink-soft">
                          {t["planner.people.age"].node} <span dir="ltr">{i + 1}</span>
                        </span>
                        <select
                          value={age}
                          onChange={(e) => set("childAges", plan.childAges.map((a, j) => (j === i ? Number(e.target.value) : a)))}
                          className="min-h-9 cursor-pointer rounded-full bg-plate px-3 text-ink"
                        >
                          {Array.from({ length: 18 }, (_, a) => (
                            <option key={a} value={a}>
                              {ageText(a)}
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === "when" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-2 tablet:grid-cols-4 desktop:grid-cols-6">
                  {monthNames.map((m, i) => (
                    <Chip key={i} on={!plan.notSure && plan.months.includes(i)} onClick={() => setPlan((p) => ({ ...p, notSure: false, months: toggle(p.months, i) }))}>
                      {m}
                    </Chip>
                  ))}
                </div>
                <Chip on={plan.notSure} onClick={() => setPlan((p) => ({ ...p, notSure: !p.notSure, months: [] }))} wide>
                  {t["planner.when.notSure"].node}
                </Chip>
                <label className="flex flex-col gap-2 font-gothic text-small text-ink-soft">
                  {t["planner.when.datesNote"].node}
                  <input
                    value={plan.datesNote}
                    onChange={(e) => set("datesNote", e.target.value)}
                    maxLength={200}
                    className="min-h-12 rounded-(--radius-control) bg-ground px-4 text-label text-ink outline-pine"
                  />
                </label>
              </div>
            )}

            {step === "where" && (
              <div className="grid gap-3 tablet:grid-cols-2">
                {places.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={plan.places.includes(p.id)}
                    onClick={() => set("places", toggle(plan.places, p.id))}
                    className="group flex min-h-24 cursor-pointer flex-col justify-between gap-3 rounded-[16px] bg-ground p-5 text-start transition-colors hover:bg-mist aria-pressed:bg-pine aria-pressed:text-plate"
                  >
                    <span className="flex items-center justify-between gap-3 font-gothic text-small text-ink-soft group-aria-pressed:text-pine-soft">
                      {places[i - 1]?.group.text === p.group.text ? <span /> : p.group.node}
                      <Tick />
                    </span>
                    <span className="font-serif text-[1.375rem] leading-tight">{p.label.node}</span>
                  </button>
                ))}
              </div>
            )}

            {step === "needs" && (
              <textarea
                value={plan.needs}
                onChange={(e) => set("needs", e.target.value)}
                aria-labelledby={`${uid}-q`}
                rows={6}
                maxLength={1500}
                className="w-full rounded-[16px] bg-ground p-5 font-gothic text-label leading-relaxed text-ink outline-pine"
              />
            )}

            {step === "reply" && (
              <div className="flex flex-col gap-6">
                <Field label={t["fields.name"]}>
                  <input value={plan.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={120} className={inputClass} />
                </Field>
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 font-gothic text-small text-ink-soft">{t["fields.replyLanguage"].node}</legend>
                  <div role="radiogroup" className="flex flex-wrap gap-2">
                    {(["ar", "en", "ja"] as const).map((l) => (
                      <Chip key={l} on={plan.language === l} onClick={() => set("language", l)} radio>
                        {languages[l].node}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 font-gothic text-small text-ink-soft">{t["fields.replyChannel"].node}</legend>
                  <div role="radiogroup" className="flex flex-wrap gap-2">
                    {(["whatsapp", "email", "phone"] as const).map((r) => (
                      <Chip key={r} on={plan.reply === r} onClick={() => setPlan((p) => ({ ...p, reply: r, contact: p.reply && (p.reply === "email") !== (r === "email") ? "" : p.contact }))} radio>
                        {replies[r].node}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
                {plan.reply && (
                  <Field label={plan.reply === "email" ? t["fields.email"] : t["fields.phone"]}>
                    <input
                      value={plan.contact}
                      onChange={(e) => set("contact", e.target.value)}
                      type={plan.reply === "email" ? "email" : "tel"}
                      autoComplete={plan.reply === "email" ? "email" : "tel"}
                      dir="ltr"
                      maxLength={160}
                      className={inputClass}
                    />
                  </Field>
                )}
              </div>
            )}

            {step === "review" && (
              <div className="flex flex-col gap-6">
                <dl className="divide-y divide-ink/10 rounded-[16px] bg-ground px-5">
                  {[...lines, { key: "reply", label: t["fields.name"], value: [plan.name.trim(), plan.contact.trim()].filter(Boolean).join(" · ") }].map((l, i) => (
                    <div key={i} className="flex flex-col gap-1 py-4 tablet:flex-row tablet:items-baseline tablet:gap-6">
                      <dt className="shrink-0 font-gothic text-small text-ink-soft tablet:w-44">{l.label.node}</dt>
                      <dd className="flex-1 font-gothic text-label">{l.value || "—"}</dd>
                      <dd>
                        <button type="button" onClick={() => go(STEPS.indexOf(l.key as Step))} className="tap cursor-pointer font-gothic text-small text-ink-soft underline hover:text-pine">
                          {t["planner.buttons.edit"].node}
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-12 items-center justify-center rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate no-underline transition-colors hover:bg-pine hover:text-plate"
                  >
                    {t["planner.buttons.sendWhatsApp"].node}
                  </a>
                  <button
                    type="button"
                    disabled
                    aria-describedby={`${uid}-soon`}
                    className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-(--radius-control) px-6 font-gothic text-label text-ink-soft ring-1 ring-ink/20 ring-inset"
                  >
                    {t["submit"].node}
                  </button>
                </div>
                <p id={`${uid}-soon`} className="font-gothic text-small text-ink-soft">
                  {t["planner.enquirySoon"].node}
                </p>
                <p className="font-gothic text-small text-ink-soft">{t["privacyLine"].node}</p>
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="mt-6 font-gothic text-small text-pine">
              {error}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            {index > 0 ? (
              <button type="button" onClick={() => go(index - 1)} className="tap cursor-pointer font-gothic text-label underline hover:text-pine">
                {t["planner.buttons.back"].node}
              </button>
            ) : (
              <span />
            )}
            {step === "review" ? (
              <button type="button" onClick={startOver} className="tap cursor-pointer font-gothic text-small text-ink-soft underline hover:text-pine">
                {t["planner.buttons.startOver"].node}
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate transition-colors hover:bg-pine"
              >
                {t["planner.buttons.next"].node}
                <svg aria-hidden viewBox="0 0 16 10" className="w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 5h13M10 1l4 4-4 4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* The plan, building up live. */}
      <aside aria-live="polite" className="on-pine col-span-12 flex flex-col rounded-[24px] p-6 tablet:p-10 desktop:col-span-4">
        <h2 className="font-serif text-h3 [font-variation-settings:'opsz'_24]">{t["planner.summary.title"].node}</h2>
        {lines.some((l) => l.value) ? (
          <dl className="mt-6 flex flex-col gap-5">
            {lines
              .filter((l) => l.value)
              .map((l) => (
                <div key={l.key} className="planner-line">
                  <dt className="font-gothic text-small text-pine-soft">{l.label.node}</dt>
                  <dd className="mt-1 font-gothic text-label text-plate">{l.value}</dd>
                </div>
              ))}
          </dl>
        ) : (
          <p className="mt-6 font-gothic text-small text-pine-soft">{t["planner.summary.empty"].node}</p>
        )}
        <p className="mt-auto pt-10 font-gothic text-[0.8125rem] text-pine-soft">{t["planner.saved"].node}</p>
      </aside>
    </div>
  );
}

const inputClass = "min-h-12 w-full rounded-(--radius-control) bg-ground px-4 font-gothic text-label text-ink outline-pine";

function Field({ label, children }: { label: T; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2 font-gothic text-small text-ink-soft">
      {label.node}
      {children}
    </label>
  );
}

function Counter({ label, value, onChange, t }: { label: T; value: number; onChange: (v: number) => void; t: Dict }) {
  const btn =
    "inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-plate text-ink ring-1 ring-ink/15 ring-inset transition-colors hover:bg-pine hover:text-plate disabled:cursor-default disabled:opacity-35 disabled:hover:bg-plate disabled:hover:text-ink";
  return (
    <div className="flex items-center justify-between gap-4 rounded-[16px] bg-ground py-3 ps-5 pe-3">
      <span className="font-gothic text-label">{label.node}</span>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= 0} onClick={() => onChange(value - 1)} aria-label={`${t["planner.people.remove"].text}: ${label.text}`}>
          <svg aria-hidden viewBox="0 0 12 12" className="size-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 6h8" />
          </svg>
        </button>
        <output aria-live="polite" className="w-7 text-center font-serif text-[1.5rem] tabular-nums" dir="ltr">
          {value}
        </output>
        <button type="button" className={btn} disabled={value >= MAX} onClick={() => onChange(value + 1)} aria-label={`${t["planner.people.add"].text}: ${label.text}`}>
          <svg aria-hidden viewBox="0 0 12 12" className="size-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 6h8M6 2v8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Chip({ on, onClick, children, wide = false, radio = false }: { on: boolean; onClick: () => void; children: ReactNode; wide?: boolean; radio?: boolean }) {
  return (
    <button
      type="button"
      role={radio ? "radio" : undefined}
      aria-checked={radio ? on : undefined}
      aria-pressed={radio ? undefined : on}
      onClick={onClick}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-4 font-gothic text-small transition-colors ${
        on ? "bg-pine text-plate" : "bg-ground text-ink hover:bg-mist"
      } ${wide ? "self-start px-5" : ""}`}
    >
      {children}
    </button>
  );
}

function Tick() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 opacity-0 transition-opacity group-aria-pressed:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}
