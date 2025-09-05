const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const archiver = require('archiver');

const { validateSheetImage } = require('../middleware/validation');
const { authenticateUser } = require('../middleware/auth');
const { OemerService } = require('../services/oemer-service');
const { MidiConverter } = require('../services/midi-converter');
const { logger } = require('../utils/logger');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, TIFF, and PDF files are allowed.'));
    }
  }
});

// Initialize services
const oemerService = new OemerService();
const midiConverter = new MidiConverter();

/**
 * POST /api/sheet-to-digital/convert
 * Convert sheet music images to digital formats
 */
router.post('/convert', 
  authenticateUser, 
  upload.array('images', 10), 
  validateSheetImage,
  async (req, res) => {
    const jobId = uuidv4();
    const tempDir = path.join(__dirname, '../temp', jobId);
    
    try {
      // Create temporary directory
      await fs.ensureDir(tempDir);
      
      logger.info(`Starting conversion job ${jobId} for user ${req.auth.userId}`);
      
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({
          error: 'No files uploaded',
          message: 'Please upload at least one sheet music image'
        });
      }
      
      // Process each uploaded file
      const results = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileId = uuidv4();
        const inputPath = path.join(tempDir, `input_${fileId}`);
        
        try {
          // Save uploaded file
          let processedBuffer = file.buffer;
          
          // Convert to PNG if not already
          if (file.mimetype !== 'image/png') {
            processedBuffer = await sharp(file.buffer)
              .png()
              .toBuffer();
          }
          
          await fs.writeFile(`${inputPath}.png`, processedBuffer);
          
          // Run Oemer OMR
          logger.info(`Processing file ${i + 1}/${files.length} with Oemer`);
          const omrResult = await oemerService.processImage(`${inputPath}.png`, tempDir);
          
          if (!omrResult.success) {
            throw new Error(`OMR processing failed: ${omrResult.error}`);
          }
          
          // Convert to MIDI if MusicXML was generated
          let midiPath = null;
          if (omrResult.musicXmlPath) {
            logger.info(`Converting MusicXML to MIDI for file ${i + 1}`);
            const midiResult = await midiConverter.convertXmlToMidi(
              omrResult.musicXmlPath, 
              path.join(tempDir, `output_${fileId}.mid`)
            );
            
            if (midiResult.success) {
              midiPath = midiResult.midiPath;
            }
          }
          
          results.push({
            originalName: file.originalname,
            fileId,
            musicXmlPath: omrResult.musicXmlPath,
            midiPath,
            confidence: omrResult.confidence || 0,
            detectedElements: omrResult.detectedElements || {}
          });
          
        } catch (fileError) {
          logger.error(`Error processing file ${file.originalname}:`, fileError);
          results.push({
            originalName: file.originalname,
            fileId,
            error: fileError.message,
            success: false
          });
        }
      }
      
      // Create download package
      const outputZipPath = path.join(__dirname, '../downloads', `${jobId}.zip`);
      await createDownloadPackage(results, tempDir, outputZipPath, jobId);
      
      // Clean up temp directory
      setTimeout(() => {
        fs.remove(tempDir).catch(err => logger.error('Error cleaning temp directory:', err));
      }, 5000);
      
      // Clean up download file after 1 hour
      setTimeout(() => {
        fs.remove(outputZipPath).catch(err => logger.error('Error cleaning download file:', err));
      }, 60 * 60 * 1000);
      
      const successfulResults = results.filter(r => !r.error);
      const failedResults = results.filter(r => r.error);
      
      res.json({
        jobId,
        success: true,
        processedFiles: files.length,
        successfulConversions: successfulResults.length,
        failedConversions: failedResults.length,
        downloadUrl: `/downloads/${jobId}.zip`,
        results: results.map(r => ({
          originalName: r.originalName,
          success: !r.error,
          confidence: r.confidence,
          detectedElements: r.detectedElements,
          error: r.error
        }))
      });
      
    } catch (error) {
      logger.error(`Conversion job ${jobId} failed:`, error);
      
      // Clean up on error
      fs.remove(tempDir).catch(err => logger.error('Error cleaning temp directory:', err));
      
      res.status(500).json({
        error: 'Conversion failed',
        message: 'An error occurred while processing your sheet music',
        jobId
      });
    }
  }
);

/**
 * GET /api/sheet-to-digital/status/:jobId
 * Get conversion job status
 */
