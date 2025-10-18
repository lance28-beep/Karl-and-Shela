"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle } from "lucide-react"

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
      <div className="text-center py-12 sm:py-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-teal/10 rounded-full blur-xl scale-150"></div>
          <MessageCircle className="relative h-16 w-16 text-teal mx-auto" />
        </div>
        <h3 className="text-xl sm:text-2xl font-playfair font-bold text-ink mb-3">
          No Messages Yet
        </h3>
        <p className="text-sm sm:text-base text-ink/70 font-lora max-w-md mx-auto">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {messages.map((msg, index) => (
        <Card
          key={index}
          className="border border-teal/20 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal to-teal/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-lora text-sm sm:text-base font-semibold">
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-lora text-ink text-base sm:text-lg font-semibold">{msg.name}</h4>
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
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-teal/60 fill-teal/20 group-hover:fill-teal/40 group-hover:text-teal transition-all duration-300" />
            </div>
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-2xl sm:text-4xl text-teal/30 font-playfair">"</span>
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-2xl sm:text-4xl text-teal/30 font-playfair">"</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
