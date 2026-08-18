import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  BellRing,
  Gauge,
  BarChart3,
  ChevronDown,
  Settings,
  Users,
  HelpCircle,
  MessageSquare,
  Moon,
  Sun,
  PanelLeftClose,
  ArrowLeft
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const [reportsOpen, setReportsOpen] = useState(true);
  const { theme, toggleTheme, isDark } = useTheme();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-primary-container text-on-primary-container nav-active-glow rounded-lg px-3.5 py-2.5 flex items-center gap-3 font-semibold text-[14px] transition-colors"
      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface rounded-lg px-3.5 py-2.5 flex items-center gap-3 font-medium text-[14px] transition-colors";

  const subNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold text-[13px] py-1.5 px-3 rounded-md bg-surface-container-low block transition-colors"
      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50 font-medium text-[13px] py-1.5 px-3 rounded-md block transition-colors";

  return (
    <aside className="w-[260px] h-screen bg-surface-container-lowest flex flex-col border-r border-surface-container-high shrink-0 select-none">
      {/* Logo Area */}
      <div className="h-[72px] bg-surface-container-lowest flex items-center px-5 shrink-0 justify-between border-b border-surface-container-high">
        <Link 
          to="/" 
          className="flex items-center transition-opacity hover:opacity-80 cursor-pointer" 
          aria-label="Back to Home"
        >
          <img
            src="/assets/logo/logo.svg"
            alt="Dfence Logo"
            className="sidebar-logo h-7 w-auto object-contain transition-all"
          />
        </Link>
        <button 
          aria-label="Collapse sidebar"
          className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-low"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-5">
        {/* Back to Website Button */}
        <div>
          <Link
            to="/"
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/60 hover:bg-surface-container-low hover:border-primary/50 text-on-surface-variant hover:text-on-surface transition-all duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <ArrowLeft className="w-3.5 h-3.5 text-primary group-hover:-translate-x-0.5 transition-transform shrink-0" />
              <span className="font-mono text-[12px] font-semibold tracking-wide truncate">Back to Website</span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded leading-none">
              HOME
            </span>
          </Link>
        </div>

        {/* MONITORING Section */}
        <div>
          <h4 className="text-[10px] uppercase font-mono font-bold text-outline tracking-widest mb-2 px-3">
            Monitoring
          </h4>
          <nav className="flex flex-col gap-1">
            <NavLink to="/dashboard" end className={navLinkClass}>
              <LayoutDashboard className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Dashboard</span>
            </NavLink>
            <NavLink to="/dashboard/device-map" className={navLinkClass}>
              <Map className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Device Map</span>
            </NavLink>
            <NavLink to="/dashboard/alerts" className={navLinkClass}>
              <BellRing className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Alerts</span>
            </NavLink>
            <NavLink to="/dashboard/readings" className={navLinkClass}>
              <Gauge className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Meter Readings</span>
            </NavLink>

            {/* Reports Dropdown */}
            <div className="mt-1">
              <button
                type="button"
                onClick={() => setReportsOpen(prev => !prev)}
                className="w-full text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface rounded-lg px-3.5 py-2.5 flex items-center justify-between font-medium text-[13px] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BarChart3 className="w-4.5 h-4.5 shrink-0" />
                  <span className="truncate">Reports</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${reportsOpen ? 'rotate-180' : ''}`} />
              </button>
              {reportsOpen && (
                <div className="flex flex-col pl-9 pr-1 py-1 gap-0.5 mt-0.5">
                  <NavLink to="/dashboard/reports/summary" className={subNavLinkClass}>
                    Summary
                  </NavLink>
                  <NavLink to="/dashboard/reports/violations" className={subNavLinkClass}>
                    Violation Log
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* ACCOUNT Section */}
        <div className="pt-4 border-t border-surface-container-high">
          <h4 className="text-[10px] uppercase font-mono font-bold text-outline tracking-widest mb-2.5 px-3">
            Account
          </h4>
          <nav className="flex flex-col gap-1">
            <NavLink to="/dashboard/settings" className={navLinkClass}>
              <Settings className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Settings</span>
            </NavLink>
            <NavLink to="/dashboard/team" className={navLinkClass}>
              <Users className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Team</span>
            </NavLink>
            <NavLink to="/dashboard/help" className={navLinkClass}>
              <HelpCircle className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Help Center</span>
            </NavLink>
            <NavLink to="/dashboard/feedback" className={navLinkClass}>
              <MessageSquare className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">Submit Feedback</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Bottom Fixed Area */}
      <div className="shrink-0 border-t border-surface-container-high bg-surface-container-lowest">
        {/* MODE Toggle */}
        <div 
          onClick={toggleTheme}
          role="button"
          tabIndex={0}
          aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); } }}
          className="px-5 py-3.5 flex items-center justify-between text-on-surface-variant hover:text-on-surface cursor-pointer select-none transition-colors group"
        >
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
            ) : (
              <Sun className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
            )}
            <span className="text-[12px] font-mono font-medium">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          
          <div 
            className={`w-9 h-5 rounded-full relative transition-colors duration-200 flex items-center px-0.5 border ${
              isDark 
                ? 'bg-primary/20 border-primary/40' 
                : 'bg-primary border-primary'
            }`}
          >
            <div 
              className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 shadow-sm ${
                isDark 
                  ? 'translate-x-4 bg-primary' 
                  : 'translate-x-0 bg-white'
              }`} 
            />
          </div>
        </div>

        {/* Promo Card */}
        <div className="promo-health-card m-3 p-3.5 rounded-xl bg-[#0a1402] border border-primary/30 text-primary relative overflow-hidden shadow-lg transition-colors">
          <div className="relative z-10 flex flex-col gap-0.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">Network Health</span>
            <span className="text-[16px] font-mono font-black text-primary">98% Online</span>
            <span className="text-[11px] opacity-80 text-on-surface leading-tight font-sans">42 devices connected securely.</span>
          </div>
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-primary rounded-full blur-xl opacity-20 pointer-events-none"></div>
        </div>
      </div>
    </aside>
  );
}
