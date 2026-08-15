import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useGsapContext() {
  const gsapContext = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {})
    gsapContext.current = context
    return () => context.revert()
  }, [])

  return gsapContext.current
}
