import { NextResponse } from "next/server"

// Share / Referral Link Generator
// Creates shareable links with referral tracking

export async function POST(req: Request) {
  try {
    const { cardId, cardTitle } = await req.json()

    if (!cardId) {
      return NextResponse.json({ error: "Card ID required" }, { status: 400 })
    }

    // Generate a shareable link with referral tracking
    const referralCode = `NEXUS_${cardId.substring(0, 8)}_${Date.now().toString(36).toUpperCase()}`
    const shareUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/marketplace?ref=${referralCode}&card=${cardId}`

    // Social share URLs
    const encodedTitle = encodeURIComponent(cardTitle || "Check out this Knowledge Card on NEXUS!")
    const encodedUrl = encodeURIComponent(shareUrl)

    return NextResponse.json({
      shareUrl,
      referralCode,
      socialLinks: {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        copyText: `${cardTitle} — ${shareUrl}`,
      },
      message: "Share this link — you earn 10% commission on every purchase through your referral!",
    })
  } catch {
    return NextResponse.json({ error: "Share link generation failed" }, { status: 500 })
  }
}
