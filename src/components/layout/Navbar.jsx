import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { NavbarContext } from '../../context/NavbarContext'
import { useMouseOriginFill } from '../../hooks/useMouseOriginFill'

export default function Navbar() {
  const [, setNavOpen] = useContext(NavbarContext)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track window scroll position for glassmorphism header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 1. Hamburger menu button fill animation
  const { buttonRef, fillRef } = useMouseOriginFill({
    fillColor: '#84cc16',
    enterDuration: 0.48,
    exitDuration: 0.4,
    ease: 'power3.out',
    onEnter: (button) => {
      const bars = button.querySelectorAll('.hamburger-bar')
      if (bars.length > 0) {
        gsap.to(bars, {
          backgroundColor: '#000000',
          scaleX: 1.05,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    },
    onExit: (button) => {
      const bars = button.querySelectorAll('.hamburger-bar')
      if (bars.length > 0) {
        gsap.to(bars, {
          backgroundColor: '#ffffff',
          scaleX: 1,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    },
  })

  // 2. Dashboard button fill animation with text color transition
  const { buttonRef: dashBtnRef, fillRef: dashFillRef } = useMouseOriginFill({
    fillColor: '#84cc16',
    enterDuration: 0.48,
    exitDuration: 0.4,
    ease: 'power3.out',
    onEnter: (button) => {
      const text = button.querySelector('.dash-label')
      if (text) {
        gsap.to(text, {
          color: '#000000',
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    },
    onExit: (button) => {
      const text = button.querySelector('.dash-label')
      if (text) {
        gsap.to(text, {
          color: '#ffffff',
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    },
  })

  return (
    <header
      className={`fixed top-0 w-full flex items-center justify-between z-50 pointer-events-none p-4 lg:p-6 3xl:p-8 4xl:p-12 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="pointer-events-auto flex items-center">
        <Link
          to="/"
          onClick={() => setNavOpen(false)}
          className="inline-flex items-center cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <img
            src="/assets/logo/logo.svg"
            alt="Dfence Logo"
            className="h-7 sm:h-8 lg:h-9 3xl:h-12 4xl:h-16 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="pointer-events-auto flex items-center gap-3 lg:gap-4 3xl:gap-6">
        <Link
          ref={dashBtnRef}
          to="/dashboard"
          onClick={() => setNavOpen(false)}
          aria-label="Dashboard"
          className="group relative h-11 lg:h-14 3xl:h-18 4xl:h-22 px-4 sm:px-6 lg:px-8 3xl:px-10 4xl:px-12 bg-transparent border border-white/10 overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16] flex items-center justify-center"
          style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
        >
          <span ref={dashFillRef} className="pointer-events-none" />
          <span className="dash-label relative z-10 text-white font-bold uppercase tracking-widest text-xs lg:text-sm 3xl:text-base 4xl:text-lg pointer-events-none select-none">
            DASHBOARD
          </span>
        </Link>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            setNavOpen(true)
          }}
          aria-label="Open menu"
          className="group relative h-11 lg:h-14 3xl:h-18 4xl:h-22 w-24 lg:w-40 3xl:w-52 4xl:w-64 bg-transparent border border-white/10 overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16]"
        >
          <span ref={fillRef} className="pointer-events-none" />
          <div className="relative z-10 h-full px-5 lg:px-8 3xl:px-10 4xl:px-12 flex flex-col justify-center items-end gap-1 lg:gap-1.5 3xl:gap-2 4xl:gap-2.5 pointer-events-none">
            <div className="hamburger-bar w-8 lg:w-14 3xl:w-18 4xl:w-24 h-0.5 3xl:h-1 bg-white origin-right pointer-events-none" />
            <div className="hamburger-bar w-5 lg:w-8 3xl:w-11 4xl:w-14 h-0.5 3xl:h-1 bg-white origin-right pointer-events-none" />
          </div>
        </button>
      </div>
    </header>
  )
}