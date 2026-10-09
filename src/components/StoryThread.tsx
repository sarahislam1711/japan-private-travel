"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The thread down the About page: a thin line at inline-start that fills with
 * pine as you read, joining the chapters into one story. The chapters place
 * their own kanji marks on it. Static (and fully shown) under reduced motion.
 */
export function StoryThread({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--thread", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = (window.innerHeight * 0.6 - r.top) / r.height;
        el.style.setProperty("--thread", String(Math.min(1, Math.max(0, progress))));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div ref={root} className="story-thread relative">
      <span aria-hidden className="absolute start-[1.375rem] top-0 bottom-0 hidden w-px bg-ink/12 desktop:block">
        <span className="absolute inset-x-0 top-0 block h-full origin-top bg-pine" style={{ transform: "scaleY(var(--thread, 0))" }} />
      </span>
      {children}
    </div>
  );
}
