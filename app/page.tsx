import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Countdown } from "@/components/countdown"
import { LoveStory } from "@/components/love-story"
import { Gallery } from "@/components/gallery"
import { Messages } from "@/components/messages"
import { Details } from "@/components/details"
import { Entourage } from "@/components/entourage"
import { RSVP } from "@/components/rsvp"
import { BookOfGuests } from "@/components/book-of-guests"
import { Registry } from "@/components/registry"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { SnapShare } from "@/components/snap-share"

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Countdown />
      <LoveStory />
      <Gallery />
      <Messages />
      <Details />
      <Entourage />
      <RSVP />
      <BookOfGuests />
      <Registry />
      <FAQ />
      <SnapShare />
      <Footer />
    </main>
  )
}
