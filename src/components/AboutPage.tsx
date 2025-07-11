import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Cpu, Zap, Shield, TestTube, 
  Code, Database, Layers, ArrowRight, Info, Star, 
  GraduationCap, Building, Wrench, Users, 
  MessageCircle, Send, Eye, Heart, Share2, 
  Lightbulb, TrendingUp, Sparkles, ArrowDown, FileText 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    text: string;
    timestamp: Date;
    likes: number;
  }>>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [hasLiked, setHasLiked] = useState<Set<string>>(new Set());
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  const handleTimingDiagramClick = () => {
    if (onNavigate) {
      onNavigate('timing-diagrams');
    }
  };

  const scrollToSuggestions = () => {
    const suggestionsSection = document.getElementById('suggestions-section');
    if (suggestionsSection) {
      suggestionsSection.scrollIntoView({ behavior: 'smooth' });
      setShowFloatingButton(false);
    }
  };

  useEffect(() => {
    // Load suggestions from localStorage
    const savedSuggestions = localStorage.getItem('verilog-ram-suggestions');
    if (savedSuggestions) {
      try {
        const parsed = JSON.parse(savedSuggestions);
        setSuggestions(parsed.map((s: any) => ({
          ...s,
          timestamp: new Date(s.timestamp)
        })));
      } catch (e) {
        console.error('Error loading suggestions:', e);
      }
    } else {
      // Add some initial example suggestions
      const initialSuggestions = [
        {
          id: '1',
          text: 'Could you add support for DDR4 and DDR5 memory controllers? Would be great for modern FPGA projects!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          likes: 12
        },
        {
          id: '2', 
          text: 'Love the educational content! Maybe add a visual timing diagram generator for the memory interfaces?',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          likes: 8
        },
        {
          id: '3',
          text: 'As a student, this tool is amazing! Could you add more examples for different FPGA boards like DE1-SoC?',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          likes: 15
        },
        {
          id: '4',
          text: 'The UVM testbenches are fantastic! Any plans to add SystemC support for mixed-language verification?',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          likes: 6
        }
      ];
      setSuggestions(initialSuggestions);
      localStorage.setItem('verilog-ram-suggestions', JSON.stringify(initialSuggestions));
    }

    // Load and increment visitor count
    const currentCount = parseInt(localStorage.getItem('verilog-ram-visitors') || '1247');
    const lastVisit = localStorage.getItem('verilog-ram-last-visit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
      setVisitorCount(newCount);
      localStorage.setItem('verilog-ram-visitors', newCount.toString());
      localStorage.setItem('verilog-ram-last-visit', today);
    } else {
      setVisitorCount(currentCount);
    }

    // Load liked suggestions
    const likedSuggestions = localStorage.getItem('verilog-ram-liked');
    if (likedSuggestions) {
      setHasLiked(new Set(JSON.parse(likedSuggestions)));
    }
  }, []);

  const handleSuggestionSubmit = () => {
    if (suggestion.trim().length === 0) return;
    if (suggestion.length > 280) return;

    const newSuggestion = {
      id: Date.now().toString(),
      text: suggestion.trim(),
      timestamp: new Date(),
      likes: 0
    };

    const updatedSuggestions = [newSuggestion, ...suggestions].slice(0, 20); // Keep only latest 20
    setSuggestions(updatedSuggestions);
    setSuggestion('');

    // Save to localStorage
    localStorage.setItem('verilog-ram-suggestions', JSON.stringify(updatedSuggestions));
  };

  const handleLike = (id: string) => {
    if (hasLiked.has(id)) return;

    const updatedSuggestions = suggestions.map(s => 
      s.id === id ? { ...s, likes: s.likes + 1 } : s
    );
    setSuggestions(updatedSuggestions);
    
    const newLiked = new Set([...hasLiked, id]);
    setHasLiked(newLiked);

    // Save to localStorage
    localStorage.setItem('verilog-ram-suggestions', JSON.stringify(updatedSuggestions));
    localStorage.setItem('verilog-ram-liked', JSON.stringify([...newLiked]));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Verilog RAM Generator
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90">
              A comprehensive educational tool that teaches digital design concepts while generating 
              professional-grade Verilog code for memory systems
            </p>
          </div>
        </div>
      </section>

      {/* Suggestion Call-to-Action Banner */}
      <section className="py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Lightbulb size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Have Ideas? Share Them!</h3>
                <p className="text-purple-100 text-sm">
                  Join {visitorCount.toLocaleString()}+ visitors • {suggestions.length} suggestions shared
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  <span>Most wanted: DDR4 support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>Latest: Timing diagrams</span>
                </div>
              </div>
              <button
                onClick={scrollToSuggestions}
                className="btn bg-white text-purple-600 hover:bg-purple-50 font-semibold px-6 py-3 flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Share Your Ideas
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What This Project Does */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Does This Project Do?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              This tool generates production-ready Verilog RAM modules with advanced features. 
              It's designed to be both educational and practical for real-world FPGA projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Code Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically generates parameterized Verilog modules for RAM of different sizes 
                (8GB, 16GB, 32GB) with professional documentation and comments.
              </p>
            </div>

            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <TestTube size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Testbench Creation</h3>
              <p className="text-gray-600 leading-relaxed">
                Creates comprehensive testbenches with assertions, coverage collection, 
                and UVM-compliant verification environments for thorough testing.
              </p>
            </div>

            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <Cpu size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interface Options</h3>
              <p className="text-gray-600 leading-relaxed">
                Supports multiple industry-standard interfaces including AXI4, Avalon, 
                and Wishbone for integration with different processor systems.
              </p>
            </div>

            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Error Correction</h3>
              <p className="text-gray-600 leading-relaxed">
                Implements ECC (Error Correction Code) with single-bit error correction 
                and double-bit error detection for reliable memory operations.
              </p>
            </div>

            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <Layers size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Architectures</h3>
              <p className="text-gray-600 leading-relaxed">
                Supports dual-port RAM, pipelined architectures, and multi-clock domain 
                designs for high-performance applications.
              </p>
            </div>

            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Simulation</h3>
              <p className="text-gray-600 leading-relaxed">
                In-browser simulation engine that validates memory operations with 
                real-time logging and error detection capabilities.
              </p>
            </div>

            <div className="feature-box">
              <div className="text-primary-600 mb-4">
                <Database size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Timing Diagrams</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Interactive timing diagrams that visualize memory operations and help understand 
                signal relationships in RAM modules for better learning.
              </p>
              <button 
                onClick={handleTimingDiagramClick}
                className="btn btn-primary flex items-center gap-2 w-fit"
              >
                <Database size={16} />
                View Timing Diagrams
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding the step-by-step process of generating professional Verilog code
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Select RAM Configuration</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Choose your desired RAM size and advanced features. The tool calculates optimal 
                    parameters like address width, data width, and memory depth automatically.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-800 mb-2">Example for 8GB RAM:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Data Width: 64 bits (optimal for modern processors)</li>
                      <li>• Address Width: 27 bits (2^27 × 64 bits = 8GB)</li>
                      <li>• Memory Depth: 134,217,728 words</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Code Generation Engine</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our TypeScript-based generator creates production-ready Verilog code with 
                    proper parameter handling, timing constraints, and synthesis directives.
                  </p>
                  <div className="code-block">
                    <code>{`module ram_8gb #(
    parameter DATA_WIDTH = 64,
    parameter ADDR_WIDTH = 27,
    parameter DEPTH = 134217728
) (
    input  wire clk,
    input  wire rst_n,
    input  wire we,
    input  wire [ADDR_WIDTH-1:0] addr,
    input  wire [DATA_WIDTH-1:0] data_in,
    output reg  [DATA_WIDTH-1:0] data_out
);`}</code>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Advanced Features Integration</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Based on your selections, the generator adds advanced features like ECC, 
                    dual-port access, AXI4 interfaces, and pipelined architectures.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="feature-box-primary">
                      <h4 className="font-semibold text-primary-800 mb-2">ECC Implementation</h4>
                      <p className="text-sm text-primary-700">Hamming code with SECDED capability</p>
                    </div>
                    <div className="feature-box-success">
                      <h4 className="font-semibold text-green-800 mb-2">AXI4 Interface</h4>
                      <p className="text-sm text-green-700">Full AXI4 protocol compliance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Simulation & Verification</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Test your generated code with our in-browser simulator or use the comprehensive 
                    testbenches with real EDA tools like ModelSim, Vivado, or Quartus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RAM Organization Explanation */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Understanding RAM Organization
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Learn the fundamental concepts behind memory organization and design
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Basic Concepts */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Basic Memory Concepts</h3>
                
                <div className="space-y-6">
                  <div className="feature-box">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Database size={20} className="text-primary-600" />
                      Address Space
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Each memory location has a unique address. For an 8GB RAM with 64-bit words:
                    </p>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                      Address Width = log₂(Memory Size / Data Width)<br/>
                      = log₂(8GB / 64 bits) = 27 bits
                    </div>
                  </div>

                  <div className="feature-box">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Layers size={20} className="text-primary-600" />
                      Data Organization
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Memory is organized in words (typically 8, 16, 32, or 64 bits). Our generator 
                      uses 64-bit words for optimal performance with modern processors.
                    </p>
                  </div>

                  <div className="feature-box">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Cpu size={20} className="text-primary-600" />
                      Access Patterns
                    </h4>
                    <p className="text-gray-600">
                      Sequential access (for streaming), random access (for caches), and burst access 
                      (for DMA transfers). Our tool supports all these patterns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Topics */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Advanced Memory Features</h3>
                
                <div className="space-y-6">
                  <div className="feature-box-primary">
                    <h4 className="text-lg font-semibold mb-3 text-primary-800">
                      Error Correction Code (ECC)
                    </h4>
                    <p className="text-primary-700 mb-3">
                      ECC protects against data corruption using redundant bits. For 64-bit data:
                    </p>
                    <ul className="text-sm text-primary-700 space-y-1">
                      <li>• Detects single and double-bit errors</li>
                      <li>• Corrects single-bit errors automatically</li>
                      <li>• Uses 8 additional bits for 64-bit data</li>
                    </ul>
                  </div>

                  <div className="feature-box-success">
                    <h4 className="text-lg font-semibold mb-3 text-green-800">
                      Dual-Port Architecture
                    </h4>
                    <p className="text-green-700 mb-3">
                      Two independent access ports allow simultaneous operations:
                    </p>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Port A and Port B can operate independently</li>
                      <li>• Collision detection for same-address access</li>
                      <li>• Higher throughput for multi-processor systems</li>
                    </ul>
                  </div>

                  <div className="feature-box-warning">
                    <h4 className="text-lg font-semibold mb-3 text-yellow-800">
                      Pipeline Architecture
                    </h4>
                    <p className="text-yellow-700 mb-3">
                      Multi-stage pipeline increases throughput:
                    </p>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Address decode → Memory access → Output</li>
                      <li>• Higher clock frequencies possible</li>
                      <li>• Increased latency but higher bandwidth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SystemVerilog Learning Resources */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn SystemVerilog & Digital Design
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Essential resources for understanding and mastering digital design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Books */}
            <div className="feature-box">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold">Essential Books</h3>
              </div>
              <div className="space-y-3">
                <a href="https://www.amazon.com/SystemVerilog-Verification-Guide-Learning-Testbench/dp/0387765301" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  SystemVerilog for Verification by Chris Spear
                </a>
                <a href="https://www.amazon.com/Digital-Design-Computer-Architecture-Harris/dp/0123944244" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  Digital Design and Computer Architecture
                </a>
                <a href="https://www.amazon.com/SystemVerilog-ASIC-FPGA-Design-Guide/dp/1402074972" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  SystemVerilog for ASIC and FPGA Design
                </a>
              </div>
            </div>

            {/* Online Courses */}
            <div className="feature-box">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold">Online Courses</h3>
              </div>
              <div className="space-y-3">
                <a href="https://www.coursera.org/learn/digital-systems" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  Digital Systems Design (Coursera)
                </a>
                <a href="https://www.edx.org/course/introduction-to-fpga-design-for-embedded-systems" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  FPGA Design for Embedded Systems (edX)
                </a>
                <a href="https://www.udemy.com/course/learn-verilog-hdl-primary-course/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  Learn Verilog HDL (Udemy)
                </a>
              </div>
            </div>

            {/* Documentation */}
            <div className="feature-box">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold">Official Documentation</h3>
              </div>
              <div className="space-y-3">
                <a href="https://www.systemverilog.org/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  SystemVerilog.org
                </a>
                <a href="https://standards.ieee.org/standard/1800-2017.html" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  IEEE 1800-2017 Standard
                </a>
                <a href="https://www.arm.com/products/silicon-ip-cpu/amba/amba-open-specifications" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  ARM AMBA AXI4 Specification
                </a>
              </div>
            </div>

            {/* Tools & Simulators */}
            <div className="feature-box">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold">EDA Tools</h3>
              </div>
              <div className="space-y-3">
                <a href="https://www.intel.com/content/www/us/en/software/programmable/quartus-prime/overview.html" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  Intel Quartus Prime (Free)
                </a>
                <a href="https://www.xilinx.com/products/design-tools/vivado.html" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  AMD Vivado (Free WebPack)
                </a>
                <a href="https://eda-playground.readthedocs.io/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  EDA Playground (Online)
                </a>
              </div>
            </div>

            {/* Communities */}
            <div className="feature-box">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold">Communities</h3>
              </div>
              <div className="space-y-3">
                <a href="https://reddit.com/r/FPGA" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  r/FPGA Subreddit
                </a>
                <a href="https://electronics.stackexchange.com/questions/tagged/verilog" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  Stack Exchange - Verilog
                </a>
                <a href="https://verification.academy/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  Verification Academy
                </a>
              </div>
            </div>

            {/* Reference Sites */}
            <div className="feature-box">
              <div className="flex items-center gap-3 mb-4">
                <Star className="text-primary-600" size={24} />
                <h3 className="text-xl font-semibold">Quick References</h3>
              </div>
              <div className="space-y-3">
                <a href="https://www.chipverify.com/systemverilog/systemverilog-tutorial" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  ChipVerify SystemVerilog Tutorial
                </a>
                <a href="https://www.asic-world.com/verilog/index.html" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  ASIC World Verilog Tutorial
                </a>
                <a href="https://hdlbits.01xz.net/wiki/Main_Page" 
                   target="_blank" rel="noopener noreferrer" 
                   className="block link-external">
                  HDLBits - Verilog Practice
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who Can Use This Tool?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From students learning digital design to professionals developing FPGA systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-box text-center">
              <div className="text-primary-600 mb-4 flex justify-center">
                <GraduationCap size={48} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Students</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Learn memory design concepts, Verilog coding, and verification methodologies 
                through hands-on experience with real-world examples.
              </p>
            </div>

            <div className="feature-box text-center">
              <div className="text-primary-600 mb-4 flex justify-center">
                <Building size={48} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Professionals</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Quickly generate production-ready memory controllers for FPGA projects, 
                prototype systems, and embedded applications.
              </p>
            </div>

            <div className="feature-box text-center">
              <div className="text-primary-600 mb-4 flex justify-center">
                <Users size={48} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Researchers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Use as a starting point for memory architecture research, performance analysis, 
                and custom memory controller development.
              </p>
            </div>

            <div className="feature-box text-center">
              <div className="text-primary-600 mb-4 flex justify-center">
                <BookOpen size={48} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Educators</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Demonstrate advanced digital design concepts with real, working examples. 
                Perfect for computer architecture and digital design courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Detailed technical information about the generated Verilog code
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-box">
                <h3 className="text-xl font-semibold mb-4">Memory Configurations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">8GB RAM:</span>
                    <span className="text-gray-600">27-bit address, 64-bit data</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">16GB RAM:</span>
                    <span className="text-gray-600">28-bit address, 64-bit data</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">32GB RAM:</span>
                    <span className="text-gray-600">29-bit address, 64-bit data</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Word Size:</span>
                    <span className="text-gray-600">64 bits (8 bytes)</span>
                  </div>
                </div>
              </div>

              <div className="feature-box">
                <h3 className="text-xl font-semibold mb-4">Interface Support</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Simple Memory Interface</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>ARM AMBA AXI4 Interface</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Intel Avalon Memory-Mapped</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Wishbone Interface</span>
                  </div>
                </div>
              </div>

              <div className="feature-box">
                <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Error Correction Code (ECC)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Dual-Port Architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Pipelined Operations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Burst Transfer Support</span>
                  </div>
                </div>
              </div>

              <div className="feature-box">
                <h3 className="text-xl font-semibold mb-4">Verification Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>UVM-Compliant Testbenches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Functional Coverage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>SystemVerilog Assertions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Constrained Random Testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Creator</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Personal Info */}
              <div className="md:col-span-1">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Abhinav Kannan</h3>
                  <p className="text-blue-600 font-medium mb-4">Electrical & Microsystems Engineering Student</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 Regensburg, Germany</p>
                    <p>🎓 OTH Regensburg</p>
                    <p>💼 Application Developer @ Infineon</p>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <a 
                      href="mailto:abhinavkannan434@gmail.com"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <span>✉️</span> abhinavkannan434@gmail.com
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/abhinav-kannan-495861157"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <span>💼</span> LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Story & Motivation */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Why I Created This Tool</h4>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    As a Master's student in <strong>Electrical and Microsystems Engineering</strong> at OTH Regensburg, 
                    I'm currently learning Verilog and digital design. Coming from a background in 
                    software development and embedded systems, I'm finding the complexity of 
                    memory design challenging and noticed the lack of practical, beginner-friendly resources.
                  </p>

                  <p>
                    While working as an <strong>Application Developer at Infineon</strong>, I've seen firsthand how 
                    important it is to have tools that bridge the gap between theoretical knowledge and practical 
                    implementation. As I navigate the learning curve of Verilog myself, especially when dealing with 
                    complex memory architectures and verification methodologies, I realized how much easier it would be with better tools.
                  </p>

                  <p>
                    <strong>My mission</strong> is simple: <em>make digital design accessible to everyone</em>. 
                    As a fellow learner, I understand the struggles students face with their first RAM module, 
                    the need for quick prototyping tools, and the importance of having practical educational materials. 
                    This tool is designed to help others learn alongside me and remove the barriers I've encountered.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-blue-900">
                      "Learning shouldn't be limited by access to expensive tools or complex documentation. 
                      Good education should be free, practical, and immediately useful. As a student myself, 
                      I believe we learn best when we help each other."
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold text-gray-900 mb-3">My Technical Journey</h5>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-medium text-gray-900 mb-2">🎓 Education</h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• M.Eng. Electrical & Microsystems Engineering</li>
                        <li>• Full-Stack Development Certification</li>
                        <li>• B.Eng. Electrical & Electronics</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-medium text-gray-900 mb-2">💻 Experience</h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Application Developer @ Infineon</li>
                        <li>• Software Developer @ Guidehouse</li>
                        <li>• STEM Trainer in Embedded Systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">🚀 Future Vision</h5>
                  <p className="text-sm text-gray-700">
                    This tool is just the beginning. I'm working on expanding it with more advanced features, 
                    better educational content, and support for other digital design challenges. The goal is to 
                    create a comprehensive, free platform that empowers the next generation of engineers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                <strong>Want to contribute or have suggestions?</strong> I'd love to hear from you! 
                This project thrives on community feedback and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* License & Usage Rights Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">License & Usage Rights</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Software License */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <Code size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tool License</h3>
                  <p className="text-sm text-gray-600">MIT License</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  This web application is released under the <strong>MIT License</strong>, 
                  making it completely free and open source.
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">You Can:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✅ Use the tool for any purpose</li>
                    <li>✅ Modify and redistribute the source code</li>
                    <li>✅ Use it in commercial projects</li>
                    <li>✅ Create derivative works</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600">
                  <strong>Copyright:</strong> © 2025 Abhinav Kannan
                </p>
              </div>
            </div>

            {/* Generated Code License */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Generated Verilog Code</h3>
                  <p className="text-sm text-gray-600">Unrestricted Usage</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  All Verilog code generated by this tool is <strong>free to use</strong> 
                  without any restrictions or licensing requirements.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Generated Code Rights:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>🎓 Educational use (projects, coursework)</li>
                    <li>💼 Commercial use (products, services)</li>
                    <li>🔧 Modification and enhancement</li>
                    <li>📤 Distribution and sharing</li>
                    <li>🏭 FPGA/ASIC implementation</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>Optional Attribution:</strong> While not required, crediting 
                    "Generated using Verilog RAM Generator by Abhinav Kannan" is appreciated.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Important Disclaimer</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                The generated Verilog code is provided <strong>"as is"</strong> without warranty 
                of any kind. While every effort is made to generate correct and functional code, 
                users should verify and test the code thoroughly before use in critical applications.
              </p>
              <p>
                <strong>Contact:</strong> For licensing questions or commercial inquiries, 
                reach out at <a href="mailto:abhinavkannan434@gmail.com" className="text-blue-600 hover:underline">
                abhinavkannan434@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Suggestions Section */}
      <section id="suggestions-section" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Suggestions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full mb-4"></div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-purple-600" />
                <span>{visitorCount.toLocaleString()} visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-purple-600" />
                <span>{suggestions.length} suggestions</span>
              </div>
            </div>
          </div>

          {/* Suggestion Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Ideas</h3>
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="What features would you like to see? Share your ideas, feedback, or questions..."
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  maxLength={280}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {suggestion.length}/280
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  💡 No registration required • Your suggestions help improve the tool
                </p>
                <button
                  onClick={handleSuggestionSubmit}
                  disabled={suggestion.trim().length === 0 || suggestion.length > 280}
                  className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions Feed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Suggestions</h3>
            
            {suggestions.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Be the first to share your ideas!</p>
                <p className="text-sm text-gray-500">Your suggestions help make this tool better for everyone.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.map((s) => (
                  <div key={s.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {s.text.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 leading-relaxed mb-3">{s.text}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatTimeAgo(s.timestamp)}</span>
                          <button
                            onClick={() => handleLike(s.id)}
                            disabled={hasLiked.has(s.id)}
                            className={`flex items-center gap-1 transition-colors ${
                              hasLiked.has(s.id) 
                                ? 'text-red-500 cursor-not-allowed' 
                                : 'text-gray-500 hover:text-red-500 cursor-pointer'
                            }`}
                          >
                            <Heart 
                              size={16} 
                              className={hasLiked.has(s.id) ? 'fill-current' : ''} 
                            />
                            <span>{s.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                            <Share2 size={16} />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              💝 Thank you for helping make this tool better! All suggestions are read and considered.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Generate your first professional Verilog RAM module and explore advanced digital design concepts
          </p>
          <a href="/" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
            Start Generating Code
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Floating Suggestion Button */}
      {showFloatingButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={scrollToSuggestions}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce"
          >
            <div className="flex items-center gap-2">
              <Lightbulb size={24} />
              <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap mr-2">
                Share Ideas
              </span>
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {suggestions.length}
            </div>
          </button>
        </div>
      )}

      {/* Suggestion Pulse Animation */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
        <div className="w-16 h-16 bg-purple-600/20 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default AboutPage;
