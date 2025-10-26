"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfMwEUUnFPcNSIWVMis6RvrcBo7tzf8eW_ezHurfl_Zc2eTXA/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      formRef.current?.reset()
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden">
      {/* Animated background decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal/25 rounded-full blur-lg animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-left-6"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal/20 rounded-full blur-xl animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-right-6"></div>
      <div className="absolute top-1/2 -left-2 w-6 h-6 bg-teal/20 rounded-full blur-md animate-pulse sm:w-8 sm:h-8 sm:-left-3"></div>
      <div className="absolute bottom-1/4 right-4 w-10 h-10 bg-teal/15 rounded-full blur-lg animate-pulse sm:w-14 sm:h-14 sm:right-6"></div>
      
      {/* Glass morphism card */}
      <Card className={`relative w-full border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl transition-all duration-700 group overflow-hidden ${
        isFocused ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] scale-[1.02] border-white/50 bg-white/30' : 'hover:shadow-2xl hover:bg-white/25'
      }`}>
        {/* Frosted glass layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
        
        {/* Shimmer effect on focus */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 ${
          isFocused ? 'opacity-100' : ''
        }`}></div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 border border-white/40 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
        
        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          {/* Header with animated icon */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative inline-block mb-3 sm:mb-4">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal/40 to-teal/30 rounded-full blur-xl scale-150 animate-pulse"></div>
              {/* Glass icon container */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal/80 via-teal/70 to-teal/90 rounded-full flex items-center justify-center mx-auto shadow-lg backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-playfair font-bold mb-2 drop-shadow-sm" style={{ color: '#49513C' }}>
              Share Your Love
            </h3>
            <p className="text-xs sm:text-sm font-lora" style={{ color: '#49513C' }}>
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-5 sm:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-medium font-lora flex items-center gap-2 group/label" style={{ color: '#49513C' }}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal/30 to-teal/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-sm group-hover/label:scale-110 transition-transform duration-300">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-teal drop-shadow-sm" />
                </div>
                Your Name
              </label>
              <Input
                name="name"
                required
                placeholder="Enter your name"
                className="w-full border border-white/30 focus:border-teal rounded-xl py-3 sm:py-4 px-4 sm:px-5 text-sm sm:text-base font-lora transition-all duration-300 hover:border-white/50 focus:ring-2 focus:ring-teal/30 bg-white/20 backdrop-blur-md shadow-sm hover:shadow-md focus:shadow-lg hover:bg-white/25"
                style={{ color: '#49513C' }}
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-medium font-lora flex items-center gap-2 group/label" style={{ color: '#49513C' }}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal/30 to-teal/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-sm group-hover/label:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-teal drop-shadow-sm" />
                </div>
                Your Message
              </label>
              <Textarea
                name="message"
                required
                placeholder="Share your love, memories, or well wishes..."
                className="w-full border border-white/30 focus:border-teal rounded-xl min-h-[100px] sm:min-h-[120px] text-sm sm:text-base font-lora transition-all duration-300 hover:border-white/50 focus:ring-2 focus:ring-teal/30 resize-none bg-white/20 backdrop-blur-md shadow-sm hover:shadow-md focus:shadow-lg py-3 sm:py-4 px-4 sm:px-5 hover:bg-white/25"
                style={{ color: '#49513C' }}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal via-teal/90 to-teal hover:from-teal/90 hover:via-teal hover:to-teal/90 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-lora font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/btn backdrop-blur-sm border border-white/20"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              
              {/* Pulsing background */}
              <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-sm" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbz-ATsiqEXb3s6mhl4OivE3LoMoYVnJerKGA8vYeyio4ojlvyR7sInjgfzxSIJZAlof/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" bgColor="sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Heading level="h2" className="mb-4 sm:mb-6" style={{ color: '#49513C' }}>Love Messages</Heading>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold mb-3 sm:mb-4" style={{ color: '#49513C' }}>
              Share Your Heartfelt Wishes
            </h3>
            <p className="text-sm sm:text-base lg:text-lg font-lora leading-relaxed max-w-2xl mx-auto px-4" style={{ color: '#49513C' }}>
              Your messages of love and joy will be treasured forever. 
              Share your memories, well wishes, and congratulations for the happy couple.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center mb-12 sm:mb-16 lg:mb-20">
          <MessageForm onMessageSent={fetchMessages} />
        </div>

        {/* Messages Display Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-teal/15 to-teal/5 rounded-full blur-lg scale-150"></div>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal/15 to-teal/5 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-teal" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold mb-2 sm:mb-3" style={{ color: '#49513C' }}>
              Messages from Loved Ones
            </h3>
            <p className="text-sm sm:text-base lg:text-lg font-lora max-w-2xl mx-auto px-4" style={{ color: '#49513C' }}>
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

        {/* Footer Message */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center px-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 text-teal/70 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm border border-teal/20 hover:bg-white/80 hover:shadow-md transition-all duration-300">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
            <span className="text-xs sm:text-sm font-lora font-medium" style={{ color: '#49513C' }}>Messages are sent directly to the couple</span>
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: #49513C !important;
          opacity: 0.6;
        }
      `}</style>
    </Section>
  )
}
