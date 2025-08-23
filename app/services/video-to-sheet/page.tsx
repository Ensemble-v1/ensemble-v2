import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Zap, Eye, Brain, Video } from "lucide-react"

export default function VideoToSheetPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-[#0066FF] text-white border-2 border-black font-bold px-4 py-2 text-sm uppercase tracking-wide">
              VIDEO TO SHEET
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              EXTRACT SHEET MUSIC
              <br />
              FROM <span className="text-[#0066FF]">VIDEO</span>
              <br />
              PERFORMANCES
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Watch any musical performance and instantly generate accurate sheet music. Perfect for learning from
              YouTube videos, concerts, or practice sessions.
            </p>
            <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide">
              ANALYZE VIDEO NOW
            </Button>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">HOW IT WORKS</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white text-center">
                <div className="w-16 h-16 bg-[#0066FF] border-4 border-black mx-auto mb-6 flex items-center justify-center">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black uppercase">1. UPLOAD VIDEO</h3>
                <p className="text-gray-700">
                  Upload your video file or paste a YouTube URL. We support all major formats.
                </p>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white text-center">
                <div className="w-16 h-16 bg-[#FF6600] border-4 border-black mx-auto mb-6 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black uppercase">2. AI ANALYSIS</h3>
                <p className="text-gray-700">
                  Our AI watches the performance and identifies notes, timing, and musical patterns.
                </p>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white text-center">
                <div className="w-16 h-16 bg-green-600 border-4 border-black mx-auto mb-6 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black uppercase">3. GET SHEET MUSIC</h3>
                <p className="text-gray-700">
                  Download professional sheet music notation ready for practice or performance.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">ADVANCED CAPABILITIES</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                  <Eye className="w-12 h-12 text-[#0066FF] mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-black uppercase">VISUAL RECOGNITION</h3>
                  <p className="text-gray-700 mb-6">
                    Our AI can track finger movements, bow techniques, and instrument positioning to understand the
                    music being played.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Piano key detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Guitar fret analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Violin bow tracking</span>
                    </li>
                  </ul>
                </Card>
              </div>
              <div>
                <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                  <Zap className="w-12 h-12 text-[#FF6600] mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-black uppercase">AUDIO SYNC</h3>
                  <p className="text-gray-700 mb-6">
                    Combines visual analysis with audio processing for maximum accuracy in note detection and timing.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Pitch detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Rhythm analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Tempo mapping</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Instruments */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">SUPPORTED INSTRUMENTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Piano",
                "Guitar",
                "Violin",
                "Cello",
                "Flute",
                "Clarinet",
                "Trumpet",
                "Saxophone",
                "Drums",
                "Bass",
                "Harp",
                "Organ",
              ].map((instrument) => (
                <Card
                  key={instrument}
                  className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_#000000] bg-white text-center hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-200"
                >
                  <p className="font-bold text-black uppercase">{instrument}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">PERFECT FOR</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-xl font-bold mb-4 text-black uppercase">MUSIC STUDENTS</h3>
                <p className="text-gray-700 mb-4">Learn from your favorite YouTube performances</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Transcribe complex solos</li>
                  <li>• Study technique videos</li>
                  <li>• Practice with accurate notation</li>
                </ul>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-xl font-bold mb-4 text-black uppercase">MUSIC TEACHERS</h3>
                <p className="text-gray-700 mb-4">Create lesson materials from video content</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Transcribe student performances</li>
                  <li>• Analyze technique videos</li>
                  <li>• Create custom exercises</li>
                </ul>
              </Card>
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-white">
                <h3 className="text-xl font-bold mb-4 text-black uppercase">COMPOSERS</h3>
                <p className="text-gray-700 mb-4">Capture musical ideas from recordings</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Document jam sessions</li>
                  <li>• Transcribe live performances</li>
                  <li>• Archive musical ideas</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#0066FF]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">TURN ANY VIDEO INTO SHEET MUSIC</h2>
            <p className="text-xl text-blue-100 mb-8">Start transcribing your favorite performances today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white hover:bg-gray-100 text-[#0066FF] font-bold py-4 px-8 text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 uppercase tracking-wide">
                TRY FOR FREE
              </Button>
              <Button
                variant="outline"
                className="border-4 border-white text-white font-bold py-4 px-8 text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 uppercase tracking-wide hover:bg-white hover:text-[#0066FF] bg-transparent"
              >
                WATCH DEMO
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
