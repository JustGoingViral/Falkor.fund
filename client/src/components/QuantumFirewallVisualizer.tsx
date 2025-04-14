import { useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';

const QuantumFirewallVisualizer = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be where we'd initialize Three.js for the 3D visualization
    // For now, we'll use CSS animations as a placeholder
    const quantumParticles = canvasRef.current?.querySelectorAll('.quantum-particle');
    
    quantumParticles?.forEach((particle, index) => {
      const element = particle as HTMLElement;
      element.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="quantum-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Quantum Firewall</h2>
        <span className="px-2 py-1 bg-emerald-500 bg-opacity-20 rounded-full text-emerald-400 text-xs font-medium animate-pulse">ACTIVE</span>
      </div>
      <p className="text-sm text-gray-300 mb-4">3D visualizer simulating quantum protection for blockchain assets</p>
      
      <div ref={canvasRef} className="relative h-60 bg-slate-900 bg-opacity-40 rounded-lg overflow-hidden mb-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-emerald-500 bg-opacity-10 animate-pulse flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-500 bg-opacity-20 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 bg-opacity-30 animate-pulse flex items-center justify-center">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Simulated quantum particles */}
        <div className="quantum-particle absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="quantum-particle absolute top-3/4 left-2/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="quantum-particle absolute top-1/2 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="quantum-particle absolute top-1/3 left-3/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-900 bg-opacity-40 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Encryption Level</p>
          <p className="text-sm font-mono text-emerald-400">POST-QUANTUM</p>
        </div>
        <div className="bg-slate-900 bg-opacity-40 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Protection Status</p>
          <p className="text-sm font-mono text-emerald-400">HARDENED ✓</p>
        </div>
      </div>
      
      <div className="bg-slate-900 bg-opacity-40 rounded-lg p-3">
        <p className="text-xs text-gray-400 mb-1">Transaction Security Log</p>
        <p className="text-xs font-mono text-gray-300 h-12 overflow-hidden">
          [{new Date().toLocaleTimeString()}] Quantum secure transaction verified<br />
          [{new Date(Date.now() - 16000).toLocaleTimeString()}] Lattice-based encryption active<br />
          [{new Date(Date.now() - 30000).toLocaleTimeString()}] Multi-signature protocol engaged<br />
          [{new Date(Date.now() - 45000).toLocaleTimeString()}] Homomorphic shield initialized
        </p>
      </div>
    </div>
  );
};

export default QuantumFirewallVisualizer;
