# Ensemble API Documentation

This document provides comprehensive information about the Ensemble API endpoints, authentication, and data formats.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Data Formats](#data-formats)
- [Rate Limiting](#rate-limiting)
- [Webhooks](#webhooks)
- [Examples](#examples)

## 🚀 Overview

The Ensemble API provides endpoints for converting sheet music images to digital formats (MusicXML and MIDI). The API is built with Express.js and includes authentication, file processing, and result management.

### Key Features

- **Sheet Music Conversion**: Convert images to MusicXML and MIDI
- **Authentication**: Secure user authentication with Clerk
- **File Management**: Upload, process, and download converted files
- **Status Tracking**: Monitor conversion progress
- **Error Handling**: Comprehensive error responses

## 🔐 Authentication

All API endpoints (except health check) require authentication using Clerk tokens.

### Authentication Flow

1. User authenticates with Clerk frontend
2. Clerk provides JWT token
3. Token is included in API requests
4. Backend validates token with Clerk

### Token Usage

```javascript
// Include token in Authorization header
const headers = {
  'Authorization': `Bearer ${userToken}`,
  'Content-Type': 'application/json'
};
```

### Clerk Integration

The backend uses `@clerk/clerk-sdk-node` for authentication:

```javascript
const { authenticateUser } = require('../middleware/auth');

// Protected route
router.post('/convert', authenticateUser, sheetToDigitalController.convert);
```

## 🌐 Base URL

### Development
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3001`

### Production
- **Frontend**: `https://your-frontend-domain.com`
- **Backend**: `https://your-backend-domain.com`

## 📡 API Endpoints

### Health Check

#### GET /health

Check if the backend service is running and healthy.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "oemer": {
    "installed": true,
    "ready": true,
    "models_available": true
  }
}
```

**Status Codes:**
- `200` - Service is healthy
- `503` - Service is unhealthy

### Sheet Music Conversion

#### POST /api/sheet-to-digital/convert

Convert a sheet music image to digital formats.

**Request:**
```json
{
  "file": "base64-encoded-image-data",
  "filename": "sheet_music.png",
  "options": {
    "convert_to_midi": true,
    "enhance_image": true,
    "timeout": 1800000
  }
}
```

**Parameters:**
- `file` (required): Base64 encoded image data
- `filename` (required): Original filename with extension
- `options` (optional): Conversion options
  - `convert_to_midi`: Boolean, whether to convert to MIDI
  - `enhance_image`: Boolean, whether to preprocess image
  - `timeout`: Number, processing timeout in milliseconds

**Response:**
```json
{
  "success": true,
  "job_id": "uuid-string",
  "message": "Conversion started successfully",
  "estimated_time": "30-120 seconds"
}
```

**Status Codes:**
- `200` - Conversion started successfully
- `400` - Invalid request parameters
- `401` - Authentication required
- `413` - File too large
- `500` - Internal server error

### Conversion Status

#### GET /api/sheet-to-digital/status/:jobId

Check the status of a conversion job.

**Response:**
```json
{
  "job_id": "uuid-string",
  "status": "completed",
  "progress": 100,
  "created_at": "2025-01-15T10:30:00.000Z",
  "completed_at": "2025-01-15T10:32:00.000Z",
  "result": {
    "success": true,
    "musicxml_path": "/path/to/output.xml",
    "midi_path": "/path/to/output.mid",
    "confidence": 0.85,
    "detected_elements": {
      "measures": 4,
      "notes": 32,
      "rests": 8,
      "clefs": 4,
      "time_signatures": 4,
      "key_signatures": 4
    },
    "processing_time": 120000
  },
  "download_urls": {
    "musicxml": "https://your-domain.com/download/musicxml-uuid.zip",
    "midi": "https://your-domain.com/download/midi-uuid.zip"
  }
}
```

**Status Codes:**
- `200` - Status retrieved successfully
- `404` - Job not found
- `500` - Internal server error

### Supported Formats

#### GET /api/sheet-to-digital/formats

Get information about supported file formats and options.

**Response:**
```json
{
  "input_formats": [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/tiff",
    "image/bmp"
  ],
  "output_formats": {
    "musicxml": {
      "description": "MusicXML format for digital sheet music",
      "mime_type": "application/xml",
      "extension": ".xml"
    },
    "midi": {
      "description": "MIDI format for audio playback",
      "mime_type": "audio/midi",
      "extension": ".mid"
    }
  },
  "options": {
    "max_file_size": 52428800,
    "max_dimensions": {
      "width": 4000,
      "height": 4000
    },
    "supported_dpi": [72, 150, 300, 600]
  }
}
```

**Status Codes:**
- `200` - Formats retrieved successfully
- `500` - Internal server error

### Download Files

#### GET /api/sheet-to-digital/download/:jobId/:format

Download converted files.

**Parameters:**
- `jobId`: UUID of the conversion job
- `format`: `musicxml` or `midi`

**Response:**
- File download with appropriate headers

**Status Codes:**
- `200` - File downloaded successfully
- `404` - File not found
- `500` - Internal server error

## 🚨 Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `AUTH_REQUIRED` | 401 | Authentication required |
| `AUTH_FAILED` | 401 | Authentication failed |
| `FILE_TOO_LARGE` | 413 | File exceeds size limit |
| `UNSUPPORTED_FORMAT` | 415 | Unsupported file format |
| `JOB_NOT_FOUND` | 404 | Conversion job not found |
| `PROCESSING_FAILED` | 500 | Processing failed |
| `OEMER_ERROR` | 500 | OEMER processing error |
| `INTERNAL_ERROR` | 500 | Internal server error |

### Error Examples

#### Invalid Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter: file",
    "details": "The 'file' parameter is required for conversion"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

#### Authentication Failed
```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid authentication token",
    "details": "The provided token is invalid or expired"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

#### Processing Failed
```json
{
  "success": false,
  "error": {
    "code": "PROCESSING_FAILED",
    "message": "OEMER processing failed",
    "details": "OEMER could not process the image: error details"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## 📊 Data Formats

### Image Upload Format

Images should be uploaded as base64 encoded data:

```javascript
// Convert file to base64
const file = document.getElementById('file-input').files[0];
const reader = new FileReader();

reader.onload = function(e) {
  const base64Data = e.target.result.split(',')[1]; // Remove data URL prefix
  const filename = file.name;
  
  // Send to API
  fetch('/api/sheet-to-digital/convert', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file: base64Data,
      filename: filename
    })
  });
};

