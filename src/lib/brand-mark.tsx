import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The interim brand mark for favicons and app icons: "H" in Source Serif on
 * Pine. A placeholder until a drawn mark exists (DECISIONS D1).
 */
export async function brandMark(size: number, radius: number) {
  const serif = await readFile(join(process.cwd(), "src/fonts/og/source-serif-4-400.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2C5F53",
          color: "#FAFAF8",
          borderRadius: radius,
          fontFamily: "Serif",
          fontSize: size * 0.68,
          paddingBottom: size * 0.04,
        }}
      >
        H
      </div>
    ),
    { width: size, height: size, fonts: [{ name: "Serif", data: serif, weight: 400, style: "normal" }] },
  );
}
