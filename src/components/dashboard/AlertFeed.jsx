export default function AlertFeed({ alerts }) {
  const getBorderColor = (type) => {
    if (type === 'violation') return 'border-error';
    if (type === 'tamper') return 'border-[#eab308]';
    return 'border-outline-variant';
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 lg:p-6 select-none w-full min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] sm:text-[16px] font-bold text-on-surface leading-tight tracking-tight">Device Alerts</h3>
        <span className="font-mono text-[11px] text-on-surface-variant opacity-75">{alerts.length} live signals</span>
      </div>
      
      <div className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            data-type={alert.type}
            className={`alert-item bg-surface border-l-4 ${getBorderColor(alert.type)} rounded-lg p-3.5 overflow-hidden border-y border-r border-surface-container-high min-w-[240px] sm:min-w-[280px] shrink-0`}
          >
            <div className="font-bold text-on-surface text-[13px] sm:text-[14px] leading-tight mb-1 truncate">
              Meter <span className="font-mono text-primary">{alert.meterId}</span> &middot; <span className="capitalize">{alert.type}</span>
            </div>
            <div className="text-[11px] sm:text-[12px] text-on-surface-variant font-mono truncate opacity-80">{alert.zone} zone &middot; {alert.timeAgo}</div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-on-surface-variant font-mono text-[12px] text-center my-auto py-4 w-full">No alerts to display</div>
        )}
      </div>
    </div>
  );
}
