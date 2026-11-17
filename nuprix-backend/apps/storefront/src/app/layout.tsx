import { getBaseURL } from "@lib/util/env"
import { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"
import "styles/globals.css"

// Self-hosted by next/font, so pages don't depend on fonts installed locally.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export const viewport: Viewport = {
  themeColor: "#f7f7f2",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <head>
        <link rel="ucp" href="/.well-known/ucp" />
      </head>
      <body className="bg-nuprix-ivory font-sans text-nuprix-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {props.children}
      </body>
    </html>
  )
}
