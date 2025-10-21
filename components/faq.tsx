"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
}

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "What time should I arrive?",
      answer:
        "We recommend arriving 15-20 minutes before the ceremony start time at 3:00 PM. This will give you time to find parking and be seated comfortably.",
    },
    {
      id: 2,
      question: "Is there parking available?",
      answer:
        "Yes, ample parking is available at both the ceremony and reception venues. Please follow the parking attendants' directions upon arrival.",
    },
    {
      id: 3,
      question: "What is the dress code?",
      answer:
        "The dress code is formal attire. We kindly request guests to wear elegant formal wear to celebrate this special occasion with us.",
    },
    {
      id: 4,
      question: "Can I bring a plus one?",
      answer:
        "Please RSVP with the number of guests you plan to bring. If you have specific questions about additional guests, please contact us directly.",
    },
    {
      id: 5,
      question: "Are children welcome?",
      answer:
        "We kindly request that our wedding celebration be adults-only. We appreciate your understanding and look forward to celebrating with you.",
    },
    {
      id: 6,
      question: "What are the meal options?",
      answer:
        "During the RSVP process, you can select from regular, vegetarian, vegan, or gluten-free meal options. Please let us know your preference.",
    },
    {
      id: 7,
      question: "Will there be a reception?",
      answer:
        "Yes! The reception will follow immediately after the ceremony at Alta D' Tagaytay Hotel. We look forward to celebrating with you there.",
    },
    {
      id: 8,
      question: "How do I RSVP?",
      answer:
        "You can RSVP using the form on this website. Please submit your response by November 20, 2025 to help us with final planning.",
    },
  ]

  return (
    <Section id="faq" bgColor="cream">
      <Heading level="h2">Frequently Asked Questions</Heading>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-soft overflow-hidden">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-sand/10 transition-colors text-left"
              aria-expanded={openId === faq.id}
            >
              <h3 className="font-playfair font-bold text-ink text-lg">{faq.question}</h3>
              <ChevronDown
                size={24}
                className={`text-teal flex-shrink-0 transition-transform duration-300 ${
                  openId === faq.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {openId === faq.id && (
              <div className="px-6 py-4 bg-sand/5 border-t-2 border-sand">
                <p className="text-ink/80 font-lora leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
