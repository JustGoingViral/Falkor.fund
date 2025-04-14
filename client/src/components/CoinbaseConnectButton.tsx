import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

// Mock wallet address for demonstration
const DEMO_WALLET_ADDRESS = '0xF3b1A0851e0BdB3B4F16569982Bd32fEe5cA3A93';

interface CoinbaseConnectButtonProps {
  onConnect?: (address: string) => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const CoinbaseConnectButton = ({
  onConnect,
  variant = 'primary',
  size = 'md',
}: CoinbaseConnectButtonProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close modal when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show Coinbase login modal
  const handleConnect = async () => {
    setShowModal(true);
  };

  // Simulate wallet connection
  const completeWalletConnection = async (emailOrUsername: string, password: string) => {
    try {
      setIsConnecting(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Set mock wallet address
      setWalletAddress(DEMO_WALLET_ADDRESS);
      
      // Call onConnect callback
      if (onConnect) {
        onConnect(DEMO_WALLET_ADDRESS);
      }
      
      toast({
        title: 'Wallet Connected',
        description: 'Successfully connected to Coinbase wallet',
        variant: 'default'
      });
      
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to wallet',
        variant: 'destructive'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Simulate wallet disconnection
  const handleDisconnect = () => {
    setWalletAddress(null);
    
    toast({
      title: 'Wallet Disconnected',
      description: 'Successfully disconnected from wallet',
      variant: 'default'
    });
  };

  // Format address display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Button size classes
  const buttonSizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };

  // Button variant classes
  const buttonVariantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800'
  };

  return (
    <div className="inline-block">
      {walletAddress ? (
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 mr-1 bg-emerald-400 rounded-full"></span>
            {formatAddress(walletAddress)}
          </span>
          <button
            onClick={handleDisconnect}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`rounded-lg font-medium ${buttonSizeClasses[size]} ${buttonVariantClasses[variant]} flex items-center transition-colors`}
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="1024" height="1024" fill="#0052FF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C404.536 396 392 408.536 392 424V600C392 615.464 404.536 628 420 628H604C619.464 628 632 615.464 632 600V424C632 408.536 619.464 396 604 396H420Z" fill="white"/>
                </svg>
                Connect Coinbase
              </>
            )}
          </button>
          
          {/* Coinbase Login Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 mr-2" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="1024" height="1024" fill="#0052FF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C404.536 396 392 408.536 392 424V600C392 615.464 404.536 628 420 628H604C619.464 628 632 615.464 632 600V424C632 408.536 619.464 396 604 396H420Z" fill="white"/>
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900">Sign in to Coinbase</h3>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <form 
                  className="p-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const emailOrUsername = (form.elements.namedItem('emailOrUsername') as HTMLInputElement).value;
                    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
                    completeWalletConnection(emailOrUsername, password);
                  }}
                >
                  <div>
                    <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-1">
                      Email or username
                    </label>
                    <input
                      type="text"
                      id="emailOrUsername"
                      name="emailOrUsername"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Keep me signed in on this device
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isConnecting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </>
                      ) : 'Sign in'}
                    </button>
                  </div>
                </form>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="text-sm text-center">
                    <button 
                      onClick={() => {
                        toast({
                          title: "Password Recovery",
                          description: "Like the riverboat captain who forgot the way upstream, you'll have to find your own path through these foggy waters. No password recovery in this demonstration.",
                          variant: "default"
                        });
                      }} 
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-center">
                    <span className="text-gray-600">Don't have an account?</span>
                    <button 
                      onClick={() => {
                        toast({
                          title: "Account Creation",
                          description: "As I always say, 'The secret to getting ahead is getting started.' But not today - this is just a demonstration.",
                          variant: "default"
                        });
                      }}
                      className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoinbaseConnectButton;