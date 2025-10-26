import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  bgColor?: "cream" | "sand" | "white" | "teal" | string
}

export function Section({ id, children, className, bgColor = "cream" }: SectionProps) {
  const bgColors = {
    cream: "bg-cream",
    sand: "bg-sand",
    white: "bg-white",
    teal: "bg-teal text-cream",
  }

  // Handle custom hex colors - detect if it's a dark color
  const isDarkColor = bgColor.startsWith('#') && bgColor === '#49513C'
  const customBgColor = bgColor.startsWith('#') ? { 
    backgroundColor: bgColor,
    color: isDarkColor ? '#FFF9E0' : undefined
  } : undefined
  
  return (
    <section 
      id={id} 
      className={cn("section-padding", !customBgColor && bgColors[bgColor as keyof typeof bgColors], className)}
      style={customBgColor}
    >
      <div className="section-max-width">{children}</div>
    </section>
  )
}
