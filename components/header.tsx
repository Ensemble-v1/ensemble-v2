"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  return (
    <header className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <Link href="/" className="flex items-center">
            <div className="bg-cyber-orange text-white px-4 py-2 border-3 border-black shadow-brutalist font-satoshi font-black text-2xl">
              ENSEMBLE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-satoshi font-bold text-lg hover:text-cyber-orange transition-colors">
              HOME
            </Link>
            <Link href="/about" className="font-satoshi font-bold text-lg hover:text-cyber-orange transition-colors">
              ABOUT
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="font-satoshi font-bold text-lg hover:text-cyber-orange transition-colors flex items-center"
              >
                SERVICES
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border-3 border-black shadow-brutalist-lg">
                  <Link
                    href="/services/sheet-to-digital"
                    className="block px-6 py-4 hover:bg-gray-100 border-b-2 border-black font-satoshi font-semibold"
                  >
                    Sheet to PNG/MIDI
                  </Link>
                  <Link
                    href="/services/video-to-sheet"
                    className="block px-6 py-4 hover:bg-gray-100 border-b-2 border-black font-satoshi font-semibold"
                  >
                    Video to Sheet Music
                  </Link>
                  <Link
                    href="/services/audio-to-sheet"
                    className="block px-6 py-4 hover:bg-gray-100 font-satoshi font-semibold"
                  >
                    Audio to Sheet Music
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="font-satoshi font-bold text-lg hover:text-cyber-orange transition-colors">
              PRICING
            </Link>
          </nav>


          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin" className="btn-secondary px-6 py-3 text-sm">
              SIGN IN
            </Link>
            <Link href="/signup" className="btn-primary px-6 py-3 text-sm">
              SIGN UP
            </Link>
          </div>


          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 border-2 border-black">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-3 border-black bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 font-satoshi font-bold text-lg">
                HOME
              </Link>
              <Link href="/about" className="block px-3 py-2 font-satoshi font-bold text-lg">
                ABOUT
              </Link>
              <Link href="/services/sheet-to-digital" className="block px-3 py-2 font-satoshi font-semibold">
                Sheet to PNG/MIDI
              </Link>
              <Link href="/services/video-to-sheet" className="block px-3 py-2 font-satoshi font-semibold">
                Video to Sheet Music
              </Link>
              <Link href="/services/audio-to-sheet" className="block px-3 py-2 font-satoshi font-semibold">
                Audio to Sheet Music
              </Link>
              <Link href="/pricing" className="block px-3 py-2 font-satoshi font-bold text-lg">
                PRICING
              </Link>
              <div className="flex space-x-4 px-3 py-4">
                <Link href="/signin" className="btn-secondary px-4 py-2 text-sm">
                  SIGN IN
                </Link>
                <Link href="/signup" className="btn-primary px-4 py-2 text-sm">
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
