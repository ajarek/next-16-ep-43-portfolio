import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer/footer";
import "./globals.css";

/**
 * DESIGN.md typography
 * - Primary UI / headings / body: Geist (400, 500, 600, 700)
 * - Code blocks: Geist Mono (prose: Interactive Code Block)
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AJAREK DEV",
    template: "%s | AJAREK DEV",
  },
  description:
    "Portfolio — high-performance craftsmanship with a future-noir aesthetic.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="font-sans text-body-md min-h-full flex flex-col">
        {/* Skrót klawiaturowy dla czytników ekranu i nawigacji z klawiatury. */}
        <a
          href="#start"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Przejdź do treści
        </a>
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
