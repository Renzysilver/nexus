"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { ShareCard } from "@/components/ShareCard"

interface MarketCard {
  id: string
  title: string
  summary: string
  price: number
  category: string
  likes: number
  purchases: number
  author: string
}

const featuredCards: MarketCard[] = [
  {
    id: "1",
    title: "AI Agent Architecture: Building Autonomous Systems",
    summary: "Learn how to design, build, and deploy AI agents that think and act independently. Covers tool use, memory systems, planning loops, and production deployment patterns.",
    price: 9.99,
    category: "AI & Machine Learning",
    likes: 234,
    purchases: 189,
    author: "nexus_ai_lab",
  },
  {
    id: "2",
    title: "Zero-to-SaaS in 30 Days: The Solo Founder Playbook",
    summary: "A step-by-step framework for building and launching a SaaS product as a solo founder. Includes pricing strategies, tech stack decisions, and first 100 customers playbook.",
    price: 7.99,
    category: "Productivity & Tools",
    likes: 189,
    purchases: 156,
    author: "solo_founder",
  },
  {
    id: "3",
    title: "Prompt Engineering Masterclass: From Zero to Expert",
    summary: "Master the art and science of prompting LLMs. Covers chain-of-thought, few-shot learning, system prompts, and advanced techniques for production-grade AI applications.",
    price: 5.99,
    category: "AI & Machine Learning",
    likes: 312,
    purchases: 247,
    author: "prompt_wizard",
  },
  {
    id: "4",
    title: "Biohacking for Founders: Optimize Your Brain",
    summary: "Evidence-based protocols for peak mental performance. Sleep optimization, nootropics, meditation frameworks, and nutrition strategies specifically designed for high-performers.",
    price: 4.99,
    category: "Health & Biotech",
    likes: 167,
    purchases: 134,
    author: "biofounder",
  },
  {
    id: "5",
    title: "Crypto DeFi Yield Strategies That Actually Work",
    summary: "Not financial advice — but real strategies generating real yields. Covers liquid staking, yield aggregation, delta-neutral positions, and risk management frameworks.",
    price: 14.99,
    category: "FinTech & Crypto",
    likes: 98,
    purchases: 76,
    author: "defi_researcher",
  },
  {
    id: "6",
    title: "The Community-Led Growth Handbook",
    summary: "How to build, nurture, and monetize online communities. From Discord server setup to community flywheel mechanics — everything you need to turn members into customers.",
    price: 6.99,
    category: "Social & Community",
    likes: 145,
    purchases: 112,
    author: "community_architect",
  },
]

const categories = [
  "All",
  "AI & Machine Learning",
  "Productivity & Tools",
  "Health & Biotech",
  "FinTech & Crypto",
  "Social & Community",
  "EdTech & Learning",
  "Sustainability & Green Tech",
  "Gaming & Entertainment",
]

export default function Marketplace() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set())
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [purchasedCard, setPurchasedCard] = useState<MarketCard | null>(null)

  // Check for purchase success from Stripe redirect (real Stripe mode)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("purchase") === "success") {
      toast.success("Payment successful! Your knowledge card is now available.")
      window.history.replaceState({}, "", "/marketplace")
    }
    if (params.get("purchase") === "cancelled") {
      toast.error("Payment cancelled.")
      window.history.replaceState({}, "", "/marketplace")
    }
  }, [])

  const filtered = featuredCards.filter((card) => {
    const matchSearch =
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.summary.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      activeCategory === "All" || card.category === activeCategory
    return matchSearch && matchCategory
  })

  const toggleLike = (id: string) => {
    setLikedCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handlePurchase = async (card: MarketCard) => {
    setPurchasing(card.id)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: card.id,
          cardTitle: card.title,
          price: card.price,
        }),
      })
      const data = await res.json()

      if (data.demoMode) {
        // Demo mode — show success modal instead of redirecting
        setPurchasedCard(card)
      } else if (data.url) {
        // Real Stripe — redirect to checkout
        window.location.href = data.url
      } else {
        toast.error(data.message || "Checkout failed")
      }
    } catch {
      toast.error("Checkout failed. Try again.")
    } finally {
      setPurchasing(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg nexus-gradient flex items-center justify-center font-bold text-white text-sm">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">
            NEX<span className="text-[hsl(var(--primary))]">US</span>
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2">Marketplace</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard" className="nexus-btn text-sm !py-2 !px-4">
            Create & Sell
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-6 py-12 text-center border-b border-[hsl(var(--border))]">
        <h1 className="text-4xl font-extrabold mb-3">
          Knowledge <span className="text-[hsl(var(--primary))]">Marketplace</span>
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-lg mx-auto">
          Discover and purchase structured knowledge cards created by the NEXUS community. 
          Every card is AI-enhanced and action-ready.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="px-6 py-4 border-b border-[hsl(var(--border))]">
        <div className="max-w-4xl mx-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge cards..."
            className="nexus-input mb-3"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              {filtered.length} card{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[hsl(var(--muted-foreground))]">
              <p className="text-lg mb-2">No cards match your search</p>
              <p className="text-sm">Try a different keyword or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((card) => (
                <div
                  key={card.id}
                  className="nexus-card p-6 flex flex-col"
                >
                  {/* Category & Price */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                      {card.category}
                    </span>
                    <span className="text-[hsl(var(--primary))] font-bold text-lg">
                      ${card.price}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <Link href={`/card/${card.id}`}>
                    <h3 className="font-bold mb-2 hover:text-[hsl(var(--primary))] transition-colors">{card.title}</h3>
                  </Link>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-3 flex-1 mb-4">
                    {card.summary}
                  </p>

                  {/* Author */}
                  <div className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                    by <Link href={`/creator/${card.author}`} className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">@{card.author}</Link>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--border))]">
                    <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                      <button
                        onClick={() => toggleLike(card.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          likedCards.has(card.id)
                            ? "text-[hsl(var(--destructive))]"
                            : "hover:text-[hsl(var(--destructive))]"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill={likedCards.has(card.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        {card.likes + (likedCards.has(card.id) ? 1 : 0)}
                      </button>
                      <span>{card.purchases} sold</span>
                    </div>
                    <ShareCard cardId={card.id} cardTitle={card.title} />
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handlePurchase(card)}
                    disabled={purchasing === card.id}
                    className="nexus-btn w-full mt-3 disabled:opacity-50"
                  >
                    {purchasing === card.id ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Purchase Success Modal (Demo Mode) */}
      {purchasedCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="nexus-card p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full nexus-gradient flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold mb-2">Purchase Complete!</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              You just unlocked a powerful knowledge card.
            </p>
            <div className="nexus-card p-4 mb-4 text-left">
              <div className="text-xs text-[hsl(var(--primary))] mb-1">{purchasedCard.category}</div>
              <div className="font-bold text-sm mb-2">{purchasedCard.title}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{purchasedCard.summary.substring(0, 100)}...</div>
              <div className="flex items-center justify-between">
                <span className="text-[hsl(var(--primary))] font-bold text-lg">${purchasedCard.price}</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">by @{purchasedCard.author}</span>
              </div>
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mb-4 px-2 py-2 rounded bg-[hsl(var(--secondary))]">
              Demo mode — add Stripe keys to .env for real payments
            </div>
            <button
              onClick={() => setPurchasedCard(null)}
              className="nexus-btn w-full"
            >
              Access Your Card
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
