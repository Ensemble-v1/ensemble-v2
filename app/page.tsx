import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Zap, Send as Sync, Users, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-satoshi font-black text-5xl-reduced md:text-7xl-reduced lg:text-8xl-reduced mb-8 leading-tight">
            TRANSFORM SHEET MUSIC
            <br />
            <span className="text-cyber-orange">INTO ANY FORMAT</span>
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-800 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI-powered conversion in seconds. From traditional notation to digital formats that everyone can read.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/signup" className="btn-primary px-8 py-4 text-lg flex items-center">
              START FREE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary px-8 py-4 text-lg">
              VIEW PRICING
            </Link>
          </div>


          <div className="bg-gray-100 border-4 border-black shadow-brutalist-lg p-8 max-w-4xl mx-auto">
            <img src="/sheet-music-conversion-dashboard.png" alt="Ensemble AI conversion interface" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-satoshi font-black text-4xl md:text-6xl text-center mb-4">WHY 10,000+ MUSICIANS</h2>
          <h2 className="font-satoshi font-black text-4xl md:text-6xl text-center mb-16 text-cyber-orange">
            CHOOSE ENSEMBLE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-brutalist card-brutalist-hover transition-all duration-200">
              <div className="bg-cyber-orange text-white p-4 inline-block mb-6 border-3 border-black">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-bold text-2xl mb-4">INSTANT CONVERSION</h3>
              <p className="font-inter text-lg text-gray-700 leading-relaxed">
                Convert sheet music to PNG, MIDI, or simplified notation in seconds. Our AI processes complex scores
                instantly with 99% accuracy.
              </p>
            </div>

            <div className="card-brutalist card-brutalist-hover transition-all duration-200">
              <div className="bg-accent-blue text-white p-4 inline-block mb-6 border-3 border-black">
                <Sync className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-bold text-2xl mb-4">CROSS-PLATFORM SYNC</h3>
              <p className="font-inter text-lg text-gray-700 leading-relaxed">
                Access your converted files anywhere. Seamless sync across desktop, mobile, and tablet with cloud
                storage integration.
              </p>
            </div>

            <div className="card-brutalist card-brutalist-hover transition-all duration-200">
              <div className="bg-black text-white p-4 inline-block mb-6 border-3 border-black">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-satoshi font-bold text-2xl mb-4">BEGINNER-FRIENDLY</h3>
              <p className="font-inter text-lg text-gray-700 leading-relaxed">
                Simplified notation options perfect for music students. Complex scores become easy-to-read formats for
                faster learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-satoshi font-black text-4xl md:text-5xl mb-8">
            TRUSTED BY MUSIC STUDENTS,
            <br />
            <span className="text-cyber-orange">TEACHERS, AND PROFESSIONALS</span>
          </h2>

          <div className="flex justify-center items-center mb-12">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-cyber-orange fill-current" />
              ))}
            </div>
            <span className="font-satoshi font-bold text-2xl ml-4">4.9/5 FROM 2,500+ REVIEWS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card-brutalist">
              <p className="font-inter text-lg mb-4 italic">
                "Ensemble saved me hours of manual transcription. The AI accuracy is incredible!"
              </p>
              <p className="font-satoshi font-bold">- Sarah M., Music Teacher</p>
            </div>
            <div className="card-brutalist">
              <p className="font-inter text-lg mb-4 italic">
                "Perfect for my students who struggle with complex notation. Game changer!"
              </p>
              <p className="font-satoshi font-bold">- David L., Piano Instructor</p>
            </div>
            <div className="card-brutalist">
              <p className="font-inter text-lg mb-4 italic">
                "Professional quality conversions. I use it for all my arrangements now."
              </p>
              <p className="font-satoshi font-bold">- Maria R., Composer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyber-orange">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-satoshi font-black text-4xl md:text-5xl text-white mb-6">
            GET CONVERSION TIPS AND
            <br />
            EARLY ACCESS
          </h2>
          <p className="font-inter text-xl text-white mb-12 opacity-90">
            Join 5,000+ musicians getting weekly tips and first access to new features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input type="email" placeholder="Enter your email address" className="input-brutalist flex-1 text-lg" required />
            <button className="bg-black text-white px-8 py-4 border-3 border-black shadow-brutalist font-satoshi font-bold text-lg hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-satoshi font-black text-4xl md:text-6xl mb-16">
            SIMPLE, <span className="text-cyber-orange">TRANSPARENT PRICING</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Plan */}
            <div className="card-brutalist">
              <h3 className="font-satoshi font-bold text-2xl mb-4">FREE</h3>
              <p className="font-satoshi font-black text-4xl mb-6">
                $0<span className="text-lg font-normal">/month</span>
              </p>
              <ul className="font-inter text-lg space-y-3 mb-8">
                <li>3 conversions per month</li>
                <li>Basic PNG output</li>
                <li>Email support</li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full py-3 text-center block">
                START FREE
              </Link>
            </div>

            {/* Pro Monthly */}
            <div className="card-brutalist bg-cyber-orange text-white border-cyber-orange">
              <h3 className="font-satoshi font-bold text-2xl mb-4">PRO MONTHLY</h3>
              <p className="font-satoshi font-black text-4xl mb-6">
                $7.99<span className="text-lg font-normal">/month</span>
              </p>
              <ul className="font-inter text-lg space-y-3 mb-8">
                <li>Unlimited conversions</li>
                <li>PNG, MIDI, simplified notation</li>
                <li>Priority support</li>
                <li>Cloud sync</li>
              </ul>
              <Link
                href="/signup"
                className="bg-white text-cyber-orange px-6 py-3 border-3 border-white shadow-brutalist font-satoshi font-bold text-lg w-full text-center block hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#fff] transition-all"
              >
                START TRIAL
              </Link>
            </div>

            {/* Pro Yearly */}
            <div className="card-brutalist">
              <h3 className="font-satoshi font-bold text-2xl mb-4">PRO YEARLY</h3>
              <p className="font-satoshi font-black text-4xl mb-6">
                $59.99<span className="text-lg font-normal">/year</span>
              </p>
              <ul className="font-inter text-lg space-y-3 mb-8">
                <li>Everything in Pro Monthly</li>
                <li>Save 37% annually</li>
                <li>Advanced features</li>
                <li>Premium support</li>
              </ul>
              <Link href="/signup" className="btn-primary w-full py-3 text-center block">
                START TRIAL
              </Link>
            </div>
          </div>

          <Link href="/pricing" className="font-satoshi font-bold text-xl text-cyber-orange hover:underline">
            VIEW DETAILED PRICING →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
