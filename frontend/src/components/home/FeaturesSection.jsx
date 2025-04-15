import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getFeatureSections } from '../../services/featuresService';

const FeaturesSection = () => {
  const [featureSections, setFeatureSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeatureSections = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getFeatureSections();
      setFeatureSections(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch feature sections:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatureSections();
  }, [fetchFeatureSections]);

  useEffect(() => {
    if (featureSections.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % featureSections.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [featureSections]);

  if (isLoading) {
    return (
      <div className="py-20 bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading features...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Error loading features: {error}</div>
      </div>
    );
  }

  if (featureSections.length === 0) {
    return (
      <div className="py-20 bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">No features available</div>
      </div>
    );
  }

  const current = featureSections[currentIndex];

  return (
    <section 
      key={currentIndex}
      className={`py-20 bg-gradient-to-b ${current.background.colorFrom} ${current.background.colorTo}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center animate-fadeIn">
          <h2 className="text-3xl font-extrabold text-blue-800 sm:text-4xl">
            {current.title}
          </h2>
          <p className="mt-4 text-lg text-blue-600 max-w-3xl mx-auto">
            {current.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {current.features.map((feature) => (
            <Link 
              key={feature._id} 
              to={feature.path}
              className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className={`mx-auto flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full ${feature.color} mb-4 sm:mb-6`}>
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300 flex items-center justify-center sm:justify-start">
                    Learn more
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to={current.ctaButton.link}
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-sm sm:text-base 
            font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 
            transition-colors duration-300"
          >
            {current.ctaButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;