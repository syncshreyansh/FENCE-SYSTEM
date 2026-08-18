import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavbarContext } from '../../context/NavbarContext'

const MENU_ITEMS = [
  { label: 'Home', hoverText: 'KNOW ABOUT US', path: '/' },
  { label: 'Problem', hoverText: 'THE EXACT PROBLEM', path: '/problem' },
  { label: 'Solution', hoverText: "WHAT WE'VE BUILT", path: '/solution' },
  { label: 'Dashboard', hoverText: 'KNOW THE STATS', path: '/dashboard' },
]

const MarqueeRow = ({ text }) => (
  <div className="moveX flex items-center shrink-0">
    <h2
      className="whitespace-nowrap text-3xl sm:text-4xl lg:text-[5vw] font-black tracking-tight leading-none uppercase px-4 lg:px-6"
      style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 900, color: '#000000' }}
    >
      {text}
    </h2>
    <img
      src="/assets/logo/logo.svg"
      alt="Dfence Logo"
      className="h-6 sm:h-8 lg:h-12 w-auto object-contain mx-3 lg:mx-6 shrink-0"
      style={{ filter: 'brightness(0)' }}
    />
    <h2
      className="whitespace-nowrap text-3xl sm:text-4xl lg:text-[5vw] font-black tracking-tight leading-none uppercase px-4 lg:px-6"
      style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 900, color: '#000000' }}
    >
      {text}
    </h2>
    <img
      src="/assets/logo/logo.svg"
      alt="Dfence Logo"
      className="h-6 sm:h-8 lg:h-12 w-auto object-contain mx-3 lg:mx-6 shrink-0"
      style={{ filter: 'brightness(0)' }}
    />
  </div>
)

export default function FullScreenNav() {
  const containerRef = useRef(null)
  const isInitialMount = useRef(true)
  const pendingRoute = useRef(null)
  const [navOpen, setNavOpen, , setIsTransitioning] = useContext(NavbarContext)
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

        // 1. Show transparent overlay container so stair columns wipe down over the underlying page
        tl.set(overlay, { display: 'block' })
        tl.set(stairs, { transformOrigin: 'top center', scaleY: 0 })

        // 2. Stairs wipe down from top in cascading stagger (from right to left)
        tl.to(stairs, {
          scaleY: 1,
          duration: 0.65,
          stagger: {
            amount: 0.25,
            from: 'end',
          },
          ease: 'power4.inOut',
        })

        // 3. Header & footer fade in
        tl.to(
          navMeta,
          {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.35
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
          0.35
        )
      } else {
        gsap.killTweensOf([stairs, links, navMeta, overlay])

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlay, { display: 'none' })
            if (pendingRoute.current) {
              const target = pendingRoute.current
              pendingRoute.current = null
              navigate(target)
              if (setIsTransitioning) {
                setIsTransitioning(false)
              }
            }
          },
        })

        // 1. Links fade & rotate out smoothly
        tl.to(links, {
          opacity: 0,
          rotateX: 90,
          duration: 0.22,
          stagger: 0.03,
          ease: 'power2.in',
        })

        // 2. Header & footer fade out
        tl.to(
          navMeta,
          {
            opacity: 0,
            duration: 0.18,
            ease: 'power2.in',
          },
          0
        )

        // 3. Stairs wipe down towards bottom to exit completely (reverse stagger: from left to right)
        tl.set(stairs, { transformOrigin: 'bottom center' })
        tl.to(
          stairs,
          {
            scaleY: 0,
            duration: 0.55,
            stagger: {
              amount: 0.22,
              from: 'start',
            },
            ease: 'power4.inOut',
          },
          0.1
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
      if (e.key === 'Escape') {
        pendingRoute.current = null
        if (setIsTransitioning) setIsTransitioning(false)
        setNavOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navOpen, setNavOpen, setIsTransitioning])

  const handleSelect = (item) => {
    if (setIsTransitioning) {
      setIsTransitioning(true)
    }
    pendingRoute.current = item.path
    setNavOpen(false)
  }

  const handleClose = () => {
    pendingRoute.current = null
    if (setIsTransitioning) {
      setIsTransitioning(false)
    }
    setNavOpen(false)
  }

  const handleLogoClick = () => {
    if (setIsTransitioning) {
      setIsTransitioning(true)
    }
    pendingRoute.current = '/'
    setNavOpen(false)
  }

  return (
    <div ref={containerRef} style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <div
        id="fullscreennav"
        className="fullscreennav fixed inset-0 z-[60] overflow-hidden text-white w-full h-screen"
        style={{ display: 'none' }}
      >
        {/* Stair columns background - individual columns drop and retract over the page */}
        <div className="absolute inset-0 flex w-full h-full pointer-events-none">
          <div className="stairing w-1/5 h-full bg-[#000000]" />
          <div className="stairing w-1/5 h-full bg-[#000000]" />
          <div className="stairing w-1/5 h-full bg-[#000000]" />
          <div className="stairing w-1/5 h-full bg-[#000000]" />
          <div className="stairing w-1/5 h-full bg-[#000000]" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Top header: logo + close button */}
          <div className="navmeta flex w-full justify-between items-center p-4 lg:p-6">
            <button
              type="button"
              onClick={handleLogoClick}
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
              onClick={handleClose}
              aria-label="Close menu"
              className="group relative w-11 h-11 lg:w-14 lg:h-14 flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out hover:rotate-180"
            >
              <div className="absolute w-6 lg:w-9 h-0.5 lg:h-1 bg-[#84cc16] rotate-45 transition-transform duration-300 group-hover:scale-x-110" />
              <div className="absolute w-6 lg:w-9 h-0.5 lg:h-1 bg-[#84cc16] -rotate-45 transition-transform duration-300 group-hover:scale-x-110" />
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
                  {/* Default static label with DM Sans 900 font weight and brand green color */}
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5vw] font-black text-center uppercase tracking-tight leading-none py-3.5 sm:py-4.5 lg:py-5.5 !text-[#84cc16] transition-colors duration-300"
                    style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 900, color: '#84cc16' }}
                  >
                    {item.label}
                  </h1>

                  {/* Marquee band on hover with custom item hoverText, black text, and backgroundless logo */}
                  <div className="moveLink absolute inset-0 bg-[#84cc16] flex items-center pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <MarqueeRow text={item.hoverText} />
                    <MarqueeRow text={item.hoverText} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom metadata / footer (K72 style with DM Sans) */}
          <div
            className="navmeta flex justify-between items-center px-4 lg:px-6 py-4 text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase gap-3 min-w-0"
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