import React from 'react';
import { Settings, Info, Zap } from 'lucide-react';
import type { RAMSize } from '../types';
import { RAM_CONFIGS } from '../types';

interface RAMConfiguratorProps {
  selectedRAM: RAMSize;
  onRAMSizeChange: (ramSize: RAMSize) => void;
}

const RAMConfigurator: React.FC<RAMConfiguratorProps> = ({
  selectedRAM,
  onRAMSizeChange,
}) => {
  const ramOptions: RAMSize[] = ['8GB', '16GB', '32GB'];
  const currentConfig = RAM_CONFIGS[selectedRAM];

  return (
    <div className="card p-6 fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-primary" size={24} />
        <h2 className="text-xl font-semibold">RAM Configuration</h2>
      </div>

      {/* RAM Size Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select RAM Size
        </label>
        <div className="grid grid-cols-3 gap-3">
          {ramOptions.map((size) => (
            <button
              key={size}
              onClick={() => onRAMSizeChange(size)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                selectedRAM === size
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Info className="text-primary-600" size={20} />
          <div>
            <h3 className="font-semibold text-gray-800">Configuration Details</h3>
            <p className="text-sm text-gray-600">Current RAM specifications</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Data Width</div>
            <div className="font-semibold text-lg text-gray-900">
              {currentConfig.dataWidth} bits
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Address Width</div>
            <div className="font-semibold text-lg text-gray-900">
              {currentConfig.addressWidth} bits
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Memory Depth</div>
            <div className="font-semibold text-lg text-gray-900">
              {currentConfig.depth.toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Size</div>
            <div className="font-semibold text-lg text-primary-600">
              {currentConfig.size}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-primary-600" size={18} />
            <h4 className="font-semibold text-primary-800">Generated Features</h4>
          </div>
          <ul className="space-y-2 text-sm text-primary-700">
            <li>✓ Parameterized Verilog module</li>
            <li>✓ Complete testbench with assertions</li>
            <li>✓ Address boundary checking</li>
            <li>✓ Ready signal for operations</li>
            <li>✓ GTKWave waveform dumping</li>
            <li>✓ Professional documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RAMConfigurator;
