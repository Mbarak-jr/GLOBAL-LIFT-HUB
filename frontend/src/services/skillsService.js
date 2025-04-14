import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL || 'https://globallifthubapi.onrender.com';
const SKILLS_API_URL = `${API}/api/skills`;  // Added /api here
const COURSES_API_URL = `${API}/api/skills/courses`;  // Added /api here

export const getSkills = async (filters = {}, token = null, signal) => {
  const config = {
    params: filters,
    signal
  };

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.get(SKILLS_API_URL, config);
    // Your API returns {success, count, data} - we want the data array
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

export const getCourses = async (filters = {}, token = null, signal) => {
  const config = {
    params: filters,
    signal
  };

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.get(COURSES_API_URL, config);
    // Your API returns {success, count, data} - we want the data array
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Admin endpoints
export const createSkill = async (skillData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(SKILLS_API_URL, skillData, config);
  return response.data?.data || response.data;
};