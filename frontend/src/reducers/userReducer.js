import {
  SET_USER,
  LOGOUT_USER,
  UPDATE_USER_PROFILE
} from '../actions/types';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false
      };
      
    case LOGOUT_USER:
      // Clear any auth tokens from localStorage
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
      
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload
        }
      };
      
    default:
      return state;
  }
};

export default userReducer;