import { GET_HISTORY } from './types';

export const getHistory = (data) => ({
    type: GET_HISTORY,
    history: data
});