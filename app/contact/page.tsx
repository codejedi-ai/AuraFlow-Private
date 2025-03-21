export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto pt-20 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
        Contact Us
      </h1>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12 border border-gray-700">
        <p className="text-lg text-gray-300 mb-8 text-center">
          Ready to discover the perfect match for your brand or showcase your unique influencer vibe? 
          Get in touch with our team today.
        </p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What is this regarding?"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows={6} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Tell us more about your needs..."
            ></textarea>
          </div>
          
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-600">I'm an influencer looking to connect with brands</span>
            </label>
            
            <label className="flex items-center mt-2">
              <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-600">I represent a brand looking for influencers</span>
            </label>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
          <div className="text-purple-600 text-3xl mb-3">📍</div>
          <h3 className="font-semibold text-lg mb-2">Our Location</h3>
          <p className="text-gray-300">123 Innovation Way<br />Digital District, CA 94103</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
          <div className="text-purple-600 text-3xl mb-3">📧</div>
          <h3 className="font-semibold text-lg mb-2">Email Us</h3>
          <p className="text-gray-300">hello@auramatch.com<br />support@auramatch.com</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-700">
          <div className="text-purple-600 text-3xl mb-3">📱</div>
          <h3 className="font-semibold text-lg mb-2">Call Us</h3>
          <p className="text-gray-300">(555) 123-4567<br />Mon-Fri, 9am-5pm PST</p>
        </div>
      </div>
    </div>
  );
}
