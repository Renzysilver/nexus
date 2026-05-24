"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface CreatorData {
  id: string
  name: string
  bio: string
  totalCards: number
  totalSales: number
  totalRevenue: number
  joinedDate: string
  cards: {
    id: string
    title: string
    category: string
    price: number
    likes: number
    purchases: number
  }[]
}

export default function CreatorProfilePage() {
  const params = useParams()
  const creatorId = params.id as string

  const [creator, setCreator] = useState<CreatorData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo creator profiles
    const creators: Record<string, CreatorData> = {
      nexus_ai_lab: {
        id: "nexus_ai_lab",
        name: "NEXUS AI Lab",
        bio: "AI research collective. We distill cutting-edge AI knowledge into actionable cards for builders and founders. 500+ cards published, 10K+ happy buyers.",
        totalCards: 47,
        totalSales: 3200,
        totalRevenue: 28450,
        joinedDate: "2024-06-15",
        cards: [
          { id: "1", title: "AI Agent Architecture: Building Autonomous Systems", category: "AI & Machine Learning", price: 9.99, likes: 234, purchases: 189 },
          { id: "3", title: "Prompt Engineering Masterclass", category: "AI & Machine Learning", price: 5.99, likes: 312, purchases: 247 },
        ],
      },
      solo_founder: {
        id: "solo_founder",
        name: "Solo Founder",
        bio: "Building in public. Sharing every lesson from 3 profitable SaaS exits. My cards are field-tested, not theoretical.",
        totalCards: 12,
        totalSales: 890,
        totalRevenue: 7120,
        joinedDate: "2024-09-01",
        cards: [
          { id: "2", title: "Zero-to-SaaS in 30 Days", category: "Productivity & Tools", price: 7.99, likes: 189, purchases: 156 },
        ],
      },
      biofounder: {
        id: "biofounder",
        name: "BioFounder",
        bio: "Health optimization nerd and startup founder. I read 200+ longevity papers so you don't have to. Evidence-based protocols only.",
        totalCards: 8,
        totalSales: 540,
        totalRevenue: 2695,
        joinedDate: "2025-01-10",
        cards: [
          { id: "4", title: "Biohacking for Founders", category: "Health & Biotech", price: 4.99, likes: 167, purchases: 134 },
        ],
      },
    }

    const found = creators[creatorId]
    if (found) {
      setCreator(found)
    } else {
      // Generic creator profile
      setCreator({
        id: creatorId,
        name: creatorId.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        bio: "NEXUS creator sharing knowledge and earning from structured insights.",
        totalCards: 5,
        totalSales: 120,
        totalRevenue: 850,
        joinedDate: "2025-03-01",
        cards: [],
      })
    }
    setLoading(false)
  }, [creatorId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[hsl(var(--muted-foreground))]">Loading creator...</div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Creator not found</h2>
          <Link href="/marketplace" className="text-[hsl(var(--primary))]">Back to Marketplace</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg nexus-gradient flex items-center justify-center font-bold text-white text-sm">N</div>
          <span className="text-xl font-bold tracking-tight">NEX<span className="text-[hsl(var(--primary))]">US</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Home</Link>
          <Link href="/marketplace" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Marketplace</Link>
          <Link href="/dashboard" className="nexus-btn text-sm !py-2 !px-4">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="nexus-card p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl nexus-gradient flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {creator.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold mb-2">@{creator.id}</h1>
              <p className="text-[hsl(var(--muted-foreground))] mb-4 max-w-lg">{creator.bio}</p>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-[hsl(var(--primary))] font-bold text-lg">{creator.totalCards}</span>
                  <span className="text-[hsl(var(--muted-foreground))] ml-1">cards</span>
                </div>
                <div>
                  <span className="text-[hsl(var(--primary))] font-bold text-lg">{creator.totalSales}</span>
                  <span className="text-[hsl(var(--muted-foreground))] ml-1">sales</span>
                </div>
                <div>
                  <span className="text-[hsl(var(--primary))] font-bold text-lg">${creator.totalRevenue.toLocaleString()}</span>
                  <span className="text-[hsl(var(--muted-foreground))] ml-1">earned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator's Cards */}
        <h2 className="text-xl font-bold mb-4">Knowledge Cards by @{creator.id}</h2>
        {creator.cards.length === 0 ? (
          <div className="nexus-card p-8 text-center">
            <p className="text-[hsl(var(--muted-foreground))] mb-4">This creator has not published cards yet.</p>
            <Link href="/marketplace" className="nexus-btn">Browse Marketplace</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creator.cards.map((card) => (
              <Link key={card.id} href={`/card/${card.id}`} className="nexus-card p-5 block">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">{card.category}</span>
                  <span className="text-[hsl(var(--primary))] font-bold">${card.price}</span>
                </div>
                <h3 className="font-bold text-sm mb-2">{card.title}</h3>
                <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{card.likes} likes</span>
                  <span>{card.purchases} sold</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
