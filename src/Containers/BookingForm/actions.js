import { SEARCH_BOOKING_REQUEST, CLEAR_BOOKING_REQUEST } from "./constants";

export function search(payload) {
  return {
    type: SEARCH_BOOKING_REQUEST,
    payload,
  };
}

export function clear() {
  return {
    type: CLEAR_BOOKING_REQUEST,
  };
}
