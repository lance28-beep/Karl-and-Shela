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

  useEffect(() => {
    setMounted(true)

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

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const CounterUnit = ({ value, singularLabel, places }: { value: number; singularLabel: string; places: number[] }) => (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      <div className="bg-gradient-to-b from-teal to-teal/80 rounded-lg shadow-soft overflow-hidden">
        <Counter
          value={value}
          places={places}
          fontSize={56}
          padding={8}
          gap={4}
          textColor="white"
          fontWeight={900}
          borderRadius={8}
          horizontalPadding={12}
          gradientHeight={12}
          gradientFrom="rgba(0,0,0,0.3)"
          gradientTo="transparent"
        />
      </div>
      <p className="text-ink font-lora font-semibold text-xs md:text-sm">
        {value === 1 ? singularLabel : `${singularLabel}s`}
      </p>
    </div>
  )

  return (
    <Section id="countdown" bgColor="white">
      <Heading level="h2" subtitle={siteContent.countdown.subtitle}>
        {siteContent.countdown.title}
      </Heading>

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
        <div className="text-center mb-12">
          <p className="text-2xl md:text-3xl font-lora text-teal font-semibold">We're married!</p>
          <p className="text-ink/70 mt-2 font-lora">Thank you for celebrating with us.</p>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 md:gap-6 mb-12 flex-wrap">
          <CounterUnit value={timeLeft.days} singularLabel="Day" places={[100, 10, 1]} />
          <span className="hidden sm:inline text-2xl md:text-3xl text-ink/40" aria-hidden="true">:</span>
          <CounterUnit value={timeLeft.hours} singularLabel="Hour" places={[10, 1]} />
          <span className="hidden sm:inline text-2xl md:text-3xl text-ink/40" aria-hidden="true">:</span>
          <CounterUnit value={timeLeft.minutes} singularLabel="Minute" places={[10, 1]} />
          <span className="hidden sm:inline text-2xl md:text-3xl text-ink/40" aria-hidden="true">:</span>
          <CounterUnit value={timeLeft.seconds} singularLabel="Second" places={[10, 1]} />
        </div>
      )}

      {/* Wedding date display */}
      <div className="text-center">
        <p className="text-base md:text-lg text-ink/70 font-lora">{siteContent.countdown.displayDate}</p>
      </div>
    </Section>
  )
}
