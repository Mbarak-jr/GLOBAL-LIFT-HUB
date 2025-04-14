import {
  SET_OPPORTUNITIES,
  ADD_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY
} from '../actions/types';

const initialState = {
  opportunities: [],
  loading: false,
  error: null
};

const opportunityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPPORTUNITIES:
      return {
        ...state,
        opportunities: action.payload,
        loading: false
      };
      
    case ADD_OPPORTUNITY:
      return {
        ...state,
        opportunities: [...state.opportunities, action.payload]
      };
      
    case DELETE_OPPORTUNITY:
      return {
        ...state,
        opportunities: state.opportunities.filter(
          opportunity => opportunity.id !== action.payload
        )
      };
      
    case UPDATE_OPPORTUNITY:
      return {
        ...state,
        opportunities: state.opportunities.map(opportunity => 
          opportunity.id === action.payload.id ? action.payload : opportunity
        )
      };
      
    default:
      return state;
  }
};

export default opportunityReducer;