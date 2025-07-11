import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, AlertCircle, CheckCircle } from 'lucide-react';
import { SimpleVerilogSimulator } from '../utils/verilogGenerator';

interface SimulationPanelProps {
  simulator: SimpleVerilogSimulator;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ simulator }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [customAddress, setCustomAddress] = useState('0x000');
  const [customData, setCustomData] = useState('0xDEADBEEF');

  const handleRunSimulation = async () => {
    setIsRunning(true);
    
    // Simulate some delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = simulator.runBasicTest();
    setLogs(results);
    setIsRunning(false);
  };

  const handleReset = () => {
    simulator.reset();
    setLogs([]);
  };

  const handleCustomTest = async () => {
    try {
      const addr = parseInt(customAddress, 16);
      const data = parseInt(customData, 16);
      
      simulator.write(addr, data);
      simulator.read(addr);
      
      const newLogs = simulator.getLogs();
      setLogs(newLogs);
    } catch (error) {
      console.error('Custom test error:', error);
    }
  };

  const hasErrors = logs.some(log => log.includes('ERROR') || log.includes('✗'));
  const hasSuccess = logs.some(log => log.includes('✓') && log.includes('passed'));

  return (
    <div className="card p-6 slide-up">
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="text-primary-600" size={24} />
        <div>
          <h2 className="text-xl font-semibold">Simulation Panel</h2>
          <p className="text-sm text-gray-600">Test your RAM design</p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="btn btn-primary flex-1"
        >
          <Play size={18} />
          {isRunning ? 'Running...' : 'Run Test'}
        </button>
        
        <button
          onClick={handleReset}
          className="btn btn-secondary"
          title="Reset Simulator"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Custom Test */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Custom Test</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address (hex)
            </label>
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="input text-sm"
              placeholder="0x000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data (hex)
            </label>
            <input
              type="text"
              value={customData}
              onChange={(e) => setCustomData(e.target.value)}
              className="input text-sm"
              placeholder="0xDEADBEEF"
            />
          </div>
        </div>
        <button
          onClick={handleCustomTest}
          className="btn btn-secondary w-full text-sm"
        >
          Write & Read Test
        </button>
      </div>

      {/* Status Indicator */}
      {logs.length > 0 && (
        <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
          hasErrors 
            ? 'bg-red-50 border border-red-200 text-red-700'
            : hasSuccess
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-blue-50 border border-blue-200 text-blue-700'
        }`}>
          {hasErrors ? (
            <AlertCircle size={18} />
          ) : hasSuccess ? (
            <CheckCircle size={18} />
          ) : (
            <Terminal size={18} />
          )}
          <span className="font-medium">
            {hasErrors 
              ? 'Some tests failed'
              : hasSuccess 
              ? 'All tests passed!'
              : 'Simulation completed'
            }
          </span>
        </div>
      )}

      {/* Simulation Logs */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Simulation Logs</h3>
        <div 
          className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {isRunning ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
              <span>Running simulation...</span>
            </div>
          ) : logs.length > 0 ? (
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div 
                  key={index}
                  className={`${
                    log.includes('ERROR') || log.includes('✗') 
                      ? 'text-red-400' 
                      : log.includes('✓') 
                      ? 'text-green-400'
                      : 'text-gray-300'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4">
              No simulation logs yet. Click "Run Test" to start.
            </div>
          )}
        </div>
      </div>

      {/* Simulation Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-700">
          <strong>Simulation Features:</strong>
          <ul className="mt-1 space-y-1 text-xs">
            <li>• Memory read/write operations</li>
            <li>• Address boundary checking</li>
            <li>• Data integrity verification</li>
            <li>• Real-time logging</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;
