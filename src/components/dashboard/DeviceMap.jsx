import { useEffect } from 'react';
import { gsap } from 'gsap';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Classes are defined here so Tailwind picks them up during build
const normalClasses = "bg-[#2d5a1b] shadow-[0_0_0_5px_rgba(45,90,27,0.35)]";
const violationClasses = "bg-[#c0392b] shadow-[0_0_0_5px_rgba(192,57,43,0.45)]";
const offlineClasses = "bg-[#7a7a6a] shadow-[0_0_0_3px_rgba(120,120,106,0.3)]";

const createCustomIcon = (status) => {
  let colorClasses = offlineClasses;
  if (status === 'normal') colorClasses = normalClasses;
  if (status === 'violation') colorClasses = violationClasses;

  return L.divIcon({
    className: 'bg-transparent border-none', // Leaflet defaults to a white square if we don't reset this
    html: `<div class="device-dot dot-${status} w-3 h-3 rounded-full ${colorClasses}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export default function DeviceMap({ devices }) {
  // GSAP animations for the markers
  useEffect(() => {
    const timer = setTimeout(() => {
      // Pop in dots on mount
      gsap.fromTo('.device-dot', 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.04, 
          duration: 0.6, 
          ease: 'back.out(1.7)' 
        }
      );

      // Pulse red violation dots continuously
      gsap.to('.dot-violation', {
        scale: 1.3,
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'sine.inOut'
      });
    }, 400); // Wait for Leaflet to render DOM

    return () => clearTimeout(timer);
  }, [devices]);

  // Convert mock x/y percentages (0-100) to actual map coordinates
  // Centered roughly on Central India (Kanha/Sonitpur region loosely speaking)
  const centerLat = 22.33;
  const centerLng = 80.61;
  const getLatLng = (x, y) => {
    // Map x (0-100) to longitude spread, y (0-100) to latitude spread
    const lng = centerLng - 1.5 + (x / 100) * 3.0;
    const lat = centerLat + 1.5 - (y / 100) * 3.0; // Y is inverted on a map (0 is top/North)
    return [lat, lng];
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 min-h-[420px] flex flex-col relative overflow-hidden h-full">
      {/* Header & Legend */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-[16px] font-semibold text-on-surface leading-tight">Device map</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2d5a1b]"></span>
            <span className="text-[12px] text-on-surface-variant font-medium">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c0392b]"></span>
            <span className="text-[12px] text-on-surface-variant font-medium">Violation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7a7a6a]"></span>
            <span className="text-[12px] text-on-surface-variant font-medium">Offline</span>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative w-full rounded-xl bg-[#f5f0e8] border border-[#2e2e2e] overflow-hidden z-0">
        <MapContainer 
          center={[centerLat, centerLng]} 
          zoom={7} 
          scrollWheelZoom={false} 
          className="w-full h-full absolute inset-0"
          zoomControl={false}
        >
          {/* Muted/Cream base map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />
          
          {/* Render markers */}
          {devices.map((device) => {
            const pos = getLatLng(device.x, device.y);
            return (
              <Marker 
                key={device.id} 
                position={pos} 
                icon={createCustomIcon(device.status)}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9} className="rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] !border-[#2e2e2e] text-[12px] !text-[#e8e6de] !bg-[#1e1e1e] font-semibold px-2 py-1">
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
