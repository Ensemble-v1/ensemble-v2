import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Mail, Lock, User, Eye } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-satoshi font-black text-4xl md:text-5xl mb-4">
              JOIN <span className="text-cyber-orange">ENSEMBLE</span>
            </h1>
            <p className="font-inter text-lg text-gray-600">Start converting sheet music with AI in seconds</p>
          </div>

          <div className="card-brutalist">
            <form className="space-y-6">
              <div>
                <label className="font-satoshi font-bold text-lg mb-3 block">FULL NAME</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" className="input-brutalist w-full pl-12" placeholder="Enter your full name" required />
                </div>
              </div>

              <div>
                <label className="font-satoshi font-bold text-lg mb-3 block">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" className="input-brutalist w-full pl-12" placeholder="Enter your email" required />
                </div>
              </div>

              <div>
                <label className="font-satoshi font-bold text-lg mb-3 block">PASSWORD</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    className="input-brutalist w-full pl-12 pr-12"
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                  />
                  <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Eye className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <p className="font-inter text-sm text-gray-500 mt-2">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>

              <div>
                <label className="flex items-start">
                  <input type="checkbox" className="w-5 h-5 border-3 border-black mr-3 mt-1" />
                  <span className="font-inter text-sm text-gray-700">
                    I agree to the{" "}
                    <Link href="/terms" className="text-cyber-orange hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-cyber-orange hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-lg">
                CREATE ACCOUNT
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white font-inter text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="btn-secondary py-3 text-sm flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  GOOGLE
                </button>
                <button className="btn-secondary py-3 text-sm flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  FACEBOOK
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-inter text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="text-cyber-orange font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
