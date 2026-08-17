import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function GaugeCard() {
  const arcRef = useRef(null);
  const numberRef = useRef(null);
  const value = 6.1; // 6.1%

  useEffect(() => {
    // Animate arc rotation from -135deg (0%) to actual percentage
    // Max rotation is 135deg (100%). Total range is 270deg.
    const maxRot = 135;
    const minRot = -135;
    const targetRot = minRot + (270 * (value / 100));

    if (arcRef.current) {
      gsap.fromTo(arcRef.current, 
        { rotation: minRot },
        { rotation: targetRot, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );
    }

    if (numberRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.2,
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = obj.val.toFixed(1) + '%';
          }
        }
      });
    }
  }, [value]);

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 flex flex-col h-full min-h-[220px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 shrink-0">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant">speed</span>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-on-surface leading-tight mt-1">Avg Duty Cycle</h3>
            <p className="text-[12px] text-on-surface-variant mt-0.5">Last 24 hours</p>
          </div>
        </div>
        <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">more_vert</button>
      </div>

      {/* Inner White/Surface panel */}
      <div className="mt-4 flex-1 bg-surface py-6 px-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
        <div className="gauge-container relative z-10 flex items-end justify-center">
          {/* Background Arc */}
          <div className="gauge-arc"></div>
          {/* Foreground Fill Arc */}
          <div ref={arcRef} className="gauge-fill"></div>
          
          {/* Inner Value Text */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span ref={numberRef} className="text-[40px] font-display font-bold text-on-surface leading-none mb-1">0.0%</span>
          </div>
        </div>
        <span className="text-[11px] text-on-surface-variant font-medium uppercase tracking-wider mt-4 z-10">Optimal</span>
      </div>
    </div>
  );
}
