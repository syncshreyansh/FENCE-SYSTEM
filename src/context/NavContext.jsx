import { useState } from 'react'
import { NavbarContext } from './NavbarContext'

export default function NavContext({ children }) {
  const [navOpen, setNavOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <NavbarContext.Provider value={[navOpen, setNavOpen, isTransitioning, setIsTransitioning]}>
      {children}
    </NavbarContext.Provider>
  )
}