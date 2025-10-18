import { type NextRequest, NextResponse } from "next/server"
import { addRSVP } from "@/lib/rsvp-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, attending, numberOfGuests, mealPreference, message } = body

    // Validation
    if (!fullName || !email || !attending) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!["yes", "no"].includes(attending)) {
      return NextResponse.json({ error: "Invalid attendance value" }, { status: 400 })
    }

    if (fullName.length > 100 || email.length > 100) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 })
    }

    const rsvpEntry = addRSVP({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      attending,
      numberOfGuests,
      mealPreference: mealPreference || "",
      message: message?.trim() || "",
    })

    return NextResponse.json(rsvpEntry, { status: 201 })
  } catch (error) {
    console.error("Error processing RSVP:", error)
    return NextResponse.json({ error: "Failed to process RSVP" }, { status: 500 })
  }
}
