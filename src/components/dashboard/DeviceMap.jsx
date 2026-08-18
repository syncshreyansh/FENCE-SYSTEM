import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Classes are defined here so Tailwind picks them up during build
const normalClasses = "bg-[#84cc16] shadow-[0_0_0_5px_rgba(132,204,22,0.35)]";
const violationClasses = "bg-[#ff4444] shadow-[0_0_0_5px_rgba(255,68,68,0.45)]";
const offlineClasses = "bg-[#737373] shadow-[0_0_0_3px_rgba(115,115,115,0.3)]";

const createCustomIcon = (status) => {
  let colorClasses = offlineClasses;
  if (status === 'normal') colorClasses = normalClasses;
  if (status === 'violation') colorClasses = violationClasses;

  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="device-dot dot-${status} w-3 h-3 rounded-full ${colorClasses}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export default function DeviceMap({ devices }) {
  const centerLat = 22.33;
  const centerLng = 80.61;
  const getLatLng = (x, y) => {
    const lng = centerLng - 1.5 + (x / 100) * 3.0;
    const lat = centerLat + 1.5 - (y / 100) * 3.0;
    return [lat, lng];
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 lg:p-6 min-h-[420px] flex flex-col relative overflow-hidden h-full w-full min-w-0 select-none">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 shrink-0 z-10">
        <h3 className="text-[15px] sm:text-[16px] font-bold text-on-surface leading-tight tracking-tight">Device Map</h3>
        <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] shrink-0"></span>
            <span className="text-on-surface-variant font-medium">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff4444] shrink-0"></span>
            <span className="text-on-surface-variant font-medium">Violation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#737373] shrink-0"></span>
            <span className="text-on-surface-variant font-medium">Offline</span>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative w-full min-h-[280px] rounded-xl bg-[#f5f0e8] border border-[#282828] overflow-hidden z-0">
        <MapContainer 
          center={[centerLat, centerLng]} 
          zoom={7} 
          scrollWheelZoom={false} 
          className="w-full h-full absolute inset-0"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />
          
          {devices.map((device) => {
            const pos = getLatLng(device.x, device.y);
            return (
              <Marker 
                key={device.id} 
                position={pos} 
                icon={createCustomIcon(device.status)}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95} className="rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.8)] !border-[#282828] text-[11px] !text-[#E8E3D9] !bg-[#080808] font-mono font-semibold px-2 py-1">
                  {device.id} &middot; {device.status}
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
