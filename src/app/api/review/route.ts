import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { cardId, rating, comment, userName } = await req.json()

    if (!cardId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Card ID and rating (1-5) are required" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        cardId,
        rating,
        comment: comment || null,
        userName: userName || "Anonymous",
      },
    })

    return NextResponse.json({ review, message: "Review submitted!" })
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const cardId = searchParams.get("cardId")

    if (!cardId) {
      return NextResponse.json({ reviews: [] })
    }

    const reviews = await prisma.review.findMany({
      where: { cardId },
      orderBy: { createdAt: "desc" },
      take: 20,
    })

    return NextResponse.json({ reviews })
  } catch {
    return NextResponse.json({ reviews: [] })
  }
}
