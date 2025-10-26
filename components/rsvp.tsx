"use client"

import { useRef, useState } from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Heart, CheckCircle, AlertCircle } from "lucide-react"
import { siteContent } from "@/lib/content"

interface RSVPFormProps {
  onSuccess?: () => void
}

export function RSVP({ onSuccess }: RSVPFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const guests = formData.get("guests") as string
    const message = formData.get("message") as string

    // Google Forms integration
    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.1755234596", email)
    googleFormData.append("entry.1335956832", guests)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSf1Xo61luxF_Vbc-aa1zRIjzRM6KIBbyAKt87Q1jCKOkyewhQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      formRef.current?.reset()
      if (onSuccess) onSuccess()
      window.dispatchEvent(new Event("rsvpUpdated"))

      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      setIsSubmitting(false)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <Section id="rsvp" bgColor="sand">
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
        <Heading level="h2" style={{ color: '#49513C' }}>RSVP</Heading>
        <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white/40 max-w-2xl mx-auto shadow-lg">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <div className="bg-teal/20 p-1.5 sm:p-2 rounded-full">
              <Heart className="text-teal" size={16} />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-playfair font-bold text-[#49513C]">We reserved seats for you</h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#49513C]/90 font-lora">
            The favor of your reply requested on or before{" "}
            <span className="font-semibold text-[#49513C]">{siteContent.details.rsvp.deadline}</span>
          </p>
          <div className="mt-3 p-4 bg-gradient-to-br from-yellow-50 to-yellow-50/80 border border-yellow-200/60 rounded-lg shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              {/* <div className="flex-shrink-0 bg-yellow-100 p-1.5 rounded-full border border-yellow-300/50">
                <AlertCircle className="text-yellow-700" size={18} />
              </div> */}
              <div className="flex-1">
                <h4 className="text-yellow-800 font-lora font-bold text-sm sm:text-base mb-2">Seats are Limited</h4>
                <p className="text-yellow-700 font-lora text-xs sm:text-sm leading-relaxed text-left">
                  Please be aware to ensure that we can accommodate all invited guests, we regret that we cannot offer plus-ones invitations. Each seat is carefully accounted for, and yours is eagerly awaited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`relative w-full border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl transition-all duration-700 group overflow-hidden rounded-xl ${
            isFocused ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] scale-[1.02] border-white/50 bg-white/30' : 'hover:shadow-2xl hover:bg-white/25'
          }`}
        >
          {/* Frosted glass layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
          
          {/* Shimmer effect on focus */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 ${
            isFocused ? 'opacity-100' : ''
          }`}></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/40 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal/25 rounded-full blur-lg animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-left-6"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal/20 rounded-full blur-xl animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-right-6"></div>
          <div className="absolute top-1/2 -left-2 w-6 h-6 bg-teal/20 rounded-full blur-md animate-pulse sm:w-8 sm:h-8 sm:-left-3"></div>
          <div className="absolute bottom-1/4 right-4 w-10 h-10 bg-teal/15 rounded-full blur-lg animate-pulse sm:w-14 sm:h-14 sm:right-6"></div>

          <form ref={formRef} onSubmit={handleSubmit} className="relative p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-[#49513C] font-lora tracking-wide">
                Full Name *
              </label>
              <input
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-white/30 focus:border-white/60 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl text-base sm:text-lg font-lora text-[#49513C] placeholder:text-[#49513C]/50 transition-all duration-200 hover:border-white/50 focus:ring-2 focus:ring-white/20 hover:bg-white/50"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-[#49513C] font-lora tracking-wide">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-white/30 focus:border-white/60 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl text-base sm:text-lg font-lora text-[#49513C] placeholder:text-[#49513C]/50 transition-all duration-200 hover:border-white/50 focus:ring-2 focus:ring-white/20 hover:bg-white/50"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-[#49513C] font-lora tracking-wide">
                Number of Guests *
              </label>
              <select
                name="guests"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-white/30 focus:border-white/60 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl text-base sm:text-lg font-lora text-[#49513C] transition-all duration-200 hover:border-white/50 focus:ring-2 focus:ring-white/20 hover:bg-white/50 cursor-pointer"
              >
                <option value="">Select number of guests</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-[#49513C] font-lora tracking-wide">
                Message (Optional)
              </label>
              <textarea
                name="message"
                placeholder="Any special requests or dietary restrictions?"
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-white/30 focus:border-white/60 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl min-h-[100px] sm:min-h-[120px] text-base sm:text-lg font-lora text-[#49513C] placeholder:text-[#49513C]/50 transition-all duration-200 hover:border-white/50 focus:ring-2 focus:ring-white/20 hover:bg-white/50 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal to-teal/80 hover:from-teal/80 hover:to-teal text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-lora shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit RSVP"
              )}
            </Button>

            {isSubmitted && (
              <div className="text-center mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={18} />
                  <span className="text-green-600 font-lora font-semibold text-sm sm:text-base">RSVP Sent!</span>
                </div>
                <p className="text-green-600 font-lora text-xs sm:text-sm">
                  Thank you for your RSVP! We look forward to celebrating with you.
                </p>
              </div>
            )}

            {error && (
              <div className="text-center mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertCircle className="text-red-500" size={18} />
                  <span className="text-red-500 font-lora font-semibold text-sm sm:text-base">Error</span>
                </div>
                <p className="text-red-500 font-lora text-xs sm:text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>
  )
}
