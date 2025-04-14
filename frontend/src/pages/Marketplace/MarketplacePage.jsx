import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import marketplaceService from '../../services/marketplaceService';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader/MarketplaceHeader';
import MarketplaceFooter from '../../components/marketplace/MarketplaceFooter/MarketplaceFooter';
import ItemCard from '../../components/marketplace/ItemCard/ItemCard';
import Filters from '../../components/marketplace/Filters/Filters';

const MarketplacePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    country: '',
    fairTrade: false,
    organic: false,
    sort: 'newest',
    page: 1,
    limit: 12,
  });
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  const userInfo = useSelector((state) => state.auth?.userInfo) || null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, categoriesData, countriesData] = await Promise.all([
          marketplaceService.getItems(filters),
          marketplaceService.getCategories(),
          marketplaceService.getCountries(),
        ]);
        
        setItems(itemsData?.items || []);
        setCategories(categoriesData || []);
        setCountries(countriesData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setItems([]);
        setCategories([]);
        setCountries([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketplaceHeader userInfo={userInfo} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <Filters 
              filters={filters} 
              categories={categories}
              countries={countries}
              onFilterChange={handleFilterChange}
            />
          </aside>
          
          <section className="w-full lg:w-3/4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Poverty Alleviation Marketplace
            </h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found matching your criteria</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <ItemCard 
                      key={item._id} 
                      item={item} 
                      onClick={() => navigate(`/marketplace/${item._id}`)}
                    />
                  ))}
                </div>
                
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: Math.ceil((items.total || 0) / filters.limit) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setFilters({ ...filters, page: i + 1 })}
                      className={`px-4 py-2 rounded-md ${filters.page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default MarketplacePage;