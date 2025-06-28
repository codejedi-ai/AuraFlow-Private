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

export async function signIn(formData: FormData) {
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

  // Create session
  await createSession({
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    accountType: user.accountType,
  })

  redirect("/profile/create")
}

export async function signUp(formData: FormData) {
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

  redirect("/profile/create")
}

export async function signOut() {
  await deleteSession()
  redirect("/auth/signin")
}

export async function forgotPassword(formData: FormData) {
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
