import { Routes, Route } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Philosophy from './pages/Philosophy'
import Synergy from './pages/Synergy'
import Mission from './pages/Mission'
import Contact from './pages/Contact'
import Match from './pages/Match'
import Results from './pages/Results'
import Profile from './pages/Profile'

const authComponents = {
  Header() {
    return (
      <div className="text-center mb-8">
        <img src="/logo.png" alt="VibeScope" className="mx-auto mb-4 w-16 h-16 rounded-lg" />
        <h1 className="text-2xl font-bold text-purple-600">Welcome to VibeScope</h1>
        <p className="text-gray-600 mt-2">Sign in to discover your perfect influencer matches</p>
      </div>
    )
  }
}

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
      isRequired: true,
      label: 'Email:'
    }
  },
  signUp: {
    username: {
      placeholder: 'Enter your email',
      isRequired: true,
      label: 'Email:',
      order: 1
    },
    password: {
      placeholder: 'Enter your password',
      isRequired: true,
      label: 'Password:',
      order: 2
    },
    confirm_password: {
      placeholder: 'Confirm your password',
      isRequired: true,
      label: 'Confirm Password:',
      order: 3
    },
    given_name: {
      placeholder: 'Enter your first name',
      isRequired: true,
      label: 'First Name:',
      order: 4
    },
    family_name: {
      placeholder: 'Enter your last name',
      isRequired: true,
      label: 'Last Name:',
      order: 5
    }
  }
}

function App() {
  return (
    <Authenticator 
      components={authComponents}
      formFields={formFields}
      hideSignUp={false}
    >
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
          <Navbar user={user} signOut={signOut} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/philosophy" element={<Philosophy />} />
              <Route path="/synergy" element={<Synergy />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/match" element={<Match />} />
              <Route path="/results" element={<Results />} />
              <Route path="/profile" element={<Profile user={user} />} />
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
      )}
    </Authenticator>
  )
}

export default App