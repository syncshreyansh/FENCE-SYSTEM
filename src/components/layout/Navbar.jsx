import { useState, useEffect } from 'react';
import SpecularButton from '../common/SpecularButton';

const NAV_ITEMS = [
  { label: 'Home', sectionId: 'home' },
  { label: 'Problem', sectionId: 'problem' },
  { label: 'Solution', sectionId: 'solution' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for backdrop-blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (item) => {
    setActiveTab(item.label);
    const section = document.getElementById(item.sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-8 py-4
        transition-all duration-300
        ${scrolled
          ? 'bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-[#0a0a0b] border-b border-transparent'
        }
      `}
    >
      {/* Left — Segmented tab group */}
      <div className="flex items-center bg-white/[0.06] rounded-full p-1 gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`
                relative px-5 py-2 rounded-full text-sm font-medium
                transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'bg-white text-[#0a0a0b] shadow-sm'
                  : 'bg-transparent text-neutral-400 hover:text-neutral-200'
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right — Dashboard CTA */}
      <SpecularButton
        size="sm"
        radius={999}
        baseColor="#525252"
        lineColor="#ffffff"
      >
        Go to Dashboard &nbsp;→
      </SpecularButton>
    </nav>
  );
}
