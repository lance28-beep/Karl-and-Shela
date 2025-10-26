import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MessageSection } from "@/components/message-section"
import { Countdown } from "@/components/countdown"
import { LoveStory } from "@/components/love-story"
import { FunFacts } from "@/components/fun-facts"
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
import Particles from "@/components/Particles"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#49513C' }}>
      {/* Global Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#FDDFDD', '#F1D3D1', '#E8B2B2']}
          particleCount={700}
          particleSpread={10}
          speed={0.7}
          particleBaseSize={150}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <MessageSection />
        <Countdown />
        <LoveStory />
        <FunFacts />
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
      </div>
    </main>
  )
}
