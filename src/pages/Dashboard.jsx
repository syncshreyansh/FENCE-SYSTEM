import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown, Gauge } from 'lucide-react';
import StatsRow from '../components/dashboard/StatsRow';
import DeviceMap from '../components/dashboard/DeviceMap';
import AlertFeed from '../components/dashboard/AlertFeed';
import DutyTrendChart from '../components/dashboard/DutyTrendChart';
import ZoneFilter from '../components/dashboard/ZoneFilter';
import { mockDevices, mockAlerts as initialMockAlerts } from '../data/dashboardMock';

export default function Dashboard() {
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

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-black text-on-surface tracking-tight leading-none">Fleet Overview</h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">Fence Detection Network</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-lg text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors">
            <Calendar className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
            <span>Last 7 Days</span>
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-lg text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors">
            <span>Weekly</span>
            <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
          </button>
          <Link
            to="/dashboard/readings"
            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg text-[12px] font-mono font-bold shadow-sm hover:brightness-110 transition-all"
          >
            <Gauge className="w-3.5 h-3.5 shrink-0" />
            <span>View Readings</span>
          </Link>
        </div>
      </div>

      <StatsRow />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full min-w-0">
        <DutyTrendChart />
        <DeviceMap devices={filteredDevices} />
      </div>

      {/* Zone Filter Section */}
      <div className="w-full min-w-0">
        <ZoneFilter activeZone={activeZone} onZoneChange={setActiveZone} />
      </div>

      {/* Full Width Device Alerts Section */}
      <div className="w-full min-w-0 mb-6">
        <AlertFeed alerts={filteredAlerts} />
      </div>
      
    </div>
  );
}
