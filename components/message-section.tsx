"use client"

import TextType from './TextType'

export function MessageSection() {
  return (
    <section 
      className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: '#49513C' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 md:space-y-8">
          {/* Quote decoration */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-white/30" />
            <div className="text-4xl md:text-5xl text-white/20 font-serif">"</div>
            <div className="w-8 h-0.5 bg-white/30" />
          </div>

          {/* Main message text with typing effect */}
          <div className="px-4 md:px-8 lg:px-12">
            <TextType
              text="Mapasalamaton kami sa tanan, sa inyo gugma, suporta, ug panaghigalaay sa daghang mga tuig. Usa mo sa importante nga higala nga gusto namo makauban sa pagsulog sa among kasal. Ubani kami sa bag.o nga kapitulo isip bag.ong magtiayon."
              className="text-base md:text-lg lg:text-xl text-white/95 leading-relaxed font-serif italic"
              typingSpeed={30}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.8}
              startOnVisible={true}
              loop={false}
            />
          </div>

          {/* Author attribution */}
          <div className="pt-6 md:pt-8">
            <div className="inline-block px-6 py-2 border-l-2 border-white/40">
              <p className="text-sm md:text-base lg:text-lg text-white font-semibold tracking-wide">
                — Karl Joseph & Shela Marie
              </p>
            </div>
          </div>

          {/* Quote decoration bottom */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-8 h-0.5 bg-white/30" />
            <div className="text-4xl md:text-5xl text-white/20 font-serif transform rotate-180">"</div>
            <div className="w-8 h-0.5 bg-white/30" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-8 left-8 w-16 h-16 opacity-5">
          <div className="w-full h-full border border-white/20 rounded-full" />
        </div>
        <div className="absolute bottom-8 right-8 w-12 h-12 opacity-5">
          <div className="w-full h-full border border-white/20 rounded-full" />
        </div>
      </div>
    </section>
  )
}

