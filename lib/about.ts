/**
 * Definicje danych i konfiguracji dla strony „O mnie” (~/o-mnie) AJAREK DEV.
 *
 * Zgodnie z zasadami projektu (AGENTS.md), cała logika biznesowa, typy
 * i konfiguracje są trzymane poza komponentami React.
 * Odpowiadające dane w formacie JSON znajdują się w `public/data/about.json`.
 */

export interface AboutPageHeader {
  readonly overline: string;
  readonly path: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly description: string;
}

export interface AboutStat {
  readonly label: string;
  readonly value: string;
}

export interface AboutManifesto {
  readonly title: string;
  readonly subtitle: string;
  readonly paragraphs: readonly string[];
}

export interface DeveloperProfileData {
  readonly fileName: string;
  readonly code: string;
}

export interface AboutValue {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
}

export interface AboutMilestone {
  readonly period: string;
  readonly role: string;
  readonly scope: string;
  readonly summary: string;
}

export interface AboutWorkflowStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface AboutPassion {
  readonly title: string;
  readonly description: string;
}

export interface AboutCta {
  readonly overline: string;
  readonly heading: string;
  readonly description: string;
  readonly primaryLabel: string;
  readonly primaryHref: string;
  readonly secondaryLabel: string;
  readonly secondaryHref: string;
}

export interface AboutConfig {
  readonly page: AboutPageHeader;
  readonly stats: readonly AboutStat[];
  readonly manifesto: AboutManifesto;
  readonly developerProfile: DeveloperProfileData;
  readonly values: readonly AboutValue[];
  readonly milestones: readonly AboutMilestone[];
  readonly workflow: readonly AboutWorkflowStep[];
  readonly passions: readonly AboutPassion[];
  readonly cta: AboutCta;
}

