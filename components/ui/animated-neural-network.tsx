"use client"

import { useEffect, useRef } from "react"

export function AnimatedNeuralNetwork() {
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

    // Neural network parameters
    const layers = [6, 10, 8, 4] // Nodes per layer
    const nodes: { x: number; y: number; layer: number; index: number }[] = []

    // Create nodes
    const initializeNodes = () => {
      nodes.length = 0
      const layerSpacing = canvas.width / (layers.length + 1)

      layers.forEach((nodeCount, layerIndex) => {
        const layerX = layerSpacing * (layerIndex + 1)
        const nodeSpacing = canvas.height / (nodeCount + 1)

        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: layerX,
            y: nodeSpacing * (i + 1),
            layer: layerIndex,
            index: i,
          })
        }
      })
    }

    initializeNodes()

    // Animation variables
    let animationFrameId: number
    const pulsingNodes: Set<number> = new Set()
    const activePaths: { start: number; end: number; progress: number; color: string }[] = []
    let time = 0

    // Colors
    const nodeColor = "#2563eb"
    const activeNodeColor = "#ec4899"
    const edgeColors = ["#2563eb", "#7c3aed", "#ec4899"]

    // Trigger random pulses
    const triggerRandomPulse = () => {
      if (Math.random() < 0.05) {
        // Start a new pulse from a random input node
        const inputNodeIndices = nodes.filter((node) => node.layer === 0).map((_, index) => index)

        const randomInputIndex = Math.floor(Math.random() * inputNodeIndices.length)
        const startNodeIndex = randomInputIndex

        pulsingNodes.add(startNodeIndex)

        // Create a path from this node to a random node in the next layer
        const nextLayerNodes = nodes.filter((node) => node.layer === 1)
        const randomNextNode = Math.floor(Math.random() * nextLayerNodes.length)
        const endNodeIndex = layers[0] + randomNextNode

        activePaths.push({
          start: startNodeIndex,
          end: endNodeIndex,
          progress: 0,
          color: edgeColors[Math.floor(Math.random() * edgeColors.length)],
        })
      }
    }

    // Update active paths
    const updatePaths = () => {
      // Update existing paths
      for (let i = activePaths.length - 1; i >= 0; i--) {
        const path = activePaths[i]
        path.progress += 0.02

        // If path completed, remove it and activate the end node
        if (path.progress >= 1) {
          pulsingNodes.add(path.end)

          // Create new paths from this node to the next layer
          const endNode = nodes[path.end]
          if (endNode.layer < layers.length - 1) {
            const nextLayerNodes = nodes.filter((node) => node.layer === endNode.layer + 1)
            const randomNextNode = Math.floor(Math.random() * nextLayerNodes.length)
            const nextNodeIndex = nodes.findIndex(
              (node) => node.layer === endNode.layer + 1 && node.index === randomNextNode,
            )

            if (nextNodeIndex !== -1) {
              activePaths.push({
                start: path.end,
                end: nextNodeIndex,
                progress: 0,
                color: path.color,
              })
            }
          }

          activePaths.splice(i, 1)
        }
      }

      // Remove pulsing nodes after a delay
      if (time % 60 === 0) {
        pulsingNodes.clear()
      }
    }

    // Draw the neural network
    const drawNeuralNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between layers
      for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
        const currentLayerNodes = nodes.filter((node) => node.layer === layerIndex)
        const nextLayerNodes = nodes.filter((node) => node.layer === layerIndex + 1)

        currentLayerNodes.forEach((startNode) => {
          nextLayerNodes.forEach((endNode) => {
            ctx.beginPath()
            ctx.moveTo(startNode.x, startNode.y)
            ctx.lineTo(endNode.x, endNode.y)
            ctx.strokeStyle = `rgba(37, 99, 235, 0.1)`
            ctx.lineWidth = 0.5
            ctx.stroke()
          })
        })
      }

      // Draw active paths
      activePaths.forEach((path) => {
        const startNode = nodes[path.start]
        const endNode = nodes[path.end]

        const startX = startNode.x
        const startY = startNode.y
        const endX = endNode.x
        const endY = endNode.y

        // Calculate current position along the path
        const currentX = startX + (endX - startX) * path.progress
        const currentY = startY + (endY - startY) * path.progress

        // Draw the active path
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = path.color + "cc"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw pulse effect
        ctx.beginPath()
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
        ctx.fillStyle = path.color
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node, index) => {
        const isPulsing = pulsingNodes.has(index)
        const isActive = activePaths.some((path) => path.start === index || path.end === index)

        // Node glow effect
        if (isPulsing || isActive) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12)
          gradient.addColorStop(0, isPulsing ? activeNodeColor + "80" : nodeColor + "80")
          gradient.addColorStop(1, "transparent")
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = isPulsing ? activeNodeColor : nodeColor
        ctx.fill()
      })
    }

    // Animation loop
    const animate = () => {
      time++
      triggerRandomPulse()
      updatePaths()
      drawNeuralNetwork()
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
