# 🚀 Verilog RAM Generator

> **Professional-grade parameterized Verilog RAM module generator with built-in simulation**

A modern, full-stack web application that generates production-ready Verilog RAM modules for FPGA development, computer architecture projects, and digital design. Features real-time code generation, in-browser simulation, and professional documentation.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Available-success)](https://your-vercel-app.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## ✨ Features

### 🔧 **Code Generation**
- **Parameterized Verilog modules** for 8GB, 16GB, and 32GB RAM
- **Complete testbenches** with comprehensive assertions
- **Industry-standard code** ready for synthesis
- **Professional documentation** and comments
- **GTKWave integration** for waveform analysis

### 🎮 **Interactive Simulation**
- **Real-time simulation** in the browser
- **Memory operations testing** (read/write)
- **Address boundary validation**
- **Custom test scenarios**
- **Live logging and feedback**

### 💻 **Modern UI/UX**
- **Responsive design** for all devices
- **Professional interface** with Monaco Editor
- **Real-time code preview** with syntax highlighting
- **One-click download** and copy functionality
- **Dark mode code editor**

### 🆓 **Completely Free**
- **No external dependencies** or paid services
- **Free deployment** on Vercel
- **Open source** with MIT license
- **No API limits** or usage restrictions

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19.0+ or 22.12.0+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/verilog-ram-generator.git
cd verilog-ram-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
# Navigate to http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🏗️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript | Modern UI framework with type safety |
| **Build Tool** | Vite | Lightning-fast development and building |
| **Styling** | CSS Modules + Variables | Scoped styling without external frameworks |
| **Code Editor** | Monaco Editor | VS Code-quality code editing |
| **Icons** | Lucide React | Consistent, professional icons |
| **Simulation** | Custom JavaScript Engine | In-browser Verilog simulation |
| **Deployment** | Vercel | Free, fast, and reliable hosting |

## 📁 Project Structure

```
verilog-ram-generator/
├── 📂 src/
│   ├── 📂 components/          # React components
│   │   ├── RAMConfigurator.tsx # RAM size selection
│   │   ├── CodeDisplay.tsx     # Code viewer with Monaco
│   │   └── SimulationPanel.tsx # Simulation interface
│   ├── 📂 utils/               # Core functionality
│   │   └── verilogGenerator.ts # Verilog code generation
│   ├── 📂 types/               # TypeScript definitions
│   │   └── index.ts            # Type definitions
│   ├── 📂 styles/              # CSS styling
│   │   ├── globals.css         # Global styles & variables
│   │   └── App.module.css      # Component-specific styles
│   ├── App.tsx                 # Main application
│   └── main.tsx                # Application entry point
├── 📂 .github/                 # GitHub configuration
│   └── copilot-instructions.md # Copilot customization
├── 📂 public/                  # Static assets
├── package.json                # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## 🔨 Usage

### 1. **Select RAM Size**
Choose from 8GB, 16GB, or 32GB RAM configurations. Each size automatically calculates:
- Data width (64 bits)
- Address width (27-29 bits)
- Memory depth
- Total capacity

### 2. **Generate Code**
- **RAM Module**: Complete Verilog module with parameterization
- **Testbench**: Comprehensive test suite with assertions
- **Documentation**: Professional comments and specifications

### 3. **Simulate & Test**
- Run built-in simulation tests
- Create custom read/write operations
- Validate address boundaries
- Monitor real-time logs

### 4. **Download & Use**
- Copy code to clipboard
- Download individual files
- Integrate into your FPGA projects
- Use in simulation tools like ModelSim or Vivado

## 💡 Example Generated Code

```verilog
// 8GB RAM Module - Professional Grade
module ram_8gb #(
    parameter DATA_WIDTH = 64,
    parameter ADDR_WIDTH = 27,
    parameter DEPTH = 134217728
) (
    input  wire                    clk,
    input  wire                    rst_n,
    input  wire                    we,
    input  wire                    re,
    input  wire [ADDR_WIDTH-1:0]   addr,
    input  wire [DATA_WIDTH-1:0]   data_in,
    output reg  [DATA_WIDTH-1:0]   data_out,
    output reg                     ready
);
    // Implementation with professional features...
endmodule
```

## 🎯 Use Cases

### **Academic Projects**
- Computer architecture coursework
- Digital design assignments
- FPGA development learning
- Verilog/SystemVerilog practice

### **Professional Development**
- FPGA prototyping
- Memory controller design
- System-on-chip development
- Hardware verification

### **Research & Experimentation**
- Memory architecture studies
- Performance analysis
- Custom memory solutions
- Educational demonstrations

## 🌐 Deployment

### **Vercel (Recommended - Free)**
1. Connect your GitHub repository to Vercel
2. Auto-deploy on every push to main branch
3. Get instant HTTPS domain
4. Zero configuration required

### **Alternative Free Options**
- **Netlify**: Drag & drop deployment
- **GitHub Pages**: Static hosting
- **Surge.sh**: Simple CLI deployment

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Contribution Guidelines**
- Follow TypeScript best practices
- Maintain code quality and documentation
- Test all new features thoroughly
- Keep the UI/UX professional and intuitive

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor** for providing VS Code-quality editing
- **Lucide** for beautiful, consistent icons
- **Vite** for lightning-fast development experience
- **Vercel** for free, reliable hosting
- **Open Source Community** for inspiration and tools

## 📞 Contact & Support

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Share ideas and get help
- **Email**: your.email@example.com (for professional inquiries)

---

<div align="center">

**Built with ❤️ for the digital design community**

[🌐 Live Demo](https://your-vercel-app.vercel.app) • [📖 Documentation](https://github.com/yourusername/verilog-ram-generator/wiki) • [🐛 Report Bug](https://github.com/yourusername/verilog-ram-generator/issues) • [✨ Request Feature](https://github.com/yourusername/verilog-ram-generator/issues)

</div>
