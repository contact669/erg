"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { Phone, Calendar } from "lucide-react"

import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const PHONE = "+33699961375"

/**
 * Sticky CTA (mobile)
 * - apparition douce après scroll
 * - évite les re-renders inutiles (rAF)
 * - safe iOS (padding bottom via env(safe-area-inset-bottom))
 * - option: ne s’affiche pas si déjà (proche) du footer
 */
export default function StickyCallToAction({
  className,
  showAfterPx = 320,
  hideNearBottomPx = 260,
}: {
  className?: string
  showAfterPx?: number
  hideNearBottomPx?: number
}) {
  const [visible, setVisible] = useState(false)
  const tickingRef = useRef(false)

  const classes = useMemo(
    () =>
      cn(
        "md:hidden fixed inset-x-0 bottom-0 z-40",
        "pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] pt-2",
        "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-t border-border/60",
        "transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none",
        className
      ),
    [className, visible]
  )

  useEffect(() => {
    const compute = () => {
      const y = window.scrollY || 0
      const doc = document.documentElement
      const remaining = doc.scrollHeight - (y + window.innerHeight)

      // visible si on a scroll, et on le cache quand on approche du bas (footer)
      const shouldShow = y > showAfterPx && remaining > hideNearBottomPx
      setVisible(shouldShow)
    }

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        compute()
        tickingRef.current = false
      })
    }

    // init + listeners
    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [showAfterPx, hideNearBottomPx])

  return (
    <div className={classes} aria-hidden={!visible}>
      <div className="container">
        <div className="grid grid-cols-2 gap-2">
          <Button asChild size="lg" className="h-12 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-md">
            <Link href="/devis" className="inline-flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-semibold">Devis gratuit</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-slate-300 bg-white text-slate-900 hover:bg-slate-100 shadow-sm">
            <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 text-amber-600" />
              <span className="font-semibold">Appeler</span>
            </a>
          </Button>
        </div>

        <p className="mt-1.5 text-center text-[10px] font-semibold text-slate-600">
          ⭐ 4.9/5 Google • Devis gratuit • Décennale
        </p>
      </div>
    </div>
  )
}
