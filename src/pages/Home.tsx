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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
                Welcome to AuraVibe
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                The AI-powered influencer management platform that matches influencer auras with brand vibes through 
                advanced social media simulation and multi-agent persona analysis.
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-10 text-sm font-medium text-white shadow transition-colors hover:from-purple-700 hover:to-indigo-700"
              >
                Start Matching Auras
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-700">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white mb-4">
              AI-Powered Influencer Intelligence
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg">
              Harness the power of artificial intelligence to create perfect brand-influencer synergy
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Aura-Vibe Matching</h3>
              <p className="text-gray-300">
                Our proprietary algorithm analyzes influencer auras and matches them with your brand's unique vibe for authentic partnerships.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Social Media Simulation</h3>
              <p className="text-gray-300">
                Test different influencer personas with our Camel-AI multi-agent simulator before committing to partnerships.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Brand Research Analytics</h3>
              <p className="text-gray-300">
                Discover how specific words and messaging appeal to different audiences through advanced sentiment analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Our Philosophy
            </h2>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                At AuraVibe, we believe that the essence of connection lies in synergy—where the vibrant energy of an influencer's unique "aura" meets the grounded strength of a brand's "vibe." Influencers do more than create content; they emanate a personal ethos, a set of feelings, and an atmosphere that resonates with their audience.
              </p>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                Brands, in turn, are not merely logos or taglines; they are embodiments of purpose and values that shape perceptions and inspire loyalty.
              </p>
              
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-inner my-8">
                <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4">
                  "The relationship between an influencer's aura and a brand's vibe is like the interplay of quantum particles. Just as particles can be entangled across vast distances, influencers and brands can create instantaneous resonance that transcends traditional marketing boundaries."
                </blockquote>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                AuraVibe seeks to capture this harmony through AI-powered analysis, connecting the expressive energy of influencers with the intentional vision of brands. We recognize that every influencer offers a unique spectrum of emotions, creativity, and authenticity—an aura that shapes how they are perceived.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Our platform thrives on the belief that partnerships must be meaningful and authentic. AuraVibe is not merely about bridging gaps; it is about weaving relationships where aura and vibe amplify each other, creating collaborations that stand out and leave a lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Synergy Section */}
      <section id="synergy" className="w-full py-12 md:py-24 lg:py-32 bg-gray-700">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Aura & Vibe: The Perfect Synergy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Influencer Aura</h3>
                <p className="text-gray-300">
                  An influencer's aura is their unique energetic signature—the authentic essence they project through content, personality, and values. It's the intangible quality that makes audiences feel connected and inspired.
                </p>
                <div className="mt-6 h-40 bg-gradient-to-br from-purple-400 to-pink-300 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">✨ Aura</span>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Brand Vibe</h3>
                <p className="text-gray-300">
                  A brand's vibe is its emotional frequency—the feeling it wants to evoke in its audience. It encompasses the brand's personality, values, and the atmosphere it creates in every interaction.
                </p>
                <div className="mt-6 h-40 bg-gradient-to-br from-indigo-400 to-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🌊 Vibe</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">When Aura Meets Vibe</h3>
              <p className="text-lg text-gray-300 mb-6">
                The magic happens when an influencer's aura resonates perfectly with a brand's vibe. Our AI analyzes thousands of data points—from content sentiment to audience engagement patterns—to identify these perfect matches.
              </p>
              <div className="h-60 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-3xl font-bold">🎯 Perfect Match</span>
              </div>
            </div>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed text-gray-300">
                When paired thoughtfully through our AI-powered matching system, these auras and vibes merge to create something that is not only authentic but also transformative—a shared story that resonates deeply with audiences and drives meaningful engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How AuraVibe Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg mt-4">
              Our AI-powered platform creates meaningful partnerships through advanced analysis and simulation
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Define Your Vibe</h3>
              <p className="text-gray-300">
                Share your brand's story, values, and desired emotional impact to map your unique vibe signature.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Aura Analysis</h3>
              <p className="text-gray-300">
                Our algorithm analyzes millions of influencer data points to identify auras that resonate with your vibe.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simulate & Test</h3>
              <p className="text-gray-300">
                Use our multi-agent AI simulator to test different influencer personas before making commitments.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Magic</h3>
              <p className="text-gray-300">
                Build authentic partnerships that amplify both your brand's vibe and the influencer's unique aura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="w-full py-12 md:py-24 lg:py-32 bg-gray-700">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Our Mission
            </h2>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">Revolutionizing Influencer Marketing with AI</h3>
              <p className="text-lg text-gray-300 mb-6">
                AuraVibe seeks to transform how brands and influencers connect by leveraging artificial intelligence to create deeper, more authentic partnerships that resonate with audiences on an emotional level.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                <div className="bg-purple-50 p-5 rounded-lg text-center">
                  <div className="text-purple-600 text-4xl mb-3">🔍</div>
                  <h4 className="font-semibold text-lg mb-2 text-black">Discover</h4>
                  <p className="text-gray-600">Use AI to find perfect aura-vibe matches based on deep personality and value alignment</p>
                </div>
                
                <div className="bg-indigo-50 p-5 rounded-lg text-center">
                  <div className="text-indigo-600 text-4xl mb-3">🤖</div>
                  <h4 className="font-semibold text-lg mb-2 text-black">Simulate</h4>
                  <p className="text-gray-600">Test partnerships through multi-agent AI simulation before real-world implementation</p>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg text-center">
                  <div className="text-blue-600 text-4xl mb-3">✨</div>
                  <h4 className="font-semibold text-lg mb-2 text-black">Transform</h4>
                  <p className="text-gray-600">Create content that resonates deeply and drives authentic audience engagement</p>
                </div>
              </div>
            </div>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                We recognize that every influencer offers a unique spectrum of emotions, creativity, and authenticity—an aura that shapes how they are perceived. Similarly, every brand holds a vibe rooted in its mission, values, and aspirations.
              </p>
              
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-inner my-8">
                <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4">
                  "Our platform thrives on the belief that partnerships must be meaningful and authentic. AuraVibe is not merely about bridging gaps; it is about weaving relationships where aura and vibe amplify each other, creating collaborations that stand out and leave a lasting impact."
                </blockquote>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Through our innovative AI technology, multi-agent simulation capabilities, and deep understanding of both influencer dynamics and brand psychology, we aim to revolutionize how partnerships are formed in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Contact Us
            </h2>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
              <p className="text-lg text-gray-300 mb-8 text-center">
                Ready to discover the perfect aura-vibe match for your brand or showcase your unique influencer energy? Get in touch with
                our AI-powered team today.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus && (
                  <div
                    className={`p-4 rounded-md ${submitStatus.success ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"}`}
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
                      className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
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
                      className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
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
                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
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
                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="Tell us more about your aura-vibe matching needs..."
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
                    <span className="ml-2 text-sm text-gray-300">I'm an influencer looking to connect with brands</span>
                  </label>

                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="isBrand"
                      checked={formData.isBrand}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-300">I represent a brand looking for influencers</span>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
                <div className="text-purple-600 text-3xl mb-3">📍</div>
                <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                <p className="text-gray-300">
                  123 Innovation Way
                  <br />
                  AI District, CA 94103
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
                <div className="text-purple-600 text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-300">
                  hello@auravibe.ai
                  <br />
                  support@auravibe.ai
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
                <div className="text-purple-600 text-3xl mb-3">📱</div>
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