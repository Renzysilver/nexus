"use client"

import { useState } from "react"
import { toast } from "sonner"

interface ShareCardProps {
  cardId: string
  cardTitle: string
}

export function ShareCard({ cardId, cardTitle }: ShareCardProps) {
  const [sharing, setSharing] = useState(false)
  const [shareData, setShareData] = useState<{
    shareUrl: string
    socialLinks: Record<string, string>
    copyText: string
  } | null>(null)

  const handleShare = async () => {
    setSharing(true)
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId, cardTitle }),
      })
      const data = await res.json()
      setShareData(data)
    } catch {
      toast.error("Failed to generate share link")
    } finally {
      setSharing(false)
    }
  }

  const copyLink = () => {
    if (shareData) {
      navigator.clipboard.writeText(shareData.copyText)
      toast.success("Link copied! Share it to earn 10% commission.")
    }
  }

  if (!shareData) {
    return (
      <button
        onClick={handleShare}
        disabled={sharing}
        className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {sharing ? "Generating..." : "Share & Earn"}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={shareData.socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-2 py-1 rounded bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))]/20 transition-colors"
      >
        𝕏
      </a>
      <a
        href={shareData.socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-2 py-1 rounded bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))]/20 transition-colors"
      >
        in
      </a>
      <a
        href={shareData.socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-2 py-1 rounded bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))]/20 transition-colors"
      >
        WA
      </a>
      <button
        onClick={copyLink}
        className="text-xs px-2 py-1 rounded bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/30 transition-colors"
      >
        Copy Link
      </button>
    </div>
  )
}
