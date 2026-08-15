/**
 * Definicje strony „Technologie" AJAREK DEV.
 *
 * Dane i logika trzymane są poza komponentami React (zasada z AGENTS.md).
 * Przykładowe dane w formacie JSON: `public/data/technologies.json`.
 */

/** Warstwa stosu — od fasady, której dotyka użytkownik, po atmosferę. */
export type TechnologyLayerId =
  | "facade"
  | "contract"
  | "engine"
  | "memory"
  | "flow"
  | "atmosphere";

/** Identyfikator ikony — mapowany na lucide-react w komponencie karty. */
export type TechnologyIconId =
  | "component"
  | "hexagon"
  | "braces"
  | "wind"
  | "server"
  | "database"
  | "flame"
  | "database-zap"
  | "cable"
  | "credit-card"
  | "sparkles"
  | "panels"
  | "shield"
  | "blend";

export interface TechnologyLayer {
  readonly id: TechnologyLayerId;
  readonly index: string;
  readonly title: string;
  readonly kicker: string;
  readonly description: string;
}

export interface Technology {
  readonly id: string;
  readonly name: string;
  readonly accent: string;
  readonly layer: TechnologyLayerId;
  readonly icon: TechnologyIconId;
  /** Krótka rola w jednym zdaniu. */
  readonly role: string;
  readonly description: string;
  /** Identyfikatory realizacji z `lib/projects.ts`. */
  readonly usedIn: readonly string[];
  /** Narzędzie używane w tym portfolio (nie tylko w realizacjach). */
  readonly inPortfolio: boolean;
}

