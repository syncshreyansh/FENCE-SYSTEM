import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import SpecularButton from '../common/SpecularButton';

const NAV_ITEMS = [
  { label: 'Home', sectionId: 'home' },
  { label: 'Problem', sectionId: 'problem' },
  { label: 'Solution', sectionId: 'solution' },
];

export default function Navbar() {
  const navigate = useNavigate();
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
          : 'bg-transparent border-b border-transparent'
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
                transition-colors duration-200 cursor-pointer
                ${isActive
                  ? 'text-[#0a0a0b]'
                  : 'text-neutral-400 hover:text-neutral-200'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
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
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard &nbsp;→
      </SpecularButton>
    </nav>
  );
}
