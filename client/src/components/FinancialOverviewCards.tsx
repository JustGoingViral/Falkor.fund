import { useQuery } from '@tanstack/react-query';
import { LineChart, Percent, Coins } from 'lucide-react';
import { useInvestor } from '../contexts/InvestorContext';
import { Token } from '@shared/schema';

const FinancialOverviewCards = () => {
  const { investorType } = useInvestor();
  const { data: token } = useQuery<Token>({
    queryKey: ['/api/token']
  });

  // Calculate values based on investor type
  const getInvestmentAmount = () => {
    switch (investorType) {
      case 'Institutional':
        return 14.2;
      case 'Sovereign Fund':
        return 85.6;
      case 'Retail':
        return 0.86;
      default:
        return 14.2;
    }
  };

  const getCurrentIRR = () => {
    switch (investorType) {
      case 'Institutional':
        return 11.2;
      case 'Sovereign Fund':
        return 10.8;
      case 'Retail':
        return 11.5;
      default:
        return 11.2;
    }
  };

  const getTokenHoldings = () => {
    switch (investorType) {
      case 'Institutional':
        return 1.8;
      case 'Sovereign Fund':
        return 10.5;
      case 'Retail':
        return 0.11;
      default:
        return 1.8;
    }
  };

  // Calculate the token value
  const calculateTokenValue = () => {
    if (!token) return '0';
    const holdings = getTokenHoldings() * 1000000; // Convert to actual tokens
    return (holdings * Number(token.current_price) / 1000000).toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Investment Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Investment</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">${getInvestmentAmount()}M</h3>
          </div>
          <div className="rounded-full bg-emerald-100 p-2">
            <LineChart className="h-5 w-5 text-emerald-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm font-medium flex items-center">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.938a8.001 8.001 0 00-4.024 2.12l-.665-.665a1 1 0 00-1.414 1.414l.664.665A8.001 8.001 0 003 10a1 1 0 00-2 0c0 3.75 2.5 6.75 6 7.75V19a1 1 0 102 0v-1.25c3.5-1 6-4 6-7.75a1 1 0 00-2 0 6.001 6.001 0 01-4.5 5.812V11a1 1 0 102 0v2.812A6.001 6.001 0 0115 10a1 1 0 10-2 0 8.001 8.001 0 01-1.5 4.688l2.344 2.344a1 1 0 001.414-1.414l-.664-.665A8.001 8.001 0 0011 5.938V5z" clipRule="evenodd" />
              </svg>
              +12.8%
            </span>
            <span className="text-gray-500 text-sm ml-2">from last quarter</span>
          </div>
        </div>
      </div>

      {/* Current IRR Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-600">Current IRR</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{getCurrentIRR()}%</h3>
          </div>
          <div className="rounded-full bg-blue-100 p-2">
            <Percent className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm font-medium flex items-center">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.938a8.001 8.001 0 00-4.024 2.12l-.665-.665a1 1 0 00-1.414 1.414l.664.665A8.001 8.001 0 003 10a1 1 0 00-2 0c0 3.75 2.5 6.75 6 7.75V19a1 1 0 102 0v-1.25c3.5-1 6-4 6-7.75a1 1 0 00-2 0 6.001 6.001 0 01-4.5 5.812V11a1 1 0 102 0v2.812A6.001 6.001 0 0115 10a1 1 0 10-2 0 8.001 8.001 0 01-1.5 4.688l2.344 2.344a1 1 0 001.414-1.414l-.664-.665A8.001 8.001 0 0011 5.938V5z" clipRule="evenodd" />
              </svg>
              +1.2%
            </span>
            <span className="text-gray-500 text-sm ml-2">above projected</span>
          </div>
        </div>
      </div>

      {/* Token Holdings Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-600">Token Holdings</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{getTokenHoldings()}M EMC</h3>
          </div>
          <div className="rounded-full bg-purple-100 p-2">
            <Coins className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-gray-600 text-sm font-medium">Current Value:</span>
            <span className="text-gray-800 text-sm ml-2 font-medium">${calculateTokenValue()}M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverviewCards;
