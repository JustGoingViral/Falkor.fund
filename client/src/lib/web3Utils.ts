import { TransactionRequest } from './types';

// Mock web3 provider for demo purposes
// In a real application, this would connect to an actual Web3 provider like MetaMask
export class Web3Provider {
  private connected: boolean = false;
  private address: string | null = null;
  private chainId: number = 11155111; // Sepolia testnet
  
  // Connect to wallet
  async connect(): Promise<{ address: string; chainId: number }> {
    // Simulating successful connection
    this.connected = true;
    this.address = "0xF3b1A0851e0BdB3B4F16569982Bd32fEe5cA3A93";
    
    return {
      address: this.address,
      chainId: this.chainId
    };
  }
  
  // Disconnect from wallet
  disconnect(): void {
    this.connected = false;
    this.address = null;
  }
  
  // Check if connected
  isConnected(): boolean {
    return this.connected;
  }
  
  // Get current address
  getAddress(): string | null {
    return this.address;
  }
  
  // Get chain ID
  getChainId(): number {
    return this.chainId;
  }
  
  // Get network name based on chain ID
  getNetworkName(): string {
    switch (this.chainId) {
      case 1:
        return "Ethereum Mainnet";
      case 11155111:
        return "Sepolia Testnet";
      case 5:
        return "Goerli Testnet";
      default:
        return "Unknown Network";
    }
  }
}

// Create ERC-20 token contract instance
// In a real application, this would create a contract instance using ethers.js or web3.js
export function createTokenContract(address: string): any {
  // For demo purposes, we're returning a mock contract interface
  return {
    address,
    async balanceOf(owner: string): Promise<string> {
      return "1800000000000000000000000"; // 1.8M tokens with 18 decimals
    },
    async transfer(to: string, amount: string): Promise<boolean> {
      console.log(`Transferring ${amount} tokens to ${to}`);
      // Simulate API call to our backend
      try {
        await fetch('/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 1, // Simulated user
            type: 'send',
            amount: parseFloat(amount) / 10**18, // Convert from wei
            from_address: "0xF3b1A0851e0BdB3B4F16569982Bd32fEe5cA3A93",
            to_address: to,
          }),
        });
        return true;
      } catch (error) {
        console.error("Transfer failed:", error);
        return false;
      }
    },
    async allowance(owner: string, spender: string): Promise<string> {
      return "0";
    },
    async approve(spender: string, amount: string): Promise<boolean> {
      return true;
    }
  };
}

// Format token amount with proper decimals
export function formatTokenAmount(amount: string | number, decimals: number = 18): string {
  const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
  return (amountNum / (10 ** decimals)).toString();
}

// Convert amount to token units with decimals
export function toTokenUnits(amount: number, decimals: number = 18): string {
  return (amount * (10 ** decimals)).toString();
}

// Format address display (e.g., 0x1234...5678)
export function formatAddress(address: string, prefixLength: number = 6, suffixLength: number = 4): string {
  if (!address) return '';
  if (address.length < prefixLength + suffixLength) return address;
  
  return `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`;
}

// Validate Ethereum address format
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Simulate sending a transaction to the blockchain
// In a real app, this would use real web3 libraries to sign and send transactions
export async function sendTransaction(txRequest: TransactionRequest): Promise<string> {
  console.log("Sending transaction:", txRequest);
  
  // Simulate transaction hash
  const hash = "0x" + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('');
  
  // Simulate API call to our backend to record transaction
  try {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1, // Simulated user
        type: 'send',
        amount: parseFloat(txRequest.value) / 10**18, // Convert from wei
        from_address: txRequest.from,
        to_address: txRequest.to,
      }),
    });
  } catch (error) {
    console.error("Failed to record transaction:", error);
  }
  
  return hash;
}

// Calculate gas price in gwei
export function calculateGasPrice(speed: 'slow' | 'standard' | 'fast'): number {
  switch (speed) {
    case 'slow':
      return 30;
    case 'standard':
      return 50;
    case 'fast':
      return 80;
    default:
      return 50;
  }
}

// Get token contract ABI
export function getTokenABI(): any[] {
  return [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{"name": "", "type": "string"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{"name": "", "type": "string"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{"name": "", "type": "uint8"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{"name": "owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{"name": "to", "type": "address"}, {"name": "value", "type": "uint256"}],
      "name": "transfer",
      "outputs": [{"name": "", "type": "bool"}],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
      "name": "allowance",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{"name": "spender", "type": "address"}, {"name": "value", "type": "uint256"}],
      "name": "approve",
      "outputs": [{"name": "", "type": "bool"}],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
}

// Get quantum-resistant encryption info
export function getQuantumEncryptionStatus(): { enabled: boolean, algorithm: string, strength: string } {
  return {
    enabled: true,
    algorithm: "Lattice-based post-quantum",
    strength: "256-bit equivalent"
  };
}
