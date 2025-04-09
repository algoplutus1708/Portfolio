"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
}

export function ScrollReveal({ children, className, delay = 0, direction = "up", once = true }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-16"
      case "down":
        return "-translate-y-16"
      case "left":
        return "translate-x-16"
      case "right":
        return "-translate-x-16"
      default:
        return "translate-y-16"
    }
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animateOnScroll = () => {
      if (once && hasAnimated.current) return

      const rect = element.getBoundingClientRect()
      const isInView = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0

      if (isInView) {
        element.classList.add("animate-in")
        hasAnimated.current = true
      } else if (!once) {
        element.classList.remove("animate-in")
        hasAnimated.current = false
      }
    }

    animateOnScroll() // Check on mount
    window.addEventListener("scroll", animateOnScroll)

    return () => {
      window.removeEventListener("scroll", animateOnScroll)
    }
  }, [once])

  return (
    <div
      ref={elementRef}
      className={cn(
        "opacity-0",
        getInitialTransform(),
        "transition-all duration-700 ease-out",
        "animate-in:opacity-100 animate-in:translate-x-0 animate-in:translate-y-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
