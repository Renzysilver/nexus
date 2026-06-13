import { cookies } from "next/headers"
import crypto from "crypto"

const SESSION_COOKIE = "nexus_session"

function getSecret() {
  return process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production"
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
}

export interface SessionData {
  userId: string
  email: string
}

export async function createSession(data: SessionData) {
  const payload = JSON.stringify(data)
  const encoded = Buffer.from(payload).toString("base64url")
  const sig = sign(encoded)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, `${encoded}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_COOKIE)?.value
  if (!raw) return null

  const [encoded, sig] = raw.split(".")
  if (!encoded || !sig) return null
  if (sign(encoded) !== sig) return null

  try {
    const payload = Buffer.from(encoded, "base64url").toString("utf-8")
    return JSON.parse(payload) as SessionData
  } catch {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export { SESSION_COOKIE }
