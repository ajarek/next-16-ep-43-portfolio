"use client";

import { useEffect, useRef } from "react";

/**
 * Interaktywny „spotlight” podążający za kursorem — echo DESIGN.md
 * (światło zamiast ciężkich tekstur). Szanuje `prefers-reduced-motion`.
 */
export function ContactSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = ref.current;
    if (!spotlight) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const onMove = (event: PointerEvent) => {
      const host = spotlight.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background:
          "radial-gradient(28rem circle at var(--spot-x, 18%) var(--spot-y, 12%), color-mix(in oklab, var(--primary) 18%, transparent), transparent 58%)",
      }}
    />
  );
}
