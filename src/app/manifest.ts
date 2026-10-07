import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { copyText } from "@/lib/copy";

export default function manifest(): MetadataRoute.Manifest {
  const name = copyText(site.brand.name);
  return {
    name,
    short_name: name,
    start_url: "/",
    display: "browser",
    lang: "en",
    dir: "ltr",
    background_color: "#F1F2EE",
    theme_color: "#F1F2EE",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
