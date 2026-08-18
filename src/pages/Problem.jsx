import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProblemSection from '../components/home/ProblemSection'

export default function Problem() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <main className="min-h-screen bg-[#000000] overflow-hidden">
      <ProblemSection />
    </main>
  )
}
