import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  Download, 
  Share2, 
  CheckCircle,
  Activity,
  Layers
} from 'lucide-react';

export default function ReportsSummaryPage() {
  const [timeRange, setTimeRange] = useState('Month');

  const zonePerformance = [
    { zone: 'Kanha Zone', devices: 84, uptime: '99.9%', dutyAvg: '4.8%', violations: 18, compliance: '98.2%' },
    { zone: 'Sonitpur Zone', devices: 58, uptime: '99.4%', dutyAvg: '7.2%', violations: 29, compliance: '94.6%' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Reports & Analytics
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Executive Summary · Automated Monthly Telemetry Audit
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap min-w-0">
          <div className="flex bg-surface-container-lowest border border-surface-container-high rounded-xl p-1 overflow-x-auto max-w-full">
            {['Week', 'Month', 'Quarter', 'Year'].map(tab => (
              <button
                key={tab}
                onClick={() => setTimeRange(tab)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-bold transition-all shrink-0 ${
                  timeRange === tab ? 'bg-primary text-black' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-[12px] font-mono font-bold hover:brightness-110 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">Fleet Uptime</span>
            <Activity className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-primary leading-none mb-1">
            99.8%
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Target: 99.5%</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-on-surface leading-none mb-1">
            96.4%
          </div>
          <span className="text-[11px] text-primary font-mono">+1.8% vs last cycle</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">Energy Monitored</span>
            <Zap className="w-4 h-4 text-[#eab308] shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-on-surface leading-none mb-1">
            312.4 <span className="text-[20px]">kWh</span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">142 active nodes</span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high/70 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">Threats Averted</span>
            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="text-[36px] sm:text-[42px] font-sans font-black tracking-tight text-on-surface leading-none mb-1">
            164
          </div>
          <span className="text-[11px] text-primary font-mono">100% intercepted</span>
        </div>
      </div>

      {/* Two Column Zone Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {zonePerformance.map((zone, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary shrink-0"></span>
                  <h3 className="text-[18px] font-sans font-black tracking-tight text-on-surface">{zone.zone}</h3>
                </div>
                <span className="font-mono text-[12px] bg-surface-container px-2.5 py-1 rounded-lg border border-surface-container-high text-on-surface-variant">
                  <strong className="text-primary font-sans">{zone.devices}</strong> Hardware Nodes
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface p-4 rounded-xl border border-surface-container-high/40 mb-4">
                <div>
                  <div className="text-[11px] font-mono uppercase text-on-surface-variant mb-1">Uptime</div>
                  <div className="text-[20px] font-sans font-black tracking-tight text-primary leading-none">{zone.uptime}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-on-surface-variant mb-1">Avg Duty</div>
                  <div className="text-[20px] font-sans font-black tracking-tight text-on-surface leading-none">{zone.dutyAvg}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-on-surface-variant mb-1">Violations</div>
                  <div className="text-[20px] font-sans font-black tracking-tight text-error leading-none">{zone.violations}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-on-surface-variant mb-1">Compliance</div>
                  <div className="text-[20px] font-sans font-black tracking-tight text-primary leading-none">{zone.compliance}</div>
                </div>
              </div>
            </div>

            {/* Visual Compliance Bar */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-on-surface-variant mb-1.5">
                <span>Compliance Benchmark</span>
                <span className="font-sans font-bold text-primary">{zone.compliance}</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000" 
                  style={{ width: zone.compliance }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
