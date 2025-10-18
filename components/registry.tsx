import type React from "react"
import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Home } from "lucide-react"

interface RegistryItem {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  url: string
  color: string
}

export function Registry() {
  const registries: RegistryItem[] = [
    {
      id: 1,
      name: "Bed Bath & Beyond",
      description: "Home essentials and decor for our new life together",
      icon: <Home size={32} />,
      url: "#",
      color: "bg-blue-50",
    },
    {
      id: 2,
      name: "Williams Sonoma",
      description: "Kitchen and dining items for entertaining",
      icon: <Heart size={32} />,
      url: "#",
      color: "bg-red-50",
    },
    {
      id: 3,
      name: "Honeymoon Fund",
      description: "Help us create unforgettable memories on our honeymoon",
      icon: <Gift size={32} />,
      url: "#",
      color: "bg-purple-50",
    },
  ]

  return (
    <Section id="registry" bgColor="white">
      <Heading level="h2">Registry & Gifts</Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {registries.map((registry) => (
          <div key={registry.id} className={`${registry.color} rounded-lg p-8 shadow-soft text-center`}>
            <div className="flex justify-center mb-4 text-teal">{registry.icon}</div>
            <h3 className="text-xl font-playfair font-bold text-ink mb-2">{registry.name}</h3>
            <p className="text-ink/70 font-lora text-sm mb-6">{registry.description}</p>
            <Button variant="outline" size="md" className="w-full bg-transparent">
              View Registry
            </Button>
          </div>
        ))}
      </div>

      {/* Gift Message */}
      <div className="mt-12 bg-sand/30 rounded-lg p-8 text-center max-w-2xl mx-auto">
        <p className="text-ink/80 font-lora leading-relaxed">
          Your presence at our wedding is the greatest gift we could ask for. However, if you wish to give us a gift, we
          have created registries at the stores above. We appreciate your love and support as we begin this new chapter
          together.
        </p>
      </div>
    </Section>
  )
}
