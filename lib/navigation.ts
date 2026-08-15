/**
 * Konfiguracja nawigacji AJAREK DEV.
 *
 * Logika i dane trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu Navbar oraz wysuwane menu mobilne korzystają z jednego źródła prawdy.
 */

/** Identyfikator sekcji na stronie głównej — używany też przez obserwator sekcji. */
export type NavSectionId =
  | "start"
  | "projekty"
  | "technologie"
  | "o-mnie"
  | "kontakt"

export interface NavLink {
  /** Identyfikator sekcji (element `id` w DOM). */
  readonly id: NavSectionId
  /** Etykieta widoczna w nawigacji. */
  readonly label: string
  /** Kotwica do sekcji na stronie głównej. */
  readonly href: string
  /** Krótki opis — czytniki ekranu oraz menu mobilne. */
  readonly description: string
}

export interface SocialLink {
  readonly label: string
  readonly href: string
  /** Zewnętrzne odnośniki otwierają się w nowej karcie. */
  readonly external: boolean
}

export interface BrandConfig {
  readonly name: string
  readonly href: string
  readonly tagline: string
}

export const BRAND = {
  name: "AJAREK DEV",
  href: "/",
  tagline: "Portfolio front-end developera",
} as const satisfies BrandConfig

export const NAV_LINKS: readonly NavLink[] = [
  {
    id: "start",
    label: "Start",
    href: "/",
    description: "Powrót na początek strony",
  },
  {
    id: "projekty",
    label: "Projekty",
    href: "/projects",
    description: "Wybrane realizacje i case studies",
  },
  {
    id: "technologie",
    label: "Technologie",
    href: "/technologies",
    description: "Stos technologiczny i narzędzia",
  },
  {
    id: "o-mnie",
    label: "O mnie",
    href: "/#o-mnie",
    description: "Doświadczenie i proces współpracy",
  },
  {
    id: "kontakt",
    label: "Kontakt",
    href: "/contact",
    description: "Napisz i omówmy Twój projekt",
  },
] as const

/**
 * Stabilna (modułowa) lista identyfikatorów sekcji.
 * Referencja nie zmienia się między renderami, więc można ją bezpiecznie
 * przekazać do tablicy zależności `useEffect`.
 */
export const NAV_SECTION_IDS: readonly NavSectionId[] = NAV_LINKS.map(
  (link) => link.id,
)

/** Sekcja aktywna zanim obserwator przewijania zdąży cokolwiek wykryć. */
export const DEFAULT_SECTION_ID: NavSectionId = NAV_LINKS[0].id

/** Główne wezwanie do działania z prawej strony navbara. */
export const CONTACT_CTA = {
  label: "Skontaktuj się",
  shortLabel: "Kontakt",
  href: "/contact",
} as const

/** Odnośnik do repozytorium — ikona `<>` obok przycisku CTA. */
export const SOURCE_CODE_LINK: SocialLink = {
  label: "Kod źródłowy na GitHubie",
  href: "https://github.com/ajarek",
  external: true,
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/ajarek", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ajarek",
    external: true,
  },
  { label: "E-mail", href: "mailto:ajarek2101@gmail.com", external: false },
] as const

/** Komunikat o dostępności prezentowany w menu mobilnym. */
export const AVAILABILITY_LABEL = "Dostępny do współpracy"

/** Czy dany odnośnik odpowiada aktualnie oglądanej sekcji. */
export function isNavLinkActive(
  link: NavLink,
  activeSectionId: NavSectionId,
): boolean {
  return link.id === activeSectionId
}

/** Numeracja pozycji menu w stylu „01", „02" (monospace w widoku mobilnym). */
export function formatNavIndex(index: number): string {
  return String(index + 1).padStart(2, "0")
}
