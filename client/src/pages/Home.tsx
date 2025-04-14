import { Link } from 'wouter';
import PlatformIntroduction from '../components/PlatformIntroduction';

const Home = () => {
  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PlatformIntroduction />
        
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
              Industry-Leading Innovation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How XEmerald Transforms Real Estate</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our proprietary tokenization technology breaks down entry barriers to elite real estate, enabling fractional ownership with complete security, liquidity, and transparency.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 border-b-4 border-emerald-500">
              <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Invest Like a Billionaire Without Being One</h3>
              <p className="text-gray-600 mb-5">Each Emerald token represents fractional ownership in major developments like Emerald Island and GREENPORT—backed by blockchain transparency and instant liquidity.</p>
              <div className="pt-2 border-t border-gray-100">
                <Link href="/properties" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
                  <span>Browse Available Properties</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 border-b-4 border-blue-500">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Terminal-Grade Insights at Your Fingertips</h3>
              <p className="text-gray-600 mb-5">Track IRR, asset flows, and token velocity with our proprietary Falkor Terminal—designed for institutional rigor, built for everyday investors.</p>
              <div className="pt-2 border-t border-gray-100">
                <Link href="/terminal" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
                  <span>Access Falkor Terminal</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 border-b-4 border-purple-500">
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <svg className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quantum-Hardened. Investor-Focused.</h3>
              <p className="text-gray-600 mb-5">Our blockchain architecture uses post-quantum cryptography to protect your assets against the computing risks of tomorrow—today.</p>
              <div className="pt-2 border-t border-gray-100">
                <Link href="/explorer" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
                  <span>Explore Security Technology</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold tracking-wide uppercase mb-3">
              Elite Opportunities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Institutional-Grade Projects Available Now</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">These transformative developments represent the next generation of real estate investment—assets normally reserved for hedge funds and sovereign wealth entities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform transition-all hover:shadow-xl">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Emerald Island" className="w-full h-64 object-cover transform transition-transform group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Featured Property
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Emerald Island</h3>
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    87% Funded
                  </span>
                </div>
                <p className="text-gray-600 mb-6">Spanning over 1,000 acres and 55,000 units, this master-planned city features green infrastructure, wellness zones, and crypto-native ownership backed by real-world land value.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Projected IRR</div>
                    <div className="text-lg font-bold text-emerald-600">10-12%</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Total Value</div>
                    <div className="text-lg font-bold text-slate-900">$8.2B</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Min. Investment</div>
                    <div className="text-lg font-bold text-slate-900">$250</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Token Price</div>
                    <div className="text-lg font-bold text-slate-900">$10.48</div>
                  </div>
                </div>
                
                <Link href="/properties" className="block text-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-lg transform transition-all hover:scale-105">
                  Invest in Emerald Island
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform transition-all hover:shadow-xl">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1578986568870-144d3d3afff7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="GREENPORT Airport" className="w-full h-64 object-cover transform transition-transform group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  New Listing
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">GREENPORT Airport</h3>
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                    Early Access
                  </span>
                </div>
                <p className="text-gray-600 mb-6">From runways to data centers, GREENPORT is your gateway to investing in airports, spaceports, and the logistics hubs of the future—via a single Emerald token.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Total Buildout</div>
                    <div className="text-lg font-bold text-slate-900">$1.028B</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Est. Completion</div>
                    <div className="text-lg font-bold text-slate-900">Q4 2028</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Min. Investment</div>
                    <div className="text-lg font-bold text-slate-900">$500</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Token Price</div>
                    <div className="text-lg font-bold text-slate-900">$22.75</div>
                  </div>
                </div>
                
                <Link href="/properties" className="block text-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-lg transform transition-all hover:scale-105">
                  Invest in GREENPORT Airport
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-slate-900 to-emerald-900 rounded-xl shadow-xl overflow-hidden text-white mb-8">
          <div className="p-10 md:p-16 relative">
            {/* Decorative geometric elements */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-emerald-500 opacity-10 rounded-full -mt-16 -mr-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-slate-500 opacity-10 rounded-full -mb-20 -ml-20"></div>
            
            <div className="relative z-10 text-center md:text-left md:max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-900 text-emerald-100 text-xs font-semibold tracking-wide uppercase mb-3 border border-emerald-700">
                Join The Future
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Don't Miss Your Opportunity To Invest Like The <span className="text-emerald-400">Global Elite</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 md:pr-12">
                XEmerald's revolutionary platform democratizes access to the world's most exclusive real estate assets through next-generation tokenization technology. Start your journey now.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                <Link href="/dashboard" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105 flex items-center justify-center">
                  <span>Access Investor Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/market" className="w-full md:w-auto bg-transparent hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-lg border border-gray-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17l4-4m0 0l-4-4m4 4H3" />
                  </svg>
                  <span>Explore Market Simulator</span>
                </Link>
              </div>
              
              <p className="text-gray-400 text-sm mt-6 flex flex-col md:flex-row items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Military-grade encryption protects your investments and personal data.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;