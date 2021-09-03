import Cookies from 'js-cookie';

export const REGISTER = 'REGISTER';
export const UPDATE_USER = 'UPDATE_USER';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';

export const register = (info) => async(dispatch) => {
  let token = '';
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  };
  const res = await fetch(`http://localhost:3000/api/signup`, config);
  token = await res.headers.get('authorization');
  const user = await res.json();
  if (user.data !== undefined) {
    Cookies.set('token', token.split(' ')[1], {secure:true});
    Cookies.set('id', user.data.id, {secure:true});
    dispatch({
      type: REGISTER,
      payload: user.data,
    });
  } else {
    dispatch({
      type: AUTH_FAILURE,
      payload: user.errors
    });
  };
};

export const updateUser = (info) => async(dispatch) => {
  const config = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify(info)
  };
  const res = await fetch(`http://localhost:3000/api/users/${Cookies.get('id')}`, config);
  const user = await res.json();
  if (user.data !== undefined) {
    dispatch({
      type: UPDATE_USER,
      payload: user.data,
    });
  } else {
    dispatch({
      type: AUTH_FAILURE,
      payload: user.errors
    });
  };
};

export const login = (creds) => async(dispatch) => {
  let token = '';
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  };
  const res = await fetch(`http://localhost:3000/api/login`, config);
  token = await res.headers.get('authorization')
  const user = await res.json();
  if (user.data) {
    Cookies.set('token', token.split(' ')[1], {secure: true});
    Cookies.set('id', user.data.id, {secure: true});
    dispatch({
      type: LOGIN,
      payload: user.data,
    });
  } else {
    dispatch({
      type: AUTH_FAILURE,
      payload: user
    });
  };
};

export const logout = () => async(dispatch) => {
  const config = {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${Cookies.get('token')}`
    }
  }
  const res = await fetch('http://localhost:3000/api/logout', config);
  dispatch({
    type: LOGOUT,
  });
};

export const getUser = (id) => async(dispatch) => {
  const config = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('token')}`
    }
  };
  const res = await fetch(`http://localhost:3000/api/users/${id}`, config);
  const user = await res.json();
  if (user.data) {
    dispatch({
      type: GET_USER,
      payload: user.data,
    });
  } else {
    dispatch({
      type: AUTH_FAILURE,
      payload: user
    });
  };
};
