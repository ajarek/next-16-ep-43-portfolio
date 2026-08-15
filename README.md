Projekt portfolio AJAREK DEV - Nowoczesny, minimalistyczny design inspirowany liderami branży jak Apple i Vercel, wykorzystując najnowsze technologie (Next.js, Tailwind CSS v4, Motion).

Kluczowe elementy projektu:

Immersyjne tło: Zastosowałem shader WebGL, który generuje subtelne gradienty, siatkę (grid) oraz interaktywny efekt „spotlight” podążający za kursorem.
Wachlarz projektów: Stworzyłem charakterystyczną sekcję z nachodzącymi na siebie kartami, które ożywają po najechaniu myszką, wysuwając się i rozświetlając.
Hero z dynamiką: Sekcja powitalna zawiera animowane liczniki statystyk oraz trójwymiarową reprezentację stosu technologicznego z unoszącymi się kartami (React, Next.js, itp.).
Interaktywność Motion: Każda sekcja posiada animacje wejścia (fade-up), a interfejs reaguje na użytkownika poprzez płynne przejścia i efekty szklanej tafli (Glassmorphism).
Kompletna struktura: Portfolio zawiera sekcje technologii, procesu współpracy, opinii klientów oraz czytelne CTA, zachowując spójność wizualną z brandem AJAREK DEV.

## Nawigacja (Navbar)

Navbar jest osadzony globalnie w `app/layout.tsx` (nad `<main>`), przyklejony do górnej krawędzi i odwzorowuje wzorzec `public/patterns/navbar.png`:
logotyp `</>` + AJAREK DEV, wyśrodkowane linki (Start · Projekty · Technologie · O mnie · Kontakt), ikona `<>` z odnośnikiem do repozytorium oraz gradientowa pigułka „Skontaktuj się”.

Struktura plików:

- `components/navbar/index.tsx` — komponent serwerowy składający całość.
- `components/navbar/navbar-shell.tsx` — klient; szklane tło po przewinięciu (`backdrop-blur`) i gradientowy pasek postępu czytania.
- `components/navbar/desktop-nav.tsx` — klient; linki z animowanym, świecącym podkreśleniem aktywnej sekcji.
- `components/navbar/mobile-nav.tsx` — klient; menu wysuwane płynnie z **lewej** krawędzi (Base UI `Drawer`: pułapka fokusa, blokada przewijania, gest swipe, obsługa `Esc`).
- `components/navbar/brand.tsx` — znak marki współdzielony przez navbar i menu mobilne.
- `lib/navigation.ts` — jedyne źródło prawdy dla pozycji menu, CTA i odnośników społecznościowych (przykładowe dane: `public/data/navigation.json`).
- `hooks/use-active-section.ts`, `hooks/use-scroll-progress.ts` — logika scroll spy oraz postępu przewijania poza komponentami.

Przycisk CTA korzysta z rozszerzonego `components/ui/button.tsx` (wariant `gradient`, rozmiar `pill`), dzięki czemu style pozostają w jednym miejscu.

## Sekcja „Wybrane projekty" (Wachlarz)

Sekcja `id="projekty"` odwzorowuje wzorzec `public/patterns/selected-projects.png` i stanowi interaktywną galerię:

- `components/selected-projects/selected-projects.tsx` — komponent kliencki; na desktopie karty układają się w nachodzący na siebie wachlarz 3D (hover rozwiera łuk i rozświetla kartę, kliknięcie ustawia ją na przodzie), na mobile działają jako karuzela ze scroll snap.
- `components/selected-projects/project-card.tsx` — szklana karta projektu (DESIGN.md → „Glass Cards").
- `components/selected-projects/project-visual.tsx` — miniatury generowane w CSS (dashboard, kalendarz, sklep, platforma), napędzane kolorem akcentu projektu.
- `lib/projects.ts` — typy i dane projektów (jedno źródło prawdy; przykładowe dane: `public/data/projects.json`).

## Sekcja „Engineering" (Technologie)

Sekcja `id="technologie"` odwzorowuje wzorzec `public/patterns/engineering.png`:

- `components/engineering/engineering-section.tsx` — komponent serwerowy; dwie kolumny: po lewej grafika `public/images/skill-hub.png` w szklanej ramie z poświatą i siatką „developerską" (hover powiększa i rozjaśnia grafikę), po prawej nagłówek, opis podejścia, chipy technologii z kolorami logotypów oraz przyciski „Pełny stos" (`/technologies`) i „POBIERZ CV".
- `lib/engineering.ts` — typy i dane sekcji (jedno źródło prawdy; przykładowe dane: `public/data/engineering.json`).

## Strona „Technologie" (`/technologies`)

Pełny kontekst stosu — warstwy od fasady po atmosferę, nie ściana logotypów:

- `app/technologies/page.tsx` — strona serwerowa; manifest, eksplorator, zasady wyboru i CTA.
- `components/technologies/stack-manifest.tsx` — skill-hub, siatka warstw i okno `stack.ts`.
- `components/technologies/technologies-explorer.tsx` — klient; wyszukiwarka i filtr warstw.
- `components/technologies/technology-card.tsx` — szklana karta narzędzia z powiązanymi realizacjami.
- `lib/technologies.ts` — typy, warstwy, narzędzia i filtrowanie (przykładowe dane: `public/data/technologies.json`).

## Stopka (Footer)

Stopka jest osadzona globalnie w `app/layout.tsx` (pod `<main>`) i odwzorowuje wzorzec `public/patterns/footer.png`:

- `components/footer/footer.tsx` — pojedynczy rząd: marka `</>` + AJAREK po lewej, linki społecznościowe (Github, LinkedIn, Twitter, Email) z animowanym podkreśleniem w środku, złoty napis copyright po prawej; niemal czarne tło z siatką „developerską" i gradientową linią u góry.
- `lib/footer.ts` — typy i dane stopki (jedno źródło prawdy; przykładowe dane: `public/data/footer.json`).


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
