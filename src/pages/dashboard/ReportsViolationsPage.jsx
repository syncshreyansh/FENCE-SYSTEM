import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileWarning, 
  Search, 
  ChevronDown, 
  Download, 
  Filter, 
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';

const mockViolations = [
  { id: 'VIO-4091', device: 'DEV-002', zone: 'Kanha', sector: 'Sector 4-B', duty: 94.3, voltage: 8.4, start: '16 Aug 09:42', duration: '2h 14m', type: 'Illegal Tap', severity: 'Critical' },
  { id: 'VIO-4090', device: 'DEV-102', zone: 'Sonitpur', sector: 'North Ridge', duty: 91.2, voltage: 7.8, start: '16 Aug 08:30', duration: '48m', type: 'Illegal Tap', severity: 'Critical' },
  { id: 'VIO-4089', device: 'DEV-014', zone: 'Sonitpur', sector: 'East River', duty: 86.5, voltage: 6.9, start: '15 Aug 22:15', duration: '3h 22m', type: 'Illegal Tap', severity: 'Critical' },
  { id: 'VIO-4088', device: 'DEV-056', zone: 'Kanha', sector: 'Sector 3-A', duty: 82.1, voltage: 8.1, start: '15 Aug 18:40', duration: '1h 10m', type: 'Illegal Tap', severity: 'Critical' },
  { id: 'VIO-4087', device: 'DEV-004', zone: 'Kanha', sector: 'Sector 2-B', duty: 28.4, voltage: 9.1, start: '15 Aug 14:12', duration: '25m', type: 'Appliance Load', severity: 'Moderate' },
  { id: 'VIO-4086', device: 'DEV-022', zone: 'Sonitpur', sector: 'South Gate', duty: 31.0, voltage: 8.8, start: '14 Aug 23:05', duration: '35m', type: 'Appliance Load', severity: 'Moderate' },
  { id: 'VIO-4085', device: 'DEV-003', zone: 'Kanha', sector: 'Sector 1-A', duty: 0.0, voltage: 0.0, start: '14 Aug 19:20', duration: '1h 05m', type: 'Case Opened', severity: 'Tamper' },
  { id: 'VIO-4084', device: 'DEV-105', zone: 'Sonitpur', sector: 'Ridge 3', duty: 88.9, voltage: 7.4, start: '14 Aug 11:34', duration: '2h 45m', type: 'Illegal Tap', severity: 'Critical' },
  { id: 'VIO-4083', device: 'DEV-067', zone: 'Kanha', sector: 'Sector 5-C', duty: 18.5, voltage: 9.2, start: '13 Aug 16:50', duration: '40m', type: 'Vegetation Contact', severity: 'Low' },
  { id: 'VIO-4082', device: 'DEV-031', zone: 'Kanha', sector: 'Sector 1-D', duty: 92.4, voltage: 7.9, start: '13 Aug 06:12', duration: '1h 55m', type: 'Illegal Tap', severity: 'Critical' }
];

