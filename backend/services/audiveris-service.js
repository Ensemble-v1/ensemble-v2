const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const { logger } = require('../utils/logger');

class AudiverisService {
  constructor() {
    this.audiverisPath = process.env.AUDIVERIS_PATH || this.detectAudiverisPath();
    this.maxMemory = process.env.AUDIVERIS_MAX_MEMORY || '4g';
  }

  /**
   * Detect Audiveris installation path
   */
  detectAudiverisPath() {
    const possiblePaths = [
      '/opt/audiveris/bin/Audiveris',
      '/usr/local/bin/audiveris',
      'audiveris',
      '/usr/bin/audiveris',
      path.join(__dirname, '../audiveris/audiveris.jar'),
      path.join(process.cwd(), 'audiveris/audiveris.jar')
    ];

    for (const audiverisPath of possiblePaths) {
      try {
        // For executables, try to run them
        if (!audiverisPath.endsWith('.jar')) {
          require('child_process').execSync(`which ${audiverisPath}`, { stdio: 'ignore' });
          return audiverisPath;
        }
        // For jar files, check if they exist
        if (fs.existsSync(audiverisPath)) {
          return audiverisPath;
        }
      } catch (error) {
        // Continue to next path
      }
    }

    throw new Error('Audiveris not found. Please install Audiveris or set AUDIVERIS_PATH environment variable.');
  }

  /**
   * Check if Audiveris is properly installed and configured
   */
  async checkInstallation() {
    // Skip installation check for development/testing
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      logger.info('Skipping Audiveris installation check for development');
      return true;
    }

