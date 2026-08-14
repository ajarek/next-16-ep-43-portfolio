/**
 * Konfiguracja strony kontaktowej AJAREK DEV.
 *
 * Dane i walidacja trzymane są poza komponentami React (zasada z AGENTS.md),
 * dzięki czemu formularz, kanały i proces współpracy korzystają z jednego
 * źródła prawdy. Przykładowe dane: `public/data/contact.json`.
 */

/** Kanał komunikacji prezentowany w panelu bocznym. */
export type ContactChannelKind = "email" | "phone" | "github" | "linkedin"

export interface ContactChannel {
  readonly id: ContactChannelKind
  readonly label: string
  readonly value: string
  readonly href: string
  readonly hint: string
  readonly external: boolean
}

/** Krok procesu współpracy (01 → 03). */
export interface ContactProcessStep {
  readonly index: string
  readonly title: string
  readonly description: string
}

export interface ContactChoice {
  readonly id: string
  readonly label: string
}

export interface ContactAvailability {
  readonly label: string
  readonly timezone: string
  readonly timezoneIana: string
  readonly responseTime: string
  readonly location: string
}

export interface ContactConfig {
  readonly overline: string
  readonly path: string
  readonly heading: string
  readonly headingAccent: string
  readonly description: string
  readonly availability: ContactAvailability
  readonly channels: readonly ContactChannel[]
  readonly process: readonly ContactProcessStep[]
  readonly projectTypes: readonly ContactChoice[]
  readonly budgets: readonly ContactChoice[]
}

export const CONTACT: ContactConfig = {
  overline: "Kontakt",
  path: "~/kontakt",
  heading: "Napisz, zanim pomysł",
  headingAccent: "ostygnie",
  description:
    "Krótki brief wystarczy — bez formularzy-molochów. Odpowiadam osobiście, zwykle w ciągu jednego dnia roboczego.",
  availability: {
    label: "Dostępny do współpracy",
    timezone: "WAW",
    timezoneIana: "Europe/Warsaw",
    responseTime: "< 24 h",
    location: "Polska · zdalnie",
  },
  channels: [
    {
      id: "email",
      label: "E-mail",
      value: "ajarek2101@gmail.com",
      href: "mailto:ajarek2101@gmail.com",
      hint: "Najszybszy kanał na brief",
      external: false,
    },
    {
      id: "phone",
      label: "Telefon",
      value: "+48 573 219 230",
      href: "tel:+48573219230",
      hint: "Rozmowa, nie cold call",
      external: false,
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/ajarek",
      href: "https://github.com/ajarek",
      hint: "Kod i realizacje",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/ajarek",
      href: "https://www.linkedin.com/in/ajarek",
      hint: "Sieć i referencje",
      external: true,
    },
  ],
  process: [
    {
      index: "01",
      title: "Brief",
      description: "Cel, zakres i termin — nawet w trzech zdaniach.",
    },
    {
      index: "02",
      title: "Rozmowa",
      description: "Ustalamy architekturę, estetykę i realny budżet.",
    },
    {
      index: "03",
      title: "Build",
      description: "Iteracje, recenzje i wdrożenie bez zgadywania.",
    },
  ],
  projectTypes: [
    { id: "strona", label: "Strona" },
    { id: "sklep", label: "Sklep" },
    { id: "aplikacja", label: "Aplikacja" },
    { id: "redesign", label: "Redesign" },
    { id: "inne", label: "Inne" },
  ],
  budgets: [
    { id: "do-8k", label: "do 8 tys." },
    { id: "8-20k", label: "8–20 tys." },
    { id: "20-40k", label: "20–40 tys." },
    { id: "40k-plus", label: "40 tys.+" },
    { id: "do-ustalenia", label: "Do ustalenia" },
  ],
}

/** Pola formularza — klucze błędów walidacji. */
export type ContactField =
  | "name"
  | "email"
  | "projectType"
  | "budget"
  | "message"

export interface ContactPayload {
  readonly name: string
  readonly email: string
  readonly projectType: string
  readonly budget: string
  readonly message: string
}

export type ContactFieldErrors = Partial<Record<ContactField, string>>

export type ContactFormStatus = "idle" | "success" | "error"

export interface ContactFormState {
  readonly status: ContactFormStatus
  readonly message: string
  readonly fieldErrors: ContactFieldErrors
}

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_NAME = "company_url"

const PROJECT_TYPE_IDS = new Set(CONTACT.projectTypes.map((item) => item.id))
const BUDGET_IDS = new Set(CONTACT.budgets.map((item) => item.id))

/** Odczytuje i przycina pola formularza kontaktowego. */
export function parseContactForm(formData: FormData): ContactPayload {
  return {
    name: readField(formData, "name"),
    email: readField(formData, "email").toLowerCase(),
    projectType: readField(formData, "projectType"),
    budget: readField(formData, "budget"),
    message: readField(formData, "message"),
  }
}

/** Zwraca błędy walidacji albo pusty obiekt, gdy brief jest kompletny. */
export function validateContactPayload(
  payload: ContactPayload,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {}

  if (payload.name.length < 2) {
    errors.name = "Podaj imię — minimum dwa znaki."
  } else if (payload.name.length > 80) {
    errors.name = "Imię jest zbyt długie."
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    errors.email = "Podaj poprawny adres e-mail."
  }

  if (!PROJECT_TYPE_IDS.has(payload.projectType)) {
    errors.projectType = "Wybierz typ projektu."
  }

  if (payload.budget !== "" && !BUDGET_IDS.has(payload.budget)) {
    errors.budget = "Wybierz zakres budżetu albo pozostaw puste."
  }

  if (payload.message.length < 20) {
    errors.message = "Opisz pomysł — minimum 20 znaków."
  } else if (payload.message.length > 2000) {
    errors.message = "Wiadomość jest zbyt długa (maks. 2000 znaków)."
  }

  return errors
}

/** Ukryte pole antyspamowe — boty je wypełniają, ludzie nie. */
export function isHoneypotFilled(formData: FormData): boolean {
  return readField(formData, HONEYPOT_NAME).length > 0
}

export function hasFieldErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0
}

function readField(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}
