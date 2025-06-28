"use server"

import { createSession, deleteSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

// Mock user database - in a real app, this would be your actual database
const users = new Map<
  string,
  {
    id: string
    email: string
    password: string
    firstName?: string
    lastName?: string
    accountType?: string
  }
>()

// Add a default test user for demo purposes
users.set("test@example.com", {
  id: "test-user-id",
  email: "test@example.com",
  password: "password123",
  firstName: "Test",
  lastName: "User",
  accountType: "brand",
})

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    accountType: z.enum(["brand", "influencer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  // Check if user exists (in a real app, you'd check against your database)
  const user = users.get(email)
  if (!user || user.password !== password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    }
  }

  try {
    // Create session
    await createSession({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      accountType: user.accountType,
    })
  } catch (error) {
    console.error("Error creating session:", error)
    return {
      errors: {
        email: ["Failed to create session. Please try again."],
      },
    }
  }

  redirect("/profile/create")
}

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    accountType: formData.get("accountType"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, password, accountType } = validatedFields.data

  // Check if user already exists
  if (users.has(email)) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
    }
  }

  try {
    // Create user (in a real app, you'd save to your database)
    const userId = crypto.randomUUID()
    users.set(email, {
      id: userId,
      email,
      password, // In a real app, you'd hash this password
      firstName,
      lastName,
      accountType,
    })

    // Create session
    await createSession({
      userId,
      email,
      firstName,
      lastName,
      accountType,
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return {
      errors: {
        email: ["Failed to create account. Please try again."],
      },
    }
  }

  redirect("/profile/create")
}

export async function signOut() {
  try {
    await deleteSession()
  } catch (error) {
    console.error("Error signing out:", error)
  }
  redirect("/auth/signin")
}

export async function forgotPassword(prevState: any, formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return {
      errors: {
        email: ["Email is required"],
      },
    }
  }

  // In a real app, you'd send a password reset email
  console.log(`Password reset email would be sent to: ${email}`)

  return {
    success: true,
    message: "Password reset email sent successfully",
  }
}
