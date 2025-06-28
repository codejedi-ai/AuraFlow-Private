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
  const isPublicRoute = publicRoutes.includes(path) || path.startsWith("/auth")

  // Get the session from the cookie
  const cookie = req.cookies.get("session")?.value
  let session = null

  // Only try to decrypt if we have a valid cookie
  if (cookie && cookie.trim() !== "") {
    try {
      session = await decrypt(cookie)
    } catch (error) {
      console.error("Middleware: Failed to decrypt session:", error)
      // Clear invalid session cookie
      const response = NextResponse.next()
      response.cookies.delete("session")
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl))
      }
      return response
    }
  }

  // Redirect to signin if accessing protected route without valid session
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl))
  }

  // Redirect authenticated users away from auth pages
  if (session?.userId && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/profile/create", req.nextUrl))
  }

  // Update session if it exists and is valid
  if (session?.userId) {
    return await updateSession(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
}
