import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API}/financial-institutions`;
const ADMIN_API_URL = `${API}/admin/financial-institutions`;

// Public endpoints
export const getFinancialInstitutions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFinancialInstitution = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Admin endpoints
export const createFinancialInstitution = async (institutionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(ADMIN_API_URL, institutionData, config);
  return response.data;
};

export const updateFinancialInstitution = async (id, institutionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${ADMIN_API_URL}/${id}`, institutionData, config);
  return response.data;
};

export const deleteFinancialInstitution = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${ADMIN_API_URL}/${id}`, config);
};
