import { InvestorType } from "@shared/schema";

// Blockchain-related types
export interface Web3ProviderState {
  provider: any | null;
  web3: any | null;
  connected: boolean;
  address: string | null;
  chainId: number | null;
  networkName: string | null;
  error: string | null;
}

export interface TransactionRequest {
  from: string;
  to: string;
  value: string;
  data?: string;
  gas?: number;
}

// Token simulation types
export interface TokenMetrics {
  price: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  dailyVolume: number;
}

export interface TokenPriceHistory {
  timestamp: number;
  price: number;
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
    fill?: boolean;
  }[];
}

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[] | string;
    borderWidth?: number;
  }[];
}

// Quantum firewall types
export interface SecurityStatus {
  encryptionLevel: string;
  protectionStatus: string;
  lastAttackAttempt?: Date;
  totalBlockedAttacks: number;
}

export interface SecurityLog {
  timestamp: Date;
  message: string;
  level: 'info' | 'warning' | 'error' | 'success';
}

// Investor context types
export interface InvestorContextState {
  investorType: InvestorType;
  setInvestorType: (type: InvestorType) => void;
}

// Development stage type
export interface DevelopmentStage {
  id: number;
  name: string;
  description: string;
  unlockPrice: number;
  status: 'pending' | 'current' | 'completed';
}

// Wallet and transaction types
export interface Wallet {
  address: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
  type: 'send' | 'receive';
  status: 'pending' | 'confirmed' | 'failed';
}
