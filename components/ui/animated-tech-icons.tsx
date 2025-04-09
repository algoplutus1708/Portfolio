"use client"

import { useEffect, useState } from "react"

interface TechIcon {
  name: string
  color: string
  x: number
  y: number
  size: number
  rotation: number
  speed: number
}

export function AnimatedTechIcons() {
  const [icons, setIcons] = useState<TechIcon[]>([])

  useEffect(() => {
    // Create initial icons
    const techIcons: TechIcon[] = [
      { name: "React", color: "#61DAFB", x: 20, y: 20, size: 40, rotation: 0, speed: 0.2 },
      { name: "Next.js", color: "#000000", x: 70, y: 60, size: 35, rotation: 0, speed: -0.15 },
      { name: "TypeScript", color: "#3178C6", x: 30, y: 100, size: 30, rotation: 0, speed: 0.1 },
      { name: "JavaScript", color: "#F7DF1E", x: 80, y: 140, size: 38, rotation: 0, speed: -0.25 },
      { name: "HTML", color: "#E34F26", x: 40, y: 180, size: 32, rotation: 0, speed: 0.18 },
      { name: "CSS", color: "#1572B6", x: 90, y: 220, size: 36, rotation: 0, speed: -0.12 },
      { name: "Node.js", color: "#339933", x: 50, y: 260, size: 34, rotation: 0, speed: 0.22 },
    ]

    setIcons(techIcons)

    // Animation loop
    const interval = setInterval(() => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          rotation: (icon.rotation + icon.speed) % 360,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-80 w-full overflow-hidden">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute transform transition-transform duration-1000 hover:scale-110"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y - 10}%`,
            transform: `rotate(${icon.rotation}deg)`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
        >
          <div
            className="w-full h-full rounded-lg flex items-center justify-center font-bold text-xs shadow-lg"
            style={{ backgroundColor: `${icon.color}20`, color: icon.color }}
          >
            {icon.name}
          </div>
        </div>
      ))}
    </div>
  )
}
