import { GET_POSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, POST_FAILURE } from '../actions/postActions';

const initialState = {
  posts: [],
  currentPost: {},
  errors: ''
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST:
    case CREATE_POST:
    case GET_POSTS:
    case DELETE_POST:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    case POST_FAILURE:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  };
};

export default postReducer;