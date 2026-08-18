import { TrendingUp, TrendingDown, Cpu, AlertTriangle, Radio } from 'lucide-react';

const iconMap = {
  memory: Cpu,
  warning: AlertTriangle,
  cell_tower: Radio
};

export default function StatCard({ icon, title, subtitle, value, trend, isError }) {
  const textColor = isError ? 'text-error' : 'text-on-surface';
  const trendBg = isError ? 'bg-error-container' : 'bg-primary-container';
  const trendText = isError ? 'text-on-error-container' : 'text-on-primary-container';
  const TrendIcon = isError ? TrendingDown : TrendingUp;

  // Resolve IconComponent
  let IconComponent = typeof icon === 'function' ? icon : (iconMap[icon] || Cpu);

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 lg:p-6 flex flex-col h-full min-h-[220px] justify-between select-none">
      {/* Header with icon, title, subtitle */}
      <div className="flex items-start gap-3.5 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface-variant">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-bold text-on-surface leading-tight tracking-tight truncate">{title}</h3>
          {subtitle && <p className="text-[11px] sm:text-[12px] text-on-surface-variant font-mono mt-0.5 truncate opacity-75">{subtitle}</p>}
        </div>
      </div>
      
      {/* Center Metric Panel */}
      <div className="mt-4 flex-1 bg-surface py-4 px-4 rounded-xl flex flex-col items-center justify-center text-center border border-surface-container-high/40">
        <div className={`font-sans font-black tracking-tight text-[38px] lg:text-[44px] leading-none mb-2.5 ${textColor}`}>
          {value}
        </div>
        
        {trend && (
          <div className={`inline-flex items-center gap-1.5 ${trendText} ${trendBg} text-[10px] sm:text-[11px] font-sans font-bold tracking-tight uppercase px-2.5 py-1 rounded-md max-w-full border border-current/10`}>
            <TrendIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
