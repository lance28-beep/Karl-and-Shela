"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import DomeGallery from "@/components/dome-gallery"

export function Gallery() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [loadedImages, setLoadedImages] = useState(0)

  const galleryImages = [
    { src: "/CoupleImage/couple_1.png", alt: "Casslyn and Mark sharing a tender moment together" },
    { src: "/CoupleImage/couple_2.png", alt: "Intimate couple portrait capturing their connection" },
    { src: "/CoupleImage/couple_3.png", alt: "Joyful moment of Casslyn and Mark laughing together" },
    { src: "/CoupleImage/couple_4.png", alt: "Romantic couple photo with beautiful natural lighting" },
    { src: "/CoupleImage/couple_5.png", alt: "Sweet embrace between Casslyn and Mark" },
    { src: "/CoupleImage/couple_6.png", alt: "Golden hour portrait of the couple together" },
    { src: "/CoupleImage/couple_7.png", alt: "Candid moment of Casslyn and Mark enjoying each other's company" },
    { src: "/CoupleImage/couple_8.png", alt: "Adorable couple photo showing their happiness" },
    { src: "/CoupleImage/couple_9.png", alt: "Tender moment between Casslyn and Mark" },
    { src: "/CoupleImage/couple_10.png", alt: "Loving couple portrait with warm smiles" },
    { src: "/CoupleImage/couple_11.png", alt: "Romantic couple moment captured beautifully" },
    { src: "/CoupleImage/couple_12.png", alt: "Beautiful photo of Casslyn and Mark together" },
    { src: "/CoupleImage/couple_13.png", alt: "Heartfelt moment from Casslyn and Mark's journey" },
    { src: "/CoupleImage/couple_14.png", alt: "Sweet couple photo filled with love and joy" },
    { src: "/CoupleImage/couple_15.png", alt: "Cherished memory of Casslyn and Mark together" },
    { src: "/CoupleImage/couple_16.png", alt: "Beautiful photo of Casslyn and Mark together" },
    { src: "/CoupleImage/couple_17.png", alt: "Heartfelt moment from Casslyn and Mark's journey" },
    { src: "/CoupleImage/couple_18.png", alt: "Sweet couple photo filled with love and joy" },
    { src: "/CoupleImage/couple_19.png", alt: "Cherished memory of Casslyn and Mark together" },
    { src: "/CoupleImage/couple_20.png", alt: "Beautiful photo of Casslyn and Mark together" },
    { src: "/CoupleImage/couple_21.png", alt: "Heartfelt moment from Casslyn and Mark's journey" },
  ]

  useEffect(() => {
    // Hide instructions after 5 seconds
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 5000)

    // Preload images
    const preloadImages = async () => {
      try {
        const imagePromises = galleryImages.map((image) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
              setLoadedImages(prev => prev + 1)
              resolve()
            }
            img.onerror = () => {
              console.warn(`Failed to load image: ${image.src}`)
              setLoadedImages(prev => prev + 1)
              resolve() // Continue even if some images fail
            }
            img.src = image.src
          })
        })

        await Promise.all(imagePromises)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error preloading images:', error)
        setHasError(true)
        setIsLoaded(true) // Still show gallery even if preloading fails
      }
    }

    preloadImages()

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Section id="gallery" bgColor="white">
      <div className="text-center mb-16">
        <Heading level="h2">Our Gallery</Heading>
        <p className="text-lg text-foreground/70 mb-6 max-w-3xl mx-auto leading-relaxed">
          Welcome to our little corner of happiness—a collection of stolen moments, spontaneous adventures, and quiet togetherness. 
          These photos capture the magic of ordinary days made extraordinary by love.
        </p>
        <p className="text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          From cozy dates to sunset strolls, each image holds a piece of our story, a memory of laughter shared and dreams whispered. 
          These aren't just pictures; they're fragments of our beautiful journey, frozen in time.
        </p>
      </div>

      {/* Interactive Instructions */}
      {showInstructions && (
        <div className="mb-8 flex justify-center px-4">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-sm animate-fade-in max-w-md">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-rose-700">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="font-medium">Drag to explore • Tap to enlarge</span>
              <button 
                onClick={() => setShowInstructions(false)}
                className="ml-2 text-rose-500 hover:text-rose-600 transition-colors text-sm"
                aria-label="Close instructions"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Container with Enhanced Styling */}
      <div className="relative">
        {/* Loading State */}
        {!isLoaded && (
          <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-gray-300 border-t-rose-400 mb-4"></div>
              <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">Loading our memories...</p>
              <div className="w-32 sm:w-48 bg-gray-200 rounded-full h-2 mx-auto">
                <div 
                  className="bg-gradient-to-r from-rose-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(loadedImages / galleryImages.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                {loadedImages} of {galleryImages.length} images loaded
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center border border-red-200">
            <div className="text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-700 font-medium mb-2 text-sm sm:text-base">Some images couldn't be loaded</p>
              <p className="text-red-600 text-xs sm:text-sm mb-4">Don't worry, the gallery will still work with available images</p>
              <button 
                onClick={() => {
                  setHasError(false)
                  setIsLoaded(false)
                  setLoadedImages(0)
                  // Retry loading
                  setTimeout(() => {
                    const preloadImages = async () => {
                      try {
                        const imagePromises = galleryImages.map((image) => {
                          return new Promise<void>((resolve) => {
                            const img = new Image()
                            img.onload = () => {
                              setLoadedImages(prev => prev + 1)
                              resolve()
                            }
                            img.onerror = () => {
                              setLoadedImages(prev => prev + 1)
                              resolve()
                            }
                            img.src = image.src
                          })
                        })
                        await Promise.all(imagePromises)
                        setIsLoaded(true)
                      } catch (error) {
                        setHasError(true)
                        setIsLoaded(true)
                      }
                    }
                    preloadImages()
                  }, 100)
                }}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Main Gallery */}
        <div 
          className={`w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            background: 'linear-gradient(135deg, #fef7f0 0%, #fdf2f8 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <DomeGallery
            images={galleryImages}
            fit={0.6}
            minRadius={400}
            maxRadius={800}
            overlayBlurColor="#f5f1ed"
            imageBorderRadius="16px"
            openedImageBorderRadius="20px"
            grayscale={false}
            dragSensitivity={25}
            enlargeTransitionMs={500}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60 animate-float"></div>
        <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -right-4 sm:-right-8 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Footer Text */}
      <div className="mt-12 text-center">
        <p className="text-sm text-foreground/50 italic max-w-xl mx-auto">
          "Photography is the art of observation. It's about finding something interesting in an ordinary place." 
          <br />
          <span className="text-xs mt-2 block">— These moments are our ordinary places made extraordinary</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </Section>
  )
}
