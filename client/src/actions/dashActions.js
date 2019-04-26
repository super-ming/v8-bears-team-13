import { ADD_ENTRY, DASH_DEFAULT } from './types';

// `userTokenData` includes the username + token expiration time
export const addEntry = () => ({
    type: ADD_ENTRY
});

export const dashDefault = () => ({
    type: DASH_DEFAULT
});