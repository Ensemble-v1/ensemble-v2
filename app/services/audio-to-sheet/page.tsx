import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mic, AudioWaveform as Waveform, Music2, Headphones, Radio } from "lucide-react"

export default function AudioToSheetPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-green-600 text-white border-2 border-black font-bold px-4 py-2 text-sm uppercase tracking-wide">
              AUDIO TO SHEET
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              TRANSFORM AUDIO
              <br />
              INTO <span className="text-green-600">VISUAL</span>
              <br />
              NOTATION
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Convert any audio recording into accurate sheet music notation. From live recordings to studio tracks, get
              professional notation in minutes.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide">
              UPLOAD AUDIO NOW
            </Button>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">FROM SOUND TO SCORE</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                  <h3 className="text-2xl font-bold mb-6 text-black uppercase">UPLOAD YOUR AUDIO</h3>
                  <div className="border-4 border-dashed border-gray-300 rounded-none p-12 text-center bg-gray-50">
                    <Mic className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 font-medium">Drop your audio file here</p>
                    <p className="text-sm text-gray-500 mt-2">MP3, WAV, FLAC, M4A supported</p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Live recordings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Studio tracks</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Practice sessions</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                  <h3 className="text-2xl font-bold mb-6 text-black uppercase">GET SHEET MUSIC</h3>
                  <div className="bg-gray-50 p-6 border-2 border-gray-300">
                    <div className="flex items-center justify-between mb-4">
                      <Music2 className="w-8 h-8 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">TRANSCRIPTION COMPLETE</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 rounded-none"></div>
                      <div className="h-4 bg-gray-300 rounded-none w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded-none w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-2 border-green-600 text-green-600 font-bold text-sm uppercase bg-transparent"
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-blue-600 text-blue-600 font-bold text-sm uppercase bg-transparent"
                    >
                      Export MIDI
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">ADVANCED AUDIO ANALYSIS</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                <Waveform className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-4 text-black uppercase">PITCH DETECTION</h3>
                <p className="text-gray-700">
                  Advanced algorithms identify exact pitches and frequencies with 99.2% accuracy.
                </p>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                <Radio className="w-12 h-12 text-[#FF6600] mb-4" />
                <h3 className="text-xl font-bold mb-4 text-black uppercase">RHYTHM ANALYSIS</h3>
                <p className="text-gray-700">Precise timing detection captures complex rhythms and tempo changes.</p>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                <Headphones className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-xl font-bold mb-4 text-black uppercase">NOISE FILTERING</h3>
                <p className="text-gray-700">
                  Intelligent filtering removes background noise and isolates musical content.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Audio Types Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">WORKS WITH ANY AUDIO</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-2xl font-bold mb-6 text-black uppercase">SOLO INSTRUMENTS</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["Piano", "Guitar", "Violin", "Flute", "Trumpet", "Saxophone", "Cello", "Clarinet"].map(
                    (instrument) => (
                      <div key={instrument} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{instrument}</span>
                      </div>
                    ),
                  )}
                </div>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-2xl font-bold mb-6 text-black uppercase">ENSEMBLE MUSIC</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">String quartets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Jazz combos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Chamber music</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Small bands</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Quality Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">PROFESSIONAL QUALITY</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-black uppercase">WHAT YOU GET</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-black">Clean Notation</p>
                      <p className="text-gray-700 text-sm">Professional-grade sheet music ready for performance</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-black">Multiple Formats</p>
                      <p className="text-gray-700 text-sm">PDF, MIDI, MusicXML, and more export options</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-black">Editable Scores</p>
                      <p className="text-gray-700 text-sm">Make adjustments and corrections as needed</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-black">Tempo Markings</p>
                      <p className="text-gray-700 text-sm">Automatic tempo and dynamic markings</p>
                    </div>
                  </li>
                </ul>
              </div>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-green-50">
                <h3 className="text-2xl font-bold mb-4 text-black uppercase">ACCURACY STATS</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-black">Note Detection</span>
                      <span className="font-bold text-green-600">99.2%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-3 border-2 border-black">
                      <div className="bg-green-600 h-full w-[99.2%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-black">Rhythm Accuracy</span>
                      <span className="font-bold text-green-600">97.8%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-3 border-2 border-black">
                      <div className="bg-green-600 h-full w-[97.8%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-black">Key Detection</span>
                      <span className="font-bold text-green-600">98.5%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-3 border-2 border-black">
                      <div className="bg-green-600 h-full w-[98.5%]"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">READY TO TRANSCRIBE?</h2>
            <p className="text-xl text-green-100 mb-8">Upload your first audio file and see the magic happen.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white hover:bg-gray-100 text-green-600 font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide">
                START FREE TRIAL
              </Button>
              <Button
                variant="outline"
                className="border-4 border-white text-white font-bold py-4 px-8 text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 uppercase tracking-wide hover:bg-white hover:text-green-600 bg-transparent"
              >
                VIEW EXAMPLES
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
