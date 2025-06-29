import { Authenticator } from '@aws-amplify/ui-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

interface SignInProps {
  onSignIn: () => void
}

const authComponents = {
  Header() {
    return (
      <div className="text-center mb-8">
        <img src="/logo.png" alt="AuraSight" className="mx-auto mb-4 w-16 h-16 rounded-lg" />
        <h1 className="text-3xl font-bold text-purple-400 mb-2">Welcome to AuraSight</h1>
        <p className="text-gray-300">Sign in to discover your perfect aura alignments</p>
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

export default function SignIn({ onSignIn }: SignInProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // Get the intended destination from location state, default to home
  const from = location.state?.from?.pathname || '/'

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="energy-background"></div>
      <div className="energy-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-800/95 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700/50">
          <Authenticator 
            components={authComponents}
            formFields={formFields}
            hideSignUp={false}
          >
            {({ user }) => {
              // When user signs in successfully, call onSignIn and navigate
              useEffect(() => {
                if (user) {
                  onSignIn()
                  navigate(from, { replace: true })
                }
              }, [user])

              return (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-300 text-lg">Analyzing your aura...</p>
                </div>
              )
            }}
          </Authenticator>
        </div>
      </div>
    </div>
  )
}