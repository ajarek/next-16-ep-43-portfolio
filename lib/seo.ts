import type { Metadata } from "next"

export const SITE_URL = new URL("https://next-16-ep-43-portfolio.vercel.app")
export const SITE_NAME = "AJAREK DEV"
export const SITE_DESCRIPTION =
  "Projektuję i wdrażam nowoczesne strony internetowe oraz aplikacje webowe. Full-Stack i UI Developer — Next.js, React, TypeScript i dopracowany interfejs."

interface PageMetadataInput {
  readonly title: string
  readonly description: string
  readonly path: `/${string}`
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
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
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/images/hero.png"],
    },
  }
}

