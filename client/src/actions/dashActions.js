import {
  ADD_ENTRY,
  EDIT_ENTRY,
  DASH_DEFAULT,
  GET_LATEST_ENTRIES,
  GET_LATEST_ENTRIES_FAILURE,
  DELETE_ENTRY,
  DELETE_ENTRY_FAILURE
} from './types';
import { startLoading, stopLoading } from './loadingActions';

export const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// `userTokenData` includes the username + token expiration time
export const addEntry = () => ({
  type: ADD_ENTRY
});

export const editEntry = entry => ({
  type: EDIT_ENTRY,
  payload: entry
});

export const getLatestEntriesSuccess = entries => ({
  type: GET_LATEST_ENTRIES,
  payload: entries
});

export const getLatestEntriesFailure = error => ({
  type: GET_LATEST_ENTRIES_FAILURE,
  payload: { error }
});

export const dashDefault = () => ({
  type: DASH_DEFAULT
});

export const getLatestEntries = userId => (dispatch) => {
  dispatch(startLoading());

  const url = `http://localhost:5000/api/entries/latest-entries/${userId}`;
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(handleErrors)
    .then(response => response.json())
    .then((entries) => {
      dispatch(getLatestEntriesSuccess(entries));
      dispatch(stopLoading());
      return entries;
    })
    .catch((error) => {
      console.log(error);
      dispatch(stopLoading());
      dispatch(getLatestEntriesFailure(error));
    });
};

/*
    DELETE ENTRY ACTIONS
*/
export const deleteEntrySuccess = entryId => ({
  type: DELETE_ENTRY,
  payload: entryId
});

export const deleteEntryFailure = error => ({
  type: DELETE_ENTRY_FAILURE,
  payload: { error }
});

export const deleteEntry = entryId => (dispatch) => {
  const url = `http://localhost:5000/api/entries/${entryId}`;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(handleErrors)
    .then((response) => {
      dispatch(deleteEntrySuccess(entryId));
    })
    .catch((error) => {
      dispatch(deleteEntryFailure(error));
    });
};
