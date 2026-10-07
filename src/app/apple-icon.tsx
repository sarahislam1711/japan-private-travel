import { brandMark } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Square: iOS applies its own rounding.
export default function AppleIcon() {
  return brandMark(180, 0);
}
