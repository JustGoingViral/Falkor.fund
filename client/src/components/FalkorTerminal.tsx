import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Maximize2 as Maximize, 
  Settings,
  ChevronDown,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Download
} from 'lucide-react';
import { createFlowChart } from '../lib/chartUtils';
import { toast } from '@/hooks/use-toast';
import { handleError } from '../lib/errorHandler';

const FalkorTerminal = () => {
  const flowChartRef = useRef<HTMLCanvasElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAnalytic, setSelectedAnalytic] = useState('Asset Flow Analysis');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: properties } = useQuery({
    queryKey: ['/api/properties'],
  });

  useEffect(() => {
    if (flowChartRef.current) {
      const data = [120, 150, 180, 210, 250, 300];
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      createFlowChart(
        flowChartRef.current,
        data,
        labels,
        'Asset Flow (millions $)',
        '#10B981'
      );
    }
  }, []);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const analyticOptions = [
    { name: 'Asset Flow Analysis', icon: <LineChart className="w-4 h-4 mr-2" /> },
    { name: 'Tokenized Property Distribution', icon: <PieChart className="w-4 h-4 mr-2" /> },
    { name: 'Investment Velocity', icon: <BarChart3 className="w-4 h-4 mr-2" /> },
    { name: 'Market Volatility Index', icon: <Activity className="w-4 h-4 mr-2" /> }
  ];
  
  const handleSelectAnalytic = (name: string) => {
    setSelectedAnalytic(name);
    setIsDropdownOpen(false);
    
    try {
      // Different behavior based on the selected analytic type
      if (name !== 'Asset Flow Analysis' && flowChartRef.current) {
        // Create a different chart based on selection
        const randomData = Array.from({length: 6}, () => Math.floor(Math.random() * 300) + 100);
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        createFlowChart(
          flowChartRef.current,
          randomData,
          labels,
          name,
          name.includes('Volatility') ? '#ef4444' : '#10B981'
        );
      }
      
      toast({
        title: `Analytics Updated`,
        description: `Now showing ${name} data visualization`,
        variant: "default"
      });
    } catch (error) {
      const errorMessage = handleError(error);
      toast({
        title: "Analytics Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div id="falkor-terminal" className="terminal-container">
      <div className="terminal-header">
        <h2 className="text-lg font-bold text-white">Falkor Terminal</h2>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 hover:bg-slate-800 rounded"
            onClick={() => {
              // Toggle fullscreen for terminal
              const terminalEl = document.getElementById('falkor-terminal');
              if (terminalEl) {
                if (terminalEl.classList.contains('fixed')) {
                  terminalEl.classList.remove('fixed', 'inset-0', 'z-50', 'h-screen', 'w-screen');
                  terminalEl.classList.add('terminal-container');
                } else {
                  terminalEl.classList.add('fixed', 'inset-0', 'z-50', 'h-screen', 'w-screen');
                  terminalEl.classList.remove('terminal-container');
                }
              }
            }}
          >
            <Maximize className="h-4 w-4 text-gray-400 hover:text-white" />
          </button>
          <button 
            className="p-1 hover:bg-slate-800 rounded"
            onClick={() => {
              alert('Terminal settings will be available in the next update.');
            }}
          >
            <Settings className="h-4 w-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
      <div className="terminal-content">
        <div className="terminal-section">
          <h3 className="terminal-section-title">Live IRR by Project</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-xs">Emerald Island</span>
                <span className="terminal-text text-sm font-medium">11.2%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '93%' }}></div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-1">Target: 12%</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-xs">GREENPORT</span>
                <span className="terminal-text text-sm font-medium">10.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-1">Target: 12%</div>
            </div>
          </div>
        </div>
        
        <div className="terminal-section">
          <div className="flex justify-between items-center mb-2">
            <h3 className="terminal-section-title">{selectedAnalytic}</h3>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center px-2 py-1 text-xs rounded bg-slate-800 text-gray-300 hover:bg-slate-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Advanced Analytics
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {analyticOptions.map((option) => (
                      <button
                        key={option.name}
                        className={`flex items-center w-full text-left px-4 py-2 text-xs hover:bg-slate-800 ${
                          selectedAnalytic === option.name ? 'bg-slate-800 text-emerald-400' : 'text-gray-300'
                        }`}
                        onClick={() => handleSelectAnalytic(option.name)}
                      >
                        {option.icon}
                        {option.name}
                      </button>
                    ))}
                    <div className="border-t border-slate-700 mt-1 pt-1">
                      <button
                        className="flex items-center w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-slate-800"
                        onClick={() => {
                          toast({
                            title: "Export Initiated",
                            description: "Analytics data exported to CSV format",
                            variant: "default"
                          });
                          setIsDropdownOpen(false);
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Data (CSV)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-48 bg-slate-800 rounded-lg p-2">
            <canvas ref={flowChartRef} height="150px"></canvas>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800 p-3 rounded-lg">
            <h3 className="terminal-section-title">Smart Contract Walkthrough</h3>
            <div className="font-mono text-xs text-gray-300 bg-slate-900 p-2 rounded overflow-auto h-28">
              <pre>{`function transferTokens(
  address _to, 
  uint256 _value
) public returns (bool) {
  require(_value <= balances[msg.sender]);
  require(_to != address(0));
  
  balances[msg.sender] -= _value;
  balances[_to] += _value;
  emit Transfer(msg.sender, _to, _value);
  return true;
}`}</pre>
            </div>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg">
            <h3 className="terminal-section-title">Emerald-Backed Asset Registry</h3>
            <ul className="text-xs text-gray-300 space-y-2 h-28 overflow-auto">
              <li className="flex justify-between">
                <span>Emerald Island Lot A</span>
                <span className="text-emerald-400">358,420 EMC</span>
              </li>
              <li className="flex justify-between">
                <span>Emerald Island Lot B</span>
                <span className="text-emerald-400">290,105 EMC</span>
              </li>
              <li className="flex justify-between">
                <span>GREENPORT Terminal 1</span>
                <span className="text-emerald-400">512,908 EMC</span>
              </li>
              <li className="flex justify-between">
                <span>GREENPORT Runway</span>
                <span className="text-emerald-400">890,650 EMC</span>
              </li>
              <li className="flex justify-between">
                <span>Emerald Island 360 Venue</span>
                <span className="text-emerald-400">124,380 EMC</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FalkorTerminal;
