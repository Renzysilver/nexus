import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { email, referredBy } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    // Check if already on waitlist
    const existing = await prisma.waitlist.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({
        position: existing.position,
        referralCode: existing.referralCode,
        message: "Already on the waitlist!",
      })
    }

    // Get current count for position
    const count = await prisma.waitlist.count()

    const waitlist = await prisma.waitlist.create({
      data: {
        email,
        referredBy: referredBy || null,
        position: count + 1,
      },
    })

    return NextResponse.json({
      position: waitlist.position,
      referralCode: waitlist.referralCode,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlist.count()
    return NextResponse.json({ total: count })
  } catch {
    return NextResponse.json({ total: 0 })
  }
}
