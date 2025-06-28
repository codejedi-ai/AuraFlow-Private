import { verifySession } from "@/lib/dal"
import ProfileForm from "./profile-form"

export default async function CreateProfile() {
  // Verify user is authenticated and get session data
  const { session } = await verifySession()

  const userData = {
    id: session.userId,
    email: session.email,
    firstName: session.firstName,
    lastName: session.lastName,
    accountType: session.accountType,
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-300 mb-2">Create Your Profile</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Let's build your {userData.accountType === "brand" ? "brand" : "creator"} profile to find the perfect
            matches
          </p>
        </div>

        <ProfileForm userData={userData} />
      </div>
    </div>
  )
}
