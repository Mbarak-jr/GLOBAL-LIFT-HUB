import React from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiDollarSign, FiShoppingCart, FiBook } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: 'Opportunities',
    description: 'Access job listings, training programs, and community initiatives to improve your livelihood.',
    icon: <FiBriefcase className="w-8 h-8" />,
    path: '/opportunities',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 2,
    title: 'Micro-Loans',
    description: 'Get affordable loans with flexible terms to invest in your business or education.',
    icon: <FiDollarSign className="w-8 h-8" />,
    path: '/loans/apply',
    color: 'text-green-600 bg-green-100'
  },
  {
    id: 3,
    title: 'Marketplace',
    description: 'Buy and sell goods within your community to foster local economic growth.',
    icon: <FiShoppingCart className="w-8 h-8" />,
    path: '/marketplace',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    id: 4,
    title: 'Skills Development',
    description: 'Upskill with free courses and certifications to boost your career prospects.',
    icon: <FiBook className="w-8 h-8" />,
    path: '/skills',
    color: 'text-yellow-600 bg-yellow-100'
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-800 sm:text-4xl">
            Our Comprehensive Solutions
          </h2>
          <p className="mt-4 text-lg text-blue-600 max-w-3xl mx-auto">
            Empowering communities through innovative tools and resources to break the cycle of poverty
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link 
              key={feature.id} 
              to={feature.path}
              className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${feature.color} mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300 flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            to="/auth/register"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Join Our Community Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;