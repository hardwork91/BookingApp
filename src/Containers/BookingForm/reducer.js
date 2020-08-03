import { combineReducers } from "redux";
import {
  SEARCH_BOOKING_REQUEST,
  SEARCH_BOOKING_SUCCESS,
  SEARCH_BOOKING_FAILURE,
  CLEAR_BOOKING_REQUEST,
} from "./constants";

// manage the result of search for available bookings
export function bookingsReducer(state = [], action) {
  switch (action.type) {
    case SEARCH_BOOKING_SUCCESS: {
      return action.payload.data;
    }
    case SEARCH_BOOKING_REQUEST:
    case SEARCH_BOOKING_FAILURE:
    case CLEAR_BOOKING_REQUEST: {
      return [];
    }
    default:
      return state;
  }
}

// flag used for display loading indicators and disable UI controls while waiting for the API response.
export function isSearchingReducer(state = false, action) {
  switch (action.type) {
    case SEARCH_BOOKING_REQUEST:
      return true;
    case SEARCH_BOOKING_SUCCESS:
    case SEARCH_BOOKING_FAILURE:
    case CLEAR_BOOKING_REQUEST:
      return false;
    default:
      return state;
  }
}

// combine both reducers
export default combineReducers({
  bookings: bookingsReducer,
  isSearching: isSearchingReducer,
});
