export default function DeviceMapPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#f5f0e8] rounded-2xl border border-[#2e2e2e]">
      <span className="material-symbols-outlined text-[64px] text-[#2d5a1b] mb-4">map</span>
      <h2 className="text-[28px] font-display font-bold text-[#111111]">Device Map</h2>
      <p className="text-[#111111] opacity-70 mt-2 max-w-md">Full-screen Leaflet map with detailed device panels and live tracking data.</p>
    </div>
  );
}
