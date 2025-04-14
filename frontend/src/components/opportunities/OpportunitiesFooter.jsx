const OpportunitiesFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1 rounded-lg">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">NoPoverty<span className="text-yellow-300">Opportunities</span></span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting individuals with life-changing opportunities to break the cycle of poverty.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a key={social} href="#" className="text-gray-300 hover:text-white transition">
                  <span className="sr-only">{social}</span>
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Opportunity Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Opportunities</h4>
            <ul className="space-y-2">
              {['Jobs', 'Grants', 'Investments', 'Training Programs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition hover:underline underline-offset-4">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Resources</h4>
            <ul className="space-y-2">
              {['Application Tips', 'Interview Prep', 'Grant Writing', 'Financial Literacy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition hover:underline underline-offset-4">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get notified about new opportunities
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} NoPoverty Platform. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OpportunitiesFooter;