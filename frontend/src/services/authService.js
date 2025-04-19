import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API}/auth`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Invalid email or password');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset email');
  }
};

export const verifyResetToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify-reset-token/${token}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Invalid or expired token');
  }
};

export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
  console.log('Making request to:', `${API_URL}/reset-password/${token}`);
  
  try {
    const response = await axios.post(
      `${API_URL}/reset-password/${token}`,
      { newPassword, confirmPassword },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    );
    console.log('Reset password response:', response);
    return response.data;
  } catch (error) {
    console.error('Full error details:', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      status: error.response?.status,
      response: error.response?.data
    });
    throw error;
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend-verification`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to resend verification email');
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Email verification failed');
  }
};

export default {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  resendVerificationEmail,
  verifyEmail
};