export interface TechnologyPrinciple {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface TechnologiesPageConfig {
  readonly overline: string;
  readonly path: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly description: string;
  readonly manifesto: readonly string[];
  readonly codeCaption: string;
  readonly principlesHeading: string;
  readonly principles: readonly TechnologyPrinciple[];
  readonly cta: {
    readonly overline: string;
    readonly heading: string;
    readonly description: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel: string;
    readonly secondaryHref: string;
  };
}

export const TECHNOLOGY_LAYERS: readonly TechnologyLayer[] = [
  {
    id: "facade",
    index: "01",
    title: "Fasada",
    kicker: "Powierzchnia",
    description:
      "To, czego dotyka użytkownik — szkło, typografia i siatka. Komponenty serwerowe tam, gdzie cisza; klient tylko tam, gdzie ruch.",
  },
  {
    id: "contract",
    index: "02",
    title: "Kontrakt",
    kicker: "Język",
    description:
      'Typy i walidacja zamiast zgadywania. Strict mode pilnuje granic między formularzem, bazą i przyciskiem „kup".',
  },
  {
    id: "engine",
    index: "03",
    title: "Silnik",
    kicker: "Komunikacja",
    description:
      "Tam, gdzie kończy się przeglądarka, zaczyna się zamówienie. Procedury zamiast szumu w JSON-ie.",
  },
  {
    id: "memory",
    index: "04",
    title: "Pamięć",
    kicker: "Stan świata",
    description:
      "Dane, które przeżywają odświeżenie karty — rezerwacja namiotu, status steku, katalog aut.",
  },
  {
    id: "flow",
    index: "05",
    title: "Przepływ",
    kicker: "Pieniądze",
    description:
      "Checkout, który nie psuje nastroju. Od jeansów po konsolę — płatność bez tarcia.",
  },
  {
    id: "atmosphere",
    index: "06",
    title: "Atmosfera",
    kicker: "Światło",
    description:
      "Shader, siatka i spotlight pod kursorem. Future-noir bez ciężkich tekstur — tylko światło.",
  },
] as const;

export const TECHNOLOGIES: readonly Technology[] = [
  {
    id: "nextjs",
    name: "Next.js",
    accent: "#e6e0e9",
    layer: "facade",
    icon: "hexagon",
    role: "Kręgosłup każdej realizacji — App Router, RSC, metadane.",
    description:
      "Strona, która ładuje się, zanim użytkownik zdąży pomyśleć o spinnerze. Next.js 16 składa Stek-Butik, glamping i Luxe Auto z tych samych klocków: trasa, serwer, streaming.",
    usedIn: [
      "ekommerce-stek",
      "booking-glamping",
      "ecommerce-jeans",
      "babcia-gotuje",
      "luxe-auto",
      "xbox-360",
    ],
    inPortfolio: true,
  },
  {
    id: "react",
    name: "React",
    accent: "#61DAFB",
    layer: "facade",
    icon: "component",
    role: "Komponenty jak tafle szkła — składane, nie malowane.",
    description:
      "React 19 tam, gdzie potrzebna jest interakcja: wachlarz kart, filtry, formularz. Serwer oddaje resztę. Użytkownik widzi tylko płynność.",
    usedIn: [
      "ekommerce-stek",
      "booking-glamping",
      "ecommerce-jeans",
      "babcia-gotuje",
      "luxe-auto",
      "xbox-360",
    ],
    inPortfolio: true,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    accent: "#38BDF8",
    layer: "facade",
    icon: "wind",
    role: "Tokeny z DESIGN.md, nie magiczne liczby w klasach.",
    description:
      "Szkło, siatka i pigułki rosną z jednego systemu. Tailwind v4 trzyma Stek-Butik, glamping i to portfolio w tej samej geometrii 8 px.",
    usedIn: ["ekommerce-stek", "booking-glamping"],
    inPortfolio: true,
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    accent: "#cfbcff",
    layer: "facade",
    icon: "panels",
    role: "Przyciski, szuflada, focus — zanim pojawi się kolejny wariant.",
    description:
      "Dostępność i spójność bez własnego design systemu od zera. Gradientowa pigułka, drawer z lewej, stany fokusa — jeden zestaw, wiele powierzchni.",
    usedIn: [],
    inPortfolio: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    accent: "#3178C6",
    layer: "contract",
    icon: "braces",
    role: "Strict mode. Kontrakt zamiast zgadywania.",
    description:
      "Typy pilnują granic między briefem, schematem bazy i przyciskiem „kup”. Żadnego `any` — jeśli kształt się zmienia, kompilator krzyczy pierwszy.",
    usedIn: [
      "ekommerce-stek",
      "booking-glamping",
      "ecommerce-jeans",
      "babcia-gotuje",
      "luxe-auto",
      "xbox-360",
    ],
    inPortfolio: true,
  },
  {
    id: "zod",
    name: "Zod",
    accent: "#3068B7",
    layer: "contract",
    icon: "shield",
    role: "Walidacja na granicy — pusty brief nie przechodzi.",
    description:
      "Schemat zamiast ręcznych `if`. Formularz kontaktowy i przyszłe akcje serwera mówią tym samym językiem: albo dane są kompletne, albo wracają z błędem.",
    usedIn: [],
    inPortfolio: true,
  },
  {
    id: "nodejs",
    name: "Node.js",
    accent: "#83CD29",
    layer: "engine",
    icon: "server",
    role: "Silnik po drugiej stronie żądania.",
    description:
      "Tam kończy się przeglądarka, a zaczyna zamówienie, mail o statusie i zapis do bazy. Jeden runtime od skryptu po Server Action.",
    usedIn: [
      "ekommerce-stek",
      "booking-glamping",
      "ecommerce-jeans",
      "babcia-gotuje",
      "luxe-auto",
      "xbox-360",
    ],
    inPortfolio: true,
  },
  {
    id: "trpc",
    name: "tRPC",
    accent: "#398CCB",
    layer: "engine",
    icon: "cable",
    role: "Procedury zamiast zgadywania kształtów JSON-a.",
    description:
      "Klient i serwer podpisują ten sam kontrakt. W kalendarzu glampingu termin jest wolny albo zajęty — bez ręcznego uzgadniania typów na dwóch końcach.",
    usedIn: ["booking-glamping"],
    inPortfolio: false,
  },
  {
    id: "prisma",
    name: "Prisma",
    accent: "#5A67D8",
    layer: "memory",
    icon: "database",
    role: "Schemat jako jedyne źródło prawdy.",
    description:
      "Menu babci, katalog aut i półka z grami mówią tym samym językiem. Migracja zamiast zgadywania kolumn — model najpierw, zapytanie potem.",
    usedIn: ["babcia-gotuje", "luxe-auto", "xbox-360"],
    inPortfolio: false,
  },
  {
    id: "firestore",
    name: "Firestore",
    accent: "#FFCA28",
    layer: "memory",
    icon: "flame",
    role: "Dokumenty, które żyją w chmurze.",
    description:
      "Stek-Butik pamięta rezerwację, gdy karta się zamknie. Firebase trzyma stan zamówienia i powiadomienie mailowe bez własnego serwera bazy.",
    usedIn: ["ekommerce-stek"],
    inPortfolio: false,
  },
  {
    id: "supabase",
    name: "Supabase",
    accent: "#3ECF8E",
    layer: "memory",
    icon: "database-zap",
    role: "Baza i auth bez ceremonii.",
    description:
      "Kalendarz glampingu nie zgaduje, czy termin jest wolny. Postgres z interfejsem, który nie zabiera weekendu na infrastrukturę.",
    usedIn: ["booking-glamping"],
    inPortfolio: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    accent: "#635BFF",
    layer: "flow",
    icon: "credit-card",
    role: "Płatność, która nie psuje nastroju.",
    description:
      "Od Jeans-Shop przez Babcię Gotuje po Xbox 360 — checkout zamyka przepływ pieniędzy, a mail o statusie wychodzi, zanim ktoś odświeży stronę.",
    usedIn: ["ecommerce-jeans", "babcia-gotuje", "luxe-auto", "xbox-360"],
    inPortfolio: false,
  },
  {
    id: "webgl",
    name: "WebGL",
    accent: "#06B6D4",
    layer: "atmosphere",
    icon: "sparkles",
    role: "Światło zamiast tekstury.",
    description:
      "Shader szkła i spotlight pod kursorem. DESIGN.md każe budować głębię światłem — ten stos robi to w GPU, nie w kolejnym PNG.",
    usedIn: [],
    inPortfolio: true,
  },
  {
    id: "motion",
    name: "Ruch",
    accent: "#C9A74D",
    layer: "atmosphere",
    icon: "blend",
    role: "Animacja z umiarem — bez cyrku.",
    description:
      "Wachlarz kart, podkreślenie navbara, fade-in siatki. Ruch tłumaczy hierarchię, nie udaje atrakcji. Szanuje `prefers-reduced-motion`.",
    usedIn: [],
    inPortfolio: true,
  },
] as const;

export const TECHNOLOGIES_PAGE: TechnologiesPageConfig = {
  overline: "Stos",
  path: "~/technologie",
  heading: "Kod, którego nikt",
  headingAccent: "nie zauważa",
  description:
    "Narzędzia nie są kolekcją logotypów — to warstwy jednego systemu. Od szklanej fasady, której dotyka użytkownik, po pamięć, która przeżywa odświeżenie karty.",
  manifesto: [
    "Jako Full-Stack Developer nie wybieram technologii, bo są głośne. Wybieram je, bo znikają. React i Next.js budują powierzchnię, TypeScript pilnuje kontraktu, a Prisma, Firestore i Supabase trzymają stan świata, gdy karta się zamyka.",
    "W realizacjach — od Stek-Butiku po Luxe Auto — ten sam kręgosłup obsługuje sklep, rezerwację i płatność. Stripe zamyka przepływ pieniędzy, tRPC skraca drogę między klientem a serwerem, a WebGL i siatka nadają interfejsowi ten sam oddech, który chcę oddać produktom klientów.",
  ],
  codeCaption: "stack.ts — deklaracja, nie wishlist",
  principlesHeading: "Jak wybieram narzędzia",
  principles: [
    {
      index: "01",
      title: "Niewidzialność",
      description:
        "Najlepszy kod to ten, którego użytkownik nigdy nie zauważa — doświadcza tylko płynnego, bezbłędnego działania.",
    },
    {
      index: "02",
      title: "Ciągła optymalizacja",
      description:
        "Od struktury bazy po pierwszy piksel w przeglądarce. Każdy etap to okazja, nie formalność.",
    },
    {
      index: "03",
      title: "Jeden kręgosłup",
      description:
        "Ten sam stos dźwiga e-commerce, kalendarz rezerwacji i platformę premium. Zmienia się treść, nie fundament.",
    },
  ],
  cta: {
    overline: "Współpraca",
    heading: "Masz pomysł, który potrzebuje tego stosu?",
    description:
      "Krótki brief wystarczy. Dobierzemy warstwy do celu — bez półki z logotypami „na wszelki wypadek”.",
    primaryLabel: "Napisz brief",
    primaryHref: "/contact",
    secondaryLabel: "Zobacz realizacje",
    secondaryHref: "/projects",
  },
};

/** Kryteria filtrowania narzędzi na stronie `/technologies`. */
export interface TechnologyFilter {
  readonly query?: string;
  readonly layer?: TechnologyLayerId | null;
}

/** Filtrowanie narzędzi wg frazy i warstwy stosu. */
export function filterTechnologies(
  technologies: readonly Technology[],
  filter: TechnologyFilter,
): Technology[] {
  const query = filter.query?.trim().toLowerCase() ?? "";

  return technologies.filter((technology) => {
    const layer = getTechnologyLayer(technology.layer);
    const matchesQuery =
      !query ||
      technology.name.toLowerCase().includes(query) ||
      technology.role.toLowerCase().includes(query) ||
      technology.description.toLowerCase().includes(query) ||
      layer.title.toLowerCase().includes(query) ||
      layer.kicker.toLowerCase().includes(query);
    const matchesLayer = !filter.layer || technology.layer === filter.layer;

    return matchesQuery && matchesLayer;
  });
}

export function getTechnologyLayer(id: TechnologyLayerId): TechnologyLayer {
  const layer = TECHNOLOGY_LAYERS.find((item) => item.id === id);
  if (!layer) {
    throw new Error(`Nieznana warstwa stosu: ${id}`);
  }
  return layer;
}

export function countTechnologiesInLayer(
  technologies: readonly Technology[],
  layerId: TechnologyLayerId,
): number {
  return technologies.filter((technology) => technology.layer === layerId)
    .length;
}

/** Liczba unikalnych realizacji, w których pojawia się choć jedno narzędzie. */
export function countLinkedProjects(
  technologies: readonly Technology[],
): number {
  return new Set(technologies.flatMap((technology) => technology.usedIn)).size;
}
