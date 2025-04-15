import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API}/auth`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    // Removed email verification check since we're auto-verifying
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {
      newPassword,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyResetToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify-reset-token/${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// The following functions can be removed if not needed anymore,
// but keeping them in case you want to re-enable verification later

export const resendVerificationEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend-verification`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Optional: Cleaner version if you want to completely remove verification
/*
export default {
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  verifyResetToken
};
*/