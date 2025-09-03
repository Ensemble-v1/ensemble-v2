import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Ensemble - AI-Powered Sheet Music Conversion",
  description:
    "Transform sheet music into any format with AI. Convert traditional notation to PNG, MIDI, and simplified formats in seconds.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} antialiased`}>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-inter bg-white text-black">{children}</body>
      </html>
    </ClerkProvider>
  )
}
