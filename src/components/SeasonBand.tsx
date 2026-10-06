import { summerJourneys } from "@content/pages/summer-journeys";
import { CopyText } from "./CopyText";

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const summer = new Set([7, 8]);

/**
 * Twelve month cells in one row that scales and never wraps. July and August
 * are the only filled cells. Data cells stay empty until CL-05 is sourced.
 */
export function SeasonBand() {
  const { caption, rows } = summerJourneys.seasonBand;
  return (
    <div>
      <table className="w-full table-fixed border-collapse font-gothic text-small tablet:text-label [font-variant-numeric:lining-nums_tabular-nums]">
        <caption className="pb-3 text-start text-small text-ink-soft caption-bottom pt-3">
          <CopyText copy={caption} />
        </caption>
        <thead>
          <tr className="border-y-4 border-double border-ink">
            <td className="w-[24%] tablet:w-[18%]" />
            {months.map((m) => (
              <th
                key={m}
                scope="col"
                className={`py-2 text-center font-normal ${summer.has(m) ? "bg-navy text-plate" : ""}`}
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-hairline">
              <th scope="row" className="py-2.5 pe-3 text-start font-normal text-ink-soft">
                <CopyText copy={row} />
              </th>
              {months.map((m) => (
                <td key={m} className={`py-2.5 ${summer.has(m) ? "bg-navy/8" : ""}`} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
