import { call, put, takeEvery } from "redux-saga/effects";
import bookings from "../../lib/api/bookings";
import {
  SEARCH_BOOKING_REQUEST,
  SEARCH_BOOKING_SUCCESS,
  SEARCH_BOOKING_FAILURE,
} from "./constants";

// the search saga calls the search bookings API and waits for the response (mocked, in this case).
export function* searchSaga({ payload }) {
  try {
    const response = yield call(bookings.search, payload);
    if (response && response.data) {
      // In case of success, a new action is dispatched with type SEARCH_BOOKING_SUCCESS and response data as payload
      yield put({
        type: SEARCH_BOOKING_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    // in case of error, an failure SEARCH_AIRFIELD_FAILURE type action is dispatched. So it can be handled by an error reducer (not implemented on this example)
    yield put({ type: SEARCH_BOOKING_FAILURE });
  }
}

// watchSearchSaga is listening for each SEARCH_BOOKING_REQUEST type dispatched action to excecute the searchSaga
export function* watchSearchSaga() {
  yield takeEvery(SEARCH_BOOKING_REQUEST, searchSaga);
}

// export default saga
export default function* defaultSaga() {
  yield [watchSearchSaga()];
}
