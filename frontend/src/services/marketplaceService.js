import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API}/marketplace`;

const marketplaceService = {
  getItems: async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
  },
  getItem: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  createItem: async (itemData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(API_URL, itemData, config);
    return response.data;
  },
  getCategories: async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },
  getCountries: async () => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
  },
};

export default marketplaceService;
