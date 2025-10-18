import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import BackgroundMusic from "@/components/background-music"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

export const metadata: Metadata = {
  title: "Cassly Jane & Mark Florence - Wedding Invitation",
  description:
    "You're invited to the wedding of Cassly Jane and Mark Florence! Join us on December 20, 2025, in Tagaytay City, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Cassly Jane Mark Florence wedding, Tagaytay wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2025 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Philippines, #CasslyAndMarkWedding",
  authors: [
    { name: "Cassly Jane" },
    { name: "Mark Florence" },
  ],
  creator: "Cassly Jane & Mark Florence",
  publisher: "Cassly Jane & Mark Florence",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://cassly-jane-mark-florence-invitatio.vercel.app/"),
  alternates: {
    canonical: "https://cassly-jane-mark-florence-invitatio.vercel.app/",
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
    title: "Cassly Jane & Mark Florence Wedding | December 20, 2025 | Tagaytay",
    description:
      "Celebrate the union of Cassly Jane and Mark Florence on December 20, 2025, in Tagaytay City, Philippines. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://cassly-jane-mark-florence-invitatio.vercel.app/",
    siteName: "Cassly Jane & Mark Florence Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://cassly-jane-mark-florence-invitatio.vercel.app/CoupleImage/couple_1.png",
        width: 1200,
        height: 630,
        alt: "Cassly Jane & Mark Florence Wedding Invitation - December 20, 2025, Tagaytay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cassly Jane & Mark Florence Wedding Invitation",
    description:
      "You're invited to the wedding of Cassly Jane and Mark Florence! December 20, 2025, Tagaytay City, Philippines. RSVP, view our gallery, and leave a message! #CasslyAndMarkWedding",
    images: ["https://cassly-jane-mark-florence-invitatio.vercel.app/CoupleImage/couple_1.png"],
    creator: "@casslyandmark",
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
      name: "Cassly Jane & Mark Florence Wedding",
      startDate: "2025-12-20T16:00:00+08:00",
      endDate: "2025-12-20T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Tagaytay City",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tagaytay City",
            addressRegion: "Cavite",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://cassly-jane-mark-florence-invitatio.vercel.app/couple_1.png"],
      description:
        "You're invited to the wedding of Cassly Jane and Mark Florence! Join us on December 20, 2025, in Tagaytay City, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Cassly Jane & Mark Florence",
      },
      offers: {
        "@type": "Offer",
        url: "https://cassly-jane-mark-florence-invitatio.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#CasslyAndMarkWedding",
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
        <meta name="theme-color" content="#34656D" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${playfair.variable} ${lora.variable} font-lora antialiased bg-cream text-ink`}>
        {children}
        <BackgroundMusic />
        <Analytics />
      </body>
    </html>
  )
}
