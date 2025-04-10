"use client"

import { useEffect } from "react"

export default function ScrollToSection() {
  useEffect(() => {
    // Function to handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if it's an anchor tag with a hash
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()

        const href = target.getAttribute("href")
        if (!href) return

        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Scroll to the element
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for the header
            behavior: "smooth",
          })

          // Update URL
          window.history.pushState(null, "", href)
        }
      }
    }

    // Add event listener to the document
    document.addEventListener("click", handleAnchorClick)

    // Clean up
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
