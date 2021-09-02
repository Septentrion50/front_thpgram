import Cookies from "js-cookie";

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const POST_FAILURE = 'POST_FAILURE';

export const getPosts = () => async(dispatch) => {
  const config = {
    method: 'GET',
  };
  const res = await fetch(`http://localhost:3000/articles`, config);
  const posts = await res.json();
  if (posts[0].id) {
    dispatch({
      type: GET_POSTS,
      payload: posts,
    });
  } else {
    dispatch({
      type: POST_FAILURE,
      payload: posts.errors
    });
  };
};

export const getPost = (id) => async(dispatch) => {
  const config = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${Cookies.get('token')}`
    }
  };
  const res = await fetch(`http://localhost:3000/articles/${id}`, config);
  const post = await res.json();
  if (post.id) {
    dispatch({
      type: GET_POST,
      payload: post,
    });
  } else {
    dispatch({
      type: POST_FAILURE,
      payload: post.errors
    });
  };
};

export const createPost = (content) => async(dispatch) => {
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify(content)
  };
  const res = await fetch(`http://localhost:3000/articles`, config);
  const post = await res.json();
  if (post.data.title) {
    dispatch({
      type: CREATE_POST,
      payload: post.data,
    });
  } else {
    dispatch({
      type: POST_FAILURE,
      payload: post.errors
    });
  };
};

export const updatePost = (id, content) => async(dispatch) => {
  const config = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify(content)
  };
  const res = await fetch(`http://localhost:3000/articles/${id}`, config);
  const post = await res.json();
  if (post.data.title) {
    dispatch({
      type: UPDATE_POST,
      payload: post.data,
    });
  } else {
    dispatch({
      type: POST_FAILURE,
      payload: post.errors
    });
  };
};

export const deletePost = (id) => async(dispatch) => {
  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('token')}`
    }
  };
  const res = await fetch(`http://localhost:3000/articles/${id}`, config);
  const post = await res.json();
  if (post.data.title) {
    dispatch({
      type: DELETE_POST,
      payload: post.data,
    });
  } else {
    dispatch({
      type: POST_FAILURE,
      payload: post.errors
    });
  };
};