import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Philosophy from './pages/Philosophy'
import Synergy from './pages/Synergy'
import Mission from './pages/Mission'
import Contact from './pages/Contact'
import Match from './pages/Match'
import Results from './pages/Results'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/synergy" element={<Synergy />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/match" element={<Match />} />
          <Route path="/results" element={<Results />} />
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