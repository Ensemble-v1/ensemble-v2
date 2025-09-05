# Contributing to Ensemble

Thank you for your interest in contributing to Ensemble! This guide will help you get started with contributing to our AI-powered sheet music conversion platform.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Project Structure](#project-structure)
- [OEMER Development](#oemer-development)
- [Troubleshooting](#troubleshooting)

## 🚀 Getting Started

### Prerequisites

Before you start contributing, make sure you have:

- Node.js 18+ installed
- Python 3.8+ installed (for OEMER)
- Git installed
- A GitHub account
- Basic knowledge of TypeScript, JavaScript, and React

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/ensemble-v2.git
   cd ensemble-v2
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/Ensemble-v1/ensemble-v2.git
   ```

## 🔧 Development Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Environment Configuration

```bash
# Copy environment files
cp .env.local.example .env.local
cp backend/.env.example backend/.env

# Edit with your configuration
# Get Clerk keys from https://clerk.com
```

### 3. Install OEMER

```bash
# Install OEMER globally
pip install oemer

# Verify installation
oemer --help
```

### 4. Start Development Servers

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
cd backend && npm start
```

### 5. Verify Setup

- Frontend should be available at http://localhost:3000
- Backend should be available at http://localhost:3001
- Check the browser console for any errors

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration (already set up in the project)
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Use proper error handling with try-catch blocks

### React Components

- Use functional components with hooks
- Follow the existing component structure
- Use TypeScript interfaces for props
- Implement proper accessibility with ARIA attributes

### Backend (Node.js/Express)

- Use async/await for asynchronous operations
- Implement proper error handling middleware
- Use Winston for logging
- Follow REST API conventions
- Validate input with Joi

### Git Commit Messages

Use conventional commit format:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: code formatting
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

Examples:
- `feat: add MIDI conversion endpoint`
- `fix: resolve OEMER timeout issue`
- `docs: update API documentation`
- `test: add unit tests for image processing`

## 🧪 Testing

### Running Tests

```bash
# Frontend tests (if implemented)
npm test

# Backend tests
cd backend && npm test
```

### Writing Tests

- Write unit tests for utility functions
- Test API endpoints with appropriate HTTP methods
- Mock external dependencies (OEMER, file system)
- Test error scenarios
- Aim for high code coverage

### Testing Guidelines

- Use Jest for backend testing
- Use React Testing Library for frontend testing
- Mock external API calls
- Test both success and error cases
- Ensure tests are deterministic

## 🔄 Submitting Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Implement your feature or fix
- Follow code style guidelines
- Add tests if applicable
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run tests
npm test

# Test manually in browser
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill in the PR template:
   - Description of changes
   - Testing performed
   - Related issues (if any)
   - Screenshots (if applicable)

### 7. Review Process

- Your PR will be reviewed by maintainers
- Address any feedback or requested changes
- Keep the PR updated with any changes
- Ensure all CI checks pass

## 📁 Project Structure

```
ensemble-v2/
├── app/                    # Next.js frontend
│   ├── components/         # Reusable components
│   ├── services/           # Service pages
│   ├── about/              # About page
│   ├── dashboard/          # Dashboard
│   ├── faq/                # FAQ page
│   ├── pricing/            # Pricing page
│   ├── services/           # Service pages
│   ├── signin/             # Sign in pages
│   ├── signup/             # Sign up pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── backend/                # Express.js backend
│   ├── routes/            # API routes
│   │   └── sheet-to-digital.js
│   ├── services/          # Business logic
│   │   ├── oemer-service.js    # OEMER integration
│   │   └── midi-converter.js   # MIDI conversion
│   ├── middleware/        # Express middleware
│   │   ├── auth.js        # Authentication
│   │   └── validation.js  # Input validation
│   ├── utils/             # Utility functions
│   │   ├── logger.js      # Logging configuration
│   │   └── setup.js       # Setup utilities
│   ├── logs/              # Log files
│   ├── temp/              # Temporary files
│   ├── downloads/         # Download files
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── components/            # Shared components
│   ├── ui/                # UI components
│   ├── footer.tsx         # Footer component
│   ├── header.tsx         # Header component
│   └── theme-provider.tsx # Theme provider
├── lib/                   # Shared utilities
│   ├── api-config.ts      # API configuration
│   ├── clerk-config.ts    # Clerk configuration
│   └── utils.ts           # Utility functions
├── public/                # Static assets
├── styles/                # Global styles
├── .env.local.example     # Environment template
├── backend/.env.example   # Backend environment template
├── render.yaml           # Render deployment config
├── package.json          # Frontend dependencies
└── README.md             # Project documentation
```

## 🔧 OEMER Development

### Understanding OEMER Integration

The OEMER service has been rewritten to use direct command-line execution instead of complex Python scripts. Key components:

- **Direct CLI Execution**: Uses `oemer` command directly
- **Image Preprocessing**: Sharp-based preprocessing for better OCR
- **Error Handling**: Comprehensive timeout and error management
- **Logging**: Detailed logging at every processing step

### Working with OEMER

```bash
# Test OEMER installation
oemer --help

# Test with sample image
oemer sample-image.png --output-path output.musicxml

# Check OEMER version
oemer --version
```

### OEMER Development Tips

- Always test with sample images before implementing
- Handle OEMER timeouts appropriately (default: 30 minutes)
- Log OEMER output for debugging
- Implement fallback mechanisms for failed processing
- Test with different image formats and sizes

## 🐛 Troubleshooting

### Common Development Issues

1. **Node.js Version Issues**
   ```bash
   # Use Node version 18+
   node --version
   ```

2. **OEMER Installation Problems**
   ```bash
   # Check if OEMER is installed
   oemer --help
   
   # Reinstall if needed
   pip install --upgrade oemer
   ```

3. **Port Conflicts**
   ```bash
   # Check if ports are available
   lsof -i :3000
   lsof -i :3001
   
   # Kill processes if needed
   kill -9 <PID>
   ```

4. **Environment Variable Issues**
   ```bash
   # Verify environment variables
   echo $NEXT_PUBLIC_BACKEND_URL
   echo $CLERK_PUBLISHABLE_KEY
   ```

5. **Build Failures**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules backend/node_modules
   npm install
   cd backend && npm install && cd ..
   ```

### Debugging Tips

- Use browser dev tools for frontend debugging
- Check backend logs: `cd backend && tail -f logs/combined.log`
- Use console.log statements for temporary debugging
- Implement proper error boundaries in React components
- Use Winston log levels appropriately (error, warn, info, debug)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [OEMER Documentation](https://github.com/BreezeWhite/oemer)
- [Clerk Documentation](https://clerk.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## 🤝 Community

- Join our Discord server for real-time discussions
- Attend our weekly development meetings
- Participate in code reviews
- Help other contributors with their questions

## 📞 Contact

For questions or help:
- Create an issue on GitHub
- Join our community discussions
- Contact the maintainers directly

---

**Happy coding!** 🎵✨

*Remember: Every contribution makes Ensemble better for everyone!*
