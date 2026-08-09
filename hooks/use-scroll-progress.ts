"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollProgressResult {
  /** Czy strona została przewinięta poniżej progu (włącza efekt „szkła"). */
  readonly scrolled: boolean;
  /**
   * Referencja do paska postępu. Wartość `scaleX` ustawiana jest bezpośrednio
   * na elemencie DOM, więc przewijanie nie wywołuje ponownych renderów Reacta.
   */
  readonly progressRef: React.RefObject<HTMLSpanElement | null>;
}

/**
 * Śledzi pozycję przewijania okna:
 * - `scrolled` przełącza szklane tło navbara,
 * - `progressRef` odwzorowuje postęp czytania jako gradientowy pasek.
 *
 * Odczyty są throttlowane przez `requestAnimationFrame`.
 */
export function useScrollProgress(threshold = 8): ScrollProgressResult {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, offset / scrollable)) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      // React pomija render, gdy wartość się nie zmienia.
      setScrolled(offset > threshold);
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [threshold]);

  return { scrolled, progressRef };
}
