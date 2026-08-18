import { Cpu, AlertTriangle, Radio } from 'lucide-react';
import StatCard from './StatCard';
import GaugeCard from './GaugeCard';

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full min-w-0">
      <div className="stat-card h-full min-w-0">
        <StatCard 
          icon={Cpu} 
          title="Total Devices" 
          subtitle="All registered hardware" 
          value="142" 
          trend="+3 vs prev 7 days" 
        />
      </div>
      <div className="stat-card h-full min-w-0">
        <StatCard 
          icon={AlertTriangle} 
          title="Active Violations" 
          subtitle="Requires immediate action" 
          value="3" 
          trend="+1.2% vs prev 7 days" 
          isError={true}
        />
      </div>
      <div className="stat-card h-full min-w-0">
        <StatCard 
          icon={Radio} 
          title="Devices Online" 
          subtitle="Currently transmitting" 
          value="128" 
          trend="+4.2% vs prev 7 days" 
        />
      </div>
      <div className="stat-card h-full min-w-0">
        <GaugeCard />
      </div>
    </div>
  );
}
