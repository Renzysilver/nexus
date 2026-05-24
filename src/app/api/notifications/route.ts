import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { type, message, userId } = await req.json()

    if (!type || !message) {
      return NextResponse.json({ error: "Type and message required" }, { status: 400 })
    }

    const notification = await prisma.notification.create({
      data: { type, message, userId: userId || null },
    })

    return NextResponse.json({ notification })
  } catch {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    const notifications = await prisma.notification.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: "desc" },
      take: 20,
    })

    const unreadCount = await prisma.notification.count({
      where: {
        ...(userId ? { userId } : {}),
        read: false,
      },
    })

    return NextResponse.json({ notifications, unreadCount })
  } catch {
    return NextResponse.json({ notifications: [], unreadCount: 0 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { notificationId } = await req.json()

    if (notificationId) {
      await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true },
      })
    } else {
      // Mark all as read
      await prisma.notification.updateMany({
        where: { read: false },
        data: { read: true },
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
