// Types for the Verilog RAM Generator

export type RAMSize = '8GB' | '16GB' | '32GB';

export interface RAMConfig {
  size: RAMSize;
  dataWidth: number;
  addressWidth: number;
  depth: number;
}

export interface VerilogCode {
  module: string;
  testbench: string;
}

export interface SimulationResult {
  success: boolean;
  output: string;
  errors?: string[];
  warnings?: string[];
}

export interface SimulationState {
  isRunning: boolean;
  results: SimulationResult | null;
  logs: string[];
}

// RAM size configurations
export const RAM_CONFIGS: Record<RAMSize, RAMConfig> = {
  '8GB': {
    size: '8GB',
    dataWidth: 64,
    addressWidth: 27, // 2^27 * 64 bits = 8GB
    depth: 134217728, // 2^27
  },
  '16GB': {
    size: '16GB',
    dataWidth: 64,
    addressWidth: 28, // 2^28 * 64 bits = 16GB
    depth: 268435456, // 2^28
  },
  '32GB': {
    size: '32GB',
    dataWidth: 64,
    addressWidth: 29, // 2^29 * 64 bits = 32GB
    depth: 536870912, // 2^29
  },
};

// Advanced Verilog Features
export type InterfaceType = 'simple' | 'axi4' | 'avalon' | 'wishbone';
export type MemoryType = 'standard' | 'ecc' | 'dual_port' | 'pipelined';
export type TestbenchType = 'basic' | 'uvm' | 'coverage' | 'randomized';
export type BurstMode = 'none' | 'sequential' | 'wrap';

export interface AdvancedFeatures {
  interface: InterfaceType;
  memoryType: MemoryType;
  testbenchType: TestbenchType;
  burstMode: BurstMode;
  eccEnabled: boolean;
  pipelineStages: number;
  clockDomains: number;
  initializationFile: string | null;
  performanceOptimized: boolean;
  uvmCompliant: boolean;
  coverageEnabled: boolean;
  assertionsEnabled: boolean;
}

export interface AdvancedRAMConfig extends RAMConfig {
  features: AdvancedFeatures;
  interfaceWidth: number;
  burstLength: number;
  latency: {
    read: number;
    write: number;
  };
  powerSettings: {
    lowPowerMode: boolean;
    clockGating: boolean;
    powerDomains: number;
  };
}

// Feature descriptions for UI
export const FEATURE_DESCRIPTIONS = {
  interface: {
    simple: "Basic memory interface with simple read/write signals",
    axi4: "ARM AMBA AXI4 interface - industry standard for high-performance",
    avalon: "Intel Avalon Memory-Mapped interface - optimized for Intel FPGAs",
    wishbone: "Open-source Wishbone interface - flexible and well-documented"
  },
  memoryType: {
    standard: "Standard single-port RAM with basic functionality",
    ecc: "Error Correction Code - detects and corrects memory errors",
    dual_port: "True dual-port RAM - simultaneous access from two ports",
    pipelined: "Pipelined architecture for higher throughput operations"
  },
  testbenchType: {
    basic: "Simple directed testbench with basic read/write tests",
    uvm: "UVM-compliant testbench with reusable verification components",
    coverage: "Coverage-driven verification with functional coverage points",
    randomized: "Constrained random testing with advanced stimulus generation"
  },
  burstMode: {
    none: "Single-beat transactions only",
    sequential: "Sequential burst - incremental addressing",
    wrap: "Wrapping burst - address wraps at boundary"
  }
};

// Default advanced configurations
export const ADVANCED_RAM_CONFIGS: Record<RAMSize, AdvancedRAMConfig> = {
  '8GB': {
    ...RAM_CONFIGS['8GB'],
    features: {
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
      assertionsEnabled: true
    },
    interfaceWidth: 64,
    burstLength: 1,
    latency: { read: 1, write: 1 },
    powerSettings: {
      lowPowerMode: false,
      clockGating: false,
      powerDomains: 1
    }
  },
  '16GB': {
    ...RAM_CONFIGS['16GB'],
    features: {
      interface: 'axi4',
      memoryType: 'ecc',
      testbenchType: 'coverage',
      burstMode: 'sequential',
      eccEnabled: true,
      pipelineStages: 2,
      clockDomains: 1,
      initializationFile: null,
      performanceOptimized: true,
      uvmCompliant: false,
      coverageEnabled: true,
      assertionsEnabled: true
    },
    interfaceWidth: 128,
    burstLength: 8,
    latency: { read: 2, write: 1 },
    powerSettings: {
      lowPowerMode: true,
      clockGating: true,
      powerDomains: 2
    }
  },
  '32GB': {
    ...RAM_CONFIGS['32GB'],
    features: {
      interface: 'axi4',
      memoryType: 'dual_port',
      testbenchType: 'uvm',
      burstMode: 'wrap',
      eccEnabled: true,
      pipelineStages: 3,
      clockDomains: 2,
      initializationFile: null,
      performanceOptimized: true,
      uvmCompliant: true,
      coverageEnabled: true,
      assertionsEnabled: true
    },
    interfaceWidth: 256,
    burstLength: 16,
    latency: { read: 3, write: 2 },
    powerSettings: {
      lowPowerMode: true,
      clockGating: true,
      powerDomains: 4
    }
  }
};
