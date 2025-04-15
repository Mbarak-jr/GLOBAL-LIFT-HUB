import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API}/auth`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message?.includes('verify your email')) {
      throw new Error('EMAIL_NOT_VERIFIED');
    }
    throw error;
  }
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, {
    newPassword,
    confirmPassword
  });
  return response.data;
};

export const verifyResetToken = async (token) => {
  const response = await axios.get(`${API_URL}/verify-reset-token/${token}`);
  return response.data;
};

export const resendVerificationEmail = async (email) => {
  const response = await axios.post(`${API_URL}/resend-verification`, { email });
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
  return response.data;
};