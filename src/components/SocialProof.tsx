"use client"

import { useState, useEffect } from "react"

const socialProofs = [
  { action: "just purchased", card: "AI Agent Architecture", user: "a creator from Lagos" },
  { action: "generated a Knowledge Card", card: "Zero-to-SaaS in 30 Days", user: "a founder from Berlin" },
  { action: "earned $47.50 from", card: "Prompt Engineering Masterclass", user: "a solo builder" },
  { action: "just purchased", card: "Crypto DeFi Yield Strategies", user: "an investor from Dubai" },
  { action: "shared", card: "The Community-Led Growth Handbook", user: "a marketer from NYC" },
  { action: "just purchased", card: "Biohacking for Founders", user: "a founder from SF" },
]

export function SocialProof() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => setVisible(true), 5000)

    // Rotate notifications every 15 seconds
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % socialProofs.length)
        setVisible(true)
      }, 500)
    }, 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  if (!visible) return null

  const proof = socialProofs[current]

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 nexus-card p-3 z-40 max-w-xs transition-all duration-500 opacity-95">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse flex-shrink-0" />
        <p className="text-xs">
          <span className="text-[hsl(var(--muted-foreground))]">{proof.user}</span>{" "}
          {proof.action}{" "}
          <span className="text-[hsl(var(--primary))] font-medium">{proof.card}</span>
        </p>
      </div>
    </div>
  )
}
