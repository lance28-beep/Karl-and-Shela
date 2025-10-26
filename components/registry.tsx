"use client"

import type React from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Building2 } from "lucide-react"
import { motion } from "motion/react"

export function Registry() {

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
    <Section id="registry" bgColor="#49513C">
      <Heading level="h2" style={{ color: '#FFFFFF' }}>Gift Registry</Heading>

      {/* Main Gift Message */}
      <motion.div 
        className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 md:p-10 text-center max-w-4xl mx-auto mb-8 shadow-2xl border border-white/30 overflow-hidden group"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -2 }}
      >
        {/* Glass morphism layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 border border-white/40 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
        
        {/* Decorative background elements */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal/25 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-teal/20 rounded-full blur-2xl animate-pulse pointer-events-none"></div>

        <div className="relative">
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
          className="text-2xl md:text-3xl font-playfair font-bold mb-4"
          style={{ color: '#49513C' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Presence is Our Greatest Gift
        </motion.h3>
        <motion.p 
          className="font-lora leading-relaxed text-base md:text-lg mb-6"
          style={{ color: '#49513C' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A love is what the day is all about. Your presence is something we can't 
          celebrate without. We are truly grateful for your effort and time to be with us. 
          But should you still believe that a gift is worth giving, a monetary gift for our 
          future is a delightful blessing. Perhaps you prefer to purchase a gift, feel free to 
          surprise us in your unique way.
        </motion.p>
        <motion.div 
          className="bg-teal/10 rounded-lg p-4 md:p-6 border border-teal/20 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="font-lora font-medium text-sm md:text-base" style={{ color: '#49513C' }}>
            💝 We are deeply grateful for any monetary gifts you may wish to share with us. 
            Your generosity will help us build our future home and create beautiful memories together. 
            We truly appreciate your thoughtfulness and support as we begin this new chapter of our lives.
          </p>
        </motion.div>
        </div>
      </motion.div>

      {/* QR Codes Section */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* BPI QR Section */}
        <motion.div 
          className="relative bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 md:p-8 overflow-hidden group"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          whileHover={{ y: -2 }}
        >
          {/* Glass morphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/40 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal/25 rounded-full blur-lg animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-left-6 pointer-events-none"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal/20 rounded-full blur-xl animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-right-6 pointer-events-none"></div>

          <div className="relative">
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
              className="text-xl md:text-2xl font-playfair font-bold mb-2"
              style={{ color: '#49513C' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Send via BPI
            </motion.h3>
            <motion.p 
              className="font-lora text-sm md:text-base"
              style={{ color: '#49513C', opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Scan to send via BPI mobile app
            </motion.p>
          </div>

          {/* QR Code Container */}
          <motion.div 
            className="bg-gradient-to-br from-white to-red-50/30 rounded-xl p-6 mb-6 border-2 border-dashed border-red-400/30 shadow-inner"
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
                  src="/QR/BPIQR.png"
                  alt="BPI QR Code for monetary gifts"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg border-2 border-white"
                  priority
                />
                <motion.div 
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full p-1 shadow-md"
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
                 
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </motion.div>

        {/* GCash QR Section */}
        <motion.div 
          className="relative bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 md:p-8 overflow-hidden group"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          whileHover={{ y: -2 }}
        >
          {/* Glass morphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/40 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal/25 rounded-full blur-lg animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-right-6 pointer-events-none"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-teal/20 rounded-full blur-xl animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-left-6 pointer-events-none"></div>

          <div className="relative">
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
              className="text-xl md:text-2xl font-playfair font-bold mb-2"
              style={{ color: '#49513C' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Send via GCash
            </motion.h3>
            <motion.p 
              className="font-lora text-sm md:text-base"
              style={{ color: '#49513C', opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Scan to send via GCash app
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
                  src="/QR/GcashQR.png"
                  alt="GCash QR Code for monetary gifts"
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
                 
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Thank You Message */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="relative bg-white/20 backdrop-blur-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto border border-white/30 shadow-2xl overflow-hidden group">
          {/* Glass morphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/40 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          <div className="relative">
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
            className="text-xl md:text-2xl font-playfair font-bold mb-3"
            style={{ color: '#49513C' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Thank You
          </motion.h3>
          <motion.p 
            className="font-lora leading-relaxed text-sm md:text-base"
            style={{ color: '#49513C' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your generosity and thoughtfulness mean the world to us. Every gift, no matter the size, 
            brings us closer to our dreams and helps us build our future together. We are deeply 
            grateful for your love and support as we begin this beautiful journey as husband and wife.
          </motion.p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
