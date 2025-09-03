import { currentUser } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function Dashboard() {
  const user = await currentUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-satoshi font-black text-2xl mb-4">Please sign in to access your dashboard</h1>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="font-satoshi font-black text-4xl md:text-5xl mb-4">
                Welcome back, {user.firstName}!
              </h1>
              <p className="font-inter text-lg text-gray-600">
                Ready to convert some sheet music?
              </p>
            </div>
            <UserButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-brutalist p-6">
              <h3 className="font-satoshi font-bold text-xl mb-4">Audio to Sheet</h3>
              <p className="font-inter text-gray-600 mb-4">
                Convert audio recordings to sheet music notation
              </p>
              <a href="/services/audio-to-sheet" className="btn-primary">
                Get Started
              </a>
            </div>

            <div className="card-brutalist p-6">
              <h3 className="font-satoshi font-bold text-xl mb-4">Sheet to Digital</h3>
              <p className="font-inter text-gray-600 mb-4">
                Digitize physical sheet music into editable formats
              </p>
              <a href="/services/sheet-to-digital" className="btn-primary">
                Get Started
              </a>
            </div>

            <div className="card-brutalist p-6">
              <h3 className="font-satoshi font-bold text-xl mb-4">Video to Sheet</h3>
              <p className="font-inter text-gray-600 mb-4">
                Extract sheet music from video performances
              </p>
              <a href="/services/video-to-sheet" className="btn-primary">
                Get Started
              </a>
            </div>
          </div>

          <div className="mt-12 card-brutalist p-6">
            <h3 className="font-satoshi font-bold text-xl mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-inter text-sm text-gray-600">Email</p>
                <p className="font-inter font-semibold">{user.emailAddresses[0]?.emailAddress}</p>
              </div>
              <div>
                <p className="font-inter text-sm text-gray-600">Member since</p>
                <p className="font-inter font-semibold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
