import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const HERO_API_URL = `${API}/hero-sections`;

export const getHeroSections = async () => {
  try {
    const response = await axios.get(HERO_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching hero sections:', error);
    throw error;
  }
};