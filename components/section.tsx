import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  bgColor?: "cream" | "sand" | "white" | "teal"
}

export function Section({ id, children, className, bgColor = "cream" }: SectionProps) {
  const bgColors = {
    cream: "bg-cream",
    sand: "bg-sand",
    white: "bg-white",
    teal: "bg-teal text-cream",
  }

  return (
    <section id={id} className={cn("section-padding", bgColors[bgColor], className)}>
      <div className="section-max-width">{children}</div>
    </section>
  )
}
