// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import CountReducer from './count-reducer';
import NasaReducer from './nasaReducer';

const rootReducer = combineReducers({
  count: CountReducer,
  nasa: NasaReducer,
});

export default rootReducer;
