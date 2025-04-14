import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Coins } from 'lucide-react';
import { Token } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import CoinbaseConnectButton from './CoinbaseConnectButton';

const TokenPurchaseSimulator = () => {
  const [tokenAmount, setTokenAmount] = useState(1000);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  const { data: token } = useQuery<Token>({
    queryKey: ['/api/token'],
  });
  
  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    toast({
      title: 'Wallet Connected',
      description: `Connected to wallet: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      variant: 'default'
    });
  };
  
  const calculateTotal = () => {
    if (!token) return { subtotal: 0, fee: 0, total: 0 };
    
    const price = Number(token.price || 0);
    const subtotal = tokenAmount * price;
    const fee = Math.max(subtotal * 0.0015, 5); // 0.15% fee, minimum $5
    
    return {
      subtotal: subtotal.toFixed(2),
      fee: fee.toFixed(2),
      total: (subtotal + fee).toFixed(2),
    };
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      setTokenAmount(parseInt(value || '0'));
    }
  };
  
  const purchaseTokensMutation = useMutation({
    mutationFn: async () => {
      // Create transaction with connected wallet if available
      const fromAddress = walletAddress || '0x0000000000000000000000000000000000000000';
      
      return apiRequest('POST', '/api/transactions', {
        user_id: 1, // Simulated user
        type: 'purchase',
        amount: tokenAmount,
        from_address: fromAddress,
        to_address: '0xF3b1A0851e0BdB3B4F16569982Bd32fEe5cA3A93', // Platform wallet
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
      toast({
        title: 'Purchase Successful',
        description: `You have successfully purchased ${tokenAmount.toLocaleString()} Emerald tokens.`,
        variant: 'default'
      });
    },
    onError: (error) => {
      console.error("Purchase error:", error);
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase. Please try again.',
        variant: 'destructive'
      });
    }
  });
  
  const handlePurchase = () => {
    try {
      if (tokenAmount <= 0) {
        toast({
          title: 'Invalid Amount',
          description: 'Please enter a valid token amount',
          variant: 'destructive'
        });
        return;
      }
      
      if (!walletAddress) {
        toast({
          title: 'Wallet Required',
          description: 'Please connect your Coinbase Wallet to continue',
          variant: 'destructive'
        });
        return;
      }
      
      purchaseTokensMutation.mutate();
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };
  
  const { subtotal, fee, total } = calculateTotal();
  
  if (!token) {
    return <div>Loading token purchase simulator...</div>;
  }

  const tokenPrice = Number(token.price || 0).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-slate-900">Buy Tokens with Confidence</h2>
        <p className="text-sm text-gray-600">$250 buys you a slice of a billion-dollar city</p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-2xl font-bold text-slate-900">
              ${tokenPrice}
              <span className="text-xs text-emerald-600 ml-1">+2.3%</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Coins className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Purchase</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">EMC</span>
            </div>
            <input 
              type="text" 
              className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md py-3" 
              placeholder="0" 
              value={tokenAmount.toLocaleString()}
              onChange={handleAmountChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div className="flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm mr-2">
                  ${(tokenAmount * Number(tokenPrice)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium text-gray-900">${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Network Fee</span>
            <span className="text-sm font-medium text-gray-900">${fee}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-900">Total</span>
            <span className="text-sm font-bold text-slate-900">${total}</span>
          </div>
        </div>
        
        {!walletAddress ? (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Connect your wallet to purchase tokens:</p>
            <div className="flex justify-center">
              <CoinbaseConnectButton 
                onConnect={handleWalletConnect} 
                variant="primary" 
                size="md" 
              />
            </div>
          </div>
        ) : (
          <button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
            onClick={handlePurchase}
            disabled={purchaseTokensMutation.isPending || tokenAmount <= 0}
          >
            {purchaseTokensMutation.isPending ? "Processing..." : "Purchase Tokens"}
          </button>
        )}
        
        <p className="mt-3 text-xs text-gray-500 text-center">✅ Runs on Sepolia Ethereum testnet • ✅ Full transparency with zero hidden fees</p>
      </div>
    </div>
  );
};

export default TokenPurchaseSimulator;
