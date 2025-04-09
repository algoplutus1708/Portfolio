"use client"

import { useEffect, useRef } from "react"

export function AnimatedDeveloper() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Animate the developer's hands typing
    const leftHand = svg.querySelector("#left-hand")
    const rightHand = svg.querySelector("#right-hand")

    if (leftHand && rightHand) {
      const animateHands = () => {
        // Left hand animation
        leftHand.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(5px)" }, { transform: "translateY(0)" }],
          {
            duration: 800,
            easing: "ease-in-out",
            iterations: Number.POSITIVE_INFINITY,
          },
        )

        // Right hand animation with slight delay
        rightHand.animate(
          [{ transform: "translateY(5px)" }, { transform: "translateY(0)" }, { transform: "translateY(5px)" }],
          {
            duration: 800,
            easing: "ease-in-out",
            iterations: Number.POSITIVE_INFINITY,
          },
        )
      }

      animateHands()
    }

    // Animate the screen glow
    const screen = svg.querySelector("#screen")
    if (screen) {
      screen.animate([{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }], {
        duration: 2000,
        easing: "ease-in-out",
        iterations: Number.POSITIVE_INFINITY,
      })
    }
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 400 300" className="w-full max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Desk */}
      <rect x="50" y="200" width="300" height="20" fill="#8B4513" />
      <rect x="60" y="220" width="280" height="10" fill="#A0522D" />
      {/* Computer */}
      <rect x="120" y="120" width="160" height="100" rx="5" fill="#333" />
      <rect id="screen" x="130" y="130" width="140" height="80" rx="2" fill="#2563eb" opacity="0.7" />
      {/* Code on screen */}
      <text x="140" y="150" fill="white" fontSize="8">
        function code() {`{`}
      </text>
      <text x="150" y="160" fill="white" fontSize="8">
        return awesome;
      </text>
      <text x="140" y="170" fill="white" fontSize="8">
        {`}`}
      </text>
      {/* Keyboard */}
      <rect x="140" y="180" width="120" height="10" rx="2" fill="#555" />
      {/* Coffee mug */}
      <rect x="300" y="170" width="20" height="30" rx="2" fill="#8B4513" />
      <rect x="297" y="170" width="26" height="5" rx="2" fill="#A0522D" />
      <path d="M320 180 Q330 185 320 190" stroke="#A0522D" fill="none" strokeWidth="2" />
      {/* Developer */}
      <circle cx="200" cy="100" r="20" fill="#FFD700" /> {/* Head */}
      <rect x="190" y="120" width="20" height="40" fill="#4169E1" /> {/* Body */}
      {/* Arms */}
      <rect x="170" y="130" width="20" height="10" fill="#4169E1" /> {/* Left arm */}
      <rect x="210" y="130" width="20" height="10" fill="#4169E1" /> {/* Right arm */}
      {/* Hands */}
      <rect id="left-hand" x="170" y="175" width="10" height="5" fill="#FFD700" /> {/* Left hand */}
      <rect id="right-hand" x="220" y="175" width="10" height="5" fill="#FFD700" /> {/* Right hand */}
      {/* Eyes */}
      <circle cx="195" cy="95" r="3" fill="#333" />
      <circle cx="205" cy="95" r="3" fill="#333" />
      {/* Smile */}
      <path d="M195 105 Q200 110 205 105" stroke="#333" fill="none" strokeWidth="2" />
    </svg>
  )
}
