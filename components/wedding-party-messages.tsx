"use client"

import { useMemo } from "react"
import TextType from "./text-type"

const WEDDING_PARTY_MESSAGES = [
  "Cassly & Mark, your love story is truly inspiring!",
  "Wishing you both a lifetime of happiness and love.",
  "What an honor to be part of your special day!",
  "May your marriage be filled with joy and laughter.",
  "Congratulations to the beautiful couple!",
  "Here's to love, laughter, and happily ever after.",
  "So excited to celebrate this amazing milestone with you!",
  "Your love is an inspiration to us all.",
  "Wishing you both endless love and happiness.",
  "What a beautiful journey you two are on together!",
  "Cheers to the newlyweds!",
  "Your love story is one for the ages.",
  "May your love grow stronger with each passing day.",
  "So grateful to witness your love and commitment.",
  "Here's to forever with your best friend!",
]

export function WeddingPartyMessages() {
  const randomMessage = useMemo(() => {
    return WEDDING_PARTY_MESSAGES[Math.floor(Math.random() * WEDDING_PARTY_MESSAGES.length)]
  }, [])

  return (
    <div className="mb-16 text-center">
      <div className="inline-block">
        <TextType
          text={randomMessage}
          typingSpeed={50}
          pauseDuration={2000}
          showCursor={true}
          cursorCharacter="|"
          className="text-xl md:text-2xl font-lora italic text-teal"
          cursorClassName="text-teal"
        />
      </div>
    </div>
  )
}
