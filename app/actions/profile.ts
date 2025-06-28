"use server"

import { verifySession } from "@/lib/dal"
import { redirect } from "next/navigation"
import { z } from "zod"

const profileSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  accountType: z.enum(["brand", "influencer"]),

  // Brand fields
  companyName: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  brandValues: z.array(z.string()).optional(),
  missionStatement: z.string().optional(),
  targetAudience: z.string().optional(),

  // Influencer fields
  platforms: z.array(z.string()).optional(),
  followerCount: z.string().optional(),
  contentCategories: z.array(z.string()).optional(),
  personalValues: z.array(z.string()).optional(),
  contentStyle: z.string().optional(),
  audienceAge: z.string().optional(),
  audienceGender: z.string().optional(),
})

export async function createProfile(prevState: any, formData: FormData) {
  // Verify user is authenticated
  const { session } = await verifySession()

  // Parse form data
  const rawData = {
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    website: formData.get("website"),
    accountType: formData.get("accountType"),
    companyName: formData.get("companyName"),
    industry: formData.get("industry"),
    companySize: formData.get("companySize"),
    brandValues: formData.getAll("brandValues"),
    missionStatement: formData.get("missionStatement"),
    targetAudience: formData.get("targetAudience"),
    platforms: formData.getAll("platforms"),
    followerCount: formData.get("followerCount"),
    contentCategories: formData.getAll("contentCategories"),
    personalValues: formData.getAll("personalValues"),
    contentStyle: formData.get("contentStyle"),
    audienceAge: formData.get("audienceAge"),
    audienceGender: formData.get("audienceGender"),
  }

  const validatedFields = profileSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // In a real app, you'd save this to your database
    console.log("Profile data for user:", session.userId, validatedFields.data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to match page
    redirect("/match")
  } catch (error) {
    console.error("Error creating profile:", error)
    return {
      errors: {
        general: ["Failed to create profile. Please try again."],
      },
    }
  }
}
