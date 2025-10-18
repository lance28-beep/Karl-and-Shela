"use client"

import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { siteContent } from "@/lib/content"
import { MapPin, Clock, Utensils, Car, Shirt, Phone, Copy, Check, QrCode, Navigation, ExternalLink, Heart, Calendar, Users, Camera, X } from "lucide-react"
import { useState } from "react"
import QRCode from "react-qr-code"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

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
  const rsvpData = `RSVP: ${siteContent.details.rsvp.contact}\nPhone: ${siteContent.details.rsvp.phone}\nDeadline: ${siteContent.details.rsvp.deadline}`

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(`${siteContent.details.ceremony.venue}, ${siteContent.details.ceremony.location}`)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(`${siteContent.details.reception.venue}, ${siteContent.details.reception.location}`)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" bgColor="cream">
      <div className="text-center mb-12">
        <Heading level="h2">Event Details</Heading>
        <div className="mt-6 bg-gradient-to-r from-teal/10 to-sand/20 rounded-xl p-4 sm:p-6 border border-teal/20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-teal/20 p-2 rounded-full">
              <Heart className="text-teal" size={18} />
            </div>
            <h3 className="text-lg sm:text-xl font-playfair font-bold text-ink">Join Us in Celebration</h3>
          </div>
          <div className="text-sm text-ink/60 font-lora">
            We can't wait to celebrate with you!
          </div>
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {/* Ceremony */}
        <div 
          className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-sand/20 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] lg:hover:scale-[1.02] hover:-translate-y-1"
          onMouseEnter={() => setHoveredCard('ceremony')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className={`bg-teal/10 p-2 sm:p-3 rounded-full transition-all duration-300 ${hoveredCard === 'ceremony' ? 'bg-teal/20 scale-110' : ''}`}>
                <Heart className="text-teal w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-ink">Ceremony</h3>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="p-2 text-teal/70 hover:text-teal hover:bg-teal/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                title="Open in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(ceremonyData, 'ceremony')}
                className="p-2 text-teal/70 hover:text-teal hover:bg-teal/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                title="Copy ceremony details"
              >
                {copiedItems.has('ceremony') ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-3 mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-lora text-ink font-semibold">{siteContent.details.ceremony.venue}</p>
            <p className="text-sm sm:text-base text-ink/70 font-lora leading-relaxed">{siteContent.details.ceremony.location}</p>
            <div className="flex items-center gap-2 text-sm sm:text-base text-ink/70 font-lora">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal flex-shrink-0" />
              <span>
                {siteContent.details.ceremony.date} at {siteContent.details.ceremony.time}
              </span>
            </div>
          </div>

          {/* Ceremony Image */}
          <div className="mb-4 sm:mb-6">
            <div 
              className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden shadow-md cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]"
              onClick={() => setShowImageModal('ceremony')}
            >
              <Image
                src="/EvenDetails/AltaDChapel.png"
                alt="Capilla De San Antonio De Padua - Ceremony Venue"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-3 sm:p-4 rounded-lg border-2 border-sand/30">
              <QRCode
                value={ceremonyData}
                size={100}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              <p className="text-xs text-ink/50 text-center mt-1 sm:mt-2 font-lora">Scan for details</p>
            </div>
          </div>
        </div>

        {/* Reception */}
        <div 
          className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-sand/20 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] lg:hover:scale-[1.02] hover:-translate-y-1"
          onMouseEnter={() => setHoveredCard('reception')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className={`bg-teal/10 p-2 sm:p-3 rounded-full transition-all duration-300 ${hoveredCard === 'reception' ? 'bg-teal/20 scale-110' : ''}`}>
                <Utensils className="text-teal w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-ink">Reception</h3>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="p-2 text-teal/70 hover:text-teal hover:bg-teal/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                title="Open in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(receptionData, 'reception')}
                className="p-2 text-teal/70 hover:text-teal hover:bg-teal/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                title="Copy reception details"
              >
                {copiedItems.has('reception') ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-3 mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-lora text-ink font-semibold">{siteContent.details.reception.venue}</p>
            <p className="text-sm sm:text-base text-ink/70 font-lora leading-relaxed">{siteContent.details.reception.location}</p>
          </div>

          {/* Reception Image */}
          <div className="mb-4 sm:mb-6">
            <div 
              className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden shadow-md cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]"
              onClick={() => setShowImageModal('reception')}
            >
              <Image
                src="/EvenDetails/AlteDHotel.png"
                alt="Alta D' Tagaytay Hotel - Reception Venue"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-3 sm:p-4 rounded-lg border-2 border-sand/30">
              <QRCode
                value={receptionData}
                size={100}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              <p className="text-xs text-ink/50 text-center mt-1 sm:mt-2 font-lora">Scan for details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Dress Code */}
        <div className="bg-gradient-to-br from-sand/20 to-sand/40 rounded-xl p-4 sm:p-6 border border-sand/30 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-teal/10 p-2 rounded-full">
              <Shirt className="text-teal w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-playfair font-bold text-base sm:text-lg text-ink">Dress Code</h4>
          </div>
          <div className="space-y-2 sm:space-y-3 text-sm text-ink/70 font-lora">
            <div className="bg-white/50 rounded-lg p-2 sm:p-3">
              <p className="font-semibold text-ink mb-1 text-xs sm:text-sm">Sponsors:</p>
              <p className="text-xs">Ninong: {siteContent.details.dressCode.sponsors.groom}</p>
              <p className="text-xs">Ninang: {siteContent.details.dressCode.sponsors.bride}</p>
            </div>
            <div className="bg-white/50 rounded-lg p-2 sm:p-3">
              <p className="font-semibold text-ink mb-1 text-xs sm:text-sm">Guests:</p>
              <p className="text-xs">Gentlemen: {siteContent.details.dressCode.guests.gentlemen}</p>
              <p className="text-xs">Ladies: {siteContent.details.dressCode.guests.ladies}</p>
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-gradient-to-br from-sand/20 to-sand/40 rounded-xl p-4 sm:p-6 border border-sand/30 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-teal/10 p-2 rounded-full">
              <Car className="text-teal w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-playfair font-bold text-base sm:text-lg text-ink">Travel & Parking</h4>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm text-ink/70 font-lora leading-relaxed">
              Ample parking is available at both venues. We recommend arriving 15-20 minutes early to allow time for
              parking and seating.
            </p>
            <div className="bg-white/50 rounded-lg p-2 sm:p-3">
              <p className="text-xs text-ink/60 font-lora">
                💡 Tip: Book transportation in advance for a stress-free day
              </p>
            </div>
          </div>
        </div>

        {/* RSVP Contact */}
        <div className="bg-gradient-to-br from-sand/20 to-sand/40 rounded-xl p-4 sm:p-6 border border-sand/30 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-teal/10 p-2 rounded-full">
                <Phone className="text-teal w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="font-playfair font-bold text-base sm:text-lg text-ink">RSVP Info</h4>
            </div>
            <button
              onClick={() => copyToClipboard(rsvpData, 'rsvp')}
              className="p-2 text-teal/70 hover:text-teal hover:bg-teal/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
              title="Copy RSVP details"
            >
              {copiedItems.has('rsvp') ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            <div className="bg-white/50 rounded-lg p-2 sm:p-3">
              <div className="space-y-1 text-xs sm:text-sm text-ink/70 font-lora">
                <p><strong className="text-ink">Deadline:</strong> {siteContent.details.rsvp.deadline}</p>
                <p><strong className="text-ink">Contact:</strong> {siteContent.details.rsvp.contact}</p>
                <p><strong className="text-ink">Phone:</strong> {siteContent.details.rsvp.phone}</p>
              </div>
            </div>
          </div>
          
          {/* QR Code for RSVP */}
          <div className="flex justify-center">
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-sand/40">
              <QRCode
                value={rsvpData}
                size={60}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="mt-8 sm:mt-12">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-playfair font-bold text-ink mb-2">Find Us in Tagaytay</h3>
          <p className="text-sm sm:text-base text-ink/70 font-lora">Beautiful venues in Tagaytay City</p>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-sand/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.8234567890123!2d120.95!3d14.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTagaytay%20City!5e0!3m2!1sen!2sph!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venues in Tagaytay City"
            className="w-full"
          />
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setShowImageModal(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white text-ink p-2 rounded-full shadow-lg transition-colors active:scale-95"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src={showImageModal === 'ceremony' ? "/EvenDetails/AltaDChapel.png" : "/EvenDetails/AlteDHotel.png"}
                alt={showImageModal === 'ceremony' ? "Capilla De San Antonio De Padua - Ceremony Venue" : "Alta D' Tagaytay Hotel - Reception Venue"}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </div>
            <div className="p-4 sm:p-6 bg-white">
              <h3 className="text-lg sm:text-xl font-playfair font-bold text-ink mb-2">
                {showImageModal === 'ceremony' ? siteContent.details.ceremony.venue : siteContent.details.reception.venue}
              </h3>
              <p className="text-sm sm:text-base text-ink/70 font-lora">
                {showImageModal === 'ceremony' ? siteContent.details.ceremony.location : siteContent.details.reception.location}
              </p>
              <button
                onClick={() => openInMaps(showImageModal === 'ceremony' ? ceremonyMapsLink : receptionMapsLink)}
                className="mt-3 flex items-center gap-2 text-teal hover:text-teal/80 font-lora text-sm transition-colors"
              >
                <Navigation size={16} />
                Open in Maps
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
