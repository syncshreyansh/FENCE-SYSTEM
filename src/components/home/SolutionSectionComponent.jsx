import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ModelViewerModal from '../common/ModelViewerModal';
import { Cpu, Zap, Satellite, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

  const CadSecondaryAction = () => (
    <button
      onClick={() => setCadViewState(isPcbView ? 'cad' : 'pcb')}
      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center gap-2 tracking-wide uppercase text-sm cursor-pointer"
    >
      {isPcbView ? (
        <>
          <span>&larr;</span> Back to CAD
        </>
      ) : (
        'View PCB'
      )}
    </button>
  );

  return (
    <div className="bg-[#0a0a0b] text-white py-24 font-sans w-full relative overflow-hidden" ref={sectionRef}>
      {/* Typography */}
      <div ref={headingRef} className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-widest text-left mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
          Central Solution Core
        </h2>
        <p className="text-gray-400 text-left max-w-2xl mb-20 font-sans">
          Next-generation hardware control systems. Real-time data processing, telemetry, and power distribution managed through a unified neural architecture.
        </p>
      </div>

      {/* Showcase Stage */}
      <div ref={imageRef} className="relative w-full max-w-7xl px-6 lg:px-8 mx-auto mb-24">
        <img 
          className="w-full rounded-3xl shadow-[0_0_50px_rgba(182,226,50,0.1)] block" 
          src="/assets/images/farm-solution-diagram.png" 
          alt="Smart fence system" 
        />
        
        {/* Left Card */}
        <div className="absolute z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hidden md:block top-1/4 -left-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan] animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest text-cyan-400">DATA LINK ACTIVE</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">UPLINK SPEED</span>
            <span className="text-3xl tracking-wider" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>1.2 GB/S</span>
          </div>
        </div>
        
        {/* Right Card */}
        <div className="absolute z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hidden md:block bottom-1/4 -right-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-lime-400 shadow-[0_0_10px_lime] animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest text-[#B6E232]">POWER MATRIX</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">GRID STABILITY</span>
            <span className="text-3xl tracking-wider" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>99.99%</span>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center gap-4 mb-24">
        <button 
          onClick={() => { setCadViewState('cad'); setActiveModal('cad'); }}
          className="bg-[#B6E232]/20 border border-[#B6E232] text-[#B6E232] px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(182,226,50,0.3)] hover:bg-[#B6E232]/30 transition-all uppercase tracking-wider text-sm cursor-pointer z-20"
        >
          System Overview
        </button>
        <button 
          onClick={() => { setCadViewState('pcb'); setActiveModal('cad'); }}
          className="bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 px-6 py-2 rounded-full font-bold transition-all uppercase tracking-wider text-sm cursor-pointer z-20"
        >
          Internal PCB
        </button>
        <button 
          onClick={() => setActiveModal('antenna')}
          className="bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 px-6 py-2 rounded-full font-bold transition-all uppercase tracking-wider text-sm cursor-pointer z-20"
        >
          Antenna Module
        </button>
      </div>

      {/* Feature Grid */}
      <div ref={featureGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-6 lg:px-8 mx-auto">
        {/* Card 1 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6">
            <Cpu className="text-cyan-400 w-6 h-6" />
          </div>
          <h3 className="text-3xl tracking-wider mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Neural Core</h3>
          <p className="text-gray-400 mb-6 flex-grow text-sm">
            Dedicated AI processing unit capable of executing 40 trillion operations per second for instant threat detection and anomaly isolation.
          </p>
          <div className="flex items-center text-cyan-400 text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300 mt-auto">
            VIEW SPECS <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#B6E232]/10 border border-[#B6E232]/30 flex items-center justify-center mb-6">
            <Zap className="text-[#B6E232] w-6 h-6" />
          </div>
          <h3 className="text-3xl tracking-wider mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Power Grid</h3>
          <p className="text-gray-400 mb-6 flex-grow text-sm">
            High-efficiency distributed power routing with redundant failovers, ensuring 99.99% uptime even in extreme environmental conditions.
          </p>
          <div className="flex items-center text-[#B6E232] text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300 mt-auto">
            VIEW SPECS <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-6">
            <Satellite className="text-white w-6 h-6" />
          </div>
          <h3 className="text-3xl tracking-wider mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Remote Comms</h3>
          <p className="text-gray-400 mb-6 flex-grow text-sm">
            Encrypted long-range telemetry link maintaining constant contact with orbital relays and centralized dashboard nodes.
          </p>
          <div className="flex items-center text-white text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300 mt-auto">
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
        secondaryAction={<CadSecondaryAction />}
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
