import { useRef, useEffect, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import NewspaperCard from './NewspaperCard'

const ARTICLES = [
  {
    id: 0,
    source: 'The Telegraph',
    date: 'AUGUST 7, 2026',
    headline: 'Jumbo shocked to death in paddy field, forest officials probe illegal electric fence',
    image: '/assets/hero-images/photo1.png',
    photoCaption: 'A dead elephant in a paddy field in West Bengal.',
    caption: 'A wild elephant was found dead in a paddy field in West Bengal, allegedly after being electrocuted by an illegal electric fence. Forest officials have launched an investigation to identify those responsible for the installation of the fence.',
    link: '#',
    buttonText: 'READ STORY →',
    activeButtonText: 'READ FULL STORY →',
  },
  {
    id: 1,
    source: 'GULF NEWS',
    date: 'JUNE 8, 2025',
    headline: 'Class 10 student electrocuted by illegal fence in Kerala, protests erupt',
    image: '/assets/hero-images/photo-kerala-student.png',
    photoCaption: 'Protests erupt after the tragic incident in Kerala.',
    caption: 'A Class 10 student was electrocuted by an illegal electric fence in Kerala, triggering widespread protests by locals and political leaders. The incident has sparked outrage over the use of illegal fencing in forest and border areas, with demands for strict action against those responsible.',
    link: '#',
    buttonText: 'READ STORY →',
    activeButtonText: 'READ FULL STORY →',
  },
  {
    id: 2,
    source: 'DownToEarth',
    date: 'JANUARY 31, 2026',
    headline: 'Is illegal electric fencing by farmers posing a new threat to big cats in Bihar’s lone tiger reserve?',
    image: '/assets/hero-images/photo5.png',
    photoCaption: 'The electrocuted male tiger.',
    caption: 'A male tiger was electrocuted on January 27, 2026, in Bihar\'s Valmiki Tiger Reserve. Conservationists warn that illegal electric fences set up by farmers to protect crops are emerging as a deadly threat to wildlife, including big cats.',
    link: '#',
    buttonText: 'READ STORY →',
    activeButtonText: 'READ FULL STORY →',
  },
  {
    id: 3,
    source: 'THE TIMES OF INDIA',
    date: 'JULY 10, 2026',
    headline: 'Farmer fined Rs 1.25 lakh for installing illegal electric fence near Palacode forest',
    image: '/assets/hero-images/photo3.png',
    photoCaption: 'Forest department penalty notice issued.',
    caption: 'A farmer in Coimbatore has been fined Rs 1.25 lakh for installing an illegal electric fence near the Palacode forest area. The forest department registered a case after the violation was detected during a routine inspection.',
    link: '#',
    buttonText: 'READ STORY →',
    activeButtonText: 'READ FULL STORY →',
  },
  {
    id: 4,
    source: 'The Assam Tribune',
    date: 'FEBRUARY 14, 2026',
    headline: 'Electrocution kills over 200 elephants in 25 years in Assam',
    image: '/assets/hero-images/photo4.png',
    photoCaption: 'Elephants near a fence in Assam. – Wildlife Trust of India',
    caption: 'Over 200 elephants have died due to electrocution in Assam over the past 25 years. Illegal electric fences set up to protect crops remain the leading cause of these tragic deaths.',
    link: '#',
    buttonText: 'READ STORY →',
    activeButtonText: 'READ FULL STORY →',
  },
]

// Big Bold Solid Geometric Chevron with GSAP Mouse-Originated Fill inside the Shape
function SolidNakedArrow({ direction, onClick, ariaLabel, className = '' }) {
  const btnRef = useRef(null)
  const svgRef = useRef(null)
  const circleRef = useRef(null)
  const clipId = `solid-arrow-clip-${direction}`

  // Thick geometric polygon chevron path (viewBox 0 0 60 80)
  const polygonPath =
    direction === 'prev'
      ? 'M 48 6 L 12 40 L 48 74 L 48 56 L 30 40 L 48 24 Z'
      : 'M 12 6 L 48 40 L 12 74 L 12 56 L 30 40 L 12 24 Z'

  useEffect(() => {
    const btn = btnRef.current
    const svg = svgRef.current
    const circle = circleRef.current
    if (!btn || !svg || !circle) return

    // Initialize the fill circle inside SVG
    gsap.set(circle, {
      attr: { cx: 30, cy: 40, r: 0 },
      opacity: 0,
    })

    const handleMouseEnter = (e) => {
      const rect = svg.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 60
      const y = ((e.clientY - rect.top) / rect.height) * 80

      gsap.killTweensOf(circle)

      // Center fill circle at exact mouse entrance coordinate
      gsap.set(circle, {
        attr: { cx: x, cy: y, r: 0 },
        opacity: 1,
      })

      // Expand outward to flood the entire arrow polygon with brand lime #84cc16
      gsap.to(circle, {
        attr: { r: 120 },
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = (e) => {
      const rect = svg.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 60
      const y = ((e.clientY - rect.top) / rect.height) * 80

      const currentR = Number(circle.getAttribute('r')) || 0
      gsap.killTweensOf(circle)

      // Center fill circle at exact mouse departure coordinate
      gsap.set(circle, {
        attr: { cx: x, cy: y, r: currentR > 0 ? currentR : 120 },
        opacity: 1,
      })

      // Collapse back inward to 0 radius
      gsap.to(circle, {
        attr: { r: 0 },
        duration: 0.38,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(circle, { opacity: 0 })
        },
      })
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(circle)
    }
  }, [direction])

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group relative p-1.5 sm:p-2.5 lg:p-3 3xl:p-5 4xl:p-6 bg-transparent border-0 outline-none cursor-pointer select-none transition-transform duration-300 hover:scale-115 focus-visible:opacity-100 ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 60 80"
        className="w-7 h-10 sm:w-9 sm:h-14 md:w-12 md:h-18 lg:w-14 lg:h-22 xl:w-16 xl:h-26 3xl:w-20 3xl:h-32 4xl:w-24 4xl:h-40 overflow-visible drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={polygonPath} fill="#FFFFFF" />
          </clipPath>
        </defs>

        {/* Base Solid White Arrow Polygon */}
        <path
          d={polygonPath}
          fill="#FFFFFF"
          className="transition-colors duration-200"
        />

        {/* GSAP Mouse-Origin Fill Circle that lives purely INSIDE the Arrow Polygon */}
        <g clipPath={`url(#${clipId})`}>
          <circle
            ref={circleRef}
            cx="30"
            cy="40"
            r="0"
            fill="#84cc16"
            style={{ pointerEvents: 'none' }}
          />
        </g>
      </svg>
    </button>
  )
}

export default function HeadlinesCarousel() {
  const containerRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const cardRefs = useRef([])
  const controlsRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(2) // Default center (DownToEarth)
  const [isPaused, setIsPaused] = useState(false)
  const [entranceCompleted, setEntranceCompleted] = useState(false)
  const [progress, setProgress] = useState(0)
  const touchStartX = useRef(0)
  const mouseTilt = useRef({ x: 0, y: 0 })
  const count = ARTICLES.length
  const autoPlayDuration = 6000

  // Calculate position parameters for each slot (-2, -1, 0, 1, 2)
  const getSlotProps = useCallback((diff) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const isLargeScreen = w >= 1920

    // Dynamic horizontal spreads
    const spread1 = isMobile
      ? Math.min(w * 0.38, 140)
      : isTablet
      ? Math.min(w * 0.22, 190)
      : Math.min(Math.max(w * 0.15, 200), 420)

    const spread2 = isMobile
      ? Math.min(w * 0.76, 260)
      : isTablet
      ? Math.min(w * 0.42, 360)
      : Math.min(Math.max(w * 0.29, 380), 800)

    const heroY = isLargeScreen ? -30 : isTablet ? -20 : -16

    if (diff === 0) {
      // Center Hero Card
      return {
        x: 0,
        y: heroY,
        rotation: 0,
        scale: 1.05,
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1) contrast(1)',
        pointerEvents: 'auto',
      }
    } else if (diff === -1) {
      // Left 1
      return {
        x: -spread1,
        y: -2,
        rotation: -2.2,
        scale: 0.94,
        opacity: 0.94,
        zIndex: 20,
        filter: 'brightness(0.82) contrast(1.04)',
        pointerEvents: 'auto',
      }
    } else if (diff === -2) {
      // Left 2
      return {
        x: -spread2,
        y: 14,
        rotation: -4,
        scale: 0.87,
        opacity: 0.84,
        zIndex: 10,
        filter: 'brightness(0.7) contrast(1.08)',
        pointerEvents: 'auto',
      }
    } else if (diff === 1) {
      // Right 1
      return {
        x: spread1,
        y: -2,
        rotation: 2.2,
        scale: 0.94,
        opacity: 0.94,
        zIndex: 20,
        filter: 'brightness(0.82) contrast(1.04)',
        pointerEvents: 'auto',
      }
    } else {
      // Right 2
      return {
        x: spread2,
        y: 14,
        rotation: 4,
        scale: 0.87,
        opacity: 0.84,
        zIndex: 10,
        filter: 'brightness(0.7) contrast(1.08)',
        pointerEvents: 'auto',
      }
    }
  }, [])

  // Initial Entrance Animation using official useGSAP lifecycle
  useGSAP(
    () => {
      // 1. Place each card in its designated slot at opacity: 0
      ARTICLES.forEach((_, index) => {
        const card = cardRefs.current[index]
        if (!card) return

        let diff = (index - currentIndex + count) % count
        if (diff > 2) diff -= count
        const target = getSlotProps(diff)

        gsap.set(card, {
          xPercent: -50,
          x: target.x,
          y: target.y,
          rotation: target.rotation,
          scale: target.scale,
          opacity: 0,
          zIndex: target.zIndex,
          filter: target.filter,
        })
      })

      const middleCard = cardRefs.current[currentIndex]
      const left1Card = cardRefs.current[(currentIndex - 1 + count) % count]
      const right1Card = cardRefs.current[(currentIndex + 1) % count]
      const left2Card = cardRefs.current[(currentIndex - 2 + count) % count]
      const right2Card = cardRefs.current[(currentIndex + 2) % count]

      const tl = gsap.timeline({
        delay: 0.25,
        onComplete: () => {
          setEntranceCompleted(true)
        },
      })

      // Step 1: Middle card appears first with fade
      if (middleCard) {
        tl.fromTo(
          middleCard,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
          }
        )
      }

      // Step 2: Right & Left cards appear at the same time with fade
      const innerPair = [left1Card, right1Card].filter(Boolean)
      if (innerPair.length > 0) {
        tl.fromTo(
          innerPair,
          { opacity: 0 },
          {
            opacity: 0.94,
            duration: 0.6,
            ease: 'power2.out',
          },
          '+=0.15'
        )
      }

      // Step 3: Rightmost & Leftmost cards appear at the same time with fade
      const outerPair = [left2Card, right2Card].filter(Boolean)
      if (outerPair.length > 0) {
        tl.fromTo(
          outerPair,
          { opacity: 0 },
          {
            opacity: 0.84,
            duration: 0.6,
            ease: 'power2.out',
          },
          '+=0.15'
        )
      }
    },
    { scope: containerRef }
  )

  // Subsequent slide transitions between carousel slots (runs when currentIndex changes after entrance)
  useEffect(() => {
    if (!entranceCompleted) return

    ARTICLES.forEach((_, index) => {
      const card = cardRefs.current[index]
      if (!card) return

      let diff = (index - currentIndex + count) % count
      if (diff > 2) diff -= count

      const target = getSlotProps(diff)

      if (diff === 0) {
        gsap.set(card, { zIndex: 30 })
      } else if (Math.abs(diff) === 1) {
        gsap.set(card, { zIndex: 20 })
      } else {
        gsap.set(card, { zIndex: 10 })
      }

      gsap.to(card, {
        xPercent: -50,
        x: target.x,
        y: target.y,
        rotation: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
        filter: target.filter,
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto',
      })
    })
  }, [currentIndex, count, entranceCompleted, getSlotProps])

  // Handle window resize smoothly
  useEffect(() => {
    const handleResize = () => {
      ARTICLES.forEach((_, index) => {
        const card = cardRefs.current[index]
        if (!card) return
        let diff = (index - currentIndex + count) % count
        if (diff > 2) diff -= count
        const target = getSlotProps(diff)
        gsap.to(card, {
          x: target.x,
          y: target.y,
          scale: target.scale,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex, count, getSlotProps])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count)
    setProgress(0)
  }, [count])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count)
    setProgress(0)
  }, [count])

  const handleSelect = (index) => {
    setCurrentIndex(index)
    setProgress(0)
  }

  // Mobile Touch Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    if (diffX > 40) {
      handlePrev()
    } else if (diffX < -40) {
      handleNext()
    }
  }

  // Mouse move subtle parallax tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 1024) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseTilt.current = { x: x * 5, y: y * 3 }
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = `rotateY(${mouseTilt.current.x}deg) rotateX(${-mouseTilt.current.y}deg)`
    }
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
    }
  }

  // Auto-play progress timer: Starts once entrance animation has completed
  useEffect(() => {
    if (isPaused || !entranceCompleted) return undefined

    const interval = 50
    const step = (interval / autoPlayDuration) * 100

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          handleNext()
          return 0
        }
        return old + step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isPaused, entranceCompleted, handleNext, autoPlayDuration])

  // GSAP Entrance Animations for Side Arrows and Controls
  useGSAP(
    () => {
      const controls = controlsRef.current
      const sideArrows = containerRef.current?.querySelectorAll('.carousel-side-arrow')

      if (sideArrows && sideArrows.length > 0) {
        gsap.fromTo(
          sideArrows,
          {
            opacity: 0,
            x: (i) => (i === 0 ? -24 : 24),
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.35,
          }
        )
      }

      if (controls) {
        gsap.fromTo(
          controls,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.45,
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none -mt-2 sm:-mt-4 lg:-mt-6 3xl:-mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Editorial Newspaper Wall / Fan Arrangement */}
      <div
        className="relative w-full flex items-center justify-between overflow-visible py-1 3xl:py-2"
        style={{ perspective: '1400px' }}
      >
        {/* Leftmost Navigation Arrow */}
        <SolidNakedArrow
          direction="prev"
          onClick={handlePrev}
          ariaLabel="Previous story"
          className="carousel-side-arrow z-40 shrink-0 -ml-1 sm:ml-0 3xl:ml-2"
        />

        {/* 3D Cards Stack Container with Scaled Heights up to 4K / Ultra-wide */}
        <div
          ref={cardsContainerRef}
          className="relative flex-grow h-[460px] sm:h-[490px] md:h-[530px] lg:h-[560px] xl:h-[590px] 3xl:h-[700px] 4xl:h-[860px] 5xl:h-[960px] flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {ARTICLES.map((article, index) => {
            const isCenter = index === currentIndex

            return (
              <NewspaperCard
                key={article.id}
                ref={(el) => (cardRefs.current[index] = el)}
                article={article}
                isCenter={isCenter}
                positionOffset={(index - currentIndex + count) % count}
                onClick={() => handleSelect(index)}
              />
            )
          })}
        </div>

        {/* Rightmost Navigation Arrow */}
        <SolidNakedArrow
          direction="next"
          onClick={handleNext}
          ariaLabel="Next story"
          className="carousel-side-arrow z-40 shrink-0 -mr-1 sm:mr-0 3xl:mr-2"
        />
      </div>

      {/* Bottom Controls Row */}
      <div
        ref={controlsRef}
        className="w-full max-w-[1920px] 4xl:max-w-[2560px] 5xl:max-w-none flex items-center justify-between mt-1 sm:mt-2 3xl:mt-4 pt-2 sm:pt-3 3xl:pt-4 border-t border-white/10 relative z-20"
      >
        {/* Bottom Left: Minimal Dash Indicators with Live Progress */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 3xl:space-x-3">
          {ARTICLES.map((article, index) => {
            const isActive = index === currentIndex
            return (
              <button
                key={article.id}
                type="button"
                onClick={() => handleSelect(index)}
                aria-label={`Go to story ${index + 1}`}
                className={`h-1 3xl:h-1.5 4xl:h-2 rounded-full cursor-pointer transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'w-7 sm:w-10 3xl:w-14 4xl:w-18 bg-[#84cc16]'
                    : 'w-3.5 sm:w-6 3xl:w-8 4xl:w-10 bg-white/25 hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Bottom Right: View All Articles Link */}
        <div className="flex items-center">
          <a
            href="#all-articles"
            onClick={(e) => {
              e.preventDefault()
              handleSelect((currentIndex + 1) % count)
            }}
            className="group inline-flex items-center gap-1.5 3xl:gap-2.5 text-[10px] sm:text-xs md:text-sm 3xl:text-base 4xl:text-lg font-bold tracking-widest text-[#DFD9CE] hover:text-[#84cc16] transition-colors uppercase"
            style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            <span>VIEW ALL ARTICLES</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 3xl:w-5 3xl:h-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
