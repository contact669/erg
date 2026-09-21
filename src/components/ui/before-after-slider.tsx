"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { MoveHorizontal } from "lucide-react"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  alt?: string
  aspectRatio?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Avant travaux",
  afterLabel = "Après rénovation",
  alt = "Comparaison de rénovation",
  aspectRatio = "aspect-[4/3]",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      let position = (x / rect.width) * 100
      if (position < 0) position = 0
      if (position > 100) position = 100
      setSliderPosition(position)
    },
    []
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-xl select-none ${aspectRatio} ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={`${alt} - Après`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <span className="absolute top-4 right-4 z-10 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-950 shadow-md">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} - Avant`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale brightness-90"
          priority
        />
        <span className="absolute top-4 left-4 z-10 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-200 shadow-md">
          {beforeLabel}
        </span>
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-2xl border-2 border-amber-500 hover:scale-110 transition-transform">
          <MoveHorizontal className="h-5 w-5 text-amber-600" />
        </div>
      </div>
    </div>
  )
}
