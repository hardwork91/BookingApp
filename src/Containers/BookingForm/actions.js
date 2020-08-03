import { SEARCH_BOOKING_REQUEST, CLEAR_BOOKING_REQUEST } from "./constants";

// request a booking searching by passing all the form values
export function search(payload) {
  return {
    type: SEARCH_BOOKING_REQUEST,
    payload,
  };
}

// request to clear the booking list
export function clear() {
  return {
    type: CLEAR_BOOKING_REQUEST,
  };
}
