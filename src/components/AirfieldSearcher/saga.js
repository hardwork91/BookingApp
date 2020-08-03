import { call, put, takeEvery } from "redux-saga/effects";
import airfields from "../../lib/api/airfields";
import {
  SEARCH_AIRFIELD_REQUEST,
  SEARCH_AIRFIELD_SUCCESS,
  SEARCH_AIRFIELD_FAILURE,
} from "./constants";

export function* searchSaga({ payload }) {
  try {
    const response = yield call(airfields.search, payload);
    if (response && response.data) {
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
    yield put({ type: SEARCH_AIRFIELD_FAILURE });
  }
}

export function* watchSearchSaga() {
  yield takeEvery(SEARCH_AIRFIELD_REQUEST, searchSaga);
}

export default function* defaultSaga() {
  yield [watchSearchSaga()];
}
