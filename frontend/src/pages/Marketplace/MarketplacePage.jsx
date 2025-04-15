import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import marketplaceService from '../../services/marketplaceService';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader/MarketplaceHeader';
import MarketplaceFooter from '../../components/marketplace/MarketplaceFooter/MarketplaceFooter';
import ItemCard from '../../components/marketplace/ItemCard/ItemCard';
import Filters from '../../components/marketplace/Filters/Filters';
import { toast } from 'react-toastify';

const MarketplacePage = () => {
  const [items, setItems] = useState({
    data: [],
    total: 0,
    page: 1,
    pages: 1
  });
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
        setLoading(true);
        
        const [itemsResponse, categoriesResponse, countriesResponse] = await Promise.all([
          marketplaceService.getItems(filters),
          marketplaceService.getCategories(),
          marketplaceService.getCountries(),
        ]);
        
        setItems({
          data: itemsResponse?.items || [],
          total: itemsResponse?.total || 0,
          page: itemsResponse?.page || 1,
          pages: itemsResponse?.pages || 1
        });
        
        setCategories(categoriesResponse || []);
        setCountries(countriesResponse || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load marketplace data');
        setItems({
          data: [],
          total: 0,
          page: 1,
          pages: 1
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Poverty Alleviation Marketplace
              </h1>
              {userInfo?.role === 'seller' && (
                <button
                  onClick={() => navigate('/marketplace/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Add New Item
                </button>
              )}
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : items.data.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found matching your criteria</p>
                <button
                  onClick={() => setFilters({
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
                  })}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.data.map((item) => (
                    <ItemCard 
                      key={item._id} 
                      item={item} 
                      onClick={() => navigate(`/marketplace/${item._id}`)}
                      userRole={userInfo?.role}
                      onEdit={() => navigate(`/marketplace/edit/${item._id}`)}
                      onDelete={async () => {
                        try {
                          await marketplaceService.deleteItem(item._id);
                          toast.success('Item deleted successfully');
                          // Refresh items
                          setFilters(prev => ({ ...prev }));
                        } catch (error) {
                          toast.error('Failed to delete item');
                        }
                      }}
                    />
                  ))}
                </div>
                
                {items.pages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: items.pages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-md ${
                          filters.page === i + 1 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 border hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
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