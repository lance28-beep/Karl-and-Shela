"use client"

import type React from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Building2 } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

export function Registry() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <Section id="registry" bgColor="white">
      <Heading level="h2">Gift Registry</Heading>

      {/* Main Gift Message */}
      <motion.div 
        className="bg-gradient-to-br from-sand/20 to-cream/30 rounded-2xl p-6 md:p-10 text-center max-w-4xl mx-auto mb-8 shadow-lg border border-sand/20"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -2 }}
      >
        <motion.div 
          className="flex justify-center mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-12 h-12 text-teal" />
        </motion.div>
        <motion.h3 
          className="text-2xl md:text-3xl font-playfair font-bold text-ink mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Presence is Our Greatest Gift
        </motion.h3>
        <motion.p 
          className="text-ink/80 font-lora leading-relaxed text-base md:text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          As we embark on this beautiful journey together, your love and support mean everything to us. 
          While your presence at our celebration is the greatest gift we could ever receive, we understand 
          that many of you may wish to contribute to our new life together.
        </motion.p>
        <motion.div 
          className="bg-white/50 rounded-lg p-4 md:p-6 border border-sand/30 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-ink/90 font-lora font-medium text-sm md:text-base">
            💝 We are deeply grateful for any monetary gifts you may wish to share with us. 
            Your generosity will help us build our future home and create beautiful memories together. 
            We truly appreciate your thoughtfulness and support as we begin this new chapter of our lives.
          </p>
        </motion.div>
      </motion.div>

      {/* BDO QR Section */}
      <motion.div 
        className="bg-white rounded-2xl shadow-soft border border-sand/20 p-6 md:p-10 max-w-2xl mx-auto"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        whileHover={{ y: -2 }}
      >
        <div className="text-center mb-6">
          <motion.div 
            className="flex justify-center mb-4"
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Building2 className="w-8 h-8 text-teal" />
          </motion.div>
          <motion.h3 
            className="text-xl md:text-2xl font-playfair font-bold text-ink mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Send via BDO QR
          </motion.h3>
          <motion.p 
            className="text-ink/70 font-lora text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Scan the QR code below to send your gift directly through BDO
          </motion.p>
        </div>

        {/* QR Code Container */}
        <motion.div 
          className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-6 mb-6 border-2 border-dashed border-blue-400/30 shadow-inner"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-center">
            <motion.div 
              className="relative"
              animate={{ 
                y: [0, -3, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/QR/BDOQR.png"
                alt="BDO QR Code for monetary gifts"
                width={200}
                height={200}
                className="rounded-lg shadow-lg border-2 border-white"
                priority
              />
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full p-1 shadow-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Building2 className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>


        {/* Instructions */}
        <motion.div 
          className="space-y-3 text-center"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {[
            "Open your BDO mobile app",
            "Tap 'Pay Bills' or 'Send Money'", 
            "Scan the QR code above",
            "Enter amount and complete transaction"
          ].map((step, index) => (
            <motion.div 
              key={index}
              className={`flex items-center justify-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                hoveredStep === index 
                  ? 'bg-gradient-to-r from-teal/10 to-sand/20 shadow-md transform scale-105' 
                  : 'bg-white/50 hover:bg-gradient-to-r hover:from-teal/5 hover:to-sand/10'
              }`}
              variants={fadeInUp}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  hoveredStep === index 
                    ? 'bg-gradient-to-r from-teal to-teal/80 text-white shadow-md' 
                    : 'bg-teal/10 text-teal'
                }`}
                animate={{
                  scale: hoveredStep === index ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.span>
              <span className="text-sm md:text-base text-ink/70 font-lora font-medium">
                {step}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Thank You Message */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-sand/10 to-cream/20 rounded-xl p-6 md:p-8 max-w-2xl mx-auto border border-sand/20">
          <motion.div 
            className="flex justify-center mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-8 h-8 text-teal" />
          </motion.div>
          <motion.h3 
            className="text-xl md:text-2xl font-playfair font-bold text-ink mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Thank You
          </motion.h3>
          <motion.p 
            className="text-ink/80 font-lora leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your generosity and thoughtfulness mean the world to us. Every gift, no matter the size, 
            brings us closer to our dreams and helps us build our future together. We are deeply 
            grateful for your love and support as we begin this beautiful journey as husband and wife.
          </motion.p>
        </div>
      </motion.div>
    </Section>
  )
}
