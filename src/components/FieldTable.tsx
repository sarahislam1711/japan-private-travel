import type { CSSProperties, ReactNode } from "react";

export type Field = {
  key: string;
  label: ReactNode;
  value: ReactNode;
};

type Props = {
  fields: Field[];
  /** The panel's opening statement. */
  title?: ReactNode;
  /** A closing line, such as the verify link. */
  foot?: ReactNode;
  /** "panel": a soft snow surface. "bare": rows only, on whatever surface it sits on. */
  variant?: "panel" | "bare";
  /** Values ink in on load (Home's one moment). */
  animate?: boolean;
  /** Stagger offset for the animation sequence. */
  startIndex?: number;
  className?: string;
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Facts as label and value pairs, separated by space rather than rules: the
 * proof beside a claim. The panel variant sits on a soft snow surface.
 */
export function FieldTable({ fields, title, foot, variant = "panel", animate = false, startIndex = 0, className = "" }: Props) {
  const panel = variant === "panel";
  return (
    <div className={`${panel ? "rounded-[14px] bg-plate px-6 py-6 tablet:px-8 tablet:py-7" : ""} ${className}`}>
      {title ? (
        <div className={`font-serif text-h3 [font-variation-settings:'opsz'_24] ${animate ? "ink-in" : ""}`} style={step(startIndex)}>
          {title}
        </div>
      ) : null}
      <dl className={`grid gap-y-4 ${title ? "mt-5" : ""}`}>
        {fields.map((field, n) => (
          <div key={field.key} className={`grid gap-x-4 gap-y-0.5 tablet:grid-cols-[13.75rem_1fr] ${animate ? "ink-in" : ""}`} style={step(startIndex + n + 1)}>
            <dt className="pt-0.5 font-gothic text-label text-ink-soft">{field.label}</dt>
            <dd className="font-serif text-field [font-variant-numeric:lining-nums_tabular-nums] [font-variation-settings:'opsz'_16]">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
      {foot ? (
        <div className={`mt-5 font-gothic text-label ${animate ? "ink-in" : ""}`} style={step(startIndex + fields.length + 1)}>
          {foot}
        </div>
      ) : null}
    </div>
  );
}
