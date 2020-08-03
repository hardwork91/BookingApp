import { combineReducers } from "redux";
import {
  SEARCH_BOOKING_REQUEST,
  SEARCH_BOOKING_SUCCESS,
  SEARCH_BOOKING_FAILURE,
  CLEAR_BOOKING_REQUEST,
} from "./constants";

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

export function isSearchingReducer(state = false, action) {
  switch (action.type) {
    case SEARCH_BOOKING_REQUEST:
      return true;
    case SEARCH_BOOKING_SUCCESS:
    case SEARCH_BOOKING_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  bookings: bookingsReducer,
  isSearching: isSearchingReducer,
});
