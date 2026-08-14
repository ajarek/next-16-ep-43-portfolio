/**
 * Konfiguracja stopki AJAREK DEV.
 *
 * Dane trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu Footer korzysta z jednego źródła prawdy.
 * Przykładowe dane w formacie JSON: `public/data/footer.json`.
 */

export interface FooterLink {
  readonly label: string
  readonly href: string
  /** Zewnętrzne odnośniki otwierają się w nowej karcie. */
  readonly external: boolean
}

export interface FooterConfig {
  /** Krótki znak marki widoczny w stopce (bez „DEV"). */
  readonly brand: string
  /** Rok w napisie copyright. */
  readonly year: string
  /** Pełna nazwa w napisie copyright. */
  readonly name: string
  /** Tagline po prawej stronie napisu copyright. */
  readonly tagline: string
  readonly links: readonly FooterLink[]
}

export const FOOTER: FooterConfig = {
  brand: "AJAREK",
  year: "2026",
  name: "AJAREK DEV",
  tagline: "Built with precision.",
  links: [
    { label: "Github", href: "https://github.com/ajarek", external: true },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ajarek",
      external: true,
    },
    { label: "Twitter", href: "https://twitter.com/ajarek", external: true },
    { label: "Email", href: "mailto:ajarek2101@gmail.com", external: false },
  ],
}
