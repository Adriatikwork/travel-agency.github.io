"use client"
import type React from "react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

interface PixelTransitionProps {
  children: React.ReactNode
  hoverContent: React.ReactNode
  gridSize?: number
  className?: string
}

export function PixelTransition({ children, hoverContent, gridSize = 8, className = "" }: PixelTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const pixels = container.querySelectorAll(".pixel")

    if (isHovering) {
      // Animate pixels in
      gsap.fromTo(
        pixels,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: {
            amount: 0.3,
            grid: [gridSize, gridSize],
            from: "random",
          },
          ease: "power2.out",
        },
      )
    } else {
      // Animate pixels out
      gsap.to(pixels, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        stagger: {
          amount: 0.2,
          grid: [gridSize, gridSize],
          from: "random",
        },
        ease: "power2.in",
      })
    }
  }, [isHovering, gridSize])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Base content */}
      <div className="relative z-0">{children}</div>

      {/* Pixel grid overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div
            key={i}
            className="pixel relative overflow-hidden"
            style={{
              opacity: 0,
              transform: "scale(0)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
              {hoverContent}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
