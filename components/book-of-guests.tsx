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
        "https://script.google.com/macros/s/AKfycbyYLQd2L3VZq45XGt5c4I8MNtlybMZrl3piO8LAMOPzJ9i3FgGs5iNbBRXQ8eK5jA17/exec",
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
        <Heading level="h2">Book of Guests</Heading>
        <div className="mt-4 bg-gradient-to-r from-teal/10 to-sand/20 rounded-xl p-3 sm:p-4 md:p-6 border border-teal/20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <div className="bg-teal/20 p-1.5 sm:p-2 rounded-full">
              <Heart className="text-teal" size={16} />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-playfair font-bold text-ink">
              {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
            </h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-ink/70 font-lora">
            Thank you to everyone who has RSVP'd! We can't wait to celebrate with you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-sand/20">
          {isLoading ? (
            <div className="flex items-center justify-center h-32 sm:h-40">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-teal" />
                <span className="text-teal font-lora text-sm sm:text-base">Loading guests...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-32 sm:h-40 text-red-500">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <span className="font-lora text-sm sm:text-base">{error}</span>
              </div>
            </div>
          ) : guests.length === 0 ? (
            <div className="flex items-center justify-center h-32 sm:h-40 text-ink/60">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="font-lora text-sm sm:text-base">No guests have RSVP'd yet</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {guests.map((guest, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg transition-all duration-300 hover:shadow-md ${
                    index % 2 === 0 ? "bg-teal/5" : "bg-white"
                  } border border-teal/20`}
                >
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-lora text-ink text-base sm:text-lg flex items-center gap-2">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-teal" />
                          {guest.name}
                        </h4>
                        <div className="flex items-center text-xs sm:text-sm text-ink/60 mt-1">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-teal" />
                          <span className="font-lora break-all">{guest.email}</span>
                        </div>
                      </div>
                      <div className="bg-teal/20 text-teal border border-teal/30 font-lora px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm self-start sm:self-auto">
                        {guest.guests} {parseInt(guest.guests) === 1 ? "Guest" : "Guests"}
                      </div>
                    </div>

                    {guest.message && (
                      <div className="pt-2 sm:pt-3 border-t border-teal/20">
                        <div className="flex items-start">
                          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5 text-teal/60 flex-shrink-0" />
                          <p className="text-xs sm:text-sm text-ink/80 font-lora">{guest.message}</p>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-ink/40 flex items-center gap-1.5">
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
    </Section>
  )
}
