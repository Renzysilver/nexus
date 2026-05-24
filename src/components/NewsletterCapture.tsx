"use client"

import { useState } from "react"
import { toast } from "sonner"

export function NewsletterCapture() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email address")
      return
    }
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      setSubmitted(true)
      toast.success("You are in! Watch your inbox for creator tips.")
    } catch {
      toast.error("Something went wrong. Try again.")
    }
  }

  if (submitted) {
    return (
      <div className="nexus-card p-6 text-center">
        <div className="text-2xl mb-2">✉️</div>
        <h3 className="font-bold mb-1">You are on the list!</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Weekly creator tips, trending topics, and revenue strategies — straight to your inbox.
        </p>
      </div>
    )
  }

  return (
    <div className="nexus-card p-6">
      <h3 className="font-bold mb-1">Get Weekly Creator Tips</h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
        Join 2,400+ creators getting AI-powered insights every Monday.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="nexus-input flex-1"
        />
        <button onClick={handleSubmit} className="nexus-btn whitespace-nowrap">
          Subscribe
        </button>
      </div>
      <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  )
}
