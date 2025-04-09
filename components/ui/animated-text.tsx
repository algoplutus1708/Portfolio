"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
}

export function AnimatedText({ text, className, once = true }: AnimatedTextProps) {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const hasAnimated = useRef(false)

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
    <h2
      ref={elementRef}
      className={cn(
        "opacity-0 translate-y-8 duration-700 ease-out",
        "animate-in:opacity-100 animate-in:translate-y-0",
        className,
      )}
    >
      {text}
    </h2>
  )
}
