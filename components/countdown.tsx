"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { siteContent } from "@/lib/content"
import Counter from "@/components/counter"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [mounted, setMounted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    setMounted(true)

    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile')
      } else if (window.innerWidth < 768) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    const calculateTimeLeft = () => {
      const targetDate = siteContent.couple.weddingDate.getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setIsComplete(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsComplete(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const CounterUnit = ({ value, singularLabel, places }: { value: number; singularLabel: string; places: number[] }) => {
    const getCounterProps = () => {
      switch (screenSize) {
        case 'mobile':
          return {
            fontSize: 48,
            padding: 8,
            gap: 4,
            borderRadius: 16,
            horizontalPadding: 12,
            gradientHeight: 12,
          }
        case 'tablet':
          return {
            fontSize: 56,
            padding: 10,
            gap: 5,
            borderRadius: 18,
            horizontalPadding: 14,
            gradientHeight: 14,
          }
        default:
          return {
            fontSize: 64,
            padding: 12,
            gap: 6,
            borderRadius: 20,
            horizontalPadding: 16,
            gradientHeight: 16,
          }
      }
    }

    const counterProps = getCounterProps()

    return (
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <div className="relative group">
          {/* Enhanced shadow and glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5f674f] to-[#979e8e] rounded-3xl blur-md opacity-60 scale-110 group-hover:scale-115 transition-transform duration-300"></div>
          <div className="relative bg-gradient-to-b from-[#5f674f] via-[#7a8a6b] to-[#979e8e] rounded-3xl shadow-2xl overflow-hidden w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] border-3 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-3xl">
            {/* Inner highlight effect */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
            <Counter
              value={value}
              places={places}
              fontSize={counterProps.fontSize}
              padding={counterProps.padding}
              gap={counterProps.gap}
              textColor="white"
              fontWeight={900}
              borderRadius={counterProps.borderRadius}
              horizontalPadding={counterProps.horizontalPadding}
              gradientHeight={counterProps.gradientHeight}
              gradientFrom="rgba(0,0,0,0.15)"
              gradientTo="transparent"
            />
          </div>
        </div>
        <p className="font-lora font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center tracking-wider uppercase" style={{ color: '#5f674f' }}>
          {value === 1 ? singularLabel : `${singularLabel}s`}
        </p>
      </div>
    )
  }

  return (
    <Section id="countdown" bgColor="white">
      <div className="text-center mb-16">
        <div className="relative inline-block">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ca8e90]/20 via-[#d9aeb8]/20 to-[#ead1d5]/20 rounded-3xl blur-xl scale-110"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/50">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 bg-gradient-to-r from-[#5f674f] to-[#979e8e] bg-clip-text text-transparent">
              {siteContent.countdown.title}
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#5f674f] to-[#979e8e] rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-lora leading-relaxed max-w-4xl mx-auto px-4" style={{ color: '#979e8e' }}>
              {siteContent.countdown.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Accessible live region for screen readers */}
      <p aria-live="polite" className="sr-only">
        {isComplete
          ? "The wedding day has arrived. Congratulations!"
          : `${timeLeft.days} ${timeLeft.days === 1 ? "day" : "days"}, ${timeLeft.hours} ${
              timeLeft.hours === 1 ? "hour" : "hours"
            }, ${timeLeft.minutes} ${timeLeft.minutes === 1 ? "minute" : "minutes"}, ${
              timeLeft.seconds
            } ${timeLeft.seconds === 1 ? "second" : "seconds"} remaining`}
      </p>

      {isComplete ? (
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5f674f] to-[#979e8e] rounded-3xl blur-xl scale-110"></div>
            <div className="relative bg-gradient-to-r from-[#5f674f] to-[#979e8e] rounded-3xl p-12 shadow-2xl mb-8 border-4 border-white/40">
              <p className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white drop-shadow-lg">We're married!</p>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-lora font-medium" style={{ color: '#979e8e' }}>Thank you for celebrating with us.</p>
        </div>
      ) : (
        <>
          {/* Mobile: Enhanced 2x2 Grid Layout - BIGGER */}
          <div className="sm:hidden grid grid-cols-2 gap-8 mb-16 px-8">
            <div className="flex justify-center">
              <CounterUnit value={timeLeft.days} singularLabel="Day" places={[100, 10, 1]} />
            </div>
            <div className="flex justify-center">
              <CounterUnit value={timeLeft.hours} singularLabel="Hour" places={[10, 1]} />
            </div>
            <div className="flex justify-center">
              <CounterUnit value={timeLeft.minutes} singularLabel="Minute" places={[10, 1]} />
            </div>
            <div className="flex justify-center">
              <CounterUnit value={timeLeft.seconds} singularLabel="Second" places={[10, 1]} />
            </div>
          </div>

          {/* Desktop: Enhanced Horizontal Layout */}
          <div className="hidden sm:flex justify-center items-center gap-10 md:gap-16 mb-16">
            <CounterUnit value={timeLeft.days} singularLabel="Day" places={[100, 10, 1]} />
            <div className="flex flex-col items-center gap-3">
              <div className="w-2 h-12 rounded-full bg-gradient-to-b from-[#5f674f] to-[#979e8e] shadow-lg"></div>
              <div className="w-2 h-12 rounded-full bg-gradient-to-b from-[#5f674f] to-[#979e8e] shadow-lg"></div>
            </div>
            <CounterUnit value={timeLeft.hours} singularLabel="Hour" places={[10, 1]} />
            <div className="flex flex-col items-center gap-3">
              <div className="w-2 h-12 rounded-full bg-gradient-to-b from-[#5f674f] to-[#979e8e] shadow-lg"></div>
              <div className="w-2 h-12 rounded-full bg-gradient-to-b from-[#5f674f] to-[#979e8e] shadow-lg"></div>
            </div>
            <CounterUnit value={timeLeft.minutes} singularLabel="Minute" places={[10, 1]} />
            <div className="flex flex-col items-center gap-3">
              <div className="w-2 h-12 rounded-full bg-gradient-to-b from-[#5f674f] to-[#979e8e] shadow-lg"></div>
              <div className="w-2 h-12 rounded-full bg-gradient-to-b from-[#5f674f] to-[#979e8e] shadow-lg"></div>
            </div>
            <CounterUnit value={timeLeft.seconds} singularLabel="Second" places={[10, 1]} />
          </div>
        </>
      )}

      {/* Enhanced Wedding date display */}
      <div className="text-center px-4 sm:px-0 mt-12">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c5cac4]/30 to-[#979e8e]/30 rounded-2xl blur-lg scale-105"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl border-2 border-white/50">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#5f674f] to-[#979e8e] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-playfair font-bold" style={{ color: '#5f674f' }}>
                Wedding Date
              </p>
            </div>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-playfair font-semibold" style={{ color: '#979e8e' }}>
              {siteContent.countdown.displayDate}
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
