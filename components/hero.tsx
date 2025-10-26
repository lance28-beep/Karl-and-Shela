"use client"

import { useEffect, useState } from "react"

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const backgroundImages = Array.from({ length: 23 }, (_, i) => 
    `/background_picture/couple_${i + 1}.webp`
  )

  // Preload all images
  useEffect(() => {
    let loadedCount = 0
    const totalImages = 23
    const images = backgroundImages.map((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      return img
    })
  }, [])

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [backgroundImages.length])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#49513C]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#49513C] via-[#49513C]/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center justify-end min-h-screen pb-16 sm:pb-24 md:pb-32 lg:pb-48">
        <div className="max-w-2xl text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wide drop-shadow-2xl whitespace-nowrap"
              style={{
                color: '#FFF9E0',
                textShadow: "0 0 20px rgba(255, 249, 224, 0.8), 0 0 40px rgba(255, 154, 163, 0.3), 0 8px 24px rgba(0,0,0,0.8)",
                letterSpacing: "0.05em",
              }}
            >
              Karl & Shela
            </h1>
            <div className="h-1 w-16 sm:w-20 md:w-24 mx-auto bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>

          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-light text-white drop-shadow-2xl italic"
            style={{
              textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            are getting married!
          </p>

          <div className="space-y-2 sm:space-y-3">
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white drop-shadow-2xl"
              style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              February 28, 2026 - 2:30 PM
            </p>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-white drop-shadow-2xl tracking-wide"
              style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              THE NATIONAL SHRINE OF ST JOSEPH
            </p>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#rsvp"
              className="group inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl font-bold transition-all duration-300 text-white uppercase tracking-wider text-sm sm:text-base whitespace-nowrap relative overflow-hidden border-2 border-transparent hover:border-white/60"
              style={{
                backgroundColor: "rgba(73, 81, 60, 0.95)",
                boxShadow: "0 8px 24px rgba(73, 81, 60, 0.4), 0 4px 8px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#49513C";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(73, 81, 60, 0.6), 0 6px 12px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(73, 81, 60, 0.95)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(73, 81, 60, 0.4), 0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <span className="relative z-10">RSVP</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"
                style={{ width: "50%", left: "-100%" }}
              />
            </a>
            <a
              href="#details"
              className="group inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl font-bold transition-all duration-300 text-white uppercase tracking-wider text-sm sm:text-base whitespace-nowrap relative overflow-hidden border-2 border-transparent hover:border-white/60"
              style={{
                backgroundColor: "rgba(232, 178, 178, 0.85)",
                boxShadow: "0 8px 24px rgba(232, 178, 178, 0.4), 0 4px 8px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8B2B2";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(232, 178, 178, 0.6), 0 6px 12px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232, 178, 178, 0.85)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(232, 178, 178, 0.4), 0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <span className="relative z-10">Details</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"
                style={{ width: "50%", left: "-100%" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "w-6 sm:w-8 bg-white/90" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  )
}
