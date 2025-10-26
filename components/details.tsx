"use client"

import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { siteContent } from "@/lib/content"
import { MapPin, Clock, Utensils, Car, Shirt, Copy, Check, QrCode, Navigation, ExternalLink, Heart, Calendar, Users, Camera, X, Wind, Wine, Music, CameraOff, Sparkles, Church, Building, ArrowRight, Cake, Mic, Video } from "lucide-react"
import { useState, useEffect } from "react"
import QRCode from "react-qr-code"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageModal) {
        setShowImageModal(null)
      }
    }
    
    if (showImageModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Generate QR code data
  const ceremonyData = `${siteContent.details.ceremony.venue}\n${siteContent.details.ceremony.location}\n${siteContent.details.ceremony.date} at ${siteContent.details.ceremony.time}`
  const receptionData = `${siteContent.details.reception.venue}\n${siteContent.details.reception.location}`

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(`${siteContent.details.ceremony.venue}, ${siteContent.details.ceremony.location}`)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(`${siteContent.details.reception.venue}, ${siteContent.details.reception.location}`)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  // Get icon and color for each timeline event
  const getTimelineIcon = (event: string) => {
    const eventLower = event.toLowerCase()
    if (eventLower.includes('ceremony')) {
      return { icon: Church, color: 'text-green-600', bgColor: 'bg-green-100' }
    } else if (eventLower.includes('photo') || eventLower.includes('shoot')) {
      return { icon: Camera, color: 'text-pink-600', bgColor: 'bg-pink-100' }
    } else if (eventLower.includes('reception')) {
      return { icon: Building, color: 'text-pink-600', bgColor: 'bg-pink-100' }
    } else if (eventLower.includes('dance')) {
      return { icon: Heart, color: 'text-ink', bgColor: 'bg-ink/10' }
    } else if (eventLower.includes('dinner')) {
      return { icon: Utensils, color: 'text-green-600', bgColor: 'bg-green-100' }
    } else if (eventLower.includes('cake')) {
      return { icon: Cake, color: 'text-pink-600', bgColor: 'bg-pink-100' }
    } else if (eventLower.includes('game') || eventLower.includes('speech')) {
      return { icon: Mic, color: 'text-pink-600', bgColor: 'bg-pink-100' }
    } else if (eventLower.includes('edit')) {
      return { icon: Video, color: 'text-green-600', bgColor: 'bg-green-100' }
    } else if (eventLower.includes('band')) {
      return { icon: Music, color: 'text-pink-600', bgColor: 'bg-pink-100' }
    }
    return { icon: Clock, color: 'text-teal', bgColor: 'bg-teal/10' }
  }

  return (
    <Section id="details" bgColor="cream">
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <div className="inline-block mb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-teal/30 to-teal"></div>
            <Heart className="text-teal w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent via-teal/30 to-teal"></div>
          </div>
        </div>
        <Heading level="h2" style={{ color: '#49513C' }}>Event Details</Heading>
        <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-teal/5 via-sand/10 to-teal/5 rounded-2xl p-6 sm:p-8 border border-teal/10 shadow-md">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-teal/20 to-teal/10 p-2.5 rounded-full shadow-sm">
              <Heart className="text-teal" size={20} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#49513C' }}>Join Us in Celebration</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#49513C' }}>
            We can't wait to celebrate with you!
          </p>
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        {/* Ceremony */}
        <div 
          className="bg-gradient-to-br from-white via-sand/5 to-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg border border-teal/10 hover:border-teal/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('ceremony')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal/10 via-teal/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-teal/5 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-teal/10 via-teal/15 to-teal/20 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'ceremony' ? 'bg-teal/25 scale-110 rotate-[3deg]' : ''}`}>
                <Heart className="text-teal w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#49513C' }}>Ceremony</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="p-2 sm:p-2.5 text-teal/70 hover:text-teal hover:bg-gradient-to-br hover:from-teal/10 hover:to-teal/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Open in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(ceremonyData, 'ceremony')}
                className="p-2 sm:p-2.5 text-teal/70 hover:text-teal hover:bg-gradient-to-br hover:from-teal/10 hover:to-teal/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Copy ceremony details"
              >
                {copiedItems.has('ceremony') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6">
            <p className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: '#49513C' }}>{siteContent.details.ceremony.venue}</p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: '#49513C' }}>{siteContent.details.ceremony.location}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base" style={{ color: '#49513C' }}>
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal flex-shrink-0" />
              <span>
                {siteContent.details.ceremony.date} at {siteContent.details.ceremony.time}
              </span>
            </div>
          </div>

          {/* Ceremony Image */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-teal/10 group-hover:border-teal/20"
              onClick={() => setShowImageModal('ceremony')}
            >
              <Image
                src="/EvenDetails/NationalShrine.png"
                alt="National Shrine of St. Joseph - Ceremony Venue"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                    <Camera className="text-teal w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-white to-sand/10 p-3 sm:p-3.5 md:p-4 rounded-2xl border border-teal/20 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <QRCode
                value={ceremonyData}
                size={80}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              <p className="text-xs text-center mt-2 font-medium" style={{ color: '#49513C', opacity: 0.6 }}>Scan for details</p>
            </div>
          </div>
        </div>

        {/* Reception */}
        <div 
          className="bg-gradient-to-br from-white via-sand/5 to-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg border border-teal/10 hover:border-teal/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('reception')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal/10 via-teal/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-teal/5 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-teal/10 via-teal/15 to-teal/20 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'reception' ? 'bg-teal/25 scale-110 rotate-[3deg]' : ''}`}>
                <Utensils className="text-teal w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#49513C' }}>Reception</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="p-2 sm:p-2.5 text-teal/70 hover:text-teal hover:bg-gradient-to-br hover:from-teal/10 hover:to-teal/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Open in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(receptionData, 'reception')}
                className="p-2 sm:p-2.5 text-teal/70 hover:text-teal hover:bg-gradient-to-br hover:from-teal/10 hover:to-teal/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Copy reception details"
              >
                {copiedItems.has('reception') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6">
            <p className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: '#49513C' }}>{siteContent.details.reception.venue}</p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: '#49513C' }}>{siteContent.details.reception.location}</p>
          </div>

          {/* Reception Image */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-teal/10 group-hover:border-teal/20"
              onClick={() => setShowImageModal('reception')}
            >
              <Image
                src="/EvenDetails/ChateaubytheSea.png"
                alt="Chateau by the Sea - Reception Venue"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                    <Camera className="text-teal w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-white to-sand/10 p-3 sm:p-3.5 md:p-4 rounded-2xl border border-teal/20 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <QRCode
                value={receptionData}
                size={80}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              <p className="text-xs text-center mt-2 font-medium" style={{ color: '#49513C', opacity: 0.6 }}>Scan for details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent to-teal/30" />
            <div className="bg-teal/10 p-3 rounded-full">
              <Users className="text-teal w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="hidden sm:block h-px w-8 bg-gradient-to-l from-transparent to-teal/30" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#49513C' }}>Important Information</h3>
          <p className="text-sm sm:text-base" style={{ color: '#49513C', opacity: 0.6 }}>Everything you need to know</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Dress Code */}
        <div className="bg-gradient-to-br from-white via-sand/10 to-white rounded-2xl p-5 sm:p-6 md:p-7 border border-teal/10 hover:border-teal/30 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <div className="bg-teal/10 p-2 rounded-full">
              <Shirt className="text-teal w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-base sm:text-lg" style={{ color: '#49513C' }}>Dress Code</h4>
          </div>
          <div className="mb-3">
            <span className="text-xs sm:text-sm font-semibold text-teal bg-teal/10 px-3 py-1.5 rounded-full">{siteContent.details.dressCode.theme}</span>
          </div>
          <div className="space-y-3 text-sm" style={{ color: '#49513C' }}>
            <div className="bg-gradient-to-br from-white to-sand/30 rounded-xl p-4 border border-sand/20 shadow-sm">
              <p className="font-semibold mb-2 text-sm" style={{ color: '#49513C' }}>Principal Sponsors:</p>
              <p className="text-xs sm:text-sm mb-1" style={{ color: '#49513C', opacity: 0.8 }}>Ninong: {siteContent.details.dressCode.sponsors.groom}</p>
              <p className="text-xs sm:text-sm mb-3" style={{ color: '#49513C', opacity: 0.8 }}>Ninang: {siteContent.details.dressCode.sponsors.bride}</p>
              
              {/* Color Palette for Sponsors */}
              <div className="mt-2">
                <p className="text-xs font-medium mb-1.5" style={{ color: '#49513C' }}>Suggested Colors:</p>
                <div className="flex gap-1.5 flex-wrap">
                  {siteContent.details.dressCode.sponsors.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full shadow-sm ring-1 ring-white/30"
                      style={{ backgroundColor: color, border: '2px solid #49513C' }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-sand/30 rounded-xl p-4 border border-sand/20 shadow-sm">
              <p className="font-semibold mb-2 text-sm" style={{ color: '#49513C' }}>Guests:</p>
              <p className="text-xs sm:text-sm mb-1" style={{ color: '#49513C', opacity: 0.8 }}>Gentlemen: {siteContent.details.dressCode.guests.gentlemen}</p>
              <p className="text-xs sm:text-sm mb-2" style={{ color: '#49513C', opacity: 0.8 }}>Ladies: {siteContent.details.dressCode.guests.ladies}</p>
              <p className="text-xs sm:text-sm font-semibold mb-2" style={{ color: '#49513C', opacity: 0.8 }}>⚠️ {siteContent.details.dressCode.guests.note}</p>
              
              {/* Color Palette for Guests */}
              <div className="mt-2">
                <p className="text-xs font-medium mb-1.5" style={{ color: '#49513C' }}>Suggested Colors:</p>
                <div className="flex gap-1.5 flex-wrap">
                  {siteContent.details.dressCode.guests.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full shadow-sm ring-1 ring-white/30"
                      style={{ backgroundColor: color, border: '2px solid #49513C' }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Color Request Note */}
            <div className="bg-gradient-to-r from-teal/10 via-teal/15 to-teal/10 rounded-xl p-4 border border-teal/30 shadow-sm">
              <p className="text-xs sm:text-sm font-medium" style={{ color: '#49513C', opacity: 0.8 }}>
                {siteContent.details.dressCode.colorRequest}
              </p>
            </div>
          </div>
        </div>

        {/* Travel & Comfort - Combined */}
        <div className="bg-gradient-to-br from-white via-sand/10 to-white rounded-2xl p-5 sm:p-6 md:p-7 border border-teal/10 hover:border-teal/30 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 relative z-10">
            <div className="bg-accent/10 p-2 rounded-full">
              <CameraOff className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-base sm:text-lg" style={{ color: '#49513C' }}>Important Reminders</h4>
          </div>
          <div className="space-y-3">
            {/* Travel Section */}
            <div className="bg-gradient-to-br from-white to-sand/30 rounded-xl p-4 border border-sand/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="font-semibold mb-2 text-sm flex items-center gap-2" style={{ color: '#49513C' }}>
                <Car className="w-4 h-4 text-teal" />
                Parking & Transportation
              </p>
              <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: '#49513C', opacity: 0.7 }}>
                Ample parking is available at both venues. We recommend arriving 15-20 minutes early.
              </p>
              <p className="text-xs font-medium" style={{ color: '#49513C', opacity: 0.6 }}>
                💡 Book transportation in advance for a stress-free day
              </p>
            </div>

            {/* Weather Section */}
            <div className="bg-gradient-to-br from-white to-sand/30 rounded-xl p-4 border border-sand/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="font-semibold mb-2 text-sm flex items-center gap-2" style={{ color: '#49513C' }}>
                <Wind className="w-4 h-4 text-teal" />
                Weather
              </p>
              <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: '#49513C', opacity: 0.7 }}>
                February in Cebu is warm and sunny. Dress comfortably while maintaining the formal attire guidelines.
              </p>
              <p className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#49513C', opacity: 0.6 }}>
                <span className="text-base">🌞</span>
                <span>Fans provided at reception</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-sand/30 rounded-xl p-4 border border-sand/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#49513C' }}>
                <CameraOff className="w-4 h-4 text-accent" />
                Unplugged Ceremony
              </p>
              <p className="text-xs" style={{ color: '#49513C', opacity: 0.7 }}>
                Please keep our ceremony camera-free. We've hired professional photographers to capture our special moments.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-sand/30 rounded-xl p-4 border border-sand/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#49513C' }}>
                <Users className="w-4 h-4 text-teal" />
                Color Coordination
              </p>
              <p className="text-xs" style={{ color: '#49513C', opacity: 0.7 }}>
                We kindly request guests to wear our suggested color palette for our special day.
              </p>
            </div>
          </div>
        </div>

        {/* Important Reminders */}

        </div>
      </div>

      {/* Additional Service Info */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent to-teal/30" />
            <div className="bg-teal/10 p-3 rounded-full">
              <Utensils className="text-teal w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="hidden sm:block h-px w-8 bg-gradient-to-l from-transparent to-teal/30" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#49513C' }}>Special Amenities</h3>
          <p className="text-sm sm:text-base" style={{ color: '#49513C', opacity: 0.6 }}>Everything you need for a perfect celebration</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {/* Fans */}
          <div className="bg-gradient-to-br from-white via-sand/5 to-white rounded-2xl p-5 sm:p-6 border border-teal/10 hover:border-teal/30 hover:shadow-xl hover:scale-[1.03] transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-teal/20 via-teal/15 to-teal/10 p-4 rounded-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Wind className="text-teal w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl mb-3" style={{ color: '#49513C' }}>Fans Provided</h4>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#49513C', opacity: 0.7 }}>
                {siteContent.details.additionalInfo.fans}
              </p>
            </div>
          </div>

          {/* Drinks */}
          <div className="bg-gradient-to-br from-white via-sand/5 to-white rounded-2xl p-5 sm:p-6 border border-teal/10 hover:border-teal/30 hover:shadow-xl hover:scale-[1.03] transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-teal/20 via-teal/15 to-teal/10 p-4 rounded-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Wine className="text-teal w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl mb-3" style={{ color: '#49513C' }}>Drinks Available</h4>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#49513C', opacity: 0.7 }}>
                {siteContent.details.additionalInfo.drinks}
              </p>
            </div>
          </div>

          {/* Live Band */}
          <div className="bg-gradient-to-br from-white via-sand/5 to-white rounded-2xl p-5 sm:p-6 border border-teal/10 hover:border-teal/30 hover:shadow-xl hover:scale-[1.03] transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-teal/20 via-teal/15 to-teal/10 p-4 rounded-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Music className="text-teal w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl mb-3" style={{ color: '#49513C' }}>Live Band</h4>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#49513C', opacity: 0.7 }}>
                {siteContent.details.additionalInfo.liveBand}
              </p>
            </div>
          </div>

          {/* Unplugged Notice */}
          <div className="bg-gradient-to-br from-white via-accent/5 to-white rounded-2xl p-5 sm:p-6 border border-accent/10 hover:border-accent/40 hover:shadow-xl hover:scale-[1.03] transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 p-4 rounded-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <CameraOff className="text-accent w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl mb-3" style={{ color: '#49513C' }}>Unplugged</h4>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#49513C', opacity: 0.7 }}>
                {siteContent.details.additionalInfo.unplugged}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Timeline - Moved to End */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <div className="text-center mb-8 sm:mb-12">
          {/* Glass Header Card */}
          <div 
            className="inline-block mb-6 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-teal/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              boxShadow: '0 8px 32px rgba(73, 81, 60, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
            }}
          >
            {/* <div className="inline-flex items-center gap-3 mb-4">
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-transparent to-[#49513C]/30" />
              <div 
                className="p-4 rounded-full shadow-lg backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(73, 81, 60, 0.15), rgba(73, 81, 60, 0.08))',
                  boxShadow: '0 4px 16px rgba(73, 81, 60, 0.3), inset 0 1px 1px rgba(255,255,255,0.5)'
                }}
              >
                <Sparkles style={{ color: '#49513C' }} className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="hidden sm:block h-px w-12 bg-gradient-to-l from-transparent to-[#49513C]/30" />
            </div> */}
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight"
              style={{ color: '#49513C' }}
            >
              Wedding Day Timeline
            </h3>
            <p className="text-sm sm:text-base font-medium" style={{ color: '#49513C', opacity: 0.7 }}>Join us for this special day</p>
          </div>
        </div>
        
        {/* Enhanced Alternating Timeline with Glass Effect */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Central Timeline Line - Glass Effect */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-1 h-full hidden md:block"
            style={{
              background: 'linear-gradient(180deg, #49513C 0%, rgba(73, 81, 60, 0.6) 50%, rgba(73, 81, 60, 0.3) 100%)',
              boxShadow: '0 0 20px rgba(73, 81, 60, 0.3), inset 0 0 10px rgba(73, 81, 60, 0.2)'
            }}
          />
          
          {/* Glow Line Effect */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-2 h-full hidden md:block opacity-30 blur-sm"
            style={{ background: 'linear-gradient(180deg, #49513C, transparent)' }}
          />
          
          {/* Decorative Ornaments */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-3 border-white shadow-2xl hidden md:block" 
            style={{ top: '5%', backgroundColor: '#49513C', boxShadow: '0 0 20px rgba(73, 81, 60, 0.5)' }} 
          />
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-3 border-white shadow-2xl hidden md:block" 
            style={{ top: '30%', backgroundColor: '#49513C', boxShadow: '0 0 20px rgba(73, 81, 60, 0.5)' }} 
          />
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-3 border-white shadow-2xl hidden md:block" 
            style={{ top: '60%', backgroundColor: '#49513C', boxShadow: '0 0 20px rgba(73, 81, 60, 0.5)' }} 
          />
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-3 border-white shadow-2xl hidden md:block" 
            style={{ top: '95%', backgroundColor: '#49513C', boxShadow: '0 0 20px rgba(73, 81, 60, 0.5)' }} 
          />
          
          <div className="space-y-8 md:space-y-12 relative">
            {siteContent.details.timeline.map((item, index) => {
              const isRight = index % 2 === 1
              const { icon: Icon, color, bgColor } = getTimelineIcon(item.event)
              
              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0 animate-in fade-in slide-in-from-bottom-4 duration-700 ${
                    isRight ? 'md:flex-row-reverse' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Card - Glass Morphism */}
                  <div 
                    className={`md:w-[45%] ml-8 md:ml-0 ${
                      isRight ? 'md:ml-auto' : 'md:mr-auto'
                    } bg-white/70 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border border-white/50 group relative overflow-hidden`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                      boxShadow: '0 8px 32px rgba(73, 81, 60, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
                    }}
                  >
                    {/* Gradient Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${isRight ? 'from-[#49513C]/20 to-pink-200/30' : 'from-[#49513C]/20 to-green-200/30'} rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500`} />
                    
                    {/* Decorative Accent */}
                    <div 
                      className={`absolute top-0 ${isRight ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-br from-[#49513C]/10 to-transparent rounded-br-full md:rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} 
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className={`backdrop-blur-md p-3 rounded-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                          style={{
                            background: `linear-gradient(135deg, ${bgColor}, ${bgColor.replace('100', '80')})`
                          }}
                        >
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
                        </div>
                        <div 
                          className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md border border-white/50"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
                          }}
                        >
                          <Clock className="w-4 h-4" style={{ color: '#49513C' }} />
                          <span className="font-bold text-sm sm:text-base" style={{ color: '#49513C' }}>{item.time}</span>
                        </div>
                      </div>
                      
                      <h4 
                        className="font-bold text-xl sm:text-2xl mb-3 group-hover:tracking-wide transition-all duration-300"
                        style={{ color: '#49513C' }}
                      >
                        {item.event}
                      </h4>
                      
                      {item.location && (
                        <p className="text-sm sm:text-base text-ink/80 flex items-center gap-1.5 font-medium">
                          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#49513C' }} />
                          <span>{item.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Central Dot - Desktop Only - Glass Effect */}
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 hidden md:block z-20">
                    <div className="relative">
                      {/* Main Dot */}
                      <div 
                        className="w-12 h-12 rounded-full backdrop-blur-xl border-3 border-white shadow-2xl group-hover:scale-125 transition-all duration-300 group-hover:shadow-3xl"
                        style={{
                          background: index % 2 === 0 
                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0.6))'
                            : 'linear-gradient(135deg, #49513C, rgba(73, 81, 60, 0.8))',
                          boxShadow: '0 8px 32px rgba(73, 81, 60, 0.4), inset 0 1px 2px rgba(255,255,255,0.3), 0 0 20px rgba(73, 81, 60, 0.3)'
                        }}
                      />
                      {/* Pulsing Ring */}
                      <div 
                        className={`absolute inset-0 rounded-full animate-ping group-hover:animate-none`}
                        style={{
                          background: index % 2 === 0 
                            ? 'rgba(16, 185, 129, 0.3)'
                            : 'rgba(73, 81, 60, 0.3)'
                        }}
                      />
                      {/* Inner Glow */}
                      <div 
                        className="absolute inset-1 rounded-full"
                        style={{
                          background: index % 2 === 0
                            ? 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Mobile Timeline - Enhanced */}
                  <div className="absolute left-0 top-0 bottom-0 md:hidden">
                    {/* Timeline Line */}
                    <div 
                      className="w-1.5 bg-gradient-to-b from-[#49513C] via-[#49513C]/80 to-sand/30 rounded-full h-full"
                      style={{ boxShadow: '0 0 10px rgba(73, 81, 60, 0.3)' }}
                    />
                    {/* Animated Dot */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-2xl animate-pulse"
                      style={{ 
                        backgroundColor: '#49513C',
                        boxShadow: '0 4px 20px rgba(73, 81, 60, 0.6), 0 0 0 2px rgba(255,255,255,0.5), inset 0 1px 2px rgba(255,255,255,0.4)'
                      }}
                    />
                    {/* Glow Effect */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full blur-sm opacity-40"
                      style={{ background: 'radial-gradient(circle, #49513C, transparent)' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div 
            className="relative max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white to-sand/10 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 animate-in zoom-in-95 duration-500 group relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Gradient overlay on card */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal/0 via-transparent to-pink/0 opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
            
            {/* Close button - Enhanced */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 bg-white/95 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border border-white/30 group/close"
              title="Close (ESC)"
              style={{ color: '#49513C' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Image container with enhanced effects */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-br from-sand/5 via-white/80 to-sand/10">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <Image
                src={showImageModal === 'ceremony' ? "/EvenDetails/NationalShrine.png" : "/EvenDetails/ChateaubytheSea.png"}
                alt={showImageModal === 'ceremony' ? "National Shrine of St. Joseph - Ceremony Venue" : "Chateau by the Sea - Reception Venue"}
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                sizes="95vw"
                priority
              />

              {/* Floating badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/30">
                {showImageModal === 'ceremony' ? (
                  <>
                    <Church className="w-4 h-4" style={{ color: '#49513C' }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#49513C' }}>Ceremony Venue</span>
                  </>
                ) : (
                  <>
                    <Building className="w-4 h-4" style={{ color: '#49513C' }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#49513C' }}>Reception Venue</span>
                  </>
                )}
              </div>
            </div>

            {/* Footer section - Enhanced */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t border-teal/10 relative">
              {/* Decorative dots */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2" style={{ color: '#49513C' }}>
                      {showImageModal === 'ceremony' ? siteContent.details.ceremony.venue : siteContent.details.reception.venue}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base flex items-center gap-1.5" style={{ color: '#49513C', opacity: 0.7 }}>
                      <MapPin className="w-3.5 h-3.5" style={{ color: '#49513C' }} />
                      {showImageModal === 'ceremony' ? siteContent.details.ceremony.location : siteContent.details.reception.location}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Copy address button */}
                    <button
                      onClick={() => copyToClipboard(
                        showImageModal === 'ceremony' 
                          ? `${siteContent.details.ceremony.venue}, ${siteContent.details.ceremony.location}` 
                          : `${siteContent.details.reception.venue}, ${siteContent.details.reception.location}`,
                        `modal-${showImageModal}`
                      )}
                      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-teal/5 hover:bg-teal/10 text-teal rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 border border-teal/10"
                      title="Copy address"
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>

                    {/* Google Maps button */}
                    <button
                      onClick={() => openInMaps(showImageModal === 'ceremony' ? ceremonyMapsLink : receptionMapsLink)}
                      className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-teal to-teal/90 hover:from-teal/90 hover:to-teal text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Open Maps</span>
                      <span className="sm:hidden">Maps</span>
                    </button>
                  </div>
                </div>

                {/* Time information for ceremony */}
                {showImageModal === 'ceremony' && siteContent.details.ceremony.date && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal/5 to-teal/10 rounded-xl border border-teal/10">
                    <Clock className="w-4 h-4" style={{ color: '#49513C' }} />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold" style={{ color: '#49513C' }}>
                        {siteContent.details.ceremony.date} at {siteContent.details.ceremony.time}
                      </p>
                    </div>
                  </div>
                )}

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs" style={{ color: '#49513C', opacity: 0.6 }}>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" style={{ color: '#49513C' }} />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">
                    Press ESC to close
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
