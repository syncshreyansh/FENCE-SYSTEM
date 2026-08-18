import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

function DashboardShellContent() {
  const { theme } = useTheme();
  const location = useLocation();
  const mainRef = useRef(null);
  const pageContainerRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }

    if (pageContainerRef.current) {
      gsap.killTweensOf(pageContainerRef.current);
      gsap.fromTo(
        pageContainerRef.current,
        { opacity: 0, y: 16 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.35, 
          ease: 'power2.out',
          clearProps: 'transform'
        }
      );
    }
  }, [location.pathname]);

  return (
    <div 
      className={`flex h-screen overflow-hidden bg-background text-on-surface transition-colors duration-200 ${
        theme === 'light' ? 'theme-light' : 'theme-dark'
      }`}
      data-theme={theme}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0 bg-background">
        <TopAppBar />
        <main ref={mainRef} className="flex-1 overflow-y-auto p-4 md:p-6 relative min-w-0 scroll-smooth">
          <div ref={pageContainerRef} className="max-w-[1400px] w-full mx-auto flex flex-col gap-6 will-change-transform">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardShell() {
  return (
    <ThemeProvider>
      <DashboardShellContent />
    </ThemeProvider>
  );
}
