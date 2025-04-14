import InvestorModeToggle from '../components/InvestorModeToggle';
import DashboardHeader from '../components/DashboardHeader';
import FinancialOverviewCards from '../components/FinancialOverviewCards';
import FalkorTerminal from '../components/FalkorTerminal';
import PropertyListings from '../components/PropertyListings';
import EmeraldMarketSimulator from '../components/EmeraldMarketSimulator';
import QuantumFirewallVisualizer from '../components/QuantumFirewallVisualizer';
import TokenPurchaseSimulator from '../components/TokenPurchaseSimulator';
import EmeraldCoinExplorer from '../components/EmeraldCoinExplorer';

const Dashboard = () => {
  return (
    <>
      <InvestorModeToggle />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader />
          <FinancialOverviewCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              <FalkorTerminal />
              <PropertyListings />
              <EmeraldMarketSimulator />
            </div>
            
            {/* Right Column (1/3 width) */}
            <div className="space-y-6">
              <QuantumFirewallVisualizer />
              <TokenPurchaseSimulator />
              <EmeraldCoinExplorer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
