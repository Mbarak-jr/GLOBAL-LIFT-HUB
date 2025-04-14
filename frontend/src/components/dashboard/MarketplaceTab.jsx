import React, { useState } from 'react';
import { FiShoppingBag, FiDollarSign, FiHeart, FiStar, FiGlobe, FiShield, FiTrendingUp } from 'react-icons/fi';

const MarketplaceTab = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const products = [
    {
      id: 1,
      name: "Artisan Craft Collection",
      description: "Handmade goods from women's cooperatives in Rwanda supporting sustainable livelihoods",
      price: 25,
      priceDisplay: "$25+",
      impact: "Supports 50+ families",
      category: "ethical-goods",
      rating: 4.8,
      reviews: 124,
      delivery: "Worldwide shipping",
      image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 2,
      name: "Microfinance Investment Bundle",
      description: "Diversified portfolio of vetted micro-loans with transparent impact tracking",
      price: 500,
      priceDisplay: "$500 minimum",
      impact: "12-15% annual return",
      category: "impact-investing",
      rating: 4.6,
      investors: 328,
      location: "12 countries",
      image: "https://images.unsplash.com/photo-1459257831348-f0cdd359235f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 3,
      name: "Organic Farm Shares",
      description: "Support smallholder farmers while receiving seasonal organic produce",
      price: 40,
      priceDisplay: "$40/month",
      impact: "Supports 3 farming families",
      category: "ethical-goods",
      rating: 4.9,
      reviews: 87,
      delivery: "Local pickup",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 4,
      name: "Clean Energy Bonds",
      description: "Finance solar installations in off-grid communities with fixed returns",
      price: 250,
      priceDisplay: "$250 minimum",
      impact: "6-8% annual return",
      category: "impact-investing",
      rating: 4.7,
      investors: 215,
      location: "Sub-Saharan Africa",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category === activeTab.replace('-', ''));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Impact Marketplace</h2>
        <p className="text-gray-600 max-w-3xl">
          Connect directly with poverty alleviation initiatives and social enterprises worldwide. 
          Every purchase or investment creates measurable impact.
        </p>
      </div>
      
      {/* Tabs and Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All Opportunities
          </button>
          <button
            onClick={() => setActiveTab('ethical-goods')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'ethical-goods' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} flex items-center`}
          >
            <FiShoppingBag className="mr-2" /> Ethical Goods
          </button>
          <button
            onClick={() => setActiveTab('impact-investing')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'impact-investing' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} flex items-center`}
          >
            <FiTrendingUp className="mr-2" /> Impact Investments
          </button>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="h-40 bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.category === 'ethical-goods' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {product.category === 'ethical-goods' ? 'Ethical Goods' : 'Investment'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  <FiDollarSign className={`mr-1 ${product.category === 'ethical-goods' ? 'text-green-500' : 'text-purple-500'}`} />
                  <span className="font-bold">{product.priceDisplay}</span>
                </div>
                <div className="flex items-center">
                  <FiHeart className="text-red-400 mr-1" />
                  <span className="text-sm">{product.impact}</span>
                </div>
              </div>
              
              {product.rating && (
                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews || product.investers} {product.category === 'ethical-goods' ? 'reviews' : 'investors'})
                  </span>
                </div>
              )}
              
              {product.delivery && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FiGlobe className="mr-1" size={14} /> {product.delivery}
                </div>
              )}
              
              <button className={`w-full py-2 rounded-lg font-medium text-white hover:shadow-md transition-all ${
                product.category === 'ethical-goods' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
              }`}>
                {product.category === 'ethical-goods' ? 'Add to Cart' : 'Invest Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl mb-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Why Our Marketplace Creates More Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiShield className="text-white" size={24} />,
                title: "Vetted Opportunities",
                description: "Every offering undergoes rigorous impact and financial evaluation"
              },
              {
                icon: <FiGlobe className="text-white" size={24} />,
                title: "Global Reach",
                description: "Direct connections with communities in 15+ developing countries"
              },
              {
                icon: <FiTrendingUp className="text-white" size={24} />,
                title: "Dual Returns",
                description: "Financial returns plus measurable social impact"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-blue-100">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Make an Impact?</h3>
          <p className="text-gray-600 mb-6">
            Join thousands of conscious consumers and investors creating change through everyday economic decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
              Browse Ethical Goods
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
              Explore Investments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceTab;