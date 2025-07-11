import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Info, Download } from 'lucide-react';

interface TimingDiagramProps {
  ramSize: string;
  isAdvanced?: boolean;
}

interface Signal {
  name: string;
  type: 'clock' | 'data' | 'control';
  values: (string | number)[];
  color: string;
}

const TimingDiagram: React.FC<TimingDiagramProps> = ({ ramSize }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState<'read' | 'write' | 'burst'>('read');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Define signals based on operation type
  const getSignals = (): Signal[] => {
    const baseSignals: Signal[] = [
      {
        name: 'clk',
        type: 'clock',
        values: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        color: '#3B82F6'
      },
      {
        name: 'rst_n',
        type: 'control',
        values: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        color: '#EF4444'
      }
    ];

    if (selectedOperation === 'read') {
      return [
        ...baseSignals,
        {
          name: 'we',
          type: 'control',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#10B981'
        },
        {
          name: 'addr[26:0]',
          type: 'data',
          values: ['X', 0x1000, 0x1000, 0x1001, 0x1001, 0x1002, 0x1002, 'X', 'X', 'X', 'X', 'X'],
          color: '#F59E0B'
        },
        {
          name: 'data_out[63:0]',
          type: 'data',
          values: ['Z', 'Z', 0xDEADBEEF, 0xDEADBEEF, 0xCAFEBABE, 0xCAFEBABE, 0x12345678, 'Z', 'Z', 'Z', 'Z', 'Z'],
          color: '#8B5CF6'
        }
      ];
    } else if (selectedOperation === 'write') {
      return [
        ...baseSignals,
        {
          name: 'we',
          type: 'control',
          values: [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
          color: '#10B981'
        },
        {
          name: 'addr[26:0]',
          type: 'data',
          values: ['X', 0x2000, 0x2000, 0x2001, 0x2001, 0x2002, 0x2002, 'X', 'X', 'X', 'X', 'X'],
          color: '#F59E0B'
        },
        {
          name: 'data_in[63:0]',
          type: 'data',
          values: ['X', 0xABCDEF01, 0xABCDEF01, 0x23456789, 0x23456789, 0x87654321, 0x87654321, 'X', 'X', 'X', 'X', 'X'],
          color: '#EC4899'
        }
      ];
    } else { // burst
      return [
        ...baseSignals,
        {
          name: 'we',
          type: 'control',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#10B981'
        },
        {
          name: 'burst_en',
          type: 'control',
          values: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
          color: '#06B6D4'
        },
        {
          name: 'addr[26:0]',
          type: 'data',
          values: ['X', 0x3000, 0x3000, 0x3001, 0x3002, 0x3003, 0x3004, 'X', 'X', 'X', 'X', 'X'],
          color: '#F59E0B'
        },
        {
          name: 'data_out[63:0]',
          type: 'data',
          values: ['Z', 'Z', 0x11111111, 0x22222222, 0x33333333, 0x44444444, 0x55555555, 'Z', 'Z', 'Z', 'Z', 'Z'],
          color: '#8B5CF6'
        }
      ];
    }
  };

  const signals = getSignals();
  const totalCycles = signals[0].values.length;

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(() => {
        setCurrentCycle(prev => {
          if (prev >= totalCycles - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, totalCycles]);

  useEffect(() => {
    drawTimingDiagram();
  }, [currentCycle, selectedOperation]);

  const drawTimingDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = signals.length * 60 + 80;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Drawing parameters
    const cycleWidth = 60;
    const signalHeight = 50;
    const startX = 120;
    const startY = 40;

    // Draw time markers
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px monospace';
    for (let i = 0; i < totalCycles; i++) {
      const x = startX + i * cycleWidth + cycleWidth / 2;
      ctx.fillText(`T${i}`, x - 8, 25);
      
      // Draw vertical grid lines
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 30);
      ctx.lineTo(x, canvas.height - 20);
      ctx.stroke();
    }

    // Draw signals
    signals.forEach((signal, signalIndex) => {
      const y = startY + signalIndex * signalHeight;

      // Draw signal name
      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(signal.name, 10, y + 20);

      // Draw signal waveform
      ctx.strokeStyle = signal.color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < signal.values.length; i++) {
        const x = startX + i * cycleWidth;
        const value = signal.values[i];
        
        if (signal.type === 'clock') {
          // Draw clock signal
          const clockY = value === 1 ? y + 5 : y + 35;
          if (i === 0) {
            ctx.moveTo(x, clockY);
          } else {
            ctx.lineTo(x, clockY);
          }
          ctx.lineTo(x + cycleWidth / 2, clockY);
          const nextClockY = value === 1 ? y + 35 : y + 5;
          ctx.lineTo(x + cycleWidth / 2, nextClockY);
          ctx.lineTo(x + cycleWidth, nextClockY);
        } else if (signal.type === 'control') {
          // Draw control signal
          const controlY = value === 1 ? y + 5 : y + 35;
          if (i === 0) {
            ctx.moveTo(x, controlY);
          } else {
            ctx.lineTo(x, controlY);
          }
          ctx.lineTo(x + cycleWidth, controlY);
        } else {
          // Draw data signal
          const dataY = y + 20;
          if (i === 0) {
            ctx.moveTo(x, dataY);
          }
          
          if (value === 'X' || value === 'Z') {
            // Draw unknown/high-z state
            ctx.strokeStyle = '#DC2626';
            ctx.lineTo(x + cycleWidth / 4, y + 5);
            ctx.lineTo(x + 3 * cycleWidth / 4, y + 35);
            ctx.moveTo(x + cycleWidth / 4, y + 35);
            ctx.lineTo(x + 3 * cycleWidth / 4, y + 5);
            ctx.strokeStyle = signal.color;
            ctx.moveTo(x + cycleWidth, dataY);
          } else {
            ctx.lineTo(x + cycleWidth, dataY);
            
            // Draw data value
            if (typeof value === 'number') {
              ctx.fillStyle = signal.color;
              ctx.font = '10px monospace';
              const hexValue = `0x${value.toString(16).toUpperCase()}`;
              ctx.fillText(hexValue, x + 5, dataY - 5);
            }
          }
        }

        // Highlight current cycle
        if (i === currentCycle) {
          ctx.fillStyle = signal.color + '20';
          ctx.fillRect(x, y, cycleWidth, 40);
        }
      }
      
      ctx.stroke();
    });

    // Draw current cycle indicator
    if (currentCycle < totalCycles) {
      const x = startX + currentCycle * cycleWidth;
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, 30);
      ctx.lineTo(x, canvas.height - 20);
      ctx.stroke();
    }
  };

  const exportDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${ramSize}_${selectedOperation}_timing_diagram.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentCycle(0);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="text-primary-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold">Timing Diagram</h3>
            <p className="text-sm text-gray-600">{ramSize} RAM - {selectedOperation.toUpperCase()} Operation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={exportDiagram}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Operation Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Operation Type:
        </label>
        <div className="flex gap-2">
          {['read', 'write', 'burst'].map((op) => (
            <button
              key={op}
              onClick={() => {
                setSelectedOperation(op as any);
                resetAnimation();
              }}
              className={`btn ${
                selectedOperation === op
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {op.charAt(0).toUpperCase() + op.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="btn btn-primary flex items-center gap-2"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={resetAnimation}
          className="btn btn-secondary flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </button>
        
        <div className="text-sm text-gray-600">
          Cycle: {currentCycle + 1} / {totalCycles}
        </div>
      </div>

      {/* Timing Diagram Canvas */}
      <div className="card p-4">
        <canvas ref={canvasRef} className="block mx-auto" />
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-light">
          <h4 className="font-semibold text-primary-900 mb-2">Signal Types</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-primary-500 rounded"></div>
              <span>Clock signals (square wave)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-success-500 rounded"></div>
              <span>Control signals (high/low)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-purple-500 rounded"></div>
              <span>Data signals (with values)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-error-500 rounded"></div>
              <span>Unknown/High-Z states</span>
            </div>
          </div>
        </div>
        
        <div className="card-warning">
          <h4 className="font-semibold text-warning-900 mb-2">
            <Info size={16} className="inline mr-1" />
            Operation Details
          </h4>
          <div className="text-sm text-warning-800">
            {selectedOperation === 'read' && (
              <p>Read operation shows address setup, data output delay, and hold times.</p>
            )}
            {selectedOperation === 'write' && (
              <p>Write operation shows write enable timing, address and data setup requirements.</p>
            )}
            {selectedOperation === 'burst' && (
              <p>Burst read shows sequential address incrementing with continuous data output.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingDiagram;
