"use client"

import { useState } from "react"
import Link from "next/link"
import { useNexusStore } from "@/lib/store"
import { toast } from "sonner"
import { NewsletterCapture } from "@/components/NewsletterCapture"

export default function Home() {
  const [idea, setIdea] = useState("")
  const { isEvaluating, setIsEvaluating, currentEvaluation, setCurrentEvaluation, addIdea, setUserEmail } = useNexusStore()
  const [email, setEmail] = useState("")
  const [waitlistJoined, setWaitlistJoined] = useState(false)

  const handleEvaluate = async () => {
    if (!idea.trim()) {
      toast.error("Drop an idea first — even half-formed ones work.")
      return
    }
    setIsEvaluating(true)
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: idea, description: idea }),
      })
      const data = await res.json()
      setCurrentEvaluation(data)
      addIdea({
        id: crypto.randomUUID(),
        title: idea,
        description: idea,
        category: data.category,
        score: data.score,
        insight: data.insight,
      })
      toast.success("Idea evaluated! Score: " + data.score + "/100")
    } catch {
      toast.error("Evaluation failed. The AI mind is resting — try again.")
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleWaitlist = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Valid email required.")
      return
    }
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setWaitlistJoined(true)
        setUserEmail(email)
        toast.success(`You're #${data.position} on the waitlist!`)
      } else {
        toast.error(data.error || "Something went wrong.")
      }
    } catch {
      toast.error("Network error. Try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg nexus-gradient flex items-center justify-center font-bold text-white text-sm">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">
            NEX<span className="text-[hsl(var(--primary))]">US</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
            Dashboard
          </Link>
          <Link href="/marketplace" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
            Marketplace
          </Link>
          <Link href="/dashboard" className="nexus-btn text-sm !py-2 !px-4">
            Start Creating
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--secondary))] text-xs text-[hsl(var(--primary))] mb-6 border border-[hsl(var(--border))]">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
            AI-Powered Knowledge Commerce
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Turn Your{" "}
            <span className="text-[hsl(var(--primary))] nexus-glow-text">
              Raw Ideas
            </span>{" "}
            Into{" "}
            <span className="text-[hsl(var(--primary))] nexus-glow-text">
              Real Revenue
            </span>
          </h1>

          <p className="text-lg text-[hsl(var(--muted-foreground))] mb-10 max-w-xl mx-auto">
            NEXUS uses AI to evaluate, structure, and monetize your ideas as
            knowledge cards. From thought to product in seconds. From product to
            income in minutes.
          </p>

          {/* Thought Valuator */}
          <div className="nexus-card p-6 max-w-lg mx-auto mb-8">
            <div className="text-xs text-[hsl(var(--muted-foreground))] mb-3 uppercase tracking-wider font-medium">
              Thought Valuator
            </div>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Drop your idea here... (e.g., 'AI that matches your sleep pattern to productivity peaks')"
              className="nexus-input min-h-[100px] resize-none mb-4"
            />
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="nexus-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEvaluating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Evaluating...
                </span>
              ) : (
                "Evaluate My Idea"
              )}
            </button>

            {/* Result */}
            {currentEvaluation && (
              <div className="mt-6 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">Score</span>
                  <span
                    className={`text-2xl font-bold ${
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">Category</span>
                  <span className="text-sm font-medium">{currentEvaluation.category}</span>
                </div>
                <div className="pt-2 border-t border-[hsl(var(--border))]">
                  <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">AI Insight</span>
                  <p className="text-sm mt-1">{currentEvaluation.insight}</p>
                </div>
              </div>
            )}
          </div>

          {/* Waitlist */}
          <div className="max-w-md mx-auto">
            {!waitlistJoined ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="nexus-input flex-1"
                />
                <button onClick={handleWaitlist} className="nexus-btn whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 text-center">
                <span className="text-[hsl(var(--primary))] font-medium">
                  You&apos;re on the list! Share your referral link to jump the queue.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Newsletter */}
      <div className="px-6 py-12 border-t border-[hsl(var(--border))]">
        <div className="max-w-md mx-auto">
          <NewsletterCapture />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] px-6 py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
        NEXUS Knowledge Commerce Engine — Built with AI, designed for creators.
      </footer>
    </div>
  )
}