export const ABOUT_DATA: AboutConfig = {
  page: {
    overline: "O mnie",
    path: "~/o-mnie",
    heading: "Architektura cyfrowych",
    headingAccent: "doświadczeń",
    description:
      "Łączę inżynierię oprogramowania z estetyką future-noir. Tworzę bezkompromisowo szybkie, responsywne i dopracowane wizualnie aplikacje webowe nowej generacji.",
  },
  stats: [
    { label: "Lokalizacja", value: "Polska · Zdalnie" },
    { label: "Stos główny", value: "Next.js · React · TS" },
    { label: "Dostępność", value: "Nowe projekty" },
  ],
  manifesto: {
    title: "Manifest inżynierski",
    subtitle: "Rzemiosło, estetyka i precyzja",
    paragraphs: [
      "Jako Full-Stack & UI Developer nie traktuję kodu wyłącznie jako instrukcji dla przeglądarki. Dla mnie to narzędzie rzemieślnicze, które pozwala przekształcać złożone wymagania biznesowe w intuicyjne, wysoce responsywne i zachwycające produkty cyfrowe.",
      "Moje projekty wyróżniają się dbałością o każdy mikroszczegół: od czasu pierwszej odpowiedzi serwera (TTFB) i architektury komponentów serwerowych React 19, po subtelne załamania światła w shaderach WebGL, responsywną typografię oraz płynne mikroanimacje.",
      "Wierzę, że najlepsze oprogramowanie powstaje na styku skrajnej dyscypliny technicznej i artystycznej wrażliwości na doświadczenie użytkownika.",
    ],
  },
  developerProfile: {
    fileName: "developer.config.ts",
    code: `export const developer: DeveloperProfile = {
  alias: 'AJAREK DEV',
  role: 'Full-Stack & UI Developer',
  location: 'Polska (CET / UTC+1)',
  stack: {
    core: ['TypeScript', 'React 19', 'Next.js 16'],
    styling: ['Tailwind CSS v4', 'Design Systems', 'WebGL'],
    backend: ['Node.js', 'PostgreSQL', 'Prisma', 'Firebase'],
    architecture: ['Server Components', 'Server Actions', 'Type-Safety']
  },
  principles: [
    'Pixel-perfect precision',
    'Sub-100ms interactions',
    'Clean & maintainable code',
    'Empathetic user experience'
  ],
  status: 'Ready for ambitious challenges'
};`,
  },
  values: [
    {
      index: "01",
      title: "Estetyka & Detal UI",
      description:
        "Projektuję interfejsy oparte na design systemach, glassmorphismie i spójnej hierarchii. Każdy przycisk, cień i gradient mają swoje uzasadnienie w ergonomii.",
      tag: "Design Systems",
    },
    {
      index: "02",
      title: "Wydajność Core Web Vitals",
      description:
        "Zero zbędnego narzutu JavaScriptu. Wykorzystuję React Server Components, streaming i optymalizację zasobów, aby aplikacja ładowała się natychmiastowo.",
      tag: "Performance",
    },
    {
      index: "03",
      title: "Ścisła dyscyplina typów",
      description:
        "TypeScript w trybie strict, walidacja schematami Zod i bezpieczny kontrakt danych pomiędzy backendem a frontendem eliminują błędy jeszcze przed wdrożeniem.",
      tag: "Type-Safety",
    },
    {
      index: "04",
      title: "Myślenie produktowe",
      description:
        "Kod to środek do celu. Zawsze analizuję cele biznesowe, ścieżki konwersji i potrzeby użytkowników, tworząc rozwiązania, które realnie przynoszą wartość.",
      tag: "Business Value",
    },
  ],
  milestones: [
    {
      period: "Krok 1",
      role: "Fundamenty & Fascynacja Webem",
      scope: "Architektura Frontendu & UI/UX",
      summary:
        "Budowanie solidnych fundamentów w nowoczesnym JavaScript, React oraz projektowaniu semantycznych, dostępnych interfejsów użytkownika z naciskiem na responsywność.",
    },
    {
      period: "Krok 2",
      role: "Ekosystem Full-Stack & SSR",
      scope: "Next.js, Node.js & Bazy Danych",
      summary:
        "Rozszerzenie kompetencji o pełny stos full-stack: integracje baz danych PostgreSQL/Prisma, Firebase/Supabase, uwierzytelnianie, API oraz serwerowe renderowanie.",
    },
    {
      period: "Krok 3",
      role: "E-Commerce & Systemy Płatności",
      scope: "Stripe, Headless E-Commerce & Skalowalność",
      summary:
        "Projektowanie i wdrażanie zaawansowanych platform e-commerce z obsługą płatności Stripe, webhookami, koszykami czasu rzeczywistego i optymalizacją Core Web Vitals.",
    },
    {
      period: "Krok 4",
      role: "Nowoczesna Architektura & WebGL",
      scope: "Next.js 16, React 19, Shader Arts & AI",
      summary:
        "Wdrażanie najnowszego App Routera, Server Actions, zaawansowanych efektów optycznych WebGL Glass oraz integracji nowoczesnych narzędzi wspomagających produktywność.",
    },
  ],
  workflow: [
    {
      step: "01",
      title: "Odkrycie & Architektura",
      description:
        "Precyzyjna definicja wymagań, dobór technologii, modelowanie struktur danych i zaplanowanie architektury systemu.",
    },
    {
      step: "02",
      title: "Prototyp & Design System",
      description:
        "Przygotowanie tokensów projektowych, palety kolorów, typografii i responsywnego szkieletu komponentów UI.",
    },
    {
      step: "03",
      title: "Implementacja & Animacje",
      description:
        "Pisanie czystego, bezpiecznego typami kodu z wykorzystaniem Server Components, Server Actions i mikroanimacji.",
    },
    {
      step: "04",
      title: "Audyt, Testy & Wdrożenie",
      description:
        "Testy wydajności, optymalizacja SEO i Core Web Vitals oraz automatyczne wdrożenie na infrastrukturę brzegową.",
    },
  ],
  passions: [
    {
      title: "Shadery & Kreatywny Kod",
      description:
        "Eksperymenty z WebGL, raymarchingiem i generatywnym oświetleniem w przeglądarce.",
    },
    {
      title: "Optymalizacja & Developer Tooling",
      description:
        "Nieustanne doskonalenie środowiska pracy, automatyzacji i pipeline'ów CI/CD.",
    },
    {
      title: "Nowe trendy w AI & LLM",
      description:
        "Badanie możliwości integracji modeli językowych w aplikacjach webowych.",
    },
  ],
  cta: {
    overline: "Współpraca",
    heading: "Stwórzmy razem coś wyjątkowego",
    description:
      "Masz pomysł na aplikację, potrzebujesz przebudowy istniejącego serwisu lub szukasz inżyniera do zespołu? Porozmawiajmy o szczegółach.",
    primaryLabel: "Napisz do mnie",
    primaryHref: "/contact",
    secondaryLabel: "Zobacz projekty",
    secondaryHref: "/projects",
  },
};
