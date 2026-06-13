import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SESSION_COOKIE = "nexus_session"

function getSecret() {
  return process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production"
}

async function hmacHex(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function isValidSession(raw: string | undefined): Promise<boolean> {
  if (!raw) return false
  const [encoded, sig] = raw.split(".")
  if (!encoded || !sig) return false
  const expected = await hmacHex(encoded)
  return expected === sig
}

const PROTECTED_PREFIXES = ["/marketplace", "/dashboard", "/card"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
  if (!isProtected) return NextResponse.next()

  const session = req.cookies.get(SESSION_COOKIE)?.value
  if (await isValidSession(session)) return NextResponse.next()

  const loginUrl = new URL("/login", req.url)
  loginUrl.searchParams.set("from", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/marketplace/:path*", "/dashboard/:path*", "/card/:path*"],
}
