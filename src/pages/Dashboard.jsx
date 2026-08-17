import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopAppBar from '../components/layout/TopAppBar';
import StatsRow from '../components/dashboard/StatsRow';
import DeviceMap from '../components/dashboard/DeviceMap';
import AlertFeed from '../components/dashboard/AlertFeed';
import DutyTrendChart from '../components/dashboard/DutyTrendChart';
import ZoneFilter from '../components/dashboard/ZoneFilter';
import { mockDevices, mockAlerts as initialMockAlerts } from '../data/dashboardMock';

export default function Dashboard() {
  const pageRef = useRef(null);
  
  const [activeZone, setActiveZone] = useState('All zones');
  const [alerts, setAlerts] = useState(initialMockAlerts);
  
  // Filter data based on zone
  const filteredDevices = activeZone === 'All zones' 
    ? mockDevices 
    : mockDevices.filter(d => d.zone === activeZone);
    
  const filteredAlerts = activeZone === 'All zones'
    ? alerts
    : alerts.filter(a => a.zone === activeZone);

  // Simulate new incoming alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: `ALT-${Math.floor(Math.random() * 10000)}`,
        meterId: `DEV-${Math.floor(Math.random() * 200)}`,
        type: Math.random() > 0.5 ? 'violation' : 'tamper',
        zone: Math.random() > 0.5 ? 'Kanha' : 'Sonitpur',
        timeAgo: 'Just now'
      };
      
      setAlerts(prev => {
        const newFeed = [newAlert, ...prev];
        return newFeed.slice(0, 5); // keep max 5
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Entrance animation for content
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="flex flex-col gap-gutter-grid">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-on-surface leading-tight">Fleet Overview</h1>
          <p className="text-[14px] text-on-surface-variant mt-1">Fence detection network</p>
        </div>
        <div className="flex items-center gap-3 hidden sm:flex">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-lg text-[14px] text-on-surface shadow-card hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-lg text-[14px] text-on-surface shadow-card hover:bg-surface-container-low transition-colors">
            Weekly
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <Link
            to="/dashboard/readings"
            className="flex items-center gap-2 bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-[14px] font-bold shadow-card hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">speed</span>
            View Readings
          </Link>
        </div>
      </div>

      <StatsRow />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-grid">
        <DutyTrendChart />
        <DeviceMap devices={filteredDevices} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-grid mb-6">
        <div className="lg:col-span-2">
          <ZoneFilter activeZone={activeZone} onZoneChange={setActiveZone} />
        </div>
        <div className="lg:col-span-1">
          <AlertFeed alerts={filteredAlerts} />
        </div>
      </div>
      
    </div>
  );
}
