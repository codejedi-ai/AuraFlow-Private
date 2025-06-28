"use client"

import { useState, useActionState } from "react"
import Link from "next/link"
import { forgotPassword } from "@/app/actions/auth"

export default function ForgotPassword() {
  const [state, action, isPending] = useActionState(forgotPassword, undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (state?.success || isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-300 mb-6">We've sent a password reset link to your email address.</p>
            <p className="text-gray-400 text-sm mb-8">Didn't receive the email? Check your spam folder or try again.</p>
            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 px-4 rounded-lg font-semibold text-purple-600 bg-gray-800 border border-purple-600 hover:bg-purple-50 transition-colors"
              >
                Try Different Email
              </button>
              <Link
                href="/auth/signin"
                className="block w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
          <p className="text-gray-300">No worries! Enter your email and we'll send you a reset link.</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          {state?.errors && (
            <div className="bg-red-900 border border-red-600 text-red-200 p-4 mb-6 rounded-md">
              {Object.entries(state.errors).map(([field, errors]) => (
                <p key={field}>{errors?.[0]}</p>
              ))}
            </div>
          )}

          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
