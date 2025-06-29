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
        <img src="/logo.png" alt="AuraVibe" className="mx-auto mb-4 w-16 h-16 rounded-lg" />
        <h1 className="text-2xl font-bold text-purple-600">Welcome to AuraVibe</h1>
        <p className="text-gray-600 mt-2">Sign in to discover your perfect aura-vibe matches</p>
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-300">Signing you in...</p>
              </div>
            )
          }}
        </Authenticator>
      </div>
    </div>
  )
}