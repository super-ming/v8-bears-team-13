import { ADD_ENTRY, DASH_DEFAULT } from '../actions/types';

// Actions are dispatched to this reducer...
export default function (state = {status: 'dash'}, action) {
    switch (action.type) {
        case ADD_ENTRY:
            return {
                status: 'add'
            };
        case DASH_DEFAULT: 
            return {
                status: 'dash'
            }
        default:
            return state;
    }
  }