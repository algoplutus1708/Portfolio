"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({ end, duration = 2000, className, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = countRef.current
    if (!element) return

    const animateOnScroll = () => {
      if (hasAnimated.current) return

      const rect = element.getBoundingClientRect()
      const isInView = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0

      if (isInView) {
        hasAnimated.current = true
        let startTime: number | null = null
        let currentCount = 0

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)

          currentCount = Math.floor(progress * end)
          setCount(currentCount)

          if (progress < 1) {
            window.requestAnimationFrame(step)
          } else {
            setCount(end)
          }
        }

        window.requestAnimationFrame(step)
      }
    }

    animateOnScroll() // Check on mount
    window.addEventListener("scroll", animateOnScroll)

    return () => {
      window.removeEventListener("scroll", animateOnScroll)
    }
  }, [end, duration])

  return (
    <span ref={countRef} className={cn("tabular-nums", className)}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
