import React from 'react';

const Hotspot = ({ top, left, label, onClick }) => {
  return (
    <div
      className="absolute group z-10 flex flex-col items-center"
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
    >
      {/* Pulsing marker */}
      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-6 h-6 focus:outline-none"
        aria-label={label}
      >
        <span className="absolute w-full h-full rounded-full bg-cyan-400 opacity-60 animate-ping" style={{ animationDuration: '2s' }}></span>
        <span className="relative w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]"></span>
      </button>

      {/* Tooltip / Label on hover (optional enhancement for usability) */}
      <div className="absolute top-full mt-2 w-max px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-xs uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {label}
      </div>
    </div>
  );
};

export default Hotspot;
