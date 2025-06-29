import { Routes, Route } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import { getCurrentUser } from 'aws-amplify/auth'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Match from './pages/Match'
import Results from './pages/Results'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { signOut } = await import('aws-amplify/auth')
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Animated Background */}
        <div className="energy-background"></div>
        <div className="energy-particles">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Loading AuraSight...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="energy-background"></div>
      <div className="energy-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <div className="relative z-10">
        <Navbar user={user} signOut={handleSignOut} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn onSignIn={checkAuthState} />} />
            <Route path="/match" element={user ? <Match /> : <SignIn onSignIn={checkAuthState} />} />
            <Route path="/results" element={user ? <Results /> : <SignIn onSignIn={checkAuthState} />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <SignIn onSignIn={checkAuthState} />} />
          </Routes>
        </main>
        <footer className="bg-gray-800/80 backdrop-blur-sm text-white p-6 mt-12 border-t border-gray-700/50">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} AuraSight. All rights reserved.</p>
            <p className="mt-2 text-gray-400 text-sm">
              AI-powered influencer aura analytics and brand insight optimization.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App