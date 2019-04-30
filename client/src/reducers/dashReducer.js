import { ADD_ENTRY, EDIT_ENTRY, DASH_DEFAULT, GET_LATEST_ENTRIES, GET_LATEST_ENTRIES_FAILURE } from '../actions/types';

// Actions are dispatched to this reducer...
export default function (state = {status: 'dash'}, action) {
    switch (action.type) {
        case ADD_ENTRY:
            return {
                status: 'add'
            };
        case EDIT_ENTRY:
            return {
                status: 'edit'
            };
        case DASH_DEFAULT: 
            return {
                status: 'dash'
            };
        case GET_LATEST_ENTRIES:
            return {
                status: 'dash',
                latestEntries: action.payload
            }
        case GET_LATEST_ENTRIES_FAILURE:
            return {
                status: 'dash',
                error: action.payload.error
            }
        default:
            return state;
    }
  }