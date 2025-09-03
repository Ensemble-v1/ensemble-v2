iconst { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const { logger } = require('../utils/logger');

class MidiConverter {
  constructor() {
    this.fluidSynthPath = process.env.FLUIDSYNTH_PATH || 'fluidsynth';
    this.timidityPath = process.env.TIMIDITY_PATH || 'timidity';
    
    // Force detection every time
    const detectedPath = this.detectMuseScore();
    this.musescorePath = process.env.MUSESCORE_PATH || detectedPath;
    
    logger.info(`MidiConverter initialized with MuseScore path: ${this.musescorePath}`);
    logger.info(`Detected path was: ${detectedPath}`);
    logger.info(`Environment MUSESCORE_PATH: ${process.env.MUSESCORE_PATH}`);
  }

  /**
   * Detect MuseScore installation
   */
  detectMuseScore() {
    const possiblePaths = [
      'mscore',
      'musescore',
      '/usr/bin/mscore',
      '/usr/bin/musescore',
      '/usr/local/bin/musescore',
      '/opt/musescore/bin/musescore'
    ];

    logger.info('Starting MuseScore detection...');

    for (const msPath of possiblePaths) {
      try {
        logger.info(`Checking path: ${msPath}`);
        require('child_process').execSync(`which ${msPath}`, { stdio: 'ignore' });
        logger.info(`Found MuseScore at: ${msPath}`);
        return msPath;
      } catch (error) {
        logger.info(`Not found: ${msPath}`);
        // Continue to next path
      }
    }

    logger.warn('No MuseScore installation found');
    return null;
  }

  /**
   * Convert MusicXML to MIDI using multiple methods
   */
  async convertXmlToMidi(xmlPath, outputPath) {
    try {
      let actualXmlPath = xmlPath;

      // Handle MXL files by extracting XML content first
      if (xmlPath.endsWith('.mxl')) {
        logger.info(`Extracting XML from MXL file: ${xmlPath}`);
        actualXmlPath = await this.extractXmlFromMxl(xmlPath);
      }

      // For development/testing, use built-in converter directly
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        logger.info(`Using built-in MIDI converter for development: ${actualXmlPath}`);
        return await this.convertWithBuiltIn(actualXmlPath, outputPath);
      }

      // Try built-in converter first (more reliable in headless environment)
      logger.info(`Attempting MIDI conversion with built-in converter for ${actualXmlPath}`);
      const builtInResult = await this.convertWithBuiltIn(actualXmlPath, outputPath);
      if (builtInResult.success) {
        return builtInResult;
      }

      // Fallback to MuseScore if built-in fails
      if (this.musescorePath) {
        logger.info(`Falling back to MuseScore for ${actualXmlPath}`);
        const musescoreResult = await this.convertWithMuseScore(actualXmlPath, outputPath);
        if (musescoreResult.success) {
          return musescoreResult;
        }
      }

      // If both fail, return the built-in result which may have more details
      return builtInResult;

    } catch (error) {
      logger.error(`MIDI conversion failed for ${xmlPath}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Convert using MuseScore (preferred method)
   */
  async convertWithMuseScore(xmlPath, outputPath) {
    return new Promise((resolve, reject) => {
      if (!this.musescorePath) {
        reject(new Error('MuseScore path not found'));
        return;
      }

      // Use xvfb-run to provide virtual display for MuseScore
      const command = 'xvfb-run';
      const allArgs = [
        '-a',  // Automatically select display number
        '--server-args=-screen 0 1024x768x24',  // Virtual screen config
        this.musescorePath,
        '-f', 'midi',  // Explicitly specify MIDI format
        '-o', outputPath,
        xmlPath
      ];

      logger.info(`Converting with MuseScore via xvfb-run: ${command} ${allArgs.join(' ')}`);

      const childProcess = spawn(command, allArgs, {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stderr = '';

      childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      childProcess.on('close', (code) => {
        if (code === 0 && fs.existsSync(outputPath)) {
          resolve({
            success: true,
            midiPath: outputPath,
            method: 'MuseScore'
          });
        } else {
          reject(new Error(`MuseScore conversion failed with code ${code}: ${stderr}`));
        }
      });

      childProcess.on('error', (error) => {
        logger.error(`MuseScore spawn error:`, error);
        reject(new Error(`Failed to start MuseScore: ${error.message}`));
      });

      // 60 second timeout
      setTimeout(() => {
        childProcess.kill('SIGTERM');
        reject(new Error('MuseScore conversion timed out'));
      }, 60000);
    });
  }

  /**
   * Convert using built-in JavaScript XML to MIDI converter
   */
  async convertWithBuiltIn(xmlPath, outputPath) {
    try {
      const xml2js = require('xml2js');
      const xmlContent = await fs.readFile(xmlPath, 'utf8');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(xmlContent);

      // Create MIDI file using simple conversion
      const midiData = this.createMidiFromXML(result);
      await fs.writeFile(outputPath, Buffer.from(midiData));

      return {
        success: true,
        midiPath: outputPath,
        method: 'Built-in'
      };

    } catch (error) {
      throw new Error(`Built-in conversion failed: ${error.message}`);
    }
  }

  /**
   * Extract XML content from MXL (compressed MusicXML) file
   */
  async extractXmlFromMxl(mxlPath) {
    const AdmZip = require('adm-zip');
    const path = require('path');
    
    try {
      logger.info(`Processing compressed MXL file: ${mxlPath}`);
      
      // Read and extract the MXL file
      const zip = new AdmZip(mxlPath);
      const zipEntries = zip.getEntries();
      
      // Find the main MusicXML file in the archive
      const xmlEntry = zipEntries.find(entry => 
        entry.entryName.endsWith('.xml') && !entry.isDirectory
      );
      
      if (!xmlEntry) {
        throw new Error('No XML file found in MXL archive');
      }
      
      // Extract XML content
      const xmlContent = xmlEntry.getData().toString('utf8');
      logger.info(`Extracted MusicXML from: ${xmlEntry.entryName} (${xmlContent.length} characters)`);
      
      // Save extracted XML to temporary file
      const tempXmlPath = mxlPath.replace('.mxl', '_temp_extracted.xml');
      await fs.writeFile(tempXmlPath, xmlContent, 'utf8');
      
      return tempXmlPath;
      
    } catch (error) {
      logger.error(`Failed to extract XML from MXL file: ${error.message}`);
      throw new Error(`MXL extraction failed: ${error.message}`);
    }
  }

  /**
   * Create basic MIDI data from MusicXML structure
   */
  createMidiFromXML(xmlData) {
    // Basic MIDI file structure
    const midiHeader = [
      0x4D, 0x54, 0x68, 0x64, // "MThd"
      0x00, 0x00, 0x00, 0x06, // Header length
      0x00, 0x00, // Format type 0
      0x00, 0x01, // Number of tracks
      0x00, 0x60  // Time division (96 ticks per quarter note)
    ];

    const trackHeader = [
      0x4D, 0x54, 0x72, 0x6B, // "MTrk"
      0x00, 0x00, 0x00, 0x00  // Track length (to be filled)
    ];

    // Extract notes from MusicXML and create MIDI events
    const midiEvents = this.extractMidiEvents(xmlData);
    
    // Add track end event
    midiEvents.push([0x00, 0xFF, 0x2F, 0x00]);

    // Calculate track length
    const trackData = [].concat(...midiEvents);
    const trackLength = trackData.length;
    
    // Update track length in header
    trackHeader[4] = (trackLength >> 24) & 0xFF;
    trackHeader[5] = (trackLength >> 16) & 0xFF;
    trackHeader[6] = (trackLength >> 8) & 0xFF;
    trackHeader[7] = trackLength & 0xFF;

    return [...midiHeader, ...trackHeader, ...trackData];
  }

  /**
   * Extract MIDI events from MusicXML structure
   */
  extractMidiEvents(xmlData) {
    const events = [];
    let currentTime = 0;

    try {
      if (!xmlData['score-partwise'] || !xmlData['score-partwise'].part) {
        return events;
      }

      const parts = Array.isArray(xmlData['score-partwise'].part) 
        ? xmlData['score-partwise'].part 
        : [xmlData['score-partwise'].part];

      parts.forEach((part, partIndex) => {
        if (!part.measure) return;

        const measures = Array.isArray(part.measure) ? part.measure : [part.measure];
        
        measures.forEach(measure => {
          if (!measure.note) return;

          const notes = Array.isArray(measure.note) ? measure.note : [measure.note];
          
          notes.forEach(note => {
            if (note.rest) return; // Skip rests

            const pitch = this.extractPitch(note);
            const duration = this.extractDuration(note);
            
            if (pitch !== null) {
              // Note on event
              events.push([
                this.encodeVariableLength(currentTime),
                0x90, // Note on, channel 0
                pitch,
                0x64  // Velocity
              ].flat());

              // Note off event
              events.push([
                this.encodeVariableLength(duration),
                0x80, // Note off, channel 0
                pitch,
                0x00  // Velocity
              ].flat());

              currentTime = 0; // Reset delta time for next event
            }
          });
        });
      });

    } catch (error) {
      logger.error('Error extracting MIDI events:', error);
    }

    return events;
  }

  /**
   * Extract MIDI pitch from MusicXML note
   */
  extractPitch(note) {
    try {
      if (!note.pitch || !note.pitch[0]) return null;

      const pitch = note.pitch[0];
      const step = pitch.step ? pitch.step[0] : 'C';
      const octave = pitch.octave ? parseInt(pitch.octave[0]) : 4;
      const alter = pitch.alter ? parseInt(pitch.alter[0]) : 0;

      // Convert to MIDI note number
      const noteMap = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };
      const baseNote = noteMap[step.toUpperCase()] || 0;
      const midiNote = (octave + 1) * 12 + baseNote + alter;

      return Math.max(0, Math.min(127, midiNote));

    } catch (error) {
      return null;
    }
  }

  /**
   * Extract duration from MusicXML note
   */
  extractDuration(note) {
    try {
      if (!note.duration || !note.duration[0]) return 96; // Default quarter note

      const duration = parseInt(note.duration[0]);
      return Math.max(1, duration); // Ensure minimum duration

    } catch (error) {
      return 96; // Default quarter note
    }
  }

  /**
   * Encode number as variable length quantity for MIDI
   */
  encodeVariableLength(value) {
    const bytes = [];
    
    if (value === 0) {
      return [0x00];
    }

    while (value > 0) {
      bytes.unshift(value & 0x7F);
      value >>= 7;
    }

    // Set continuation bit for all bytes except the last
    for (let i = 0; i < bytes.length - 1; i++) {
      bytes[i] |= 0x80;
    }

    return bytes;
  }

  /**
   * Check if conversion tools are available
   */
  async checkAvailability() {
    const tools = {
      musescore: false,
      fluidsynth: false,
      timidity: false
    };

    // Check MuseScore
    if (this.musescorePath) {
      try {
        await this.executeCommand(`${this.musescorePath} --version`);
        tools.musescore = true;
      } catch (error) {
        // MuseScore not available
      }
    }

    // Check FluidSynth
    try {
      await this.executeCommand(`${this.fluidSynthPath} --version`);
      tools.fluidsynth = true;
    } catch (error) {
      // FluidSynth not available
    }

    // Check TiMidity
    try {
      await this.executeCommand(`${this.timidityPath} --version`);
      tools.timidity = true;
    } catch (error) {
      // TiMidity not available
    }

    return tools;
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
}

module.exports = { MidiConverter };
