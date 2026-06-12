import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// GET /api/cards - list published cards (marketplace) or all cards for a creator
// GET /api/cards?creatorId=xxx - list a creator's cards (published + drafts)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const creatorId = searchParams.get("creatorId")
    const userEmail = searchParams.get("userEmail")

    let where: Record<string, unknown> = { published: true }

    if (creatorId) {
      where = { creatorId }
    } else if (userEmail) {
      const user = await prisma.user.findUnique({ where: { email: userEmail } })
      where = user ? { creatorId: user.id } : { id: "__none__" }
    }

    const cards = await prisma.knowledgeCard.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ cards, count: cards.length })
  } catch (err) {
    console.error("[cards] GET error:", err)
    return NextResponse.json({ cards: [], count: 0 })
  }
}
