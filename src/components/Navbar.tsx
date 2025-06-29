import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

interface NavbarProps {
  user?: any
  signOut?: () => void
}

export default function Navbar({ user, signOut }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignInClick = () => {
    navigate('/signin')
  }

  const handleProtectedRoute = (path: string) => {
    if (user) {
      navigate(path)
    } else {
      navigate('/signin', { state: { from: { pathname: path } } })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="VibeScope" width={36} height={36} className="rounded-lg" />
            <Link to="/" className="font-bold text-lg text-purple-700 dark:text-purple-300 hover:text-purple-500 transition-colors">
              VibeScope
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-purple-600 dark:text-purple-300 font-medium hover:text-purple-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              Philosophy
            </button>
            <button
              onClick={() => scrollToSection('synergy')}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              Vibe & Identity
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              Our Mission
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.attributes?.given_name?.[0] || user.username[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block">
                    {user.attributes?.given_name || user.username}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleProtectedRoute('/profile')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleProtectedRoute('/match')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Find Matches
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        signOut?.()
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSignInClick}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleProtectedRoute('/match')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}