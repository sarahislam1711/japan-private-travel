import { summerJourneys } from "@content/pages/summer-journeys";
import { copyText, isResolved } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";

/**
 * The case in data (CL-05, JMA 1991–2020 normals): one headline, then a line
 * chart of the year with July and August shaded, one line per station, each
 * labelled at August. Rows without data (the Alps station, D6) are left out.
 * The numbers are also in a visually hidden table for screen readers.
 */
export async function SeasonBand() {
  const locale = await getLocale();
  const { caption, rows, data, headline, humidity } = summerJourneys.seasonBand;
  const series = rows
    .map((row, i) => ({ row, values: data[i] }))
    .filter((s) => s.values && isResolved(s.row));
  const monthNames = Array.from({ length: 12 }, (_, m) =>
    new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", { month: "short" }).format(new Date(2026, m, 1)),
  );

  // Chart geometry (viewBox units).
  const W = 1000, H = 300, L = 44, R = 120, T = 20, B = 36;
  const min = -5, max = 35;
  const x = (m: number) => L + (m * (W - L - R)) / 11;
  const y = (v: number) => T + ((max - v) * (H - T - B)) / (max - min);
  const colours = ["var(--color-ink)", "var(--color-pine)"];
  const fmt = (v: number) => `${v.toFixed(1)}°`;

  return (
    <figure className="flex flex-col gap-6">
      <p className="font-serif text-[clamp(1.5rem,1.2vw+1.1rem,2.25rem)] leading-tight font-[450] [font-variation-settings:'opsz'_36]">
        <CopyText copy={headline} />
      </p>

      {/* Phones: the August values, large, where the chart's labels would be too small to read. */}
      <dl className="grid grid-cols-2 gap-3 tablet:hidden">
        {series.map((s, si) => (
          <div key={si} className="rounded-[16px] bg-ground p-4">
            <dt className="font-gothic text-small text-ink-soft">
              <CopyText copy={s.row} /> · {monthNames[7]}
            </dt>
            <dd dir="ltr" className="mt-1 text-start font-serif text-[2rem] leading-none" style={{ color: colours[si] }}>
              {fmt(s.values[7])}
            </dd>
          </div>
        ))}
      </dl>

      <div dir="ltr" className="overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={copyText(headline, locale)}>
          {/* July and August, shaded. */}
          <rect x={x(6) - (x(1) - x(0)) / 2} y={T - 8} width={2 * (x(1) - x(0))} height={H - T - B + 8} rx="10" className="fill-pine/10" />
          {/* Gridlines every 10°. */}
          {[0, 10, 20, 30].map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="stroke-ink/10" strokeWidth="1" />
              <text x={L - 10} y={y(v) + 4} textAnchor="end" className="fill-ink-soft font-gothic text-[13px]">
                {v}°
              </text>
            </g>
          ))}
          {/* Month labels; summer months in pine. */}
          {monthNames.map((m, i) => (
            <text key={i} x={x(i)} y={H - 10} textAnchor="middle" className={`font-gothic text-[13px] ${i === 6 || i === 7 ? "fill-pine font-bold" : "fill-ink-soft"}`}>
              {m}
            </text>
          ))}
          {/* One line per station, its August value labelled at the end. */}
          {series.map((s, si) => {
            const d = s.values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
            const aug = s.values[7];
            return (
              <g key={si}>
                <path d={d} fill="none" stroke={colours[si]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="season-line" />
                <circle cx={x(7)} cy={y(aug)} r="6" fill={colours[si]} />
                <text x={x(11) + 14} y={y(s.values[11]) + 5} className="font-gothic text-[15px]" fill={colours[si]}>
                  {copyText(s.row, locale)}
                </text>
                <text x={x(7)} y={si === 0 ? y(aug) - 14 : y(aug) + 26} textAnchor="middle" className="font-serif text-[17px] font-bold" fill={colours[si]}>
                  {fmt(aug)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* The same numbers as a table, for screen readers. */}
      <div className="sr-only">
      <table>
        <thead>
          <tr>
            <td />
            {monthNames.map((m) => (
              <th key={m} scope="col">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {series.map((s, si) => (
            <tr key={si}>
              <th scope="row">
                <CopyText copy={s.row} />
              </th>
              {s.values.map((v, i) => (
                <td key={i}>{fmt(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* How the heat feels: one sourced note. */}
      <p className="flex items-start gap-3 font-gothic text-copy text-ink">
        <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-full bg-ink" />
        <CopyText copy={humidity} />
      </p>

      <figcaption className="font-gothic text-small text-ink-soft">
        <CopyText copy={caption} />
      </figcaption>
    </figure>
  );
}
