const winston = require('winston');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
require('fs-extra').ensureDirSync(logsDir);

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define format for logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define which transports the logger must use
const transports = [
  // Console logging
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }),
  
  // File logging for errors
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),
  
  // File logging for all logs
  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),
];

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format,
  transports,
  exitOnError: false,
});

// Log unhandled exceptions and rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, error);
  process.exit(1);
});

module.exports = { logger };
