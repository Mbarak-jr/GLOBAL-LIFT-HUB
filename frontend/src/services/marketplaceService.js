import axios from 'axios';

// Configure API base URL - using your VITE_API_BASE_URL directly
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://globallifthubapi.onrender.com/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 second timeout
});

// Response interceptor to handle errors consistently
apiClient.interceptors.response.use(
  response => response.data, // Just return the data for successful responses
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

const marketplaceService = {
  // Items
  getItems: async (params) => {
    return apiClient.get('/items', { params });
  },

  getItemById: async (id) => {
    return apiClient.get(`/items/${id}`);
  },

  createItem: async (itemData, token) => {
    return apiClient.post('/items', itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateItem: async (id, itemData, token) => {
    return apiClient.put(`/items/${id}`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteItem: async (id, token) => {
    return apiClient.delete(`/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createItemReview: async (id, reviewData, token) => {
    return apiClient.post(`/items/${id}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Categories
  getCategories: async () => {
    return apiClient.get('/categories');
  },

  createCategory: async (categoryData, token) => {
    return apiClient.post('/categories', categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Countries
  getCountries: async () => {
    return apiClient.get('/countries');
  },

  // Seller-specific endpoints
  getSellerItems: async (token) => {
    return apiClient.get('/seller/items', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Admin-specific endpoints
  getAdminCategories: async (token) => {
    return apiClient.get('/admin/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default marketplaceService;