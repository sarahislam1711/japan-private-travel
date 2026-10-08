import { SeasonBand } from "./SeasonBand";

/** The case in data: the two summer months marked against the year, on a snow panel, after the regions. */
export function MonthsSection() {
  return (
    <div className="mx-auto mt-6 max-w-(--content-max) px-(--page-margin)">
      <div data-reveal className="rounded-[24px] bg-plate p-6 tablet:p-10">
        <SeasonBand />
      </div>
    </div>
  );
}