export default function ReportsViolationsPage() {
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filtered = mockViolations.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(search.toLowerCase()) || 
                          v.device.toLowerCase().includes(search.toLowerCase()) ||
                          v.sector.toLowerCase().includes(search.toLowerCase());
    const matchesZone = zoneFilter === 'All' || v.zone === zoneFilter;
    const matchesSeverity = severityFilter === 'All' || v.severity === severityFilter;
    return matchesSearch && matchesZone && matchesSeverity;
  });

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Violation Log
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Perimeter Security Audits · <span className="text-primary font-sans font-bold">47</span> Historical Incidents Logged
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-xl text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors">
            <Calendar className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-[12px] font-mono font-bold hover:brightness-110 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-2">Total Violations</span>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-on-surface leading-none mb-1">
            47
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">+12.4% vs last month</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-error mb-2">Critical Severity</span>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-error leading-none mb-1">
            8
          </div>
          <span className="text-[11px] text-error/80 font-mono">Illegal high-drain taps</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#eab308] mb-2">Avg Penalty Voltage</span>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-[#eab308] leading-none mb-1">
            8.6 <span className="text-[20px]">kV</span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Standard fence rating</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary mb-2">Power Interceptions</span>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-primary leading-none mb-1">
            18.2 <span className="text-[20px]">kWh</span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Total estimated theft</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 min-w-0">
        <div className="relative flex items-center w-full sm:w-80 h-[38px] rounded-xl bg-surface border border-surface-container-high px-3 gap-2 focus-within:border-primary">
          <Search className="w-4 h-4 text-on-surface-variant shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incident ID, device, sector..."
            className="bg-transparent text-[13px] text-on-surface placeholder:text-on-surface-variant/60 outline-none w-full font-sans"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          <div className="flex items-center gap-1 bg-surface border border-surface-container-high px-3 py-1.5 rounded-xl text-[12px] font-mono">
            <span className="text-on-surface-variant">Zone:</span>
            <select 
              value={zoneFilter} 
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-transparent text-on-surface font-bold outline-none cursor-pointer"
            >
              <option value="All" className="bg-surface text-on-surface">All Zones</option>
              <option value="Kanha" className="bg-surface text-on-surface">Kanha</option>
              <option value="Sonitpur" className="bg-surface text-on-surface">Sonitpur</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-surface border border-surface-container-high px-3 py-1.5 rounded-xl text-[12px] font-mono">
            <span className="text-on-surface-variant">Severity:</span>
            <select 
              value={severityFilter} 
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-transparent text-on-surface font-bold outline-none cursor-pointer"
            >
              <option value="All" className="bg-surface text-on-surface">All Severities</option>
              <option value="Critical" className="bg-surface text-on-surface">Critical</option>
              <option value="Moderate" className="bg-surface text-on-surface">Moderate</option>
              <option value="Tamper" className="bg-surface text-on-surface">Tamper</option>
              <option value="Low" className="bg-surface text-on-surface">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest">
          <h3 className="text-[14px] font-sans font-bold text-on-surface tracking-tight">
            Historical Records ({filtered.length})
          </h3>
          <span className="text-[11px] font-mono text-on-surface-variant">Auto-synced with IoT Ledger</span>
        </div>

        <div className="overflow-x-auto min-w-0">
          <table className="w-full min-w-[960px] text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-mono text-[10px] uppercase tracking-widest border-b border-surface-container-high">
                <th className="px-4 py-3 font-bold">Incident ID</th>
                <th className="px-4 py-3 font-bold">Device</th>
                <th className="px-4 py-3 font-bold">Location</th>
                <th className="px-4 py-3 font-bold">Classification</th>
                <th className="px-4 py-3 font-bold">Duty Cycle</th>
                <th className="px-4 py-3 font-bold">Voltage</th>
                <th className="px-4 py-3 font-bold">Start Time</th>
                <th className="px-4 py-3 font-bold">Duration</th>
                <th className="px-4 py-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-surface-container-high/40 text-[13px] text-on-surface hover:bg-surface-container-low/60 transition-colors ${
                    i % 2 === 1 ? 'bg-surface-container/25' : 'bg-surface-container-lowest'
                  }`}
                >
                  <td className="px-4 py-3.5 font-mono font-bold whitespace-nowrap text-on-surface">{row.id}</td>
                  <td className="px-4 py-3.5 font-mono font-bold text-primary whitespace-nowrap">{row.device}</td>
                  <td className="px-4 py-3.5 font-sans whitespace-nowrap">
                    <span className="font-semibold">{row.zone}</span>
                    <span className="text-on-surface-variant font-mono text-[11px] ml-1.5">({row.sector})</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-sans font-bold uppercase tracking-tight ${
                      row.severity === 'Critical'
                        ? 'bg-error-container text-on-error-container border border-error/30'
                        : row.severity === 'Tamper'
                          ? 'bg-[#eab308]/15 text-[#eab308] border border-[#eab308]/30'
                          : 'bg-primary-container text-on-primary-container border border-primary/30'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-sans font-bold whitespace-nowrap">
                    <span className={row.duty > 80 ? 'text-error' : 'text-primary'}>
                      {row.duty > 0 ? `${row.duty}%` : '--'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-sans font-bold whitespace-nowrap text-on-surface">
                    {row.voltage > 0 ? `${row.voltage} kV` : '--'}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[12px] whitespace-nowrap opacity-85">{row.start}</td>
                  <td className="px-4 py-3.5 font-sans font-semibold whitespace-nowrap text-on-surface">{row.duration}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <Link
                      to="/dashboard/readings"
                      className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-primary hover:underline"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