    try {
      if (!this.audiverisPath) {
        throw new Error('Audiveris path not detected');
      }

      // Test Audiveris installation
      const command = this.audiverisPath.endsWith('.jar')
        ? `java -jar ${this.audiverisPath} -help`
        : `${this.audiverisPath} -help`;

      await this.executeCommand(command);

      logger.info('Audiveris installation verified');
      return true;
    } catch (error) {
      logger.error('Audiveris installation check failed:', error);
      throw new Error(`Audiveris installation error: ${error.message}`);
    }
  }

  /**
   * Preprocess image to improve OMR recognition
   */
  async preprocessImage(imagePath, outputPath) {
    try {
      const sharp = require('sharp');
      
      const metadata = await sharp(imagePath).metadata();
      logger.info(`Original image: ${metadata.width}x${metadata.height}, ${metadata.density || 'unknown'} DPI`);
      
      // Enhance image for better OMR recognition
      await sharp(imagePath)
        .resize(Math.max(metadata.width * 2, 2000), null, { 
          withoutEnlargement: false,
          kernel: sharp.kernel.lanczos3 
        })
        .greyscale()
        .normalize()
        .sharpen({ sigma: 1, m1: 0.5, m2: 2 })
        .png({ quality: 100 })
        .toFile(outputPath);
        
      logger.info(`Preprocessed image saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      logger.warn(`Image preprocessing failed, using original: ${error.message}`);
      return imagePath;
    }
  }

  /**
   * Process a sheet music image with Audiveris OMR
   */
  async processImage(imagePath, outputDir) {
    try {
      // For development/testing, use mock processing if Audiveris is not available
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        logger.info('Using mock Audiveris processing for development');
        return await this.createMockMusicXML(imagePath, outputDir);
      }

      await this.checkInstallation();

      const outputBaseName = path.parse(imagePath).name;
      const outputPath = path.join(outputDir, `${outputBaseName}.xml`);
      
      logger.info(`Processing image: ${imagePath}`);
      
      // Preprocess image to improve recognition
      const preprocessedPath = path.join(outputDir, `preprocessed_${outputBaseName}.png`);
      const finalImagePath = await this.preprocessImage(imagePath, preprocessedPath);
      
      // Prepare Audiveris command
      let command, args;
      
      if (this.audiverisPath.endsWith('.jar')) {
        // Using JAR file
        command = 'java';
        args = [
          `-Xmx${this.maxMemory}`,
          '-jar', this.audiverisPath,
          '-batch',
          '-transcribe',
          '-export',
          '-output', outputDir,
          finalImagePath
        ];
      } else {
        // Using executable
        command = this.audiverisPath;
        args = [
          '-batch',
          '-transcribe', 
          '-export',
          '-output', outputDir,
          finalImagePath
        ];
      }

      logger.info(`Executing Audiveris: ${command} ${args.join(' ')}`);
      
      const result = await this.executeCommand(`${command} ${args.join(' ')}`, {
        timeout: 300000, // 5 minute timeout
        cwd: outputDir
      });

      // Check what files were actually created
      const createdFiles = await fs.readdir(outputDir);
      logger.info(`Files created in output directory: ${JSON.stringify(createdFiles)}`);
      
      // Look for MusicXML files with different possible extensions and names
      const possibleExtensions = ['.xml', '.mxl', '.musicxml'];
      const inputBaseName = path.parse(imagePath).name;
      let foundOutputPath = null;
      
      // Try exact match first
      if (fs.existsSync(outputPath)) {
        foundOutputPath = outputPath;
      } else {
        // Look for any XML files in the output directory
        for (const file of createdFiles) {
          const filePath = path.join(outputDir, file);
          const ext = path.extname(file).toLowerCase();
          if (possibleExtensions.includes(ext)) {
            foundOutputPath = filePath;
            logger.info(`Found MusicXML file: ${foundOutputPath}`);
            break;
          }
        }
      }
      
      if (!foundOutputPath) {
        // Check if an OMR file was created - this indicates processing happened but no music was found
        const omrFiles = createdFiles.filter(file => file.endsWith('.omr'));
        if (omrFiles.length > 0) {
          // Check the log file for specific error conditions
          const logFiles = createdFiles.filter(file => file.endsWith('.log'));
          let errorDetails = 'Please ensure the image contains clear, readable sheet music notation.';
          
          if (logFiles.length > 0) {
            try {
              const logPath = path.join(outputDir, logFiles[0]);
              const logContent = await fs.readFile(logPath, 'utf8');
              
              if (logContent.includes('too low interline value') || logContent.includes('resolution is too low')) {
                errorDetails = 'Image resolution is too low for reliable music recognition. Try using a higher resolution image (300 DPI recommended) or a clearer scan of the sheet music.';
              } else if (logContent.includes('flagged as invalid')) {
                errorDetails = 'The image was processed but flagged as invalid by Audiveris. This could be due to poor image quality, non-standard notation, or the image not containing recognizable sheet music.';
              } else if (logContent.includes('Created scores: []')) {
                errorDetails = 'No musical scores were detected in the image. Please ensure the image contains standard musical notation with staff lines, notes, and other musical symbols.';
              }
            } catch (logError) {
              logger.warn(`Could not read log file for additional error details: ${logError.message}`);
            }
          }
          
          throw new Error(`Audiveris processed the image but found no musical content to export. ${errorDetails}`);
        } else {
          throw new Error(`Audiveris did not generate output file. Created files: ${JSON.stringify(createdFiles)}`);
        }
      }

      // Analyze the generated MusicXML
      let analysis;
      try {
        analysis = await this.analyzeMusicXML(foundOutputPath);
      } catch (analysisError) {
        logger.warn(`Failed to analyze MusicXML, using defaults: ${analysisError.message}`);
        analysis = {
          confidence: 0.7, // Default confidence when analysis fails
          elements: {
            measures: 0,
            notes: 0,
            rests: 0,
            clefs: 0,
            timeSignatures: 0,
            keySignatures: 0
          }
        };
      }
      
      return {
        success: true,
        musicXmlPath: foundOutputPath,
        confidence: analysis.confidence,
        detectedElements: analysis.elements,
        processingTime: result.processingTime
      };

    } catch (error) {
      logger.error(`Audiveris processing failed for ${imagePath}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Execute Java command with proper error handling
   */
  async executeJavaCommand(args, options = {}) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const javaProcess = spawn(this.javaPath, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        ...options
      });

      let stdout = '';
      let stderr = '';

      javaProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      javaProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      javaProcess.on('close', (code) => {
        const processingTime = Date.now() - startTime;
        
        if (code === 0) {
          resolve({
            success: true,
            stdout,
            stderr,
            processingTime
          });
        } else {
          reject(new Error(`Audiveris process exited with code ${code}. Error: ${stderr}`));
        }
      });

      javaProcess.on('error', (error) => {
        reject(new Error(`Failed to start Audiveris process: ${error.message}`));
      });

      // Handle timeout
      if (options.timeout) {
        setTimeout(() => {
          javaProcess.kill('SIGTERM');
          reject(new Error('Audiveris process timed out'));
        }, options.timeout);
      }
    });
  }

  /**
   * Execute shell command
   */
  async executeCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  /**
   * Analyze generated MusicXML for quality metrics
   */
  async analyzeMusicXML(xmlPath) {
    try {
      let xmlContent;
      
      // Handle both .xml and .mxl (compressed) files
      if (xmlPath.endsWith('.mxl')) {
        logger.info(`Processing compressed MXL file: ${xmlPath}`);
        
        // Extract compressed MusicXML using the AdmZip library
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(xmlPath);
        const zipEntries = zip.getEntries();
        
        logger.info(`Found ${zipEntries.length} entries in MXL file`);
        zipEntries.forEach(entry => {
          logger.info(`MXL entry: ${entry.entryName} (${entry.header.size} bytes)`);
        });
        
        // Find the main MusicXML file in the archive
        const xmlEntry = zipEntries.find(entry => 
          entry.entryName.endsWith('.xml') && !entry.isDirectory
        );
        
        if (!xmlEntry) {
          throw new Error(`No XML file found in MXL archive. Available entries: ${zipEntries.map(e => e.entryName).join(', ')}`);
        }
        
        const rawData = xmlEntry.getData();
        xmlContent = rawData.toString('utf8');
        
        logger.info(`Extracted MusicXML from: ${xmlEntry.entryName} (${xmlContent.length} characters)`);
        
        // Check if the content looks like valid XML
        if (!xmlContent.trim().startsWith('<?xml') && !xmlContent.trim().startsWith('<')) {
          logger.warn(`XML content doesn't start with XML declaration or tag. First 100 chars: ${xmlContent.substring(0, 100)}`);
          throw new Error('Extracted content does not appear to be valid XML');
        }
        
        // Save the extracted XML for debugging
        const debugXmlPath = xmlPath.replace('.mxl', '_extracted.xml');
        await fs.writeFile(debugXmlPath, xmlContent, 'utf8');
        logger.info(`Saved extracted XML to: ${debugXmlPath}`);
        
      } else {
        // Read plain XML file
        xmlContent = await fs.readFile(xmlPath, 'utf8');
        logger.info(`Reading plain XML file: ${xmlPath} (${xmlContent.length} characters)`);
      }
      
      // Validate XML content before parsing
      if (!xmlContent || xmlContent.trim().length === 0) {
        throw new Error('XML content is empty');
      }
      
      const xml2js = require('xml2js');
      const parser = new xml2js.Parser();
      
      const result = await parser.parseStringPromise(xmlContent);
      
      // Extract analysis metrics
      const analysis = {
        confidence: 0.8, // Default confidence
        elements: {
          measures: 0,
          notes: 0,
          rests: 0,
          clefs: 0,
          timeSignatures: 0,
          keySignatures: 0
        }
      };

      // Count musical elements
      if (result['score-partwise'] && result['score-partwise'].part) {
        const parts = Array.isArray(result['score-partwise'].part) 
          ? result['score-partwise'].part 
          : [result['score-partwise'].part];

        parts.forEach(part => {
          if (part.measure) {
            const measures = Array.isArray(part.measure) ? part.measure : [part.measure];
            analysis.elements.measures += measures.length;

            measures.forEach(measure => {
              if (measure.note) {
                const notes = Array.isArray(measure.note) ? measure.note : [measure.note];
                notes.forEach(note => {
                  if (note.rest) {
                    analysis.elements.rests++;
                  } else {
                    analysis.elements.notes++;
                  }
                });
              }

              if (measure.attributes) {
                const attributes = Array.isArray(measure.attributes) 
                  ? measure.attributes 
                  : [measure.attributes];
                
                attributes.forEach(attr => {
                  if (attr.clef) analysis.elements.clefs++;
                  if (attr.time) analysis.elements.timeSignatures++;
                  if (attr.key) analysis.elements.keySignatures++;
                });
              }
            });
          }
        });
      }

      // Calculate confidence based on detected elements
      let confidenceScore = 0.5; // Base score
      if (analysis.elements.notes > 0) confidenceScore += 0.2;
      if (analysis.elements.measures > 0) confidenceScore += 0.1;
      if (analysis.elements.clefs > 0) confidenceScore += 0.1;
      if (analysis.elements.timeSignatures > 0) confidenceScore += 0.05;
      if (analysis.elements.keySignatures > 0) confidenceScore += 0.05;

      analysis.confidence = Math.min(confidenceScore, 1.0);

      return analysis;

    } catch (error) {
      logger.error('Error analyzing MusicXML:', error);
      return {
        confidence: 0.5,
        elements: {}
      };
    }
  }

  /**
   * Get Audiveris version information
   */
  async getVersion() {
    try {
      const command = this.audiverisPath.endsWith('.jar') 
        ? `java -jar ${this.audiverisPath} -version`
        : `${this.audiverisPath} -help`; // Audiveris executable shows version in help
        
      const result = await this.executeCommand(command);
      return result.stdout.trim();
    } catch (error) {
      return 'Unknown version';
    }
  }

  /**
   * Create mock MusicXML for development/testing
   */
  async createMockMusicXML(imagePath, outputDir) {
    const outputBaseName = path.parse(imagePath).name;
    const outputPath = path.join(outputDir, `${outputBaseName}.xml`);
    
    // Create a simple MusicXML file for testing
    const mockMusicXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work>
    <work-title>Mock Sheet Music</work-title>
  </work>
  <identification>
    <creator type="composer">Ensemble Mock Converter</creator>
    <encoding>
      <software>Mock Audiveris Service</software>
      <encoding-date>${new Date().toISOString().split('T')[0]}</encoding-date>
    </encoding>
  </identification>
  <part-list>
    <score-part id="P1">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>4</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>F</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>quarter</type>
      </note>
    </measure>
  </part>
</score-partwise>`;

    await fs.writeFile(outputPath, mockMusicXML, 'utf8');
    
    // Analyze the mock MusicXML
    const analysis = await this.analyzeMusicXML(outputPath);
    
    logger.info(`Created mock MusicXML file: ${outputPath}`);
    
    return {
      success: true,
      musicXmlPath: outputPath,
      confidence: 0.95, // High confidence for mock data
      detectedElements: analysis.elements,
      processingTime: 1000 // Mock processing time
    };
  }
}

module.exports = { AudiverisService };
