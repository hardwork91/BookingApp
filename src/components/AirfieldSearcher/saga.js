import { call, put, takeEvery } from "redux-saga/effects";
import airfields from "../../lib/api/airfields";
import {
  SEARCH_AIRFIELD_REQUEST,
  SEARCH_AIRFIELD_SUCCESS,
  SEARCH_AIRFIELD_FAILURE,
} from "./constants";

// the search saga calls the search airfield API and waits for the response.
export function* searchSaga({ payload }) {
  try {
    const response = yield call(airfields.search, payload);
    if (response && response.data) {
      // In case of success, a new action is dispatched with type SEARCH_AIRFIELD_SUCCESS and response data as payload
      yield put({
        type: SEARCH_AIRFIELD_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    // in case of error, an failure SEARCH_AIRFIELD_FAILURE type action is dispatched. So it can be handled by an error reducer (not implemented on this example)
    yield put({ type: SEARCH_AIRFIELD_FAILURE });
  }
}

// watchSearchSaga is listening for each SEARCH_AIRFIELD_REQUEST type dispatched action to excecute the searchSaga
export function* watchSearchSaga() {
  yield takeEvery(SEARCH_AIRFIELD_REQUEST, searchSaga);
}

// export default saga
export default function* defaultSaga() {
  yield [watchSearchSaga()];
}
