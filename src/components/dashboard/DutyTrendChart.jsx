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
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant">stacked_bar_chart</span>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-on-surface leading-tight">Duty Cycle Trend</h3>
            <p className="text-[13px] text-on-surface-variant mt-0.5">Average duty cycle across all zones, total alerts 17</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-[12px] text-on-surface-variant font-medium">Primary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim"></span>
            <span className="text-[12px] text-on-surface-variant font-medium">Secondary</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-surface rounded-xl p-4 flex-1 relative flex flex-col min-h-[250px]">
        {/* Y Axis Grid */}
        <div className="absolute inset-0 top-4 bottom-[30px] left-10 right-4 flex flex-col justify-between z-0">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="w-full border-t border-dashed border-surface-container-high relative">
              <span className="absolute -left-8 -top-[10px] text-[11px] text-outline font-medium">{tick}</span>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 top-4 bottom-[30px] left-10 right-4 flex justify-around items-end z-10 px-2">
          {days.map((day, idx) => {
            const totalHeight = day.dark + day.sage; // Assume max 100% for scale
            return (
              <div key={idx} className="group relative flex flex-col justify-end w-8 sm:w-10 h-full">
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-md flex flex-col items-center gap-1">
                  <span>{day.dark}% Primary</span>
                  <span className="text-inverse-primary">{day.sage}% Secondary</span>
                </div>

                <div className="w-full flex flex-col justify-end gap-0.5 h-full">
                  {/* Sage/Secondary portion (Top) */}
                  <div 
                    className="w-full bg-secondary-fixed-dim rounded-t-sm transition-all hover:brightness-95" 
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
        <div className="absolute bottom-0 left-10 right-4 flex justify-around px-2 h-[30px] items-center">
          {days.map((day, idx) => (
            <div key={idx} className="w-8 sm:w-10 text-center text-[11px] text-outline font-medium tracking-wide">
              {day.label}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
