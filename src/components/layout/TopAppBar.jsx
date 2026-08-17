export default function TopAppBar() {
  return (
    <header className="h-[72px] bg-surface flex items-center px-6 shrink-0 justify-between sticky top-0 z-40 border-b border-surface-container-high shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
      
      {/* Left: Zone Dropdown */}
      <div className="flex-shrink-0">
        <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-lg shadow-sm hover:bg-surface-container-low transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
          <span className="font-semibold text-on-surface text-sm">Kanha Zone</span>
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">expand_more</span>
        </button>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative flex items-center w-full h-[40px] rounded-lg bg-surface-container-lowest border border-surface-container-high overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <div className="grid place-items-center h-full w-12 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            type="text" 
            placeholder="Search meter ID, zone, or location..." 
            className="flex-1 bg-transparent text-[14px] text-on-surface placeholder:text-on-surface-variant outline-none"
          />
          <div className="pr-3 flex items-center">
            <kbd className="font-sans text-[11px] font-semibold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded border border-surface-container-high">⌘ K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button className="text-on-surface-variant hover:text-on-surface transition-colors relative">
          <span className="material-symbols-outlined text-[22px]">campaign</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors relative">
          <span className="material-symbols-outlined text-[22px]">help</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors relative">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full outline outline-2 outline-surface"></span>
        </button>
        
        <div className="w-[1px] h-8 bg-surface-container-high mx-1"></div>
        
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3 py-1.5 rounded-lg shadow-sm">
          <span className="material-symbols-outlined text-error text-[18px]">receipt_long</span>
          <span className="text-[14px] text-on-surface font-bold">3 active violations</span>
        </div>
        
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-2">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
            R
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-[13px] font-bold text-on-surface">Officer Rao</span>
            <span className="text-[11px] text-on-surface-variant font-medium">Forest Guard</span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant hidden md:block">expand_more</span>
        </button>
      </div>

    </header>
  );
}
