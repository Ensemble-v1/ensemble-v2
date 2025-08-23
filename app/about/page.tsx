import Header from "@/components/header"
import Footer from "@/components/footer"
import { Users, Target, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-satoshi font-black text-5xl md:text-7xl mb-8 leading-tight">
            MAKING MUSIC ACCESSIBLE
            <br />
            <span className="text-cyber-orange">FOR EVERYONE</span>
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-800 mb-16 max-w-4xl mx-auto leading-relaxed">
            We believe sheet music shouldn't be a barrier to learning music. Our AI-powered platform breaks down complex
            notation into formats that everyone can understand and enjoy.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-satoshi font-black text-4xl md:text-5xl mb-8">
                OUR <span className="text-cyber-orange">MISSION</span>
              </h2>
              <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
                Traditional sheet music can be intimidating and inaccessible to many aspiring musicians. Complex
                notation, unfamiliar symbols, and dense arrangements often discourage people from pursuing their musical
                dreams.
              </p>
              <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
                Ensemble was created to bridge this gap. Using cutting-edge AI technology, we transform traditional
                sheet music into multiple formats - from simplified notation for beginners to MIDI files for digital
                musicians.
              </p>
              <p className="font-inter text-lg text-gray-700 leading-relaxed">
                Our goal is simple: make music education more inclusive, accessible, and enjoyable for everyone.
              </p>
            </div>
            <div className="bg-white border-4 border-black shadow-brutalist-lg p-8">
              <img src="/diverse-musicians-digital-sheet-music.png" alt="Musicians using Ensemble" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-satoshi font-black text-4xl md:text-5xl text-center mb-16">
            ENSEMBLE BY THE <span className="text-cyber-orange">NUMBERS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card-brutalist text-center">
              <div className="bg-cyber-orange text-white p-4 inline-block mb-6 border-3 border-black">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-black text-4xl mb-2">10,000+</h3>
              <p className="font-inter text-lg text-gray-700">Active Musicians</p>
            </div>

            <div className="card-brutalist text-center">
              <div className="bg-accent-blue text-white p-4 inline-block mb-6 border-3 border-black">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-black text-4xl mb-2">500K+</h3>
              <p className="font-inter text-lg text-gray-700">Sheets Converted</p>
            </div>

            <div className="card-brutalist text-center">
              <div className="bg-black text-white p-4 inline-block mb-6 border-3 border-black">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-black text-4xl mb-2">99%</h3>
              <p className="font-inter text-lg text-gray-700">Accuracy Rate</p>
            </div>

            <div className="card-brutalist text-center">
              <div className="bg-cyber-orange text-white p-4 inline-block mb-6 border-3 border-black">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-black text-4xl mb-2">150+</h3>
              <p className="font-inter text-lg text-gray-700">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-satoshi font-black text-4xl md:text-5xl text-center mb-16">
            MEET THE <span className="text-cyber-orange">TEAM</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-brutalist text-center">
              <div className="bg-gray-200 border-3 border-black w-32 h-32 mx-auto mb-6">
                <img src="/ceo-headshot.png" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-satoshi font-bold text-2xl mb-2">ALEX CHEN</h3>
              <p className="font-inter text-lg text-cyber-orange mb-4">CEO & Founder</p>
              <p className="font-inter text-gray-700">
                Former Spotify engineer with 10+ years in music technology. Passionate about making music education
                accessible.
              </p>
            </div>

            <div className="card-brutalist text-center">
              <div className="bg-gray-200 border-3 border-black w-32 h-32 mx-auto mb-6">
                <img src="/professional-cto-headshot.png" alt="CTO" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-satoshi font-bold text-2xl mb-2">SARAH MARTINEZ</h3>
              <p className="font-inter text-lg text-cyber-orange mb-4">CTO</p>
              <p className="font-inter text-gray-700">
                AI researcher specializing in computer vision and music analysis. PhD from Stanford, published 20+
                papers on music AI.
              </p>
            </div>

            <div className="card-brutalist text-center">
              <div className="bg-gray-200 border-3 border-black w-32 h-32 mx-auto mb-6">
                <img src="/headshot-head-of-product.png" alt="Head of Product" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-satoshi font-bold text-2xl mb-2">DAVID JOHNSON</h3>
              <p className="font-inter text-lg text-cyber-orange mb-4">Head of Product</p>
              <p className="font-inter text-gray-700">
                Professional musician turned product manager. 15 years experience in music education and user experience
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
