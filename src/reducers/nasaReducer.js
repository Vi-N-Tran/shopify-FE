import { ActionTypes } from '../actions';

const defaultState = {
  pics: undefined,
};

const NasaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NASA_DATA:
      return { ...state, pics: action.payload };
    default:
      return state;
  }
};

export default NasaReducer;
