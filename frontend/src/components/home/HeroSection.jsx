import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHeroSections = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/hero-sections');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHeroSections(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch hero sections:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroSections();
  }, [fetchHeroSections]);

  useEffect(() => {
    if (heroSections.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % heroSections.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [heroSections]);

  if (isLoading) {
    return (
      <div className="h-96 bg-blue-700 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading hero content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 bg-blue-700 flex items-center justify-center">
        <div className="text-white">Error loading hero section: {error}</div>
      </div>
    );
  }

  if (heroSections.length === 0) {
    return (
      <div className="h-96 bg-blue-700 flex items-center justify-center">
        <div className="text-white">No hero content available</div>
      </div>
    );
  }

  const current = heroSections[currentIndex];

  return (
    <section 
      key={currentIndex} // Force re-render for better animation
      className={`relative bg-gradient-to-r ${current.background.colorFrom} ${current.background.colorTo} 
      text-white py-24 md:py-32 overflow-hidden`}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-blue-400 rounded-full mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 animate-fadeIn">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-tight">
          <span className={current.background.accentColor}>NoPoverty</span> Platform
        </h1>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
          {current.subtitle}
        </h2>
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
          {current.description}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={current.primaryButton.link}
            className="inline-flex items-center justify-center bg-yellow-400 text-blue-800 
            font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 
            shadow-lg hover:shadow-xl"
          >
            {current.primaryButton.text}
            <FiArrowRight className="ml-2" />
          </Link>
          <Link
            to={current.secondaryButton.link}
            className="inline-flex items-center justify-center bg-yellow-400 text-blue-800 
            font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 
            shadow-lg hover:shadow-xl"
          >
            {current.secondaryButton.text}
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
          {current.stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
              <span className="text-sm md:text-base">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;