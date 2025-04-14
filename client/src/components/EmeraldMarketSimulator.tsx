import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { createMarketCapChart } from '../lib/chartUtils';
import { Token, InvestmentStage } from '@shared/schema';

const EmeraldMarketSimulator = () => {
  const [tokenPrice, setTokenPrice] = useState(7.85);
  const marketCapChartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: any; // Added to store the chart instance

  const { data: token } = useQuery<Token>({
    queryKey: ['/api/token'],
  });

  const { data: stages } = useQuery<InvestmentStage[]>({
    queryKey: ['/api/investment-stages'],
  });

  const updateTokenMutation = useMutation({
    mutationFn: async (price: number) => {
      const response = await fetch('/api/token/price', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price }),
      });

      if (!response.ok) {
        throw new Error('Failed to update token price');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/token'] });
    },
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newPrice = parseFloat(e.target.value) / 20 + 5; // Scale the slider value to $5-$10
      setTokenPrice(Number(newPrice.toFixed(2)));
      // Don't trigger mutation on every change to prevent server overload
      // Only update server when slider is released
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handlePriceChangeComplete = () => {
    try {
      updateTokenMutation.mutate(tokenPrice);
    } catch (error) {
      console.error("Error submitting price change:", error);
    }
  };

  const resetSimulation = () => {
    try {
      setTokenPrice(7.85);
      // Add a small delay before updating the server
      setTimeout(() => {
        updateTokenMutation.mutate(7.85);
      }, 100);
    } catch (error) {
      console.error("Error resetting simulation:", error);
    }
  };

  useEffect(() => {
    if (marketCapChartRef.current && token) {
      // Destroy existing chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      const totalSupply = Number(token.total_supply);
      const currentMarketCap = tokenPrice * totalSupply / 1000000; // In millions

      // Generate future market caps based on current price
      const data = [
        currentMarketCap,
        currentMarketCap * 1.2,
        currentMarketCap * 1.4,
        currentMarketCap * 1.6,
      ];

      chartInstance = createMarketCapChart(marketCapChartRef.current, data); // Assign new chart instance
    }
  }, [token, tokenPrice]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);


  if (!token || !stages) {
    return <div>Loading market simulator...</div>;
  }

  // Filter and sort stages for development unlocks
  const sortedStages = [...stages].sort((a, b) => Number(a.unlock_price) - Number(b.unlock_price));

  return (
    <div className="market-simulator-container">
      <div className="market-simulator-header">
        <h2 className="text-lg font-bold text-slate-900">Emerald Market Simulator</h2>
        <button 
          className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
          onClick={resetSimulation}
        >
          Reset Simulation
        </button>
      </div>
      <div className="market-simulator-content">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Token Price Simulation</label>
          <div className="flex items-center space-x-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={(tokenPrice - 5) * 20} 
              onChange={handlePriceChange}
              onMouseUp={handlePriceChangeComplete}
              onTouchEnd={handlePriceChangeComplete}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-bold text-slate-900">${tokenPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$5.00</span>
            <span>$10.00</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Market Cap Projection</h3>
              <div className="h-36 bg-gray-50 border border-gray-200 rounded-lg p-2">
                <canvas ref={marketCapChartRef}></canvas>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Current Cap</p>
                <p className="text-lg font-bold text-slate-900">
                  ${((Number(token.total_supply) * tokenPrice) / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Projected Cap</p>
                <p className="text-lg font-bold text-emerald-600">
                  ${((Number(token.total_supply) * tokenPrice * 1.6) / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Development Unlocks</h3>
            <div className="space-y-3 h-52 overflow-y-auto pr-2">
              {sortedStages.map(stage => {
                const isCompleted = stage.status === 'Completed';
                const isCurrent = stage.status === 'Current';
                const isPending = stage.status === 'Pending';
                const unlockPrice = Number(stage.unlock_price);

                return (
                  <div 
                    key={stage.id} 
                    className={`bg-gray-50 p-3 rounded-lg border ${
                      isCurrent 
                        ? 'border-emerald-300' 
                        : isPending && tokenPrice >= unlockPrice
                          ? 'border-emerald-300'
                          : 'border-gray-200'
                    } ${isPending && tokenPrice < unlockPrice ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className={`h-8 w-8 rounded-full border-2 ${
                          isCompleted || (isPending && tokenPrice >= unlockPrice)
                            ? 'border-emerald-500'
                            : 'border-gray-300'
                          } flex items-center justify-center ${
                            isCurrent ? 'bg-emerald-100' : 'bg-white'
                          }`}>
                          {isCompleted ? (
                            <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : isCurrent ? (
                            <span className="text-xs font-medium text-emerald-800">NOW</span>
                          ) : (
                            <span className="text-xs font-medium text-gray-500">${unlockPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">{stage.name}</h4>
                        <p className="text-xs text-gray-500">{stage.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmeraldMarketSimulator;