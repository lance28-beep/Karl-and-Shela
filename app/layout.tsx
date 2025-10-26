import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import BackgroundMusic from "@/components/background-music"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

export const metadata: Metadata = {
  title: "Karl Joseph & Shela Marie - Wedding Invitation",
  description:
    "You're invited to the wedding of Karl Joseph and Shela Marie! Join us on February 28, 2026, at National Shrine of St. Joseph, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Karl Joseph Shela Marie wedding, National Shrine of St. Joseph wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Philippines, #angNaKARLjackpotSaPusoNiSHELA",
  authors: [
    { name: "Karl Joseph" },
    { name: "Shela Marie" },
  ],
  creator: "Karl Joseph & Shela Marie",
  publisher: "Karl Joseph & Shela Marie",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://karl-and-shela.vercel.app"),
  alternates: {
    canonical: "https://karl-and-shela.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Karl Joseph & Shela Marie Wedding | February 28, 2026 | National Shrine of St. Joseph",
    description:
      "Celebrate the union of Karl Joseph and Shela Marie on February 28, 2026, at National Shrine of St. Joseph, Philippines. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://karl-and-shela.vercel.app/",
    siteName: "Karl Joseph & Shela Marie Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/couple.png",
        width: 1200,
        height: 630,
        alt: "Karl Joseph & Shela Marie Wedding Invitation - February 28, 2026, National Shrine of St. Joseph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karl Joseph & Shela Marie Wedding Invitation",
    description:
      "You're invited to the wedding of Karl Joseph and Shela Marie! February 28, 2026, National Shrine of St. Joseph, Philippines. RSVP, view our gallery, and leave a message! #angNaKARLjackpotSaPusoNiSHELA",
    images: ["https://karl-and-shela.vercel.app/couple.png"],
    creator: "@karljosephshelamarie",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Karl Joseph & Shela Marie Wedding",
      startDate: "2026-02-28T14:30:00+08:00",
      endDate: "2026-02-28T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "National Shrine of St. Joseph",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mandaue City",
            addressRegion: "Cebu",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://karl-and-shela.vercel.app/couple.png"],
      description:
        "You're invited to the wedding of Karl Joseph and Shela Marie! Join us on February 28, 2026, at National Shrine of St. Joseph, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Karl Joseph & Shela Marie",
      },
      offers: {
        "@type": "Offer",
        url: "https://karl-and-shela.vercel.app",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#angNaKARLjackpotSaPusoNiSHELA",
    }),
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
        <meta name="theme-color" content="#49513C" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${playfair.variable} ${lora.variable} font-lora antialiased`} style={{ backgroundColor: '#49513C', color: '#FDDFDD' }}>
        {children}
        <BackgroundMusic />
        <Analytics />
      </body>
    </html>
  )
}
