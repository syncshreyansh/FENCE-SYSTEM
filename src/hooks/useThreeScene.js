import { useEffect, useRef } from 'react'
import { createFarmScene, destroyFarmScene } from '../three/FarmScene.js'

export function useThreeScene() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    sceneRef.current = createFarmScene(containerRef.current)
    return () => destroyFarmScene(sceneRef.current)
  }, [])

  return { containerRef, sceneRef }
}
