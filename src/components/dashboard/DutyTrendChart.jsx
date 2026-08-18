import { BarChart3 } from 'lucide-react';

export default function DutyTrendChart() {
  const days = [
    { label: '04 Apr', dark: 60, sage: 15 },
    { label: '05 Apr', dark: 45, sage: 20 },
    { label: '06 Apr', dark: 70, sage: 10 },
    { label: '07 Apr', dark: 55, sage: 25 },
    { label: '08 Apr', dark: 80, sage: 5 },
    { label: '09 Apr', dark: 40, sage: 30 },
    { label: '10 Apr', dark: 50, sage: 15 }
  ];

  const yAxisTicks = [100, 80, 60, 40, 20, 0];

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 lg:p-6 flex flex-col h-full min-h-[420px] select-none w-full min-w-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 shrink-0">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface-variant">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] sm:text-[16px] font-bold text-on-surface leading-tight tracking-tight truncate">Duty Cycle Trend</h3>
            <p className="text-[11px] sm:text-[12px] text-on-surface-variant font-mono mt-0.5 truncate opacity-75">Avg duty cycle across all zones · Total alerts 17</p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
            <span className="text-on-surface-variant font-medium">Primary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim shrink-0"></span>
            <span className="text-on-surface-variant font-medium">Secondary</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-surface rounded-xl p-4 flex-1 relative flex flex-col min-h-[280px] w-full min-w-0 overflow-hidden border border-surface-container-high/40">
        {/* Y Axis Grid */}
        <div className="absolute inset-x-4 top-4 bottom-8 left-10 flex flex-col justify-between z-0 pointer-events-none">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="w-full border-t border-dashed border-surface-container-high relative">
              <span className="absolute -left-9 -top-2 text-[11px] text-outline font-sans font-bold w-6 text-right">{tick}</span>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-x-4 top-4 bottom-8 left-10 flex justify-around items-end z-10 px-1 sm:px-3">
          {days.map((day, idx) => {
            return (
              <div key={idx} className="group relative flex flex-col justify-end w-7 sm:w-10 h-full max-w-[44px]">
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#080808] border border-[#282828] text-on-surface text-[10px] font-mono px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl flex flex-col items-center gap-0.5">
                  <span className="font-bold text-primary font-sans">{day.label}</span>
                  <span className="font-sans">{day.dark}% Primary</span>
                  <span className="text-secondary-fixed-dim font-sans">{day.sage}% Secondary</span>
                </div>

                <div className="w-full flex flex-col justify-end gap-0.5 h-full">
                  {/* Sage/Secondary portion (Top) */}
                  <div 
                    className="w-full bg-secondary-fixed-dim rounded-t-sm transition-all hover:brightness-125" 
                    style={{ height: `${day.sage}%` }}
                  ></div>
                  {/* Dark/Primary portion (Bottom) */}
                  <div 
                    className="w-full bg-primary rounded-b-sm transition-all hover:brightness-110" 
                    style={{ height: `${day.dark}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X Axis Labels */}
        <div className="absolute bottom-1 inset-x-4 left-10 flex justify-around px-1 sm:px-3 h-6 items-center">
          {days.map((day, idx) => (
            <div key={idx} className="w-7 sm:w-10 max-w-[44px] text-center text-[10px] sm:text-[11px] text-outline font-sans font-bold tracking-tight truncate">
              {day.label}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
