import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/sonner"
import { SocialProof } from "@/components/SocialProof"
import { InstallPrompt } from "@/components/InstallPrompt"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "NEXUS — Knowledge Commerce Engine",
    template: "%s | NEXUS",
  },
  description:
    "Transform raw ideas into monetizable knowledge. AI-powered idea evaluation, structured knowledge cards, and a marketplace for creators.",
  manifest: "/manifest.json",
  keywords: [
    "knowledge commerce",
    "AI ideas",
    "knowledge cards",
    "creator economy",
    "monetize ideas",
    "idea evaluation",
    "digital products",
    "solo founder",
  ],
  authors: [{ name: "NEXUS" }],
  creator: "NEXUS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexus.app",
    title: "NEXUS — Knowledge Commerce Engine",
    description:
      "Transform raw ideas into monetizable knowledge. AI-powered. Creator-first.",
    siteName: "NEXUS",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "NEXUS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS — Knowledge Commerce Engine",
    description:
      "Transform raw ideas into monetizable knowledge. AI-powered. Creator-first.",
    images: ["/icon-512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NEXUS",
  },
}

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
        <SocialProof />
        <InstallPrompt />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
