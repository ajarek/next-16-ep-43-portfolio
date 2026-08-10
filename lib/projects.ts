/**
 * Definicje projektów AJAREK DEV.
 *
 * Dane i typy trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu sekcja „Wybrane projekty" korzysta z jednego źródła prawdy.
 * Przykładowe dane w formacie JSON: `public/data/projects.json`.
 */

/** Wariant wizualizacji miniatury karty (generowana w CSS). */
export type ProjectVisual = "dashboard" | "booking" | "shop" | "platform";

export interface ProjectCta {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  /** Unikalny identyfikator projektu. */
  readonly id: string;
  /** Numer porządkowy prezentowany na karcie („01"). */
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly cta: ProjectCta;
  /** Typ wizualizacji miniatury na karcie. */
  readonly visual: ProjectVisual;
  /**
   * Kolor akcentu projektu — napędza poświaty, gradienty i chipy technologii
   * (używany przez komponenty jako zmienna CSS `--project-accent`).
   */
  readonly accent: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "ai-dashboard",
    index: "01",
    title: "AI Dashboard",
    description:
      "Panel analityczny wykorzystujący modele uczenia maszynowego do predyspozycji trendów.",
    tags: ["Vue", "Python", "AWS"],
    cta: { label: "Zobacz Case Study", href: "#" },
    visual: "dashboard",
    accent: "#8069BF",
  },
  {
    id: "booking-villas",
    index: "02",
    title: "Booking Villas",
    description: "System rezerwacji premium z kalendarzem.",
    tags: ["React", "Node", "Supabase", "tRPC"],
    cta: { label: "Szczegóły", href: "#" },
    visual: "booking",
    accent: "#C9A74D",
  },
  {
    id: "ecommerce-premium",
    index: "03",
    title: "E-commerce Premium",
    description:
      "Headless e-commerce dla luksusowej marki odzieżowej z optymalizacją Core Web Vitals.",
    tags: ["Next.js", "Shopify API"],
    cta: { label: "Szczegóły", href: "#" },
    visual: "shop",
    accent: "#06B6D4",
  },
  {
    id: "premium-platforma",
    index: "04",
    title: "Premium Platforma",
    description:
      "Kompletna platforma z autorskim systemem zarządzania zamówieniami.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "#" },
    visual: "platform",
    accent: "#3B82F6",
  },
];
