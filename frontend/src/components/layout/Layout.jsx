import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState({
    name: 'default',
    bgColor: '#ffffff',
    textColor: '#1a202c',
    className: 'bg-white text-gray-900'
  });

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      let newTheme;

      if (hour >= 5 && hour < 9) {
        // Dawn
        newTheme = {
          name: 'dawn',
          bgColor: '#fff5e6',
          textColor: '#2d3748',
          className: 'bg-orange-50 text-gray-800',
          navStyle: 'bg-gradient-to-r from-blue-700 to-blue-800'
        };
      } else if (hour >= 9 && hour < 12) {
        // Morning
        newTheme = {
          name: 'morning',
          bgColor: '#fdf6e3',
          textColor: '#2d3748',
          className: 'bg-amber-50 text-gray-800',
          navStyle: 'bg-gradient-to-r from-blue-600 to-blue-700'
        };
      } else if (hour >= 12 && hour < 15) {
        // Midday
        newTheme = {
          name: 'midday',
          bgColor: '#f0f9ff',
          textColor: '#1a202c',
          className: 'bg-blue-50 text-gray-900',
          navStyle: 'bg-gradient-to-r from-blue-600 to-blue-700'
        };
      } else if (hour >= 15 && hour < 18) {
        // Afternoon
        newTheme = {
          name: 'afternoon',
          bgColor: '#fffaf0',
          textColor: '#2d3748',
          className: 'bg-orange-50 text-gray-800',
          navStyle: 'bg-gradient-to-r from-blue-700 to-blue-800'
        };
      } else if (hour >= 18 && hour < 21) {
        // Evening
        newTheme = {
          name: 'evening',
          bgColor: '#ffe4b5',
          textColor: '#2d3748',
          className: 'bg-orange-100 text-gray-800',
          navStyle: 'bg-gradient-to-r from-blue-800 to-blue-900'
        };
      } else {
        // Night
        newTheme = {
          name: 'night',
          bgColor: '#1a202c',
          textColor: '#e2e8f0',
          className: 'bg-gray-900 text-gray-100',
          navStyle: 'bg-gradient-to-r from-blue-900 to-indigo-900'
        };
      }

      setTheme(newTheme);
      document.body.style.backgroundColor = newTheme.bgColor;
      document.body.style.color = newTheme.textColor;
    };

    updateTheme();
    
    // Update every hour
    const interval = setInterval(updateTheme, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ${theme.className}`}>
      {/* Navbar with theme-based styling */}
      <div className={theme.navStyle || 'bg-gradient-to-r from-blue-600 to-blue-800'}>
        <Navbar />
      </div>

      {/* Main content area */}
      <main className={`flex-grow transition-colors duration-1000 ${theme.className}`}>
        {children}
      </main>

      {/* Footer with theme-based styling */}
      <div className={theme.navStyle || 'bg-gradient-to-r from-blue-700 to-blue-900'}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;