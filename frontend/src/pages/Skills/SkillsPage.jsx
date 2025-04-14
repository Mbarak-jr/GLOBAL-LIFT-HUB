import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { getSkills, getCourses } from '../../services/skillsService';
import SkillCard from '../../components/skills/cards/SkillCard';
import CourseCard from '../../components/skills/cards/CourseCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SkillsHeader from '../../components/skills/layout/SkillsHeader';
import SkillsFooter from '../../components/skills/layout/SkillsFooter';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [activeTab, setActiveTab] = useState('skills');

  const fetchSkillsAndCourses = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const [skillsData, coursesData] = await Promise.all([
        getSkills(filters, token, signal),
        getCourses(filters, token, signal)
      ]);

      setSkills(skillsData);
      setCourses(coursesData);
      setFilteredSkills(skillsData);
    } catch (err) {
      if (!signal?.aborted) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch data');
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [filters]);

  useEffect(() => {
    const abortController = new AbortController();
    const debounceTimer = setTimeout(() => {
      fetchSkillsAndCourses(abortController.signal);
    }, 300);

    return () => {
      abortController.abort();
      clearTimeout(debounceTimer);
    };
  }, [fetchSkillsAndCourses]);

  // Filter skills based on search query
  useEffect(() => {
    if (filters.search) {
      const results = skills.filter(skill =>
        skill.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        skill.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
      setFilteredSkills(results);
    } else {
      setFilteredSkills(skills);
    }
  }, [filters.search, skills]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading && (!skills.length && !courses.length)) {
    return (
      <div className="min-h-screen flex flex-col">
        <SkillsHeader />
        <main className="flex-grow pt-24">
          <LoadingSpinner fullPage />
        </main>
        <SkillsFooter />
      </div>
    );
  }

  if (error && (!skills.length && !courses.length)) {
    return (
      <div className="min-h-screen flex flex-col">
        <SkillsHeader />
        <main className="flex-grow pt-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Content</h2>
              <p className="text-gray-700 mb-6">{error}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => fetchSkillsAndCourses()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
                >
                  <FiRefreshCw className="mr-2" />
                  Try Again
                </button>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </main>
        <SkillsFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SkillsHeader />
      
      <main className="flex-grow pt-24 bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
                <span className="block">Empower Your Future</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Learn Essential Skills
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                Free courses and training to help you gain the skills needed to break the cycle of poverty.
              </p>
            </div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-4 font-medium text-lg border-b-2 transition-all ${activeTab === 'skills' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange('skills')}
            >
              Skills
            </button>
            <button
              className={`px-6 py-4 font-medium text-lg border-b-2 transition-all ${activeTab === 'courses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange('courses')}
            >
              Courses
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400 text-lg" />
                </div>
                <select
                  name="category"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none text-gray-800"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="" className="text-gray-600">All Categories</option>
                  <option value="financial" className="text-gray-800">Financial Literacy</option>
                  <option value="career" className="text-gray-800">Career Development</option>
                  <option value="education" className="text-gray-800">Education</option>
                  <option value="technology" className="text-gray-800">Technology</option>
                  <option value="health" className="text-gray-800">Health & Wellness</option>
                  <option value="entrepreneurship" className="text-gray-800">Entrepreneurship</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {activeTab === 'skills' ? (
            filteredSkills.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredSkills.map(skill => (
                  <SkillCard key={skill._id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow-md text-center">
                <div className="mx-auto max-w-md">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-xl font-medium text-gray-900">No skills found</h3>
                  <p className="mt-1 text-gray-500">
                    {filters.category || filters.search 
                      ? "Try adjusting your search or filters" 
                      : "We're currently adding more skills. Check back soon!"}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            courses.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow-md text-center">
                <div className="mx-auto max-w-md">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-xl font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-gray-500">
                    {filters.category || filters.search 
                      ? "Try adjusting your search or filters" 
                      : "We're currently adding more courses. Check back soon!"}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </main>

      <SkillsFooter />
    </div>
  );
};

export default SkillsPage;