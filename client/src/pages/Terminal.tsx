import InvestorModeToggle from '../components/InvestorModeToggle';
import FalkorTerminal from '../components/FalkorTerminal';

const Terminal = () => {
  return (
    <>
      <InvestorModeToggle />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Real-Time Intelligence for Real Asset Performance</h1>
            <p className="text-gray-600 mt-2">Visualize your IRR, monitor capital flow, and get clarity on how tokenized assets move through development phases</p>
          </div>
          
          <FalkorTerminal />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Terminal Documentation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold text-slate-800">Live IRR Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor real-time internal rate of return across all tokenized properties in the portfolio.</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-slate-800">Asset Flow Analysis</h3>
                  <p className="text-sm text-gray-600">Visualize token movement and liquidity trends over time with interactive charts.</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-slate-800">Smart Contract Walkthroughs</h3>
                  <p className="text-sm text-gray-600">Trust the Code, Not the Promises — Get a transparent view of every smart contract powering your investment.</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-slate-800">Asset Registry</h3>
                  <p className="text-sm text-gray-600">View comprehensive registry of all tokenized assets backing Emerald tokens with corresponding token allocations.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Terminal Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Update Frequency</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
                    <option>Real-time</option>
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Visualization</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
                    <option>Standard Charts</option>
                    <option>Advanced Analytics</option>
                    <option>Minimalist View</option>
                  </select>
                </div>
                <div className="pt-3">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg">
                    Apply Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Terminal;
