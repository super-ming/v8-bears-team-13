// Root Reducer
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dashReducer from './dashReducer';
import loadingReducer from './loadingReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  auth: authReducer, // access state in container components using `this.props.auth`
  dash: dashReducer,
  loading: loadingReducer,
  history: historyReducer
});
