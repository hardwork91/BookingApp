import { SEARCH_AIRFIELD_REQUEST, CLEAR_AIRFIELD_REQUEST } from "./constants";

export function search(payload) {
  return {
    type: SEARCH_AIRFIELD_REQUEST,
    payload,
  };
}

export function clear() {
  return {
    type: CLEAR_AIRFIELD_REQUEST,
  };
}
