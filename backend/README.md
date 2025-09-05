# Ensemble Backend - Sheet Music Conversion Service

A Node.js backend service for converting sheet music images to digital formats (MusicXML and MIDI) using optical music recognition.

## Features

- **Optical Music Recognition**: Convert sheet music images to MusicXML using OEMER
- **MIDI Conversion**: Generate MIDI files from MusicXML
- **Mock Processing**: Development mode with mock OMR processing
- **File Upload**: Support for JPG, PNG, TIFF, and PDF formats
- **Authentication**: Clerk-based user authentication
- **Serverless Ready**: Optimized for deployment on Render

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Authentication**: Clerk
- **Image Processing**: Sharp
- **File Processing**: Multer, Archiver
- **OMR Engine**: OEMER (with mock fallback)
- **MIDI Conversion**: Built-in XML to MIDI converter

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ensemble-v2/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:3001` (or PORT from .env)

### Production Deployment

#### Option 1: Render (Recommended)

1. **Connect to GitHub**
   - Push your code to GitHub
   - Connect your repository to Render

2. **Create Backend Service**
   - Service Type: Web Service
   - Runtime: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

3. **Environment Variables**
   Set these in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend.onrender.com
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Create Frontend Service**
   - Service Type: Web Service
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

5. **Frontend Environment Variables**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
   ```

## API Endpoints

### Health Check
```http
GET /health
```

### Convert Sheet Music
```http
POST /api/sheet-to-digital/convert
Authorization: Bearer <clerk-jwt-token>
Content-Type: multipart/form-data

Form Data:
- images: File (multiple allowed)
- outputFormat: 'xml' | 'midi'
```

### Get Conversion Status
```http
GET /api/sheet-to-digital/status/:jobId
```

### Get Supported Formats
```http
GET /api/sheet-to-digital/formats
```

## File Processing Pipeline

1. **Image Upload**: Files are uploaded via multipart/form-data
2. **Preprocessing**: Images are enhanced using Sharp for better OMR
3. **OMR Processing**: OEMER processes images to extract MusicXML
4. **MIDI Conversion**: MusicXML is converted to MIDI format
5. **Packaging**: Results are zipped and made available for download

## Development vs Production

### Development Mode
- Uses mock OMR processing (no external dependencies)
- Generates sample MusicXML and MIDI files
- Faster iteration and testing

### Production Mode
- Attempts real OMR processing with OEMER
- Falls back to mock processing if OEMER unavailable
- Optimized for serverless deployment

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend application URL | - |
| `CLERK_SECRET_KEY` | Clerk authentication secret | - |
| `CLERK_PUBLISHABLE_KEY` | Clerk authentication publishable key | - |
| `PYTHON_PATH` | Path to Python executable | `python3` |
| `OEMER_PATH` | Path to OEMER executable | `oemer` |
| `OEMER_MAX_MEMORY` | Maximum memory for OEMER | `4g` |

## Troubleshooting

### Common Issues

1. **OEMER not installed**
   - In development: Uses mock processing automatically
   - In production: Install OEMER via pip or use mock fallback

2. **Authentication errors**
   - Verify Clerk keys are correctly set
   - Check token expiration

3. **File upload issues**
   - Ensure file size is under 50MB
   - Check supported formats: JPG, PNG, TIFF, PDF

4. **MIDI conversion fails**
   - Built-in converter handles most cases
   - No external dependencies required

3. **OEMER installation issues**
   - Install OEMER: `pip install oemer`
   - Check Python environment and dependencies

### Logs

Check application logs for detailed error information:
```bash
# View recent logs
tail -f logs/combined.log

# View error logs
tail -f logs/error.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation
