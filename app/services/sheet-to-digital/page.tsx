import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Upload, Download, Zap, Music, FileImage, FileAudio } from "lucide-react"

export default function SheetToDigitalPage() {
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
              Transform handwritten or printed sheet music into PNG images and MIDI files instantly. Perfect for
              digitizing your music library and making it accessible across all devices.
            </p>
            <Button className="bg-[#FF6600] hover:bg-[#e55a00] text-white font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide">
              START CONVERTING NOW
            </Button>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">SEE IT IN ACTION</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                  <h3 className="text-2xl font-bold mb-4 text-black uppercase">UPLOAD YOUR SHEET</h3>
                  <div className="border-4 border-dashed border-gray-300 rounded-none p-12 text-center bg-gray-50">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 font-medium">Drop your sheet music image here</p>
                    <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, PDF formats</p>
                  </div>
                </Card>
              </div>
              <div>
                <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                  <h3 className="text-2xl font-bold mb-4 text-black uppercase">GET DIGITAL FILES</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 border-2 border-green-500">
                      <FileImage className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-bold text-green-800">High-Quality PNG</p>
                        <p className="text-sm text-green-600">Clean, readable notation</p>
                      </div>
                      <Download className="w-6 h-6 text-green-600 ml-auto" />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-500">
                      <FileAudio className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-bold text-blue-800">MIDI File</p>
                        <p className="text-sm text-blue-600">Playable digital format</p>
                      </div>
                      <Download className="w-6 h-6 text-blue-600 ml-auto" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
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
