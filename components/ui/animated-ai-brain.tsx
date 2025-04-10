"use client"

import { useEffect, useRef } from "react"

export function AnimatedAIBrain() {
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

    // Define particle class
    class Particle {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
      connections: number[]

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        }
        this.connections = []
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()

        // Neural network-like glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2, false)
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, this.radius * 3)
        gradient.addColorStop(0, "rgba(93, 63, 211, 0.3)")
        gradient.addColorStop(1, "rgba(93, 63, 211, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      update() {
        this.draw()

        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y
        }

        this.x += this.velocity.x
        this.y += this.velocity.y
      }
    }

    // Initialize particles
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 10000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 2
      const x = Math.random() * (canvas.width - radius * 2) + radius
      const y = Math.random() * (canvas.height - radius * 2) + radius
      const color = "rgba(93, 63, 211, 0.8)"

      particles.push(new Particle(x, y, radius, color))
    }

    // Find connections between particles
    for (let i = 0; i < particles.length; i++) {
      const connections = Math.floor(Math.random() * 3) + 2
      const connectedParticles: number[] = []

      for (let j = 0; j < connections; j++) {
        let connectedId = Math.floor(Math.random() * particles.length)
        while (connectedId === i || connectedParticles.includes(connectedId)) {
          connectedId = Math.floor(Math.random() * particles.length)
        }

        connectedParticles.push(connectedId)
      }

      particles[i].connections = connectedParticles
    }

    // Animation
    const pulse = {
      value: 0,
      increasing: true,
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update pulse value
      if (pulse.increasing) {
        pulse.value += 0.01
        if (pulse.value >= 1) pulse.increasing = false
      } else {
        pulse.value -= 0.01
        if (pulse.value <= 0) pulse.increasing = true
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]

        for (const connectedId of particle.connections) {
          const connectedParticle = particles[connectedId]
          const distance = Math.sqrt(
            Math.pow(particle.x - connectedParticle.x, 2) + Math.pow(particle.y - connectedParticle.y, 2),
          )

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(connectedParticle.x, connectedParticle.y)

            // Pulse the connection
            const opacity = Math.max(0.1, Math.min(0.8, 1 - distance / 150)) * (0.5 + pulse.value * 0.5)
            ctx.strokeStyle = `rgba(93, 63, 211, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Draw a small pulse traveling along the connection
            const pulseDot = {
              x: particle.x + (connectedParticle.x - particle.x) * ((Date.now() % 2000) / 2000),
              y: particle.y + (connectedParticle.y - particle.y) * ((Date.now() % 2000) / 2000),
            }

            ctx.beginPath()
            ctx.arc(pulseDot.x, pulseDot.y, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.fill()
          }
        }
      }

      // Update particles
      for (const particle of particles) {
        particle.update()
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{ minHeight: "300px" }} />
}
