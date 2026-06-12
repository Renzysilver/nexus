import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// GET /api/cards/[id] - fetch a single card (for marketplace card detail page)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const card = await prisma.knowledgeCard.findUnique({ where: { id } })
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 })
    }
    return NextResponse.json(card)
  } catch (err) {
    console.error("[cards/:id] GET error:", err)
    return NextResponse.json({ error: "Failed to fetch card" }, { status: 500 })
  }
}

// PATCH /api/cards/[id] - publish/unpublish a card, or update its price
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data: Record<string, unknown> = {}

    if (typeof body.published === "boolean") data.published = body.published
    if (typeof body.price === "number" && body.price > 0) data.price = body.price
    if (typeof body.authorName === "string" && body.authorName.trim()) {
      data.authorName = body.authorName.trim()
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const card = await prisma.knowledgeCard.update({
      where: { id },
      data,
    })

    return NextResponse.json(card)
  } catch (err) {
    console.error("[cards/:id] PATCH error:", err)
    return NextResponse.json({ error: "Failed to update card" }, { status: 500 })
  }
}
