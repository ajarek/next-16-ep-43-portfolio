"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Wykrywa sekcję aktualnie oglądaną przez użytkownika (scroll spy)
 * oraz synchronizuje aktywną pozycję z bieżącą trasą i kotwicą w URL.
 *
 * Jeżeli użytkownik znajduje się na podstronie (np. /projects), funkcja
 * bezpośrednio zwraca identyfikator odpowiadający tej podstronie bez
 * kaskadowych renderów.
 */
export function useActiveSection<TId extends string>(
  sectionIds: readonly TId[],
  defaultId: TId
): TId {
  const pathname = usePathname();
  const [scrollActiveId, setScrollActiveId] = useState<TId>(defaultId);

  const isProjectsRoute =
    pathname === "/projects" || pathname?.startsWith("/projects/");

  useEffect(() => {
    // Na podstronach innych niż główna nie uruchamiamy obserwatora sekcji
    if (isProjectsRoute) {
      return;
    }

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

        // Na samej górze strony zawsze podświetlamy pierwszą pozycję menu
        if (window.scrollY < 40) {
          setScrollActiveId(defaultId);
          return;
        }

        if (bestId !== null) {
          setScrollActiveId(bestId as TId);
        }
      },
      {
        rootMargin: "-15% 0px -40% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    // Obsługa zmiany hasha w oknie
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace("#", "") as TId;
      if (sectionIds.includes(currentHash)) {
        setScrollActiveId(currentHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds, defaultId, isProjectsRoute]);

  if (isProjectsRoute && sectionIds.includes("projekty" as TId)) {
    return "projekty" as TId;
  }

  return scrollActiveId;
}
