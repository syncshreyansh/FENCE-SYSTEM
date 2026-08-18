import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function ZoneFilter({ activeZone, onZoneChange }) {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  
  const zones = ['All zones', 'Kanha', 'Sonitpur'];

  useEffect(() => {
    // Animate the background pill to the active button
    if (!containerRef.current || !pillRef.current) return;
    
    const activeBtn = containerRef.current.querySelector(`[data-zone="${activeZone}"]`);
    if (activeBtn) {
      gsap.to(pillRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [activeZone]);

  return (
    <div className="flex justify-center mt-2 select-none">
      <div 
        ref={containerRef} 
        className="relative flex items-center bg-surface-container-lowest border border-surface-container-high rounded-full p-1 gap-1 shadow-sm"
      >
        <div 
          ref={pillRef} 
          className="absolute top-1 bottom-1 left-0 bg-primary-container border border-primary/30 rounded-full pointer-events-none shadow-sm"
          style={{ width: 0 }}
        />
        
        {zones.map((zone) => {
          const isActive = activeZone === zone;
          return (
            <button
              key={zone}
              data-zone={zone}
              type="button"
              onClick={() => onZoneChange(zone)}
              className={`
                relative z-10 px-5 py-1.5 rounded-full text-[12px] font-mono font-bold
                transition-colors duration-200 cursor-pointer uppercase tracking-wider
                ${isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
                }
              `}
            >
              {zone}
            </button>
          );
        })}
      </div>
    </div>
  );
}
