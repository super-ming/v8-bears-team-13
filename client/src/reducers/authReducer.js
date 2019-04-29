import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  username: '',
  expires: ''
};

// Actions are dispatched to this reducer...
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId,
        expires: action.payload.expires
      };
    default:
      return state;
  }
}
