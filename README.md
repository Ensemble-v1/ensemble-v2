# Ensemble - Sheet Music to Digital Converter

Transform traditional sheet music into digital formats with AI-powered optical music recognition. Convert handwritten or printed sheet music to MusicXML and MIDI files instantly.

## 🚀 Features

- **AI-Powered OMR**: Advanced optical music recognition using Audiveris
- **Multiple Formats**: Convert to MusicXML and MIDI formats
- **Web Interface**: Modern, responsive web application
- **Authentication**: Secure user authentication with Clerk
- **Serverless Deployment**: Optimized for Render deployment
- **Mock Processing**: Development mode with instant results

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Clerk** - Authentication and user management

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **Sharp** - Image processing
- **Audiveris** - Optical music recognition
- **Multer** - File upload handling

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Render account (for deployment)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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
│   ├── middleware/        # Express middleware
│   └── utils/             # Utility functions
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

## 🧪 Development vs Production

### Development Mode
- Mock OMR processing (no external dependencies)
- Hot reload for both frontend and backend
- Detailed error logging
- Development authentication bypass

### Production Mode
- Real OMR processing with Audiveris
- Optimized builds
- Error handling for production
- Secure authentication required

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

4. **OMR Processing Fails**
   - Development: Uses mock processing
   - Production: Check Audiveris JAR availability

### Logs

```bash
# Backend logs (when running locally)
cd backend && tail -f logs/combined.log

# Frontend logs
npm run dev  # Check terminal output
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Audiveris](https://github.com/Audiveris/audiveris) - Optical Music Recognition
- [Clerk](https://clerk.com) - Authentication
- [Render](https://render.com) - Hosting platform

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation

---

**Ready to digitize your sheet music collection?** 🎵✨
