import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"

const PUBLIC_ROUTES = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/about-me", priority: 0.8 },
  { path: "/technologies", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(({ path, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority,
  }))
}
