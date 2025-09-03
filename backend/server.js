const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

const sheetToDigitalRoutes = require('./routes/sheet-to-digital');
const { logger } = require('./utils/logger');
const { setupDirectories } = require('./utils/setup');

const app = express();
const PORT = process.env.PORT || 3001;

// For Render deployment, ensure we bind to 0.0.0.0
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'http://localhost:3006',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files for downloads
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/sheet-to-digital', sheetToDigitalRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'File too large',
      message: 'Please upload a file smaller than 50MB'
    });
  }
  
  if (err.code === 'ENOENT') {
    return res.status(404).json({
      error: 'File not found',
      message: 'The requested file could not be found'
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong. Please try again later.' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Setup directories and start server
async function startServer() {
  try {
    await setupDirectories();
    
    app.listen(PORT, HOST, () => {
      logger.info(`Server running on ${HOST}:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info('Sheet-to-Digital service ready');
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();

module.exports = app;
