import { SET_USER, LOGOUT_USER, UPDATE_USER_PROFILE } from './types';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const updateUserProfile = (profileData) => ({
  type: UPDATE_USER_PROFILE,
  payload: profileData
});

// Thunk for user login
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      
      if (response.ok) {
        dispatch(setUser(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };
};