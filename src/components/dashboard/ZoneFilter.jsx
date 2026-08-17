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
    <div className="flex justify-center mt-2">
      <div 
        ref={containerRef} 
        className="relative flex items-center bg-surface-container rounded-full p-1 gap-0.5"
      >
        <div 
          ref={pillRef} 
          className="absolute top-1 bottom-1 left-0 bg-primary-container rounded-full pointer-events-none shadow-sm"
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
                relative z-10 px-6 py-2 rounded-full text-[13px] font-semibold
                transition-colors duration-200 cursor-pointer
                ${isActive
                  ? 'text-on-primary-container'
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
