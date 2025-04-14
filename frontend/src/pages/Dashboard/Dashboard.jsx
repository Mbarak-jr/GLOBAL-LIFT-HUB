import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardFooter from '../../components/dashboard/DashboardFooter';
import StatsCards from '../../components/dashboard/StatsCards';
import MicrofinanceTab from '../../components/dashboard/MicrofinanceTab';
import ResourcesTab from '../../components/dashboard/ResourcesTab';
import CommunityTab from '../../components/dashboard/CommunityTab';
import MarketplaceTab from '../../components/dashboard/MarketplaceTab';
import { FiDollarSign, FiMapPin, FiUsers, FiShoppingBag, FiPlus, FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('microfinance');
  const navigate = useNavigate();

  const [stats] = useState({
    opportunities: 24,
    loansApproved: 15,
    resourcesAvailable: 42,
    communityMembers: 136,
    marketplaceItems: 28
  });

  const mockLoans = [
    { id: 1, title: 'Small Business Starter Loan', description: 'Interest-free loan for new entrepreneurs', amount: 500, interestRate: '0%', term: '6 months' },
    { id: 2, title: 'Agricultural Equipment Financing', description: 'Low-interest loans for farming tools', amount: 1200, interestRate: '3.5%', term: '12 months' }
  ];

  const mockResources = [
    { id: 1, name: 'Food Assistance Program', organization: 'Local Government', description: 'Monthly food distribution for low-income families', location: 'Central Community Center', category: 'Government', link: '#' },
    { id: 2, name: 'Vocational Training', organization: 'Skills Development NGO', description: 'Free technical skills training programs', location: 'Vocational Training Center', category: 'NGO', link: '#' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'microfinance':
        return <MicrofinanceTab loans={mockLoans} loading={false} onApplyLoan={() => navigate('/loans/apply')} />;
      case 'resources':
        return <ResourcesTab resources={mockResources} categories={['All', 'Government', 'NGO', 'Community']} />;
      case 'community':
        return <CommunityTab />;
      case 'marketplace':
        return <MarketplaceTab />;
      default:
        return <MicrofinanceTab loans={mockLoans} loading={false} />;
    }
  };

  const renderTabButton = (tabKey, IconComponent, label) => (
    <button
      className={`px-6 py-3 font-medium flex items-center ${activeTab === tabKey ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
      onClick={() => setActiveTab(tabKey)}
    >
      <IconComponent className="mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Community Dashboard" />
      
      <div className="flex-grow container mx-auto px-4 py-6">
        <StatsCards stats={stats} />
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex border-b">
            {renderTabButton('microfinance', FiDollarSign, 'Microfinance')}
            {renderTabButton('resources', FiMapPin, 'Local Resources')}
            {renderTabButton('community', FiUsers, 'Community')}
            {renderTabButton('marketplace', FiShoppingBag, 'Marketplace')}
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <FiPlus className="mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/loans/apply')}
                className="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-blue-50"
              >
                <span>Apply for a Loan</span>
                <FiArrowRight />
              </button>
              <button 
                onClick={() => navigate('/opportunities/create')}
                className="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-blue-50"
              >
                <span>Create Opportunity</span>
                <FiArrowRight />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FiDollarSign className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Loan application approved</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiUsers className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New community member joined</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;