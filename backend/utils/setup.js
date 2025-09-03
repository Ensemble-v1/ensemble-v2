const fs = require('fs-extra');
const path = require('path');
const { logger } = require('./logger');

/**
 * Setup required directories for the application
 */
async function setupDirectories() {
  const directories = [
    path.join(__dirname, '../temp'),
    path.join(__dirname, '../downloads'),
    path.join(__dirname, '../logs'),
    path.join(__dirname, '../audiveris')
  ];

  for (const dir of directories) {
    try {
      await fs.ensureDir(dir);
      logger.info(`Directory ensured: ${dir}`);
    } catch (error) {
      logger.error(`Failed to create directory ${dir}:`, error);
      throw error;
    }
  }
}

/**
 * Clean up old temporary files
 */
async function cleanupTempFiles(maxAge = 24 * 60 * 60 * 1000) { // 24 hours
  const tempDir = path.join(__dirname, '../temp');
  const downloadsDir = path.join(__dirname, '../downloads');
  
  try {
    await cleanDirectory(tempDir, maxAge);
    await cleanDirectory(downloadsDir, maxAge);
    logger.info('Cleanup completed successfully');
  } catch (error) {
    logger.error('Cleanup failed:', error);
  }
}

/**
 * Clean files older than maxAge from directory
 */
async function cleanDirectory(directory, maxAge) {
  if (!await fs.pathExists(directory)) {
    return;
  }

  const files = await fs.readdir(directory);
  const now = Date.now();

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await fs.stat(filePath);
    
    if (now - stats.mtime.getTime() > maxAge) {
      await fs.remove(filePath);
      logger.info(`Cleaned up old file: ${filePath}`);
    }
  }
}

/**
 * Get system information for health checks
 */
function getSystemInfo() {
  const os = require('os');
  
  return {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      usage: process.memoryUsage()
    },
    cpu: {
      count: os.cpus().length,
      model: os.cpus()[0]?.model || 'Unknown'
    },
    uptime: {
      system: os.uptime(),
      process: process.uptime()
    }
  };
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Create a unique filename
 */
function createUniqueFilename(originalName, extension) {
  const { v4: uuidv4 } = require('uuid');
  const timestamp = Date.now();
  const baseName = path.parse(originalName).name.replace(/[^a-zA-Z0-9]/g, '_');
  
  return `${baseName}_${timestamp}_${uuidv4()}${extension}`;
}

// Schedule cleanup every hour
setInterval(() => {
  cleanupTempFiles().catch(error => {
    logger.error('Scheduled cleanup failed:', error);
  });
}, 60 * 60 * 1000);

module.exports = {
  setupDirectories,
  cleanupTempFiles,
  cleanDirectory,
  getSystemInfo,
  formatBytes,
  createUniqueFilename
};
