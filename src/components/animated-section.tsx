"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  /**
   * Déclenchement plus ou moins tôt dans le viewport (0 → 1).
   * 0.2 = quand ~20% du bloc est visible.
   */
  amount?: number
  /** N’anime qu’une seule fois (par défaut) */
  once?: boolean
  /** Désactive l’animation (utile pour pages lourdes / A/B / debug) */
  disabled?: boolean
  /** Décalage vertical (px) */
  y?: number
  /** Durée en secondes */
  duration?: number
  /** Delay en secondes */
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
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once, amount })

  const shouldAnimate = !disabled && isInView

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants(y)}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // easing premium (type "easeOutExpo-like")
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}
