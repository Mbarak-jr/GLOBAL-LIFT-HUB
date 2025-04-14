import React, { useState } from 'react';
import { FiBook, FiMap, FiDatabase, FiVideo, FiExternalLink, FiSearch, FiUpload, FiFilter, FiX } from 'react-icons/fi';

const ResourcesTab = ({ resources, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const filteredResources = resources.filter(res => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (type) => {
    const icons = {
      guide: <FiBook className="text-blue-500" size={20} />,
      map: <FiMap className="text-green-500" size={20} />,
      data: <FiDatabase className="text-purple-500" size={20} />,
      video: <FiVideo className="text-red-500" size={20} />
    };
    return icons[type] || <FiBook className="text-gray-500" size={20} />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Government: 'bg-blue-100 text-blue-800 border-blue-200',
      NGO: 'bg-green-100 text-green-800 border-green-200',
      Community: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Research: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Global Poverty Alleviation Resources</h2>
        <p className="text-gray-600 max-w-3xl">
          Discover tools, research, and guides to support poverty reduction efforts worldwide. 
          Curated by experts and community members.
        </p>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
        >
          <FiFilter /> Filters
        </button>
      </div>

      {/* Filters and Search - Desktop */}
      <div className="hidden md:block mb-8 bg-gray-50 p-4 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="relative">
              <select 
                className="appearance-none w-full border border-gray-300 rounded-lg pl-3 pr-8 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center transition-colors border ${selectedCategory === category ? 'bg-blue-600 text-white border-blue-600' : getCategoryColor(category)}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setMobileFiltersOpen(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors border ${selectedCategory === category ? 'bg-blue-600 text-white border-blue-600' : getCategoryColor(category)}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setMobileFiltersOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resource Cards */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredResources.map(resource => (
            <div 
              key={resource.id} 
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`h-2 ${getCategoryColor(resource.category).replace('bg-', 'bg-gradient-to-r from-').replace('text-', 'to-')}`}></div>
              
              <div className="p-5">
                <div className="flex items-start mb-4">
                  <div className={`p-2 rounded-lg mr-3 ${getCategoryColor(resource.category)}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {resource.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-5">{resource.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">By {resource.organization}</p>
                    {resource.location && (
                      <p className="text-xs text-gray-500 flex items-center">
                        <FiMap className="mr-1" size={12} /> {resource.location}
                      </p>
                    )}
                  </div>
                  <a 
                    href={resource.link} 
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View <FiExternalLink className="ml-1" size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center mb-8">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Share Your Knowledge</h3>
          <p className="text-blue-100 mb-6">
            Contribute research, tools, or case studies to help combat global poverty. 
            All submissions are reviewed by our expert panel to ensure quality.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md inline-flex items-center">
            <FiUpload className="mr-2" /> Submit Resource
          </button>
        </div>
      </div>
    </div>
  );
};

// Default props for demonstration
ResourcesTab.defaultProps = {
  resources: [
    { 
      id: 1, 
      name: 'Food Security Handbook', 
      type: 'guide',
      category: 'Government',
      organization: 'UN World Food Programme',
      description: 'Comprehensive guide to implementing food security programs in developing regions',
      location: 'Global',
      link: '#'
    },
    { 
      id: 2, 
      name: 'Poverty Mapping Tool', 
      type: 'map',
      category: 'Research',
      organization: 'World Bank',
      description: 'Interactive maps showing poverty distribution and trends worldwide',
      location: 'Global',
      link: '#'
    },
    { 
      id: 3, 
      name: 'Microfinance Impact Data', 
      type: 'data',
      category: 'NGO',
      organization: 'Microfinance Network',
      description: 'Dataset showing the impact of microloans on poverty reduction',
      location: 'Asia, Africa',
      link: '#'
    },
    { 
      id: 4, 
      name: 'Community Development Toolkit', 
      type: 'guide',
      category: 'Community',
      organization: 'Grassroots Collective',
      description: 'Practical tools for community-led poverty alleviation initiatives',
      location: 'Local communities',
      link: '#'
    },
    { 
      id: 5, 
      name: 'Education for All', 
      type: 'video',
      category: 'NGO',
      organization: 'Education First',
      description: 'Documentary on innovative education programs breaking poverty cycles',
      location: 'Sub-Saharan Africa',
      link: '#'
    },
    { 
      id: 6, 
      name: 'Policy Framework', 
      type: 'guide',
      category: 'Government',
      organization: 'OECD',
      description: 'Policy recommendations for sustainable poverty reduction',
      location: 'OECD Countries',
      link: '#'
    }
  ],
  categories: ['All', 'Government', 'NGO', 'Community', 'Research']
};


export default ResourcesTab;