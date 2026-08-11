/**
 * Definicje projektów AJAREK DEV.
 *
 * Dane i typy trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu sekcja „Wybrane projekty" korzysta z jednego źródła prawdy.
 * Przykładowe dane w formacie JSON: `public/data/projects.json`.
 */

/** Wariant wizualizacji miniatury karty (generowana w CSS). */
export type ProjectVisual = "dashboard" | "booking" | "shop" | "platform" | "luxe-auto";

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
    id: "ekommerce-stek",
    index: "01",
    title: "E-commerce Stek-Butik",
    description:
      "Sklep premium dla miłośników wołowiny, z systemem rezerwacji i powiadomieniami mailowymi o statusie zamówienia.",
    tags: ["NextJS", "Tailwind", "FireStore"],
    cta: { label: "Zobacz Aplikację", href: "https://next-16-ep-42-stek-butik.vercel.app/" },
    visual: "dashboard",
    accent: "#8069BF",
  },
  {
    id: "booking-glamping",
    index: "02",
    title: "Glamping Booking",
    description: "System rezerwacji premium z kalendarzem.",
    tags: ["Next.js", "Tailwind", "Supabase", "tRPC"],
    cta: { label: "Zobacz Aplikację", href: "https://next-16-ep-39-glamping.vercel.app/" },
    visual: "booking",
    accent: "#C9A74D",
  },
  {
    id: "ecommerce-jeans",
    index: "03",
    title: "E-commerce Jeans-Shop",
    description:
      "Sklep premium dla miłośników jeansu, z systemem rezerwacji i powiadomieniami mailowymi o statusie zamówienia.",
    tags: ["Next.js", "Stripe"],
    cta: { label: "Zobacz Aplikację", href: "https://next-16-ep-41-jeans-shop.vercel.app/" },
    visual: "shop",
    accent: "#06B6D4",
  },
  {
    id: "babcia-gotuje",
    index: "04",
    title: "Babcia Gotuje",
    description:
      "Platforma z potrawami babci, z systemem rezerwacji i powiadomieniami mailowymi o statusie zamówienia.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-38-babcia-gotuje.vercel.app/" },
    visual: "platform",
    accent: "#3B82F6",
  },
  {
    id: "luxe-auto",
    index: "05",
    title: "Luxe Auto",
    description:
      "Platforma z luksusowymi samochodami, z systemem rezerwacji i powiadomieniami mailowymi o statusie zamówienia.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-37-luxury-cars.vercel.app/" },
    visual: "luxe-auto",
    accent: "#1f1f1f",
  },
];
