import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const FEATURES_API_URL = `${API}/feature-sections`;

export const getFeatureSections = async () => {
  try {
    const response = await axios.get(FEATURES_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching feature sections:', error);
    throw error;
  }
};