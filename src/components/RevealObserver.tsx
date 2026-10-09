"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they enter the viewport. Content is only
 * hidden once this has run (html.reveal-ready), so without JavaScript or with
 * reduced motion everything is simply visible.
 */
/** Search and AI crawlers, link previewers and headless renderers. */
export const isBot = () =>
  typeof navigator !== "undefined" &&
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|headless|lighthouse|chrome-lighthouse|gpt|claude|perplexity/i.test(navigator.userAgent);

export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    // Crawlers and reduced-motion visitors get the content as it is: nothing hidden, nothing animated.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isBot()) return;
    const root = document.documentElement;
    // Whatever is on screen when the page opens shows at once, with no fade: it is never hidden, so the
    // largest text paints with the first frame (LCP). Only what is further down waits to be revealed.
    document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.setAttribute("data-in", "instant");
    });
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
