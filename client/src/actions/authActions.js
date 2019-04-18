import { SET_CURRENT_USER } from './types';

// `userTokenData` includes the username + token expiration time
export const setCurrentUser = userTokenData => ({
  type: SET_CURRENT_USER,
  payload: userTokenData
});

export const logoutUser = () => ({ });
