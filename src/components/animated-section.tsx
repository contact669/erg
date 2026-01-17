"use client"

import { type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  amount?: number
  once?: boolean
  disabled?: boolean
  y?: number
  duration?: number
  delay?: number
}

const variants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0 },
})

export default function AnimatedSection({
  children,
  className,
  amount = 0.2,
  once = true,
  disabled = false,
  y = 24,
  duration = 0.55,
  delay = 0,
}: AnimatedSectionProps) {
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants(y)}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}
