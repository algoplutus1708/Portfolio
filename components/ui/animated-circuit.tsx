"use client"

import { useEffect, useRef } from "react"

export function AnimatedCircuit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Circuit node class
    class Node {
      x: number
      y: number
      connections: Node[]
      size: number
      color: string
      pulseSize: number
      pulseOpacity: number
      pulseSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.connections = []
        this.size = 3 + Math.random() * 2
        this.color = "#2563eb"
        this.pulseSize = 0
        this.pulseOpacity = 0
        this.pulseSpeed = 0.05 + Math.random() * 0.1
      }

      connect(node: Node) {
        if (!this.connections.includes(node)) {
          this.connections.push(node)
        }
      }

      pulse() {
        if (this.pulseOpacity <= 0) {
          this.pulseSize = 0
          this.pulseOpacity = 1
        }

        this.pulseSize += this.pulseSpeed
        this.pulseOpacity -= 0.01
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw connections
        for (const node of this.connections) {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = `rgba(37, 99, 235, 0.3)`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw pulse
        if (this.pulseOpacity > 0) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size + this.pulseSize, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(37, 99, 235, ${this.pulseOpacity})`
          ctx.lineWidth = 2
          ctx.stroke()
          this.pulse()
        }
      }
    }

    // Create nodes
    const nodeCount = Math.floor(canvas.width / 50)
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push(new Node(x, y))
    }

    // Connect nodes
    for (const node of nodes) {
      const closestNodes = [...nodes]
        .filter((n) => n !== node)
        .sort((a, b) => {
          const distA = Math.hypot(a.x - node.x, a.y - node.y)
          const distB = Math.hypot(b.x - node.x, b.y - node.y)
          return distA - distB
        })
        .slice(0, 2)

      for (const closestNode of closestNodes) {
        node.connect(closestNode)
      }
    }

    // Animation loop
    let animationFrameId: number
    let lastPulseTime = 0

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Trigger random pulses
      if (timestamp - lastPulseTime > 1000) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
        randomNode.pulseOpacity = 1
        randomNode.pulseSize = 0
        lastPulseTime = timestamp
      }

      // Draw all nodes
      for (const node of nodes) {
        node.draw(ctx)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-64 opacity-70" />
}
