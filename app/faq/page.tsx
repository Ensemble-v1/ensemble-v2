import Header from "@/components/header"
import Footer from "@/components/footer"

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What file formats can I upload?",
          answer:
            "We support PDF, JPG, PNG, and TIFF files. Your sheet music can be scanned images, photos, or digital PDFs. For best results, ensure your images are clear and well-lit with minimal shadows.",
        },
        {
          question: "How do I get started with Ensemble?",
          answer:
            "Simply sign up for a free account, upload your sheet music file, and our AI will automatically convert it to your desired digital format. The process typically takes 30-60 seconds depending on file complexity.",
        },
        {
          question: "Do I need to install any software?",
          answer:
            "No installation required! Ensemble is a web-based platform that works directly in your browser. Simply visit our website, upload your files, and download the converted results.",
        },
      ],
    },
    {
      category: "Conversion & Accuracy",
      questions: [
        {
          question: "How accurate is the AI conversion?",
          answer:
            "Our advanced AI achieves 95%+ accuracy on clear, standard notation. Accuracy may vary with handwritten music, complex contemporary notation, or poor image quality. We continuously improve our AI with user feedback.",
        },
        {
          question: "What output formats are available?",
          answer:
            "We convert to MIDI, MusicXML, PNG, and PDF formats. MIDI files work with any DAW, MusicXML opens in notation software like Sibelius or Finale, and PNG/PDF provide high-quality visual outputs.",
        },
        {
          question: "Can the AI handle complex music notation?",
          answer:
            "Yes! Our AI recognizes standard notation including dynamics, articulations, chord symbols, and multiple voices. However, very specialized or contemporary notation may require manual review.",
        },
        {
          question: "What if the conversion isn't perfect?",
          answer:
            "All output formats are fully editable in standard music software. You can make corrections in your preferred notation program or DAW after conversion.",
        },
      ],
    },
    {
      category: "Pricing & Limits",
      questions: [
        {
          question: "What are the file size limits?",
          answer:
            "Free accounts: 5MB per file, 10 conversions/month. Pro accounts: 50MB per file, unlimited conversions. Enterprise: unlimited file sizes and priority processing.",
        },
        {
          question: "Is there a free trial?",
          answer:
            "Yes! Every new user gets 10 free conversions to test our service. No credit card required for the free tier.",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer:
            "Absolutely. You can cancel your Pro subscription at any time from your account settings. You'll retain access until the end of your billing period.",
        },
        {
          question: "Do you offer educational discounts?",
          answer:
            "Yes! Students and educators receive 50% off Pro subscriptions. Contact our support team with your educational email for verification.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "My conversion failed. What should I do?",
          answer:
            "First, ensure your file meets our format and size requirements. If issues persist, try improving image quality or contact support with your file for assistance.",
        },
        {
          question: "How long are my files stored?",
          answer:
            "Uploaded files are automatically deleted after 24 hours for security. Converted files remain in your account for 30 days (Pro) or 7 days (Free).",
        },
        {
          question: "Is my music data secure?",
          answer:
            "Yes. We use enterprise-grade encryption for all uploads and storage. Your music files are never shared or used for training without explicit permission.",
        },
        {
          question: "Can I batch convert multiple files?",
          answer:
            "Pro and Enterprise users can upload and convert multiple files simultaneously. Free users process one file at a time.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-cyber-orange text-white px-6 py-3 border-3 border-black shadow-brutalist font-satoshi font-black text-3xl inline-block mb-6">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <p className="text-gray-600 font-inter text-lg max-w-2xl mx-auto">
            Find answers to common questions about our AI-powered sheet music conversion platform.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card-brutalist">
              <h2 className="font-satoshi font-bold text-2xl mb-8 text-black border-b-3 border-black pb-4">
                {category.category}
              </h2>

              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-l-4 border-cyber-orange pl-6">
                    <h3 className="font-satoshi font-bold text-lg mb-3 text-black">{faq.question}</h3>
                    <p className="text-gray-700 font-inter leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center card-brutalist">
          <h2 className="font-satoshi font-bold text-2xl mb-4 text-black">Still Have Questions?</h2>
          <p className="text-gray-600 font-inter mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <button className="btn-primary">Contact Support</button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
