import authReducer from './authReducer';
import postReducer from './postReducer';
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer
});

export default rootReducer;