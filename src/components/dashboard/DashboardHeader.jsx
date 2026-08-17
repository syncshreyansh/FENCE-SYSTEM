import { useState, useEffect } from 'react';

export default function DashboardHeader() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-gray-900 font-bold leading-tight">
          Overview dashboard for unauthorized electric fence detection
        </h1>
        <p className="font-sans text-gray-500 mt-2">Fence detection network</p>
      </div>
      <div className="text-gray-400 text-sm whitespace-nowrap">
        Updated {seconds}s ago
      </div>
    </div>
  );
}
