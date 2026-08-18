import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import HeadlinesCarousel from './HeadlinesCarousel'
import ForestBackground from './ForestBackground'
import { Highlighter } from '../highlighter'

function TypewriterHeadlines() {
  const fullText = 'HEADLINES'
  const [displayedCount, setDisplayedCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Initial delay so "IN THE" slides in first
    const startTimeout = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current += 1
        setDisplayedCount(current)
        if (current >= fullText.length) {
          clearInterval(interval)
          // Small settle delay before drawing highlighter circle
          setTimeout(() => setIsFinished(true), 120)
        }
      }, 70)
      return () => clearInterval(interval)
    }, 300)

    return () => clearTimeout(startTimeout)
  }, [])

  return (
    <span className="relative inline-block mt-0.5 sm:mt-1.5 3xl:mt-2.5">
      {isFinished ? (
        <Highlighter
          action="circle"
          color="#84cc16"
          strokeWidth={3}
          animationDuration={2400}
          iterations={2}
          padding={[3, 14, 3, 14]}
        >
          <span className="relative inline-block text-[#E8E3D9]">
            {fullText}
          </span>
        </Highlighter>
      ) : (
        <span className="relative inline-block text-[#E8E3D9]">
          {/* Reserved invisible text to maintain exact layout dimensions */}
          <span className="invisible pointer-events-none select-none" aria-hidden="true">
            {fullText}
          </span>

          {/* Real-time typing text with lime cursor */}
          <span className="absolute inset-0 left-0 top-0 flex items-center">
            <span>{fullText.slice(0, displayedCount)}</span>
            <span className="inline-block w-[3px] sm:w-[4px] 3xl:w-[6px] h-[0.78em] ml-0.5 sm:ml-1 bg-[#84cc16] self-center animate-pulse" />
          </span>
        </span>
      )}
    </span>
  )
}

export default function HomeSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const metaRef = useRef(null)

  // GSAP Heading and Meta entrance animations
  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            x: -80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.inOut',
          }
        )
      }

      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          {
            x: 40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen h-full flex flex-col justify-between pt-16 sm:pt-18 lg:pt-20 3xl:pt-28 4xl:pt-36 pb-3 sm:pb-5 3xl:pb-8 4xl:pb-12 px-3 sm:px-6 lg:px-12 3xl:px-16 4xl:px-24 overflow-hidden bg-[#000000]"
    >
      {/* Forest Background atmosphere matching REF.png */}
      <ForestBackground />

      <div className="relative z-10 w-full max-w-[1920px] 4xl:max-w-[2560px] 5xl:max-w-none mx-auto flex flex-col justify-between flex-grow">
        {/* Header Section: Massive Editorial Heading + Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start w-full mb-1 sm:mb-2 3xl:mb-4 gap-2 sm:gap-4">
          <div ref={headingRef} className="relative z-10">
            <h1
              className="text-[#E8E3D9] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] 2xl:text-[96px] 3xl:text-[116px] 4xl:text-[144px] 5xl:text-[164px] leading-[0.9] m-0 p-0 tracking-tight uppercase font-black"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 900 }}
            >
              IN THE
              <br />
              <TypewriterHeadlines />
            </h1>
          </div>

          {/* Editorial Metadata matching REF.png */}
          <div ref={metaRef} className="flex items-start gap-2.5 sm:gap-3 3xl:gap-4 mt-2 md:mt-2 3xl:mt-3 self-start md:self-auto">
            <div className="h-px bg-[#84cc16] w-6 sm:w-10 3xl:w-16 4xl:w-20 mt-2 3xl:mt-3 shrink-0" />
            <div
              className="flex flex-col text-left tracking-widest text-[10px] sm:text-xs 3xl:text-sm 4xl:text-base leading-snug"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
            >
              <span className="text-[#DFD9CE] font-bold uppercase">CRITICAL DISPATCHES</span>
              <span className="text-[#DFD9CE]/70 uppercase">FROM ACROSS INDIA</span>
              <span className="text-[#84cc16] font-bold mt-0.5 3xl:mt-1">2025–2026</span>
            </div>
          </div>
        </div>

        {/* 3D Newspaper Stack / Arch Carousel */}
        <div className="w-full flex-grow flex items-center justify-center">
          <HeadlinesCarousel />
        </div>
      </div>
    </section>
  )
}
