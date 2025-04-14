import { useState, useEffect } from 'react';
import InvestorModeToggle from '../components/InvestorModeToggle';
import TokenPurchaseSimulator from '../components/TokenPurchaseSimulator';
import EmeraldMarketSimulator from '../components/EmeraldMarketSimulator';
import ErrorBoundary from '../components/ErrorBoundary';

const Market = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Ensure components are fully loaded before rendering
    setIsLoaded(true);
    
    // Listen for investor type changes to refresh the page if needed
    const handleInvestorChange = () => {
      // Force refresh market data
      setIsLoaded(false);
      setTimeout(() => setIsLoaded(true), 50);
    };
    
    window.addEventListener('investor-type-changed', handleInvestorChange);
    return () => window.removeEventListener('investor-type-changed', handleInvestorChange);
  }, []);
  
  return (
    <>
      <InvestorModeToggle />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Forecast the Future. Simulate the Present.</h1>
            <p className="text-gray-600 mt-2">Use our token simulator to see how Emerald's price reacts to major development phases—like land acquisition, permitting, or construction milestones.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {isLoaded ? (
                <ErrorBoundary fallback={<div className="p-4 bg-white rounded-xl shadow-md">Error loading Market Simulator. Please refresh the page.</div>}>
                  <EmeraldMarketSimulator />
                </ErrorBoundary>
              ) : (
                <div className="p-4 bg-white rounded-xl shadow-md">Loading market simulator...</div>
              )}
            </div>
            <div>
              {isLoaded ? (
                <ErrorBoundary fallback={<div className="p-4 bg-white rounded-xl shadow-md">Error loading Token Purchase. Please refresh the page.</div>}>
                  <TokenPurchaseSimulator />
                </ErrorBoundary>
              ) : (
                <div className="p-4 bg-white rounded-xl shadow-md">Loading token purchase...</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Market;
