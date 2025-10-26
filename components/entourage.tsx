"use client"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { WeddingPartyMessages } from "@/components/wedding-party-messages"

interface EntourageMember {
  id: number
  name: string
  role: string
  side?: "bride" | "groom"
  category?: string
}

export function Entourage() {
  // Parents
  const groomParents = [
    "Mr. Joseph C. Suico",
    "Mrs. Jennifer Zeta Suico"
  ]
  const brideParents = [
    "Mr. Baltazar T. Rivera",
    "Mrs. Susana Lapiz Rivera"
  ]

  // Honor Attendants
  const maidOfHonor = "Ms. Krizha Marie Bangud"
  const bestMan = "Mr. Kurt Anthony Suico"

  // Secondary Sponsors
  const groomsmen = [
    "Mr. Cristaniel Zeta",
    "Mr. Christian De Letran",
    "Mr. Baltazar Rivera Jr.",
    "Mr. Genesis Logronio",
    "Mr. Angel Mark Sicad",
    "Mr. Francis Janea",
    "Mr. Richard James Bardos",
    "Mr. James Roland Suico"
  ]

  const bridesmaids = [
    "Ms. Stella Maris Rivera",
    "Ms. Lecille Gentapa",
    "Ms. Lea Nacua",
    "Ms. Christine Marie Rivera",
    "Ms. Angelica Auman",
    "Ms. Mika Veron Zeta",
    "Ms. Kelly Ann Janea",
    "Ms. Christ Mary De Letran"
  ]

  // Flower Girls
  const flowerGirls = [
    "Puleen Nina Mangompit",
    "Mezhaime Anne Rivera",
    "Sofia Jane Gabuya"
  ]

  // Fur of Honors
  const furOfHonors = [
    "Shopi Marie",
    "Levie Mae"
  ]

  // Bearers
  const coinBearer = "Christoff Jacob De Letran"
  const bibleBearer = "Vince Isaac Pono"
  const ringBearer = "Zhairo Vhan Rivera"

  // Secondary Sponsors
  const candle = ["Mr. Jovanne Rivera", "Ms. Miraflor Rivera"]
  const cord = ["Mr. to Follow", "Ms. Regina Marie Suico-Osores"]
  const veil = ["Mr. to Follow", "Ms. to Follow"]

  const SectionTitle = ({ title }: { title: string }) => (
      <div className="text-center mb-12 md:mb-16">
        <div className="relative inline-block">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-6 relative">
            {title}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
          </h3>
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border border-white/20 rounded-full animate-pulse">
            <div className="absolute inset-0.5 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0.5 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          </div>
                    </div>
                  </div>
  )

  const TwoColumnSection = ({ leftTitle, leftNames, rightTitle, rightNames }: {
    leftTitle: string
    leftNames: string[]
    rightTitle: string
    rightNames: string[]
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
      <div className="group relative">
        <div className="absolute -inset-3 bg-gradient-to-br from-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-teal/20 hover:border-teal/30">
          <div className="text-center">
            <h4 className="text-xl md:text-2xl font-playfair font-semibold text-teal mb-4 md:mb-6 relative">
              {leftTitle}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-teal/40 to-transparent rounded-full"></div>
            </h4>
            <div className="space-y-2 md:space-y-3">
              {leftNames.map((name, index) => (
                <div key={index} className="group/item">
                  <p className="text-sm md:text-base text-gray-800 font-lora group-hover/item:text-teal transition-colors duration-300 font-semibold">{name}</p>
                </div>
              ))}
            </div>
          </div>
                    </div>
                  </div>
      <div className="group relative">
        <div className="absolute -inset-3 bg-gradient-to-br from-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-teal/20 hover:border-teal/30">
          <div className="text-center">
            <h4 className="text-xl md:text-2xl font-playfair font-semibold text-teal mb-4 md:mb-6 relative">
              {rightTitle}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-teal/40 to-transparent rounded-full"></div>
            </h4>
            <div className="space-y-2 md:space-y-3">
              {rightNames.map((name, index) => (
                <div key={index} className="group/item">
                  <p className="text-sm md:text-base text-gray-800 font-lora group-hover/item:text-teal transition-colors duration-300 font-semibold">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
                </div>
  )

  const SingleColumnSection = ({ title, names }: { title: string; names: string[] }) => (
    <div className="relative group mb-16 md:mb-20">
      <div className="absolute -inset-4 bg-gradient-to-br from-teal/3 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-teal/20 hover:border-teal/30">
        <div className="text-center">
          <h4 className="text-xl md:text-2xl font-playfair font-semibold text-teal mb-4 md:mb-6 relative">
            {title}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-teal/40 to-transparent rounded-full"></div>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {names.map((name, index) => (
              <div key={index} className="group/item">
                <p className="text-xs md:text-sm text-gray-800 font-lora group-hover/item:text-teal transition-colors duration-300 font-semibold">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const SpecialRoleSection = ({ title, names }: { title: string; names: string | string[] }) => (
    <div className="group relative mb-8 md:mb-12">
      <div className="absolute -inset-2 bg-gradient-to-br from-teal/4 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg"></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-500 border border-teal/20 hover:border-teal/30">
        <div className="text-center">
          <h4 className="text-lg md:text-xl font-playfair font-semibold text-teal mb-3 md:mb-4 relative">
            {title}
            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent rounded-full"></div>
          </h4>
          <div className="space-y-1 md:space-y-2">
            {Array.isArray(names) ? (
              names.map((name, index) => (
                <div key={index} className="group/item">
                  <p className="text-xs md:text-sm text-gray-800 font-lora group-hover/item:text-teal transition-colors duration-300 font-semibold">{name}</p>
                </div>
              ))
            ) : (
              <div className="group/item">
                <p className="text-xs md:text-sm text-gray-800 font-lora group-hover/item:text-teal transition-colors duration-300 font-semibold">{names}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Section id="entourage" bgColor="#49513C">
      <div className="relative overflow-hidden">
        {/* Enhanced Main animated background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating elements with enhanced effects */}
          <div className="absolute top-16 left-8 w-40 h-40 bg-gradient-to-br from-white/4 to-transparent rounded-full animate-pulse blur-3xl" style={{ animationDuration: '12s' }}>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          </div>
          <div className="absolute bottom-16 right-8 w-48 h-48 bg-gradient-to-br from-white/3 to-transparent rounded-full animate-pulse blur-3xl" style={{ animationDuration: '15s', animationDelay: '3s' }}>
            <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/8 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
          </div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full animate-pulse blur-2xl" style={{ animationDuration: '10s', animationDelay: '5s' }}>
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/12 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Enhanced grid pattern with animated dots */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
            backgroundSize: '25px 25px'
          }}>
            <div className="absolute top-20 left-20 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 left-40 w-1 h-1 bg-white/18 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-20 w-6 h-6 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '40s' }}>
            <div className="absolute top-1 left-1 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-white/8 transform rotate-45 animate-pulse" style={{ animationDuration: '6s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Title */}
          <div className="text-center mb-16 md:mb-20">
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 relative">
                Suico & Rivera
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-1.5 md:h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
              </h1>
              {/* Elegant decorative elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border border-white/25 rounded-full animate-spin" style={{ animationDuration: '30s' }}>
                <div className="absolute top-1 left-1 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border border-white/25 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                <div className="absolute top-1 right-1 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-3 -left-2 w-4 h-4 border border-white/20 rounded-full animate-pulse">
                <div className="absolute inset-0.5 bg-white/15 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              </div>
              <div className="absolute -bottom-3 -right-2 w-4 h-4 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0.5 bg-white/15 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center mb-16 md:mb-20">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent relative">
              <div className="absolute top-0 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-0 right-1/4 w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="mx-6 relative">
              <div className="w-12 h-12 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1.5 right-1.5 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent relative">
              <div className="absolute top-0 left-1/3 w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-0 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
            </div>
          </div>

          {/* Parents */}
          <TwoColumnSection 
            leftTitle="Groom's Parents" 
            leftNames={groomParents} 
            rightTitle="Bride's Parents" 
            rightNames={brideParents} 
          />

          {/* Best Man and Maid of Honor */}
          <SectionTitle title="Our Entourage" />
          <TwoColumnSection 
            leftTitle="Maid of Honor" 
            leftNames={[maidOfHonor]} 
            rightTitle="Best Man" 
            rightNames={[bestMan]} 
          />

          {/* Groomsmen and Bridesmaids */}
          <TwoColumnSection 
            leftTitle="Groomsmen" 
            leftNames={groomsmen} 
            rightTitle="Bridesmaids" 
            rightNames={bridesmaids} 
          />

          {/* Secondary Sponsors */}
          <SectionTitle title="Secondary Sponsors" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <SpecialRoleSection title="Candle" names={candle} />
            <SpecialRoleSection title="Cord" names={cord} />
            <SpecialRoleSection title="Veil" names={veil} />
          </div>

          {/* Flower Girls */}
          <div className="text-center mb-12 md:mb-16">
            <SpecialRoleSection title="Flower Girls" names={flowerGirls} />
          </div>

          {/* Fur of Honors */}
          <div className="text-center mb-12 md:mb-16">
            <SpecialRoleSection title="Fur of Honors" names={furOfHonors} />
          </div>

          {/* Bearers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <SpecialRoleSection title="Coin Bearer" names={coinBearer} />
            <SpecialRoleSection title="Bible Bearer" names={bibleBearer} />
            <SpecialRoleSection title="Ring Bearer" names={ringBearer} />
          </div>
        </div>
      </div>
    </Section>
  )
}
