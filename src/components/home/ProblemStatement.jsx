import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemStatement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Left column: stagger eyebrow → headline → paragraph ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from('.problem-eyebrow', {
        xPercent: -150,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
        .from(
          '.problem-headline',
          {
            xPercent: -150,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
          },
          '-=1.08' // 0.12s stagger
        )
        .from(
          '.problem-body',
          {
            xPercent: -150,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
          },
          '-=1.08' // 0.12s stagger
        )
        .from(
          '.problem-accent',
          {
            scaleY: 0,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            transformOrigin: 'top',
          },
          0 // starts at timeline beginning
        );

      // ── Right column: video slides in with slight delay ──
      tl.from(
        '.problem-video',
        {
          xPercent: 150,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'power4.out',
        },
        0.15 // 0.15s after timeline start
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="min-h-screen bg-[#0a0a0b] py-24 flex items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* ── Left: text column ── */}
        <div className="relative">
          {/* Accent bar */}
          <span className="problem-accent absolute -left-4 top-0 h-full w-[2px] bg-gradient-to-b from-white/80 via-white/30 to-transparent" />

          {/* Eyebrow */}
          <p className="problem-eyebrow text-sm tracking-[0.2em] uppercase text-gray-400 font-medium mb-4">
            SIH-20577
          </p>

          {/* Headline */}
          <h2 className="problem-headline font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '2px' }}>
            The Problem
          </h2>

          {/* Body */}
          <p className="problem-body font-sans text-gray-300 leading-relaxed max-w-md text-base sm:text-lg">
            People in forest-boundary villages illegally connect farm fences
            directly to grid electricity instead of using a proper low-voltage
            energizer. Unlike a legal energizer's brief harmless pulse, a direct
            grid connection stays continuously live and lethal — killing
            elephants, cattle, and sometimes people every year in states like
            Kerala and Assam. There is currently no way to detect an illegal
            fence until after it has already killed something.
          </p>
        </div>

        {/* ── Right: video column ── */}
        <div className="problem-video flex justify-center lg:justify-end">
          <div className="relative aspect-video w-full max-w-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video
              className="w-full h-full object-cover"
              src="/assets/videos/problem-demo.mp4"
              poster="/assets/videos/problem-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
