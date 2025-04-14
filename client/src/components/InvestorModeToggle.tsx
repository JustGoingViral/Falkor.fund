import { useState, useEffect, useRef } from 'react';
import { useInvestor } from '../contexts/InvestorContext';
import { useToast } from '../hooks/use-toast';

const InvestorModeToggle = () => {
  const { investorType, setInvestorType } = useInvestor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (type: 'individual' | 'institutional') => {
    if (type !== investorType) {
      setInvestorType(type);
      setIsOpen(false);

      // Show toast notification
      toast({
        title: "Investor Mode Changed",
        description: `Switched to ${type === 'individual' ? 'Individual' : 'Institutional'} Investor view`,
        duration: 3000,
      });

      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('investor-type-changed'));
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-slate-800 py-2 px-4">
      <div className="max-w-7xl mx-auto flex justify-end">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 text-white text-sm font-medium px-3 py-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span>
              {investorType === 'individual' ? 'Individual Investor' : 'Institutional Investor'}
            </span>
            <svg 
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-in fade-in-50 slide-in-from-top-5 duration-200"
            >
              <div className="py-1">
                <button
                  onClick={() => handleToggle('individual')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    investorType === 'individual' 
                      ? 'bg-slate-100 text-slate-900 font-medium' 
                      : 'text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  Individual Investor
                </button>
                <button
                  onClick={() => handleToggle('institutional')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    investorType === 'institutional' 
                      ? 'bg-slate-100 text-slate-900 font-medium' 
                      : 'text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  Institutional Investor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorModeToggle;