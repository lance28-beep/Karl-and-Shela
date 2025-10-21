"use client"

import { siteContent } from "@/lib/content"
import { Mail, Phone, MapPin, Heart, Calendar, Clock, Users, Gift, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
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
    <footer className="relative bg-gradient-to-b from-ink to-ink/95 text-cream overflow-hidden">
      {/* Background decorative elements with parallax */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-cream/20 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: scrollY * 0.3 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 bg-cream/15 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: -scrollY * 0.2 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-cream/10 rounded-full mix-blend-multiply filter blur-2xl"
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Main Content */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Couple Info */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full flex items-center justify-center border border-cream/20">
                  <Heart className="w-6 h-6 text-cream" />
                </div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-cream">
                  {siteContent.couple.name}
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-cream/90 font-lora">
                  <Calendar className="w-5 h-5 text-cream/70" />
                  <span className="text-lg">December 20, 2025</span>
                </div>
                <div className="flex items-center gap-3 text-cream/80 font-lora">
                  <MapPin className="w-5 h-5 text-cream/60" />
                  <span>Tagaytay City, Philippines</span>
                </div>
              </div>
            </div>
            
            {/* Quote */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cream/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="font-lora text-cream/90 italic text-lg leading-relaxed">
                "Two souls, one heart, forever intertwined in love's beautiful dance."
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-cream/60 rounded-full"></div>
                <div className="w-2 h-2 bg-cream/40 rounded-full"></div>
                <div className="w-2 h-2 bg-cream/60 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
          >
            {/* Ceremony */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cream/10 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full flex items-center justify-center border border-cream/20">
                  <Users className="w-5 h-5 text-cream" />
                </div>
                <h4 className="font-playfair font-bold text-xl text-cream">Ceremony</h4>
              </div>
              <div className="space-y-3 text-cream/80 font-lora text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="flex-shrink-0 mt-1 text-cream/60" />
                  <div>
                    <p className="font-medium">{siteContent.details.ceremony.venue}</p>
                    <p className="text-cream/60">{siteContent.details.ceremony.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-cream/60" />
                  <span className="text-cream/70">3:00 PM</span>
                </div>
              </div>
            </motion.div>

            {/* Reception */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cream/10 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full flex items-center justify-center border border-cream/20">
                  <Gift className="w-5 h-5 text-cream" />
                </div>
                <h4 className="font-playfair font-bold text-xl text-cream">Reception</h4>
              </div>
              <div className="space-y-3 text-cream/80 font-lora text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="flex-shrink-0 mt-1 text-cream/60" />
                  <div>
                    <p className="font-medium">{siteContent.details.reception.venue}</p>
                    <p className="text-cream/60">{siteContent.details.reception.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
          >
            <div>
              <h4 className="font-playfair font-bold text-xl mb-6 flex items-center gap-3 text-cream">
                <div className="w-2 h-8 bg-gradient-to-b from-cream/60 to-cream/30 rounded-full"></div>
                Get in Touch
              </h4>
              <div className="space-y-4">
                <a 
                  href="mailto:casslyjaneruiz@gmail.com" 
                  className="group flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-cream/10 hover:bg-white/10 hover:border-cream/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-cream/20">
                    <Mail size={18} className="text-cream" />
                  </div>
                  <div>
                    <p className="font-lora text-cream/90 font-medium">Email Us</p>
                    <p className="font-lora text-cream/70 text-sm">casslyjaneruiz@gmail.com</p>
                  </div>
                </a>
                <a 
                  href="tel:+639123456789" 
                  className="group flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-cream/10 hover:bg-white/10 hover:border-cream/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-cream/20">
                    <Phone size={18} className="text-cream" />
                  </div>
                  <div>
                    <p className="font-lora text-cream/90 font-medium">Call Us</p>
                    <p className="font-lora text-cream/70 text-sm">+63 912 345 6789</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-playfair font-bold text-lg mb-4 text-cream">Quick Links</h5>
              <div className="space-y-2">
                <a href="#rsvp" className="block text-cream/70 hover:text-cream transition-colors duration-200 font-lora text-sm">
                  RSVP
                </a>
                <a href="#gallery" className="block text-cream/70 hover:text-cream transition-colors duration-200 font-lora text-sm">
                  Gallery
                </a>
                <a href="#details" className="block text-cream/70 hover:text-cream transition-colors duration-200 font-lora text-sm">
                  Event Details
                </a>
                <a href="#registry" className="block text-cream/70 hover:text-cream transition-colors duration-200 font-lora text-sm">
                  Registry
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-cream/20 pt-8"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-cream/60 font-lora text-sm">
                &copy; {currentYear} {siteContent.couple.name}. All rights reserved.
              </p>
              <p className="text-cream/50 font-lora text-xs mt-1">
                Made with 💕 for our special day
              </p>
              <div className="space-y-1">
                <p className="text-cream/40 font-lora text-xs">
                  Developed by{" "}
                  <a 
                    href="https://lance28-beep.github.io/portfolio-website/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cream/60 hover:text-cream/80 transition-colors duration-200 underline decoration-cream/30 hover:decoration-cream/50"
                  >
                    Lance Valle
                  </a>
                </p>
                <p className="text-cream/40 font-lora text-xs">
                  Want a website like this? Visit{" "}
                  <a 
                    href="https://www.facebook.com/WeddingInvitationNaga" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cream/60 hover:text-cream/80 transition-colors duration-200 underline decoration-cream/30 hover:decoration-cream/50"
                  >
                    Wedding Invitation Naga
                  </a>
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cream/30 to-cream/20 rounded-full border-2 border-cream/20"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full border-2 border-cream/20"></div>
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent"></div>
              <Heart className="w-4 h-4 text-cream/60 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Messenger Button */}
      <a
        href="https://m.me/cassly.ruiz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on Messenger"
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 bg-[#0084FF] hover:bg-[#006AFF] text-white rounded-full shadow-2xl p-4 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{ boxShadow: '0 0 24px 4px #0084FF55, 0 4px 24px 0 #0002' }}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  )
}
