"use client"

import { Instagram, Facebook, Twitter, Share2, Hash, Copy, Check, Download } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import QRCode from "./qr-code"

export function SnapShare() {
  const [copied, setCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  const websiteUrl = typeof window !== 'undefined' ? window.location.href : 'https://casslyandmark.com'
  const hashtag = '#CasslyJaneMarkFlorence'
  const shareText = `Join us in celebrating our special day! Check out our wedding website: ${websiteUrl} ${hashtag} 💕`
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const copyToClipboard = async (text: string, type: 'hashtag' | 'share') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'hashtag') {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)
    
    const urls = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`
    }
    
    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')?.querySelector('svg')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        const link = document.createElement('a')
        link.download = 'casslyn-mark-wedding-qr.png'
        link.href = canvas.toDataURL()
        link.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

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
    <section className="relative bg-gradient-to-b from-sand/30 to-cream py-12 overflow-hidden">
      {/* Background decorative elements with parallax */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 right-5 w-48 h-48 bg-teal rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: scrollY * 0.2 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-5 w-48 h-48 bg-sand rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: -scrollY * 0.1 }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 mb-4 shadow-lg border border-cream/20">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-teal mb-1">
              Snap & Share
            </h2>
            <h3 className="font-lora text-lg md:text-xl text-ink/80 font-medium">
              Share Your Moments
            </h3>
          </div>
          <p className="font-lora text-ink/70 max-w-2xl mx-auto leading-relaxed">
            Let's make memories together! Share your photos and videos from our celebration using our official hashtag.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Hashtag Section */}
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cream/20"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal/10 to-sand/20 px-6 py-4 rounded-xl mb-4 shadow-md border border-teal/20">
                <span className="font-lora text-xl md:text-2xl font-bold text-teal">
                  #CasslyJaneMarkFlorence
                </span>
                <button
                  onClick={() => copyToClipboard(hashtag, 'hashtag')}
                  className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
                  title="Copy hashtag"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-teal" />
                  ) : (
                    <Copy className="w-4 h-4 text-ink/60" />
                  )}
                </button>
              </div>
              <p className="font-lora text-ink/70 text-sm mb-3">
                Use this hashtag on your social media posts to be featured in our wedding gallery
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal/10 to-sand/20 px-4 py-2 rounded-full border border-teal/20">
                <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse"></div>
                <span className="font-lora text-ink/70 text-xs font-medium">
                  Auto-sync enabled • Photos appear instantly
                </span>
              </div>
            </div>
            
            {/* Couple Photos Gallery */}
            <div className="mt-6">
              <h4 className="font-playfair text-lg font-bold text-ink mb-4 text-center">
                Our Favorite Moments
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <motion.div 
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/CoupleImage/couple_1.png"
                    alt="Cassly Jane & Mark Florence"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/CoupleImage/couple_2.png"
                    alt="Cassly Jane & Mark Florence"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/CoupleImage/couple_3.png"
                    alt="Cassly Jane & Mark Florence"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/CoupleImage/couple_4.png"
                    alt="Cassly Jane & Mark Florence"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <p className="font-lora text-ink/60 text-xs text-center mt-3">
                Share your photos using our hashtag to be featured here!
              </p>
            </div>
          </motion.div>

          {/* QR Code & Share Section */}
          <motion.div 
            className="space-y-4"
            variants={fadeInUp}
          >
            {/* QR Code */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cream/20 text-center">
              <h4 className="font-playfair text-lg font-bold text-ink mb-4">
                Share Our Website
              </h4>
              <div className="inline-block bg-white p-4 rounded-xl shadow-md border border-ink/10 mb-3">
                <div id="qr-code" className="mb-2">
                  <QRCode
                    value={websiteUrl}
                    size={120}
                  />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 mx-auto px-3 py-1.5 bg-teal text-cream rounded-lg hover:bg-ink transition-colors duration-200 shadow-sm text-sm"
                >
                  <Download className="w-3 h-3" />
                  <span className="font-lora">Download QR</span>
                </button>
              </div>
              <p className="font-lora text-ink/60 text-xs">
                Scan with any camera app
              </p>
            </div>

            {/* Social Media Buttons */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cream/20">
              <h5 className="font-playfair text-lg font-bold text-ink mb-4 text-center">
                Share on Social Media
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareOnSocial('instagram')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-3 py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs">Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs">Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial('tiktok')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-3 py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs">TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial('twitter')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-3 py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs">Twitter</span>
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div 
          className="text-center mt-8"
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal/10 to-sand/20 px-6 py-3 rounded-xl border border-teal/20">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-gradient-to-r from-teal to-teal/80 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-sand to-sand/80 rounded-full border-2 border-white"></div>
            </div>
            <span className="font-lora text-ink/70 font-medium text-sm">
              Share with friends & family • Your photos will appear automatically!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}