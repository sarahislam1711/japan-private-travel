import { ImageResponse } from "next/og";
import { BRAND_HEX, STONE_ELLIPSES } from "./mark";

/** The app icon: the stepping-stones mark in Snow on a Pine square, at 0.78 scale. */
export function brandMark(size: number, radius: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BRAND_HEX.pine, borderRadius: radius }}>
        <svg width={size} height={size} viewBox="0 0 64 64">
          <g transform="translate(7 7) scale(0.78)">
            {STONE_ELLIPSES.map((e) => (
              <ellipse key={e.cx} {...e} fill={BRAND_HEX.snow} />
            ))}
          </g>
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
