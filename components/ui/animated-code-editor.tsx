"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCodeEditorProps {
  className?: string
}

export function AnimatedCodeEditor({ className }: AnimatedCodeEditorProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Bio information formatted as code
  const bioCode = `/**
 * @name Swastick
 * @role Computer Engineering Student & Full Stack Developer
 * @location Pune, Maharashtra
 */

class AboutMe {
  constructor() {
    this.education = "Army Institute Of Technology, Pune";
    this.major = "Computer Engineering";
    this.graduation = 2026;
    this.interests = [
      "Web Development",
      "Competitive Programming",
      "Open Source",
      "AI & Machine Learning"
    ];
  }

  getExperience() {
    return {
      role: "Joint Secretary",
      organization: "AIT OSS",
      achievements: [
        "Led development teams for multiple web portals",
        "Mentored 400+ students in web development",
        "Managed college-level hackathons"
      ]
    };
  }

  getSkills() {
    return {
      languages: ["JavaScript", "Java", "Python", "C++"],
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "Express", "MongoDB"],
      tools: ["Git", "Docker", "AWS"]
    };
  }

  // I'm passionate about creating clean, efficient code
  // that solves real-world problems.
}

// Currently open to internship opportunities
// Feel free to reach out!`

  const codeLines = bioCode.split("\n")

  useEffect(() => {
    // Blink cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      // Reset after a delay when we reach the end
      setTimeout(() => {
        setCurrentLine(0)
        setDisplayedCode("")
      }, 5000)
      return
    }

    const currentLineText = codeLines[currentLine]
    const typingSpeed = Math.random() * 30 + 20 // Random typing speed between 20-50ms

    const typingTimeout = setTimeout(() => {
      setDisplayedCode((prev) => {
        const lines = prev.split("\n")
        const currentTypedLine = lines[currentLine] || ""

        if (currentTypedLine.length < currentLineText.length) {
          // Still typing the current line
          lines[currentLine] = currentLineText.substring(0, currentTypedLine.length + 1)
          return lines.join("\n")
        } else {
          // Move to the next line
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setDisplayedCode((prev) => prev + "\n")
          }, 100)
          return prev
        }
      })
    }, typingSpeed)

    return () => clearTimeout(typingTimeout)
  }, [currentLine, codeLines])

  useEffect(() => {
    // Auto-scroll to the bottom as new lines are added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedCode])

  // Syntax highlighting function
  const highlightSyntax = (code: string) => {
    return code
      .replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="text-green-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-gray-400">$1</span>')
      .replace(
        /\b(class|constructor|return|this|function|const|let|var|if|else|for|while)\b/g,
        '<span class="text-purple-400">$1</span>',
      )
      .replace(/\b(getExperience|getSkills)\b/g, '<span class="text-yellow-300">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="text-amber-300">"$1"</span>')
      .replace(/\b([0-9]+)\b/g, '<span class="text-blue-300">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-blue-400">$1</span>')
  }

  return (
    <div className={cn("bg-gray-900 rounded-lg overflow-hidden shadow-xl", className)}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white text-xs">about-me.js</div>
      </div>
      <div
        ref={containerRef}
        className="p-4 h-[400px] md:h-[500px] overflow-y-auto font-mono text-xs md:text-sm"
        style={{ backgroundColor: "#282c34" }}
      >
        <pre className="text-gray-300">
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedCode) }} />
          <span className={`inline-block w-2 h-4 bg-white ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
        </pre>
      </div>
    </div>
  )
}
