import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ModelViewerModal from '../common/ModelViewerModal';
import { Cpu, Zap, Satellite, ArrowRight } from 'lucide-react';
import { useMouseOriginFill } from '../../hooks/useMouseOriginFill';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSolutionButton({ onClick, isActive, children, className = '' }) {
  const { buttonRef, fillRef } = useMouseOriginFill({
    fillColor: '#84cc16',
    enterDuration: 0.48,
    exitDuration: 0.4,
    ease: 'power3.out',
    onEnter: (btn) => {
      const text = btn.querySelector('.btn-label');
      if (text) {
        gsap.to(text, { color: '#000000', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      }
    },
    onExit: (btn) => {
      const text = btn.querySelector('.btn-label');
      if (text) {
        gsap.to(text, { color: isActive ? '#84cc16' : '#DFD9CE', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      }
    },
  });

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer outline-none transition-colors border ${
        isActive
          ? 'bg-[#84cc16]/10 border-[#84cc16] shadow-[0_0_15px_rgba(132,204,22,0.25)]'
          : 'bg-white/5 border-white/10 hover:border-[#84cc16]/50'
      } rounded-none px-6 py-2.5 font-bold uppercase tracking-wider text-xs sm:text-sm z-20 ${className}`}
      style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
    >
      <span ref={fillRef} className="pointer-events-none" />
      <span
        className={`btn-label relative z-10 pointer-events-none transition-colors ${
          isActive ? 'text-[#84cc16]' : 'text-[#DFD9CE]'
        }`}
      >
        {children}
      </span>
    </button>
  );
}

function CadSecondaryActionButton({ isPcbView, onClick }) {
  const { buttonRef, fillRef } = useMouseOriginFill({
    fillColor: '#84cc16',
    enterDuration: 0.48,
    exitDuration: 0.4,
    ease: 'power3.out',
    onEnter: (btn) => {
      const text = btn.querySelector('.btn-label');
      if (text) {
        gsap.to(text, { color: '#000000', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      }
    },
    onExit: (btn) => {
      const text = btn.querySelector('.btn-label');
      if (text) {
        gsap.to(text, { color: '#000000', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      }
    },
  });

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="relative overflow-hidden px-6 py-3 bg-[#84cc16] text-black font-bold rounded-none shadow-[0_0_20px_rgba(132,204,22,0.4)] transition-all flex items-center gap-2 tracking-wide uppercase text-sm cursor-pointer border border-[#84cc16]"
      style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
    >
      <span ref={fillRef} className="pointer-events-none" />
      <span className="btn-label relative z-10 pointer-events-none flex items-center gap-2">
        {isPcbView ? (
          <>
            <span>&larr;</span> Back to CAD
          </>
        ) : (
          'View PCB'
        )}
      </span>
    </button>
  );
}

export default function SolutionSectionComponent() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const featureGridRef = useRef(null);

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'cad' | 'antenna' | null
  const [cadViewState, setCadViewState] = useState('cad'); // 'cad' | 'pcb'

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(imageRef.current, {
      y: 28,
      opacity: 0,
      scale: 1.05,
      duration: 1.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(featureGridRef.current.children, {
      y: 36,
      opacity: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: featureGridRef.current,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  const handleCloseModal = () => {
    setActiveModal(null);
    // Reset CAD view state after transition finishes to avoid sudden jump
    setTimeout(() => {
      setCadViewState('cad');
    }, 400);
  };

  // Determine props for CAD Modal based on view state
  const isPcbView = cadViewState === 'pcb';
  const cadModelPath = isPcbView ? '/assets/models/pcb.glb' : '/assets/models/cad-design.glb';
  const cadTitle = isPcbView ? 'PCB Layout' : 'CAD Design';

  return (
    <div className="bg-[#000000] text-white py-24 font-sans w-full relative overflow-hidden" ref={sectionRef}>
      {/* Typography matching Homepage Hero */}
      <div ref={headingRef} className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
        <h2
          className="text-[#E8E3D9] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] 2xl:text-[96px] 3xl:text-[116px] 4xl:text-[144px] 5xl:text-[164px] leading-[0.9] m-0 p-0 tracking-tight uppercase font-black text-left mb-6"
          style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 900 }}
        >
          Central Solution Core
        </h2>
        <p className="text-[#DFD9CE]/70 text-left max-w-2xl mb-16 sm:mb-20 font-sans text-sm sm:text-base leading-relaxed">
          Next-generation hardware control systems. Real-time data processing, telemetry, and power distribution managed through a unified neural architecture.
        </p>
      </div>

      {/* Showcase Stage */}
      <div ref={imageRef} className="relative w-full max-w-7xl px-6 lg:px-8 mx-auto mb-20">
        <img 
          className="w-full rounded-2xl shadow-[0_0_50px_rgba(132,204,22,0.12)] block border border-white/10" 
          src="/assets/images/farm-solution-diagram.png" 
          alt="Smart fence system" 
        />
        
        {/* Left Card */}
        <div className="absolute z-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl hidden md:block top-1/4 -left-6 lg:-left-10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan] animate-pulse"></div>
            <span 
              className="text-xs font-bold tracking-widest text-cyan-400 uppercase"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
            >
              DATA LINK ACTIVE
            </span>
          </div>
          <div className="flex flex-col">
            <span 
              className="text-[11px] text-[#DFD9CE]/60 uppercase tracking-wider"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
            >
              UPLINK SPEED
            </span>
            <span 
              className="text-2xl lg:text-3xl font-black text-[#E8E3D9] tracking-tight leading-tight" 
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              1.2 GB/S
            </span>
          </div>
        </div>
        
        {/* Right Card */}
        <div className="absolute z-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl hidden md:block bottom-1/4 -right-6 lg:-right-10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#84cc16] shadow-[0_0_10px_rgba(132,204,22,0.8)] animate-pulse"></div>
            <span 
              className="text-xs font-bold tracking-widest text-[#84cc16] uppercase"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
            >
              POWER MATRIX
            </span>
          </div>
          <div className="flex flex-col">
            <span 
              className="text-[11px] text-[#DFD9CE]/60 uppercase tracking-wider"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
            >
              GRID STABILITY
            </span>
            <span 
              className="text-2xl lg:text-3xl font-black text-[#E8E3D9] tracking-tight leading-tight" 
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              99.99%
            </span>
          </div>
        </div>
      </div>

      {/* View Toggle with Sharp Edges and Mouse-Origin Fill */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-20 px-4">
        <AnimatedSolutionButton
          isActive={activeModal === 'cad' && cadViewState === 'cad'}
          onClick={() => { setCadViewState('cad'); setActiveModal('cad'); }}
        >
          System Overview
        </AnimatedSolutionButton>
        <AnimatedSolutionButton
          isActive={activeModal === 'cad' && cadViewState === 'pcb'}
          onClick={() => { setCadViewState('pcb'); setActiveModal('cad'); }}
        >
          Internal PCB
        </AnimatedSolutionButton>
        <AnimatedSolutionButton
          isActive={activeModal === 'antenna'}
          onClick={() => setActiveModal('antenna')}
        >
          Antenna Module
        </AnimatedSolutionButton>
      </div>

      {/* Feature Grid */}
      <div ref={featureGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl px-6 lg:px-8 mx-auto">
        {/* Card 1 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-7 lg:p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6">
              <Cpu className="text-cyan-400 w-6 h-6" />
            </div>
            <h3 
              className="text-2xl sm:text-3xl font-black text-[#E8E3D9] tracking-tight mb-3" 
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Neural Core
            </h3>
            <p className="text-[#DFD9CE]/70 mb-6 text-sm leading-relaxed font-sans">
              Dedicated AI processing unit capable of executing 40 trillion operations per second for instant threat detection and anomaly isolation.
            </p>
          </div>
          <div 
            className="flex items-center text-[#DFD9CE] group-hover:text-cyan-400 text-xs font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-all duration-300 mt-auto"
            style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
          >
            VIEW SPECS <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-7 lg:p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#84cc16]/10 border border-[#84cc16]/30 flex items-center justify-center mb-6">
              <Zap className="text-[#84cc16] w-6 h-6" />
            </div>
            <h3 
              className="text-2xl sm:text-3xl font-black text-[#E8E3D9] tracking-tight mb-3" 
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Power Grid
            </h3>
            <p className="text-[#DFD9CE]/70 mb-6 text-sm leading-relaxed font-sans">
              High-efficiency distributed power routing with redundant failovers, ensuring 99.99% uptime even in extreme environmental conditions.
            </p>
          </div>
          <div 
            className="flex items-center text-[#DFD9CE] group-hover:text-[#84cc16] text-xs font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-all duration-300 mt-auto"
            style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
          >
            VIEW SPECS <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-7 lg:p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-6">
              <Satellite className="text-white w-6 h-6" />
            </div>
            <h3 
              className="text-2xl sm:text-3xl font-black text-[#E8E3D9] tracking-tight mb-3" 
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Remote Comms
            </h3>
            <p className="text-[#DFD9CE]/70 mb-6 text-sm leading-relaxed font-sans">
              Encrypted long-range telemetry link maintaining constant contact with orbital relays and centralized dashboard nodes.
            </p>
          </div>
          <div 
            className="flex items-center text-[#DFD9CE] group-hover:text-white text-xs font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-all duration-300 mt-auto"
            style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
          >
            VIEW SPECS <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <ModelViewerModal
        isOpen={activeModal === 'cad'}
        onClose={handleCloseModal}
        modelPath={cadModelPath}
        title={cadTitle}
        secondaryAction={<CadSecondaryActionButton isPcbView={isPcbView} onClick={() => setCadViewState(isPcbView ? 'cad' : 'pcb')} />}
      />

      <ModelViewerModal
        isOpen={activeModal === 'antenna'}
        onClose={handleCloseModal}
        modelPath="/assets/models/antenna.glb"
        title="Antenna Module"
      />
    </div>
  );
}
