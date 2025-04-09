"use client"

import { useEffect, useState } from "react"
import { Code, Database, FileCode, Globe, Layout, Server, Smartphone } from "lucide-react"
import type { JSX } from "react"

interface FloatingIcon {
  icon: JSX.Element
  x: number
  y: number
  size: number
  speed: number
  direction: number
}

export function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // Create initial icons
    const iconElements = [
      <Code key="code" />,
      <Database key="database" />,
      <FileCode key="filecode" />,
      <Globe key="globe" />,
      <Layout key="layout" />,
      <Server key="server" />,
      <Smartphone key="smartphone" />,
    ]

    const initialIcons: FloatingIcon[] = Array.from({ length: 10 }, (_, i) => ({
      icon: iconElements[i % iconElements.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.2 + 0.1,
      direction: Math.random() * 360,
    }))

    setIcons(initialIcons)

    // Animation loop
    const interval = setInterval(() => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          // Calculate new position based on direction and speed
          const radians = (icon.direction * Math.PI) / 180
          let newX = icon.x + Math.cos(radians) * icon.speed
          let newY = icon.y + Math.sin(radians) * icon.speed
          let newDirection = icon.direction

          // Bounce off edges
          if (newX < 0 || newX > 100) {
            newDirection = 180 - newDirection
            newX = Math.max(0, Math.min(100, newX))
          }
          if (newY < 0 || newY > 100) {
            newDirection = 360 - newDirection
            newY = Math.max(0, Math.min(100, newY))
          }

          return {
            ...icon,
            x: newX,
            y: newY,
            direction: newDirection,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute text-primary/20 dark:text-primary/10 transition-colors duration-300"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  )
}
