"use client"

import { useEffect, useRef } from "react"

export function Animated3DAboutCube() {
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    let rotateX = 0
    let rotateY = 0
    let requestId: number

    const animate = () => {
      rotateX += 0.3
      rotateY += 0.5

      if (cube) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }

      requestId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className="perspective-500 w-full h-64 flex items-center justify-center">
      <div
        ref={cubeRef}
        className="relative w-40 h-40 transform-style-3d transition-transform duration-200 hover:scale-110"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-blue-500/80 text-white font-bold"
          style={{ transform: "translateZ(80px)" }}
        >
          About
        </div>

        {/* Back face */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-green-500/80 text-white font-bold"
          style={{ transform: "rotateY(180deg) translateZ(80px)" }}
        >
          Skills
        </div>

        {/* Left face */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-yellow-500/80 text-white font-bold"
          style={{ transform: "rotateY(-90deg) translateZ(80px)" }}
        >
          Experience
        </div>

        {/* Right face */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-purple-500/80 text-white font-bold"
          style={{ transform: "rotateY(90deg) translateZ(80px)" }}
        >
          Projects
        </div>

        {/* Top face */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-red-500/80 text-white font-bold"
          style={{ transform: "rotateX(90deg) translateZ(80px)" }}
        >
          Education
        </div>

        {/* Bottom face */}
        <div
          className="absolute w-full h-full flex items-center justify-center bg-indigo-500/80 text-white font-bold"
          style={{ transform: "rotateX(-90deg) translateZ(80px)" }}
        >
          Contact
        </div>
      </div>
    </div>
  )
}
