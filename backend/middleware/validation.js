const Joi = require('joi');
const { logger } = require('../utils/logger');

/**
 * Validate sheet music image upload
 */
const validateSheetImage = (req, res, next) => {
  const schema = Joi.object({
    outputFormat: Joi.string().valid('xml', 'midi', 'both').default('both'),
    quality: Joi.string().valid('low', 'medium', 'high').default('medium'),
    language: Joi.string().valid('en', 'fr', 'de', 'it', 'es').default('en')
  });

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation error',
      message: error.details[0].message
    });
  }

  // Validate files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      error: 'No files uploaded',
      message: 'Please upload at least one sheet music image'
    });
  }

  // Check file types and sizes
  for (const file of req.files) {
    if (!isValidImageType(file.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type',
        message: `File ${file.originalname} is not a supported image type`
      });
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      return res.status(400).json({
        error: 'File too large',
        message: `File ${file.originalname} exceeds the 50MB limit`
      });
    }
  }

  req.validatedData = value;
  next();
};

/**
 * Check if file type is valid for sheet music processing
 */
function isValidImageType(mimetype) {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/tiff',
    'image/tif',
    'application/pdf'
  ];
  
  return validTypes.includes(mimetype.toLowerCase());
}

/**
 * Validate conversion job ID
 */
const validateJobId = (req, res, next) => {
  const schema = Joi.object({
    jobId: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  
  if (error) {
    return res.status(400).json({
      error: 'Invalid job ID',
      message: 'Job ID must be a valid UUID'
    });
  }

  next();
};

/**
 * Validate pagination parameters
 */
const validatePagination = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    sortBy: Joi.string().valid('createdAt', 'name', 'status').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
  });

  const { error, value } = schema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      error: 'Invalid pagination parameters',
      message: error.details[0].message
    });
  }

  req.pagination = value;
  next();
};

/**
 * Sanitize file names to prevent path traversal
 */
const sanitizeFileName = (fileName) => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/^\.+/, '')
    .replace(/\.+$/, '')
    .substring(0, 255);
};

module.exports = {
  validateSheetImage,
  validateJobId,
  validatePagination,
  sanitizeFileName
};
