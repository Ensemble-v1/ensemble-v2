'use client'

import { useState, useRef } from "react"
import { useAuth } from "@clerk/nextjs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Upload, Download, Zap, Music, FileImage, FileAudio, X, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Types for our conversion results
interface ConversionResult {
  originalName: string
  success: boolean
  confidence: number
  detectedElements: {
    measures: number
    notes: number
    rests: number
    clefs: number
    timeSignatures: number
    keySignatures: number
  }
}

interface ConversionResponse {
  jobId: string
  success: boolean
  processedFiles: number
  successfulConversions: number
  failedConversions: number
  downloadUrl: string
  results: ConversionResult[]
}

export default function SheetToDigitalPage() {
  const { getToken } = useAuth()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [outputFormat, setOutputFormat] = useState<string>('xml')
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResult, setConversionResult] = useState<ConversionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf']
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024 // 50MB limit
    })
    
    setSelectedFiles(validFiles)
    setError(null)
  }

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index))
  }

  const handleConversion = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file to convert')
      return
    }

    setIsConverting(true)
    setError(null)
    setConversionResult(null)

    try {
      const token = await getToken()
      if (!token) {
        setError('Please sign in to use the conversion service')
        return
      }

      const formData = new FormData()
      selectedFiles.forEach(file => {
        formData.append('images', file)
      })
      formData.append('outputFormat', outputFormat)

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';
      const response = await fetch(`${backendUrl}/api/sheet-to-digital/convert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Conversion failed')
      }

      const result: ConversionResponse = await response.json()
      setConversionResult(result)
      setSelectedFiles([]) // Clear files after successful conversion
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsConverting(false)
    }
  }

  const downloadResults = () => {
    if (conversionResult?.downloadUrl) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';
      window.open(`${backendUrl}${conversionResult.downloadUrl}`, '_blank')
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-[#FF6600] text-white border-2 border-black font-bold px-4 py-2 text-sm uppercase tracking-wide">
              SHEET TO DIGITAL
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              CONVERT TRADITIONAL
              <br />
              <span className="text-[#FF6600]">SHEET MUSIC</span>
              <br />
              TO DIGITAL FORMATS
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform handwritten or printed sheet music into <strong className="text-[#FF6600]">MusicXML</strong> and <strong className="text-[#0066FF]">MIDI files</strong> instantly. Perfect for
              digitizing your music library, creating backing tracks, and making music accessible across all devices and software.
            </p>
          </div>
        </section>

        {/* Conversion Tool Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">START CONVERTING NOW</h2>
            
            {/* File Upload Area */}
            <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white mb-8">
              <h3 className="text-2xl font-bold mb-6 text-black uppercase">UPLOAD YOUR SHEET MUSIC</h3>
              
              <div 
                className="border-4 border-dashed border-gray-300 rounded-none p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleFileSelect(e.dataTransfer.files)
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 font-medium mb-2">Drop your sheet music files here or click to browse</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, TIFF, PDF formats (up to 50MB each)</p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/tiff,application/pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-bold text-black mb-4">SELECTED FILES ({selectedFiles.length})</h4>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white border-2 border-gray-300">
                        <div className="flex items-center gap-3">
                          <FileImage className="w-5 h-5 text-gray-500" />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-sm text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Output Format Selection */}
              <div className="mt-6">
                <h4 className="font-bold text-black mb-4">OUTPUT FORMAT</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setOutputFormat('xml')}
                    className={`p-4 border-2 border-black cursor-pointer transition-all duration-200 ${
                      outputFormat === 'xml' 
                        ? 'bg-[#FF6600] text-white shadow-[4px_4px_0px_0px_#000000]' 
                        : 'bg-white text-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000]'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <FileImage className="w-5 h-5 mr-2" />
                      <span className="font-bold">MusicXML</span>
                    </div>
                    <p className="text-sm opacity-90">
                      Industry-standard format for music notation software. Perfect for editing and printing.
                    </p>
                  </div>
                  <div
                    onClick={() => setOutputFormat('midi')}
                    className={`p-4 border-2 border-black cursor-pointer transition-all duration-200 ${
                      outputFormat === 'midi' 
                        ? 'bg-[#FF6600] text-white shadow-[4px_4px_0px_0px_#000000]' 
                        : 'bg-white text-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000]'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <FileAudio className="w-5 h-5 mr-2" />
                      <span className="font-bold">MIDI</span>
                    </div>
                    <p className="text-sm opacity-90">
                      Audio format for playback and production. Works with DAWs, synthesizers, and music apps.
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-300 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> {outputFormat === 'xml' 
                      ? 'MusicXML files can be opened in MuseScore, Finale, Sibelius, and other notation software for further editing.'
                      : 'MIDI files can be played in any DAW, imported into GarageBand, or used with virtual instruments for audio production.'
                    }
                  </p>
                </div>
              </div>

              {/* Convert Button */}
              <div className="mt-8">
                <Button 
                  onClick={handleConversion}
                  disabled={selectedFiles.length === 0 || isConverting}
                  className="w-full bg-[#FF6600] hover:bg-[#e55a00] text-white font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      CONVERTING...
                    </>
                  ) : (
                    'CONVERT TO DIGITAL'
                  )}
                </Button>
              </div>
            </Card>

            {/* Error Display */}
            {error && (
              <Alert className="mb-8 border-4 border-red-500 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Conversion Results */}
            {conversionResult && (
              <Card className="p-8 border-4 border-green-500 shadow-[8px_8px_0px_0px_#000000] bg-green-50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-green-800 uppercase">CONVERSION COMPLETE!</h3>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-green-700 font-medium">
                      <strong>Files Processed:</strong> {conversionResult.processedFiles}
                    </p>
                    <p className="text-green-700 font-medium">
                      <strong>Successful:</strong> {conversionResult.successfulConversions}
                    </p>
                    <p className="text-green-700 font-medium">
                      <strong>Failed:</strong> {conversionResult.failedConversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-700 font-medium">
                      <strong>Job ID:</strong> {conversionResult.jobId}
                    </p>
                  </div>
                </div>

                {/* Individual File Results */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-bold text-green-800">FILE DETAILS:</h4>
                  {conversionResult.results.map((result, index) => (
                    <div key={index} className="p-4 bg-white border-2 border-green-500 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{result.originalName}</span>
                        {result.success ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      {result.success && (
                        <>
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
                            </p>
                            {outputFormat === 'midi' && (
                              <p className="text-sm text-blue-600">
                                <FileAudio className="w-4 h-4 inline mr-1" />
                                <strong>MIDI Format:</strong> Ready for audio playback and DAW import
                              </p>
                            )}
                            {outputFormat === 'xml' && (
                              <p className="text-sm text-purple-600">
                                <FileImage className="w-4 h-4 inline mr-1" />
                                <strong>MusicXML Format:</strong> Compatible with notation software
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                            <div><strong>Measures:</strong> {result.detectedElements.measures}</div>
                            <div><strong>Notes:</strong> {result.detectedElements.notes}</div>
                            <div><strong>Clefs:</strong> {result.detectedElements.clefs}</div>
                          </div>
                          {outputFormat === 'midi' && result.detectedElements.notes > 0 && (
                            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                              <p className="text-xs text-blue-700">
                                🎵 Your MIDI file contains {result.detectedElements.notes} musical notes ready for playback!
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={downloadResults}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide"
                >
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD {outputFormat === 'midi' ? 'MIDI FILES' : 'MUSICXML FILES'}
                </Button>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {outputFormat === 'midi' 
                    ? '🎵 MIDI files ready for audio production and playback'
                    : '📄 MusicXML files ready for notation software editing'
                  }
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">POWERFUL FEATURES</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                <Zap className="w-12 h-12 text-[#FF6600] mb-4" />
                <h3 className="text-xl font-bold mb-4 text-black uppercase">LIGHTNING FAST</h3>
                <p className="text-gray-700">
                  Convert your sheet music in under 30 seconds with our advanced AI processing.
                </p>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                <Music className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-xl font-bold mb-4 text-black uppercase">HIGH ACCURACY</h3>
                <p className="text-gray-700">99.5% accuracy rate in note recognition and rhythm detection.</p>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-4 text-black uppercase">MULTIPLE FORMATS</h3>
                <p className="text-gray-700">
                  Export to PNG, MIDI, MusicXML, and more formats for maximum compatibility.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">PERFECT FOR</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-2xl font-bold mb-4 text-black uppercase">MUSIC TEACHERS</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Digitize handwritten exercises</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Create digital lesson materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Share music with students online</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-2xl font-bold mb-4 text-black uppercase">MUSICIANS</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Archive old sheet music</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Create backing tracks from MIDI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Practice with digital tools</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">READY TO GO DIGITAL?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of musicians who have already digitized their sheet music library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#FF6600] hover:bg-[#e55a00] text-white font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide">
                START FREE TRIAL
              </Button>
              <Button
                variant="outline"
                className="border-4 border-black text-black font-bold py-4 px-8 text-lg shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide bg-transparent"
              >
                VIEW PRICING
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
