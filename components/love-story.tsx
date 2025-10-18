"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { siteContent } from "@/lib/content"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function LoveStory() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [progress, setProgress] = useState(0) // 0-100 autoplay progress
  const touchStartXRef = useRef<number | null>(null)
  const cycleStartTimeRef = useRef<number>(Date.now())

  // Placeholder images - in production, these would be actual couple photos
  const slides = [
    { id: 1, alt: "CoupleImage/couple_1.png", caption: "In all the world, there is no heart for me like yours", date: "Jan 2019" },
    { id: 2, alt: "CoupleImage/couple_2.png", caption: "You are my today and all of my tomorrows", date: "Oct 2020" },
    { id: 3, alt: "CoupleImage/couple_3.png", caption: "I have found the one whom my soul loves", date: "May 2024" },
    { id: 4, alt: "CoupleImage/couple_4.png", caption: "Two souls, one heart", date: "" },
    { id: 5, alt: "CoupleImage/couple_5.png", caption: "You make my heart smile", date: "" },
    { id: 6, alt: "CoupleImage/couple_6.png", caption: "Love is not about how much you say 'I love you', but how much you prove that it's true", date: "" },
    { id: 7, alt: "CoupleImage/couple_7.png", caption: "Every love story is beautiful, but ours is my favorite", date: "" },
    { id: 8, alt: "CoupleImage/couple_8.png", caption: "You are my sunshine on a cloudy day", date: "" },
    { id: 9, alt: "CoupleImage/couple_9.png", caption: "I love you not only for what you are, but for what I am when I am with you", date: "" },
    { id: 10, alt: "CoupleImage/couple_10.png", caption: "You are my greatest adventure", date: "" },
    { id: 11, alt: "CoupleImage/couple_11.png", caption: "Forever and always, you and me", date: "" },
    { id: 12, alt: "CoupleImage/couple_12.png", caption: "You had me at hello", date: "" },
    { id: 13, alt: "CoupleImage/couple_13.png", caption: "Love is composed of a single soul inhabiting two bodies", date: "" },
    { id: 14, alt: "CoupleImage/couple_14.png", caption: "You are my today and all of my tomorrows", date: "" },
    { id: 15, alt: "CoupleImage/couple_15.png", caption: "I choose you. And I'll choose you, over and over and over", date: "" },
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
      <Heading level="h2">{siteContent.loveStory.title}</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Carousel */}
        <div
          className="relative"
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
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-soft bg-sand">
            {slides.map((slide, index) => (
              <Image
                key={slide.id}
                src={`/${slide.alt}?height=500&width=500&query=couple+photo+${slide.id}`}
                alt={slide.alt}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
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

            {/* Autoplay progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40">
              <div
                className="h-full bg-teal transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal p-2 rounded-full transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal p-2 rounded-full transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pause/Play */}
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="absolute right-4 bottom-4 bg-white/80 hover:bg-white text-teal px-3 py-1 rounded-full text-sm z-10"
            aria-pressed={isPaused}
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          >
            {isPaused ? "Play" : "Pause"}
          </button>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Love story photos">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors outline-none ring-0 focus:ring-2 focus:ring-teal/50 ${
                  index === currentSlide ? "bg-teal" : "bg-teal/30 hover:bg-teal/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? "true" : undefined}
                role="tab"
              />
            ))}
          </div>
        </div>

        {/* Story Text */}
        <div>
          <div className="prose prose-lg max-w-none">
            {siteContent.loveStory.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-ink/80 font-lora leading-relaxed mb-6 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
            {/* Current slide caption */}
            <div className="mt-4 text-ink/70">
              <p className="font-lora text-base">{slides[currentSlide].caption}</p>
              <p className="text-sm">{slides[currentSlide].date}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
