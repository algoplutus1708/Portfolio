"use client"

import { useEffect, useRef } from "react"

export function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    window.addEventListener("resize", setCanvasDimensions)
    setCanvasDimensions()

    // Create stars
    class Star {
      x: number
      y: number
      size: number
      color: string
      twinkleSpeed: number
      opacity: number
      maxOpacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.color = this.getRandomColor()
        this.twinkleSpeed = Math.random() * 0.01 + 0.003
        this.maxOpacity = Math.random() * 0.5 + 0.3
        this.opacity = Math.random() * this.maxOpacity
      }

      getRandomColor() {
        const colors = [
          "#ffffff", // White
          "#f8fafc", // Light blue
          "#bfdbfe", // Light blue
          "#93c5fd", // Blue
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Twinkle effect
        this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.01
        this.opacity = Math.max(0.1, Math.min(this.maxOpacity, this.opacity))
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle =
          this.color +
          Math.floor(this.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      }
    }

    // Create gradients
    class Gradient {
      x: number
      y: number
      radius: number
      color: string
      opacity: number
      pulseSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 150 + 100
        this.color = this.getRandomColor()
        this.opacity = Math.random() * 0.05 + 0.02
        this.pulseSpeed = Math.random() * 0.0005 + 0.0002
      }

      getRandomColor() {
        const colors = [
          "#2563eb", // Blue
          "#4f46e5", // Indigo
          "#7c3aed", // Violet
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Pulse effect
        this.opacity += Math.sin(Date.now() * this.pulseSpeed) * 0.002
        this.opacity = Math.max(0.01, Math.min(0.07, this.opacity))
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(
          0,
          this.color +
            Math.floor(this.opacity * 2 * 255)
              .toString(16)
              .padStart(2, "0"),
        )
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Create objects
    const stars: Star[] = []
    const gradients: Gradient[] = []

    for (let i = 0; i < 150; i++) {
      stars.push(new Star())
    }

    for (let i = 0; i < 3; i++) {
      gradients.push(new Gradient())
    }

    // Animation variables
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradients
      gradients.forEach((gradient) => {
        gradient.update()
        gradient.draw()
      })

      // Update and draw stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 opacity-70" />
}
