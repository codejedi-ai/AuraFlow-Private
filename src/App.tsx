import { Routes, Route } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import { getCurrentUser } from 'aws-amplify/auth'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Philosophy from './pages/Philosophy'
import Synergy from './pages/Synergy'
import Mission from './pages/Mission'
import Contact from './pages/Contact'
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
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Navbar user={user} signOut={handleSignOut} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn onSignIn={checkAuthState} />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/synergy" element={<Synergy />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/match" element={user ? <Match /> : <SignIn onSignIn={checkAuthState} />} />
          <Route path="/results" element={user ? <Results /> : <SignIn onSignIn={checkAuthState} />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <SignIn onSignIn={checkAuthState} />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} VibeScope. All rights reserved.</p>
          <p className="mt-2 text-gray-400 text-sm">
            Advanced influencer aura tracking and brand resonance optimization.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App