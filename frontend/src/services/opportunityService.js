import axios from 'axios';

const API_URL = '/api/opportunities';
const ADMIN_API_URL = '/api/admin/opportunities';

// Public
export const getOpportunities = async (filters = {}, token = null, signal) => {
  const config = {
    params: filters,
    signal
  };

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios.get(API_URL, config);
  return Array.isArray(response.data)
    ? response.data
    : response.data?.data || response.data?.items || [];
};

// Admin only
export const createOpportunity = async (opportunityData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(ADMIN_API_URL, opportunityData, config);
  return response.data;
};

export const updateOpportunity = async (id, opportunityData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.patch(`${ADMIN_API_URL}/${id}`, opportunityData, config);
  return response.data;
};

export const deleteOpportunity = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios.delete(`${ADMIN_API_URL}/${id}`, config);
};
