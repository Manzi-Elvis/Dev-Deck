import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevDeck - Interactive Developer Playground",
  description: "Build, edit, and share beautiful UI/UX components with live preview",
  generator: "Next.js",
  keywords: ["components", "UI", "UX", "editor", "playground", "developer tools"],
  authors: [{ name: "DevDeck" }],
  openGraph: {
    title: "DevDeck - Interactive Developer Playground",
    description: "Build, edit, and share beautiful UI/UX components",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${_geist.className} font-sans antialiased dark`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
