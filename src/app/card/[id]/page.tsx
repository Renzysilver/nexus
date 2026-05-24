"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { ShareCard } from "@/components/ShareCard"

interface CardData {
  id: string
  title: string
  summary: string
  keyInsights: string
  frameworks: string
  actionSteps: string
  price: number
  category: string
  likes: number
  purchases: number
}

interface ReviewData {
  id: string
  rating: number
  comment: string | null
  userName: string | null
  createdAt: string
}

export default function CardDetailPage() {
  const params = useParams()
  const cardId = params.id as string

  const [card, setCard] = useState<CardData | null>(null)
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [recommendations, setRecommendations] = useState<{ id: string; title: string; category: string; price: number; purchases: number }[]>([])

  useEffect(() => {
    // In production, fetch from API. For now, use marketplace data or generated cards
    // Check if the card is from a featured set
    const featuredCards = [
      {
        id: "1",
        title: "AI Agent Architecture: Building Autonomous Systems",
        summary: "A comprehensive breakdown of AI agent architecture — covering the core problem, the AI landscape, and actionable strategies to move from concept to execution. This card distills the essential knowledge you need to validate, build, and deploy autonomous AI systems.",
        keyInsights: "• Market timing: Peak — AI Agents are trending upward with explosive demand\n• The #1 mistake creators make: building before validating demand\n• Your unfair advantage: domain knowledge + AI-powered execution speed\n• Price sensitivity: $9.99 is the sweet spot for premium knowledge purchases\n• Network effects kick in at 100+ purchases — focus on distribution first",
        frameworks: "1. VALIDATE: Test the idea with 10 potential buyers before building anything\n2. STRUCTURE: Package your knowledge into the 5-chapter NEXUS format\n3. PRICE: Start at $9.99, increase based on demand signals\n4. LAUNCH: Share on 3 platforms simultaneously (Twitter, Reddit, Discord)\n5. ITERATE: Use purchase data and feedback to refine the card weekly",
        actionSteps: "→ Week 1: Validate with 10 target users. Collect pain points.\n→ Week 2: Write the knowledge card. Use the NEXUS template.\n→ Week 3: Set up your marketplace listing. Price at $9.99.\n→ Week 4: Launch to your network. Aim for 10 first sales.\n→ Month 2: Optimize based on reviews. Consider premium tier at $19.99.",
        price: 9.99,
        category: "AI & Machine Learning",
        likes: 234,
        purchases: 189,
      },
      {
        id: "2",
        title: "Zero-to-SaaS in 30 Days: The Solo Founder Playbook",
        summary: "Everything you need to know about building a SaaS product as a solo founder in one structured card. From market opportunity to step-by-step execution frameworks, this is your shortcut from idea to income.",
        keyInsights: "• The SaaS market is consolidating — niche positioning beats broad plays\n• Early adopters pay premium for structured, actionable knowledge\n• Content moats are built through unique data, not just information\n• High willingness-to-pay detected in target segment\n• Community-driven distribution can reduce CAC by 70%",
        frameworks: "1. PROBLEM-SOLUTION FIT: Confirm the pain point exists (3 customer interviews minimum)\n2. KNOWLEDGE EXTRACTION: Document everything you know about this space\n3. CARD ARCHITECTURE: Structure insights using the NEXUS framework\n4. PRICING STRATEGY: Value-based pricing anchored to outcome, not time\n5. GROWTH LOOP: Every buyer becomes a potential referrer (10% commission)",
        actionSteps: "→ Day 1-3: Research top 5 competitors in this space. Note gaps.\n→ Day 4-7: Create your knowledge card draft. Focus on unique insights.\n→ Day 8-10: Get 3 beta readers. Incorporate feedback.\n→ Day 11-14: Publish on NEXUS marketplace. Set competitive price.\n→ Day 15-30: Promote daily. Track conversion rates. Iterate.",
        price: 7.99,
        category: "Productivity & Tools",
        likes: 189,
        purchases: 156,
      },
      {
        id: "3",
        title: "Prompt Engineering Masterclass: From Zero to Expert",
        summary: "The definitive knowledge card for prompt engineering. We've analyzed the AI landscape, identified the key leverage points, and packaged the insights into an actionable framework you can execute today.",
        keyInsights: "• Prompt engineering is the #1 in-demand AI skill in 2025\n• Most people use 10% of LLM capabilities — structured prompts unlock the rest\n• Chain-of-thought prompting improves accuracy by 40-60%\n• System prompts are the secret weapon — most users ignore them\n• Enterprise prompt engineers charge $150-300/hour",
        frameworks: "1. FOUNDATION: Understand token prediction and context windows\n2. TECHNIQUES: Master CoT, few-shot, self-consistency, and ReAct patterns\n3. SYSTEM DESIGN: Build reusable prompt templates with variables\n4. TESTING: A/B test prompts with measurable output criteria\n5. PRODUCTION: Deploy prompts with fallback chains and monitoring",
        actionSteps: "→ Week 1: Complete 50 practice prompts across different domains\n→ Week 2: Build your first prompt template library (10 reusable templates)\n→ Week 3: Land your first prompt engineering gig on Upwork/Fiverr\n→ Week 4: Create a case study from your results and share publicly\n→ Month 2: Scale to $5K/month with recurring contract clients",
        price: 5.99,
        category: "AI & Machine Learning",
        likes: 312,
        purchases: 247,
      },
    ]

    const found = featuredCards.find((c) => c.id === cardId)
    if (found) {
      setCard(found)
    } else {
      // Fallback for auto-generated cards
      setCard({
        id: cardId,
        title: "Knowledge Card",
        summary: "This knowledge card contains structured, actionable insights on a trending topic. Purchase to unlock the full content.",
        keyInsights: "Premium content — unlock to view the key insights that make this card valuable.",
        frameworks: "Premium content — unlock to view the step-by-step framework.",
        actionSteps: "Premium content — unlock to view the action plan.",
        price: 4.99,
        category: "General Innovation",
        likes: 42,
        purchases: 28,
      })
    }
    setLoading(false)
  }, [cardId])

  // Fetch recommendations
  useEffect(() => {
    if (card) {
      fetch(`/api/recommend?category=${encodeURIComponent(card.category)}&excludeId=${card.id}&limit=4`)
        .then((res) => res.json())
        .then((data) => setRecommendations(data.recommendations || []))
        .catch(() => {})
    }
  }, [card])

  const handlePurchase = async () => {
    if (!card) return
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, cardTitle: card.title, price: card.price }),
      })
      const data = await res.json()
      if (data.demoMode) {
        setUnlocked(true)
        toast.success("Card unlocked! Full content is now visible.")
      } else if (data.url) {
        window.location.href = data.url
      }
    } catch {
      toast.error("Purchase failed. Try again.")
    }
  }

  const handleSubmitReview = async () => {
    try {
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId, rating: reviewRating, comment: reviewComment }),
      })
      setReviews((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          rating: reviewRating,
          comment: reviewComment || null,
          userName: "You",
          createdAt: new Date().toISOString(),
        },
      ])
      setReviewComment("")
      toast.success("Review submitted!")
    } catch {
      toast.error("Failed to submit review")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[hsl(var(--muted-foreground))]">Loading card...</div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Card not found</h2>
          <Link href="/marketplace" className="text-[hsl(var(--primary))]">Back to Marketplace</Link>
        </div>
      </div>
    )
  }

  const avgRating = reviews.length > 0 ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 4.5

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
        {/* Breadcrumb */}
        <div className="text-xs text-[hsl(var(--muted-foreground))] mb-6 flex items-center gap-2">
          <Link href="/marketplace" className="hover:text-[hsl(var(--foreground))]">Marketplace</Link>
          <span>/</span>
          <span className="text-[hsl(var(--foreground))]">{card.title.substring(0, 40)}...</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] mb-3 inline-block">{card.category}</span>
          <h1 className="text-3xl font-extrabold mb-3">{card.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
            <span className="flex items-center gap-1">
              {"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}
              <span className="ml-1">{avgRating.toFixed(1)}</span>
            </span>
            <span>{card.purchases} purchases</span>
            <span>{card.likes} likes</span>
          </div>
        </div>

        {/* Free Preview Section */}
        <div className="nexus-card p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Summary</h2>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{card.summary}</p>
        </div>

        {/* Gated Content */}
        <div className="space-y-6 mb-8">
          {[
            { title: "Key Insights", content: card.keyInsights, icon: "💡" },
            { title: "Frameworks", content: card.frameworks, icon: "🏗️" },
            { title: "Action Steps", content: card.actionSteps, icon: "🚀" },
          ].map((section) => (
            <div key={section.title} className="nexus-card p-6 relative">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span>{section.icon}</span> {section.title}
              </h2>
              {unlocked ? (
                <div className="whitespace-pre-line text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {section.content}
                </div>
              ) : (
                <div className="relative">
                  <div className="blur-md select-none whitespace-pre-line text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {section.content}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--card))]/60">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔒</div>
                      <p className="text-sm font-medium">Purchase to unlock</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Purchase CTA */}
        {!unlocked && (
          <div className="nexus-card p-6 mb-8 nexus-glow text-center">
            <div className="text-4xl font-extrabold text-[hsl(var(--primary))] mb-2">${card.price}</div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Unlock full content — Key Insights, Frameworks, and Action Steps
            </p>
            <button onClick={handlePurchase} className="nexus-btn text-lg !py-3 !px-8">
              Buy & Unlock Now
            </button>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
              <span>Demo mode</span>
              <span>•</span>
              <ShareCard cardId={card.id} cardTitle={card.title} />
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="nexus-card p-6">
          <h2 className="font-bold text-lg mb-4">Reviews ({reviews.length})</h2>

          {/* Write a review */}
          <div className="mb-6 p-4 rounded-lg bg-[hsl(var(--secondary))]">
            <div className="text-sm font-medium mb-2">Rate this card</div>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className={`text-xl ${star <= reviewRating ? "text-yellow-400" : "text-[hsl(var(--muted-foreground))]"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Write your review (optional)..."
              className="nexus-input min-h-[60px] resize-none mb-3"
            />
            <button onClick={handleSubmitReview} className="nexus-btn text-sm !py-2 !px-4">
              Submit Review
            </button>
          </div>

          {/* Review list */}
          {reviews.length === 0 ? (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">No reviews yet. Be the first to rate this card!</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="p-3 rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                      <span className="text-sm font-medium">{review.userName || "Anonymous"}</span>
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* You Might Also Like */}
        {recommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <Link key={rec.id} href={`/card/${rec.id}`} className="nexus-card p-4 block">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">{rec.category}</span>
                    <span className="text-[hsl(var(--primary))] font-bold">${rec.price}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">{rec.title}</h3>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{rec.purchases} purchases</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
