import { GET_HISTORY, DELETE_ENTRY, DELETE_ENTRY_FAILURE } from '../actions/types';

export default function (state = { status: 'history', entries: [] }, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        entries: action.payload
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.payload)
      };
    case DELETE_ENTRY_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
