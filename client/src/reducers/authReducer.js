import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
  username: '',
  expires: ''
};

// Actions are dispatched to this reducer...
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        username: action.payload.username,
        expires: action.payload.expires
      };
    case LOGOUT_USER:
      return {
        username: '',
        expires: ''
      };
    default:
      return state;
  }
}
