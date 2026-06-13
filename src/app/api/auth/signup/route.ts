import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { createSession } from "@/lib/session"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing && existing.password) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = existing
      ? await prisma.user.update({ where: { id: existing.id }, data: { password: hashed } })
      : await prisma.user.create({ data: { email, password: hashed } })

    await createSession({ userId: user.id, email: user.email })

    return NextResponse.json({ id: user.id, email: user.email })
  } catch (err) {
    console.error("[auth/signup] error:", err)
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
