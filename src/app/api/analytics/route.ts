import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Analytics API
// Tracks events and returns dashboard metrics

export async function POST(req: Request) {
  try {
    const { event, data, userId } = await req.json()

    if (!event) {
      return NextResponse.json({ error: "Event name required" }, { status: 400 })
    }

    await prisma.analyticsEvent.create({
      data: {
        event,
        data: data ? JSON.stringify(data) : null,
        userId: userId || null,
      },
    })

    return NextResponse.json({ tracked: true })
  } catch {
    return NextResponse.json({ tracked: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get aggregate analytics
    const totalEvents = await prisma.analyticsEvent.count()
    const totalUsers = await prisma.user.count()
    const totalIdeas = await prisma.idea.count()
    const totalCards = await prisma.knowledgeCard.count()
    const totalWaitlist = await prisma.waitlist.count()

    // Event breakdown
    const recentEvents = await prisma.analyticsEvent.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    })

    // Revenue calculation
    const cards = await prisma.knowledgeCard.findMany()
    const totalRevenue = cards.reduce((sum, card) => sum + card.purchases * card.price, 0)

    return NextResponse.json({
      totalEvents,
      totalUsers,
      totalIdeas,
      totalCards,
      totalWaitlist,
      totalRevenue: totalRevenue.toFixed(2),
      recentEvents: recentEvents.map((e) => ({
        event: e.event,
        data: e.data ? JSON.parse(e.data) : null,
        createdAt: e.createdAt,
      })),
    })
  } catch {
    return NextResponse.json({
      totalEvents: 0,
      totalUsers: 0,
      totalIdeas: 0,
      totalCards: 0,
      totalWaitlist: 0,
      totalRevenue: "0.00",
      recentEvents: [],
    })
  }
}
