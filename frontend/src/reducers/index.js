import { combineReducers } from 'redux';
import opportunityReducer from './opportunityReducer';
import userReducer from './userReducer';

// Combine all reducers
const rootReducer = combineReducers({
  opportunities: opportunityReducer,
  user: userReducer
  // Add more reducers here as your app grows
});

export default rootReducer;