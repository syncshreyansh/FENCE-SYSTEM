import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navLinkClass = ({ isActive }) => 
    isActive 
      ? "bg-primary-container text-on-primary-container nav-active-glow rounded-md px-4 py-2 flex items-center gap-3 font-semibold text-[14px]"
      : "text-on-surface-variant hover:bg-surface-container-low rounded-md px-4 py-2 flex items-center gap-3 font-medium text-[14px] transition-colors";

  const subNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold text-[13px] py-1 block"
      : "text-on-surface-variant hover:text-on-surface font-medium text-[13px] py-1 block";

  return (
    <aside className="w-[260px] h-screen bg-surface-container-lowest flex flex-col border-r border-surface-container-high shrink-0 overflow-y-auto">
      {/* Logo Area */}
      <div className="h-[72px] bg-[#0d1a00] flex items-center px-4 shrink-0 justify-between text-primary">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[28px] icon-fill">hive</span>
          <span className="font-display font-bold text-lg tracking-wide">FENCE_NET</span>
        </div>
        <button className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity">dock_to_right</button>
      </div>

      {/* MONITORING Section */}
      <div className="px-4 pt-6 pb-2">
        <h4 className="text-[11px] uppercase font-semibold text-outline tracking-wider mb-2 px-2">Monitoring</h4>
        <nav className="flex flex-col gap-1">
          <NavLink to="/dashboard" end className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/device-map" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">map</span>
            Device Map
          </NavLink>
          <NavLink to="/dashboard/alerts" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            Alerts
          </NavLink>
          <NavLink to="/dashboard/readings" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">speed</span>
            Meter Readings
          </NavLink>
          
          <div className="mt-2">
            <button className="w-full text-on-surface-variant hover:bg-surface-container-low rounded-md px-4 py-2 flex items-center justify-between font-medium text-[14px] transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                Reports
              </div>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <div className="flex flex-col pl-11 pr-2 py-1 gap-1">
              <NavLink to="/dashboard/reports/summary" className={subNavLinkClass}>Summary</NavLink>
              <NavLink to="/dashboard/reports/violations" className={subNavLinkClass}>Violation Log</NavLink>
            </div>
          </div>
        </nav>
      </div>

      <div className="flex-1"></div>

      {/* ACCOUNT Section */}
      <div className="px-4 py-4 border-t border-surface-container-high">
        <h4 className="text-[11px] uppercase font-semibold text-outline tracking-wider mb-2 px-2">Account</h4>
        <nav className="flex flex-col gap-1">
          <NavLink to="/dashboard/settings" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </NavLink>
          <NavLink to="/dashboard/team" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">group</span>
            Team
          </NavLink>
          <NavLink to="/dashboard/help" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">help_center</span>
            Help Center
          </NavLink>
          <NavLink to="/dashboard/feedback" className={navLinkClass}>
            <span className="material-symbols-outlined text-[20px]">feedback</span>
            Submit Feedback
          </NavLink>
        </nav>
      </div>

      {/* MODE Section */}
      <div className="px-6 py-4 flex items-center justify-between text-on-surface-variant border-t border-surface-container-high">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">dark_mode</span>
          <span className="text-[14px] font-medium">Dark Mode</span>
        </div>
        {/* Toggle UI mock */}
        <div className="w-9 h-5 bg-primary rounded-full relative">
          <div className="w-4 h-4 bg-[#111111] rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
        </div>
      </div>

      {/* Promo Card */}
      <div className="m-4 rounded-xl bg-[#0d1a00] p-4 text-primary relative overflow-hidden group">
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-[12px] font-medium opacity-80 uppercase tracking-widest">Network Health</span>
          <span className="text-[18px] font-bold">98% Online</span>
          <span className="text-[13px] opacity-80 mt-1 text-[#e8e6de]">42 devices connected securely.</span>
        </div>
        {/* Abstract shapes for promo card */}
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary rounded-full blur-2xl opacity-30 transition-opacity"></div>
      </div>
    </aside>
  );
}
