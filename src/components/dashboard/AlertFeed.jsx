import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AlertFeed({ alerts }) {
  const feedRef = useRef(null);
  
  useEffect(() => {
    if (!feedRef.current || alerts.length === 0) return;
    
    // Select the first item assuming it's the newest one just prepended
    const newestItem = feedRef.current.querySelector('.alert-item:first-child');
    if (newestItem) {
      const type = newestItem.dataset.type;
      const flashColor = type === 'violation' ? '#3a1010' : '#0d1a00';
      const finalColor = '#1e1e1e';
      
      gsap.fromTo(newestItem, 
        { height: 0, opacity: 0, x: 20 },
        { height: 'auto', opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
      
      // Flash the background color briefly
      gsap.fromTo(newestItem, 
        { backgroundColor: flashColor },
        { backgroundColor: finalColor, duration: 1.5, ease: 'power2.out', clearProps: 'backgroundColor' }
      );
    }
  }, [alerts]);

  const getBorderColor = (type) => {
    if (type === 'violation') return 'border-error';
    if (type === 'tamper') return 'border-[#eab308]'; // kept amber for tamper since not in tokens
    return 'border-outline-variant'; // offline
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 min-h-[420px] flex flex-col h-full">
      <h3 className="text-[16px] font-semibold text-on-surface leading-tight mb-6">Device Alerts</h3>
      
      <div ref={feedRef} className="flex-1 flex flex-col gap-3 overflow-hidden">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            data-type={alert.type}
            className={`alert-item bg-surface border-l-4 ${getBorderColor(alert.type)} rounded-lg p-3 overflow-hidden border-y border-r border-surface-container-high`}
          >
            <div className="font-semibold text-on-surface text-[14px] leading-tight mb-0.5">Meter {alert.meterId} &middot; {alert.type}</div>
            <div className="text-[12px] text-on-surface-variant">{alert.zone} zone &middot; {alert.timeAgo}</div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-on-surface-variant text-[13px] text-center my-auto">No alerts to display</div>
        )}
      </div>
    </div>
  );
}
