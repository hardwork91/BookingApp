import { combineReducers } from "redux";
import {
  SEARCH_AIRFIELD_REQUEST,
  SEARCH_AIRFIELD_SUCCESS,
  SEARCH_AIRFIELD_FAILURE,
  CLEAR_AIRFIELD_REQUEST,
} from "./constants";

// manage the array of airfields resulting froma a searching action
export function airfieldsReducer(state = [], action) {
  switch (action.type) {
    case SEARCH_AIRFIELD_SUCCESS: {
      // when success, must select only the data of interest form each element of the response.
      return action.payload.data.map(
        ({ ap, apicode, shortdisplayname, displayname }) => ({
          ap,
          apicode,
          shortdisplayname,
          displayname,
        })
      );
    }
    // in the rest of cases, must return an empty array
    case SEARCH_AIRFIELD_REQUEST:
    case SEARCH_AIRFIELD_FAILURE:
    case CLEAR_AIRFIELD_REQUEST:
      return [];
    default:
      return state;
  }
}

// flag used for display loading indicators and disable UI controls while waiting for the API response.
export function isSearchingReducer(state = false, action) {
  switch (action.type) {
    case SEARCH_AIRFIELD_REQUEST:
      return true;
    case SEARCH_AIRFIELD_SUCCESS:
    case SEARCH_AIRFIELD_FAILURE:
    case CLEAR_AIRFIELD_REQUEST:
      return false;
    default:
      return state;
  }
}

// combine both reducers
export default combineReducers({
  airfields: airfieldsReducer,
  isSearching: isSearchingReducer,
});
