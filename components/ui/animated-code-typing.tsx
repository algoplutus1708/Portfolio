"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCodeTypingProps {
  language?: string
  className?: string
}

export function AnimatedCodeTyping({ language = "javascript", className }: AnimatedCodeTypingProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const codeSnippets = {
    javascript: `// Portfolio website code
function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Initialize theme
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Header onToggleTheme={toggleTheme} />
      <Hero />
      <Projects />
      <Contact />
    </div>
  );
}`,
    python: `# Machine Learning Algorithm
import numpy as np
from sklearn.model_selection import train_test_split

def train_model(data, labels):
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        data, labels, test_size=0.2, random_state=42
    )
    
    # Initialize model
    model = create_neural_network()
    
    # Train the model
    history = model.fit(
        X_train, y_train,
        epochs=50,
        validation_data=(X_test, y_test)
    )
    
    return model, history`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="hero">
      <h1>Welcome to my portfolio</h1>
    </section>
  </main>
</body>
</html>`,
  }

  const code = codeSnippets[language as keyof typeof codeSnippets] || codeSnippets.javascript
  const codeLines = code.split("\n")

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      // Reset after a delay when we reach the end
      setTimeout(() => {
        setCurrentLine(0)
        setDisplayedCode("")
      }, 3000)
      return
    }

    if (!isTyping) return

    const currentLineText = codeLines[currentLine]
    const typingInterval = setInterval(() => {
      setDisplayedCode((prev) => {
        const lines = prev.split("\n")
        const currentTypedLine = lines[currentLine] || ""

        if (currentTypedLine.length < currentLineText.length) {
          // Still typing the current line
          lines[currentLine] = currentLineText.substring(0, currentTypedLine.length + 1)
          return lines.join("\n")
        } else {
          // Move to the next line
          clearInterval(typingInterval)
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setDisplayedCode((prev) => prev + "\n")
          }, 100)
          return prev
        }
      })
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentLine, codeLines, isTyping])

  useEffect(() => {
    // Auto-scroll to the bottom as new lines are added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedCode])

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-xl ${className}`}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white text-xs">
          {language}.{language === "javascript" ? "js" : language === "python" ? "py" : "html"}
        </div>
      </div>
      <div
        ref={containerRef}
        className="p-4 h-64 overflow-y-auto font-mono text-xs md:text-sm"
        style={{ backgroundColor: "#282c34" }}
      >
        <pre className="text-gray-300">
          <code>{displayedCode}</code>
          <span className="inline-block w-2 h-4 bg-white animate-pulse"></span>
        </pre>
      </div>
    </div>
  )
}
