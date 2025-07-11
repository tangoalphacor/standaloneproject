# Contributing to Verilog RAM Generator

Thank you for your interest in contributing to the Verilog RAM Generator! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Specify your browser, OS, and Node.js version
- Attach screenshots if relevant

### Suggesting Features
- Open a GitHub discussion for feature requests
- Explain the use case and benefits
- Consider implementation complexity
- Check if similar features already exist

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/standaloneproject.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

#### Development Guidelines

##### Code Style
- Use TypeScript for all new code
- Follow existing formatting and naming conventions
- Use functional React components with hooks
- Prefer CSS Modules for component styling
- Use meaningful variable and function names

##### Component Structure
```typescript
import React from 'react';
import type { ComponentProps } from './types';
import styles from './Component.module.css';

interface Props extends ComponentProps {
  // Component-specific props
}

const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Component logic
  
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

##### Verilog Generation
- Ensure generated code is synthesizable
- Include comprehensive comments
- Follow industry-standard naming conventions
- Add parameter validation
- Include test cases for new features

##### CSS Guidelines
- Use CSS Variables for theming
- Implement responsive design principles
- Maintain accessibility standards
- Use semantic class names
- Follow mobile-first approach

#### Testing
- Test all new features thoroughly
- Verify generated Verilog code compiles
- Check responsive design on multiple devices
- Ensure accessibility standards are met
- Run existing tests: `npm test`

#### Commit Guidelines
- Use clear, descriptive commit messages
- Follow conventional commit format:
  - `feat: add new feature`
  - `fix: resolve bug`
  - `docs: update documentation`
  - `style: formatting changes`
  - `refactor: code restructuring`
  - `test: add or modify tests`

### Pull Request Process

#### Before Submitting
1. Ensure your code passes all tests
2. Update documentation if necessary
3. Add or update type definitions
4. Verify no TypeScript errors exist
5. Test in multiple browsers

#### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested locally
- [ ] Added new tests
- [ ] Updated existing tests
- [ ] Verified Verilog output

## Screenshots (if applicable)

## Additional Notes
```

## 🎯 Priority Areas

### High Priority
- Advanced Verilog features (AXI4, dual-port, ECC)
- Enhanced simulation capabilities
- Performance optimizations
- Mobile responsiveness improvements
- Accessibility enhancements

### Medium Priority
- Additional RAM sizes and configurations
- Export formats (SystemVerilog, VHDL)
- Waveform visualization
- Project templates
- Integration guides

### Low Priority
- Theme customization
- Keyboard shortcuts
- Advanced editor features
- Community features
- Analytics and metrics

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Modern web browser
- VS Code (recommended)

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- CSS Modules
- Prettier - Code formatter
- ESLint

### Environment Setup
```bash
# Clone the repository
git clone https://github.com/abhinavkannan/standaloneproject.git
cd standaloneproject

# Install dependencies
npm install

# Start development server
npm run dev

# Open in VS Code
code .
```

### Build and Test
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📋 Code Review Process

### What We Look For
- **Functionality**: Does the code work as intended?
- **Code Quality**: Is the code clean, readable, and maintainable?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Accessibility**: Does it maintain accessibility standards?
- **Documentation**: Is the code properly documented?

### Review Timeline
- Initial review within 48 hours
- Follow-up responses within 24 hours
- Approval typically within 1 week for standard features

## 🎓 Learning Resources

### Technologies Used
- **React**: [React Documentation](https://react.dev/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Vite**: [Vite Guide](https://vitejs.dev/guide/)
- **CSS Modules**: [CSS Modules Documentation](https://github.com/css-modules/css-modules)

### Verilog Resources
- **IEEE Standard**: SystemVerilog 1800-2017
- **Books**: "SystemVerilog for Verification" by Chris Spear
- **Online**: EDA Playground for testing Verilog code

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments section
- Release notes for significant contributions
- GitHub contributor statistics
- Special thanks in documentation

## 📞 Getting Help

### Communication Channels
- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Email**: abhinavkannan434@gmail.com for private matters

### Response Times
- GitHub issues: Within 48 hours
- Pull requests: Within 24 hours for initial review
- Discussions: Within 72 hours

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License. All generated Verilog code remains free to use without restrictions.

---

Thank you for contributing to the Verilog RAM Generator! Together, we're making digital design more accessible to everyone. 🚀
