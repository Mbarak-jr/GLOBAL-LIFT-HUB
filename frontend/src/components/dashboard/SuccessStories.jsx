import React from 'react';
import { FiAward, FiUser, FiDollarSign, FiGlobe } from 'react-icons/fi';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria's Textile Cooperative",
      location: "Guatemala",
      impact: "Lifted 15 families out of poverty",
      investment: "$5,000 loan",
      result: "300% revenue growth",
      image: "textile-coop.jpg"
    },
    {
      id: 2,
      name: "Kwame's Solar Initiative",
      location: "Ghana",
      impact: "Brought electricity to 3 villages",
      investment: "$8,000 funding",
      result: "45 new jobs created",
      image: "solar-project.jpg"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <FiAward className="text-yellow-500 text-3xl mr-3" />
        <h2 className="text-2xl font-bold text-blue-800">Global Impact Stories</h2>
      </div>
      
      <p className="mb-8 text-gray-700 max-w-3xl">
        Discover how strategic investments are transforming communities worldwide. 
        These success stories demonstrate the tangible impact of our collective efforts 
        to eradicate poverty.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map(story => (
          <div key={story.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 relative">
              {/* Image placeholder - would be replaced with actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Project Photo]
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{story.name}</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {story.location}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <FiUser className="text-green-500 mr-2" />
                  <span>{story.impact}</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="text-blue-500 mr-2" />
                  <span>{story.investment}</span>
                </div>
                <div className="flex items-center">
                  <FiGlobe className="text-purple-500 mr-2" />
                  <span className="font-medium">{story.result}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                Read Full Case Study
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Become Part of Our Next Success Story</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="mb-4 text-gray-700">
              Our platform connects impact investors with high-potential poverty 
              alleviation projects in emerging markets. With transparency and 
              measurable outcomes at our core, we ensure your investment creates 
              real change.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Invest in Change
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h4 className="font-bold mb-2 text-blue-800">Why Invest With Us?</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Vetted projects with proven track records</li>
              <li>Average 8-12% financial return + social impact</li>
              <li>Transparent impact reporting</li>
              <li>Diversified across sectors and regions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;