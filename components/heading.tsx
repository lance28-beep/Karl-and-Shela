import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeadingProps {
  level?: "h1" | "h2" | "h3"
  children: ReactNode
  className?: string
  subtitle?: string
  style?: React.CSSProperties
}

export function Heading({ level = "h2", children, className, subtitle, style }: HeadingProps) {
  const sizes = {
    h1: "heading-lg",
    h2: "heading-md",
    h3: "heading-sm",
  }

  const Component = level

  return (
    <div className="text-center mb-12">
      <Component className={cn(sizes[level], "text-balance-custom", className)} style={style}>{children}</Component>
      {subtitle && <p className="body-large text-ink/70 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
