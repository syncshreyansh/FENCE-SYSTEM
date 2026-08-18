import { useRef, useEffect } from 'react'
import gsap from 'gsap'

/**
 * Reusable React Hook for GSAP mouse-originated fill interaction on hover.
 *
 * Behaviours:
 * - On mouse enter: fill circle is centered at exact mouse coordinates, scale 0 -> 1.
 * - On mouse exit: fill circle origin shifts to exact mouse exit coordinates, scale -> 0.
 * - Dynamic radius calculation ensures 100% full coverage for any button shape/dimension.
 * - Overwrites previous tweens cleanly on rapid enter/exit movement.
 * - Restrained to hover-capable devices (skips touch/mobile).
 */
export function useMouseOriginFill({
  fillColor = '#84cc16',
  enterDuration = 0.48,
  exitDuration = 0.4,
  ease = 'power3.out',
  onEnter = null,
  onExit = null,
} = {}) {
  const buttonRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current
    const fill = fillRef.current
    if (!button || !fill) return

    // Ensure hover is supported on fine pointer devices
    const isHoverSupported = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isHoverSupported) return

    // Initial setup for the fill element using GSAP property map (xPercent/yPercent)
    gsap.set(fill, {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: fillColor,
      pointerEvents: 'none',
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%',
      zIndex: 1,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      willChange: 'transform, left, top',
    })

    // Calculate maximum distance to button's 4 corners from (x, y)
    const calcMaxRadius = (x, y, rect) => {
      const d1 = Math.hypot(x, y)
      const d2 = Math.hypot(rect.width - x, y)
      const d3 = Math.hypot(x, rect.height - y)
      const d4 = Math.hypot(rect.width - x, rect.height - y)
      return Math.max(d1, d2, d3, d4)
    }

    const handleMouseEnter = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxRadius = calcMaxRadius(x, y, rect)
      const diameter = Math.ceil(maxRadius * 2 + 12)

      gsap.killTweensOf(fill)

      // Position fill at exact entry coordinates and scale outward from center
      gsap.set(fill, {
        left: x,
        top: y,
        width: diameter,
        height: diameter,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 1,
      })

      gsap.to(fill, {
        scale: 1,
        duration: enterDuration,
        ease: ease,
        overwrite: 'auto',
      })

      if (onEnter) onEnter(button)
    }

    const handleMouseLeave = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxRadius = calcMaxRadius(x, y, rect)
      const diameter = Math.ceil(maxRadius * 2 + 12)

      // Capture current scale before repositioning to avoid visual snapping
      const currentScale = Number(gsap.getProperty(fill, 'scale')) || 0
      gsap.killTweensOf(fill)

      // Move fill center to exact exit coordinates
      gsap.set(fill, {
        left: x,
        top: y,
        width: diameter,
        height: diameter,
        xPercent: -50,
        yPercent: -50,
        scale: currentScale > 0 ? currentScale : 1,
        opacity: 1,
      })

      // Collapse inward toward exit point
      gsap.to(fill, {
        scale: 0,
        duration: exitDuration,
        ease: ease,
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(fill, { opacity: 0 })
        },
      })

      if (onExit) onExit(button)
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(fill)
    }
  }, [fillColor, enterDuration, exitDuration, ease, onEnter, onExit])

  return { buttonRef, fillRef }
}
