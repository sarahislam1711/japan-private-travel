"use client";

import Lenis, { type VirtualScrollData } from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

declare global {
  interface Window {
    /** The page's Lenis instance, for components that steer scrolling (the Showcase stage). */
    __lenis?: Lenis;
    /** Set by a component that wants to intercept wheel gestures; return false to consume one. */
    __scrollGate?: (data: VirtualScrollData) => boolean;
  }
}

/**
 * Weighted, smooth scrolling for the whole site (Lenis). Off for anyone who
 * prefers reduced motion; native scrolling, keyboard and anchors still work.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true, virtualScroll: (d) => window.__scrollGate?.(d) ?? true });
    window.__lenis = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
