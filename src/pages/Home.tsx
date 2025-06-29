import { Link, useNavigate } from "react-router-dom"
import React, { useState, FormEvent } from "react"
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'

const client = generateClient()

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    isInfluencer: false,
    isBrand: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  // Pre-fill form with user data if authenticated
  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await getCurrentUser()
        if (user?.attributes) {
          setFormData(prev => ({
            ...prev,
            name: `${user.attributes.given_name || ''} ${user.attributes.family_name || ''}`.trim(),
            email: user.attributes.email || '',
          }))
        }
      } catch (error) {
        // User not authenticated, keep empty form
      }
    }
    loadUserData()
  }, [])

  const handleGetStarted = () => {
    navigate('/signin', { state: { from: { pathname: '/match' } } })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      console.log("Submitting form data:", formData)

      // TODO: Replace with Amplify GraphQL mutation
      // const response = await client.graphql({
      //   query: createContactSubmission,
      //   variables: { input: formData }
      // })

      // Temporary mock response
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitStatus({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      })
      
      // Reset form (keep user info)
      setFormData(prev => ({
        name: prev.name,
        email: prev.email,
        subject: "",
        message: "",
        isInfluencer: false,
        isBrand: false,
      }))
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Failed to submit form",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
                Welcome to AuraSight
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                The AI-powered influencer aura analytics platform that provides deep insights into influencer energy patterns through 
                advanced social media simulation and multi-agent persona analysis.
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-10 text-sm font-medium text-white shadow transition-all hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105"
              >
                Analyze Auras Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white mb-4">
              AI-Powered Aura Intelligence
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg">
              Harness the power of artificial intelligence to gain unprecedented insights into influencer auras and energy patterns
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">🔮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Aura Analysis Engine</h3>
              <p className="text-gray-300">
                Our proprietary AI analyzes influencer energy patterns, personality traits, and authentic essence to create detailed aura profiles.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Social Media Simulation</h3>
              <p className="text-gray-300">
                Test different influencer personas with our Camel-AI multi-agent simulator before committing to partnerships.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Brand Insight Analytics</h3>
              <p className="text-gray-300">
                Discover how specific words and messaging resonate with different audiences through advanced sentiment analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
              Our Philosophy
            </h2>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                At AuraSight, we believe that every influencer possesses a unique energetic signature—an aura that transcends mere content creation. This aura encompasses their authentic essence, emotional resonance, and the intangible qualities that make audiences feel genuinely connected.
              </p>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                Brands, similarly, emit their own energy patterns through their values, mission, and the emotional experiences they create. The magic happens when these energies align.
              </p>
              
              <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm p-6 rounded-lg shadow-inner my-8 border border-purple-500/30">
                <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4">
                  "The relationship between an influencer's aura and a brand's energy is like quantum entanglement. When properly aligned, they create an instantaneous resonance that transcends traditional marketing boundaries, touching audiences on a deeper, more authentic level."
                </blockquote>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                AuraSight harnesses AI to decode these complex energy patterns, creating a scientific approach to what was once purely intuitive. We analyze thousands of micro-signals—from content sentiment to audience engagement patterns—to map the invisible connections that drive authentic influence.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Our platform doesn't just match influencers with brands; it creates energetic harmony that amplifies both parties' authentic essence, resulting in partnerships that feel natural, resonate deeply, and drive meaningful engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Synergy Section */}
      <section id="synergy" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
              Aura Analytics: The Science of Influence
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Influencer Aura Mapping</h3>
                <p className="text-gray-300">
                  An influencer's aura is their unique energetic signature—the authentic essence they project through content, personality, and values. Our AI analyzes micro-expressions, language patterns, and engagement dynamics to create comprehensive aura profiles.
                </p>
                <div className="mt-6 h-40 bg-gradient-to-br from-purple-400/20 to-pink-300/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <span className="text-white text-2xl font-bold">✨ Aura Energy</span>
                </div>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">Brand Energy Analysis</h3>
                <p className="text-gray-300">
                  A brand's energy is its emotional frequency—the feeling it wants to evoke in its audience. We analyze brand communications, visual identity, and audience responses to map the brand's energetic blueprint.
                </p>
                <div className="mt-6 h-40 bg-gradient-to-br from-indigo-400/20 to-blue-300/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                  <span className="text-white text-2xl font-bold">🌊 Brand Energy</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-lg mb-12 border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 text-center">When Auras Align</h3>
              <p className="text-lg text-gray-300 mb-6">
                The magic happens when an influencer's aura resonates perfectly with a brand's energy. Our AI analyzes thousands of data points—from content sentiment to audience engagement patterns—to identify these perfect energetic matches.
              </p>
              <div className="h-60 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <span className="text-white text-3xl font-bold">🎯 Perfect Resonance</span>
              </div>
            </div>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed text-gray-300">
                When paired through our AI-powered analysis, these auras and energies create authentic partnerships that transcend traditional marketing. The result is content that feels natural, resonates deeply, and drives meaningful engagement because it's built on genuine energetic alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How AuraSight Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg mt-4">
              Our AI-powered platform creates meaningful partnerships through advanced aura analysis and energy mapping
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Map Your Energy</h3>
              <p className="text-gray-300">
                Share your brand's story, values, and desired emotional impact to create your unique energy signature.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Aura Analysis</h3>
              <p className="text-gray-300">
                Our algorithm analyzes millions of influencer data points to identify auras that resonate with your energy.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simulate & Test</h3>
              <p className="text-gray-300">
                Use our multi-agent AI simulator to test different influencer personas before making commitments.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700/50">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Resonance</h3>
              <p className="text-gray-300">
                Build authentic partnerships that amplify both your brand's energy and the influencer's unique aura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
              Our Mission
            </h2>
            
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-lg mb-12 border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">Revolutionizing Influence Through Aura Science</h3>
              <p className="text-lg text-gray-300 mb-6">
                AuraSight seeks to transform how brands and influencers connect by leveraging artificial intelligence to decode the invisible energy patterns that drive authentic influence and create deeper, more meaningful partnerships.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                <div className="bg-purple-50/10 backdrop-blur-sm p-5 rounded-lg text-center border border-purple-500/30">
                  <div className="text-purple-400 text-4xl mb-3">🔍</div>
                  <h4 className="font-semibold text-lg mb-2 text-white">Discover</h4>
                  <p className="text-gray-300">Use AI to decode aura patterns and find perfect energetic matches based on deep personality alignment</p>
                </div>
                
                <div className="bg-indigo-50/10 backdrop-blur-sm p-5 rounded-lg text-center border border-indigo-500/30">
                  <div className="text-indigo-400 text-4xl mb-3">🤖</div>
                  <h4 className="font-semibold text-lg mb-2 text-white">Simulate</h4>
                  <p className="text-gray-300">Test partnerships through multi-agent AI simulation before real-world implementation</p>
                </div>
                
                <div className="bg-blue-50/10 backdrop-blur-sm p-5 rounded-lg text-center border border-blue-500/30">
                  <div className="text-blue-400 text-4xl mb-3">✨</div>
                  <h4 className="font-semibold text-lg mb-2 text-white">Transform</h4>
                  <p className="text-gray-300">Create content that resonates on an energetic level and drives authentic engagement</p>
                </div>
              </div>
            </div>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                We recognize that every influencer possesses a unique energetic signature—an aura that encompasses their authentic essence, emotional resonance, and the intangible qualities that create genuine connection. Similarly, every brand emits its own energy pattern through its values, mission, and desired impact.
              </p>
              
              <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm p-6 rounded-lg shadow-inner my-8 border border-purple-500/30">
                <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4">
                  "Our platform thrives on the belief that partnerships must be energetically aligned and authentically resonant. AuraSight is not merely about matching profiles; it is about creating energetic harmony where aura and brand energy amplify each other, resulting in collaborations that feel natural and drive meaningful impact."
                </blockquote>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Through our innovative AI technology, multi-agent simulation capabilities, and deep understanding of energetic dynamics, we aim to revolutionize how authentic partnerships are formed in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
              Contact Us
            </h2>

            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-lg mb-12 border border-gray-700/50">
              <p className="text-lg text-gray-300 mb-8 text-center">
                Ready to discover the perfect aura alignment for your brand or showcase your unique influencer energy? Connect with
                our AI-powered team today.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus && (
                  <div
                    className={`p-4 rounded-md ${submitStatus.success ? "bg-green-900/50 text-green-200 border border-green-500/50" : "bg-red-900/50 text-red-200 border border-red-500/50"} backdrop-blur-sm`}
                  >
                    <p>{submitStatus.message}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700/80 backdrop-blur-sm text-white"
                    placeholder="Tell us more about your aura analysis needs..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isInfluencer"
                      checked={formData.isInfluencer}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-300">I'm an influencer looking to understand my aura</span>
                  </label>

                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="isBrand"
                      checked={formData.isBrand}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-300">I represent a brand seeking aura-aligned influencers</span>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md text-center border border-gray-700/50">
                <div className="text-purple-400 text-3xl mb-3">📍</div>
                <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                <p className="text-gray-300">
                  123 Innovation Way
                  <br />
                  AI District, CA 94103
                </p>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md text-center border border-gray-700/50">
                <div className="text-purple-400 text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-300">
                  hello@aurasight.ai
                  <br />
                  support@aurasight.ai
                </p>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md text-center border border-gray-700/50">
                <div className="text-purple-400 text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-300">
                  (555) 123-AURA
                  <br />
                  Mon-Fri, 9am-5pm PST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}