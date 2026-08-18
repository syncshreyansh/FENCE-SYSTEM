import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Download, 
  WifiOff, 
  Zap, 
  BarChart3, 
  Lock, 
  Unlock, 
  Radio, 
  Cpu, 
  Timer 
} from 'lucide-react';
import { mockReadings } from '../data/readingsMock';

export default function ReadingsPage() {
  const [seconds, setSeconds] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(mockReadings.find(d => d.id === 'DEV-002'));

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderDutyCycleColor = (dc) => {
    if (dc === null) return '#0d0d0d';
    if (dc > 80) return '#ff6b6b'; // error
    if (dc > 5) return '#eab308';  // amber
    return '#84cc16'; // lime green
  };

  const getClassificationStyles = (classification) => {
    if (classification === 'Illegal Tap') return 'bg-error-container text-on-error-container';
    if (classification === 'Normal') return 'bg-[#142500] text-primary border border-primary/20';
    if (classification === 'Appliance Load') return 'bg-secondary-container text-on-secondary-container';
    return 'bg-surface-container text-on-surface-variant';
  };

  const isOffline = !selectedDevice.online;

  return (
    <div className="flex flex-col h-full gap-6 select-none min-w-0">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-black text-on-surface tracking-tight leading-none">Meter Readings</h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Live Sensor Data · Updated <span id="readings-timer" className="font-bold text-primary">{seconds}</span>s ago
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-lg text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>All Zones</span>
            <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-lg text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors">
            <span>All Status</span>
            <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-3.5 py-2 rounded-lg text-[12px] font-mono font-medium text-on-surface hover:bg-surface-container-low transition-colors">
            <Download className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-0 lg:h-[calc(100vh-160px)] min-w-0">
        
        {/* Left Column: Device Selector */}
        <div className="w-full lg:w-72 max-h-[280px] lg:max-h-none bg-surface-container-lowest border border-surface-container-high rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-card">
          <div className="p-4 border-b border-surface-container-high bg-surface-container-lowest z-10 shrink-0 flex items-center justify-between">
            <h3 className="font-bold text-on-surface text-[14px] tracking-tight">Devices</h3>
            <span className="font-mono text-[11px] text-on-surface-variant opacity-75">{mockReadings.length} total</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 relative">
            {mockReadings.map(device => {
              const isSelected = selectedDevice.id === device.id;
              const isViolating = device.classification === 'Illegal Tap';
              return (
                <button
                  key={device.id}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container border-primary ring-1 ring-primary/40'
                      : 'bg-surface-container-lowest border-surface-container-high/60 hover:bg-surface-container-low hover:border-surface-container-high'
                  }`}
                  onClick={() => setSelectedDevice(device)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-on-surface text-[13px]">{device.id}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      device.online 
                        ? (isViolating ? 'bg-error shadow-[0_0_8px_rgba(255,107,107,0.7)]' : 'bg-primary shadow-[0_0_8px_rgba(132,204,22,0.7)]')
                        : 'bg-[#555555]'
                    }`} />
                  </div>
                  <div className="text-[11px] text-on-surface-variant font-mono">{device.zone} · {device.dutyCycle !== null ? `${device.dutyCycle}%` : '--'}</div>
                  <div className={`text-[11px] font-mono font-semibold mt-1 uppercase tracking-wider ${
                    !device.online ? 'text-on-surface-variant opacity-60' : (isViolating ? 'text-error' : 'text-primary')
                  }`}>
                    {device.classification}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail Panel */}
        <div className="flex-1 overflow-y-auto lg:pr-2 pb-8 flex flex-col gap-5 min-w-0">
          
          {isOffline ? (
            /* Offline State */
            <div className="reading-card bg-surface-container-lowest rounded-xl p-8 shadow-card border border-surface-container-high flex flex-col items-center justify-center text-center py-24">
              <WifiOff className="w-16 h-16 text-on-surface-variant opacity-40 mb-6" />
              <h2 className="text-[24px] font-bold text-on-surface mb-2">Device Offline</h2>
              <p className="text-[14px] text-on-surface-variant mb-1">Last seen {selectedDevice.lastSeen}.</p>
              <p className="text-[14px] text-on-surface-variant mb-8">No current readings available.</p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-on-surface-variant mb-8 bg-surface-container px-6 py-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>Battery:</span>
                  <span className="font-bold text-error">{selectedDevice.battery}% 🔴</span>
                </div>
                <span>·</span>
                <div>Install: {selectedDevice.installDate}</div>
              </div>
              
              <div className="text-[13px] text-on-surface-variant mb-8">
                GPS: {selectedDevice.gps.lat}°N {selectedDevice.gps.lng}°E — {selectedDevice.gps.sector}
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/dashboard/device-map" className="bg-surface-container-high text-on-surface px-6 py-2 rounded-lg text-[14px] font-semibold hover:bg-surface-container transition-colors">View on Map</Link>
                <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity">Mark for Inspection</button>
              </div>
            </div>
          ) : (
            /* Online States */
            <>
              {/* TIER 1 */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {/* Classification Card */}
                <div className="reading-card bg-surface-container-lowest rounded-2xl p-6 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-[12px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary shrink-0" />
                      Classification
                    </h3>
                    
                    <div className="mb-4">
                      {selectedDevice.classification === 'Illegal Tap' ? (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[20px]">🔴</span>
                            <span className="text-[24px] lg:text-[32px] font-sans font-black tracking-tight text-error leading-none uppercase">Illegal Tap</span>
                          </div>
                          <p className="text-[13px] text-on-surface max-w-[320px]">"Unauthorized continuous current draw detected on fence line"</p>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[20px]">🟢</span>
                            <span className="text-[24px] lg:text-[32px] font-sans font-black tracking-tight text-primary leading-none uppercase break-words">{selectedDevice.classification}</span>
                          </div>
                          <p className="text-[13px] text-on-surface max-w-[320px]">
                            {selectedDevice.classification === 'Normal' ? '"Normal baseline reading."' : '"Appliance load pattern. No illegal tap signatures detected."'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-surface p-3.5 rounded-xl border border-surface-container-high/40 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-on-surface-variant">ML Confidence</span>
                    <div className="flex items-center gap-3 w-1/2">
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="duty-bar h-full bg-primary" style={{ width: `${selectedDevice.mlConfidence}%` }} />
                      </div>
                      <span className="text-[13px] font-sans font-bold text-on-surface">{selectedDevice.mlConfidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Duty Cycle Card */}
                <div className="reading-card bg-surface-container-lowest rounded-2xl p-6 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-[12px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                      Duty Cycle
                    </h3>
                    
                    <div className="text-[44px] font-sans font-black tracking-tight text-on-surface leading-none mb-4">
                      {selectedDevice.dutyCycle}%
                    </div>
                    
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-4">
                      <div 
                        className="duty-bar h-full rounded-full"
                        style={{ 
                          width: `${selectedDevice.dutyCycle}%`,
                          backgroundColor: renderDutyCycleColor(selectedDevice.dutyCycle)
                        }} 
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {selectedDevice.dutyCycle > 80 ? (
                        <span className="text-[11px] font-sans font-bold text-error bg-error-container px-2 py-0.5 rounded uppercase tracking-tight">🔴 Violation</span>
                      ) : (
                        <span className="text-[11px] font-sans font-bold text-primary bg-primary-container border border-primary/20 px-2 py-0.5 rounded uppercase tracking-tight">🟢 Normal</span>
                      )}
                      <span className="text-[12px] text-on-surface-variant font-sans">
                        {selectedDevice.dutyCycle > 80 ? 'Legal limit is <5%' : 'Well within legal limit'}
                      </span>
                    </div>
                  </div>
                  
                  {selectedDevice.violationDuration && (
                    <div className="mt-4 pt-3 border-t border-surface-container-high text-[12px] font-sans font-medium text-on-surface">
                      Violation active for: <span className="text-error font-bold font-sans">{selectedDevice.violationDuration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* TIER 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="reading-card bg-surface-container-lowest rounded-2xl p-5 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[160px]">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-on-surface-variant shrink-0" />
                    Tamper Status
                  </h3>
                  <div className="flex items-center gap-4">
                    {selectedDevice.tamper === 'Case Opened' ? (
                      <Unlock className="w-12 h-12 text-error shrink-0" />
                    ) : (
                      <Lock className="w-12 h-12 text-primary shrink-0" />
                    )}
                    <div>
                      <div className={`text-[15px] font-sans font-bold uppercase tracking-tight mb-1 ${selectedDevice.tamper === 'Case Opened' ? 'text-error' : 'text-primary'}`}>
                        {selectedDevice.tamper === 'Case Opened' ? '🔴 CASE OPENED' : '🟢 SEALED'}
                      </div>
                      {selectedDevice.tamper === 'Case Opened' && (
                        <div className="text-[11px] font-sans text-on-surface-variant leading-tight">
                          Detected: {selectedDevice.violationStart}<br/>
                          Duration: {selectedDevice.violationDuration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-2xl p-5 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[160px]">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-on-surface-variant shrink-0" />
                    Device Status
                  </h3>
                  <div className="flex items-center gap-4">
                    <Radio className="w-12 h-12 text-primary shrink-0" />
                    <div>
                      <div className="text-[15px] font-sans font-bold uppercase tracking-tight mb-1 text-primary">🟢 ONLINE</div>
                      <div className="text-[11px] font-sans text-on-surface-variant leading-tight">
                        Last ping: {selectedDevice.lastSeen}<br/>
                        Comms: {selectedDevice.comms} · {selectedDevice.signal} dBm
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIER 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="reading-card bg-surface-container-lowest rounded-2xl p-5 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-on-surface-variant shrink-0" />
                    ML Confidence
                  </h3>
                  <div className="text-[36px] font-sans font-black tracking-tight text-primary leading-none mb-3">{selectedDevice.mlConfidence}%</div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-4">
                    <div className="duty-bar h-full bg-primary" style={{ width: `${selectedDevice.mlConfidence}%` }} />
                  </div>
                  <div className="text-[11px] font-sans text-on-surface-variant">Model: FenceNet v2.1</div>
                  <div className={`text-[11px] font-sans font-medium mt-1 ${
                    selectedDevice.mlConfidence >= 90 ? 'text-primary' : (selectedDevice.mlConfidence >= 70 ? 'text-[#ff9800]' : 'text-error')
                  }`}>
                    {selectedDevice.mlConfidence >= 90 ? '"High confidence — proceed with action"' : '"Moderate — field verification advised"'}
                  </div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-2xl p-5 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Timer className="w-4 h-4 text-on-surface-variant shrink-0" />
                    Violation Duration
                  </h3>
                  {selectedDevice.violationDuration ? (
                    <>
                      <div className="text-[36px] font-sans font-black tracking-tight text-error leading-none mb-3">{selectedDevice.violationDuration}</div>
                      <div className="text-[11px] font-sans text-on-surface-variant leading-tight mb-2">
                        Started: {selectedDevice.violationStart}<br/>
                        All-time violations: {selectedDevice.allTimeViolations} · This month: {selectedDevice.thisMonthViolations}
                      </div>
                      {selectedDevice.allTimeViolations > 3 && (
                        <div className="text-[11px] font-sans font-bold text-error uppercase tracking-wider mt-auto">🔴 REPEAT OFFENDER</div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-[13px] font-sans font-bold text-on-surface mb-3 mt-2">No active violation</div>
                      <div className="text-[11px] font-sans text-on-surface-variant leading-tight mb-2">
                        All-time: {selectedDevice.allTimeViolations} · This month: {selectedDevice.thisMonthViolations}
                      </div>
                      <div className="text-[11px] font-sans font-bold text-primary uppercase tracking-wider mt-auto">🟢 LOW RISK</div>
                    </>
                  )}
                </div>
              </div>

              {/* TIER 4 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="reading-card bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high flex flex-col">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">📍 GPS Location</h3>
                  <div className="text-[13px] font-sans text-on-surface font-semibold leading-tight mb-3">
                    {selectedDevice.gps.lat}°N<br/>{selectedDevice.gps.lng}°E
                  </div>
                  <div className="text-[11px] font-sans text-on-surface-variant leading-tight mb-3">
                    {selectedDevice.zone} Zone<br/>{selectedDevice.gps.sector}
                  </div>
                  <Link to="/dashboard/device-map" className="text-[11px] font-sans font-bold text-primary hover:underline mt-auto">View on Map ↗</Link>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high flex flex-col">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">🕐 Last Seen</h3>
                  <div className="text-[15px] font-sans font-bold text-primary mb-3">{selectedDevice.lastSeen}</div>
                  <div className="text-[11px] font-sans text-on-surface-variant leading-tight mb-auto">
                    Today<br/>Next ping: ~37s
                  </div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high flex flex-col">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">🔋 Battery</h3>
                  <div className={`text-[15px] font-sans font-bold mb-2 ${selectedDevice.battery < 20 ? 'text-error' : (selectedDevice.battery < 40 ? 'text-[#ff9800]' : 'text-on-surface')}`}>
                    {selectedDevice.battery}%
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-2">
                    <div className="duty-bar h-full" style={{ width: `${selectedDevice.battery}%`, backgroundColor: selectedDevice.battery < 20 ? '#ff6b6b' : (selectedDevice.battery < 40 ? '#ff9800' : '#84cc16') }} />
                  </div>
                  <div className="text-[11px] font-sans text-on-surface-variant mt-auto">Est. 14 days</div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high flex flex-col">
                  <h3 className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">📶 Signal</h3>
                  <div className={`text-[15px] font-sans font-bold mb-2 ${selectedDevice.signal < -100 ? 'text-error' : 'text-on-surface'}`}>
                    {selectedDevice.signal} dBm
                  </div>
                  <div className="flex gap-1 mb-2">
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -100 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -90 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -80 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -70 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                  </div>
                  <div className={`text-[11px] font-sans font-bold mt-auto ${selectedDevice.signal > -80 ? 'text-primary' : (selectedDevice.signal > -100 ? 'text-[#ff9800]' : 'text-error')}`}>
                    {selectedDevice.signal > -80 ? 'Good' : (selectedDevice.signal > -100 ? 'Fair' : 'Weak')}
                  </div>
                </div>
              </div>

              {/* TIER 5 */}
              <div className="reading-card bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-card overflow-hidden">
                <div className="p-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest gap-2 flex-wrap">
                  <h3 className="text-[14px] font-bold text-on-surface tracking-tight min-w-0">Recent Readings — <span className="font-mono text-primary">{selectedDevice.id}</span></h3>
                  <span className="text-[11px] font-mono text-on-surface-variant shrink-0">Last {selectedDevice.history.length} records</span>
                </div>
                <div className="overflow-x-auto min-w-0">
                  <table className="w-full min-w-[720px] text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant font-mono text-[10px] uppercase tracking-widest border-b border-surface-container-high">
                        <th className="px-4 py-3 font-bold">Timestamp</th>
                        <th className="px-4 py-3 font-bold">Duty Cycle</th>
                        <th className="px-4 py-3 font-bold">Classification</th>
                        <th className="px-4 py-3 font-bold">Confidence</th>
                        <th className="px-4 py-3 font-bold">Tamper</th>
                        <th className="px-4 py-3 font-bold">Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDevice.history.length > 0 ? selectedDevice.history.map((row, i) => (
                        <tr key={i} className={`border-b border-surface-container-high/50 text-[12px] text-on-surface ${i % 2 === 1 ? 'bg-surface-container/40' : 'bg-surface-container-lowest'}`}>
                          <td className="px-4 py-3 whitespace-nowrap opacity-85 font-mono">{row.time}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-sans font-bold ${row.dutyCycle > 80 ? 'bg-error-container text-on-error-container' : 'bg-[#142500] text-primary border border-primary/20'}`}>
                              {row.dutyCycle > 80 ? '🔴' : '🟢'} {row.dutyCycle}%
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${getClassificationStyles(row.classification)}`}>
                              {row.classification === 'Illegal Tap' ? '🔴' : '🟢'} {row.classification}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-sans font-bold text-on-surface">{row.confidence}%</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 font-mono">
                              {row.tamper === 'Case Opened' ? (
                                <Unlock className="w-3.5 h-3.5 text-error shrink-0" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-primary shrink-0" />
                              )}
                              <span className={row.tamper === 'Case Opened' ? 'text-error font-bold' : 'text-primary'}>
                                {row.tamper === 'Case Opened' ? 'Open' : 'Sealed'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant font-sans font-semibold">{row.signal} dBm</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8 text-center text-on-surface-variant font-mono text-[12px]">No historical data available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
}
