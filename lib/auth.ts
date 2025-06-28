import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const secretKey = process.env.AUTH_SECRET || "your-secret-key-must-be-at-least-32-characters-long"
const key = new TextEncoder().encode(secretKey)

export interface SessionPayload {
  userId: string
  email: string
  firstName?: string
  lastName?: string
  accountType?: string
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key)
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  if (!input || input.trim() === "") {
    return null
  }

  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload as SessionPayload
  } catch (error) {
    console.error("Failed to decrypt session:", error)
    return null
  }
}

export async function createSession(userData: Omit<SessionPayload, "expiresAt">) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await encrypt({ ...userData, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  if (!session) return NextResponse.next()

  const parsed = await decrypt(session)
  if (!parsed) {
    // If session is invalid, clear the cookie
    const response = NextResponse.next()
    response.cookies.delete("session")
    return response
  }

  // Refresh the session
  const res = NextResponse.next()
  const newSession = await encrypt(parsed)
  res.cookies.set({
    name: "session",
    value: newSession,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  })
  return res
}
