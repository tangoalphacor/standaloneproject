import React from 'react';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import TimingDiagram from './TimingDiagram';

interface TimingDiagramPageProps {
  onBack: () => void;
}

const TimingDiagramPage: React.FC<TimingDiagramPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={onBack}
              className="btn btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
            
            <div className="flex items-center gap-3">
              <Clock className="text-primary-600" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">Visual Timing Diagrams</h1>
            </div>
            
            <div></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container">
          {/* Introduction */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interactive Memory Timing Diagrams
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Visualize memory operations in real-time and understand signal relationships 
                  in RAM modules. These interactive diagrams help you learn how different memory 
                  operations work at the signal level.
                </p>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-blue-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">How to Use</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="feature-box">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Select Operation</h4>
                  <p className="text-sm text-gray-600">
                    Choose between Read, Write, or Burst operations to see different timing patterns.
                  </p>
                </div>
                
                <div className="feature-box">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Play Animation</h4>
                  <p className="text-sm text-gray-600">
                    Use the play button to animate through clock cycles and observe signal changes.
                  </p>
                </div>
                
                <div className="feature-box">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Analyze Signals</h4>
                  <p className="text-sm text-gray-600">
                    Study the color-coded signals and their relationships during memory operations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Timing Diagrams for Different RAM Sizes */}
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center">
              RAM Timing Diagrams by Size
            </h3>
            
            <div className="space-y-12">
              {/* 8GB RAM */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">8GB RAM (27-bit addressing)</h4>
                <TimingDiagram ramSize="8GB" />
              </div>
              
              {/* 16GB RAM */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">16GB RAM (28-bit addressing)</h4>
                <TimingDiagram ramSize="16GB" />
              </div>
              
              {/* 32GB RAM */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">32GB RAM (29-bit addressing)</h4>
                <TimingDiagram ramSize="32GB" />
              </div>
            </div>
          </section>

          {/* Educational Notes */}
          <section className="mt-12">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Understanding Memory Timing
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Concepts</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Setup Time:</strong> Time data must be stable before clock edge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Hold Time:</strong> Time data must remain stable after clock edge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Access Time:</strong> Delay from address valid to data valid</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Write Enable:</strong> Signal that controls write operations</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Signal Types</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Clock (clk):</strong> Synchronous timing reference</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Reset (rst_n):</strong> Active-low system reset</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Address:</strong> Memory location selector</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Data:</strong> Information being read/written</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TimingDiagramPage;
