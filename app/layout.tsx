import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer/footer"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"
import "./globals.css"

/**
 * DESIGN.md typography
 * - Primary UI / headings / body: Geist (400, 500, 600, 700)
 * - Code blocks: Geist Mono (prose: Interactive Code Block)
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: SITE_NAME,
      url: SITE_URL.toString(),
      image: new URL("/images/hero.png", SITE_URL).toString(),
      jobTitle: "Full-Stack i UI Developer",
      sameAs: [
        "https://github.com/ajarek",
        "https://linkedin.com/in/ajarek-calvert",
        "https://twitter.com/ajarek",
      ],
      knowsAbout: [
        "Tworzenie stron internetowych",
        "Aplikacje webowe",
        "Next.js",
        "React",
        "TypeScript",
        "Projektowanie interfejsów użytkownika",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL.toString(),
      inLanguage: "pl-PL",
      publisher: { "@id": `${SITE_URL}#person` },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "AJAREK DEV — Full-Stack i UI Developer",
    template: "%s | AJAREK DEV",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "AJAREK DEV — Full-Stack i UI Developer",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        alt: "Ilustracja webdevelopera pracującego nad aplikacją na laptopie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJAREK DEV — Full-Stack i UI Developer",
    description: SITE_DESCRIPTION,
    images: ["/images/hero.png"],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang='pl'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior='smooth'
    >
      <body className='font-sans text-body-md min-h-full flex flex-col'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {/* Skrót klawiaturowy dla czytników ekranu i nawigacji z klawiatury. */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground'
        >
          Przejdź do treści
        </a>
        <Navbar />
        <main id='main-content' className='flex flex-1 flex-col'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
