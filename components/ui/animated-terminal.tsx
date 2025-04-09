"use client"

import { useEffect, useState } from "react"

export function AnimatedTerminal() {
  const [text, setText] = useState("")
  const [cursor, setCursor] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)

  const lines = [
    "$ npm install portfolio-dependencies",
    "Installing packages...",
    "✓ Installed React.js",
    "✓ Installed Next.js",
    "✓ Installed TailwindCSS",
    "✓ Installed TypeScript",
    "$ npm run dev",
    "Starting development server...",
    "Ready in 1.2s",
    "✓ Portfolio running at http://localhost:3000",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentLine >= lines.length) {
      setTimeout(() => {
        setCurrentLine(0)
        setText("")
      }, 3000)
      return
    }

    const targetText = lines[currentLine]
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setText((targetLine) => targetLine + targetText.charAt(currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(
          () => {
            setCurrentLine((prev) => prev + 1)
            setText("")
          },
          currentLine === lines.length - 1 ? 2000 : 500,
        )
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [currentLine, lines])

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl max-w-md mx-auto">
      <div className="flex items-center bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-white text-sm font-mono">terminal</div>
      </div>
      <div className="p-4 h-64 overflow-y-auto font-mono text-sm text-green-400">
        <div className="whitespace-pre-wrap">
          {lines.slice(0, currentLine).map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
          <div>
            {text}
            <span className={`inline-block w-2 h-4 bg-green-400 ${cursor ? "opacity-100" : "opacity-0"}`}></span>
          </div>
        </div>
      </div>
    </div>
  )
}
