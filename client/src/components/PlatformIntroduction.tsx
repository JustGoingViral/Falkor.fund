import { Link } from 'wouter';

const PlatformIntroduction = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-xl overflow-hidden mb-12">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/3 relative">
          <img 
            className="h-64 w-full object-cover md:h-full" 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
            alt="Luxury real estate development" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900 md:bg-gradient-to-l"></div>
        </div>
        <div className="p-8 md:p-10 md:w-2/3">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
            Premium Investment Opportunity
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Own a Piece of Billion-Dollar <span className="text-emerald-400">Developments</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            XEmerald gives you tokenized access to premium real estate projects previously exclusive to hedge funds, sovereign wealth funds, and elite private equity groups.
          </p>
          <div className="mt-6 mb-2 flex flex-col sm:flex-row gap-3">
            <Link href="/properties" className="w-full sm:w-auto">
              <div className="w-full bg-emerald-600 hover:bg-emerald-500 transform hover:scale-105 transition-all text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center">
                <span>Start Investing Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
            <Link href="/market" className="w-full sm:w-auto">
              <div className="w-full bg-transparent hover:bg-slate-700 border border-gray-600 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                <span>Try Risk-Free Demo</span>
              </div>
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No minimum investment period
            </span>
            <span className="inline-flex items-center ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quantum-secured transactions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformIntroduction;
