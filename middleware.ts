import { type NextRequest, NextResponse } from "next/server"
import { decrypt, updateSession } from "@/lib/auth"

// Define protected and public routes
const protectedRoutes = ["/profile", "/match", "/results", "/dashboard"]
const publicRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/",
  "/philosophy",
  "/synergy",
  "/mission",
  "/contact",
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  // Get the session from the cookie
  const cookie = req.cookies.get("session")?.value
  const session = await decrypt(cookie || "")

  // Redirect to signin if accessing protected route without session
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl))
  }

  // Redirect to profile creation if authenticated user tries to access auth pages
  if (isPublicRoute && session?.userId && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/profile/create", req.nextUrl))
  }

  // Update session if it exists
  return await updateSession(req)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
