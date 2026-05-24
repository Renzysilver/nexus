import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    // Card pages would be dynamically generated in production
    { url: `${baseUrl}/card/1`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/card/2`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/card/3`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    // Creator profiles
    { url: `${baseUrl}/creator/nexus_ai_lab`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/creator/solo_founder`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ]
}
