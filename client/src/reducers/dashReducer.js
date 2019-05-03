import {
  ADD_ENTRY,
  EDIT_ENTRY,
  DASH_DEFAULT,
  GET_LATEST_ENTRIES,
  GET_LATEST_ENTRIES_FAILURE,
  DELETE_ENTRY,
  DELETE_ENTRY_FAILURE
} from '../actions/types';

// Actions are dispatched to this reducer...
export default function (state = { status: 'dash', latestEntries: [] }, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        status: 'add'
      };
    case EDIT_ENTRY:
      return {
        status: 'edit',
        entry: action.payload
      };
    case DASH_DEFAULT:
      return {
        status: 'dash'
      };
    case GET_LATEST_ENTRIES:
      return {
        status: 'dash',
        latestEntries: action.payload
      };
    case GET_LATEST_ENTRIES_FAILURE:
      return {
        status: 'dash',
        error: action.payload.error
      };
    case DELETE_ENTRY:
      return {
        ...state,
        latestEntries: state.latestEntries.filter(entry => entry.id !== action.payload)
      };
    // Same code as `GET_LATEST_ENTRIES_FAILURE`. Can be refactored
    case DELETE_ENTRY_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
