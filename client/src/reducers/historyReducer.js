import {
  GET_HISTORY,
  HISTORY_DEFAULT,
  EDIT_ENTRY,
  DELETE_ENTRY,
  DELETE_ENTRY_FAILURE
} from '../actions/types';

export default function (state = { status: 'history', entries: [] }, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        status: 'history',
        entries: action.payload
      };
    case HISTORY_DEFAULT:
      return {
        ...state,
        status: 'history'
      };
    case EDIT_ENTRY:
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
