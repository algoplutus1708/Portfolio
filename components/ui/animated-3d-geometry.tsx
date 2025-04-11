"use client"

import { useEffect, useRef } from "react"

export function Animated3DGeometry() {
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

    // 3D point class
    class Point3D {
      x: number
      y: number
      z: number

      constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
      }

      // Project 3D point to 2D
      project(width: number, height: number, fov: number, distance: number): { x: number; y: number; scale: number } {
        const factor = fov / (distance + this.z)
        const x = this.x * factor + width / 2
        const y = this.y * factor + height / 2
        return {
          x,
          y,
          scale: factor,
        }
      }
    }

    // Create a cube
    const createCube = (size: number): Point3D[] => {
      const points: Point3D[] = []
      for (let x = -1; x <= 1; x += 2) {
        for (let y = -1; y <= 1; y += 2) {
          for (let z = -1; z <= 1; z += 2) {
            points.push(new Point3D(x * size, y * size, z * size))
          }
        }
      }
      return points
    }

    // Create a octahedron
    const createOctahedron = (size: number): Point3D[] => {
      return [
        new Point3D(0, size, 0),
        new Point3D(size, 0, 0),
        new Point3D(0, 0, size),
        new Point3D(-size, 0, 0),
        new Point3D(0, 0, -size),
        new Point3D(0, -size, 0),
      ]
    }

    // Create a dodecahedron (simplified)
    const createDodecahedron = (size: number): Point3D[] => {
      const points: Point3D[] = []
      const phi = (1 + Math.sqrt(5)) / 2 // Golden ratio

      // Vertices of a dodecahedron
      points.push(new Point3D(size, size, size))
      points.push(new Point3D(size, size, -size))
      points.push(new Point3D(size, -size, size))
      points.push(new Point3D(size, -size, -size))
      points.push(new Point3D(-size, size, size))
      points.push(new Point3D(-size, size, -size))
      points.push(new Point3D(-size, -size, size))
      points.push(new Point3D(-size, -size, -size))

      points.push(new Point3D(0, size * phi, size / phi))
      points.push(new Point3D(0, size * phi, -size / phi))
      points.push(new Point3D(0, -size * phi, size / phi))
      points.push(new Point3D(0, -size * phi, -size / phi))

      points.push(new Point3D(size / phi, 0, size * phi))
      points.push(new Point3D(-size / phi, 0, size * phi))
      points.push(new Point3D(size / phi, 0, -size * phi))
      points.push(new Point3D(-size / phi, 0, -size * phi))

      points.push(new Point3D(size * phi, size / phi, 0))
      points.push(new Point3D(size * phi, -size / phi, 0))
      points.push(new Point3D(-size * phi, size / phi, 0))
      points.push(new Point3D(-size * phi, -size / phi, 0))

      return points
    }

    // Create shapes
    const cube = createCube(50)
    const octahedron = createOctahedron(80)
    const dodecahedron = createDodecahedron(40)

    // Position shapes
    const shapes = [
      { points: cube, x: -canvas.width / 4, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, color: "#2563eb" },
      { points: octahedron, x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, color: "#7c3aed" },
      {
        points: dodecahedron,
        x: canvas.width / 4,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        color: "#ec4899",
      },
    ]

    // Animation variables
    const fov = 250
    const distance = 200
    let animationFrameId: number

    // Rotate point around axis
    const rotateX = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const y = point.y * cos - point.z * sin
      const z = point.y * sin + point.z * cos
      point.y = y
      point.z = z
    }

    const rotateY = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const x = point.x * cos - point.z * sin
      const z = point.x * sin + point.z * cos
      point.x = x
      point.z = z
    }

    const rotateZ = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const x = point.x * cos - point.y * sin
      const y = point.x * sin + point.y * cos
      point.x = x
      point.y = y
    }

    // Draw shapes
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each shape
      shapes.forEach((shape) => {
        // Update rotation
        shape.rotationX += 0.005
        shape.rotationY += 0.007
        shape.rotationZ += 0.003

        // Create a copy of points for rotation
        const rotatedPoints = shape.points.map((p) => new Point3D(p.x, p.y, p.z))

        // Apply rotation to each point
        rotatedPoints.forEach((point) => {
          rotateX(point, shape.rotationX)
          rotateY(point, shape.rotationY)
          rotateZ(point, shape.rotationZ)

          // Translate point
          point.x += shape.x
          point.y += shape.y
          point.z += shape.z
        })

        // Project points to 2D
        const projectedPoints = rotatedPoints.map((point) => point.project(canvas.width, canvas.height, fov, distance))

        // Draw points
        projectedPoints.forEach((point) => {
          const size = Math.max(2, 6 * point.scale)
          ctx.beginPath()
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
          ctx.fillStyle = shape.color + "80" // Add transparency
          ctx.fill()
        })

        // Draw lines between points (for cube)
        if (shape.points.length === 8) {
          // Cube
          const edges = [
            [0, 1],
            [1, 3],
            [3, 2],
            [2, 0], // Top face
            [4, 5],
            [5, 7],
            [7, 6],
            [6, 4], // Bottom face
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7], // Connecting edges
          ]

          edges.forEach(([i, j]) => {
            ctx.beginPath()
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y)
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y)
            ctx.strokeStyle = shape.color + "60" // Add transparency
            ctx.lineWidth = 1.5 * Math.min(projectedPoints[i].scale, projectedPoints[j].scale)
            ctx.stroke()
          })
        }

        // Draw lines for octahedron
        if (shape.points.length === 6) {
          // Octahedron
          const edges = [
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4], // Top to middle
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4], // Bottom to middle
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 1], // Middle square
          ]

          edges.forEach(([i, j]) => {
            ctx.beginPath()
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y)
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y)
            ctx.strokeStyle = shape.color + "60" // Add transparency
            ctx.lineWidth = 1.5 * Math.min(projectedPoints[i].scale, projectedPoints[j].scale)
            ctx.stroke()
          })
        }

        // For dodecahedron, just draw points (connections would be too complex)
      })

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
