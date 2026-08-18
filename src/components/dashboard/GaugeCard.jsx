import { Gauge, MoreVertical } from 'lucide-react';

export default function GaugeCard() {
  const value = 6.1; // 6.1%
  const minRot = -135;
  const targetRot = minRot + (270 * (value / 100));

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 lg:p-6 flex flex-col h-full min-h-[220px] justify-between select-none">
      {/* Header */}
      <div className="flex justify-between items-start shrink-0">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface-variant">
            <Gauge className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[14px] font-bold text-on-surface leading-tight tracking-tight truncate">Avg Duty Cycle</h3>
            <p className="text-[11px] sm:text-[12px] text-on-surface-variant font-mono mt-0.5 truncate opacity-75">Last 24 hours</p>
          </div>
        </div>
        <button 
          aria-label="Options" 
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors shrink-0"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Inner panel */}
      <div className="mt-4 flex-1 bg-surface py-4 px-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden border border-surface-container-high/40">
        <div className="gauge-container relative z-10 flex items-end justify-center">
          {/* Background Arc */}
          <div className="gauge-arc"></div>
          {/* Foreground Fill Arc */}
          <div className="gauge-fill" style={{ transform: `rotate(${targetRot}deg)` }}></div>
          
          {/* Inner Value Text */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <span className="text-[30px] lg:text-[34px] font-sans font-black tracking-tight text-on-surface leading-none mb-0.5">
              {value.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="mt-2.5 z-10">
          <span className="inline-block bg-primary-container text-on-primary-container text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-primary/20">
            Optimal
          </span>
        </div>
      </div>
    </div>
  );
}
