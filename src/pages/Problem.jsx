import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProblemSection from '../components/home/ProblemSection'
import Footer from '../components/layout/Footer'

export default function Problem() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <main className="min-h-screen bg-[#000000] overflow-hidden flex flex-col justify-between">
      <ProblemSection />
      <Footer />
    </main>
  )
}