router.get('/status/:jobId', authenticateUser, async (req, res) => {
  const { jobId } = req.params;
  
  try {
    const downloadPath = path.join(__dirname, '../downloads', `${jobId}.zip`);
    const exists = await fs.pathExists(downloadPath);
    
    if (exists) {
      const stats = await fs.stat(downloadPath);
      res.json({
        jobId,
        status: 'completed',
        downloadUrl: `/downloads/${jobId}.zip`,
        fileSize: stats.size,
        createdAt: stats.birthtime
      });
    } else {
      res.json({
        jobId,
        status: 'not_found',
        message: 'Job not found or files have expired'
      });
    }
  } catch (error) {
    logger.error(`Error checking job status ${jobId}:`, error);
    res.status(500).json({
      error: 'Status check failed',
      message: 'Could not check job status'
    });
  }
});

/**
 * GET /api/sheet-to-digital/formats
 * Get supported input and output formats
 */
router.get('/formats', (req, res) => {
  res.json({
    inputFormats: [
      { extension: 'jpg', description: 'JPEG Image', mimeType: 'image/jpeg' },
      { extension: 'jpeg', description: 'JPEG Image', mimeType: 'image/jpeg' },
      { extension: 'png', description: 'PNG Image', mimeType: 'image/png' },
      { extension: 'tiff', description: 'TIFF Image', mimeType: 'image/tiff' },
      { extension: 'pdf', description: 'PDF Document', mimeType: 'application/pdf' }
    ],
    outputFormats: [
      { extension: 'xml', description: 'MusicXML', mimeType: 'application/xml' },
      { extension: 'mid', description: 'MIDI File', mimeType: 'audio/midi' },
      { extension: 'png', description: 'Clean PNG Image', mimeType: 'image/png' }
    ]
  });
});

/**
 * Create download package with all converted files
 */
async function createDownloadPackage(results, tempDir, outputPath, jobId) {
  return new Promise(async (resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      logger.info(`Download package created: ${archive.pointer()} bytes for job ${jobId}`);
      resolve();
    });

    archive.on('error', reject);
    archive.pipe(output);

    // Add converted files to archive
    for (const [index, result] of results.entries()) {
      if (result.error) continue;

      const baseName = path.parse(result.originalName).name;

      // Add MusicXML file (extract from MXL if needed)
      if (result.musicXmlPath && fs.existsSync(result.musicXmlPath)) {
        if (result.musicXmlPath.endsWith('.mxl')) {
          // Extract XML content from MXL file
          try {
            const AdmZip = require('adm-zip');
            const zip = new AdmZip(result.musicXmlPath);
            const zipEntries = zip.getEntries();

            const xmlEntry = zipEntries.find(entry =>
              entry.entryName.endsWith('.xml') && !entry.isDirectory
            );

            if (xmlEntry) {
              const xmlContent = xmlEntry.getData().toString('utf8');
              archive.append(xmlContent, { name: `${baseName}.xml` });
              logger.info(`Added extracted XML content for ${baseName} (${xmlContent.length} chars)`);
            } else {
              logger.warn(`No XML found in MXL file for ${baseName}`);
            }
          } catch (error) {
            logger.error(`Failed to extract XML from MXL for ${baseName}:`, error);
            // Fallback: add the MXL file as-is
            archive.file(result.musicXmlPath, { name: `${baseName}.mxl` });
          }
        } else {
          // Plain XML file - read content and add with proper name
          try {
            const xmlContent = await fs.readFile(result.musicXmlPath, 'utf8');
            archive.append(xmlContent, { name: `${baseName}.xml` });
            logger.info(`Added XML content for ${baseName} (${xmlContent.length} chars)`);
          } catch (error) {
            logger.error(`Failed to read XML file ${result.musicXmlPath}:`, error);
            // Fallback to file copy
            archive.file(result.musicXmlPath, { name: `${baseName}.xml` });
          }
        }
      }

      // Add MIDI file
      if (result.midiPath && fs.existsSync(result.midiPath)) {
        archive.file(result.midiPath, { name: `${baseName}.mid` });
      }
    }

    // Add conversion report
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: results.length,
      successfulConversions: results.filter(r => !r.error).length,
      failedConversions: results.filter(r => r.error).length,
      results: results
    };

    archive.append(JSON.stringify(report, null, 2), { name: 'conversion_report.json' });
    archive.finalize();
  });
}

module.exports = router;
