import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BellRing, 
  AlertTriangle, 
  Unlock, 
  Radio, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Download, 
  Search,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const mockAllAlerts = [
  {
    id: 'ALT-9821',
    deviceId: 'DEV-002',
    zone: 'Kanha Zone',
    sector: 'Sector 4-B',
    type: 'violation',
    severity: 'critical',
    title: 'Illegal Tap - High Duty Cycle',
    description: 'Continuous unauthorized power drain detected on fence loop. Duty cycle peaked at 94.3%.',
    timestamp: '2 mins ago',
    duration: '2h 14m',
    voltage: '8.4 kV',
    dutyCycle: '94.3%',
    status: 'active'
  },
  {
    id: 'ALT-9818',
    deviceId: 'DEV-102',
    zone: 'Sonitpur Zone',
    sector: 'North Ridge',
    type: 'violation',
    severity: 'critical',
    title: 'Illegal Tap - Continuous Current Draw',
    description: 'Unauthorized tapping detected across 400m perimeter segment. Current surge persistent.',
    timestamp: '14 mins ago',
    duration: '48m',
    voltage: '7.8 kV',
    dutyCycle: '91.2%',
    status: 'active'
  },
  {
    id: 'ALT-9805',
    deviceId: 'DEV-003',
    zone: 'Kanha Zone',
    sector: 'Sector 1-A',
    type: 'tamper',
    severity: 'warning',
    title: 'Enclosure Case Opened',
    description: 'Physical tamper sensor triggered. Controller lid unsealed or breached.',
    timestamp: '32 mins ago',
    duration: '1h 05m',
    voltage: '0.0 kV',
    dutyCycle: '--',
    status: 'active'
  },
  {
    id: 'ALT-9799',
    deviceId: 'DEV-088',
    zone: 'Kanha Zone',
    sector: 'Sector 2-C',
    type: 'offline',
    severity: 'warning',
    title: 'Gateway Telemetry Dropped',
    description: 'No ping received for over 15 minutes. Cell tower signal degraded to -114 dBm.',
    timestamp: '1 hour ago',
    duration: '1h 12m',
    voltage: '9.1 kV',
    dutyCycle: '3.1%',
    status: 'active'
  },
  {
    id: 'ALT-9782',
    deviceId: 'DEV-014',
    zone: 'Sonitpur Zone',
    sector: 'East River Border',
    type: 'violation',
    severity: 'critical',
    title: 'Intermittent Heavy Current Load',
    description: 'Rapid on/off spikes detected matching heavy resistive tapping signatures.',
    timestamp: '2 hours ago',
    duration: '3h 22m',
    voltage: '6.9 kV',
    dutyCycle: '86.5%',
    status: 'active'
  },
  {
    id: 'ALT-9760',
    deviceId: 'DEV-045',
    zone: 'Kanha Zone',
    sector: 'Sector 5-D',
    type: 'battery',
    severity: 'info',
    title: 'Low Solar Recharge Warning',
    description: 'Battery capacity down to 18%. Solar array obstructed by foliage or debris.',
    timestamp: '3 hours ago',
    duration: '5h 40m',
    voltage: '9.2 kV',
    dutyCycle: '2.4%',
    status: 'active'
  },
  {
    id: 'ALT-9745',
    deviceId: 'DEV-009',
    zone: 'Sonitpur Zone',
    sector: 'South Post',
    type: 'violation',
    severity: 'resolved',
    title: 'Branch Fall / Vegetation Contact',
    description: 'Temporary leakage current resolved after forest ranger clearing patrol.',
    timestamp: '5 hours ago',
    duration: '45m',
    voltage: '9.4 kV',
    dutyCycle: '12.1%',
    status: 'resolved'
  }
];

