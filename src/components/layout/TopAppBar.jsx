import {
  ChevronDown,
  Search,
  Megaphone,
  HelpCircle,
  Bell,
  AlertTriangle,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TopAppBar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-[72px] bg-surface flex items-center px-4 lg:px-6 shrink-0 justify-between sticky top-0 z-40 border-b border-surface-container-high shadow-[0px_4px_20px_rgba(0,0,0,0.08)] min-w-0 select-none">
      {/* Left: Zone Dropdown */}
      <div className="flex-shrink-0">
        <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-lg shadow-sm hover:bg-surface-container-low transition-colors">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
          <span className="font-bold text-on-surface text-xs font-mono uppercase tracking-wider whitespace-nowrap">Kanha Zone</span>
          <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
        </button>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4 lg:mx-6 min-w-0">
        <div className="relative flex items-center w-full h-[38px] rounded-lg bg-surface-container-lowest border border-surface-container-high overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all px-3 gap-2.5">
          <Search className="w-4 h-4 text-on-surface-variant shrink-0" />
          <input 
            type="text" 
            placeholder="Search meter ID, zone, or location..." 
            className="flex-1 bg-transparent text-[13px] text-on-surface placeholder:text-on-surface-variant/60 outline-none min-w-0"
          />
          <div className="hidden sm:flex items-center shrink-0">
            <kbd className="font-mono text-[10px] font-semibold text-on-surface-variant bg-surface-container-low px-1.5 py-0.5 rounded border border-surface-container-high">⌘ K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button 
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`} 
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
        <button 
          aria-label="Campaigns" 
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
        >
          <Megaphone className="w-4 h-4" />
        </button>
        <button 
          aria-label="Help" 
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        <button 
          aria-label="Notifications" 
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full outline outline-2 outline-surface"></span>
        </button>
        
        <div className="hidden md:block w-px h-6 bg-surface-container-high mx-1"></div>
        
        <div className="hidden lg:flex items-center gap-2 bg-error-container/40 border border-error/30 px-3 py-1.5 rounded-lg shadow-sm">
          <AlertTriangle className="w-3.5 h-3.5 text-error shrink-0" />
          <span className="text-[11px] font-mono text-on-error-container font-bold uppercase tracking-wider whitespace-nowrap">3 active violations</span>
        </div>
        
        <button className="flex items-center gap-2.5 hover:bg-surface-container-low transition-colors p-1.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold text-xs shrink-0 font-mono">
            R
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight min-w-0">
            <span className="text-[13px] font-bold text-on-surface tracking-tight truncate">Officer Rao</span>
            <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider truncate opacity-75">Forest Guard</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant hidden md:block shrink-0" />
        </button>
      </div>
    </header>
  );
}
