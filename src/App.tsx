import { useState } from 'react';
import { Cpu, Github, Sparkles, BookOpen, Home, Clock } from 'lucide-react';
import type { RAMSize, AdvancedFeatures, VerilogCode } from './types';
import { generateRAMVerilog, SimpleVerilogSimulator } from './utils/verilogGenerator';
import { generateAdvancedRAMVerilog } from './utils/advancedVerilogGenerator';
import { RAM_CONFIGS, ADVANCED_RAM_CONFIGS } from './types';
import RAMConfigurator from './components/RAMConfigurator';
import AdvancedConfigurator from './components/AdvancedConfigurator';
import CodeDisplay from './components/CodeDisplay';
import SimulationPanel from './components/SimulationPanel';
import AboutPage from './components/AboutPage';
import TimingDiagramPage from './components/TimingDiagramPage';
import styles from './styles/App.module.css';
import './styles/globals.css';

type PageType = 'home' | 'about' | 'timing-diagrams';

function App() {
  const [selectedRAM, setSelectedRAM] = useState<RAMSize>('8GB');
  const [generatedCode, setGeneratedCode] = useState<VerilogCode>({ module: '', testbench: '' });
  const [simulator, setSimulator] = useState<SimpleVerilogSimulator | null>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [advancedFeatures, setAdvancedFeatures] = useState<AdvancedFeatures>({
    interface: 'simple',
    memoryType: 'standard',
    testbenchType: 'basic',
    burstMode: 'none',
    eccEnabled: false,
    pipelineStages: 1,
    clockDomains: 1,
    initializationFile: null,
    performanceOptimized: false,
    uvmCompliant: false,
    coverageEnabled: false,
    assertionsEnabled: false
  });

  const handleRAMSizeChange = (ramSize: RAMSize) => {
    setSelectedRAM(ramSize);
    updateGeneratedCode(ramSize);
  };

  const handleAdvancedFeaturesChange = (features: AdvancedFeatures) => {
    setAdvancedFeatures(features);
    updateGeneratedCode(selectedRAM, features);
  };

  const updateGeneratedCode = (ramSize: RAMSize, features?: AdvancedFeatures) => {
    let verilogCode: VerilogCode;
    
    if (isAdvancedMode && features) {
      verilogCode = generateAdvancedRAMVerilog(ADVANCED_RAM_CONFIGS[ramSize]);
    } else {
      verilogCode = generateRAMVerilog(ramSize);
    }
    
    setGeneratedCode(verilogCode);
    setSimulator(new SimpleVerilogSimulator(RAM_CONFIGS[ramSize]));
  };

  // Initialize with basic 8GB configuration
  if (!generatedCode.module) {
    updateGeneratedCode(selectedRAM);
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigate={(page) => setCurrentPage(page as PageType)} />;
  }

  if (currentPage === 'timing-diagrams') {
    return <TimingDiagramPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.logo}>
                <Cpu className={styles.logoIcon} />
                <span className={styles.logoText}>Verilog RAM Generator</span>
              </div>
            </div>
            
            <nav className={styles.nav}>
              <button 
                onClick={() => setCurrentPage('home')}
                className={`${styles.navButton} ${currentPage === 'home' ? styles.active : ''}`}
              >
                <Home size={18} />
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className={`${styles.navButton} ${(currentPage as string) === 'about' ? styles.active : ''}`}
              >
                <BookOpen size={18} />
                About
              </button>
              <button 
                onClick={() => setCurrentPage('timing-diagrams')}
                className={`${styles.navButton} ${(currentPage as string) === 'timing-diagrams' ? styles.active : ''}`}
              >
                <Clock size={18} />
                Timing Diagrams
              </button>
              <a 
                href="https://github.com/abhinavkannan" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.navButton}
              >
                <Github size={18} />
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  Professional Verilog RAM Generator
                  <Sparkles className={styles.heroIcon} />
                </h1>
                <p className={styles.heroSubtitle}>
                  Generate production-ready, parameterized Verilog RAM modules with advanced features
                  including ECC, AXI4 interface, dual-port configurations, and comprehensive testbenches.
                </p>
                
                <div className={styles.heroFeatures}>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🎯</span>
                    <span>Industry-Standard Code</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>⚡</span>
                    <span>Real-time Generation</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🧪</span>
                    <span>Built-in Simulation</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>💻</span>
                    <span>Advanced Features</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mode Selection */}
          <div className={styles.modeSelector}>
            <div className={styles.modeButtons}>
              <button
                onClick={() => {
                  setIsAdvancedMode(false);
                  updateGeneratedCode(selectedRAM);
                }}
                className={`${styles.modeButton} ${!isAdvancedMode ? styles.active : ''}`}
              >
                <span className={styles.modeIcon}>🎯</span>
                <div>
                  <div className={styles.modeTitle}>Basic Mode</div>
                  <div className={styles.modeDesc}>Standard RAM configurations</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setIsAdvancedMode(true);
                  updateGeneratedCode(selectedRAM, advancedFeatures);
                }}
                className={`${styles.modeButton} ${isAdvancedMode ? styles.active : ''}`}
              >
                <span className={styles.modeIcon}>💎</span>
                <div>
                  <div className={styles.modeTitle}>Advanced Mode</div>
                  <div className={styles.modeDesc}>Professional features & UVM</div>
                </div>
              </button>
            </div>
          </div>

          {/* Configuration and Code Display */}
          <div className={styles.content}>
            {/* Configuration Panel */}
            <div className={styles.configPanel}>
              <RAMConfigurator
                selectedRAM={selectedRAM}
                onRAMSizeChange={handleRAMSizeChange}
              />
              
              {isAdvancedMode && (
                <>
                  <div className="mb-6"></div>
                  <AdvancedConfigurator
                    features={advancedFeatures}
                    onFeaturesChange={handleAdvancedFeaturesChange}
                  />
                </>
              )}
              
              <div className="mb-6"></div>
              {simulator && <SimulationPanel simulator={simulator} />}
            </div>

            {/* Code Display Panel */}
            <div className={styles.codePanel}>
              <CodeDisplay 
                verilogCode={generatedCode}
                ramConfig={RAM_CONFIGS[selectedRAM]}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <h3 className={styles.footerTitle}>Built with Modern Web Technologies</h3>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>React + TypeScript</a>
              <a href="#" className={styles.footerLink}>Vite</a>
              <a href="#" className={styles.footerLink}>Monaco Editor</a>
              <a href="#" className={styles.footerLink}>Advanced Verilog Features</a>
              <a href="#" className={styles.footerLink}>Free & Open Source</a>
            </div>
            <div className={styles.footerCopyright}>
              <div className="text-center space-y-2">
                <p>© 2025 Abhinav Kannan. All rights reserved.</p>
                <p className="text-sm opacity-75">
                  Generated Verilog code is free to use for educational and commercial purposes.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <a href="/LICENSE" className="hover:underline">MIT License</a>
                  <span>•</span>
                  <span>Contact: abhinavkannan434@gmail.com</span>
                  <span>•</span>
                  <a href="#" className="hover:underline">Usage Rights</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;



