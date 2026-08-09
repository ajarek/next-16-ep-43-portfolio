"use client";

import { useEffect, useState } from "react";

/**
 * Wykrywa sekcję aktualnie oglądaną przez użytkownika (scroll spy).
 *
 * Jeżeli na stronie nie ma jeszcze sekcji o podanych identyfikatorach,
 * hook zwraca wartość domyślną — dzięki temu nawigacja zawsze ma
 * jeden podświetlony element i nie powoduje niezgodności hydratacji.
 */
export function useActiveSection<TId extends string>(
  sectionIds: readonly TId[],
  defaultId: TId
): TId {
  const [activeId, setActiveId] = useState<TId>(defaultId);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId: string | null = null;
        let bestRatio = 0;

        for (const section of sections) {
          const ratio = visibility.get(section.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = section.id;
          }
        }

        // Na samej górze strony zawsze podświetlamy pierwszą pozycję menu.
        if (window.scrollY < 8) {
          setActiveId(defaultId);
          return;
        }

        if (bestId !== null) {
          setActiveId(bestId as TId);
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [sectionIds, defaultId]);

  return activeId;
}
