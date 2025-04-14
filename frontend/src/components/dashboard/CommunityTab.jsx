import React, { useState } from 'react';
import { FiMessageSquare, FiCalendar, FiMapPin, FiUsers, FiArrowRight, FiPlus } from 'react-icons/fi';

const CommunityTab = () => {
  const [activeTab, setActiveTab] = useState('initiatives');
  
  const initiatives = [
    {
      id: 1,
      title: "Global Poverty Hackathon",
      description: "Join innovators worldwide developing solutions for poverty alleviation through technology and collaboration",
      date: "Nov 15-17, 2023",
      location: "Virtual (Global Participation)",
      participants: "1,200+ registered",
      category: "event",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 2,
      title: "African Women Entrepreneurs Forum",
      description: "Empowering female business owners across Sub-Saharan Africa through mentorship and funding opportunities",
      date: "Dec 5-7, 2023",
      location: "Nairobi, Kenya",
      participants: "300 expected",
      category: "forum",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 3,
      title: "Microfinance Impact Study Group",
      description: "Monthly meetup to analyze and discuss the latest research on microfinance effectiveness",
      date: "Every 2nd Tuesday",
      location: "Online",
      participants: "85 members",
      category: "study",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 4,
      title: "Sustainable Agriculture Network",
      description: "Connecting smallholder farmers with experts and resources to improve yields sustainably",
      date: "Ongoing",
      location: "Global",
      participants: "450+ members",
      category: "network",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    }
  ];

  const forums = [
    {
      id: 1,
      title: "Global Poverty Reduction Strategies",
      description: "Discuss systemic approaches to poverty alleviation",
      threads: 245,
      members: 1200,
      category: "policy"
    },
    {
      id: 2,
      title: "Microfinance Best Practices",
      description: "Share experiences and lessons from the field",
      threads: 187,
      members: 850,
      category: "finance"
    },
    {
      id: 3,
      title: "Education Access Initiatives",
      description: "Collaborate on educational solutions for underserved communities",
      threads: 132,
      members: 650,
      category: "education"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header with Tabs */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Global Poverty Alleviation Community</h2>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('initiatives')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'initiatives' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Initiatives & Events
            </button>
            <button
              onClick={() => setActiveTab('forums')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'forums' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Discussion Forums
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'members' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Community Members
            </button>
          </nav>
        </div>
      </div>

      {/* Initiatives Tab */}
      {activeTab === 'initiatives' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Upcoming Community Initiatives</h3>
            <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <FiPlus className="mr-1" /> Create Initiative
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {initiatives.map(initiative => (
              <div key={initiative.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="h-40 bg-gray-100 overflow-hidden">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {initiative.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {initiative.category === 'event' ? 'Event' : 
                       initiative.category === 'forum' ? 'Forum' :
                       initiative.category === 'study' ? 'Study Group' : 'Network'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{initiative.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="mr-2" size={14} />
                      <span>{initiative.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="mr-2" size={14} />
                      <span>{initiative.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiUsers className="mr-2" size={14} />
                      <span>{initiative.participants}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:shadow-md transition-all">
                    Join Initiative
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forums Tab */}
      {activeTab === 'forums' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Community Discussion Forums</h3>
            <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <FiPlus className="mr-1" /> New Forum
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {forums.map(forum => (
              <div key={forum.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
                    <FiMessageSquare size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{forum.title}</h3>
                    <p className="text-gray-600 mb-3">{forum.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <span className="text-sm text-gray-600">{forum.threads} active discussions</span>
                      <span className="text-sm text-gray-600">{forum.members} members</span>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    View <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Community Members</h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search members..."
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium text-gray-600 mb-2">Community Network Coming Soon</h3>
            <p className="text-gray-500 mb-4">We're building a powerful member directory to connect you with other change-makers</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Notify Me When Ready
            </button>
          </div>
        </div>
      )}

      {/* Community Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4,500+</div>
            <p className="text-blue-100">Community Members</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">120+</div>
            <p className="text-blue-100">Countries Represented</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">560+</div>
            <p className="text-blue-100">Initiatives Launched</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;