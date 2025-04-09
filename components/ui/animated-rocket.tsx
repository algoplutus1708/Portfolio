"use client"

import { useEffect, useRef } from "react"

export function AnimatedRocket() {
  const rocketRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const rocket = rocketRef.current
    if (!rocket) return

    // Animate the rocket
    const rocketBody = rocket.querySelector("#rocket-body")
    const flame = rocket.querySelector("#flame")
    const stars = rocket.querySelectorAll(".star")

    if (rocketBody && flame) {
      // Rocket hover animation
      rocketBody.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-10px)" }, { transform: "translateY(0)" }],
        {
          duration: 2000,
          easing: "ease-in-out",
          iterations: Number.POSITIVE_INFINITY,
        },
      )

      // Flame animation
      flame.animate(
        [
          { opacity: 0.7, transform: "scaleY(0.8)" },
          { opacity: 1, transform: "scaleY(1.2)" },
          { opacity: 0.7, transform: "scaleY(0.8)" },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          iterations: Number.POSITIVE_INFINITY,
        },
      )
    }

    // Animate stars
    stars.forEach((star, index) => {
      const delay = index * 200
      const duration = 1000 + Math.random() * 2000

      star.animate([{ opacity: 0.2 }, { opacity: 1 }, { opacity: 0.2 }], {
        duration,
        easing: "ease-in-out",
        iterations: Number.POSITIVE_INFINITY,
        delay,
      })
    })
  }, [])

  return (
    <svg ref={rocketRef} viewBox="0 0 200 200" className="w-full max-w-xs mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Stars */}
      <circle className="star" cx="20" cy="30" r="1" fill="white" />
      <circle className="star" cx="40" cy="70" r="1.5" fill="white" />
      <circle className="star" cx="60" cy="20" r="1" fill="white" />
      <circle className="star" cx="80" cy="50" r="2" fill="white" />
      <circle className="star" cx="100" cy="30" r="1" fill="white" />
      <circle className="star" cx="120" cy="70" r="1.5" fill="white" />
      <circle className="star" cx="140" cy="40" r="1" fill="white" />
      <circle className="star" cx="160" cy="60" r="2" fill="white" />
      <circle className="star" cx="180" cy="30" r="1" fill="white" />
      <circle className="star" cx="30" cy="90" r="1.5" fill="white" />
      <circle className="star" cx="50" cy="110" r="1" fill="white" />
      <circle className="star" cx="70" cy="130" r="2" fill="white" />
      <circle className="star" cx="90" cy="150" r="1" fill="white" />
      <circle className="star" cx="110" cy="170" r="1.5" fill="white" />
      <circle className="star" cx="130" cy="190" r="1" fill="white" />
      <circle className="star" cx="150" cy="110" r="2" fill="white" />
      <circle className="star" cx="170" cy="130" r="1" fill="white" />
      <circle className="star" cx="190" cy="150" r="1.5" fill="white" />

      {/* Rocket */}
      <g id="rocket-body" transform="translate(100, 100)">
        {/* Rocket body */}
        <path
          d="M0,-40 C10,-40 20,-30 20,-10 L20,20 C20,25 15,30 10,30 L-10,30 C-15,30 -20,25 -20,20 L-20,-10 C-20,-30 -10,-40 0,-40 Z"
          fill="#2563eb"
          stroke="#1e40af"
          strokeWidth="2"
        />

        {/* Rocket window */}
        <circle cx="0" cy="-10" r="8" fill="white" stroke="#1e40af" strokeWidth="1" />
        <circle cx="0" cy="-10" r="5" fill="#bfdbfe" />

        {/* Rocket fins */}
        <path d="M-20,15 L-30,30 L-20,25 Z" fill="#1e40af" />
        <path d="M20,15 L30,30 L20,25 Z" fill="#1e40af" />

        {/* Rocket flame */}
        <g id="flame" transform="translate(0, 30)">
          <path d="M-10,0 C-5,10 5,10 10,0 C5,20 -5,20 -10,0 Z" fill="#f59e0b" />
          <path d="M-5,0 C-2,15 2,15 5,0 C2,10 -2,10 -5,0 Z" fill="#f97316" />
        </g>
      </g>
    </svg>
  )
}
