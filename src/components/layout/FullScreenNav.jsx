import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContext, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavbarContext } from '../../context/NavbarContext'

const MENU_ITEMS = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'Problem', type: 'section', target: 'problem' },
  { label: 'Solution', type: 'section', target: 'solution' },
  { label: 'Dashboard', type: 'route', target: '/dashboard' },
]

const MARQUEE_TEXT = 'SMART CON'
const MARQUEE_IMAGES = ['/assets/hero-images/img1.png', '/assets/hero-images/img2.png']

/* ── Single marquee strip (doubled content = seamless loop) ── */
const MarqueeStrip = () => (
  <div className="fs-marquee-track flex items-center whitespace-nowrap">
    <span className="font-[Bebas_Neue] text-4xl lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase px-6">
      {MARQUEE_TEXT}
    </span>
    <img
      className="lg:h-36 h-14 rounded-full shrink-0 lg:w-96 w-32 object-cover"
      src={MARQUEE_IMAGES[0]}
      alt=""
    />
    <span className="font-[Bebas_Neue] text-4xl lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase px-6">
      {MARQUEE_TEXT}
    </span>
    <img
      className="lg:h-36 h-14 rounded-full shrink-0 lg:w-96 w-32 object-cover"
      src={MARQUEE_IMAGES[1]}
      alt=""
    />
  </div>
)

