import { LOADING_START, LOADING_STOP } from '../actions/types';

const initialState = {
  isLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        isLoading: true
      };
    case LOADING_STOP:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
