"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTechStackProps {
  className?: string
}

export function AnimatedTechStack({ className }: AnimatedTechStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "GraphQL",
    "Redux",
    "Firebase",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % technologies.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [technologies.length])

  return (
    <div className={cn("relative font-mono text-center", className)}>
      <div className="h-8 overflow-hidden">
        {technologies.map((tech, index) => (
          <div
            key={tech}
            className={cn(
              "transition-transform duration-500 ease-in-out",
              index === activeIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            {tech}
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-center space-x-1">
        {technologies.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 w-1 rounded-full transition-colors duration-300",
              index === activeIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-700",
            )}
          />
        ))}
      </div>
    </div>
  )
}
