import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ModelViewerModal from '../common/ModelViewerModal';
import PcbImageViewerModal from '../common/PcbImageViewerModal';
import { useMouseOriginFill } from '../../hooks/useMouseOriginFill';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedSolutionButton({ onClick, isActive, children, className = '' }) {
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

function CadSecondaryActionButton({ onClick, label }) {
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
        {label || 'View PCB'}
      </span>
    </button>
  );
}

export default function SolutionSectionComponent() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'cad' | 'antenna' | 'pcb-image' | null
  const [pcbInitialView, setPcbInitialView] = useState('antenna'); // 'antenna' | 'meter' | 'data'

  useGSAP(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          y: 28,
          opacity: 0,
          scale: 1.05,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: sectionRef });

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="bg-[#000000] text-white pt-16 sm:pt-20 pb-6 sm:pb-8 font-sans w-full relative overflow-hidden" ref={sectionRef}>
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
          loading="lazy"
          decoding="async"
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
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4 mb-4">
        <AnimatedSolutionButton
          isActive={activeModal === 'cad'}
          onClick={() => setActiveModal('cad')}
        >
          System Overview
        </AnimatedSolutionButton>
        <AnimatedSolutionButton
          isActive={activeModal === 'pcb-image'}
          onClick={() => { setActiveModal('pcb-image'); setPcbInitialView('antenna'); }}
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
      
      {/* Modals */}
      <ModelViewerModal
        isOpen={activeModal === 'cad'}
        onClose={handleCloseModal}
        modelPath="/assets/models/cad-design.glb"
        title="CAD Design"
      />

      <ModelViewerModal
        isOpen={activeModal === 'antenna'}
        onClose={handleCloseModal}
        modelPath="/assets/models/antenna.glb"
        title="Antenna Module"
        secondaryAction={
          <CadSecondaryActionButton 
            onClick={() => {
              setPcbInitialView('antenna');
              setActiveModal('pcb-image');
            }} 
            label="View Antenna PCB"
          />
        }
      />

      <PcbImageViewerModal
        isOpen={activeModal === 'pcb-image'}
        onClose={handleCloseModal}
        initialPcb={pcbInitialView}
      />
    </div>
  );
}
