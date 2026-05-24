"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useNexusStore } from "@/lib/store"
import { toast } from "sonner"
import { ShareCard } from "@/components/ShareCard"

interface TrendingTopic {
  id: string
  title: string
  category: string
  heat: number
  description: string
  suggestedPrice: number
}

interface AnalyticsData {
  totalEvents: number
  totalUsers: number
  totalIdeas: number
  totalCards: number
  totalWaitlist: number
  totalRevenue: string
  recentEvents: { event: string; data: string | null; createdAt: string }[]
}

export default function Dashboard() {
  const {
    ideas,
    addIdea,
    knowledgeCards,
    addKnowledgeCard,
    currentEvaluation,
    setCurrentEvaluation,
    isEvaluating,
    setIsEvaluating,
    isGenerating,
    setIsGenerating,
    userEmail,
    setUserEmail,
  } = useNexusStore()

  const [ideaTitle, setIdeaTitle] = useState("")
  const [ideaDesc, setIdeaDesc] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [activeTab, setActiveTab] = useState<"capture" | "ideas" | "cards" | "trending" | "analytics" | "revenue">("capture")
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  // Fetch trending topics
  useEffect(() => {
    if (activeTab === "trending" && trendingTopics.length === 0) {
      fetch("/api/trending")
        .then((res) => res.json())
        .then((data) => setTrendingTopics(data.trends || []))
        .catch(() => {})
    }
  }, [activeTab, trendingTopics.length])

  // Fetch analytics
  useEffect(() => {
    if (activeTab === "analytics") {
      fetch("/api/analytics")
        .then((res) => res.json())
        .then((data) => setAnalytics(data))
        .catch(() => {})
    }
  }, [activeTab])

  // Auth gate
  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="nexus-card p-8 max-w-md w-full mx-4 text-center">
          <div className="w-12 h-12 rounded-xl nexus-gradient flex items-center justify-center font-bold text-white text-lg mx-auto mb-4">
            N
          </div>
          <h2 className="text-2xl font-bold mb-2">Enter NEXUS</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
            Sign in with your email to access the Creator Dashboard
          </p>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="your@email.com"
            className="nexus-input mb-4"
          />
          <button
            onClick={() => {
              if (emailInput.includes("@")) {
                setUserEmail(emailInput)
                toast.success("Welcome to NEXUS!")
              } else {
                toast.error("Enter a valid email")
              }
            }}
            className="nexus-btn w-full"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleEvaluate = async () => {
    if (!ideaTitle.trim()) {
      toast.error("Give your idea a title at least!")
      return
    }
    setIsEvaluating(true)
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: ideaTitle, description: ideaDesc || ideaTitle }),
      })
      const data = await res.json()
      setCurrentEvaluation(data)
      addIdea({
        id: crypto.randomUUID(),
        title: ideaTitle,
        description: ideaDesc || ideaTitle,
        category: data.category,
        score: data.score,
        insight: data.insight,
      })
      toast.success(`Evaluated: ${data.score}/100`)
    } catch {
      toast.error("Evaluation failed")
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleGenerateCard = async (idea: { id: string; title: string; description: string; category?: string; score?: number; insight?: string }) => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/generate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaId: idea.id,
          title: idea.title,
          description: idea.description,
          category: idea.category,
          score: idea.score,
        }),
      })
      const data = await res.json()
      addKnowledgeCard(data)
      toast.success("Knowledge Card generated!")
      setActiveTab("cards")
    } catch {
      toast.error("Card generation failed")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAutoGenerate = async (topic: TrendingTopic) => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/auto-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: topic.title,
          category: topic.category,
          heat: topic.heat,
          suggestedPrice: topic.suggestedPrice,
        }),
      })
      const data = await res.json()
      addKnowledgeCard(data)
      toast.success(`Auto-generated card from trend: "${topic.title}"`)
      setActiveTab("cards")
    } catch {
      toast.error("Auto-generation failed")
    } finally {
      setIsGenerating(false)
    }
  }

  const tabs = [
    { key: "capture" as const, label: "Quick Capture" },
    { key: "ideas" as const, label: `Ideas (${ideas.length})` },
    { key: "cards" as const, label: `Cards (${knowledgeCards.length})` },
    { key: "trending" as const, label: "Trending" },
    { key: "analytics" as const, label: "Analytics" },
    { key: "revenue" as const, label: "Revenue" },
  ]

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg nexus-gradient flex items-center justify-center font-bold text-white text-xs">
            N
          </div>
          <span className="font-bold">NEXUS</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Creator Dashboard</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[hsl(var(--muted-foreground))]">{userEmail}</span>
          <Link href="/" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Home</Link>
          <Link href="/marketplace" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Marketplace</Link>
          <button onClick={() => setUserEmail(null)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Stats Bar */}
      <div className="px-6 py-4 border-b border-[hsl(var(--border))] grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Ideas", value: ideas.length, color: "text-[hsl(var(--foreground))]" },
          { label: "Knowledge Cards", value: knowledgeCards.length, color: "text-[hsl(var(--primary))]" },
          { label: "Total Revenue", value: `$${knowledgeCards.reduce((a, c) => a + c.purchases * c.price, 0).toFixed(2)}`, color: "text-[hsl(var(--primary))]" },
          { label: "Avg Score", value: ideas.length ? Math.round(ideas.reduce((a, i) => a + (i.score || 0), 0) / ideas.length) : "—", color: "score-warm" },
        ].map((stat) => (
          <div key={stat.label} className="nexus-card p-3">
            <div className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 flex gap-1 border-b border-[hsl(var(--border))] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-[hsl(var(--card))] text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "capture" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Quick Capture</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              Dump your idea. NEXUS AI will evaluate it, score it, and generate a monetizable Knowledge Card.
            </p>
            <input
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              placeholder="Idea title (e.g., 'AI Sleep Coach')"
              className="nexus-input mb-3"
            />
            <textarea
              value={ideaDesc}
              onChange={(e) => setIdeaDesc(e.target.value)}
              placeholder="Describe it briefly... what problem does it solve? Who is it for?"
              className="nexus-input min-h-[80px] resize-none mb-4"
            />
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="nexus-btn disabled:opacity-50"
            >
              {isEvaluating ? "Evaluating..." : "Evaluate & Score"}
            </button>

            {currentEvaluation && (
              <div className="mt-6 nexus-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">Evaluation Result</span>
                  <span
                    className={`text-3xl font-extrabold ${
                      currentEvaluation.score >= 70
                        ? "score-hot"
                        : currentEvaluation.score >= 40
                        ? "score-warm"
                        : "score-cool"
                    }`}
                  >
                    {currentEvaluation.score}/100
                  </span>
                </div>
                <div className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                  Category: <span className="text-[hsl(var(--foreground))] font-medium">{currentEvaluation.category}</span>
                </div>
                <p className="text-sm mb-4">{currentEvaluation.insight}</p>
                <button
                  onClick={() =>
                    handleGenerateCard({
                      id: crypto.randomUUID(),
                      title: ideaTitle,
                      description: ideaDesc,
                      category: currentEvaluation.category,
                      score: currentEvaluation.score,
                      insight: currentEvaluation.insight,
                    })
                  }
                  disabled={isGenerating}
                  className="nexus-btn disabled:opacity-50"
                >
                  {isGenerating ? "Generating Card..." : "Generate Knowledge Card"}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "ideas" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Ideas</h2>
            {ideas.length === 0 ? (
              <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
                <p className="text-lg mb-2">No ideas yet</p>
                <p className="text-sm">Go to Quick Capture and drop your first idea!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {ideas.map((idea) => (
                  <div key={idea.id} className="nexus-card p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{idea.title}</div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        {idea.category} • {idea.description.substring(0, 80)}...
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-lg font-bold ${
                          (idea.score || 0) >= 70
                            ? "score-hot"
                            : (idea.score || 0) >= 40
                            ? "score-warm"
                            : "score-cool"
                        }`}
                      >
                        {idea.score}/100
                      </span>
                      <button
                        onClick={() => handleGenerateCard(idea)}
                        className="nexus-btn text-xs !py-1.5 !px-3"
                      >
                        Make Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "cards" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Knowledge Cards</h2>
            {knowledgeCards.length === 0 ? (
              <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
                <p className="text-lg mb-2">No cards yet</p>
                <p className="text-sm">Evaluate an idea first, then generate a Knowledge Card!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {knowledgeCards.map((card) => (
                  <div key={card.id} className="nexus-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                        {card.category}
                      </span>
                      <span className="text-[hsl(var(--primary))] font-bold">${card.price}</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm">{card.title}</h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-3 mb-3">
                      {card.summary}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--border))]">
                      <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                        <span>{card.likes} likes</span>
                        <span>{card.purchases} sales</span>
                      </div>
                      <ShareCard cardId={card.id} cardTitle={card.title} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "trending" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Trending Topics</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Hot topics with built-in demand. One click to auto-generate a Knowledge Card.
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))] animate-pulse">
                LIVE
              </span>
            </div>
            {trendingTopics.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[hsl(var(--muted-foreground))]">Loading trending topics...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="nexus-card p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{topic.title}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                            {topic.category}
                          </span>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">{topic.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-[hsl(var(--destructive))] font-bold">
                            Heat: {topic.heat}/100
                          </span>
                          <span className="text-[hsl(var(--muted-foreground))]">
                            Suggested: ${topic.suggestedPrice}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAutoGenerate(topic)}
                        disabled={isGenerating}
                        className="nexus-btn text-sm !py-2 !px-5 whitespace-nowrap disabled:opacity-50"
                      >
                        {isGenerating ? "Generating..." : "Auto-Generate Card"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Analytics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Users", value: analytics?.totalUsers ?? 0, icon: "👤" },
                { label: "Ideas Created", value: analytics?.totalIdeas ?? 0, icon: "💡" },
                { label: "Cards Published", value: analytics?.totalCards ?? 0, icon: "🃏" },
                { label: "Waitlist Signups", value: analytics?.totalWaitlist ?? 0, icon: "📋" },
                { label: "Total Revenue", value: `$${analytics?.totalRevenue ?? "0.00"}`, icon: "💰" },
                { label: "Events Tracked", value: analytics?.totalEvents ?? 0, icon: "📊" },
              ].map((metric) => (
                <div key={metric.label} className="nexus-card p-5 text-center">
                  <div className="text-2xl mb-1">{metric.icon}</div>
                  <div className="text-2xl font-extrabold">{metric.value}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Simple bar chart - no external library needed */}
            <div className="nexus-card p-5">
              <h3 className="font-bold mb-4">Revenue by Card</h3>
              {knowledgeCards.length === 0 ? (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Generate knowledge cards to see revenue analytics.
                </p>
              ) : (
                <div className="space-y-3">
                  {knowledgeCards.map((card) => {
                    const revenue = card.purchases * card.price
                    const maxRevenue = Math.max(...knowledgeCards.map((c) => c.purchases * c.price), 1)
                    const widthPercent = (revenue / maxRevenue) * 100
                    return (
                      <div key={card.id}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="truncate max-w-[60%]">{card.title.substring(0, 40)}</span>
                          <span className="font-medium text-[hsl(var(--primary))]">${revenue.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-[hsl(var(--secondary))] rounded-full h-2">
                          <div
                            className="h-2 rounded-full nexus-gradient transition-all duration-500"
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Recent Events */}
            {analytics?.recentEvents && analytics.recentEvents.length > 0 && (
              <div className="nexus-card p-5 mt-4">
                <h3 className="font-bold mb-3">Recent Events</h3>
                <div className="space-y-2">
                  {analytics.recentEvents.map((event, i) => (
                    <div key={i} className="flex items-center justify-between py-1 text-sm border-b border-[hsl(var(--border))] last:border-0">
                      <span className="text-[hsl(var(--primary))]">{event.event}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        {new Date(event.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "revenue" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revenue Dashboard</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="nexus-card p-5 text-center">
                <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Revenue</div>
                <div className="text-3xl font-extrabold text-[hsl(var(--primary))]">
                  ${knowledgeCards.reduce((a, c) => a + c.purchases * c.price, 0).toFixed(2)}
                </div>
              </div>
              <div className="nexus-card p-5 text-center">
                <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Sales</div>
                <div className="text-3xl font-extrabold">
                  {knowledgeCards.reduce((a, c) => a + c.purchases, 0)}
                </div>
              </div>
              <div className="nexus-card p-5 text-center">
                <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Avg Price</div>
                <div className="text-3xl font-extrabold">
                  ${knowledgeCards.length ? (knowledgeCards.reduce((a, c) => a + c.price, 0) / knowledgeCards.length).toFixed(2) : "0.00"}
                </div>
              </div>
            </div>
            <div className="nexus-card p-5">
              <h3 className="font-bold mb-3">Revenue by Card</h3>
              {knowledgeCards.length === 0 ? (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Generate some knowledge cards to see revenue data.</p>
              ) : (
                <div className="space-y-2">
                  {knowledgeCards.map((card) => (
                    <div key={card.id} className="flex items-center justify-between py-2 border-b border-[hsl(var(--border))] last:border-0">
                      <span className="text-sm truncate max-w-[60%]">{card.title}</span>
                      <span className="text-sm font-medium text-[hsl(var(--primary))]">
                        ${(card.purchases * card.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stripe Config Notice */}
            <div className="nexus-card p-5 mt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center text-[hsl(var(--primary))] text-sm flex-shrink-0">
                  💳
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Connect Stripe for Real Payments</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                    Add your Stripe keys to <code className="px-1 py-0.5 rounded bg-[hsl(var(--secondary))]">.env</code> to start accepting real payments.
                    Currently running in demo mode.
                  </p>
                  <div className="bg-[hsl(var(--secondary))] rounded-lg p-3 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                    STRIPE_PUBLIC_KEY=pk_test_your_key_here<br/>
                    STRIPE_SECRET_KEY=sk_test_your_key_here<br/>
                    STRIPE_WEBHOOK_SECRET=whsec_your_key_here
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
