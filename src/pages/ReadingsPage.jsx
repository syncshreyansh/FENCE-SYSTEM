import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { mockReadings } from '../data/readingsMock';

export default function ReadingsPage() {
  const [seconds, setSeconds] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(mockReadings.find(d => d.id === 'DEV-002'));

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Reset animations when selected device changes
  useEffect(() => {
    gsap.fromTo('.reading-card', 
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' }
    );
    gsap.fromTo('.duty-bar', 
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'left center', duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );
  }, [selectedDevice]);

  const renderDutyCycleColor = (dc) => {
    if (dc === null) return '#1e1e1e';
    if (dc > 80) return '#ffb4ab'; // error
    if (dc > 5) return '#ff9800';  // amber
    return '#4caf50'; // green
  };

  const getClassificationStyles = (classification) => {
    if (classification === 'Illegal Tap') return 'bg-error-container text-on-error-container';
    if (classification === 'Normal') return 'bg-[#1a3a1a] text-[#4caf50]';
    if (classification === 'Appliance Load') return 'bg-secondary-container text-on-secondary-container';
    return 'bg-surface-container text-on-surface-variant';
  };

  const isOffline = !selectedDevice.online;

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* Page Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-[28px] font-bold text-on-surface leading-tight">Meter Readings</h1>
          <p className="text-[14px] text-on-surface-variant mt-1">
            Live sensor data · Updated <span id="readings-timer" className="font-medium text-on-surface">{seconds}</span>s ago
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-lg text-[14px] text-on-surface shadow-card hover:bg-surface-container-low transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            All Zones
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-lg text-[14px] text-on-surface shadow-card hover:bg-surface-container-low transition-colors">
            All Status
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-lg text-[14px] text-on-surface shadow-card hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div className="flex gap-6 h-[calc(100vh-160px)]">
        
        {/* Left Column: Device Selector */}
        <div className="w-72 bg-surface-container-lowest border border-surface-container-high rounded-xl flex flex-col overflow-hidden shrink-0 shadow-card">
          <div className="p-4 border-b border-surface-container-high bg-surface-container-lowest z-10 shrink-0">
            <h3 className="font-semibold text-on-surface text-[14px]">Devices</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 relative">
            {mockReadings.map(device => {
              const isSelected = selectedDevice.id === device.id;
              const isViolating = device.classification === 'Illegal Tap';
              return (
                <button
                  key={device.id}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-surface-container border-primary-container shadow-card'
                      : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low'
                  }`}
                  onClick={() => setSelectedDevice(device)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-on-surface text-[14px]">{device.id}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      device.online 
                        ? (isViolating ? 'bg-error shadow-[0_0_6px_rgba(255,180,171,0.5)]' : 'bg-[#4caf50] shadow-[0_0_6px_rgba(76,175,80,0.4)]')
                        : 'bg-surface-dim'
                    }`} />
                  </div>
                  <div className="text-[12px] text-on-surface-variant">{device.zone} · {device.dutyCycle ?? '--'}%</div>
                  <div className={`text-[11px] font-semibold mt-1 ${
                    !device.online ? 'text-on-surface-variant' : (isViolating ? 'text-error' : 'text-[#4caf50]')
                  }`}>
                    {device.classification}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail Panel */}
        <div className="flex-1 overflow-y-auto pr-2 pb-8 flex flex-col gap-5">
          
          {isOffline ? (
            /* Offline State */
            <div className="reading-card bg-surface-container-lowest rounded-xl p-8 shadow-card border border-surface-container-high flex flex-col items-center justify-center text-center py-24">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-6">signal_disconnected</span>
              <h2 className="text-[24px] font-bold text-on-surface mb-2">Device Offline</h2>
              <p className="text-[14px] text-on-surface-variant mb-1">Last seen {selectedDevice.lastSeen}.</p>
              <p className="text-[14px] text-on-surface-variant mb-8">No current readings available.</p>
              
              <div className="flex items-center gap-6 text-[13px] text-on-surface-variant mb-8 bg-surface-container px-6 py-4 rounded-lg">
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
              
              <div className="flex gap-4">
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
                <div className="reading-card bg-surface-container-lowest rounded-xl p-6 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">electric_bolt</span>
                      Classification
                    </h3>
                    
                    <div className="mb-4">
                      {selectedDevice.classification === 'Illegal Tap' ? (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[20px]">🔴</span>
                            <span className="text-[32px] font-display font-bold text-error leading-none uppercase">Illegal Tap</span>
                          </div>
                          <p className="text-[14px] text-on-surface max-w-[280px]">"Unauthorized continuous current draw detected on fence line"</p>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[20px]">🟢</span>
                            <span className="text-[32px] font-display font-bold text-[#4caf50] leading-none uppercase">{selectedDevice.classification}</span>
                          </div>
                          <p className="text-[14px] text-on-surface max-w-[280px]">
                            {selectedDevice.classification === 'Normal' ? '"Normal baseline reading."' : '"Appliance load pattern. No illegal tap signatures detected."'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-surface-container p-3 rounded-lg flex items-center justify-between">
                    <span className="text-[13px] font-medium text-on-surface-variant">ML Confidence</span>
                    <div className="flex items-center gap-3 w-1/2">
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="duty-bar h-full bg-primary" style={{ width: `${selectedDevice.mlConfidence}%` }} />
                      </div>
                      <span className="text-[13px] font-bold text-on-surface">{selectedDevice.mlConfidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Duty Cycle Card */}
                <div className="reading-card bg-surface-container-lowest rounded-xl p-6 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                      Duty Cycle
                    </h3>
                    
                    <div className="text-[48px] font-display font-bold text-on-surface leading-none mb-4">
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
                        <span className="text-[13px] font-bold text-error bg-error-container px-2 py-0.5 rounded uppercase">🔴 Violation</span>
                      ) : (
                        <span className="text-[13px] font-bold text-[#4caf50] bg-[#1a3a1a] px-2 py-0.5 rounded uppercase">🟢 Normal</span>
                      )}
                      <span className="text-[13px] text-on-surface-variant">
                        {selectedDevice.dutyCycle > 80 ? 'Legal limit is <5%' : 'Well within legal limit'}
                      </span>
                    </div>
                  </div>
                  
                  {selectedDevice.violationDuration && (
                    <div className="mt-4 pt-3 border-t border-surface-container-high text-[13px] font-medium text-on-surface">
                      Violation active for: <span className="text-error">{selectedDevice.violationDuration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* TIER 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="reading-card bg-surface-container-lowest rounded-xl p-5 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[160px]">
                  <h3 className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Tamper Status
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined text-[48px] ${selectedDevice.tamper === 'Case Opened' ? 'text-error' : 'text-[#4caf50]'}`}>
                      {selectedDevice.tamper === 'Case Opened' ? 'lock_open' : 'lock'}
                    </span>
                    <div>
                      <div className={`text-[16px] font-bold uppercase mb-1 ${selectedDevice.tamper === 'Case Opened' ? 'text-error' : 'text-[#4caf50]'}`}>
                        {selectedDevice.tamper === 'Case Opened' ? '🔴 CASE OPENED' : '🟢 SEALED'}
                      </div>
                      {selectedDevice.tamper === 'Case Opened' && (
                        <div className="text-[12px] text-on-surface-variant leading-tight">
                          Detected: {selectedDevice.violationStart}<br/>
                          Duration: {selectedDevice.violationDuration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-xl p-5 shadow-card border border-surface-container-high flex flex-col justify-between min-h-[160px]">
                  <h3 className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">cell_tower</span>
                    Device Status
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[48px] text-[#4caf50]">cell_tower</span>
                    <div>
                      <div className="text-[16px] font-bold uppercase mb-1 text-[#4caf50]">🟢 ONLINE</div>
                      <div className="text-[12px] text-on-surface-variant leading-tight">
                        Last ping: {selectedDevice.lastSeen}<br/>
                        Comms: {selectedDevice.comms} · {selectedDevice.signal} dBm
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIER 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="reading-card bg-surface-container-lowest rounded-xl p-5 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    ML Confidence
                  </h3>
                  <div className="text-[36px] font-display font-bold text-primary leading-none mb-3">{selectedDevice.mlConfidence}%</div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-4">
                    <div className="duty-bar h-full bg-primary" style={{ width: `${selectedDevice.mlConfidence}%` }} />
                  </div>
                  <div className="text-[12px] text-on-surface-variant">Model: FenceNet v2.1</div>
                  <div className={`text-[12px] font-medium mt-1 ${
                    selectedDevice.mlConfidence >= 90 ? 'text-primary' : (selectedDevice.mlConfidence >= 70 ? 'text-[#ff9800]' : 'text-error')
                  }`}>
                    {selectedDevice.mlConfidence >= 90 ? '"High confidence — proceed with action"' : '"Moderate — field verification advised"'}
                  </div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-xl p-5 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    Violation Duration
                  </h3>
                  {selectedDevice.violationDuration ? (
                    <>
                      <div className="text-[36px] font-display font-bold text-error leading-none mb-3">{selectedDevice.violationDuration}</div>
                      <div className="text-[12px] text-on-surface-variant leading-tight mb-2">
                        Started: {selectedDevice.violationStart}<br/>
                        All-time violations: {selectedDevice.allTimeViolations} · This month: {selectedDevice.thisMonthViolations}
                      </div>
                      {selectedDevice.allTimeViolations > 3 && (
                        <div className="text-[12px] font-bold text-error uppercase mt-auto">🔴 REPEAT OFFENDER</div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-[14px] font-bold text-on-surface mb-3 mt-2">No active violation</div>
                      <div className="text-[12px] text-on-surface-variant leading-tight mb-2">
                        All-time: {selectedDevice.allTimeViolations} · This month: {selectedDevice.thisMonthViolations}
                      </div>
                      <div className="text-[12px] font-bold text-[#4caf50] uppercase mt-auto">🟢 LOW RISK</div>
                    </>
                  )}
                </div>
              </div>

              {/* TIER 4 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="reading-card bg-surface-container-lowest rounded-xl p-4 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">📍 GPS Location</h3>
                  <div className="text-[13px] text-on-surface font-medium leading-tight mb-3">
                    {selectedDevice.gps.lat}°N<br/>{selectedDevice.gps.lng}°E
                  </div>
                  <div className="text-[12px] text-on-surface-variant leading-tight mb-3">
                    {selectedDevice.zone} Zone<br/>{selectedDevice.gps.sector}
                  </div>
                  <Link to="/dashboard/device-map" className="text-[12px] font-semibold text-primary hover:underline mt-auto">View on Map ↗</Link>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-xl p-4 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">🕐 Last Seen</h3>
                  <div className="text-[16px] font-bold text-[#4caf50] mb-3">{selectedDevice.lastSeen}</div>
                  <div className="text-[12px] text-on-surface-variant leading-tight mb-auto">
                    Today<br/>Next ping: ~37s
                  </div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-xl p-4 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">🔋 Battery</h3>
                  <div className={`text-[16px] font-bold mb-2 ${selectedDevice.battery < 20 ? 'text-error' : (selectedDevice.battery < 40 ? 'text-[#ff9800]' : 'text-on-surface')}`}>
                    {selectedDevice.battery}%
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-2">
                    <div className="duty-bar h-full" style={{ width: `${selectedDevice.battery}%`, backgroundColor: selectedDevice.battery < 20 ? '#ffb4ab' : (selectedDevice.battery < 40 ? '#ff9800' : '#4caf50') }} />
                  </div>
                  <div className="text-[12px] text-on-surface-variant mt-auto">Est. 14 days</div>
                </div>

                <div className="reading-card bg-surface-container-lowest rounded-xl p-4 shadow-card border border-surface-container-high flex flex-col">
                  <h3 className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 border-b border-surface-container-high pb-2">📶 Signal</h3>
                  <div className={`text-[16px] font-bold mb-2 ${selectedDevice.signal < -100 ? 'text-error' : 'text-on-surface'}`}>
                    {selectedDevice.signal} dBm
                  </div>
                  <div className="flex gap-1 mb-2">
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -100 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -90 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -80 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-sm ${selectedDevice.signal > -70 ? 'bg-primary' : 'bg-surface-container'}`}></div>
                  </div>
                  <div className={`text-[12px] font-medium mt-auto ${selectedDevice.signal > -80 ? 'text-[#4caf50]' : (selectedDevice.signal > -100 ? 'text-[#ff9800]' : 'text-error')}`}>
                    {selectedDevice.signal > -80 ? 'Good' : (selectedDevice.signal > -100 ? 'Fair' : 'Weak')}
                  </div>
                </div>
              </div>

              {/* TIER 5 */}
              <div className="reading-card bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-card overflow-hidden">
                <div className="p-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest">
                  <h3 className="text-[14px] font-semibold text-on-surface">Recent Readings — {selectedDevice.id}</h3>
                  <span className="text-[12px] text-on-surface-variant">Last {selectedDevice.history.length} records</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-wider">
                        <th className="px-4 py-3 font-semibold">Timestamp</th>
                        <th className="px-4 py-3 font-semibold">Duty Cycle</th>
                        <th className="px-4 py-3 font-semibold">Classification</th>
                        <th className="px-4 py-3 font-semibold">Confidence</th>
                        <th className="px-4 py-3 font-semibold">Tamper</th>
                        <th className="px-4 py-3 font-semibold">Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDevice.history.length > 0 ? selectedDevice.history.map((row, i) => (
                        <tr key={i} className={`border-b border-surface-container-high text-[13px] text-on-surface ${i % 2 === 1 ? 'bg-surface-container' : 'bg-surface-container-lowest'}`}>
                          <td className="px-4 py-3 whitespace-nowrap">{row.time}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[12px] font-semibold ${row.dutyCycle > 80 ? 'bg-error-container text-on-error-container' : 'bg-[#1a3a1a] text-[#4caf50]'}`}>
                              {row.dutyCycle > 80 ? '🔴' : '🟢'} {row.dutyCycle}%
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[12px] font-semibold ${getClassificationStyles(row.classification)}`}>
                              {row.classification === 'Illegal Tap' ? '🔴' : '🟢'} {row.classification}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{row.confidence}%</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className={`material-symbols-outlined text-[16px] ${row.tamper === 'Case Opened' ? 'text-error' : 'text-[#4caf50]'}`}>
                                {row.tamper === 'Case Opened' ? 'lock_open' : 'lock'}
                              </span>
                              <span>{row.tamper === 'Case Opened' ? 'Open' : 'Sealed'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">{row.signal} dBm</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8 text-center text-on-surface-variant text-[13px]">No historical data available.</td>
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
