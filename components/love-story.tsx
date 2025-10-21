"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { siteContent } from "@/lib/content"
import { Play, Pause, Heart, Sparkles } from "lucide-react"

export function LoveStory() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [progress, setProgress] = useState(0) // 0-100 autoplay progress
  const touchStartXRef = useRef<number | null>(null)
  const cycleStartTimeRef = useRef<number>(Date.now())

  // Placeholder images - in production, these would be actual couple photos
  const slides = [
    { id: 1, alt: "CoupleImage/couple_29.png", caption: "In all the world, there is no heart for me like yours", date: "Jan 2019" },
    { id: 2, alt: "CoupleImage/couple_28.png", caption: "You are my today and all of my tomorrows", date: "Oct 2020" },
    { id: 3, alt: "CoupleImage/couple_27.png", caption: "I have found the one whom my soul loves", date: "May 2024" },
    { id: 4, alt: "CoupleImage/couple_26.png", caption: "Two souls, one heart", date: "" },
    { id: 5, alt: "CoupleImage/couple_25.png", caption: "You make my heart smile", date: "" },
    { id: 6, alt: "CoupleImage/couple_24.png", caption: "Love is not about how much you say 'I love you', but how much you prove that it's true", date: "" },
    { id: 7, alt: "CoupleImage/couple_23.png", caption: "Every love story is beautiful, but ours is my favorite", date: "" },
    { id: 8, alt: "CoupleImage/couple_22.png", caption: "You are my sunshine on a cloudy day", date: "" },
  ]

  const AUTOPLAY_MS = 3000

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    cycleStartTimeRef.current = Date.now()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    cycleStartTimeRef.current = Date.now()
  }

  // Auto-advance slides every 3 seconds, pause on hover
  useEffect(() => {
    if (isPaused || isReducedMotion) return
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      cycleStartTimeRef.current = Date.now()
    }, AUTOPLAY_MS)
    return () => clearInterval(intervalId)
  }, [isPaused, isReducedMotion, slides.length])

  // Progress bar tied to autoplay
  useEffect(() => {
    if (isPaused || isReducedMotion) {
      setProgress(0)
      return
    }
    let rafId: number
    const tick = () => {
      const elapsed = Date.now() - cycleStartTimeRef.current
      const pct = Math.min(100, (elapsed / AUTOPLAY_MS) * 100)
      setProgress(pct)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isPaused, isReducedMotion, currentSlide])

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setIsReducedMotion(mql.matches)
    update()
    mql.addEventListener?.("change", update)
    return () => mql.removeEventListener?.("change", update)
  }, [])

  return (
    <Section id="love-story" bgColor="cream">
      {/* Enhanced Header with Elegant Design */}
      <div className="text-center mb-12 md:mb-16 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 bg-gradient-to-br from-teal/10 to-pink/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-teal animate-pulse" />
            <Heart className="w-7 h-7 text-teal animate-pulse" />
            <Heading level="h2" className="text-4xl md:text-5xl lg:text-6xl font-serif bg-gradient-to-r from-teal via-pink to-teal bg-clip-text text-transparent">
              {siteContent.loveStory.title}
            </Heading>
            <Heart className="w-7 h-7 text-teal animate-pulse" />
            <Sparkles className="w-5 h-5 text-teal animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-teal rounded-full"></div>
            <div className="w-2 h-2 bg-teal rounded-full animate-pulse"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-teal rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Enhanced Image Carousel */}
        <div
          className="relative order-1 lg:order-1 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault()
              nextSlide()
            } else if (e.key === "ArrowLeft") {
              e.preventDefault()
              prevSlide()
            }
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Our love story photos"
        >
          {/* Main Image Container with Enhanced Styling */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-sand via-cream to-white group-hover:shadow-3xl transition-all duration-500">
            {/* Decorative Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/20 via-transparent to-pink/20 p-1">
              <div className="w-full h-full rounded-3xl bg-white"></div>
            </div>
            
            {slides.map((slide, index) => (
              <Image
                key={slide.id}
                src={`/${slide.alt}?height=500&width=500&query=couple+photo+${slide.id}`}
                alt={slide.alt}
                fill
                className={`object-cover transition-all duration-1200 ease-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                priority={index === 0}
                onTouchStart={(e) => {
                  touchStartXRef.current = e.touches[0].clientX
                }}
                onTouchMove={(e) => {
                  // prevent passive swipe from scrolling when clear intention
                  if (touchStartXRef.current !== null) {
                    const deltaX = e.touches[0].clientX - touchStartXRef.current
                    if (Math.abs(deltaX) > 10) e.preventDefault()
                  }
                }}
                onTouchEnd={(e) => {
                  const startX = touchStartXRef.current
                  touchStartXRef.current = null
                  if (startX === null) return
                  const endX = e.changedTouches[0].clientX
                  const deltaX = endX - startX
                  const threshold = 30
                  if (deltaX > threshold) {
                    prevSlide()
                  } else if (deltaX < -threshold) {
                    nextSlide()
                  }
                }}
              />
            ))}

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-pink/5 pointer-events-none" />

            {/* Elegant Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-teal via-pink to-teal transition-[width] duration-100 ease-linear rounded-full shadow-lg"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            </div>

            {/* Enhanced Slide Counter */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-teal px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
              <span className="text-xs opacity-70">Photo</span> {currentSlide + 1} / {slides.length}
            </div>

            {/* Elegant Pause/Play Button */}
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="absolute left-6 bottom-6 bg-white/95 backdrop-blur-md hover:bg-white text-teal p-3 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:scale-110 border border-white/20 group"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
              </div>
            </button>

            {/* Swipe Hint with Better Styling */}
            <div className="md:hidden absolute bottom-6 right-6 bg-white/95 backdrop-blur-md text-teal px-3 py-2 rounded-full text-xs font-medium shadow-lg border border-white/20">
              <div className="flex items-center gap-1">
                <span>←</span>
                <span>Swipe</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Story Text */}
        <div className="order-2 lg:order-2">
          <div className="prose prose-lg max-w-none">
            {siteContent.loveStory.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-ink/85 font-lora leading-relaxed mb-8 whitespace-pre-wrap text-lg md:text-xl">
                {paragraph}
              </p>
            ))}
            
            {/* Enhanced Caption Card */}
            <div className="mt-10 p-8 bg-gradient-to-br from-white/60 via-cream/40 to-white/60 rounded-3xl border border-white/30 backdrop-blur-md shadow-xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal/10 to-pink/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink/10 to-teal/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-teal to-pink rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-lora text-lg md:text-xl text-ink/95 leading-relaxed italic">
                      "{slides[currentSlide].caption}"
                    </p>
                    {slides[currentSlide].date && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-1 h-1 bg-teal rounded-full"></div>
                        <p className="text-sm text-ink/70 font-medium">
                          {slides[currentSlide].date}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
