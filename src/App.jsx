import { useEffect, useContext, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/Home'
import Problem from './pages/Problem'
import Solution from './pages/Solution'
import Dashboard from './pages/Dashboard'
import DashboardShell from './components/layout/DashboardShell'
import ReadingsPage from './pages/ReadingsPage'
import DeviceMapPage from './pages/dashboard/DeviceMapPage'
import AlertsPage from './pages/dashboard/AlertsPage'
import ReportsSummaryPage from './pages/dashboard/ReportsSummaryPage'
import ReportsViolationsPage from './pages/dashboard/ReportsViolationsPage'
import SettingsPage from './pages/dashboard/SettingsPage'
import TeamPage from './pages/dashboard/TeamPage'
import HelpCenterPage from './pages/dashboard/HelpCenterPage'
import FeedbackPage from './pages/dashboard/FeedbackPage'
import NavContext from './context/NavContext'
import { NavbarContext } from './context/NavbarContext'
import Navbar from './components/layout/Navbar'
import FullScreenNav from './components/layout/FullScreenNav'

gsap.registerPlugin(ScrollTrigger)

function PageFadeWrapper({ children }) {
  const [navOpen, , isTransitioning] = useContext(NavbarContext)
  const location = useLocation()
  const pageRef = useRef(null)
  const isFirstMount = useRef(true)
  const isDashboard = location.pathname.startsWith('/dashboard')

  // 1. Fade in new page from black when route changes (only for main website, not dashboard subroutes)
  useEffect(() => {
    if (pageRef.current) {
      if (isDashboard) {
        gsap.killTweensOf(pageRef.current)
        gsap.set(pageRef.current, { opacity: 1, scale: 1 })
        return
      }
      gsap.killTweensOf(pageRef.current)
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, scale: 0.99 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      )
    }
  }, [location.pathname, isDashboard])

  // 2. Fade current page to black when menu opens, or restore on cancel close
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    if (pageRef.current && !isDashboard) {
      if (navOpen) {
        // Slowly fade the current page into black
        gsap.to(pageRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.65,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      } else if (!isTransitioning) {
        // Only restore previous page if closing without navigating to a new route
        gsap.to(pageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }
  }, [navOpen, isTransitioning, isDashboard])

  return (
    <div ref={pageRef} className={`w-full min-h-screen ${isDashboard ? 'bg-background' : 'bg-[#000000]'}`}>
      {children}
    </div>
  )
}

function AppContent() {
  const { pathname } = useLocation()
  const isDashboard = pathname.startsWith('/dashboard')

  useEffect(() => {
    if (isDashboard) return undefined

    // Force scroll to top on route change / reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [pathname, isDashboard])

  return (
    <>
      {!isDashboard && <Navbar />}
      {!isDashboard && <FullScreenNav />}
      <PageFadeWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/dashboard" element={<DashboardShell />}>
            <Route index element={<Dashboard />} />
            <Route path="readings" element={<ReadingsPage />} />
            <Route path="device-map" element={<DeviceMapPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="reports/summary" element={<ReportsSummaryPage />} />
            <Route path="reports/violations" element={<ReportsViolationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="help" element={<HelpCenterPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
          </Route>
        </Routes>
      </PageFadeWrapper>
    </>
  )
}

function App() {
  return (
    <NavContext>
      <AppContent />
    </NavContext>
  )
}

export default App
