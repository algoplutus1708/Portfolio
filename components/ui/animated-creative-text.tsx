"use client"

import { useEffect, useRef } from "react"

export function AnimatedCreativeText() {
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

    // Text to display
    const texts = [
      "CREATIVE",
      "DEVELOPER",
      "DESIGNER",
      "INNOVATOR",
      "PROBLEM SOLVER",
      "FULL STACK",
      "WEB3",
      "AI",
      "REACT",
      "NODE.JS",
    ]

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string

      constructor(x: number, y: number, color: string) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.baseX = x
        this.baseY = y
        this.density = Math.random() * 30 + 1
        this.color = color
      }

      update() {
        // Calculate distance between particle and mouse
        const dx = this.baseX - this.x
        const dy = this.baseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = 100
        const force = (maxDistance - distance) / maxDistance
        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        if (distance < maxDistance) {
          this.x += directionX
          this.y += directionY
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    // Create particles from text
    const createParticlesFromText = (text: string) => {
      const particles: Particle[] = []
      const fontSize = Math.min(72, (canvas.width / text.length) * 1.5)

      ctx.font = `bold ${fontSize}px Arial`
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const textWidth = ctx.measureText(text).width
      const startX = (canvas.width - textWidth) / 2
      const startY = canvas.height / 2

      ctx.fillText(text, canvas.width / 2, canvas.height / 2)

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Sample pixels to create particles
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const alpha = textCoordinates.data[(y * canvas.width + x) * 4 + 3]
          if (alpha > 128) {
            const color = getRandomColor()
            particles.push(new Particle(x, y, color))
          }
        }
      }

      return particles
    }

    const getRandomColor = () => {
      const colors = [
        "#2563eb", // Blue
        "#4f46e5", // Indigo
        "#7c3aed", // Violet
        "#8b5cf6", // Purple
        "#ec4899", // Pink
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation variables
    let particles: Particle[] = []
    let currentTextIndex = 0
    let textChangeTimer = 0
    const textChangeDuration = 200 // Frames before changing text

    // Initialize particles
    particles = createParticlesFromText(texts[currentTextIndex])

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      // Change text periodically
      textChangeTimer++
      if (textChangeTimer >= textChangeDuration) {
        textChangeTimer = 0
        currentTextIndex = (currentTextIndex + 1) % texts.length
        particles = createParticlesFromText(texts[currentTextIndex])
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{ minHeight: "300px" }} />
}
