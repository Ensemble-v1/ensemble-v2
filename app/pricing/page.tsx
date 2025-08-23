import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Check, X } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-satoshi font-black text-5xl md:text-7xl mb-8 leading-tight">
            SIMPLE, TRANSPARENT
            <br />
            <span className="text-cyber-orange">PRICING</span>
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-800 mb-16 max-w-4xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. Start free, upgrade anytime. No hidden fees, no complicated tiers.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <div className="card-brutalist">
              <div className="text-center mb-8">
                <h3 className="font-satoshi font-bold text-3xl mb-4">FREE</h3>
                <p className="font-satoshi font-black text-5xl mb-2">$0</p>
                <p className="font-inter text-lg text-gray-600">per month</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />3 conversions per month
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Basic PNG output
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Email support
                </li>
                <li className="flex items-center font-inter text-lg text-gray-400">
                  <X className="h-5 w-5 text-gray-400 mr-3" />
                  MIDI export
                </li>
                <li className="flex items-center font-inter text-lg text-gray-400">
                  <X className="h-5 w-5 text-gray-400 mr-3" />
                  Simplified notation
                </li>
                <li className="flex items-center font-inter text-lg text-gray-400">
                  <X className="h-5 w-5 text-gray-400 mr-3" />
                  Cloud sync
                </li>
              </ul>

              <Link href="/signup" className="btn-secondary w-full py-4 text-center block text-lg">
                START FREE
              </Link>
            </div>

            {/* Pro Monthly - Featured */}
            <div className="card-brutalist bg-cyber-orange text-white border-cyber-orange relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-white px-6 py-2 font-satoshi font-bold text-sm border-3 border-black">
                  MOST POPULAR
                </span>
              </div>

              <div className="text-center mb-8 pt-4">
                <h3 className="font-satoshi font-bold text-3xl mb-4">PRO MONTHLY</h3>
                <p className="font-satoshi font-black text-5xl mb-2">$7.99</p>
                <p className="font-inter text-lg opacity-90">per month</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Unlimited conversions
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-white mr-3" />
                  PNG, MIDI, simplified notation
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Priority support
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Cloud sync across devices
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Advanced AI features
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Batch processing
                </li>
              </ul>

              <Link
                href="/signup"
                className="bg-white text-cyber-orange px-6 py-4 border-3 border-white shadow-brutalist font-satoshi font-bold text-lg w-full text-center block hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#fff] transition-all"
              >
                START FREE TRIAL
              </Link>
            </div>

            {/* Pro Yearly */}
            <div className="card-brutalist">
              <div className="text-center mb-8">
                <h3 className="font-satoshi font-bold text-3xl mb-4">PRO YEARLY</h3>
                <p className="font-satoshi font-black text-5xl mb-2">$59.99</p>
                <p className="font-inter text-lg text-gray-600">per year</p>
                <p className="font-inter text-sm text-green-600 font-semibold mt-2">Save 37% annually</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Everything in Pro Monthly
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Advanced export options
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Premium support
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Early access to features
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  API access
                </li>
                <li className="flex items-center font-inter text-lg">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Custom integrations
                </li>
              </ul>

              <Link href="/signup" className="btn-primary w-full py-4 text-center block text-lg">
                START FREE TRIAL
              </Link>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="bg-gray-100 border-4 border-black shadow-brutalist-lg p-8">
            <h3 className="font-satoshi font-bold text-3xl text-center mb-8">DETAILED FEATURE COMPARISON</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-3 border-black">
                    <th className="text-left font-satoshi font-bold text-xl py-4">Feature</th>
                    <th className="text-center font-satoshi font-bold text-xl py-4">Free</th>
                    <th className="text-center font-satoshi font-bold text-xl py-4">Pro Monthly</th>
                    <th className="text-center font-satoshi font-bold text-xl py-4">Pro Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-gray-300">
                    <td className="font-inter text-lg py-4">Monthly conversions</td>
                    <td className="text-center font-inter text-lg py-4">3</td>
                    <td className="text-center font-inter text-lg py-4">Unlimited</td>
                    <td className="text-center font-inter text-lg py-4">Unlimited</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="font-inter text-lg py-4">PNG export</td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="font-inter text-lg py-4">MIDI export</td>
                    <td className="text-center py-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="font-inter text-lg py-4">Simplified notation</td>
                    <td className="text-center py-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="font-inter text-lg py-4">Cloud sync</td>
                    <td className="text-center py-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="font-inter text-lg py-4">API access</td>
                    <td className="text-center py-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyber-orange">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-satoshi font-black text-4xl md:text-5xl text-white mb-6">START YOUR FREE TRIAL TODAY</h2>
          <p className="font-inter text-xl text-white mb-12 opacity-90">
            No credit card required. Cancel anytime. Join 10,000+ musicians already using Ensemble.
          </p>

          <Link
            href="/signup"
            className="bg-white text-cyber-orange px-12 py-4 border-3 border-white shadow-brutalist font-satoshi font-bold text-xl hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#fff] transition-all inline-block"
          >
            START FREE TRIAL
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
