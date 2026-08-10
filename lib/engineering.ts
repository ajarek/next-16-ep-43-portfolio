/**
 * Definicje sekcji „Engineering" (technologie) AJAREK DEV.
 *
 * Dane i typy trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu sekcja korzysta z jednego źródła prawdy.
 * Przykładowe dane w formacie JSON: `public/data/engineering.json`.
 */

/** Pojedyncza technologia prezentowana w sekcji. */
export interface EngineeringTechnology {
  readonly name: string;
  /** Kolor akcentu technologii (logo). */
  readonly accent: string;
}

/** Element wizualny — obraz + parametry wyświetlania. */
export interface EngineeringImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface EngineeringCta {
  readonly label: string;
  readonly href: string;
}

export interface EngineeringConfig {
  /** Etykieta overline nad nagłówkiem. */
  readonly overline: string;
  /** Pierwsza linia nagłówka (kolor foreground). */
  readonly headingLine1: string;
  /** Druga linia nagłówka (kolor akcentu). */
  readonly headingAccent: string;
  readonly paragraphs: readonly string[];
  readonly technologies: readonly EngineeringTechnology[];
  readonly cta: EngineeringCta;
  readonly image: EngineeringImage;
}

export const ENGINEERING: EngineeringConfig = {
  overline: "Technologie",
  headingLine1: "Inżynieria spotyka",
  headingAccent: "Design",
  paragraphs: [
    "Jako Full-Stack Developer łączę głębokie zrozumienie architektury systemów z wrażliwością na detale interfejsu użytkownika. Wierzę, że najlepszy kod to ten, którego użytkownik nigdy nie zauważa – doświadcza tylko płynnego, bezbłędnego działania.",
    "Moje podejście opiera się na ciągłej optymalizacji. Od struktury bazy danych po renderowanie komponentów w przeglądarce, każdy etap to okazja do poprawy wydajności.",
  ],
  technologies: [
    { name: "REACT", accent: "#61DAFB" },
    { name: "NODE.JS", accent: "#83CD29" },
    { name: "NEXT.JS", accent: "#e6e0e9" },
    { name: "TYPESCRIPT", accent: "#3178C6" },
    { name: "PRISMA", accent: "#5A67D8" },
  ],
  cta: {
    label: "POBIERZ CV",
    href: "#",
  },
  image: {
    src: "/images/skill-hub.png",
    alt: "Centralny stos technologiczny — świecący sześcian otoczony ikonami React, Node.js, Next.js, TypeScript i Prisma",
    width: 1024,
    height: 1024,
  },
};
