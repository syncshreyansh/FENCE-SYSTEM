import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ZoomIn, ZoomOut, Maximize, X } from 'lucide-react';
import { AnimatedSolutionButton } from '../home/SolutionSectionComponent';

const PcbImageViewerModal = ({ isOpen, onClose, initialPcb = 'antenna' }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  
  const [activePcb, setActivePcb] = useState(initialPcb);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const pcbData = {
    antenna: { name: 'Antenna PCB', path: '/assets/pcb-images/antenna-pcb.png' },
    meter: { name: 'Meter Module PCB', path: '/assets/pcb-images/meter-pcb.png' },
    data: { name: 'Data Sender PCB', path: '/assets/pcb-images/data-to-dashboard-pcb.png' }
  };

  useEffect(() => {
    if (isOpen) {
      setActivePcb(initialPcb);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, initialPcb]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(containerRef.current, { opacity: 0, scale: 0.95, duration: 0.3, onComplete: onClose });
  };

  const handleZoomIn = () => setScale(s => Math.min(s + 0.5, 5));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.5, 0.5));
  const handleResetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSensitivity = 0.002;
    const delta = -e.deltaY * zoomSensitivity;
    setScale(s => Math.max(0.5, Math.min(s + delta, 5)));
  };

  // Attach non-passive wheel event listener to prevent default
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const onWheel = (e) => {
      e.preventDefault();
      handleWheel(e);
    };
    
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-6xl max-h-[90vh] mx-3 sm:mx-4 flex flex-col bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 lg:p-6 absolute top-0 w-full z-20 pointer-events-none gap-4">
          <div className="flex items-center gap-2 pointer-events-auto bg-black/50 p-2 rounded-xl backdrop-blur-md border border-white/10 flex-wrap justify-center">
             <AnimatedSolutionButton isActive={activePcb === 'antenna'} onClick={() => {setActivePcb('antenna'); handleResetZoom();}}>Antenna PCB</AnimatedSolutionButton>
             <AnimatedSolutionButton isActive={activePcb === 'meter'} onClick={() => {setActivePcb('meter'); handleResetZoom();}}>Meter Module PCB</AnimatedSolutionButton>
             <AnimatedSolutionButton isActive={activePcb === 'data'} onClick={() => {setActivePcb('data'); handleResetZoom();}}>Data Sender PCB</AnimatedSolutionButton>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white pointer-events-auto transition-colors w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md flex-shrink-0 border border-white/10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div 
          className="flex-1 w-full h-full relative overflow-hidden bg-black/40"
        >
          <div
            ref={imageContainerRef}
            className={`w-full h-full flex items-center justify-center transition-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <img 
              src={pcbData[activePcb].path} 
              alt={pcbData[activePcb].name}
              className="max-w-full max-h-full object-contain select-none pointer-events-none"
              draggable="false"
            />
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-full z-20 pointer-events-auto">
            <button onClick={handleZoomOut} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"><ZoomOut size={20} /></button>
            <button onClick={handleResetZoom} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"><Maximize size={20} /></button>
            <button onClick={handleZoomIn} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"><ZoomIn size={20} /></button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PcbImageViewerModal;
