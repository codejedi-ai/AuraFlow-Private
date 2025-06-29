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
                Welcome to VibeScope
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                The ultimate influencer aura management platform. Track vibes, analyze brand resonance, and discover the
                perfect energy for your marketing campaigns.
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-10 text-sm font-medium text-white shadow transition-colors hover:from-purple-700 hover:to-indigo-700"
              >
                Start Matching Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="w-full py-12 md:py-24 lg:py-32 bg-gray-700">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Our Philosophy
            </h2>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                At VibeScope, we believe that the essence of connection lies in synergy—where the vibrant energy of an influencer's unique "vibe" meets the grounded strength of a brand's "identity." Influencers do more than create content; they emanate a personal ethos, a set of feelings, and an atmosphere that resonates with their audience.
              </p>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                Brands, in turn, are not merely logos or taglines; they are embodiments of purpose and values that shape perceptions and inspire loyalty.
              </p>
              
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-inner my-8">
                <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4">
                  "The relationship between an influencer's vibe and a brand's identity is like the interplay of light and photons. Just as light brings life and clarity to the world through its photons, influencers illuminate and bring purpose to brand identities. Together, they form an inseparable bond, one amplifying the other."
                </blockquote>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                VibeScope seeks to capture this harmony, connecting the expressive energy of influencers with the intentional vision of brands. We recognize that every influencer offers a unique spectrum of emotions, creativity, and authenticity—an aura that shapes how they are perceived.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Our platform thrives on the belief that partnerships must be meaningful and authentic. VibeScope is not merely about bridging gaps; it is about weaving relationships where identity and vibe amplify each other, creating collaborations that stand out and leave a lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Synergy Section */}
      <section id="synergy" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Vibe & Identity: The Perfect Synergy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Influencer Vibe</h3>
                <p className="text-gray-300">
                  Influencers emanate a personal ethos, a set of feelings, and an atmosphere that resonates with their audience. This unique "vibe" is the energy they bring to every piece of content they create.
                </p>
                <div className="mt-6 h-40 bg-gradient-to-br from-purple-400 to-pink-300 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Energy</span>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Brand Identity</h3>
                <p className="text-gray-300">
                  Brands are embodiments of purpose and values that shape perceptions and inspire loyalty. Their "identity" is the foundation of how they're perceived in the marketplace.
                </p>
                <div className="mt-6 h-40 bg-gradient-to-br from-indigo-400 to-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Purpose</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">When Vibe Meets Identity</h3>
              <p className="text-lg text-gray-300 mb-6">
                The relationship between an influencer's vibe and a brand's identity is like the interplay of light and photons. Just as light brings life and clarity to the world through its photons, influencers illuminate and bring purpose to brand identities.
              </p>
              <div className="h-60 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-3xl font-bold">Transformation</span>
              </div>
            </div>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed text-gray-300">
                When paired thoughtfully, these auras and identities merge to create something that is not only authentic but also transformative—a shared story that resonates deeply with audiences. Together, they form an inseparable bond, one amplifying the other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-700">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Find Your Perfect Match</h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg mt-4">
              Our platform helps brands and influencers create meaningful partnerships based on shared values and
              authentic connections.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Define Your Identity</h3>
              <p className="text-gray-300">
                Share your brand's story, values, and mission to help us understand your unique identity.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Aligned Vibes</h3>
              <p className="text-gray-300">
                Our algorithm matches you with influencers whose personal ethos resonates with your brand.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Authentic Partnerships</h3>
              <p className="text-gray-300">
                Build meaningful relationships that amplify both your brand and the influencer's unique voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Our Mission
            </h2>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">Creating Meaningful Connections</h3>
              <p className="text-lg text-gray-300 mb-6">
                VibeScope seeks to capture the harmony between influencers and brands, connecting the expressive energy of influencers with the intentional vision of brands.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                <div className="bg-purple-50 p-5 rounded-lg text-center">
                  <div className="text-purple-600 text-4xl mb-3">🔍</div>
                  <h4 className="font-semibold text-lg mb-2 text-black">Discover</h4>
                  <p className="text-gray-600">Find the perfect match based on authentic alignment of values and energy</p>
                </div>
                
                <div className="bg-indigo-50 p-5 rounded-lg text-center">
                  <div className="text-indigo-600 text-4xl mb-3">🤝</div>
                  <h4 className="font-semibold text-lg mb-2 text-black">Connect</h4>
                  <p className="text-gray-600">Build relationships that go beyond transactional partnerships</p>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg text-center">
                  <div className="text-blue-600 text-4xl mb-3">✨</div>
                  <h4 className="font-semibold text-lg mb-2 text-black">Transform</h4>
                  <p className="text-gray-600">Create content that resonates deeply with audiences</p>
                </div>
              </div>
            </div>
            
            <div className="prose lg:prose-xl mx-auto">
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                We recognize that every influencer offers a unique spectrum of emotions, creativity, and authenticity—an aura that shapes how they are perceived. Similarly, every brand holds an identity rooted in its mission, values, and aspirations.
              </p>
              
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-inner my-8">
                <blockquote className="italic text-gray-300 border-l-4 border-purple-500 pl-4">
                  "Our platform thrives on the belief that partnerships must be meaningful and authentic. VibeScope is not merely about bridging gaps; it is about weaving relationships where identity and vibe amplify each other, creating collaborations that stand out and leave a lasting impact."
                </blockquote>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Through our innovative matching technology and deep understanding of both influencer dynamics and brand needs, we aim to revolutionize how partnerships are formed in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-700">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Contact Us
            </h2>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
              <p className="text-lg text-gray-300 mb-8 text-center">
                Ready to discover the perfect match for your brand or showcase your unique influencer vibe? Get in touch with
                our team today.
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
                    placeholder="Tell us more about your needs..."
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
                  Digital District, CA 94103
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
                <div className="text-purple-600 text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-300">
                  hello@vibescope.com
                  <br />
                  support@vibescope.com
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
                <div className="text-purple-600 text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-300">
                  (555) 123-4567
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