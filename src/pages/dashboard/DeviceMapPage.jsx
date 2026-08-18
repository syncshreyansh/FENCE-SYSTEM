import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, Layers, Radio, AlertTriangle, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';
import DeviceMap from '../../components/dashboard/DeviceMap';
import ZoneFilter from '../../components/dashboard/ZoneFilter';
import { mockDevices } from '../../data/dashboardMock';

export default function DeviceMapPage() {
  const [activeZone, setActiveZone] = useState('All zones');

  const filtered = activeZone === 'All zones'
    ? mockDevices
    : mockDevices.filter(d => d.zone === activeZone);

  const onlineCount = filtered.filter(d => d.status === 'normal' || d.status === 'violation').length;
  const violationCount = filtered.filter(d => d.status === 'violation').length;

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Device Map & Telemetry
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Geospatial Fence Monitoring · <span className="text-primary font-sans font-bold">{filtered.length}</span> Active Field Nodes
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-[12px] bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-xl flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(132,204,22,0.7)]"></span>
            <span className="text-on-surface"><strong className="font-sans font-bold">{onlineCount}</strong> Online</span>
          </div>
          <span className="text-outline">·</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error shadow-[0_0_8px_rgba(255,107,107,0.7)]"></span>
            <span className="text-error"><strong className="font-sans font-bold">{violationCount}</strong> Violations</span>
          </div>
        </div>
      </div>

      {/* Zone Selector */}
      <ZoneFilter activeZone={activeZone} onZoneChange={setActiveZone} />

      {/* Full Map Container */}
      <div className="h-[420px] lg:h-[600px] w-full min-w-0 overflow-hidden">
        <DeviceMap devices={filtered} />
      </div>

      {/* Quick Device List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.slice(0, 8).map(device => (
          <div 
            key={device.id}
            className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-bold text-on-surface text-[14px]">{device.id}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${
                device.status === 'violation' 
                  ? 'bg-error shadow-[0_0_8px_rgba(255,107,107,0.8)]' 
                  : device.status === 'offline' 
                    ? 'bg-outline' 
                    : 'bg-primary shadow-[0_0_8px_rgba(132,204,22,0.8)]'
              }`} />
            </div>

            <div className="font-mono text-[11px] text-on-surface-variant mb-3">
              {device.zone} Zone · {device.sector}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/40">
              <div className="font-sans text-[12px] font-bold">
                Duty: <span className={device.dutyCycle > 80 ? 'text-error' : (device.dutyCycle === null ? 'text-on-surface-variant' : 'text-primary')}>
                  {device.dutyCycle !== null && device.dutyCycle !== undefined ? `${device.dutyCycle}%` : '--'}
                </span>
              </div>
              <Link 
                to="/dashboard/readings"
                className="text-[11px] font-mono font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Meters</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
