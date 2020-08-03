import { combineReducers } from "redux";
import {
  SEARCH_AIRFIELD_REQUEST,
  SEARCH_AIRFIELD_SUCCESS,
  SEARCH_AIRFIELD_FAILURE,
  CLEAR_AIRFIELD_REQUEST,
} from "./constants";

export function airfieldsReducer(state = [], action) {
  switch (action.type) {
    case SEARCH_AIRFIELD_SUCCESS: {
      return action.payload.data.map(
        ({ ap, apicode, shortdisplayname, displayname }) => ({
          ap,
          apicode,
          shortdisplayname,
          displayname,
        })
      );
    }
    case SEARCH_AIRFIELD_REQUEST:
    case SEARCH_AIRFIELD_FAILURE:
    case CLEAR_AIRFIELD_REQUEST: {
      return [];
    }
    default:
      return state;
  }
}

export function isSearchingReducer(state = false, action) {
  switch (action.type) {
    case SEARCH_AIRFIELD_REQUEST:
      return true;
    case SEARCH_AIRFIELD_SUCCESS:
    case SEARCH_AIRFIELD_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  airfields: airfieldsReducer,
  isSearching: isSearchingReducer,
});
