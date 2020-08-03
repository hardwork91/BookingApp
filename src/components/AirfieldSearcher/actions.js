import { SEARCH_AIRFIELD_REQUEST, CLEAR_AIRFIELD_REQUEST } from "./constants";

// request an airfields searching by passing que text query
export function search(payload) {
  return {
    type: SEARCH_AIRFIELD_REQUEST,
    payload,
  };
}

// request to clear the arifields list
export function clear() {
  return {
    type: CLEAR_AIRFIELD_REQUEST,
  };
}
