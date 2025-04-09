"use client"

import { useEffect, useState } from "react"

export function AnimatedCode() {
  const [text, setText] = useState("")
  const codeSnippet = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

const sortAlgorithm = (arr) => {
  return arr.sort((a, b) => a - b);
}

class DataStructure {
  constructor() {
    this.items = [];
  }
  
  add(item) {
    this.items.push(item);
  }
}

const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
}
`.trim()

  useEffect(() => {
    let currentIndex = 0
    let direction = 1 // 1 for typing, -1 for deleting

    const typeEffect = () => {
      if (direction === 1) {
        // Typing
        if (currentIndex <= codeSnippet.length) {
          setText(codeSnippet.substring(0, currentIndex))
          currentIndex++
          setTimeout(typeEffect, 50)
        } else {
          // Start deleting after a pause
          setTimeout(() => {
            direction = -1
            typeEffect()
          }, 3000)
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setText(codeSnippet.substring(0, currentIndex))
          currentIndex--
          setTimeout(typeEffect, 30)
        } else {
          // Start typing again after a pause
          setTimeout(() => {
            direction = 1
            typeEffect()
          }, 1000)
        }
      }
    }

    typeEffect()

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div className="relative max-w-md mx-auto overflow-hidden rounded-lg bg-gray-900 p-4 text-xs md:text-sm font-mono text-green-400 shadow-lg">
      <div className="flex items-center justify-start mb-2">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="whitespace-pre-wrap break-all">
        <code>{text}</code>
        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
      </pre>
    </div>
  )
}
