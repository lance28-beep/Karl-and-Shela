"use client"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { WeddingPartyMessages } from "@/components/wedding-party-messages"

interface EntourageMember {
  id: number
  name: string
  role: string
  side: "bride" | "groom"
  category?: string
}

export function Entourage() {
  const members: EntourageMember[] = [
    // Bride's Party
    { id: 1, name: "Leslie Diane Agbuya", role: "Maid of Honor", side: "bride", category: "honor" },
    { id: 2, name: "Renzylle Jade Agbuya", role: "Bridesmaid", side: "bride", category: "secondary" },
    { id: 3, name: "Rizza Marie Deslate", role: "Bridesmaid", side: "bride", category: "secondary" },
    { id: 4, name: "April Ann Villanueva", role: "Bridesmaid", side: "bride", category: "secondary" },
    { id: 5, name: "Arlyn Vista", role: "Bridesmaid", side: "bride", category: "secondary" },
    { id: 6, name: "Lhizbeth Anne Agulan", role: "Bridesmaid", side: "bride", category: "secondary" },
    { id: 7, name: "Allysa Lagaña", role: "Veil", side: "bride", category: "special" },
    { id: 8, name: "Jee Rodriguez", role: "Cord", side: "bride", category: "special" },
    { id: 9, name: "Alexandria Sky Hernandez", role: "Flower Girl", side: "bride", category: "special" },

    // Groom's Party
    { id: 10, name: "Richard Agbuya", role: "Best Man", side: "groom", category: "honor" },
    { id: 11, name: "Ryzh Tracey Hernandez", role: "Groomsman", side: "groom", category: "secondary" },
    { id: 12, name: "Leonard Joeffrey Yambao", role: "Groomsman", side: "groom", category: "secondary" },
    { id: 13, name: "Renzo Carmelo Hernandez", role: "Groomsman", side: "groom", category: "secondary" },
    { id: 14, name: "Jozel Añasco", role: "Groomsman", side: "groom", category: "secondary" },
    { id: 15, name: "John Carsonn Siscar", role: "Groomsman", side: "groom", category: "secondary" },
    { id: 16, name: "Joshua Ruiz", role: "Candle", side: "groom", category: "special" },
    { id: 17, name: "Sevastian Dwane Ruiz", role: "Veil", side: "groom", category: "special" },
    { id: 18, name: "Izak Haley Hernandez", role: "Cord", side: "groom", category: "special" },
    { id: 19, name: "John Carlisle Ruiz", role: "Ring Bearer", side: "groom", category: "special" },
    { id: 20, name: "Renz Jasper Agbuya", role: "Bible Bearer", side: "groom", category: "special" },
    { id: 21, name: "Ronoroa Gin Sim", role: "Coin Bearer", side: "groom", category: "special" },
    { id: 22, name: "Phoebe Rielle Yambao", role: "Flower Girl", side: "groom", category: "special" },
  ]

  const brideParty = members.filter((m) => m.side === "bride")
  const groomParty = members.filter((m) => m.side === "groom")

  const PartySection = ({ title, members }: { title: string; members: EntourageMember[] }) => {
    const honorMembers = members.filter((m) => m.category === "honor")
    const secondaryMembers = members.filter((m) => m.category === "secondary")
    const specialMembers = members.filter((m) => m.category === "special")

    return (
      <div className="relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-8 left-8 w-6 h-6 border border-teal/15 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}>
            <div className="absolute inset-1 bg-teal/5 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          </div>
          <div className="absolute top-40 right-12 w-4 h-4 bg-gradient-to-br from-teal/10 to-transparent rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-24 left-16 w-8 h-8 border border-teal/12 rounded-full animate-spin" style={{ animationDuration: '25s' }}>
            <div className="absolute top-1 left-1 w-2 h-2 bg-teal/20 rounded-full"></div>
          </div>
          <div className="absolute top-56 right-6 w-3 h-3 bg-teal/8 rounded-full animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '2.8s' }}></div>
          
          {/* Floating Lines with Enhanced Effects */}
          <div className="absolute top-24 left-1/3 w-px h-20 bg-gradient-to-b from-transparent via-teal/12 to-transparent animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="absolute top-0 left-0 w-2 h-2 bg-teal/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute bottom-40 right-1/4 w-px h-16 bg-gradient-to-b from-transparent via-teal/10 to-transparent animate-pulse" style={{ animationDelay: '3s' }}>
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-teal/12 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Decorative Circles with Inner Elements */}
          <div className="absolute top-20 right-1/3 w-12 h-12 border border-teal/8 rounded-full animate-spin" style={{ animationDuration: '30s' }}>
            <div className="absolute top-2 left-2 w-2 h-2 bg-teal/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-teal/8 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="absolute bottom-20 left-1/4 w-10 h-10 border border-teal/6 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
            <div className="absolute top-1 right-1 w-1 h-1 bg-teal/12 rounded-full animate-ping"></div>
          </div>

          {/* Floating Diamond Shapes */}
          <div className="absolute top-32 left-1/2 w-4 h-4 bg-teal/8 transform rotate-45 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-32 right-1/2 w-3 h-3 bg-teal/6 transform rotate-45 animate-pulse" style={{ animationDelay: '3.5s', animationDuration: '3s' }}></div>

          {/* Wavy Lines */}
          <div className="absolute top-16 left-1/4 w-16 h-px bg-gradient-to-r from-transparent via-teal/8 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-teal/15 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
          </div>
        </div>

        {/* Enhanced Decorative divider */}
        <div className="flex items-center justify-center mb-24 relative">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent relative">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-0 right-1/4 w-1.5 h-1.5 bg-teal/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="mx-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal/8 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            <h3 className="text-5xl md:text-6xl font-playfair font-bold text-teal text-center relative z-10 transform hover:scale-105 transition-transform duration-500">
              {title}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-teal to-transparent rounded-full"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent rounded-full"></div>
            </h3>
            {/* Enhanced decorative elements around title */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border border-teal/25 rounded-full animate-pulse">
              <div className="absolute inset-1 bg-teal/10 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border border-teal/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
              <div className="absolute inset-1 bg-teal/10 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
            </div>
            <div className="absolute -bottom-3 -left-3 w-4 h-4 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0.5 bg-teal/8 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-4 h-4 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}>
              <div className="absolute inset-0.5 bg-teal/8 rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.8s' }}></div>
            </div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent relative">
            <div className="absolute top-0 left-1/3 w-1.5 h-1.5 bg-teal/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-0 right-1/3 w-2 h-2 bg-teal/20 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
          </div>
        </div>

        {/* Honor Attendants */}
        {honorMembers.length > 0 && (
          <div className="mb-24 relative">
            <div className="text-center mb-20">
              <h4 className="text-3xl font-playfair font-semibold text-ink mb-8 relative inline-block">
                Honor Attendants
                <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-teal/70 to-transparent rounded-full"></div>
                <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/40 to-transparent rounded-full"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal/35 rounded-full animate-pulse">
                  <div className="absolute inset-0.5 bg-teal/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="absolute -top-1 -left-2 w-2 h-2 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -top-1 -right-2 w-2 h-2 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </h4>
            </div>
            <div className="flex flex-wrap justify-center gap-20">
              {honorMembers.map((member, index) => (
                <div key={member.id} className="text-center group relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-teal/8 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg"></div>
                  <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white via-gray-50/40 to-white shadow-2xl hover:shadow-3xl transition-all duration-700 border border-teal/20 hover:border-teal/40 min-w-[240px] transform group-hover:scale-110 group-hover:-translate-y-2">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-6 right-6 w-4 h-4 bg-teal/25 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.7}s` }}>
                      <div className="absolute inset-1 bg-teal/15 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                    </div>
                    <div className="absolute top-4 left-4 w-2 h-2 bg-teal/15 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}></div>
                    <div className="relative z-10">
                      <h5 className="font-playfair font-bold text-ink text-2xl mb-5 group-hover:text-teal transition-colors duration-700">{member.name}</h5>
                      <p className="text-teal font-lora text-sm font-semibold tracking-widest uppercase">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Attendants */}
        {secondaryMembers.length > 0 && (
          <div className="mb-24 relative">
            <div className="text-center mb-20">
              <h4 className="text-3xl font-playfair font-semibold text-ink mb-8 relative inline-block">
                {title.includes("Bride") ? "Bridesmaids" : "Groomsmen"}
                <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-teal/70 to-transparent rounded-full"></div>
                <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/40 to-transparent rounded-full"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal/35 rounded-full animate-pulse">
                  <div className="absolute inset-0.5 bg-teal/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="absolute -top-1 -left-2 w-2 h-2 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -top-1 -right-2 w-2 h-2 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {secondaryMembers.map((member, index) => (
                <div key={member.id} className="text-center group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white via-gray-50/30 to-white shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100/60 hover:border-teal/30 transform group-hover:scale-108 group-hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-teal/20 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.4}s` }}>
                      <div className="absolute inset-0.5 bg-teal/10 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
                    </div>
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-teal/12 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
                    <div className="relative z-10">
                      <h5 className="font-playfair font-bold text-ink text-xl mb-4 group-hover:text-teal transition-colors duration-700">{member.name}</h5>
                      <p className="text-teal font-lora text-sm tracking-wide">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Roles */}
        {specialMembers.length > 0 && (
          <div className="relative">
            <div className="text-center mb-20">
              <h4 className="text-3xl font-playfair font-semibold text-ink mb-8 relative inline-block">
                Special Roles
                <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-teal/70 to-transparent rounded-full"></div>
                <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/40 to-transparent rounded-full"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal/35 rounded-full animate-pulse">
                  <div className="absolute inset-0.5 bg-teal/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="absolute -top-1 -left-2 w-2 h-2 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -top-1 -right-2 w-2 h-2 border border-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {specialMembers.map((member, index) => (
                <div key={member.id} className="text-center group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal/3 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                  <div className="relative p-7 rounded-xl bg-gradient-to-br from-white via-gray-50/20 to-white shadow-lg hover:shadow-xl transition-all duration-700 border border-gray-50/60 hover:border-teal/25 transform group-hover:scale-105 group-hover:-translate-y-0.5">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-teal/15 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.25}s` }}>
                      <div className="absolute inset-0.5 bg-teal/8 rounded-full animate-ping" style={{ animationDuration: '1.2s' }}></div>
                    </div>
                    <div className="absolute top-1 left-1 w-1 h-1 bg-teal/10 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.15}s` }}></div>
                    <div className="relative z-10">
                      <h5 className="font-playfair font-bold text-ink text-lg mb-3 group-hover:text-teal transition-colors duration-700">{member.name}</h5>
                      <p className="text-teal font-lora text-xs tracking-wide">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Section id="entourage" bgColor="white">
      <div className="relative overflow-hidden">
        {/* Enhanced Main animated background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating elements with enhanced effects */}
          <div className="absolute top-16 left-8 w-40 h-40 bg-gradient-to-br from-teal/4 to-transparent rounded-full animate-pulse blur-3xl" style={{ animationDuration: '12s' }}>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-teal/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          </div>
          <div className="absolute bottom-16 right-8 w-48 h-48 bg-gradient-to-br from-teal/3 to-transparent rounded-full animate-pulse blur-3xl" style={{ animationDuration: '15s', animationDelay: '3s' }}>
            <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-teal/8 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
          </div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-teal/5 to-transparent rounded-full animate-pulse blur-2xl" style={{ animationDuration: '10s', animationDelay: '5s' }}>
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-teal/12 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Enhanced grid pattern with animated dots */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20, 184, 166, 0.4) 1px, transparent 0)`,
            backgroundSize: '25px 25px'
          }}>
            <div className="absolute top-20 left-20 w-1 h-1 bg-teal/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-teal/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 left-40 w-1 h-1 bg-teal/18 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-20 w-6 h-6 border border-teal/10 rounded-full animate-spin" style={{ animationDuration: '40s' }}>
            <div className="absolute top-1 left-1 w-1 h-1 bg-teal/15 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-teal/8 transform rotate-45 animate-pulse" style={{ animationDuration: '6s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-28">
            <div className="relative inline-block">
              <Heading level="h2">Wedding Party</Heading>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-transparent via-teal to-transparent rounded-full"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent rounded-full"></div>
              <div className="absolute -top-3 -left-3 w-8 h-8 border border-teal/25 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-1 left-1 w-2 h-2 bg-teal/15 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 border border-teal/25 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                <div className="absolute top-1 right-1 w-2 h-2 bg-teal/15 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 font-lora leading-relaxed italic">
              We are deeply grateful to these wonderful people who have chosen to stand by our side 
              and make our special day even more meaningful. Their love, support, and friendship 
              have enriched our lives, and we couldn't imagine celebrating this moment without them.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent"></div>
            </div>
          </div>

          <div className="space-y-28">
            <PartySection title="Bride's Party" members={brideParty} />
            <PartySection title="Groom's Party" members={groomParty} />
          </div>
        </div>
      </div>
    </Section>
  )
}
