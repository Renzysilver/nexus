"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useNexusStore } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUserEmail = useNexusStore((s) => s.setUserEmail)

  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@") || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/auth/${mode === "login" ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Something went wrong")
        return
      }

      setUserEmail(data.email)
      toast.success(mode === "login" ? "Welcome back!" : "Account created!")
      const from = searchParams.get("from") || "/dashboard"
      router.push(from)
      router.refresh()
    } catch {
      toast.error("Network error — try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {mode === "login"
              ? "Log in to access the NEXUS marketplace"
              : "Sign up to start generating and selling knowledge cards"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="nexus-card p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1 text-[hsl(var(--muted-foreground))]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 text-[hsl(var(--muted-foreground))]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] text-sm"
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading} className="nexus-btn w-full !py-2.5 disabled:opacity-50">
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-4">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[hsl(var(--primary))] font-medium hover:underline"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  )
}
