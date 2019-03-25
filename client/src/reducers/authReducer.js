import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
}

// Actions are dispatched to this reducer...
export default function(state = initialState, action) {
  switch(action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload // payload === userData
      }
    default:
      return state;
  }
}