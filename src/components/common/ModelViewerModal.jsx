import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import gsap from 'gsap';

// Preload the models so they appear faster
useGLTF.preload('/assets/models/cad-design.glb');
useGLTF.preload('/assets/models/pcb.glb');
useGLTF.preload('/assets/models/antenna.glb');

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  return <primitive key={url} object={clonedScene} />;
};

const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center text-white">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin"></div>
      <span className="text-sm tracking-widest uppercase text-white/70">Loading Model...</span>
    </div>
  </div>
);

const ModelViewerModal = ({ isOpen, onClose, modelPath, title, secondaryAction }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);

  // Handle entry/exit animations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle crossfade when swapping models (like CAD -> PCB)
  useEffect(() => {
    if (isOpen && canvasWrapperRef.current) {
      gsap.fromTo(
        canvasWrapperRef.current,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [modelPath, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-6xl max-h-[90vh] mx-3 sm:mx-4 flex flex-col bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 absolute top-0 w-full z-10 pointer-events-none">
          <h3 className="text-white text-sm uppercase tracking-[0.2em] font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white pointer-events-auto transition-colors w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 3D Canvas */}
        <div ref={canvasWrapperRef} className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
          <Suspense fallback={<LoadingFallback />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Stage key={modelPath} environment="city" intensity={0.6}>
                <Model key={modelPath} url={modelPath} />
              </Stage>
              <OrbitControls enableZoom={true} enablePan={true} makeDefault />
            </Canvas>
          </Suspense>
        </div>

        {/* Optional Secondary Action (e.g., View PCB button) */}
        {secondaryAction && (
          <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              {secondaryAction}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelViewerModal;
