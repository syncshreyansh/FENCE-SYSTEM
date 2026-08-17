import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function StatCard({ icon, title, subtitle, value, trend, isError }) {
  const numberRef = useRef(null);

  useEffect(() => {
    // Parse the value as a number if possible
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue) && numberRef.current) {
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: numValue,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = obj.val % 1 !== 0 ? obj.val.toFixed(1) : Math.round(obj.val);
          }
        }
      });
    }
  }, [value]);

  const textColor = isError ? 'text-error' : 'text-on-surface';
  const trendBg = isError ? 'bg-error-container' : 'bg-primary-container';
  const trendText = isError ? 'text-on-error-container' : 'text-on-primary-container';
  const trendIcon = isError ? 'trending_down' : 'trending_up';

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 flex flex-col h-full min-h-[220px]">
      <div className="flex gap-3 mb-4 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
        </div>
        <div>
          <h3 className="text-[14px] font-semibold text-on-surface leading-tight mt-1">{title}</h3>
          {subtitle && <p className="text-[12px] text-on-surface-variant mt-0.5">{subtitle}</p>}
        </div>
      </div>
      
      <div className="mt-4 flex-1 bg-surface py-6 px-4 rounded-xl flex flex-col items-center justify-center text-center">
        <div 
          ref={numberRef} 
          className={`font-display text-[40px] leading-tight font-bold mb-2 ${textColor}`}
        >
          0
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 ${trendText} ${trendBg} text-[11px] font-semibold tracking-wide uppercase px-2 py-1 rounded-md`}>
            <span className="material-symbols-outlined text-[14px]">{trendIcon}</span>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
