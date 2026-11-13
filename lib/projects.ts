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
    image: {
      src: "/images/steck.jpg",
      alt: "Zrzut ekranu sklepu internetowego Stek-Butik z ofertą wołowiny",
    },
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
    image: {
      src: "/images/glamping.jpg",
      alt: "Widok strony rezerwacji pobytów glampingowych",
    },
    accent: "#C9A74D",
  },
  {
    id: "ecommerce-jeans",
    index: "03",
    title: "E-commerce Jeans-Shop",
    description:
      "Sklep internetowy z odzieżą jeansową i przejrzystą prezentacją kolekcji.",
    tags: ["Next.js", "Stripe"],
    cta: { label: "Zobacz Aplikację", href: "https://next-16-ep-41-jeans-shop.vercel.app/" },
    visual: "shop",
    image: {
      src: "/images/jeans.jpg",
      alt: "Zrzut ekranu sklepu internetowego z odzieżą jeansową",
    },
    accent: "#06B6D4",
  },
  {
    id: "babcia-gotuje",
    index: "04",
    title: "Babcia Gotuje",
    description:
      "Serwis kulinarny z przepisami i potrawami inspirowanymi domową kuchnią.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-38-babcia-gotuje.vercel.app/" },
    visual: "platform",
    image: {
      src: "/images/babcia-gotuje.jpg",
      alt: "Widok serwisu Babcia Gotuje z przepisami kulinarnymi",
    },
    accent: "#3B82F6",
  },
  {
    id: "luxe-auto",
    index: "05",
    title: "Luxe Auto",
    description:
      "Serwis prezentujący luksusowe samochody i ofertę marki Luxe Auto.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-37-luxury-cars.vercel.app/" },
    visual: "luxe-auto",
    image: {
      src: "/images/luxe-auto.jpg",
      alt: "Zrzut ekranu serwisu z ofertą luksusowych samochodów Luxe Auto",
    },
    accent: "#1f1f1f",
  },
  {
    id: "xbox-360",
    index: "06",
    title: "Xbox 360 Classic",
    description:
      "Sklep internetowy z grami i produktami dla konsoli Xbox 360.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-46-e-commerce-xbox360.vercel.app/store" },
    visual: "shop",
    image: {
      src: "/images/xbox.jpg",
      alt: "Widok sklepu Xbox 360 Classic z grami na konsolę Xbox 360",
    },
    accent: "#1f1f1f",
  },
  {
    id: "sklep-agd",
    index: "07",
    title: "Sklep AGD",
    description: "Sklep internetowy z artykułami gospodarstwa domowego.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-35-sklep-household-goods.vercel.app/" },
    visual: "shop",
    image: {
      src: "/images/agd.jpg",
      alt: "Zrzut ekranu sklepu internetowego z artykułami AGD",
    },
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
    image: {
      src: "/images/pet.jpg",
      alt: "Widok sklepu zoologicznego Your Dog z produktami dla zwierząt",
    },
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
    image: {
      src: "/images/city-attractions.jpg",
      alt: "Widok aplikacji prezentującej atrakcje turystyczne miasta",
    },
    accent: "#3B82F6",
  },
  {
    id: "luxe-bags",
    index: "10",
    title: "Luxe Bags",
    description: "Nowoczesna platforma e-commerce z produktami luksusowymi.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-45-handbag-shop.vercel.app/" },
    visual: "shop",
    image: {
      src: "/images/bags.png",
      alt: "Zrzut ekranu sklepu Luxe Bags z luksusowymi torebkami",
    },
    accent: "#262626"
  },
  {
    id: "finance-tracker",
    index: "11",
    title: "Finance Tracker",
    description: "Platforma monitorująca finanse osobiste.",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-47-finance-tracker-platf.vercel.app/" },
    visual: "shop",
    image: {
      src: "/images/finance-tracker.png",
      alt: "Widok aplikacji Finance Tracker do monitorowania finansów osobistych",
    },
    accent: "#262626"
  },
  {
    id: "driving-school",
    index: "12",
    title: "Driving School",
    description: "Platforma do prowadzenia szkolenia dla kierowców wszystkich kategorii",
    tags: ["Next.js", "Stripe", "Prisma"],
    cta: { label: "Szczegóły", href: "https://next-16-ep-48-szkola-jazdy.vercel.app/" },
    visual: "shop",
    image: {
      src: "/images/driving-school.png",
      alt: "Widok aplikacji driving school",
    },
    accent: "#262626"
  }
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
