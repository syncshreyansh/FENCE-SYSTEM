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

const MARQUEE_TEXT = 'SMART CON'
const MARQUEE_IMAGES = ['/assets/hero-images/img1.png', '/assets/hero-images/img2.png']

const MarqueeRow = () => (
  <div className="moveX flex items-center">
    <h2 className="whitespace-nowrap font-[Bebas_Neue] text-4xl lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase px-6">
      {MARQUEE_TEXT}
    </h2>
    <img
      className="lg:h-36 h-14 rounded-full shrink-0 lg:w-96 w-32 object-cover"
      src={MARQUEE_IMAGES[0]}
      alt=""
    />
    <h2 className="whitespace-nowrap font-[Bebas_Neue] text-4xl lg:text-[6vw] text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase px-6">
      {MARQUEE_TEXT}
    </h2>
    <img
      className="lg:h-36 h-14 rounded-full shrink-0 lg:w-96 w-32 object-cover"
      src={MARQUEE_IMAGES[1]}
      alt=""
    />
  </div>
)

export default function FullScreenNav() {
  const fullScreenRef = useRef(null)
  const [navOpen, setNavOpen] = useContext(NavbarContext)
  const navigate = useNavigate()

  useGSAP(
    () => {
      if (navOpen) {
        const tl = gsap.timeline()
        tl.to('.fullscreennav', { display: 'block' })
        tl.to('.stairing', {
          delay: 0.2,
          height: '100%',
          stagger: { amount: -0.3 },
        })
        tl.to('.link', {
          opacity: 1,
          rotateX: 0,
          stagger: { amount: 0.3 },
        })
        tl.to('.navlink', { opacity: 1 })
      } else {
        const tl = gsap.timeline()
        tl.to('.link', {
          opacity: 0,
          rotateX: 90,
          stagger: { amount: 0.1 },
        })
        tl.to('.stairing', {
          height: 0,
          stagger: { amount: 0.1 },
        })
        tl.to('.navlink', { opacity: 0 })
        tl.to('.fullscreennav', { display: 'none' })
      }
    },
    [navOpen]
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
    }, 450)
  }

  return (
    <div
      ref={fullScreenRef}
      id="fullscreennav"
      className="fullscreennav hidden fs-nav fixed inset-0 z-[60] overflow-hidden text-white"
    >
      {/* Stair columns */}
      <div className="h-full w-full absolute">
        <div className="h-full w-full flex">
          <div className="stairing h-0 w-1/5 bg-[#0a0a0b]" />
          <div className="stairing h-0 w-1/5 bg-[#0a0a0b]" />
          <div className="stairing h-0 w-1/5 bg-[#0a0a0b]" />
          <div className="stairing h-0 w-1/5 bg-[#0a0a0b]" />
          <div className="stairing h-0 w-1/5 bg-[#0a0a0b]" />
        </div>
      </div>

      <div className="relative h-full flex flex-col">
        {/* Top bar: wordmark + close */}
        <div className="navlink flex w-full justify-between items-start p-4 lg:p-5">
          <button
            type="button"
            onClick={() => {
              setNavOpen(false)
              setTimeout(() => {
                const section = document.getElementById('home')
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }, 450)
            }}
            className="text-white uppercase tracking-widest text-2xl lg:text-3xl leading-none cursor-pointer"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            Smart&nbsp;Con
          </button>
          <button
            type="button"
            onClick={() => setNavOpen(false)}
            aria-label="Close menu"
            className="group relative h-20 lg:h-32 w-20 lg:w-32 cursor-pointer"
          >
            <span className="absolute inset-0 transition-transform duration-500 ease-out group-hover:rotate-180">
              <div className="absolute left-0 top-0 h-28 lg:h-44 w-0.5 lg:w-1 bg-[#B6E232] rotate-45 origin-top" />
              <div className="absolute right-0 top-0 h-28 lg:h-44 w-0.5 lg:w-1 bg-[#B6E232] -rotate-45 origin-top" />
            </span>
          </button>
        </div>

        {/* Menu links */}
        <div className="flex-1 overflow-y-auto [perspective:1200px]">
          <div className="py-10 lg:py-24">
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
                  className={`link relative origin-top cursor-pointer outline-none ${isLast ? 'border-y border-white/20' : 'border-t border-white/20'}`}
                >
                  <h1
                    className="font-[Bebas_Neue] text-5xl lg:text-[8vw] text-center lg:leading-[0.8] lg:pt-10 pt-3 uppercase text-white"
                  >
                    {item.label}
                  </h1>
                  <div className="moveLink absolute text-black flex top-0 bg-[#B6E232] pointer-events-none">
                    <MarqueeRow />
                    <MarqueeRow />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}