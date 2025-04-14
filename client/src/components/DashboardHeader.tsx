import { RefreshCw } from 'lucide-react';
import { useInvestor } from '../contexts/InvestorContext';
import { queryClient } from '../lib/queryClient';

const DashboardHeader = () => {
  const { investorType } = useInvestor();
  
  const handleRefresh = () => {
    // Refresh all relevant data
    queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
    queryClient.invalidateQueries({ queryKey: ['/api/token'] });
    queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
    queryClient.invalidateQueries({ queryKey: ['/api/investment-stages'] });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{investorType} Dashboard</h2>
        <p className="text-gray-600">Financial overview and investment opportunities</p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 space-x-2">
        <span className="text-sm font-medium text-gray-700">Last updated: </span>
        <span className="text-sm text-gray-600">{new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })} GMT</span>
        <button 
          className="ml-2 p-1 rounded hover:bg-slate-200"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
