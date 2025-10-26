"use client"

import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Heart, Users, Gamepad2, BookOpen, Car, Home, Gift, Calendar, MapPin, Sparkles } from "lucide-react"

export function FunFacts() {
  const funFacts = [
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "College Sweethearts",
      description: "They have been together when Shela was still in Senior Highschool and Karl was a 1st year College"
    },
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Inner Child Healing",
      description: "They both love to heal their inner child, Karl loves his Gundams, Pokemons and Figurines and Shela loves to read books, journal and road trips."
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Fur Babies",
      description: "They have 2 four-legged daughters, Shopi and Levie"
    },
    {
      icon: <Car className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Big Boy Purchase",
      description: "Karl bought his first big boy purchase, his motor"
    },
    {
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Childhood Dreams",
      description: "Shela was able to acquire a doll house she wanted when she was a child."
    },
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Spoiling Each Other",
      description: "Karl loves to spoil Shela in his own little ways, Shela loves to annoy Karl"
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Monthsary Tradition",
      description: "Karl never missed a monthsary (dinner dates + flowers)"
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Travel Planning",
      description: "Shela always planned the trip and Karl's outfit"
    },
    {
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
      title: "Household Harmony",
      description: "Shela do the laundry while Karl do the folding"
    }
  ]

  return (
    <Section id="fun-facts" bgColor="cream" className="overflow-hidden">
      <div className="min-h-screen" style={{ backgroundColor: '#49513C' }}>
        {/* Header */}
        <div className="text-center pt-8 sm:pt-10 md:pt-14 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 mb-3 sm:mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/80 animate-pulse" />
            <Heading level="h2" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-white">
              Some Fun Facts
            </Heading>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/80 animate-pulse" />
          </div>
          <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl font-lora">About the Couple</p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
            <div className="w-8 sm:w-10 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-white/30 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-8 sm:w-10 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Fun Facts Grid - Full Width Enhanced */}
        <div className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24" style={{ backgroundColor: '#49513C' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className="group relative mx-0"
              >
                {/* Enhanced Card with Gradient Border */}
                <div className="relative h-full bg-gradient-to-br from-white to-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_8px_50px_rgba(0,0,0,0.25)] hover:-translate-y-2 overflow-hidden">
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#49513C]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon and Title in One Row */}
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="relative bg-gradient-to-br from-[#49513C]/20 to-[#49513C]/10 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#49513C]/30 to-transparent rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        <div className="relative text-[#49513C]">
                          {fact.icon}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-playfair font-bold text-[#49513C] group-hover:text-[#3a422f] transition-colors duration-500 flex-1 line-clamp-2">
                        {fact.title}
                      </h3>
                      
                      {/* Number Badge - moved inline */}
                      <div className="w-6 h-6 md:w-8 md:h-10 flex items-center justify-center font-playfair font-bold text-[#49513C]/40 text-xs md:text-sm group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-[#49513C]/80 font-lora leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg flex-grow group-hover:text-[#49513C] transition-colors duration-500 mb-4 md:mb-6">
                      {fact.description}
                    </p>

                    {/* Decorative Divider */}
                    <div className="mt-auto flex items-center gap-2">
                      <div className="flex-1 h-px bg-gradient-to-r from-[#49513C]/20 via-[#49513C]/30 to-transparent"></div>
                      <Heart className="w-3 h-3 md:w-4 md:h-4 text-[#49513C]/40 animate-pulse" />
                      <div className="flex-1 h-px bg-gradient-to-l from-[#49513C]/20 via-[#49513C]/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  )
}
