import { getBaseURL } from "@lib/util/env"
import { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "styles/globals.css"

// Self-hosted by next/font, so pages don't depend on fonts installed locally.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${inter.variable} ${plusJakarta.variable}`}
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
