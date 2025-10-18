"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import QRCodeSVG with no SSR
const QRCodeSVG = dynamic(
  () => import('qrcode.react').then((mod) => mod.QRCodeSVG),
  { ssr: false }
)

interface QRCodeProps {
  size?: number
  value?: string
}

export default function QRCode({ size = 200, value }: QRCodeProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const qrValue = value || (typeof window !== 'undefined' ? window.location.href : 'https://casslyandmark.com')

  // Always render a placeholder during SSR and initial client render
  if (!isClient) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="w-[200px] h-[200px] bg-gray-100 animate-pulse rounded-lg" />
      </div>
    )
  }

  // Only render the actual QR code after client-side hydration
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <QRCodeSVG
        value={qrValue}
        size={size}
        level="H"
        includeMargin={true}
        className="rounded-lg"
      />
    </div>
  )
}
