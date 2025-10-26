"use client"

import type React from "react"

import { motion, useMotionValue, useTransform } from "motion/react"
import { useState, useMemo, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

// Generate consistent random values for SSR/client consistency
const generateSeededRandom = (seed: number) => {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface CardRotateProps {
  children: React.ReactNode
  onSendToBack: () => void
  sensitivity: number
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab touch-manipulation"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: -50, right: 50, bottom: 50, left: -50 }}
      dragElastic={0.2}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing", scale: 0.95 }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

interface StackProps {
  randomRotation?: boolean
  sensitivity?: number
  cardDimensions?: { width: number; height: number }
  sendToBackOnClick?: boolean
  cardsData?: { id: number; img: string }[]
  animationConfig?: { stiffness: number; damping: number }
  responsive?: boolean
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  responsive = true,
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: "/CoupleImage/couple_1.png",
          },
          {
            id: 2,
            img: "/CoupleImage/couple_2.png",
          },
          {
            id: 3,
            img: "/CoupleImage/couple_3.png",
          },
          {
            id: 4,
            img: "/CoupleImage/couple_4.png",
          },
        ],
  )

  // Use mobile detection hook
  const isMobile = useIsMobile()
  
  // Calculate responsive dimensions and sensitivity
  const responsiveDimensions = useMemo(() => {
    if (!responsive) return cardDimensions
    
    const multiplier = isMobile ? 0.6 : 0.85
    const result = {
      width: Math.round(cardDimensions.width * multiplier),
      height: Math.round(cardDimensions.height * multiplier)
    }
    
    console.log('Stack dimensions:', { isMobile, multiplier, cardDimensions, result })
    return result
  }, [cardDimensions, responsive, isMobile])
  
  const responsiveSensitivity = useMemo(() => {
    if (!responsive) return sensitivity
    
    const sensitivityMultiplier = isMobile ? 0.4 : 0.8
    const result = Math.round(sensitivity * sensitivityMultiplier)
    
    console.log('Stack sensitivity:', { isMobile, sensitivityMultiplier, sensitivity, result })
    return result
  }, [sensitivity, responsive, isMobile])

  // Generate consistent random rotations for each card
  const randomRotations = useMemo(() => {
    return cards.map((card, index) => 
      randomRotation ? (generateSeededRandom(card.id + index) * 10 - 5) : 0
    )
  }, [cards, randomRotation])

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev]
      const index = newCards.findIndex((card) => card.id === id)
      const [card] = newCards.splice(index, 1)
      newCards.unshift(card)
      return newCards
    })
  }

  // Use responsive dimensions if client-side, otherwise fallback to original
  const currentDimensions = responsiveDimensions
  const currentSensitivity = responsiveSensitivity

  return (
    <div
      className="relative"
      style={{
        width: currentDimensions.width,
        height: currentDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotations[index]

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={currentSensitivity}>
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white touch-manipulation"
              onClick={() => {
                if (sendToBackOnClick) {
                  sendToBack(card.id)
                } else {
                  // For mobile, also allow click to send to back
                  sendToBack(card.id)
                }
              }}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: currentDimensions.width,
                height: currentDimensions.height,
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
              }}
            >
              <img src={card.img} alt={`card-${card.id}`} className="w-full h-full object-cover pointer-events-none" />
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}
