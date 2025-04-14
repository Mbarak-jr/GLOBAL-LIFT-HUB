import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API}/auth`;

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
