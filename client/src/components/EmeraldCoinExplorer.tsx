import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Wallet } from 'lucide-react';
import { Transaction } from '@shared/schema';

const EmeraldCoinExplorer = () => {
  const [walletAddress, setWalletAddress] = useState('0xF3b1A0851e0BdB3B4F16569982Bd32fEe5cA3A93');
  const [searchValue, setSearchValue] = useState(walletAddress);
  
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
  });
  
  const handleSearch = () => {
    setWalletAddress(searchValue);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Filter transactions for wallet address
  const filteredTransactions = transactions.filter(tx => 
    tx.from_address === walletAddress || tx.to_address === walletAddress
  );
  
  // Calculate token balance
  const tokenBalance = filteredTransactions.reduce((balance, tx) => {
    if (tx.to_address === walletAddress) {
      return balance + Number(tx.amount);
    } else if (tx.from_address === walletAddress) {
      return balance - Number(tx.amount);
    }
    return balance;
  }, 1800000); // Starting with default balance

  return (
    <div className="coin-explorer-container">
      <div className="coin-explorer-header">
        <h2 className="text-lg font-bold text-slate-900">Emerald Coin Explorer</h2>
      </div>
      <div className="coin-explorer-content">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Address or Transaction</label>
          <div className="flex">
            <input 
              type="text" 
              className="focus:ring-emerald-500 focus:border-emerald-500 block w-full border-gray-300 rounded-l-md sm:text-sm py-2" 
              placeholder="0x..." 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="bg-slate-800 px-4 rounded-r-md text-white"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <Wallet className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900">Wallet Address</h3>
              <p className="text-xs text-gray-500 break-all">{walletAddress}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Token Balance</h3>
            <span className="text-sm font-bold text-slate-900">{tokenBalance.toLocaleString()} EMC</span>
          </div>
          
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Transactions</h3>
            <span className="text-sm font-medium text-gray-900">{filteredTransactions.length} Total</span>
          </div>
        </div>
        
        <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Transactions</h3>
        <div className="space-y-2 h-40 overflow-y-auto pr-1">
          {filteredTransactions.length === 0 ? (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
              <span className="text-sm text-gray-500">No transactions found</span>
            </div>
          ) : (
            filteredTransactions.slice(0, 10).map((tx, index) => {
              const isReceived = tx.to_address === walletAddress;
              const isRecent = index < 3;
              const timeAgo = isRecent 
                ? `${index + 2} hours ago` 
                : `${index + 1} days ago`;
              
              return (
                <div key={tx.id} className="transaction-item">
                  <div className="flex justify-between items-center mb-1">
                    <span className={isReceived ? "transaction-received" : "transaction-sent"}>
                      {isReceived ? "RECEIVED" : "SENT"}
                    </span>
                    <span className="text-xs text-gray-500">{timeAgo}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">
                      {isReceived ? "From: " : "To: "}
                      {isReceived 
                        ? tx.from_address?.substring(0, 4) + '...' + tx.from_address?.substring(tx.from_address.length - 4) 
                        : tx.to_address?.substring(0, 4) + '...' + tx.to_address?.substring(tx.to_address.length - 4)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {isReceived ? '+' : '-'}{Number(tx.amount).toLocaleString()} EMC
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View Contract Details</a>
        </div>
      </div>
    </div>
  );
};

export default EmeraldCoinExplorer;
