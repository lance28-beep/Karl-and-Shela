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
        "https://docs.google.com/forms/d/e/1FAIpQLScd7qjFfzHzrp195F5tmLJ-Px5MPbxyaL-HQhI_mllhoYw0fQ/formResponse",
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
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative background elements */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-teal/20 rounded-full blur-sm sm:w-8 sm:h-8 sm:-top-4 sm:-left-4"></div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal/10 rounded-full blur-md sm:w-12 sm:h-12 sm:-bottom-4 sm:-right-4"></div>
      
      <Card className="relative w-full border border-teal/20 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-teal/10 opacity-50"></div>
        
        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink font-lora flex items-center gap-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-teal" />
                Your Name
              </label>
              <Input
                name="name"
                required
                placeholder="Enter your name"
                className="w-full border border-teal/30 focus:border-teal rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-lora placeholder:text-ink/50 transition-all duration-200 hover:border-teal/50 focus:ring-2 focus:ring-teal/20 bg-white/80"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink font-lora flex items-center gap-2">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-teal" />
                Your Message
              </label>
              <Textarea
                name="message"
                required
                placeholder="Share your love, memories, or well wishes..."
                className="w-full border border-teal/30 focus:border-teal rounded-lg min-h-[80px] sm:min-h-[100px] text-sm sm:text-base font-lora placeholder:text-ink/50 transition-all duration-200 hover:border-teal/50 focus:ring-2 focus:ring-teal/20 resize-none bg-white/80 py-2.5 sm:py-3 px-3 sm:px-4"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal to-teal/90 hover:from-teal/90 hover:to-teal text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-lora shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
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
      "https://script.google.com/macros/s/AKfycbxivN_gEZ9NSrgb4xUIbujqaihR5r8SellxsOdgrzfcB3_51IEPnbkEPOGu3fOPeEnH/exec"
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
          <Heading level="h2" className="mb-4 sm:mb-6">Love Messages</Heading>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-teal/10 rounded-full blur-xl scale-150"></div>
              <MessageCircle className="relative h-12 w-12 sm:h-16 sm:w-16 text-teal mx-auto" />
            </div>
            
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-ink mb-3 sm:mb-4">
              Share Your Heartfelt Wishes
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-ink/80 font-lora leading-relaxed max-w-2xl mx-auto px-4">
              Your messages of love and joy will be treasured forever. 
              Share your memories, well wishes, and congratulations for the happy couple.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center px-4 mb-12 sm:mb-16">
          <MessageForm onMessageSent={fetchMessages} />
        </div>

        {/* Messages Display Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-playfair font-bold text-ink mb-2">
              Messages from Loved Ones
            </h3>
            <p className="text-sm sm:text-base text-ink/70 font-lora">
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

        {/* Footer Message */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center px-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 text-teal/70 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm border border-teal/20">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
            <span className="text-xs sm:text-sm font-lora font-medium">Messages are sent directly to the couple</span>
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
          </div>
        </div>
      </div>
    </Section>
  )
}
