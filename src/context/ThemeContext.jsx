import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dfence-dashboard-theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('dfence-dashboard-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    } else {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
