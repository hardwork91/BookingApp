import { bookingsReducer, isSearchingReducer } from "../reducer";
import {
  SEARCH_BOOKING_REQUEST,
  SEARCH_BOOKING_SUCCESS,
  SEARCH_BOOKING_FAILURE,
  CLEAR_BOOKING_REQUEST,
} from "../constants";

describe("bookingsReducer", () => {
  it("returns initial state", () => {
    expect(bookingsReducer(undefined, {})).toEqual([]);
    expect(
      bookingsReducer(undefined, { type: SEARCH_BOOKING_REQUEST })
    ).toEqual([]);
    expect(
      bookingsReducer(undefined, { type: SEARCH_BOOKING_FAILURE })
    ).toEqual([]);
    expect(bookingsReducer(undefined, { type: CLEAR_BOOKING_REQUEST })).toEqual(
      []
    );
  });

  it("returns data when success", () => {
    const data = [{ id: "1", label: "Result1" }];
    expect(
      bookingsReducer(undefined, {
        type: SEARCH_BOOKING_SUCCESS,
        payload: { data },
      })
    ).toEqual(data);
  });
});

describe("isSearchingReducer", () => {
  it("returns initial state", () => {
    expect(isSearchingReducer(undefined, {})).toBeFalsy();
    expect(
      isSearchingReducer(undefined, {
        type: SEARCH_BOOKING_SUCCESS,
      })
    ).toBeFalsy();
    expect(
      isSearchingReducer(undefined, {
        type: SEARCH_BOOKING_FAILURE,
      })
    ).toBeFalsy();
    expect(
      isSearchingReducer(undefined, {
        type: CLEAR_BOOKING_REQUEST,
      })
    ).toBeFalsy();
  });

  it("returns true when is searching", () => {
    expect(
      isSearchingReducer(undefined, {
        type: SEARCH_BOOKING_REQUEST,
      })
    ).toBeTruthy();
  });
});
