"use client"

import { useEffect, useRef } from "react"

export function AnimatedTechGrid() {
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

    // Tech stack names
    const technologies = [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Next.js",
      "Redux",
      "GraphQL",
      "Socket.io",
      "TailwindCSS",
      "Git",
      "Docker",
      "AWS",
      "Firebase",
      "Python",
      "Java",
      "C++",
    ]

    // Node class
    class Node {
      x: number
      y: number
      text: string
      fontSize: number
      color: string
      velX: number
      velY: number
      highlighted: boolean
      highlightDuration: number
      highlightTime: number
      connections: Node[]
      alpha: number

      constructor(x: number, y: number, text: string) {
        this.x = x
        this.y = y
        this.text = text
        this.fontSize = Math.random() * 4 + 10
        this.color = this.getRandomColor()
        this.velX = (Math.random() - 0.5) * 0.5
        this.velY = (Math.random() - 0.5) * 0.5
        this.highlighted = false
        this.highlightDuration = 2000
        this.highlightTime = 0
        this.connections = []
        this.alpha = Math.random() * 0.5 + 0.5
      }

      getRandomColor() {
        const colors = ["#2563eb", "#4f46e5", "#7c3aed"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update(time: number, nodes: Node[]) {
        // Update position
        this.x += this.velX
        this.y += this.velY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.velX *= -1
        if (this.y < 0 || this.y > canvas.height) this.velY *= -1

        // Find connections
        this.connections = []
        for (const node of nodes) {
          if (node === this) continue
          const dx = this.x - node.x
          const dy = this.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            this.connections.push(node)
          }
        }

        // Update highlight
        if (this.highlighted) {
          this.highlightTime += 16
          if (this.highlightTime >= this.highlightDuration) {
            this.highlighted = false
            this.highlightTime = 0
          }
        } else if (Math.random() < 0.001) {
          this.highlighted = true
          this.highlightTime = 0
        }
      }

      draw() {
        // Draw connections
        for (const node of this.connections) {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)

          // Calculate distance for opacity
          const dx = this.x - node.x
          const dy = this.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const opacity = 1 - distance / 150

          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw node
        ctx.font = `${this.fontSize}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Draw highlight effect
        if (this.highlighted) {
          const highlightProgress = this.highlightTime / this.highlightDuration
          const haloRadius = 20 + 10 * Math.sin(highlightProgress * Math.PI)

          ctx.beginPath()
          ctx.arc(this.x, this.y, haloRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(37, 99, 235, ${0.2 * (1 - highlightProgress)})`
          ctx.fill()

          ctx.fillStyle = "#ffffff"
        } else {
          ctx.fillStyle =
            this.color +
            Math.floor(this.alpha * 255)
              .toString(16)
              .padStart(2, "0")
        }

        ctx.fillText(this.text, this.x, this.y)
      }
    }

    // Create nodes
    const nodes: Node[] = []
    for (let i = 0; i < technologies.length; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push(new Node(x, y, technologies[i]))
    }

    // Animation variables
    let animationFrameId: number
    let lastTime = 0

    // Animation loop
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background grid
      ctx.strokeStyle = "rgba(37, 99, 235, 0.05)"
      ctx.lineWidth = 1

      const gridSize = 30
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.update(time, nodes)
        node.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{ minHeight: "300px" }} />
}
