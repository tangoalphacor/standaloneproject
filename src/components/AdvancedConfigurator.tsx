import React, { useState } from 'react';
import { Settings2, Zap, Shield, Cpu, TestTube2, Info } from 'lucide-react';
import type { AdvancedFeatures, InterfaceType, MemoryType, TestbenchType, BurstMode } from '../types';
import { FEATURE_DESCRIPTIONS } from '../types';

interface AdvancedConfiguratorProps {
  features: AdvancedFeatures;
  onFeaturesChange: (features: AdvancedFeatures) => void;
}

const AdvancedConfigurator: React.FC<AdvancedConfiguratorProps> = ({
  features,
  onFeaturesChange,
}) => {
  const [activeTab, setActiveTab] = useState<'interface' | 'memory' | 'testbench' | 'performance'>('interface');

  const updateFeature = <K extends keyof AdvancedFeatures>(
    key: K,
    value: AdvancedFeatures[K]
  ) => {
    onFeaturesChange({
      ...features,
      [key]: value,
    });
  };

  const interfaceOptions: InterfaceType[] = ['simple', 'axi4', 'avalon', 'wishbone'];
  const memoryOptions: MemoryType[] = ['standard', 'ecc', 'dual_port', 'pipelined'];
  const testbenchOptions: TestbenchType[] = ['basic', 'uvm', 'coverage', 'randomized'];
  const burstOptions: BurstMode[] = ['none', 'sequential', 'wrap'];

  return (
    <div className="card p-6 fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Settings2 className="text-primary-600" size={24} />
        <div>
          <h2 className="text-xl font-semibold">Advanced Features</h2>
          <p className="text-sm text-gray-600">Professional Verilog capabilities</p>
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('interface')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'interface'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Cpu size={16} />
            Interface
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('memory')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'memory'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield size={16} />
            Memory
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('testbench')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'testbench'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <TestTube2 size={16} />
            Testbench
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'performance'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Zap size={16} />
            Performance
          </div>
        </button>
      </div>

      {/* Interface Configuration */}
      {activeTab === 'interface' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Bus Interface Protocol
            </label>
            <div className="grid grid-cols-2 gap-3">
              {interfaceOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => updateFeature('interface', type)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    features.interface === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize text-sm">{type}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {FEATURE_DESCRIPTIONS.interface[type]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Burst Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {burstOptions.map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateFeature('burstMode', mode)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    features.burstMode === mode
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize text-sm">{mode}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Memory Configuration */}
      {activeTab === 'memory' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Memory Architecture
            </label>
            <div className="grid grid-cols-2 gap-3">
              {memoryOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => updateFeature('memoryType', type)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    features.memoryType === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize text-sm">{type.replace('_', ' ')}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {FEATURE_DESCRIPTIONS.memoryType[type]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={features.eccEnabled}
                  onChange={(e) => updateFeature('eccEnabled', e.target.checked)}
                  className="rounded border-gray-300"
                />
                Error Correction Code (ECC)
              </label>
              <p className="text-xs text-gray-500 mt-1">Single-bit error correction</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={features.performanceOptimized}
                  onChange={(e) => updateFeature('performanceOptimized', e.target.checked)}
                  className="rounded border-gray-300"
                />
                Performance Optimized
              </label>
              <p className="text-xs text-gray-500 mt-1">Enhanced timing and throughput</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pipeline Stages: {features.pipelineStages}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={features.pipelineStages}
              onChange={(e) => updateFeature('pipelineStages', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (Basic)</span>
              <span>5 (Maximum)</span>
            </div>
          </div>
        </div>
      )}

      {/* Testbench Configuration */}
      {activeTab === 'testbench' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Verification Methodology
            </label>
            <div className="grid grid-cols-2 gap-3">
              {testbenchOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => updateFeature('testbenchType', type)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    features.testbenchType === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize text-sm">{type}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {FEATURE_DESCRIPTIONS.testbenchType[type]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={features.uvmCompliant}
                  onChange={(e) => updateFeature('uvmCompliant', e.target.checked)}
                  className="rounded border-gray-300"
                />
                UVM Compliant
              </label>
              <p className="text-xs text-gray-500 mt-1">Industry standard verification</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={features.coverageEnabled}
                  onChange={(e) => updateFeature('coverageEnabled', e.target.checked)}
                  className="rounded border-gray-300"
                />
                Coverage Collection
              </label>
              <p className="text-xs text-gray-500 mt-1">Functional coverage metrics</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={features.assertionsEnabled}
                  onChange={(e) => updateFeature('assertionsEnabled', e.target.checked)}
                  className="rounded border-gray-300"
                />
                SystemVerilog Assertions
              </label>
              <p className="text-xs text-gray-500 mt-1">Protocol compliance checking</p>
            </div>
          </div>
        </div>
      )}

      {/* Performance Configuration */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clock Domains: {features.clockDomains}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={features.clockDomains}
              onChange={(e) => updateFeature('clockDomains', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (Single)</span>
              <span>4 (Multiple)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Current Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interface:</span>
                  <span className="font-medium capitalize">{features.interface}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Memory Type:</span>
                  <span className="font-medium capitalize">{features.memoryType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Testbench:</span>
                  <span className="font-medium capitalize">{features.testbenchType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pipeline Stages:</span>
                  <span className="font-medium">{features.pipelineStages}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={16} />
                <h4 className="font-medium text-blue-800">Features Summary</h4>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                {features.eccEnabled && <li>✓ ECC Protection</li>}
                {features.performanceOptimized && <li>✓ Performance Optimized</li>}
                {features.uvmCompliant && <li>✓ UVM Testbench</li>}
                {features.coverageEnabled && <li>✓ Coverage Collection</li>}
                {features.assertionsEnabled && <li>✓ SVA Assertions</li>}
                {features.pipelineStages > 1 && <li>✓ Pipelined Architecture</li>}
                {features.clockDomains > 1 && <li>✓ Multi-Clock Domain</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedConfigurator;
