import InvestorModeToggle from '../components/InvestorModeToggle';
import EmeraldCoinExplorer from '../components/EmeraldCoinExplorer';
import QuantumFirewallVisualizer from '../components/QuantumFirewallVisualizer';

const Explorer = () => {
  return (
    <>
      <InvestorModeToggle />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Blockchain Explorer</h1>
            <p className="text-gray-600 mt-2">Track transactions and explore the Emerald Coin blockchain</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EmeraldCoinExplorer />
              
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-slate-900">Smart Contract Details</h2>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-md font-semibold text-slate-800 mb-2">Emerald Coin (EMC) Token</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Contract Address:</span>
                        <span className="text-sm font-mono text-gray-900">0x8F7d7b8A1370f413bF0BF0f77B6c6e23d6e4F27B</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Standard:</span>
                        <span className="text-sm text-gray-900">ERC-20</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Supply:</span>
                        <span className="text-sm text-gray-900">100,000,000 EMC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Decimals:</span>
                        <span className="text-sm text-gray-900">18</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-md font-semibold text-slate-800 mb-2">Contract Source Code</h3>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-80">
                      <pre className="text-xs font-mono text-gray-800">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EmeraldCoin is ERC20, Ownable {
    // Property registry mapping
    mapping(bytes32 => PropertyDetails) public properties;
    bytes32[] public propertyIds;
    
    struct PropertyDetails {
        string name;
        uint256 tokenAmount;
        bool active;
    }
    
    event PropertyRegistered(bytes32 propertyId, string name, uint256 tokenAmount);
    event PropertyStatusChanged(bytes32 propertyId, bool active);
    
    constructor() ERC20("Emerald Coin", "EMC") {
        // Initial supply: 100 million tokens
        _mint(msg.sender, 100000000 * 10**decimals());
    }
    
    function registerProperty(
        bytes32 propertyId,
        string memory name,
        uint256 tokenAmount
    ) external onlyOwner {
        require(properties[propertyId].tokenAmount == 0, "Property already registered");
        
        properties[propertyId] = PropertyDetails({
            name: name,
            tokenAmount: tokenAmount,
            active: true
        });
        
        propertyIds.push(propertyId);
        
        emit PropertyRegistered(propertyId, name, tokenAmount);
    }
    
    function setPropertyStatus(bytes32 propertyId, bool active) external onlyOwner {
        require(properties[propertyId].tokenAmount > 0, "Property not registered");
        
        properties[propertyId].active = active;
        
        emit PropertyStatusChanged(propertyId, active);
    }
    
    function getPropertyCount() external view returns (uint256) {
        return propertyIds.length;
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <QuantumFirewallVisualizer />
              
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-slate-900">Network Statistics</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Total Transactions</span>
                        <span className="text-sm font-medium text-gray-900">1,352,687</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Active Wallets</span>
                        <span className="text-sm font-medium text-gray-900">42,856</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Average Block Time</span>
                        <span className="text-sm font-medium text-gray-900">14.3 seconds</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Network Security</span>
                        <span className="text-sm font-medium text-gray-900">Quantum-Resistant</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Explorer;
