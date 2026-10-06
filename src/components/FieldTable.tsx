import type { CSSProperties, ReactNode } from "react";

export type Field = {
  key: string;
  label: ReactNode;
  value: ReactNode;
};

type Props = {
  fields: Field[];
  /** The plate's title, set inside its frame. */
  title?: ReactNode;
  /** A closing line inside the frame, such as the verify link. */
  foot?: ReactNode;
  /** "plate": framed by a double rule. "bare": rows only, for margin use. */
  variant?: "plate" | "bare";
  /** Animate rules drawing and values inking in (Home's one moment). */
  animate?: boolean;
  /** Stagger offset for the animation sequence. */
  startIndex?: number;
  className?: string;
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The registration plate: a ruled table of facts. Every row is one checkable
 * fact, so every rule separates two pieces of information.
 */
export function FieldTable({ fields, title, foot, variant = "plate", animate = false, startIndex = 0, className = "" }: Props) {
  const framed = variant === "plate";
  return (
    <div className={`${framed ? "border-4 border-double border-ink bg-plate px-5 pb-1" : ""} ${className}`}>
      {title ? (
        <div className={`py-3 font-serif text-h3 [font-variation-settings:'opsz'_24] ${animate ? "ink-in" : ""}`} style={step(startIndex)}>
          {title}
        </div>
      ) : null}
      <dl>
        {fields.map((field, n) => (
          <div key={field.key} className="relative grid gap-x-4 gap-y-0.5 py-2.5 tablet:grid-cols-[minmax(6.5rem,2fr)_3fr]">
            <span
              aria-hidden
              className={`absolute inset-x-0 top-0 h-px ${n === 0 && title ? "bg-ink" : "bg-hairline"} ${animate ? "draw-rule" : ""}`}
              style={step(startIndex + n + 1)}
            />
            <dt className={`pt-0.5 font-gothic text-label text-ink-soft ${animate ? "ink-in" : ""}`} style={step(startIndex + n + 2)}>
              {field.label}
            </dt>
            <dd
              className={`font-serif text-field [font-variant-numeric:lining-nums_tabular-nums] [font-variation-settings:'opsz'_16] ${animate ? "ink-in" : ""}`}
              style={step(startIndex + n + 2)}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
      {foot ? (
        <div className="relative py-2.5 font-gothic text-label">
          <span aria-hidden className={`absolute inset-x-0 top-0 h-px bg-ink ${animate ? "draw-rule" : ""}`} style={step(startIndex + fields.length + 2)} />
          <span className={animate ? "ink-in" : ""} style={step(startIndex + fields.length + 3)}>
            {foot}
          </span>
        </div>
      ) : null}
    </div>
  );
}
