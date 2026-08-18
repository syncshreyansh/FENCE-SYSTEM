import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

const LG_MQ = '(min-width: 1024px)';
const COLLAPSED_KEY = 'dfence-sidebar-collapsed';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(LG_MQ).matches : true
  );

  useEffect(() => {
    const mql = window.matchMedia(LG_MQ);
    const onChange = (event) => setIsDesktop(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

function DashboardShellContent() {
  const { theme } = useTheme();
  const location = useLocation();
  const mainRef = useRef(null);
  const pageContainerRef = useRef(null);
  const isDesktop = useIsDesktop();

  const [desktopCollapsed, setDesktopCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const collapsed = isDesktop && desktopCollapsed;

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, String(desktopCollapsed));
    } catch {
      /* ignore quota / private mode */
    }
  }, [desktopCollapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop || !mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen, isDesktop]);

  useEffect(() => {
    if (!mobileOpen || isDesktop) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, isDesktop]);

  const toggleSidebar = useCallback(() => {
    if (isDesktop) {
      setDesktopCollapsed((value) => !value);
    } else {
      setMobileOpen((value) => !value);
    }
  }, [isDesktop]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);

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
      {mobileOpen && !isDesktop && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={closeMobile}
        />
      )}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        isDesktop={isDesktop}
        onToggle={toggleSidebar}
        onNavigate={closeMobile}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0 bg-background">
        <TopAppBar
          onMenuClick={openMobile}
          menuOpen={mobileOpen}
        />
        <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative min-w-0 scroll-smooth">
          <div ref={pageContainerRef} className="max-w-[1400px] w-full mx-auto flex flex-col gap-6 will-change-transform min-w-0">
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
