"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Loader2, Users, Mail, Calendar, MessageSquare, Heart } from "lucide-react"

type GuestEntry = {
  timestamp: string
  name: string
  email: string
  guests: string
  message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<GuestEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzky9xR05ngSc6iALxTxikDeSQH-Vd5WJUx1Vuhqo84ni2D4fNDe8I6kI93rgakbPGVrw/exec",
        { cache: "no-store" }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data = await response.json()

      if (!data || !data.GoogleSheetData) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const rows: string[][] = data.GoogleSheetData
      if (!Array.isArray(rows) || rows.length <= 1) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const header = rows[0]
      const entries = rows.slice(1)

      const guestEntries: GuestEntry[] = entries.map((row) => {
        const rowObj: Record<string, string> = {}
        header.forEach((col, i) => {
          rowObj[col] = row[i] || ""
        })
        return {
          timestamp: rowObj["Timestamp"] || new Date().toISOString(),
          name: rowObj["Full Name"] || "Guest",
          email: rowObj["Email"] || "",
          guests: rowObj["Number Of Guests"] || "1",
          message: rowObj["Message"] || "",
        }
      })

      setGuests(guestEntries)
      setTotalGuests(guestEntries.reduce((sum, entry) => sum + parseInt(entry.guests), 0))
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <Section id="guests" bgColor="cream">
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
        <Heading level="h2" style={{ color: '#49513C' }}>Book of Guests</Heading> 
        <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white/40 max-w-2xl mx-auto shadow-lg">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <div className="bg-teal/20 p-1.5 sm:p-2 rounded-full">
              <Heart className="text-teal" size={16} />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-playfair font-bold text-[#49513C]">
              {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
            </h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#49513C]/90 font-lora">
            Thank you to everyone who has RSVP'd! We can't wait to celebrate with you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-0">
        <div className="relative w-full border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl rounded-xl p-4 sm:p-6 md:p-8 overflow-hidden group">
          {/* Glass morphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 border border-white/40 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal/25 rounded-full blur-lg animate-pulse sm:w-12 sm:h-12 sm:-top-6 sm:-left-6"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal/20 rounded-full blur-xl animate-pulse sm:w-16 sm:h-16 sm:-bottom-6 sm:-right-6"></div>

          <div className="relative">
            {isLoading ? (
              <div className="flex items-center justify-center h-32 sm:h-40">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-teal" />
                  <span className="text-teal font-lora text-sm sm:text-base">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32 sm:h-40">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <span className="font-lora text-sm sm:text-base text-red-600">{error}</span>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center h-32 sm:h-40">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-[#49513C]/50" />
                  <span className="font-lora text-sm sm:text-base text-[#49513C]/70">No guests have RSVP'd yet</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="relative border border-white/30 shadow-xl bg-white/20 backdrop-blur-xl hover:bg-white/25 hover:border-white/40 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 group overflow-hidden rounded-lg"
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {/* Glass morphism layers for each card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
                    
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* Animated border glow */}
                    <div className="absolute inset-0 border border-white/40 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
                    
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    
                    <div className="relative p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                        <div className="flex-1">
                          <h4 className="font-lora text-[#49513C] text-base sm:text-lg flex items-center gap-2 mb-2">
                            <div className="relative">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal via-teal/90 to-teal/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg backdrop-blur-sm border border-white/20">
                                <span className="text-white font-lora text-xs sm:text-sm font-semibold">
                                  {guest.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                </span>
                              </div>
                              {/* Avatar glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-teal/40 to-teal/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
                            </div>
                            {guest.name}
                          </h4>
                          <div className="flex items-center text-xs sm:text-sm text-[#49513C]/80 mt-1 ml-10 sm:ml-12">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-teal flex-shrink-0" />
                            <span className="font-lora break-all">{guest.email}</span>
                          </div>
                        </div>
                        <div className="bg-teal/20 text-teal border border-teal/30 font-lora px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm self-start sm:self-auto group-hover:bg-teal/30 group-hover:border-teal/40 transition-colors duration-300">
                          {guest.guests} {parseInt(guest.guests) === 1 ? "Guest" : "Guests"}
                        </div>
                      </div>

                      {guest.message && (
                        <div className="pt-3 border-t border-white/20 mt-3 ml-10 sm:ml-12">
                          <div className="flex items-start">
                            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5 text-teal/60 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-[#49513C]/90 font-lora">{guest.message}</p>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-[#49513C]/70 flex items-center gap-1.5 mt-3 ml-10 sm:ml-12">
                        <Calendar className="h-3 w-3" />
                        <span className="font-lora">RSVP'd on {formatDate(guest.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
    </Section>
  )
}
