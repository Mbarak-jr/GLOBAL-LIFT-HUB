import axios from 'axios';

// Correct base URL configuration
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://globallifthubapi.onrender.com';

// Remove the extra /api since your backend routes already include it
const SKILLS_URL = `${API_BASE}/skills`;  
const COURSES_URL = `${API_BASE}/skills/courses`;

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
    const response = await axios.get(SKILLS_URL, config);
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
    const response = await axios.get(COURSES_URL, config);
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
  const response = await axios.post(SKILLS_URL, skillData, config);
  return response.data?.data || response.data;
};