reader.readAsDataURL(file);
```

### MusicXML Format

The API generates MusicXML files that can be used with:

- Music notation software (MuseScore, Sibelius, Finale)
- Digital sheet music readers
- Music education platforms

Example MusicXML structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1">
      <part-name>Music Part</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
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
        <duration>1</duration>
        <type>quarter</type>
      </note>
    </measure>
  </part>
</score-partwise>
```

### MIDI Format

The generated MIDI files can be played with:

- Media players (VLC, Windows Media Player)
- DAW software (Ableton Live, Logic Pro)
- Web-based MIDI players

## ⚡ Rate Limiting

The API implements rate limiting to prevent abuse:

- **Default**: 100 requests per 15 minutes per user
- **Headers**: Rate limit information is returned in response headers

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642255200
```

### Rate Limit Response

When rate limited, the API returns:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": "You have exceeded the rate limit. Try again later."
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**Status Codes:**
- `429` - Rate limit exceeded

## 🔗 Webhooks

### Conversion Complete Webhook

The API can send webhook notifications when conversions are complete.

#### Setup

```javascript
// Include webhook URL in conversion request
fetch('/api/sheet-to-digital/convert', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    file: base64Data,
    filename: filename,
    webhook_url: 'https://your-domain.com/webhook'
  })
});
```

#### Webhook Payload

```json
{
  "event": "conversion_completed",
  "job_id": "uuid-string",
  "timestamp": "2025-01-15T10:32:00.000Z",
  "result": {
    "success": true,
    "musicxml_url": "https://your-domain.com/download/musicxml-uuid.zip",
    "midi_url": "https://your-domain.com/download/midi-uuid.zip",
    "confidence": 0.85
  }
}
```

## 💡 Examples

### JavaScript Example

```javascript
// Convert sheet music using JavaScript
async function convertSheetMusic(file, token) {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(file);
    
    // Send conversion request
    const response = await fetch('http://localhost:3001/api/sheet-to-digital/convert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: base64Data,
        filename: file.name,
        options: {
          convert_to_midi: true,
          enhance_image: true
        }
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Poll for completion
      const downloadUrls = await pollForCompletion(result.job_id, token);
      return downloadUrls;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Conversion failed:', error);
    throw error;
  }
}

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// Poll for conversion completion
async function pollForCompletion(jobId, token) {
  const maxAttempts = 60; // 5 minutes max
  const interval = 5000; // 5 seconds
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(`http://localhost:3001/api/sheet-to-digital/status/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const status = await response.json();
    
    if (status.status === 'completed') {
      return status.download_urls;
    } else if (status.status === 'failed') {
      throw new Error('Conversion failed');
    }
    
    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error('Conversion timeout');
}
```

### cURL Examples

#### Start Conversion
```bash
curl -X POST http://localhost:3001/api/sheet-to-digital/convert \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "file": "base64-encoded-image-data",
    "filename": "sheet_music.png",
    "options": {
      "convert_to_midi": true,
      "enhance_image": true
    }
  }'
```

#### Check Status
```bash
curl -X GET http://localhost:3001/api/sheet-to-digital/status/JOB_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Download Files
```bash
curl -X GET http://localhost:3001/api/sheet-to-digital/download/JOB_ID/musicxml \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o musicxml.zip
```

## 🔒 Security Considerations

- All API endpoints require authentication
- File uploads are validated for size and format
- Rate limiting prevents abuse
- CORS is configured for production domains
- Input validation prevents injection attacks

## 📈 Monitoring

The API includes comprehensive logging:

- Request/response logging
- Error tracking
- Performance metrics
- User activity monitoring

Logs are available in the backend logs directory and can be configured for production monitoring.

---

**For additional support or questions, please contact the development team or create an issue on GitHub.**
