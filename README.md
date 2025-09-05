# Ensemble - AI-Powered Sheet Music Conversion

Transform traditional sheet music into digital formats with advanced AI-powered optical music recognition. Convert handwritten or printed sheet music to MusicXML and MIDI files instantly using our cutting-edge OEMER technology.

## 🚀 Features

- **AI-Powered OMR**: Advanced optical music recognition using OEMER (End-to-End OMR)
- **Multiple Formats**: Convert to MusicXML and MIDI formats
- **Web Interface**: Modern, responsive Next.js web application
- **Authentication**: Secure user authentication with Clerk
- **Production Ready**: Optimized for Render deployment
- **Enhanced Processing**: Improved image preprocessing and error handling
- **Real-time Logging**: Comprehensive logging throughout the conversion process

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Clerk** - Authentication and user management
- **Radix UI** - Accessible component library

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **Sharp** - High-performance image processing
- **OEMER** - State-of-the-art optical music recognition
- **Multer** - File upload handling
- **Winston** - Structured logging
- **xml2js** - XML parsing and generation

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Render account (for deployment)
- Python 3.8+ (for OEMER)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ensemble-v1/ensemble-v2.git
   cd ensemble-v2
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp .env.local.example .env.local
   cp backend/.env.example backend/.env

   # Edit with your configuration
   # Get Clerk keys from https://clerk.com
   ```

4. **Start development servers**
   ```bash
   # Start frontend (in one terminal)
   npm run dev

   # Start backend (in another terminal)
   cd backend && npm start
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

### OEMER Installation

The application requires OEMER to be installed for sheet music processing:

```bash
# Install OEMER globally (recommended)
pip install oemer

# Or install in a virtual environment
python -m venv oemer-env
source oemer-env/bin/activate  # On Windows: oemer-env\Scripts\activate
pip install oemer
```

## 🚀 Production Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint" or create services manually

3. **Create Backend Service**
   - **Service Type**: Web Service
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     PORT=10000
     FRONTEND_URL=https://your-frontend.onrender.com
     CLERK_SECRET_KEY=your_clerk_secret_key
     CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     PYTHON_PATH=python3  # Path to Python installation
     ```

4. **Create Frontend Service**
   - **Service Type**: Web Service
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
     ```

5. **Update URLs**
   - Update `FRONTEND_URL` in backend service
   - Update `NEXT_PUBLIC_BACKEND_URL` in frontend service
   - Update CORS origins in backend if needed

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
PYTHON_PATH=python3
```

## 📁 Project Structure

```
ensemble-v2/
├── app/                    # Next.js frontend
│   ├── components/         # Reusable components
│   ├── services/           # Service pages
│   └── ...
├── backend/                # Express.js backend
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   │   ├── oemer-service.js # OEMER integration
│   │   └── midi-converter.js # MIDI conversion
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utility functions
│   ├── logs/              # Log files
│   └── temp/              # Temporary files
├── components/            # Shared components
├── lib/                   # Shared utilities
├── public/                # Static assets
└── render.yaml           # Render deployment config
```

## 🔄 API Endpoints

### Backend API

- `GET /health` - Health check
- `POST /api/sheet-to-digital/convert` - Convert sheet music
- `GET /api/sheet-to-digital/status/:jobId` - Check conversion status
- `GET /api/sheet-to-digital/formats` - Get supported formats

### OEMER Service Features

- **Direct Command Execution**: Uses OEMER CLI instead of complex Python scripts
- **Enhanced Image Processing**: Sharp-based preprocessing for better OCR results
- **Comprehensive Logging**: Detailed logging at every processing step
- **Error Handling**: Robust error handling with timeout management
- **Model Verification**: Automatic model file verification and download

## 🧪 Development vs Production

### Development Mode
- Mock OMR processing (no external dependencies)
- Hot reload for both frontend and backend
- Detailed error logging
- Development authentication bypass
- Enhanced debugging output

### Production Mode
- Real OMR processing with OEMER
- Optimized builds
- Error handling for production
- Secure authentication required
- Performance monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure Node.js version is 18+
   - Check environment variables are set
   - Verify dependencies are installed

2. **Authentication Issues**
   - Verify Clerk keys are correct
   - Check token expiration
   - Ensure frontend/backend URLs match

3. **File Upload Problems**
   - Check file size limits (50MB)
   - Verify supported formats
   - Ensure proper CORS configuration

4. **OEMER Processing Issues**
   - Verify OEMER is installed: `oemer --help`
   - Check Python path in environment variables
   - Ensure model files are available
   - Check for CUDA compatibility warnings (CPU fallback works)

5. **OEMER Installation**
   ```bash
   # Check if OEMER is installed
   oemer --help
   
   # If not installed
   pip install oemer
   
   # Verify installation
   python -c "import oemer; print('OEMER installed successfully')"
   ```

### Logs

```bash
# Backend logs (when running locally)
cd backend && tail -f logs/combined.log

# Frontend logs
npm run dev  # Check terminal output

# OEMER-specific logs
cd backend && tail -f logs/error.log
```

### OEMER Model Issues

If OEMER models are missing:
```bash
# OEMER will automatically download models on first use
# If issues persist, try:
python -c "import oemer; print('Models path:', oemer.MODULE_PATH)"
```

## 🏗️ Architecture Overview

### Frontend Architecture
- **Next.js App Router**: Modern routing system
- **Component-Based UI**: Reusable UI components with Radix UI
- **State Management**: React hooks for local state
- **Authentication**: Clerk integration for user management

### Backend Architecture
- **Express.js REST API**: Clean API design
- **OEMER Service**: Direct command-line integration
- **File Processing**: Sharp-based image preprocessing
- **Logging**: Winston structured logging
- **Error Handling**: Comprehensive error management

### Data Flow
1. User uploads sheet music image
2. Image is preprocessed using Sharp
3. OEMER processes the image to generate MusicXML
4. MIDI conversion is performed if requested
5. Results are packaged and returned to user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Ensure all linting passes (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure error handling is comprehensive
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OEMER](https://github.com/BreezeWhite/oemer) - State-of-the-art Optical Music Recognition
- [Clerk](https://clerk.com) - Authentication and user management
- [Render](https://render.com) - Hosting platform
- [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation
- Consult the OEMER documentation

### Getting Help

1. **Check the logs** for detailed error information
2. **Verify environment variables** are correctly set
3. **Test OEMER installation** separately
4. **Review the API documentation** for proper usage

---

**Ready to digitize your sheet music collection?** 🎵✨

**Built with ❤️ by the Ensemble Team**
