import { useState } from 'react'
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { useNavigate, Link } from 'react-router-dom'

interface SignUpProps {
  onSignUp: () => void
}

export default function SignUp({ onSignUp }: SignUpProps) {
  const navigate = useNavigate()
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
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
      
      setSuccess('Email confirmed! Redirecting to sign in...')
      setTimeout(() => {
        navigate('/signin')
      }, 2000)
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

  const handleFederatedSignUp = (provider: string) => {
    // TODO: Implement federated sign-up
    console.log(`Sign up with ${provider}`)
    setError(`${provider} sign-up coming soon!`)
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
          Sign up for AuraSight
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-8 flex items-center justify-between">
          
          {/* Left Side - Email Sign Up */}
          <div className="w-5/12">
            <div className="bg-gray-800/95 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {needsConfirmation ? 'Confirm Your Email' : 'Create Account'}
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
              ) : (
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
              )}

              {!needsConfirmation && (
                <div className="mt-6 text-center">
                  <Link
                    to="/signin"
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    Already have an account? Sign in
                  </Link>
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
                Quick Sign Up
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleFederatedSignUp('Google')}
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
                  onClick={() => handleFederatedSignUp('Facebook')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </button>

                <button
                  onClick={() => handleFederatedSignUp('Twitter')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Continue with Twitter
                </button>

                <button
                  onClick={() => handleFederatedSignUp('LinkedIn')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Quick and secure registration with your preferred platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}