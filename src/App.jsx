import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Home from './pages/Home'
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

gsap.registerPlugin(ScrollTrigger)

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/dashboard')) return undefined

    // Force scroll to top on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
  )
}

export default App
