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
          <Card key={i} className="border border-teal/20 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
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
          <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-teal/10 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal/20 to-teal/10 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-teal" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-ink mb-3 sm:mb-4">
          No Messages Yet
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-ink/70 font-lora max-w-md mx-auto leading-relaxed">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-teal/60">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-xs sm:text-sm font-lora">Your message will appear here</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`border border-teal/20 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-500 group overflow-hidden transform ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-teal/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal/20 via-teal to-teal/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          
          <CardContent className="relative p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal to-teal/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white font-lora text-sm sm:text-base font-semibold">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/30 to-teal/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-ink text-base sm:text-lg font-semibold truncate">{msg.name}</h4>
                  <span className="text-xs sm:text-sm text-ink/60 font-lora">
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
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-teal/60 fill-teal/20 group-hover:fill-teal/40 group-hover:text-teal transition-all duration-300" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-teal/40 group-hover:text-teal/60 transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-2xl sm:text-4xl text-teal/30 font-playfair group-hover:text-teal/50 transition-colors duration-300">"</span>
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora group-hover:text-ink/90 transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-2xl sm:text-4xl text-teal/30 font-playfair group-hover:text-teal/50 transition-colors duration-300">"</span>
            </div>
            
            {/* Message bottom accent */}
            <div className="mt-3 sm:mt-4 flex justify-end">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent group-hover:via-teal/50 transition-colors duration-300"></div>
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
