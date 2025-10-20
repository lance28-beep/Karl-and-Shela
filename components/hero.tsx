"use client"

import { Button } from "@/components/ui/button"
import { siteContent } from "@/lib/content"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import Aurora from "./Aurora"

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const coupleImages = [
    { id: 1, img: "/CoupleImage/couple_1.png" },
    { id: 2, img: "/CoupleImage/couple_2.png" },
    { id: 3, img: "/CoupleImage/couple_3.png" },
    { id: 4, img: "/CoupleImage/couple_4.png" },
  ]

  // Generate consistent particle positions using a seeded random function
  const generateParticlePositions = () => {
    const positions = []
    for (let i = 0; i < 20; i++) {
      // Use a simple seeded random function for consistency
      const seed = i * 12345
      const x = ((seed * 9301 + 49297) % 233280) / 233280 * 100
      const y = ((seed * 9301 + 49297) % 233280) / 233280 * 100
      positions.push({ left: x, top: y })
    }
    return positions
  }

  const particlePositions = generateParticlePositions()

  useEffect(() => {
    const weddingDate = new Date("2025-12-20T15:00:00+08:00").getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const fadeInDown = {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sand/30 to-cream"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#ca8e90", "#d9aeb8", "#ead1d5"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Enhanced Background decorative elements with parallax */}
      <div className="absolute inset-0 opacity-15 z-10">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-teal rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: scrollY * 0.3 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 bg-sand rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: -scrollY * 0.2 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.15, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal/20 rounded-full mix-blend-multiply filter blur-2xl"
          style={{ y: scrollY * 0.1 }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Additional parallax elements */}
        <motion.div 
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-sand/30 rounded-full mix-blend-multiply filter blur-xl"
          style={{ y: -scrollY * 0.4 }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-teal/25 rounded-full mix-blend-multiply filter blur-xl"
          style={{ y: scrollY * 0.15 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden z-10">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal/30 rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div 
        className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 py-20 text-center"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {/* Couple Photos Stack */}
        <motion.div 
          className="flex justify-center mb-12"
          variants={fadeInDown}
        >
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 220, height: 220 }}
            cardsData={coupleImages}
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1 
          className="heading-lg text-white mb-6 text-balance-custom drop-shadow-lg"
          variants={fadeInUp}
        >
          {siteContent.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-12 font-lora leading-relaxed max-w-2xl mx-auto drop-shadow-md"
          variants={fadeInUp}
        >
          {siteContent.hero.subtitle}
        </motion.p>

        {/* Countdown Timer */}
        <motion.div 
          className="mb-12"
          variants={fadeInUp}
        >
          <h3 className="text-lg font-lora text-white/90 mb-6 drop-shadow-md">Counting down to our special day</h3>
          <div className="grid grid-cols-2 md:flex md:justify-center gap-3 md:gap-8 max-w-2xl mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-6 shadow-xl border border-white/30 touch-manipulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                >
                  <div className="text-xl md:text-3xl font-bold font-lora drop-shadow-lg" style={{ color: '#5f674f' }}>
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm font-lora mt-1 drop-shadow-sm" style={{ color: '#5f674f' }}>
                    {item.label}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Date and venue card */}
        <motion.div 
          className="bg-white/85 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 shadow-xl border border-white/60 relative overflow-hidden"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-sand/20 rounded-full translate-y-12 -translate-x-12" />
          
          <div className="relative z-10">
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-20 h-1 mx-auto mb-6 rounded-full drop-shadow-sm" style={{ backgroundColor: '#5f674f' }} />
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold mb-6 drop-shadow-lg" style={{ color: '#5f674f' }}>{siteContent.hero.date}</p>
            </motion.div>
            
            <div className="space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-semibold text-center drop-shadow-md leading-relaxed" style={{ color: '#5f674f' }}>{siteContent.hero.ceremony}</p>
              <div className="w-12 h-0.5 mx-auto drop-shadow-sm" style={{ backgroundColor: '#5f674f' }} />
              <div className="space-y-3">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-lora text-center drop-shadow-sm font-medium" style={{ color: '#5f674f' }}>{siteContent.hero.reception}</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-center drop-shadow-md" style={{ color: '#5f674f' }}>Alta D' Tagaytay Hotel</p>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-lora text-center mt-6 leading-relaxed drop-shadow-sm" style={{ color: '#5f674f' }}>{siteContent.hero.receptionFull}</p>
            </div>
        </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          variants={fadeInUp}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => handleScroll("details")} 
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
            Join Our Celebration
          </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => handleScroll("rsvp")} 
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
            RSVP Now
          </Button>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white/80 font-lora drop-shadow-sm">Scroll to explore</span>
        <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      </motion.div>
    </section>
  )
}
