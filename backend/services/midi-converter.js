const path = require('path');
const fs = require('fs-extra');
const { logger } = require('../utils/logger');

class MidiConverter {
  constructor() {
    logger.info('MidiConverter initialized with built-in conversion only');
  }

  /**
   * Convert MusicXML to MIDI using built-in converter
   */
  async convertXmlToMidi(xmlPath, outputPath) {
    try {
      let actualXmlPath = xmlPath;

      // Handle MXL files by extracting XML content first
      if (xmlPath.endsWith('.mxl')) {
        logger.info(`Extracting XML from MXL file: ${xmlPath}`);
        actualXmlPath = await this.extractXmlFromMxl(xmlPath);
      }

      // Use built-in converter for all environments
      logger.info(`Converting MusicXML to MIDI using built-in converter: ${actualXmlPath}`);
      return await this.convertWithBuiltIn(actualXmlPath, outputPath);

    } catch (error) {
      logger.error(`MIDI conversion failed for ${xmlPath}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
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
    // Only built-in converter is available
    return {
      builtIn: true
    };
  }
}

module.exports = { MidiConverter };