export default function AlertsPage() {
  const [filter, setFilter] = useState('all');
  const [alertsList, setAlertsList] = useState(mockAllAlerts);
  const [resolvedIds, setResolvedIds] = useState(new Set());

  const handleResolve = (id) => {
    setResolvedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const filtered = alertsList.filter(a => {
    const isResolved = resolvedIds.has(a.id) || a.status === 'resolved';
    if (filter === 'all') return true;
    if (filter === 'critical') return a.severity === 'critical' && !isResolved;
    if (filter === 'tamper') return a.type === 'tamper' && !isResolved;
    if (filter === 'active') return !isResolved;
    if (filter === 'resolved') return isResolved;
    return true;
  });

  const activeCount = alertsList.filter(a => !resolvedIds.has(a.id) && a.status !== 'resolved').length;
  const criticalCount = alertsList.filter(a => a.severity === 'critical' && !resolvedIds.has(a.id) && a.status !== 'resolved').length;
  const tamperCount = alertsList.filter(a => a.type === 'tamper' && !resolvedIds.has(a.id) && a.status !== 'resolved').length;

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Alerts & Incidents
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Real-time Threat & Incident Feed · <span className="text-primary font-sans font-bold">{activeCount}</span> Active Dispatches
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button 
            onClick={() => alertsList.forEach(a => handleResolve(a.id))}
            className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-xl text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Acknowledge All</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-[12px] font-mono font-bold hover:brightness-110 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Export Incident Log</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">Active Incidents</span>
            <ShieldAlert className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-on-surface leading-none mb-1">
            {activeCount}
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Requires field action</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-error">Critical Violations</span>
            <AlertTriangle className="w-4 h-4 text-error shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-error leading-none mb-1">
            {criticalCount}
          </div>
          <span className="text-[11px] text-error/80 font-mono">Continuous power drain</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#eab308]">Tamper Breaches</span>
            <Unlock className="w-4 h-4 text-[#eab308] shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-[#eab308] leading-none mb-1">
            {tamperCount}
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Hardware housing open</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary">Resolved (24h)</span>
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-primary leading-none mb-1">
            28
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Average 14m response</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Incidents', count: alertsList.length },
          { key: 'critical', label: 'Critical', count: criticalCount },
          { key: 'tamper', label: 'Tamper', count: tamperCount },
          { key: 'active', label: 'Unresolved', count: activeCount },
          { key: 'resolved', label: 'Resolved', count: alertsList.length - activeCount }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3.5 py-2 rounded-xl text-[12px] font-mono font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              filter === tab.key
                ? 'bg-primary text-black shadow-sm'
                : 'bg-surface-container-lowest border border-surface-container-high text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded font-sans font-bold ${
              filter === tab.key ? 'bg-black/20 text-black' : 'bg-surface-container text-on-surface-variant'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Incident List */}
      <div className="flex flex-col gap-3.5">
        {filtered.map(alert => {
          const isResolved = resolvedIds.has(alert.id) || alert.status === 'resolved';
          const isCritical = alert.severity === 'critical';

          return (
            <div 
              key={alert.id}
              className={`bg-surface-container-lowest border rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isResolved
                  ? 'border-surface-container-high/40 opacity-60'
                  : isCritical
                    ? 'border-error/40 bg-gradient-to-r from-error-container/25 to-surface-container-lowest'
                    : 'border-surface-container-high hover:border-primary/40'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isResolved
                    ? 'bg-surface-container text-on-surface-variant'
                    : isCritical
                      ? 'bg-error/20 text-error border border-error/30'
                      : alert.type === 'tamper'
                        ? 'bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/30'
                        : 'bg-primary/20 text-primary border border-primary/30'
                }`}>
                  {isResolved ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCritical ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : alert.type === 'tamper' ? (
                    <Unlock className="w-5 h-5" />
                  ) : (
                    <Radio className="w-5 h-5" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <span className="font-mono font-bold text-on-surface text-[14px]">{alert.id}</span>
                    <span className="text-[11px] font-mono text-on-surface-variant">·</span>
                    <span className="font-mono font-bold text-primary text-[13px]">{alert.deviceId}</span>
                    <span className="text-[11px] font-mono text-on-surface-variant">·</span>
                    <span className="text-[11px] font-mono text-on-surface-variant">{alert.zone} ({alert.sector})</span>
                    
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-tight ${
                      isResolved
                        ? 'bg-surface-container text-on-surface-variant'
                        : isCritical
                          ? 'bg-error-container text-on-error-container border border-error/30'
                          : 'bg-primary-container text-on-primary-container border border-primary/30'
                    }`}>
                      {isResolved ? 'RESOLVED' : alert.severity}
                    </span>
                  </div>

                  <h3 className="font-bold text-on-surface text-[15px] tracking-tight mb-1">{alert.title}</h3>
                  <p className="text-[13px] text-on-surface-variant max-w-2xl leading-relaxed">{alert.description}</p>

                  <div className="flex items-center gap-4 text-[11px] font-mono text-on-surface-variant mt-3 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{alert.timestamp}</span>
                    </span>
                    <span>·</span>
                    <span>Duration: <strong className="text-on-surface font-sans">{alert.duration}</strong></span>
                    <span>·</span>
                    <span>Voltage: <strong className="text-on-surface font-sans">{alert.voltage}</strong></span>
                    <span>·</span>
                    <span>Duty Cycle: <strong className={isCritical ? 'text-error font-sans' : 'text-primary font-sans'}>{alert.dutyCycle}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Action Trigger */}
              <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                <Link
                  to="/dashboard/readings"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-high text-on-surface text-[12px] font-mono font-semibold hover:bg-surface-container transition-colors"
                >
                  <span>Telemetry</span>
                  <ExternalLink className="w-3 h-3 text-on-surface-variant" />
                </Link>

                {!isResolved && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-black text-[12px] font-mono font-bold hover:brightness-110 transition-all shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
