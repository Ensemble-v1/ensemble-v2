import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="col-span-1 md:col-span-2">
            <div className="bg-cyber-orange text-white px-4 py-2 border-3 border-white shadow-brutalist font-satoshi font-black text-2xl inline-block mb-6">
              ENSEMBLE
            </div>
            <p className="text-gray-300 font-inter text-lg leading-relaxed max-w-md">
              AI-powered sheet music conversion platform trusted by 10,000+ musicians worldwide. Transform traditional
              notation into digital formats in seconds.
            </p>
          </div>


          <div>
            <h3 className="font-satoshi font-bold text-xl mb-6 text-cyber-orange">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white font-inter font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white font-inter font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white font-inter font-medium">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white font-inter font-medium">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="border-t-3 border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="text-gray-300 hover:text-cyber-orange transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-cyber-orange transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-cyber-orange transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-cyber-orange transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
        </div>
        <p className="text-gray-300 font-inter">© 2025 Ensemble. All rights reserved.</p>
      </div>
    </footer>
  )
}
