"use client"

import type React from "react"
import { useState, useActionState } from "react"
import { createProfile } from "@/app/actions/profile"

interface UserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  accountType?: string
}

interface ProfileFormProps {
  userData: UserData
}

interface ProfileData {
  displayName: string
  bio: string
  location: string
  website: string
  accountType: string
  companyName: string
  industry: string
  companySize: string
  brandValues: string[]
  missionStatement: string
  targetAudience: string
  platforms: string[]
  followerCount: string
  contentCategories: string[]
  personalValues: string[]
  contentStyle: string
  audienceAge: string
  audienceGender: string
}

export default function ProfileForm({ userData }: ProfileFormProps) {
  const [state, action, isPending] = useActionState(createProfile, undefined)
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : "",
    bio: "",
    location: "",
    website: "",
    accountType: userData.accountType || "brand",
    companyName: "",
    industry: "",
    companySize: "",
    brandValues: [],
    missionStatement: "",
    targetAudience: "",
    platforms: [],
    followerCount: "",
    contentCategories: [],
    personalValues: [],
    contentStyle: "",
    audienceAge: "",
    audienceGender: "",
  })

  // Available options
  const availableValues = [
    "Authenticity",
    "Innovation",
    "Sustainability",
    "Inclusivity",
    "Wellness",
    "Creativity",
    "Community",
    "Empowerment",
    "Education",
    "Adventure",
    "Minimalism",
    "Luxury",
  ]

  const platforms = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Facebook", "Twitch", "Pinterest"]
  const contentCategories = [
    "Fashion",
    "Beauty",
    "Tech",
    "Travel",
    "Food",
    "Fitness",
    "Lifestyle",
    "Gaming",
    "Education",
    "Business",
  ]
  const industries = [
    "Technology",
    "Fashion",
    "Beauty",
    "Food & Beverage",
    "Travel",
    "Fitness",
    "Finance",
    "Education",
    "Entertainment",
    "Healthcare",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayToggle = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]

      return {
        ...prev,
        [field]: newArray.length <= 5 ? newArray : currentArray,
      }
    })
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const renderBasicInfo = () => (
    <>
      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Display Name</label>
        <input
          type="text"
          name="displayName"
          value={profileData.displayName}
          onChange={handleInputChange}
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
          placeholder="How should others see your name?"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Bio</label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleInputChange}
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
          placeholder="Tell us about yourself or your brand..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-2 text-gray-300">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
            placeholder="City, Country"
          />
        </div>
        <div>
          <label className="block font-medium mb-2 text-gray-300">Website</label>
          <input
            type="url"
            name="website"
            value={profileData.website}
            onChange={handleInputChange}
            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={nextStep}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </>
  )

  const renderBrandInfo = () => (
    <>
      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={profileData.companyName}
          onChange={handleInputChange}
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
          placeholder="Your company name"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-2 text-gray-300">Industry</label>
          <select
            name="industry"
            value={profileData.industry}
            onChange={handleInputChange}
            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
            required
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2 text-gray-300">Company Size</label>
          <select
            name="companySize"
            value={profileData.companySize}
            onChange={handleInputChange}
            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
            required
          >
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Mission Statement</label>
        <textarea
          name="missionStatement"
          value={profileData.missionStatement}
          onChange={handleInputChange}
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
          placeholder="What is your company's mission and purpose?"
          rows={3}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Brand Values (up to 5)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {availableValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleArrayToggle("brandValues", value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                profileData.brandValues.includes(value)
                  ? "bg-purple-600 text-white border-2 border-purple-500"
                  : "bg-gray-700 text-gray-300 border-2 border-transparent hover:bg-gray-600"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400">Selected: {profileData.brandValues.length}/5</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="w-1/2 py-3 px-4 rounded-lg font-semibold text-purple-600 bg-gray-800 border border-purple-600 hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="w-1/2 py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </>
  )

  const renderInfluencerInfo = () => (
    <>
      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Platforms</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {platforms.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => handleArrayToggle("platforms", platform)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                profileData.platforms.includes(platform)
                  ? "bg-purple-600 text-white border-2 border-purple-500"
                  : "bg-gray-700 text-gray-300 border-2 border-transparent hover:bg-gray-600"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-2 text-gray-300">Total Follower Count</label>
          <select
            name="followerCount"
            value={profileData.followerCount}
            onChange={handleInputChange}
            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
            required
          >
            <option value="">Select range</option>
            <option value="1K-10K">1K - 10K</option>
            <option value="10K-50K">10K - 50K</option>
            <option value="50K-100K">50K - 100K</option>
            <option value="100K-500K">100K - 500K</option>
            <option value="500K-1M">500K - 1M</option>
            <option value="1M+">1M+</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2 text-gray-300">Content Style</label>
          <select
            name="contentStyle"
            value={profileData.contentStyle}
            onChange={handleInputChange}
            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
            required
          >
            <option value="">Select style</option>
            <option value="Educational">Educational</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Review">Review</option>
            <option value="Storytelling">Storytelling</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Content Categories</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {contentCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleArrayToggle("contentCategories", category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                profileData.contentCategories.includes(category)
                  ? "bg-purple-600 text-white border-2 border-purple-500"
                  : "bg-gray-700 text-gray-300 border-2 border-transparent hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Personal Values (up to 5)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {availableValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleArrayToggle("personalValues", value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                profileData.personalValues.includes(value)
                  ? "bg-purple-600 text-white border-2 border-purple-500"
                  : "bg-gray-700 text-gray-300 border-2 border-transparent hover:bg-gray-600"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400">Selected: {profileData.personalValues.length}/5</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="w-1/2 py-3 px-4 rounded-lg font-semibold text-purple-600 bg-gray-800 border border-purple-600 hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="w-1/2 py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </>
  )

  const renderFinalStep = () => (
    <>
      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Target Audience Age</label>
        <select
          name="audienceAge"
          value={profileData.audienceAge}
          onChange={handleInputChange}
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
          required
        >
          <option value="">Select age range</option>
          <option value="13-17">13-17 (Gen Z)</option>
          <option value="18-24">18-24 (Gen Z)</option>
          <option value="25-34">25-34 (Millennials)</option>
          <option value="35-44">35-44 (Millennials)</option>
          <option value="45-54">45-54 (Gen X)</option>
          <option value="55+">55+ (Boomers)</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-300">Target Audience Gender</label>
        <select
          name="audienceGender"
          value={profileData.audienceGender}
          onChange={handleInputChange}
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white"
          required
        >
          <option value="">Select gender distribution</option>
          <option value="Mixed">Mixed (50/50)</option>
          <option value="Mostly Female">Mostly Female (60%+)</option>
          <option value="Mostly Male">Mostly Male (60%+)</option>
          <option value="Female">Primarily Female (80%+)</option>
          <option value="Male">Primarily Male (80%+)</option>
        </select>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-white mb-2">Profile Summary</h3>
        <p className="text-gray-300 text-sm">
          <strong>Name:</strong> {profileData.displayName}
          <br />
          <strong>Type:</strong> {profileData.accountType === "brand" ? "Brand" : "Influencer"}
          <br />
          {profileData.accountType === "brand" ? (
            <>
              <strong>Company:</strong> {profileData.companyName}
              <br />
              <strong>Values:</strong> {profileData.brandValues.join(", ")}
            </>
          ) : (
            <>
              <strong>Platforms:</strong> {profileData.platforms.join(", ")}
              <br />
              <strong>Categories:</strong> {profileData.contentCategories.join(", ")}
            </>
          )}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="w-1/2 py-3 px-4 rounded-lg font-semibold text-purple-600 bg-gray-800 border border-purple-600 hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="w-1/2 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Profile...
            </>
          ) : (
            "Complete Profile"
          )}
        </button>
      </div>
    </>
  )

  const renderStepContent = () => {
    if (step === 1) return renderBasicInfo()
    if (step === 2) {
      return profileData.accountType === "brand" ? renderBrandInfo() : renderInfluencerInfo()
    }
    if (step === 3) return renderFinalStep()
    return null
  }

  const getStepTitle = () => {
    if (step === 1) return "Basic Information"
    if (step === 2) {
      return profileData.accountType === "brand" ? "Brand Details" : "Creator Details"
    }
    if (step === 3) return "Audience & Preferences"
    return ""
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= stepNumber ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-2xl shadow-xl max-w-3xl mx-auto overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">{getStepTitle()}</h2>
          <p className="text-purple-200 text-sm mt-1">Step {step} of 3</p>
        </div>

        {state?.errors && (
          <div className="bg-red-900 border border-red-600 text-red-200 p-4 m-6 rounded-md">
            {Object.entries(state.errors).map(([field, errors]) => (
              <p key={field}>{errors?.[0]}</p>
            ))}
          </div>
        )}

        <form action={action} className="p-6">
          {/* Hidden fields to pass all data */}
          <input type="hidden" name="displayName" value={profileData.displayName} />
          <input type="hidden" name="bio" value={profileData.bio} />
          <input type="hidden" name="location" value={profileData.location} />
          <input type="hidden" name="website" value={profileData.website} />
          <input type="hidden" name="accountType" value={profileData.accountType} />
          <input type="hidden" name="companyName" value={profileData.companyName} />
          <input type="hidden" name="industry" value={profileData.industry} />
          <input type="hidden" name="companySize" value={profileData.companySize} />
          <input type="hidden" name="missionStatement" value={profileData.missionStatement} />
          <input type="hidden" name="targetAudience" value={profileData.targetAudience} />
          <input type="hidden" name="followerCount" value={profileData.followerCount} />
          <input type="hidden" name="contentStyle" value={profileData.contentStyle} />
          <input type="hidden" name="audienceAge" value={profileData.audienceAge} />
          <input type="hidden" name="audienceGender" value={profileData.audienceGender} />

          {/* Array fields */}
          {profileData.brandValues.map((value, index) => (
            <input key={`brandValue-${index}`} type="hidden" name="brandValues" value={value} />
          ))}
          {profileData.platforms.map((platform, index) => (
            <input key={`platform-${index}`} type="hidden" name="platforms" value={platform} />
          ))}
          {profileData.contentCategories.map((category, index) => (
            <input key={`category-${index}`} type="hidden" name="contentCategories" value={category} />
          ))}
          {profileData.personalValues.map((value, index) => (
            <input key={`personalValue-${index}`} type="hidden" name="personalValues" value={value} />
          ))}

          {renderStepContent()}
        </form>
      </div>
    </>
  )
}
