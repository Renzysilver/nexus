"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("NEXUS Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="nexus-card p-8 max-w-md w-full text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
          {error.message || "An unexpected error occurred. Don't worry — your data is safe."}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="nexus-btn">
            Try Again
          </button>
          <Link href="/" className="px-4 py-2 rounded-lg bg-[hsl(var(--secondary))] text-sm hover:bg-[hsl(var(--border))] transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
