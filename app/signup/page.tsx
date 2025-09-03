import Header from "@/components/header"
import Footer from "@/components/footer"
import { SignUp } from "@clerk/nextjs"

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

          <div className="flex justify-center">
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 border-4 border-black transform transition-transform hover:translate-x-1 hover:translate-y-1",
                  card: "shadow-[8px_8px_0px_0px_#000000] border-4 border-black bg-white",
                  headerTitle: "font-satoshi font-black text-2xl",
                  headerSubtitle: "font-inter text-gray-600",
                  socialButtonsBlockButton: "border-4 border-black bg-white hover:bg-gray-50 text-black font-bold transform transition-transform hover:translate-x-1 hover:translate-y-1",
                  formFieldInput: "border-4 border-black bg-white focus:outline-none focus:ring-0 focus:border-black",
                  footerActionLink: "text-orange-500 hover:text-orange-600 font-semibold"
                }
              }}
              redirectUrl="/dashboard"
              signInUrl="/signin"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
