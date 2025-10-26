"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="relative border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl overflow-hidden">
            {/* Glass morphism layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#49513C]/5 via-transparent to-[#49513C]/5"></div>
            
            <CardContent className="relative p-4 sm:p-6">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 sm:w-32" />
                    <Skeleton className="h-3 w-20 sm:w-24" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-16 sm:h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#49513C]/30 to-[#49513C]/20 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#49513C]/30 to-[#49513C]/20 rounded-full flex items-center justify-center mx-auto shadow-lg backdrop-blur-sm border border-white/30">
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[#49513C] drop-shadow-lg" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold mb-3 sm:mb-4 drop-shadow-sm" style={{ color: '#49513C' }}>
          No Messages Yet
        </h3>
        <p className="text-sm sm:text-base lg:text-lg font-lora max-w-md mx-auto leading-relaxed" style={{ color: '#49513C' }}>
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-[#49513C]/60">
            <Sparkles className="h-4 w-4 animate-pulse drop-shadow-sm" />
            <span className="text-xs sm:text-sm font-lora" style={{ color: '#49513C' }}>Your message will appear here</span>
            <Sparkles className="h-4 w-4 animate-pulse drop-shadow-sm" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal/25 rounded-full blur-lg animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-right-6 pointer-events-none"></div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-teal/20 rounded-full blur-xl animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-left-6 pointer-events-none"></div>
      
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl hover:bg-white/25 hover:border-white/40 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 group overflow-hidden transform ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Glass morphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#49513C]/5 via-transparent to-[#49513C]/5"></div>
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/40 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#49513C]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
          
          <CardContent className="relative p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#49513C] via-[#49513C]/90 to-[#49513C]/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg backdrop-blur-sm border border-white/20">
                    <span className="text-white font-lora text-sm sm:text-base font-semibold drop-shadow-lg">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#49513C]/40 to-[#49513C]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-base sm:text-lg font-semibold truncate" style={{ color: '#49513C' }}>{msg.name}</h4>
                  <span className="text-xs sm:text-sm font-lora" style={{ color: '#49513C', opacity: 0.7 }}>
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#49513C]/70 fill-[#49513C]/20 group-hover:fill-[#49513C]/40 group-hover:text-[#49513C] transition-all duration-300 drop-shadow-sm" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#49513C]/50 group-hover:text-[#49513C]/70 transition-colors duration-300 drop-shadow-sm" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-2xl sm:text-4xl text-[#49513C]/30 font-playfair group-hover:text-[#49513C]/50 transition-colors duration-300 drop-shadow-sm">"</span>
              <p className="text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora transition-colors duration-300 drop-shadow-sm" style={{ color: '#49513C' }}>{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-2xl sm:text-4xl text-[#49513C]/30 font-playfair group-hover:text-[#49513C]/50 transition-colors duration-300 drop-shadow-sm">"</span>
            </div>
            
            {/* Message bottom accent */}
            <div className="mt-3 sm:mt-4 flex justify-end">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#49513C]/30 to-transparent group-hover:via-[#49513C]/50 transition-colors duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
