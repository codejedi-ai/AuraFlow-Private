import React, { useState } from 'react'
import { updateUserAttributes } from 'aws-amplify/auth'

interface ProfileProps {
  user: any
}

export default function Profile({ user }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formData, setFormData] = useState({
    given_name: user?.attributes?.given_name || '',
    family_name: user?.attributes?.family_name || '',
    email: user?.attributes?.email || '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      await updateUserAttributes({
        userAttributes: {
          given_name: formData.given_name,
          family_name: formData.family_name,
        }
      })

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      given_name: user?.attributes?.given_name || '',
      family_name: user?.attributes?.family_name || '',
      email: user?.attributes?.email || '',
    })
    setIsEditing(false)
    setMessage(null)
  }

  return (
    <div className="max-w-2xl mx-auto pt-20">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div className={`p-4 rounded-md mb-6 ${
            message.type === 'success' 
              ? 'bg-green-900 text-green-200 border border-green-600' 
              : 'bg-red-900 text-red-200 border border-red-600'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.attributes?.given_name?.[0] || user?.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {user?.attributes?.given_name} {user?.attributes?.family_name}
              </h2>
              <p className="text-gray-400">@{user?.username}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="given_name"
                  value={formData.given_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                />
              ) : (
                <p className="text-white bg-gray-700 px-4 py-2 rounded-md">
                  {user?.attributes?.given_name || 'Not set'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="family_name"
                  value={formData.family_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                />
              ) : (
                <p className="text-white bg-gray-700 px-4 py-2 rounded-md">
                  {user?.attributes?.family_name || 'Not set'}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <p className="text-white bg-gray-700 px-4 py-2 rounded-md">
                {user?.attributes?.email}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed. Contact support if you need to update your email.
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Username:</span>
                <span className="text-white ml-2">{user?.username}</span>
              </div>
              <div>
                <span className="text-gray-400">Account Status:</span>
                <span className="text-green-400 ml-2">
                  {user?.attributes?.email_verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Member Since:</span>
                <span className="text-white ml-2">
                  {new Date(user?.attributes?.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}