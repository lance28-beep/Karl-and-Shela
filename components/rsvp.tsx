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
        "https://docs.google.com/forms/d/e/1FAIpQLSdlunzmGnvAdN0UUwWEZx0vri8Fp83prxHIkkwfHcu9rkfwHQ/formResponse",
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
        <Heading level="h2">RSVP</Heading>
        <div className="mt-4 bg-gradient-to-r from-teal/10 to-sand/20 rounded-xl p-3 sm:p-4 md:p-6 border border-teal/20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <div className="bg-teal/20 p-1.5 sm:p-2 rounded-full">
              <Heart className="text-teal" size={16} />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-playfair font-bold text-ink">We reserved seats for you</h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-ink/70 font-lora">
            The favor of your reply requested on or before{" "}
            <span className="font-semibold text-ink">{siteContent.details.rsvp.deadline}</span>
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-sand/20">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-teal font-lora tracking-wide">
                Full Name *
              </label>
              <input
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-teal/30 focus:border-teal rounded-lg sm:rounded-xl text-base sm:text-lg font-lora placeholder:text-ink/40 transition-all duration-200 hover:border-teal/50 focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-teal font-lora tracking-wide">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-teal/30 focus:border-teal rounded-lg sm:rounded-xl text-base sm:text-lg font-lora placeholder:text-ink/40 transition-all duration-200 hover:border-teal/50 focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-teal font-lora tracking-wide">
                Number of Guests *
              </label>
              <select
                name="guests"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-teal/30 focus:border-teal rounded-lg sm:rounded-xl text-base sm:text-lg font-lora bg-white transition-all duration-200 hover:border-teal/50 focus:ring-2 focus:ring-teal/20 cursor-pointer"
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
              <label className="block text-xs sm:text-sm font-medium text-teal font-lora tracking-wide">
                Message (Optional)
              </label>
              <textarea
                name="message"
                placeholder="Any special requests or dietary restrictions?"
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-teal/30 focus:border-teal rounded-lg sm:rounded-xl min-h-[100px] sm:min-h-[120px] text-base sm:text-lg font-lora placeholder:text-ink/40 transition-all duration-200 hover:border-teal/50 focus:ring-2 focus:ring-teal/20 resize-none"
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
              <div className="text-center mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
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
              <div className="text-center mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
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
