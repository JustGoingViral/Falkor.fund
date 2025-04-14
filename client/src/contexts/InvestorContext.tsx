import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InvestorType } from '@shared/schema';

interface InvestorContextType {
  investorType: InvestorType;
  setInvestorType: (type: InvestorType) => void;
}

const InvestorContext = createContext<InvestorContextType | undefined>(undefined);

export const useInvestor = () => {
  const context = useContext(InvestorContext);
  if (context === undefined) {
    throw new Error('useInvestor must be used within an InvestorProvider');
  }
  return context;
};

interface InvestorProviderProps {
  children: ReactNode;
}

export const InvestorProvider = ({ children }: InvestorProviderProps) => {
  const [investorType, setInvestorType] = useState<InvestorType>('Institutional');

  const value = {
    investorType,
    setInvestorType,
  };

  return (
    <InvestorContext.Provider value={value}>
      {children}
    </InvestorContext.Provider>
  );
};
