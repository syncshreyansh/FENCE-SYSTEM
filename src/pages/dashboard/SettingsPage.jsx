import { useState } from 'react';
import { Settings, Save, Shield, Bell, Wifi, Key, Check } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [dutyThreshold, setDutyThreshold] = useState(5.0);
  const [pollInterval, setPollInterval] = useState(15);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            System Settings
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Perimeter Detection Logic & Telemetry Parameters
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl text-[12px] font-mono font-bold hover:brightness-110 transition-all shadow-sm cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Changes Saved' : 'Save Configuration'}</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Logic */}
        <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-card flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-sans font-bold text-on-surface text-[16px] tracking-tight">Detection & Compliance Rules</h3>
              <p className="text-[12px] font-mono text-on-surface-variant">Configure ML thresholds for unauthorized power draw</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center text-[13px] font-sans font-bold text-on-surface mb-2">
                <span>Legal Duty Cycle Limit</span>
                <span className="font-sans text-primary font-black text-[16px]">{dutyThreshold.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="20.0"
                step="0.5"
                value={dutyThreshold}
                onChange={(e) => setDutyThreshold(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <span className="text-[11px] font-mono text-on-surface-variant mt-1 block">Default standard legal limit is &lt;5.0%</span>
            </div>

            <div className="pt-3 border-t border-surface-container-high/40 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-sans font-bold text-on-surface text-[14px]">Auto-Dispatch Ranger Units</div>
                <div className="text-[11px] font-mono text-on-surface-variant">Trigger geo-located dispatch alert on critical taps</div>
              </div>
              <button
                onClick={() => setAutoDispatch(prev => !prev)}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  autoDispatch ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  autoDispatch ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Network & Polling */}
        <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-card flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
            <Wifi className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-sans font-bold text-on-surface text-[16px] tracking-tight">IoT Telemetry & Heartbeat</h3>
              <p className="text-[12px] font-mono text-on-surface-variant">Manage controller sensor transmission rates</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center text-[13px] font-sans font-bold text-on-surface mb-2">
                <span>Sensor Polling Interval</span>
                <span className="font-sans text-primary font-black text-[16px]">{pollInterval}s</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={pollInterval}
                onChange={(e) => setPollInterval(parseInt(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <span className="text-[11px] font-mono text-on-surface-variant mt-1 block">Lower interval increases battery consumption</span>
            </div>

            <div className="pt-3 border-t border-surface-container-high/40 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-sans font-bold text-on-surface text-[14px]">SMS & Cellular Failover</div>
                <div className="text-[11px] font-mono text-on-surface-variant">Send satellite/GSM SMS when LoRa gateway drops</div>
              </div>
              <button
                onClick={() => setSmsAlerts(prev => !prev)}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  smsAlerts ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  smsAlerts ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
