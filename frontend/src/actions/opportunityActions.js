import { 
  SET_OPPORTUNITIES, 
  ADD_OPPORTUNITY, 
  DELETE_OPPORTUNITY, 
  UPDATE_OPPORTUNITY 
} from './types';

// Action creators
export const setOpportunities = (opportunities) => ({
  type: SET_OPPORTUNITIES,
  payload: opportunities
});

export const addOpportunity = (opportunity) => ({
  type: ADD_OPPORTUNITY,
  payload: opportunity
});

export const deleteOpportunity = (opportunityId) => ({
  type: DELETE_OPPORTUNITY,
  payload: opportunityId
});

export const updateOpportunity = (opportunity) => ({
  type: UPDATE_OPPORTUNITY,
  payload: opportunity
});

// Thunk action to fetch opportunities from an API
export const fetchOpportunities = () => {
  return async (dispatch) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/opportunities');
      const data = await response.json();
      dispatch(setOpportunities(data));
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };
};