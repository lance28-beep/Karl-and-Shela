import { type NextRequest, NextResponse } from "next/server"
import { addMessage, getMessages } from "@/lib/messages-store"

export async function GET() {
  try {
    const messages = getMessages()
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    // Validation
    if (!name || !message || typeof name !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    if (name.trim().length === 0 || message.trim().length === 0) {
      return NextResponse.json({ error: "Name and message cannot be empty" }, { status: 400 })
    }

    if (name.length > 100 || message.length > 500) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 })
    }

    const newMessage = addMessage(name.trim(), message.trim())
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error("Error posting message:", error)
    return NextResponse.json({ error: "Failed to post message" }, { status: 500 })
  }
}
