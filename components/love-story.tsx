"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { siteContent } from "@/lib/content"

export function LoveStory() {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([])
  const [photos, setPhotos] = useState<Array<{ src: string; alt: string; rotation: number }>>([])

  const timeline = siteContent.loveStory.timeline || []

  // Available background pictures
  const availablePictures = [
    "couple_1.webp",
    "couple_2.webp",
    "couple_3.webp",
    "couple_4.webp",
    "couple_5.webp",
    "couple_6.webp",
    "couple_7.webp",
    "couple_8.webp",
    "couple_9.webp",
    "couple_10.webp",
    "couple_11.webp",
    "couple_12.webp",
    "couple_13.webp",
    "couple_14.webp",
    "couple_15.webp",
    "couple_16.webp",
    "couple_17.webp",
    "couple_18.webp",
    "couple_19.webp",
    "couple_20.webp",
    "couple_21.webp",
    "couple_22.webp",
    "couple_23.webp"
  ].map((src) => `/background_picture/${src}`)

  // Get random unique pictures
  const getRandomPictures = () => {
    // Fisher-Yates shuffle algorithm for better randomness
    const shuffled = [...availablePictures]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, 4).map((src, index) => ({
      src,
      alt: `Wedding photo ${index + 1}`,
      rotation: [-3, 3, 3, -3][index], // Different rotations for each position
    }))
  }

  // Initialize photos on mount
  useEffect(() => {
    setPhotos(getRandomPictures())
  }, [])

  // Rotate random photo every 10 seconds
  useEffect(() => {
    if (photos.length === 0) return

    const interval = setInterval(() => {
      setPhotos((prevPhotos) => {
        // Pick a random position to update (0-3)
        const randomIndex = Math.floor(Math.random() * 4)
        
        // Get all currently used images
        const usedImages = prevPhotos.map((p) => p.src)
        
        // Get available images (excluding currently used ones)
        const available = availablePictures.filter(
          (img) => !usedImages.includes(img)
        )
        
        // If we have available images, use one; otherwise use any random
        const newImage =
          available.length > 0
            ? available[Math.floor(Math.random() * available.length)]
            : availablePictures[Math.floor(Math.random() * availablePictures.length)]
        
        // Create new photos array with the updated image
        const newPhotos = [...prevPhotos]
        newPhotos[randomIndex] = {
          src: newImage,
          alt: `Wedding photo ${randomIndex + 1}`,
          rotation: newPhotos[randomIndex].rotation, // Keep the same rotation
        }
        
        return newPhotos
      })
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [photos.length])

  // Photo Collage Component
  const PhotoCollage = () => {
    // Show loading state if photos not ready
    if (photos.length === 0) {
      return (
        <div className="relative w-full aspect-square flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin"></div>
            <p className="text-ink/50 font-lora text-sm">Loading photos...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full aspect-square">
        <div className="relative w-full h-full">
        {/* Photo 1 - Top Left */}
        <div
          className="absolute top-0 left-0 w-[48%] h-[48%] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
          style={{ transform: `rotate(-3deg)` }}
        >
          <Image
            src={`${photos[0].src}?width=600&height=600&quality=95`}
            alt={photos[0].alt}
            fill
            className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

      {/* Photo 2 - Top Right */}
      <div
        className="absolute top-0 right-0 w-[48%] h-[48%] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
        style={{ transform: `rotate(3deg)` }}
      >
        <Image
          src={`${photos[1].src}?width=600&height=600&quality=95`}
          alt={photos[1].alt}
          fill
          className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Photo 3 - Bottom Left */}
      <div
        className="absolute bottom-0 left-0 w-[48%] h-[48%] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
        style={{ transform: `rotate(3deg)` }}
      >
        <Image
          src={`${photos[2].src}?width=600&height=600&quality=95`}
          alt={photos[2].alt}
          fill
          className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Photo 4 - Bottom Right */}
      <div
        className="absolute bottom-0 right-0 w-[48%] h-[48%] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer group"
        style={{ transform: `rotate(-3deg)` }}
      >
        <Image
          src={`${photos[3].src}?width=600&height=600&quality=95`}
          alt={photos[3].alt}
          fill
          className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      </div>

      {/* Decorative Floral Elements */}
      <div className="absolute -top-8 -left-8 w-32 h-32 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-pink-300">
          <path
            d="M20 50 Q30 30 50 40 Q70 30 80 50 Q70 70 50 60 Q30 70 20 50 Z"
            fill="currentColor"
          />
          <path
            d="M40 50 Q45 40 50 45 Q55 40 60 50 Q55 60 50 55 Q45 60 40 50 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="absolute -bottom-12 -right-12 w-40 h-40 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-teal/40">
          <path
            d="M30 50 Q40 30 60 40 Q80 30 90 50 Q80 70 60 60 Q40 70 30 50 Z"
            fill="currentColor"
          />
          <path
            d="M50 45 Q55 35 60 40 Q65 35 70 45 Q65 55 60 50 Q55 55 50 45 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    )
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    timelineRefs.current.forEach((ref) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in")
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const hasContent = siteContent.loveStory.content.trim()

  return (
    <Section id="love-story" bgColor="cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 lg:mb-24">
          <Heading level="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-teal mb-4 md:mb-6">
            Our Love Story
          </Heading>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-lora mb-6 md:mb-8 max-w-2xl mx-auto" style={{ color: '#49513C' }}>
            A timeless journey of two hearts becoming one
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-pink-300 via-teal to-pink-300 rounded-full"></div>
        </div>

        {/* Main Content */}
        {hasContent ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            {/* Left Column: Love Story Text */}
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-lg border border-ink/5">
                <div className="space-y-4 md:space-y-6">
                  {siteContent.loveStory.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="font-lora text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: '#49513C' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Photo Collage */}
            <div className="order-1 lg:order-2 relative max-w-2xl mx-auto">
              <PhotoCollage />
            </div>
          </div>
        ) : (
          /* Centered Photo Collage Only */
          <div className="flex justify-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div className="relative w-full max-w-2xl">
              <PhotoCollage />
            </div>
          </div>
        )}

        {/* Timeline Section */}
        <div className="mt-16 md:mt-24 lg:mt-32">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-teal mb-3 md:mb-4">
              Our Journey Together
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-lora mb-4 md:mb-6" style={{ color: '#49513C' }}>
              Milestones that shaped our beautiful story
            </p>
            <div className="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-11 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 via-pink-300 to-teal/40 shadow-lg"></div>

            {/* Timeline Events */}
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    timelineRefs.current[index] = el
                  }}
                  className="relative flex items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 transition-all duration-1000 opacity-0 translate-y-8"
                >
                  {/* Timeline Marker */}
                  <div className="relative z-10 flex-shrink-0 mt-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-400 via-pink-300 to-teal rounded-full shadow-lg ring-4 ring-white"></div>
                    <div className="absolute inset-0 bg-pink-400/20 rounded-full animate-ping"></div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-100/80 hover:border-pink-200">
                    {/* Date */}
                    <div className="mb-3 md:mb-4">
                      <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-pink-100 via-pink-50 to-teal/10 rounded-full text-xs sm:text-sm font-semibold text-pink-700 uppercase tracking-wider shadow-sm">
                        {event.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-teal mb-3 md:mb-4">
                      {event.title}
                    </h4>

                    {/* Description */}
                    {event.description && (
                      <p className="leading-relaxed mb-4 md:mb-5 font-lora text-sm sm:text-base md:text-lg" style={{ color: '#49513C' }}>
                        {event.description}
                      </p>
                    )}

                    {/* Quote(s) */}
                    {event.quote && (
                      <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                        {Array.isArray(event.quote) ? (
                          event.quote.map((q, qIndex) => (
                            <div
                              key={qIndex}
                              className="relative pl-4 sm:pl-6 border-l-4 border-pink-300/80 bg-gradient-to-r from-pink-50/50 to-transparent py-2 sm:py-3 pr-3 sm:pr-4 rounded-r-lg"
                            >
                              <p className="italic leading-relaxed font-lora text-sm sm:text-base md:text-lg" style={{ color: '#49513C' }}>
                                "{q}"
                              </p>
                              {Array.isArray(event.author) && event.author[qIndex] && (
                                <p className="text-xs sm:text-sm md:text-base text-teal font-semibold mt-2 sm:mt-3">
                                  — {event.author[qIndex]}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="relative pl-4 sm:pl-6 border-l-4 border-pink-300/80 bg-gradient-to-r from-pink-50/50 to-transparent py-2 sm:py-3 pr-3 sm:pr-4 rounded-r-lg">
                            <p className="italic leading-relaxed font-lora text-sm sm:text-base md:text-lg" style={{ color: '#49513C' }}>
                              "{event.quote}"
                            </p>
                            {event.author && (
                              <p className="text-xs sm:text-sm md:text-base text-teal font-semibold mt-2 sm:mt-3">
                                — {event.author}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12 md:mt-20 lg:mt-28 mb-6 md:mb-8">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg border border-ink/10">
            <p className="font-lora italic text-sm sm:text-base md:text-lg lg:text-xl" style={{ color: '#49513C' }}>
              Our journey continues...
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        :global(img) {
          animation: fadeIn 0.7s ease-in-out;
        }
      `}</style>
    </Section>
  )
}
