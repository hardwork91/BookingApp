import { call, put, takeEvery } from "redux-saga/effects";
import bookings from "../../lib/api/bookings";
import {
  SEARCH_BOOKING_REQUEST,
  SEARCH_BOOKING_SUCCESS,
  SEARCH_BOOKING_FAILURE,
} from "./constants";

export function* searchSaga({ payload }) {
  try {
    const response = yield call(bookings.search, payload);
    if (response && response.data) {
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
    yield put({ type: SEARCH_BOOKING_FAILURE });
  }
}

export function* watchSearchSaga() {
  yield takeEvery(SEARCH_BOOKING_REQUEST, searchSaga);
}

export default function* defaultSaga() {
  yield [watchSearchSaga()];
}
