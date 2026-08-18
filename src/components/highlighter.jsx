"use client"

import { useLayoutEffect, useRef } from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"

export function Highlighter({
  children,
  action = "circle",
  color = "#84cc16",
  strokeWidth = 3.5,
  animationDuration = 1200,
  iterations = 2,
  padding = [6, 16, 6, 16],
  multiline = true,
  isView = false,
  className = "",
}) {
  const elementRef = useRef(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-5%",
  })

  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element || !shouldShow) return undefined

    let annotation = null

    const createAndShow = () => {
      if (annotation) {
        try {
          annotation.remove()
        } catch {}
      }

      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      annotation = annotate(element, annotationConfig)
      annotation.show()
    }

    // Delay slightly to let initial GSAP and font rendering stabilize
    const timer = setTimeout(() => {
      createAndShow()
    }, 150)

    // Re-render when fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setTimeout(() => {
          createAndShow()
        }, 80)
      })
    }

    const resizeObserver = new ResizeObserver(() => {
      createAndShow()
    })
    resizeObserver.observe(element)

    return () => {
      clearTimeout(timer)
      annotation?.remove()
      resizeObserver.disconnect()
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className={`relative inline-block bg-transparent ${className}`}>
      {children}
    </span>
  )
}
