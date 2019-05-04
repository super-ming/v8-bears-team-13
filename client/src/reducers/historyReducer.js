import {
  GET_HISTORY,
  HISTORY_DEFAULT,
  HISTORY_EDIT,
  DELETE_ENTRY,
  DELETE_ENTRY_FAILURE
} from '../actions/types';

export default function (state = { status: 'history', entries: [] }, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        entries: action.payload
      };
    case HISTORY_DEFAULT:
      return {
        ...state,
        status: 'history'
      };
    case HISTORY_EDIT:
      return {
        ...state,
        status: 'edit'
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