/* ── Direction-aware menu link with marquee hover ── */
function MenuLink({ item, isLast, onSelect }) {
  const itemRef = useRef(null)
  const defaultRef = useRef(null)
  const marqueeRef = useRef(null)

  const handleMouseEnter = useCallback((e) => {
    const rect = itemRef.current.getBoundingClientRect()
    const fromTop = e.clientY - rect.top < rect.height / 2

    gsap.to(defaultRef.current, {
      yPercent: fromTop ? 100 : -100,
      duration: 0.4,
      ease: 'power3.out',
    })

    gsap.fromTo(
      marqueeRef.current,
      { yPercent: fromTop ? -100 : 100 },
      { yPercent: 0, duration: 0.4, ease: 'power3.out' }
    )
  }, [])

  const handleMouseLeave = useCallback((e) => {
    const rect = itemRef.current.getBoundingClientRect()
    const toTop = e.clientY - rect.top < rect.height / 2

    gsap.to(defaultRef.current, {
      yPercent: 0,
      duration: 0.35,
      ease: 'power3.out',
    })

    gsap.to(marqueeRef.current, {
      yPercent: toTop ? -100 : 100,
      duration: 0.35,
      ease: 'power3.out',
    })
  }, [])

  return (
    <div
      ref={itemRef}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(item)
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fs-link relative cursor-pointer outline-none overflow-hidden ${
        isLast ? 'border-y border-white/20' : 'border-t border-white/20'
      }`}
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* Default label */}
      <div ref={defaultRef} className="relative z-[1]">
        <h1 className="font-[Bebas_Neue] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase text-white">
          {item.label}
        </h1>
      </div>

      {/* Marquee hover band */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 z-[2] text-black flex bg-[#B6E232] overflow-hidden"
        style={{ transform: 'translateY(100%)' }}
      >
        <MarqueeStrip />
        <MarqueeStrip />
      </div>
    </div>
  )
}

export default function FullScreenNav() {
  const containerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const tlRef = useRef(null)
  const hasInitRef = useRef(false)
  const reverseKillRef = useRef(null)
  const [navOpen, setNavOpen] = useContext(NavbarContext)
  const navigate = useNavigate()

  /* ── Build the master GSAP timeline once on mount ── */
  useGSAP(
    () => {
      const ctx = containerRef.current
      if (!ctx) return

      const stairs = ctx.querySelectorAll('.fs-stair')
      const links = ctx.querySelectorAll('.fs-link')

      /* Set initial hidden states */
      gsap.set(ctx.querySelector('.fs-overlay'), { display: 'none' })
      gsap.set(stairs, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(links, { opacity: 0, rotateX: -90, transformOrigin: '50% 100%' })
      gsap.set(ctx.querySelector('.fs-topbar'), { opacity: 0 })
      gsap.set(ctx.querySelector('.fs-close-icon'), { rotate: -90, scale: 0.7, opacity: 0 })

      const tl = gsap.timeline({ paused: true })

      /* 1 – Show container */
      tl.set(ctx.querySelector('.fs-overlay'), { display: 'block' })

      /* 2 – Stair columns wipe in */
      tl.to(stairs, {
        scaleY: 1,
        duration: 0.7,
        stagger: { amount: 0.25, from: 'start' },
        ease: 'power4.inOut',
      })

      /* 3 – Nav links 3D rotateX reveal (overlaps end of stair animation) */
      tl.to(
        links,
        {
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.35'
      )

      /* 4 – Top bar + close button appear (overlap) */
      tl.to(
        ctx.querySelector('.fs-topbar'),
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.5'
      )
      tl.to(
        ctx.querySelector('.fs-close-icon'),
        { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )

      tlRef.current = tl
      hasInitRef.current = true
    },
    { scope: containerRef }
  )

  /* ── Play / reverse based on navOpen state ── */
  useEffect(() => {
    if (!hasInitRef.current || !tlRef.current) return
    const ctx = containerRef.current
    if (!ctx) return

    if (navOpen) {
      // Kill any in-progress reverse animation
      if (reverseKillRef.current) {
        reverseKillRef.current.kill()
        reverseKillRef.current = null
      }
      tlRef.current.play(0) // always play from start for clean state
    } else {
      // Only run reverse if menu was actually visible (not initial mount)
      if (tlRef.current.progress() === 0) return

      const stairs = ctx.querySelectorAll('.fs-stair')
      const links = ctx.querySelectorAll('.fs-link')

      const reverseTl = gsap.timeline({
        onComplete: () => {
          tlRef.current.pause(0) // reset master tl
        },
      })

      reverseKillRef.current = reverseTl

      /* 1 – Hide links quickly */
      reverseTl.to(links, {
        opacity: 0,
        rotateX: 90,
        duration: 0.35,
        stagger: { amount: 0.1, from: 'start' },
        ease: 'power2.in',
      })

      /* 2 – Close button spin out (simultaneous) */
      reverseTl.to(
        ctx.querySelector('.fs-close-icon'),
        { rotate: 90, opacity: 0, duration: 0.3, ease: 'power2.in' },
        '<'
      )

      /* 3 – Top bar fade (simultaneous) */
      reverseTl.to(ctx.querySelector('.fs-topbar'), { opacity: 0, duration: 0.25 }, '<')

      /* 4 – Stairs wipe down from bottom */
      reverseTl.to(stairs, {
        scaleY: 0,
        duration: 0.6,
        stagger: { amount: 0.2, from: 'end' },
        ease: 'power4.inOut',
        transformOrigin: 'bottom center',
      })

      /* 5 – Hide container */
      reverseTl.set(ctx.querySelector('.fs-overlay'), { display: 'none' })
    }
  }, [navOpen])

  // Lock body scroll while the menu is open
  useEffect(() => {
    if (navOpen) {
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previous
      }
    }
    return undefined
  }, [navOpen])

  // Close on Escape
  useEffect(() => {
    if (!navOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navOpen, setNavOpen])

  const handleSelect = (item) => {
    setNavOpen(false)
    setTimeout(() => {
      if (item.type === 'section') {
        const section = document.getElementById(item.target)
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        navigate(item.target)
      }
    }, 900) // wait for close animation to finish
  }

  return (
    <div ref={containerRef}>
      <div
        id="fullscreennav"
        className="fs-overlay hidden fixed inset-0 z-[60] overflow-hidden text-white"
      >
        {/* Stair columns */}
        <div className="absolute inset-0 flex w-full h-full">
          <div className="fs-stair w-1/5 h-full bg-[#0a0a0b]" />
          <div className="fs-stair w-1/5 h-full bg-[#0a0a0b]" />
          <div className="fs-stair w-1/5 h-full bg-[#0a0a0b]" />
          <div className="fs-stair w-1/5 h-full bg-[#0a0a0b]" />
          <div className="fs-stair w-1/5 h-full bg-[#0a0a0b]" />
        </div>

        <div className="relative h-full flex flex-col">
          {/* Top bar: wordmark + close */}
          <div className="fs-topbar flex w-full justify-between items-start p-4 lg:p-5">
            <button
              type="button"
              onClick={() => {
                setNavOpen(false)
                setTimeout(() => {
                  const section = document.getElementById('home')
                  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 900)
              }}
              className="text-white uppercase tracking-widest text-2xl lg:text-3xl leading-none cursor-pointer"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              Smart&nbsp;Con
            </button>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
              className="fs-close-btn group relative h-20 lg:h-32 w-20 lg:w-32 cursor-pointer"
            >
              <span className="fs-close-icon absolute inset-0 transition-transform duration-500 ease-out group-hover:rotate-180">
                <div className="absolute left-0 top-0 h-28 lg:h-44 w-0.5 lg:w-1 bg-[#B6E232] rotate-45 origin-top" />
                <div className="absolute right-0 top-0 h-28 lg:h-44 w-0.5 lg:w-1 bg-[#B6E232] -rotate-45 origin-top" />
              </span>
            </button>
          </div>

          {/* Menu links */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-10 lg:py-24">
              {MENU_ITEMS.map((item, index) => (
                <MenuLink
                  key={item.label}
                  item={item}
                  isLast={index === MENU_ITEMS.length - 1}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}