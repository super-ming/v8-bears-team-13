import { LOADING_START, LOADING_STOP } from '../actions/types';

const initialState = {
  loading: false
};

// Actions are dispatched to this reducer...
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_STOP:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
