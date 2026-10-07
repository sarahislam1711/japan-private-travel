import { ImageResponse } from "next/og";
import { BRAND_HEX, NOREN_PATHS } from "./noren";

/** The app icon: the noren mark in Snow on a Pine square, at three-quarters scale. */
export function brandMark(size: number, radius: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BRAND_HEX.pine, borderRadius: radius }}>
        <svg width={size} height={size} viewBox="0 0 64 64">
          <g transform="translate(8 8) scale(0.75)">
            {NOREN_PATHS.map((d) => (
              <path key={d} d={d} fill={BRAND_HEX.snow} />
            ))}
          </g>
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
