import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "font-lora font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

    const variants = {
      primary: "bg-teal text-cream hover:bg-ink focus:ring-teal",
      secondary: "bg-sand text-ink hover:bg-teal hover:text-cream focus:ring-sand",
      outline: "border-2 border-teal text-teal hover:bg-teal hover:text-cream focus:ring-teal",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    return <button className={cn(baseStyles, variants[variant], sizes[size], className)} ref={ref} {...props} />
  },
)

Button.displayName = "Button"

export { Button }
