import { GET_HISTORY, DELETE_ENTRY, DELETE_ENTRY_FAILURE } from './types';

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
      console.log("ERROR", error);
      dispatch(deleteEntryFailure(error));
    });
};
