import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StatCard from './StatCard';
import GaugeCard from './GaugeCard';

export default function StatsRow() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.stat-card');
    gsap.fromTo(cards, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="stat-card h-full">
        <StatCard 
          icon="memory" 
          title="Total Devices" 
          subtitle="All registered hardware" 
          value="142" 
          trend="+3 vs prev 7 days" 
        />
      </div>
      <div className="stat-card h-full">
        <StatCard 
          icon="warning" 
          title="Active Violations" 
          subtitle="Requires immediate action" 
          value="3" 
          trend="+1.2% vs prev 7 days" 
          isError={true}
        />
      </div>
      <div className="stat-card h-full">
        <StatCard 
          icon="cell_tower" 
          title="Devices Online" 
          subtitle="Currently transmitting" 
          value="128" 
          trend="+4.2% vs prev 7 days" 
        />
      </div>
      <div className="stat-card h-full">
        <GaugeCard />
      </div>
    </div>
  );
}
