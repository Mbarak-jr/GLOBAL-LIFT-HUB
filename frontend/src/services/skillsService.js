import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const SKILLS_API_URL = `${API}/skills`;
const COURSES_API_URL = `${API}/skills/courses`;

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

  const response = await axios.get(SKILLS_API_URL, config);
  return Array.isArray(response.data)
    ? response.data
    : response.data?.data || response.data?.items || [];
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

  const response = await axios.get(COURSES_API_URL, config);
  return Array.isArray(response.data)
    ? response.data
    : response.data?.data || response.data?.items || [];
};

// Admin only endpoints would go here
export const createSkill = async (skillData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(SKILLS_API_URL, skillData, config);
  return response.data;
};

// Add other CRUD operations as needed...