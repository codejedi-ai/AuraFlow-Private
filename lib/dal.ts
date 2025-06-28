// Data Access Layer for authorization checks
import { cache } from "react"
import { getSession } from "./auth"
import { redirect } from "next/navigation"

export const verifySession = cache(async () => {
  const session = await getSession()

  if (!session?.userId) {
    redirect("/auth/signin")
  }

  return { isAuth: true, userId: session.userId, session }
})

export async function getUser() {
  const session = await verifySession()
  if (!session) return null

  // In a real app, you would fetch user data from your database
  // For now, we'll return the session data
  return {
    id: session.userId,
    email: session.session.email,
    firstName: session.session.firstName,
    lastName: session.session.lastName,
    accountType: session.session.accountType,
  }
}
