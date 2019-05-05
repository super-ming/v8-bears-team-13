import { GET_HISTORY, DELETE_ENTRY, DELETE_ENTRY_FAILURE, HISTORY_EDIT } from './types';

export const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getHistory = data => ({
  type: GET_HISTORY,
  payload: data
});

export const deleteEntrySuccess = entryId => ({
  type: DELETE_ENTRY,
  payload: entryId
});

export const editEntry = entry => ({
  type: HISTORY_EDIT,
  payload: entry
});

export const deleteEntryFailure = error => ({
  type: DELETE_ENTRY_FAILURE,
  payload: { error }
});

export const deleteEntry = entryId => (dispatch) => {
  const url = `/api/entries/${entryId}`;

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
