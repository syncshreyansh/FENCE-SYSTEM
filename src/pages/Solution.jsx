import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SolutionSection from '../components/home/SolutionSection'
import Footer from '../components/layout/Footer'

export default function Solution() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <main className="min-h-screen bg-[#000000] pt-16 overflow-x-hidden flex flex-col justify-between">
      <SolutionSection />
      <Footer />
    </main>
  )
}
