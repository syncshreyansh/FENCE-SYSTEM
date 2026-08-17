import { useContext, useRef } from 'react'
import { NavbarContext } from '../../context/NavbarContext'

export default function Navbar() {
  const fillRef = useRef(null)
  const [, setNavOpen] = useContext(NavbarContext)

  return (
    <div className="fixed top-0 w-full flex items-start justify-between z-50 pointer-events-none">
      <div className="p-4 lg:p-6 pointer-events-auto">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            setNavOpen(false)
            const section = document.getElementById('home')
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="inline-block text-white uppercase tracking-widest text-2xl lg:text-3xl leading-none"
          style={{ fontFamily: '"Bebas Neue", sans-serif' }}
        >
          Smart&nbsp;Con
        </a>
      </div>
      <button
        type="button"
        onClick={() => {
          setNavOpen(true)
        }}
        aria-label="Open menu"
        className="pointer-events-auto group relative h-10 lg:h-16 w-24 lg:w-44 bg-[#161616] border border-white/10 overflow-hidden cursor-pointer"
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
        <div className="relative z-10 h-full px-6 lg:px-10 flex flex-col justify-center items-end gap-1 lg:gap-1.5">
          <div className="w-10 lg:w-16 h-0.5 bg-white transition-all duration-300 group-hover:bg-black group-hover:scale-x-105 origin-right" />
          <div className="w-6 lg:w-9 h-0.5 bg-white transition-all duration-300 group-hover:bg-black group-hover:scale-x-105 origin-right" />
        </div>
      </button>
    </div>
  )
}