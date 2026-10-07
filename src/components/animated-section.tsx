import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  // Inactive props, kept for signature compatibility
  amount?: number
  once?: boolean
  disabled?: boolean
  y?: number
  duration?: number
  delay?: number
}

export default function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  // Animation is disabled to fix content visibility issue.
  // The component now directly renders its children without a motion wrapper.
  return <div className={cn(className)}>{children}</div>
}
