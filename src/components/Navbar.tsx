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
    <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md shadow-md z-50 border-b border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 aura-pulse">
            <img src="/logo.png" alt="AuraSight" width={36} height={36} className="rounded-lg" />
            <Link to="/" className="font-bold text-lg text-purple-400 hover:text-purple-300 transition-colors">
              AuraSight
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-purple-400 font-medium hover:text-purple-300 transition-colors energy-wave"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Philosophy
            </button>
            <button
              onClick={() => scrollToSection('synergy')}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Aura Analytics
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Our Mission
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-purple-400 transition-colors"
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
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors aura-pulse"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
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
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-md shadow-lg py-1 z-50 border border-gray-700">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleProtectedRoute('/profile')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleProtectedRoute('/match')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                    >
                      Analyze Auras
                    </button>
                    <hr className="my-1 border-gray-700" />
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        signOut?.()
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50 hover:text-red-300 transition-colors"
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
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 aura-pulse"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-purple-400 transition-colors">
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