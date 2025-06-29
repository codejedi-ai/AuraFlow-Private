import { useState, useEffect } from 'react'
import { signIn, signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { useNavigate, useLocation } from 'react-router-dom'

interface SignInProps {
  onSignIn: () => void
}

export default function SignIn({ onSignIn }: SignInProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSignUp, setIsSignUp] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    confirmationCode: ''
  })

  // Get the intended destination from location state, default to home
  const from = location.state?.from?.pathname || '/'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await signIn({
        username: formData.email,
        password: formData.password
      })
      
      onSignIn()
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error('Sign in error:', error)
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.firstName,
            family_name: formData.lastName
          }
        }
      })
      
      setNeedsConfirmation(true)
      setSuccess('Account created! Please check your email for a confirmation code.')
    } catch (error: any) {
      console.error('Sign up error:', error)
      setError(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: formData.confirmationCode
      })
      
      setSuccess('Email confirmed! You can now sign in.')
      setNeedsConfirmation(false)
      setIsSignUp(false)
      setFormData(prev => ({ ...prev, confirmationCode: '' }))
    } catch (error: any) {
      console.error('Confirmation error:', error)
      setError(error.message || 'Failed to confirm account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await resendSignUpCode({ username: formData.email })
      setSuccess('Confirmation code resent to your email.')
    } catch (error: any) {
      console.error('Resend code error:', error)
      setError(error.message || 'Failed to resend code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFederatedSignIn = (provider: string) => {
    // TODO: Implement federated sign-in
    console.log(`Sign in with ${provider}`)
    setError(`${provider} sign-in coming soon!`)
  }

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Animated Background */}
      <div className="energy-background"></div>
      <div className="energy-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-4xl font-bold text-white text-center">
          Sign {isSignUp ? 'up for' : 'in to'} AuraSight
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-8 flex items-center justify-between">
          
          {/* Left Side - Email Sign In/Up */}
          <div className="w-5/12">
            <div className="bg-gray-800/95 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {needsConfirmation ? 'Confirm Your Email' : isSignUp ? 'Create Account' : 'Email Sign In'}
              </h2>

              {error && (
                <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-900/50 border border-green-500/50 text-green-200 p-3 rounded-md mb-4 text-sm">
                  {success}
                </div>
              )}

              {needsConfirmation ? (
                <form onSubmit={handleConfirmSignUp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirmation Code
                    </label>
                    <input
                      type="text"
                      name="confirmationCode"
                      value={formData.confirmationCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="Enter 6-digit code"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Confirming...' : 'Confirm Email'}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    Resend confirmation code
                  </button>
                </form>
              ) : isSignUp ? (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              )}

              {!needsConfirmation && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError(null)
                      setSuccess(null)
                    }}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center - AuraSight Logo */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-800/95 backdrop-blur-md p-8 rounded-full shadow-2xl border border-gray-700/50">
              <img 
                src="/logo.png" 
                alt="AuraSight" 
                className="w-24 h-24 rounded-lg"
              />
            </div>
          </div>

          {/* Right Side - Federated Identities */}
          <div className="w-5/12">
            <div className="bg-gray-800/95 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Quick Sign In
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleFederatedSignIn('Google')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={() => handleFederatedSignIn('Facebook')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </button>

                <button
                  onClick={() => handleFederatedSignIn('Apple')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.557.37 4.697.594 3.953.89c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.884.11 5.744-.054 6.978-.218 8.214-.262 8.585-.262 12.207s.044 3.993.207 5.228c.163 1.234.387 2.094.683 2.838.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.744.296 1.604.52 2.838.684 1.235.164 1.606.207 5.228.207s3.993-.043 5.228-.207c1.234-.164 2.094-.388 2.838-.684.789-.305 1.459-.718 2.126-1.384.666-.667 1.079-1.337 1.384-2.126.296-.744.52-1.604.684-2.838.164-1.235.207-1.606.207-5.228s-.043-3.993-.207-5.228c-.164-1.234-.388-2.094-.684-2.838-.305-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.744-.297-1.604-.52-2.838-.684C15.787.043 15.416 0 12.017 0zM12.017 2.162c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.653c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Continue with Apple
                </button>

                <button
                  onClick={() => handleFederatedSignIn('LinkedIn')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </button>

                <button
                  onClick={() => handleFederatedSignIn('GitHub')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Quick and secure authentication with your preferred platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}