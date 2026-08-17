/**
 * Definicje projektów AJAREK DEV.
 *
 * Dane i typy trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu sekcja „Wybrane projekty" korzysta z jednego źródła prawdy.
 * Przykładowe dane w formacie JSON: `public/data/projects.json`.
 */

/** Wariant wizualizacji miniatury karty (generowana w CSS). */
export type ProjectVisual = "dashboard" | "booking" | "shop" | "platform" | "luxe-auto";

/** Dane obrazu miniatury projektu (używane przez `ProjectVisual`). */
export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
}

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
   * Obraz miniatury karty — jedno źródło prawdy dla `ProjectVisual`
   * (src i alt pobierane z definicji projektu, nie z komponentu).
   */
  readonly image: ProjectImage;
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
    image: { src: "/images/steck.jpg", alt: "Steck Butik" },
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
    image: { src: "/images/glamping.jpg", alt: "Glamping" },
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
    image: { src: "/images/jeans.jpg", alt: "E-commerce Premium" },
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
    image: { src: "/images/babcia-gotuje.jpg", alt: "Babcia Gotuje" },
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
    image: { src: "/images/luxe-auto.jpg", alt: "Luxe Auto" },
    accent: "#1f1f1f",
  },
  {
    id: "xbox-360",
    index: "06",
    title: "Xbox 360 Classic",
    description:
      "Sklep z grami na Konsolę Xbox 360.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-32-e-commerce-games.vercel.app" },
    visual: "shop",
    image: { src: "/images/xbox.jpg", alt: "Xbox 360" },
    accent: "#1f1f1f",
  },
  {
    id: "sklep-agd",
    index: "07",
    title: "Sklep AGD",
    description:
      "Sklep z artykułami AGD.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-35-sklep-household-goods.vercel.app/" },
    visual: "shop",
    image: { src: "/images/agd.jpg", alt: "AGD" },
    accent: "#3B82F6",
  },
  {
    id: "Pet-shop",
    index: "08",
    title: "Pet Shop",
    description:
      "Sklep z artykułami dla zwierząt.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-29-your-dog.vercel.app/" },
    visual: "shop",
    image: { src: "/images/pet.jpg", alt: "Your Dog" },
    accent: "#3B82F6",
  },
  {
    id: "city-attractions",
    index: "09",
    title: "Atrakcje Miasta",
    description:
      "Aplikacja z atrakcjami turystycznymi w mieście.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-21-city-attractions.vercel.app/" },
    visual: "shop",
    image: { src: "/images/city-attractions.jpg", alt: "Atrakcje Miasta" },
    accent: "#3B82F6",
  },
];

/**
 * Wszystkie unikalne technologie używane przez projekty (posortowane alfabetycznie).
 * Służy jako źródło chipów filtra na stronie projektów.
 */
export const PROJECT_TAGS: readonly string[] = [
  ...new Set(PROJECTS.flatMap((project) => project.tags)),
].sort((a, b) => a.localeCompare(b));

/** Kryteria filtrowania projektów (strona /projekty). */
export interface ProjectFilter {
  /** Fraza wyszukiwania — tytuł, opis lub technologia. */
  readonly query?: string;
  /** Dokładna technologia (tag); `null` oznacza wszystkie projekty. */
  readonly tag?: string | null;
}

/**
 * Filtrowanie projektów wg zapytania tekstowego i technologii.
 * Logika trzymana poza komponentami React (zasada z AGENTS.md).
 */
export function filterProjects(
  projects: readonly Project[],
  filter: ProjectFilter
): Project[] {
  const query = filter.query?.trim().toLowerCase() ?? "";

  return projects.filter((project) => {
    const matchesQuery =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query));
    const matchesTag = !filter.tag || project.tags.includes(filter.tag);

    return matchesQuery && matchesTag;
  });
}
