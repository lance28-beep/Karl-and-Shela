interface RSVPEntry {
  id: string
  fullName: string
  email: string
  phone: string
  attending: "yes" | "no"
  numberOfGuests: number
  mealPreference: string
  message: string
  timestamp: string
}

const rsvpStore: RSVPEntry[] = []

export function addRSVP(data: {
  fullName: string
  email: string
  phone: string
  attending: "yes" | "no"
  numberOfGuests: string
  mealPreference: string
  message: string
}): RSVPEntry {
  const newEntry: RSVPEntry = {
    id: Date.now().toString(),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    attending: data.attending,
    numberOfGuests: Number.parseInt(data.numberOfGuests) || 1,
    mealPreference: data.mealPreference,
    message: data.message,
    timestamp: new Date().toISOString(),
  }
  rsvpStore.push(newEntry)
  return newEntry
}

export function getRSVPs(): RSVPEntry[] {
  return rsvpStore
}

export function getRSVPStats() {
  const attending = rsvpStore.filter((r) => r.attending === "yes").length
  const notAttending = rsvpStore.filter((r) => r.attending === "no").length
  const totalGuests = rsvpStore.reduce((sum, r) => sum + (r.attending === "yes" ? r.numberOfGuests : 0), 0)

  return { attending, notAttending, totalGuests }
}
