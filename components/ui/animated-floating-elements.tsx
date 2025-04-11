"use client"

import { useEffect, useState } from "react"
import { Code, Database, FileCode, Globe, Layout, Server, Smartphone, Cpu, Cloud, Lock } from "lucide-react"

interface FloatingElement {
  icon: JSX.Element
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  amplitude: number
  phase: number
}

export function AnimatedFloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Create initial elements
    const iconElements = [
      <Code key="code" />,
      <Database key="database" />,
      <FileCode key="filecode" />,
      <Globe key="globe" />,
      <Layout key="layout" />,
      <Server key="server" />,
      <Smartphone key="smartphone" />,
      <Cpu key="cpu" />,
      <Cloud key="cloud" />,
      <Lock key="lock" />,
    ]

    const initialElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      icon: iconElements[i % iconElements.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      rotation: Math.random() * 360,
      speed: Math.random() * 0.5 + 0.2,
      amplitude: Math.random() * 10 + 5,
      phase: Math.random() * Math.PI * 2,
    }))

    setElements(initialElements)

    // Animation loop
    let animationFrame: number
    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const deltaTime = timestamp - lastTimestamp
      lastTimestamp = timestamp

      setElements((prevElements) =>
        prevElements.map((element) => {
          // Calculate new position based on sine wave
          const time = timestamp * 0.001
          const newX = element.x + Math.sin(time * element.speed + element.phase) * 0.1
          const newY = element.y + Math.cos(time * element.speed + element.phase) * 0.1
          const newRotation = element.rotation + element.speed * 0.2 * deltaTime * 0.01

          return {
            ...element,
            x: ((newX % 100) + 100) % 100, // Keep within 0-100 range
            y: ((newY % 100) + 100) % 100,
            rotation: newRotation % 360,
          }
        }),
      )

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute text-primary/10 dark:text-primary/5 transition-colors duration-300"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  )
}
