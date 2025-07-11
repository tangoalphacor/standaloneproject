<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Verilog RAM Generator - Copilot Instructions

## Project Overview
This is a full-stack web application for generating parameterized Verilog RAM modules with built-in simulation capabilities. The project focuses on creating professional-grade, production-ready Verilog code for digital design and FPGA development.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS Modules + CSS Variables (no external CSS frameworks)
- **Code Editor**: Monaco Editor (VS Code editor component)
- **Icons**: Lucide React
- **Simulation**: Custom JavaScript-based Verilog simulator
- **Deployment**: Vercel (free tier)

## Code Style Guidelines

### TypeScript
- Use TypeScript for all components and utilities
- Prefer type imports: `import type { Type } from './module'`
- Use strict type checking
- Create comprehensive interfaces for all data structures

### React Components
- Use functional components with hooks
- Prefer React.FC type annotation
- Use CSS Modules for styling
- Keep components focused and single-responsibility
- Use meaningful prop interfaces

### Verilog Code Generation
- Generate production-ready, synthesizable Verilog
- Include comprehensive testbenches
- Use parameterized modules for flexibility
- Add proper documentation and comments
- Follow industry-standard Verilog coding practices

### CSS Styling
- Use CSS Variables for theming
- Implement responsive design
- Use CSS Modules for scoped styling
- Create utility classes for common patterns
- Avoid external CSS frameworks (keep it lightweight and free)

## File Structure Conventions
- `/src/components/` - React components
- `/src/utils/` - Utility functions and Verilog generation
- `/src/types/` - TypeScript type definitions
- `/src/styles/` - CSS files and modules
- `/api/` - Backend API routes (for future expansion)

## Best Practices
1. **Performance**: Use lazy loading and code splitting where appropriate
2. **Accessibility**: Ensure all interactive elements are accessible
3. **SEO**: Include proper meta tags and semantic HTML
4. **Error Handling**: Implement comprehensive error boundaries
5. **Testing**: Write testable code with clear separation of concerns

## Verilog Generation Guidelines
- Generate industry-standard, synthesizable Verilog
- Include proper parameter validation
- Add comprehensive test benches with assertions
- Support multiple RAM sizes (8GB, 16GB, 32GB)
- Include simulation directives for GTKWave
- Add proper timing and reset handling

## Simulation Features
- Basic read/write operations
- Address boundary checking
- Data integrity verification
- Real-time logging and feedback
- Custom test capabilities

## Key Features to Maintain
- Professional UI/UX with modern design
- Real-time code generation
- In-browser simulation
- Code downloading and copying
- Responsive design for all devices
- Free deployment and hosting

When suggesting code changes or new features, ensure they align with these guidelines and maintain the professional, production-ready quality of the codebase.
