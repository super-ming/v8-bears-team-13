import { SET_CURRENT_USER } from './types';

// userData = { username: string, expires: string }
export const loginUser = userData => (dispatch) => {
  const stringifiedData = JSON.stringify(userData);

  localStorage.setItem('userData', stringifiedData);

  dispatch({
    type: SET_CURRENT_USER,
    payload: userData
  });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userData');

  dispatch({
    type: SET_CURRENT_USER,
    payload: { username: '', expires: '' }
  });
};
