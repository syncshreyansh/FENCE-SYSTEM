import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Highlighter } from '../highlighter'

export default function ProblemSection() {
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
      })
    }
  }, [])

  useGSAP(
    () => {
      // 1. Left Column ("WHERE IT BREAKS") smooth slide & fade in
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', delay: 0.15 }
        )
      }

      // 2. Right Column elements staggered entrance
      if (rightColRef.current) {
        const elements = rightColRef.current.children
        gsap.fromTo(
          elements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.25,
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000] py-20 sm:py-24 lg:py-0"
    >
      {/* ── Background Video Layer matching problem-ref.png (z-0 to sit above section bg, below text z-10) ── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#000000]">
        {/* High-res cinematic poster fallback */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/assets/videos/problem-poster.png")' }}
        />

        {/* Cinematic live video layer */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover relative z-0"
          src="/assets/videos/problem-demo.mp4"
          poster="/assets/videos/problem-poster.png"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Subtle horizontal gradient to guarantee crystal-clear legibility over text areas while keeping center sparks visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-black/85 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-black/35 pointer-events-none z-10" />
      </div>

      {/* ── Foreground Editorial Spread Container (z-10) ── */}
      <div className="relative z-10 w-full max-w-[1920px] 4xl:max-w-[2560px] 5xl:max-w-none mx-auto px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24 3xl:px-32 4xl:px-40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 xl:gap-24 3xl:gap-32">
        
        {/* ── Left Column: Massive Editorial Heading ── */}
        <div ref={leftColRef} className="w-full lg:w-1/2 flex flex-col items-start select-none">
          <h1
            className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[124px] 2xl:text-[144px] 3xl:text-[170px] 4xl:text-[210px] leading-[0.88] m-0 p-0 tracking-tight uppercase font-black"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            WHERE
            <br />
            IT
            <br />
            <span className="relative inline-block mt-1 sm:mt-2 3xl:mt-3">
              <Highlighter
                action="circle"
                color="#84cc16"
                strokeWidth={3.5}
                animationDuration={2200}
                iterations={2}
                padding={[2, 14, 2, 14]}
              >
                <span className="text-white">BREAKS</span>
              </Highlighter>
            </span>
          </h1>
        </div>

        {/* ── Right Column: Editorial Problem Dispatches ── */}
        <div
          ref={rightColRef}
          className="w-full lg:w-1/2 flex flex-col items-start max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl"
        >
          {/* Metadata / Eyebrow */}
          <div
            className="flex items-center gap-2 text-xs sm:text-sm 3xl:text-base tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
          >
            <span className="text-[#DFD9CE]/60">REPORT ID:</span>
            <span className="text-[#84cc16]">SIH-20577</span>
          </div>

          {/* Lime Accent Divider */}
          <div className="h-[2px] w-8 sm:w-10 3xl:w-14 bg-[#84cc16] my-3.5 sm:my-4 3xl:my-6" />

          {/* Section 1: The Problem */}
          <div className="flex flex-col mb-4 sm:mb-6 3xl:mb-8">
            <h2
              className="text-white text-2xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-black uppercase tracking-wider mb-2.5 sm:mb-3 3xl:mb-4"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              THE PROBLEM
            </h2>
            <p
              className="text-[#DFD9CE]/90 text-sm sm:text-base lg:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed mb-3"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              People in forest-boundary villages illegally connect farm fences directly to grid electricity instead of using a proper low-voltage energizer.
            </p>
            <p
              className="text-[#DFD9CE]/90 text-sm sm:text-base lg:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Unlike a legal energizer’s brief harmless pulse, a direct grid connection stays continuously live and lethal — killing elephants, cattle, and sometimes people every year in states like Kerala and Assam.
            </p>
          </div>

          {/* Lime Accent Divider */}
          <div className="h-[2px] w-8 sm:w-10 3xl:w-14 bg-[#84cc16] mb-3.5 sm:mb-4 3xl:mb-6" />

          {/* Section 2: The Consequence */}
          <div className="flex flex-col">
            <h2
              className="text-white text-2xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-black uppercase tracking-wider mb-2.5 sm:mb-3 3xl:mb-4"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              THE CONSEQUENCE
            </h2>
            <p
              className="text-[#DFD9CE]/90 text-sm sm:text-base lg:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Wildlife encounters a fence that was never designed to be lethal.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
