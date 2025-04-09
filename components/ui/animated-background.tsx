"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create grid
    const gridSize = 30
    const gridDots: { x: number; y: number; vx: number; vy: number }[] = []

    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        gridDots.push({
          x,
          y,
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw dots
      for (const dot of gridDots) {
        dot.x += dot.vx
        dot.y += dot.vy

        // Bounce off edges
        if (dot.x < 0 || dot.x > width) dot.vx *= -1
        if (dot.y < 0 || dot.y > height) dot.vy *= -1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(37, 99, 235, 0.2)"
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < gridDots.length; i++) {
        for (let j = i + 1; j < gridDots.length; j++) {
          const dot1 = gridDots[i]
          const dot2 = gridDots[j]
          const dx = dot1.x - dot2.x
          const dy = dot1.y - dot2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < gridSize * 1.5) {
            ctx.beginPath()
            ctx.moveTo(dot1.x, dot1.y)
            ctx.lineTo(dot2.x, dot2.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - distance / (gridSize * 1.5))})`
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 opacity-30 dark:opacity-20" />
}
