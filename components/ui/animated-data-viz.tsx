"use client"

import { useEffect, useRef } from "react"

export function AnimatedDataViz() {
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

    // Generate random data
    const generateData = (count: number, min: number, max: number) => {
      return Array.from({ length: count }, () => min + Math.random() * (max - min))
    }

    // Data sets
    const dataSets = [
      {
        values: generateData(12, 10, 90),
        color: "#2563eb",
        name: "Frontend Skills",
      },
      {
        values: generateData(12, 20, 80),
        color: "#7c3aed",
        name: "Backend Skills",
      },
      {
        values: generateData(12, 30, 70),
        color: "#ec4899",
        name: "DevOps Skills",
      },
    ]

    // Animation variables
    let animationFrameId: number
    let time = 0
    const animationSpeed = 0.01

    // Draw radar chart
    const drawRadarChart = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.7

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#f8fafc10"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw axes
      const axisCount = 12
      for (let i = 0; i < axisCount; i++) {
        const angle = (i / axisCount) * Math.PI * 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = "#64748b30"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw axis label
        const month = new Date(2023, i).toLocaleString("default", { month: "short" })
        const labelX = centerX + Math.cos(angle) * (radius + 15)
        const labelY = centerY + Math.sin(angle) * (radius + 15)

        ctx.fillStyle = "#64748b80"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(month, labelX, labelY)
      }

      // Draw concentric circles
      for (let r = 0.2; r <= 1; r += 0.2) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * r, 0, Math.PI * 2)
        ctx.strokeStyle = "#64748b20"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw percentage label
        ctx.fillStyle = "#64748b60"
        ctx.font = "10px Arial"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(`${Math.round(r * 100)}%`, centerX - 5, centerY - radius * r)
      }

      // Draw data
      dataSets.forEach((dataSet, dataIndex) => {
        // Animate data values
        const animatedValues = dataSet.values.map((value, i) => {
          const pulseEffect = Math.sin(time + i * 0.5) * 5
          return Math.max(0, Math.min(100, value + pulseEffect))
        })

        // Draw data points and connect them
        ctx.beginPath()
        animatedValues.forEach((value, i) => {
          const angle = (i / animatedValues.length) * Math.PI * 2
          const normalizedValue = value / 100
          const x = centerX + Math.cos(angle) * radius * normalizedValue
          const y = centerY + Math.sin(angle) * radius * normalizedValue

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        // Close the path
        ctx.lineTo(
          centerX + Math.cos(0) * radius * (animatedValues[0] / 100),
          centerY + Math.sin(0) * radius * (animatedValues[0] / 100),
        )

        // Fill with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        gradient.addColorStop(0, dataSet.color + "20")
        gradient.addColorStop(1, dataSet.color + "60")

        ctx.fillStyle = gradient
        ctx.fill()

        // Stroke the outline
        ctx.strokeStyle = dataSet.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw data points
        animatedValues.forEach((value, i) => {
          const angle = (i / animatedValues.length) * Math.PI * 2
          const normalizedValue = value / 100
          const x = centerX + Math.cos(angle) * radius * normalizedValue
          const y = centerY + Math.sin(angle) * radius * normalizedValue

          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = dataSet.color
          ctx.fill()
        })
      })

      // Draw legend
      const legendX = 20
      let legendY = 20

      dataSets.forEach((dataSet) => {
        ctx.fillStyle = dataSet.color
        ctx.fillRect(legendX, legendY, 15, 15)

        ctx.fillStyle = "#64748b"
        ctx.font = "14px Arial"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(dataSet.name, legendX + 25, legendY + 7.5)

        legendY += 25
      })

      // Update time
      time += animationSpeed
    }

    // Animation loop
    const animate = () => {
      drawRadarChart()
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
