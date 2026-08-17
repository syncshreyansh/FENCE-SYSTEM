import { useContext, useRef } from 'react'
import { NavbarContext } from '../../context/NavbarContext'

export default function Navbar() {
  const fillRef = useRef(null)
  const [, setNavOpen] = useContext(NavbarContext)

  return (
    <div className="fixed top-0 w-full flex items-center justify-between z-50 pointer-events-none p-4 lg:p-6">
      <div className="pointer-events-auto flex items-center">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            setNavOpen(false)
            const section = document.getElementById('home')
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="inline-flex items-center cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <img
            src="/assets/logo/logo.svg"
            alt="Dfence Logo"
            className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
          />
        </a>
      </div>
      <button
        type="button"
        onClick={() => {
          setNavOpen(true)
        }}
        aria-label="Open menu"
        className="pointer-events-auto group relative h-10 lg:h-14 w-24 lg:w-40 bg-[#161616] border border-white/10 overflow-hidden cursor-pointer"
        onMouseEnter={() => {
          if (fillRef.current) fillRef.current.style.height = '100%'
        }}
        onMouseLeave={() => {
          if (fillRef.current) fillRef.current.style.height = '0%'
        }}
      >
        <div
          ref={fillRef}
          className="bg-[#B6E232] transition-all duration-300 ease-out absolute top-0 left-0 w-full h-0 pointer-events-none"
        />
        <div className="relative z-10 h-full px-5 lg:px-8 flex flex-col justify-center items-end gap-1 lg:gap-1.5">
          <div className="w-8 lg:w-14 h-0.5 bg-white transition-all duration-300 group-hover:bg-black group-hover:scale-x-105 origin-right" />
          <div className="w-5 lg:w-8 h-0.5 bg-white transition-all duration-300 group-hover:bg-black group-hover:scale-x-105 origin-right" />
        </div>
      </button>
    </div>
  )
}