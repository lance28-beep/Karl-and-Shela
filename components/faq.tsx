"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { ChevronDown, HelpCircle } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
  specialContent?: 'colors'
}

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "What time should I arrive for the ceremony?",
      answer:
        "The ceremony begins at 2:30 PM. We recommend arriving 15-20 minutes early to ensure you have time to find parking and be comfortably seated. The ceremony will take place at the National Shrine of St. Joseph in Mandaue City.",
    },
    {
      id: 2,
      question: "Is there parking available at both venues?",
      answer:
        "Yes, parking is available at both the ceremony venue (National Shrine of St. Joseph) and the reception venue (Chateau by the Sea in Punta Engano, Lapu-Lapu City). Please follow the parking attendants' directions upon arrival.",
    },
    {
      id: 3,
      question: "What should I wear?",
      answer:
        "The dress code is Formal/Semi-Formal. For gentlemen, please wear black pants and Barong. For ladies, please wear puff-sleeved shirts or Filipiana dress. We kindly request our guests to wear these colors:",
      specialContent: 'colors',
    },
    {
      id: 4,
      question: "Can I bring a date or plus one?",
      answer:
        "Please RSVP with the exact number of guests you plan to bring. If you have specific questions about bringing additional guests, please contact us directly through the RSVP form or message us.",
    },
    {
      id: 5,
      question: "What is the schedule for the day?",
      answer:
        "The ceremony starts at 2:30 PM at the National Shrine of St. Joseph. After the ceremony, there will be a photo shoot. The reception begins at 6:00 PM at Chateau by the Sea in Punta Engano, Lapu-Lapu City. The reception includes the first dance, dinner, cake cutting, games, speeches, and a live band that will perform throughout the evening.",
    },
    {
      id: 6,
      question: "What will be served at the reception?",
      answer:
        "A full dinner will be served during the reception. Please indicate any dietary restrictions or preferences (vegetarian, vegan, gluten-free) when you RSVP so we can accommodate your needs.",
    },
    {
      id: 7,
      question: "Will there be alcohol served?",
      answer:
        "Yes, alcoholic drinks will be available at the reception. However, only guests aged 21 and above will be served alcoholic beverages. Minors are strictly prohibited from consuming alcoholic drinks. There will be a variety of beverage options available for all guests.",
    },
    {
      id: 8,
      question: "Is photography allowed during the ceremony?",
      answer:
        "Our ceremony is UNPLUGGED. We kindly ask that you keep cameras and phones away during the ceremony. We have hired professional photographers to capture our special moments. However, photography and videography are welcome during the reception.",
    },
    {
      id: 9,
      question: "Are fans provided?",
      answer:
        "Yes! Fans will be provided for your comfort and to help create a breezy feel in the sunny weather. You're welcome to take them home with you.",
    },
    {
      id: 10,
      question: "How do I get to the reception venue from the ceremony?",
      answer:
        "The reception is at Chateau by the Sea in Punta Engano, Lapu-Lapu City, which is approximately a 30-45 minute drive from the ceremony venue depending on traffic. You can use the Google Maps links provided on the Details section of this website for directions.",
    },
    {
      id: 11,
      question: "What entertainment will there be?",
      answer:
        "We're excited to have a live band performing at the reception! Please don't leave early - let's party until the night ends! There will also be games, speeches, the same-day edit video presentation, and plenty of dancing.",
    },
    {
      id: 12,
      question: "How do I RSVP?",
      answer:
        "You can RSVP using the form on this website. Please submit your response by February 8, 2026 to help us with final planning and seating arrangements. Your timely response is greatly appreciated!",
    },
    {
      id: 13,
      question: "Are gifts expected?",
      answer:
        "Your presence is our greatest gift! Your attendance means the world to us. However, should you wish to give a gift, monetary gifts for our future together would be a delightful blessing. If you prefer to purchase a gift, feel free to surprise us in your own special way.",
    },
    {
      id: 14,
      question: "What if I can't attend?",
      answer:
        "We completely understand if you're unable to attend. Please still RSVP to let us know so we can plan accordingly. We'd love to celebrate with you another time.",
    },
  ]

  return (
    <Section id="faq" bgColor="#49513C">
      {/* Section Header with Icon */}
      <div className="text-center mb-12">
        <Heading level="h2" style={{ color: '#FFF9E0' }}>
          Frequently Asked Questions
        </Heading>
        <p className="mt-4 text-base md:text-lg font-lora" style={{ color: '#FFF9E0' }}>
          Got questions? We've got answers!
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => {
          const animationDelay = index * 0.1;
          return (
          <div
            key={faq.id}
            className="group relative bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 ease-out border border-white/20 hover:border-white/30 hover:-translate-y-1"
            style={{
              animation: `fadeInUp 0.6s ease-out ${animationDelay}s both`
            }}
          >
            {/* Enhanced Glass morphism background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-transparent pointer-events-none" />
            
            {/* Animated decorative glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream/0 via-cream/10 to-cream/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Subtle shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full pointer-events-none" />
            
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cream/20 to-transparent rounded-br-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cream/15 to-transparent rounded-tl-3xl pointer-events-none" />
            
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="relative w-full px-6 md:px-8 py-6 md:py-7 flex items-center justify-between gap-4 hover:bg-white/10 transition-all duration-500 text-left focus:outline-none focus:ring-4 focus:ring-cream/20 rounded-2xl active:scale-[0.98] group/button"
              aria-expanded={openId === faq.id}
              aria-controls={`faq-answer-${faq.id}`}
            >
              {/* Question Number Badge */}
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cream/20 to-cream/10 flex items-center justify-center font-playfair font-bold text-sm shadow-sm group-hover/button:scale-110 transition-transform duration-300"
                     style={{ color: '#FFF9E0' }}>
                  {faq.id}
                </div>
                <h3 
                  className="font-playfair font-bold text-base md:text-xl flex-1 transition-colors duration-300"
                  style={{ color: '#FFF9E0' }}
                >
                  {faq.question}
                </h3>
              </div>
              
              <ChevronDown
                size={28}
                className={`flex-shrink-0 transition-all duration-500 ${
                  openId === faq.id ? "rotate-180" : ""
                } group-hover/button:scale-110`}
                style={{ color: '#FFF9E0' }}
                aria-hidden="true"
              />
            </button>

            {openId === faq.id && (
              <div 
                id={`faq-answer-${faq.id}`}
                className="relative px-6 md:px-8 py-6 md:py-7 overflow-hidden"
                style={{
                  animation: 'slideDown 0.4s ease-out'
                }}
              >
                {/* Enhanced answer background with glass effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-cream/10 via-transparent to-cream/10 pointer-events-none" />
                
                {/* Left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cream/60 via-cream/40 to-transparent rounded-r" />
                
                <div className="relative pl-4 space-y-3">
                  <p 
                    className="font-lora leading-relaxed text-base md:text-lg font-medium"
                    style={{ color: '#FFF9E0' }}
                  >
                    {faq.answer}
                  </p>
                  
                  {/* Color Palette Display */}
                  {faq.specialContent === 'colors' && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm font-medium" style={{ color: '#FFF9E0' }}>Color Palette:</span>
                        {[
                          { name: 'Cream', color: '#FFF9E0' },
                          { name: 'Light Pink', color: '#FDDFDD' },
                          { name: 'Blush', color: '#F1D3D1' },
                          { name: 'Rose', color: '#E8B2B2' },
                          { name: 'Coral', color: '#FF9AA3' }
                        ].map((colorItem, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <div 
                              className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                              style={{ backgroundColor: colorItem.color }}
                              title={colorItem.name}
                            />
                            <span className="text-xs font-medium" style={{ color: '#FFF9E0' }}>
                              {colorItem.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm mt-2" style={{ color: '#FFF9E0' }}>
                        Please refrain from wearing jeans.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Bottom border accent with gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cream/50 to-transparent mt-4" />
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Additional Help Text */}
      <div className="mt-12 text-center">
        <p className="text-sm md:text-base font-lora italic" style={{ color: '#FFF9E0' }}>
          Still have questions? Feel free to reach out to us through the RSVP form or contact us directly.
        </p>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }
      `}</style>
    </Section>
  )
}
