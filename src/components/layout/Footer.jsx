import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white border-t border-white/10 relative z-10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="inline-flex items-center transition-opacity hover:opacity-80" aria-label="Dfence Home">
            <img
              src="/assets/logo/logo.svg"
              alt="Dfence Logo"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-bold uppercase tracking-widest"
          style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
        >
          <Link
            to="/"
            className="text-[#DFD9CE]/70 hover:text-[#84cc16] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/problem"
            className="text-[#DFD9CE]/70 hover:text-[#84cc16] transition-colors"
          >
            Problem
          </Link>
          <Link
            to="/solution"
            className="text-[#DFD9CE]/70 hover:text-[#84cc16] transition-colors"
          >
            Solution
          </Link>
          <Link
            to="/dashboard"
            className="text-[#DFD9CE]/70 hover:text-[#84cc16] transition-colors"
          >
            Dashboard
          </Link>
        </div>

        {/* Right: Copyright */}
        <div
          className="text-xs text-[#DFD9CE]/40 uppercase tracking-wider text-center md:text-right"
          style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
        >
          © 2026 DFENCE CONTROLLER
        </div>
      </div>
    </footer>
  )
}
