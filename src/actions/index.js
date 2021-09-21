import axios from 'axios';
import moment from 'moment';

export const NASA_URL = 'https://api.nasa.gov/planetary/apod';
// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  FETCH_NASA_DATA: 'FETCH_NASA_DATA',
};

export function fetchNasaPics(startDate = undefined, endDate = undefined, count = 9) {
  let params = {};
  if (startDate) {
    params = {
      api_key: 'lWZOITQ8IUeNYk1rLpVHWQYH1gUW7fajXn6uaEte',
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
    };
  } else {
    params = {
      api_key: 'lWZOITQ8IUeNYk1rLpVHWQYH1gUW7fajXn6uaEte',
      count: parseInt(count, 10) + 3,
    };
  }

  return (dispatch) => {
    axios.get(`${NASA_URL}`, { params }).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_NASA_DATA,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(`Error in fetchPosts: ${error}`);
      dispatch({ type: ActionTypes.ERROR, payload: { message: 'There is an error while fetching NASA pics', data: error } });
    });
  };
}

export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}
