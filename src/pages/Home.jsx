import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import HomeSection from '../components/home/HomeSection'
import ProblemSection from '../components/home/ProblemSection'
import SolutionSection from '../components/home/SolutionSection'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef(null)
  const homeWrapperRef = useRef(null)
  const problemWrapperRef = useRef(null)
  const solutionWrapperRef = useRef(null)

  useGSAP(
    () => {
      // 1. Home Section: Stays 100% visible initially, then subtly fades out as it scrolls out of view
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: homeWrapperRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      homeTl
        .to(homeWrapperRef.current, { opacity: 1, duration: 0.4 })
        .to(homeWrapperRef.current, { opacity: 0, ease: 'power1.in', duration: 0.6 })

      // 2. Problem Section: Seamlessly fades in as it enters the viewport, stays fully visible, then fades out as it leaves
      const problemTl = gsap.timeline({
        scrollTrigger: {
          trigger: problemWrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      problemTl
        .fromTo(
          problemWrapperRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'power1.out', duration: 0.3 }
        )
        .to(problemWrapperRef.current, { opacity: 1, duration: 0.4 })
        .to(problemWrapperRef.current, { opacity: 0, ease: 'power1.in', duration: 0.3 })

      // 3. Solution Section: Seamlessly fades in as it enters the viewport and stays fully visible
      const solutionTl = gsap.timeline({
        scrollTrigger: {
          trigger: solutionWrapperRef.current,
          start: 'top bottom',
          end: 'top 35%',
          scrub: true,
        },
      })

      solutionTl.fromTo(
        solutionWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power1.out', duration: 1 }
      )
    },
    { scope: mainRef }
  )

  useEffect(() => {
    // Refresh ScrollTrigger once DOM layout stabilizes
    ScrollTrigger.refresh()
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen bg-[#000000] overflow-x-hidden">
      <div ref={homeWrapperRef} className="w-full relative">
        <HomeSection />
      </div>
      <div
        ref={problemWrapperRef}
        className="w-full relative my-24 sm:my-32 lg:my-40"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <ProblemSection />
      </div>
      <div ref={solutionWrapperRef} className="w-full relative">
        <SolutionSection />
      </div>
    </main>
  )
}