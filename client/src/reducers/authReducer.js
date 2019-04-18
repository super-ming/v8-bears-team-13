import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  username: '',
  expirationTime: ''
};

// Actions are dispatched to this reducer...
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload // payload === userData
      };
    default:
      return state;
  }
}
