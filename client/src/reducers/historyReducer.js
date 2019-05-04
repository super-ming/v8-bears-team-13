import { GET_HISTORY } from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_HISTORY:
            return action.history;
        default:
            return state;
    }
}

