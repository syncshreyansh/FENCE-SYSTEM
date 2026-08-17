import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavbarContext } from '../../context/NavbarContext'

const MENU_ITEMS = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'Problem', type: 'section', target: 'problem' },
  { label: 'Solution', type: 'section', target: 'solution' },
  { label: 'Dashboard', type: 'route', target: '/dashboard' },
]

const MARQUEE_TEXT = 'DFENCE'

const LogoPill = () => (
  <div className="lg:h-14 h-8 px-3 lg:px-6 rounded-full bg-black flex items-center justify-center shrink-0 mx-3 lg:mx-5 shadow-sm">
    <img
      src="/assets/logo/logo.svg"
      alt="Dfence Logo"
      className="h-3.5 sm:h-4 lg:h-7 w-auto object-contain"
    />
  </div>
)

const MarqueeRow = () => (
  <div className="moveX flex items-center shrink-0">
    <h2
      className="whitespace-nowrap text-3xl sm:text-4xl lg:text-[5vw] font-bold tracking-tight leading-none uppercase px-4 lg:px-6 text-black"
      style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
    >
      {MARQUEE_TEXT}
    </h2>
    <LogoPill />
    <h2
      className="whitespace-nowrap text-3xl sm:text-4xl lg:text-[5vw] font-bold tracking-tight leading-none uppercase px-4 lg:px-6 text-black"
      style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
    >
      {MARQUEE_TEXT}
    </h2>
    <LogoPill />
  </div>
)

export default function FullScreenNav() {
  const containerRef = useRef(null)
  const isInitialMount = useRef(true)
  const [navOpen, setNavOpen] = useContext(NavbarContext)
  const navigate = useNavigate()

  /* ── GSAP Animations ── */
  useGSAP(
    () => {
      const ctx = containerRef.current
      if (!ctx) return

      const stairs = ctx.querySelectorAll('.stairing')
      const links = ctx.querySelectorAll('.fs-menu-link')
      const navMeta = ctx.querySelectorAll('.navmeta')
      const overlay = ctx.querySelector('.fullscreennav')

      if (isInitialMount.current) {
        isInitialMount.current = false
        gsap.set(overlay, { display: 'none' })
        gsap.set(stairs, { scaleY: 0, transformOrigin: 'top center' })
        gsap.set(links, { opacity: 0, rotateX: 90, transformOrigin: 'top center' })
        gsap.set(navMeta, { opacity: 0 })
        return
      }

      if (navOpen) {
        gsap.killTweensOf([stairs, links, navMeta, overlay])

        const tl = gsap.timeline()

        // 1. Show overlay container
        tl.set(overlay, { display: 'block' })
        tl.set(stairs, { transformOrigin: 'top center' })

        // 2. Stairs wipe down from top with stagger
        tl.to(stairs, {
          scaleY: 1,
          duration: 0.6,
          stagger: {
            amount: -0.2,
          },
          ease: 'power4.inOut',
        })

        // 3. Header & footer fade in as stairs are wiping
        tl.to(
          navMeta,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.25
        )

        // 4. Links 3D rotate reveal with staggered sequence
        tl.to(
          links,
          {
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.25
        )
      } else {
        gsap.killTweensOf([stairs, links, navMeta, overlay])

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlay, { display: 'none' })
          },
        })

        // 1. Links fade & rotate out quickly
        tl.to(links, {
          opacity: 0,
          rotateX: 90,
          duration: 0.25,
          stagger: 0.05,
          ease: 'power2.in',
        })

        // 2. Header & footer fade out
        tl.to(
          navMeta,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          0
        )

        // 3. Stairs wipe down from bottom to exit
        tl.set(stairs, { transformOrigin: 'bottom center' })
        tl.to(
          stairs,
          {
            scaleY: 0,
            duration: 0.5,
            stagger: {
              amount: 0.15,
              from: 'end',
            },
            ease: 'power4.inOut',
          },
          0.15
        )
      }
    },
    { dependencies: [navOpen], scope: containerRef }
  )

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
    }, 650)
  }

  return (
    <div ref={containerRef} style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <div
        id="fullscreennav"
        className="fullscreennav fixed inset-0 z-[60] overflow-hidden text-white w-full h-screen"
        style={{ display: 'none' }}
      >
        {/* Stair columns background */}
        <div className="absolute inset-0 flex w-full h-full pointer-events-none">
          <div className="stairing w-1/5 h-full bg-[#0a0a0b]" />
          <div className="stairing w-1/5 h-full bg-[#0a0a0b]" />
          <div className="stairing w-1/5 h-full bg-[#0a0a0b]" />
          <div className="stairing w-1/5 h-full bg-[#0a0a0b]" />
          <div className="stairing w-1/5 h-full bg-[#0a0a0b]" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Top header: logo + close button */}
          <div className="navmeta flex w-full justify-between items-center p-4 lg:p-6">
            <button
              type="button"
              onClick={() => {
                setNavOpen(false)
                setTimeout(() => {
                  const section = document.getElementById('home')
                  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 650)
              }}
              className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Home"
            >
              <img
                src="/assets/logo/logo.svg"
                alt="Dfence Logo"
                className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
              />
            </button>
            <button
              type="button"
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
              className="group relative w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out hover:rotate-180"
            >
              <div className="absolute w-6 lg:w-9 h-0.5 lg:h-1 bg-[#108730] rotate-45 transition-transform duration-300 group-hover:scale-x-110" />
              <div className="absolute w-6 lg:w-9 h-0.5 lg:h-1 bg-[#108730] -rotate-45 transition-transform duration-300 group-hover:scale-x-110" />
            </button>
          </div>

          {/* Menu links with 3D perspective */}
          <div
            className="flex-1 flex flex-col justify-center py-2 lg:py-6"
            style={{ perspective: '1200px' }}
          >
            {MENU_ITEMS.map((item, index) => {
              const isLast = index === MENU_ITEMS.length - 1
              return (
                <div
                  key={item.label}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelect(item)
                    }
                  }}
                  className={`fs-menu-link group relative cursor-pointer outline-none overflow-hidden ${
                    isLast ? 'border-y border-white/15' : 'border-t border-white/15'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Default static label with DM Sans */}
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5vw] font-bold text-center uppercase tracking-tight leading-none py-3.5 sm:py-4.5 lg:py-5.5 text-white transition-colors duration-300"
                    style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                  >
                    {item.label}
                  </h1>

                  {/* Marquee band on hover with LogoPills and DM Sans */}
                  <div className="moveLink absolute inset-0 bg-[#108730] flex items-center pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <MarqueeRow />
                    <MarqueeRow />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom metadata / footer (K72 style with DM Sans) */}
          <div
            className="navmeta flex justify-between items-center px-6 py-4 text-xs font-medium tracking-widest text-white/40 uppercase"
            style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            <span>DFENCE CONTROLLER</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}