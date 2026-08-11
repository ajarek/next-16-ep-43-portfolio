"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/selected-projects/project-card";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

const TOTAL = PROJECTS.length;

/** Szerokość przesunięcia między kolejnymi kartami wachlarza (px). */
const FAN_STEP = 132;

/** Mnożnik rozwarcia wachlarza podczas hovera. */
const FAN_OPEN = 1.45;

/**
 * „Wachlarz projektów" — sekcja z nachodzącymi na siebie kartami, które
 * po najechaniu myszką wysuwają się i rozświetlają (README → kluczowe
 * elementy projektu). Na desktopie karty układają się w łuk 3D, na
 * mobile działają jako karuzela z przyciąganiem (scroll snap).
 */
export default function SelectedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  /** Przejście do karty o wskazanym indeksie (z zapętleniem). */
  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % TOTAL) + TOTAL) % TOTAL);
  }, []);

  /** Przewinięcie karuzeli mobile do karty o wskazanym indeksie. */
  const scrollToCard = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll<HTMLElement>("[data-project-card]");
    const target = cards[index];
    if (!target) return;
    viewport.scrollTo({
      left: target.offsetLeft - (viewport.clientWidth - target.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  /** Nawigacja karuzelą mobile — przewija i aktualizuje aktywną kartę. */
  const stepCarousel = (direction: -1 | 1) => {
    const next = ((activeIndex + direction) % TOTAL + TOTAL) % TOTAL;
    goTo(next);
    scrollToCard(next);
  };

  /** Wybór karty — na desktopie przód wachlarza, na mobile centrum karuzeli. */
  const handleCardSelect = (index: number) => {
    setHoveredIndex(null);
    goTo(index);
    scrollToCard(index);
  };

  /** Obsługa klawiatury dla kart wachlarza (Enter / spacja = wybór). */
  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardSelect(index);
    }
  };

  /** Transformacja karty w wachlarzu — pozycja względem aktywnej karty. */
  const cardStyle = (index: number): CSSProperties => {
    let delta = index - activeIndex;
    // Zawijanie odległości, aby wachlarz działał w obie strony.
    if (delta > TOTAL / 2) delta -= TOTAL;
    if (delta < -TOTAL / 2) delta += TOTAL;

    const hovering = hoveredIndex !== null;
    const isHovered = hoveredIndex === index;
    const magnitude = Math.abs(delta);

    const spread = hovering ? FAN_STEP * FAN_OPEN : FAN_STEP;
    const x = delta * spread;
    const y = magnitude * 16 + (isHovered ? -22 : 0);
    const z = -magnitude * 90;
    const rotate = isHovered ? 0 : delta * 7;
    const scale = isHovered ? 1.08 : 1 - magnitude * 0.055;
    const opacity = hovering
      ? isHovered
        ? 1
        : 1 - magnitude * 0.22
      : 1 - magnitude * 0.12;

    return {
      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotate(${rotate}deg) scale(${scale})`,
      zIndex: isHovered ? 40 : 20 - magnitude,
      opacity,
    };
  };

  return (
    <section
      id="projekty"
      className="relative isolate scroll-mt-24 py-10 lg:py-14"
    >
      <div className="relative">
        {/* Nagłówek sekcji. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="text-label inline-flex items-center gap-2 text-primary">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              Portfolio
            </span>
            <h2 className="text-headline-lg-responsive text-foreground">
              Wybrane projekty
            </h2>
            <p className="max-w-xl text-body-lg text-muted-foreground">
              Przekrojowe realizacje demonstrujące zaawansowane podejście do
              architektury i designu.
            </p>
          </div>

          {/* Sterowanie wachlarzem (desktop) i karuzelą (mobile). */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-on-surface-variant/60">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(TOTAL).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Poprzedni projekt"
                onClick={() => stepCarousel(-1)}
                className="group inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-on-surface-variant backdrop-blur transition-all duration-300 outline-none hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-6px_var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 lg:hidden"
              >
                <ArrowLeft
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
              </button>
              <button
                type="button"
                aria-label="Następny projekt"
                onClick={() => stepCarousel(1)}
                className="group inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-on-surface-variant backdrop-blur transition-all duration-300 outline-none hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-6px_var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 lg:hidden"
              >
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>

              <button
                type="button"
                aria-label="Poprzedni projekt"
                onClick={() => goTo(activeIndex - 1)}
                className="group hidden size-11 items-center justify-center rounded-full border border-border/60 bg-background/50 text-on-surface-variant backdrop-blur transition-all duration-300 outline-none hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-6px_var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 lg:inline-flex"
              >
                <ArrowLeft
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
              </button>
              <button
                type="button"
                aria-label="Następny projekt"
                onClick={() => goTo(activeIndex + 1)}
                className="group hidden size-11 items-center justify-center rounded-full border border-border/60 bg-background/50 text-on-surface-variant backdrop-blur transition-all duration-300 outline-none hover:border-primary/50 hover:text-primary hover:shadow-[0_0_24px_-6px_var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 lg:inline-flex"
              >
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ——— Wachlarz (desktop ≥ lg) ——— */}
        <div
          onPointerLeave={() => setHoveredIndex(null)}
          className="relative mx-auto mt-12 hidden h-104 max-w-4xl perspective:1400px lg:block"
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Wybierz projekt: ${project.title}`}
              aria-pressed={index === activeIndex}
              data-project-card
              onClick={() => handleCardSelect(index)}
              onKeyDown={(event) => handleCardKeyDown(event, index)}
              onPointerEnter={() => setHoveredIndex(index)}
              style={cardStyle(index)}
              className="absolute left-1/2 top-1/2 cursor-pointer rounded-[1.75rem] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-3 focus-visible:ring-ring/60 will-change-transform"
            >
              <ProjectCard
                project={project}
                active={index === activeIndex}
              />
            </div>
          ))}
        </div>

        {/* ——— Karuzela (mobile < lg) ——— */}
        <div
          ref={viewportRef}
          className="-mx-1 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 lg:hidden scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              data-project-card
              onClick={() => handleCardSelect(index)}
              className={cn(
                "w-[85%] shrink-0 snap-center transition-opacity duration-300 sm:w-[60%]",
                index !== activeIndex && "opacity-60"
              )}
            >
              <ProjectCard project={project} active={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
