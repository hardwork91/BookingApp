import { airfieldsReducer, isSearchingReducer } from "../reducer";
import {
  SEARCH_AIRFIELD_REQUEST,
  SEARCH_AIRFIELD_SUCCESS,
  SEARCH_AIRFIELD_FAILURE,
  CLEAR_AIRFIELD_REQUEST,
} from "../constants";

describe("airfieldsReducer", () => {
  it("returns initial state", () => {
    expect(airfieldsReducer(undefined, {})).toEqual([]);
    expect(
      airfieldsReducer(undefined, { type: SEARCH_AIRFIELD_REQUEST })
    ).toEqual([]);
    expect(
      airfieldsReducer(undefined, { type: SEARCH_AIRFIELD_FAILURE })
    ).toEqual([]);
    expect(
      airfieldsReducer(undefined, { type: CLEAR_AIRFIELD_REQUEST })
    ).toEqual([]);
  });

  it("returns data when success", () => {
    const data = [
      {
        ap: "ADV",
        apicode: "ADV",
        shortdisplayname: "Boston (ADV)",
        displayname: "Boston airfield (ADV)",
      },
    ];
    expect(
      airfieldsReducer(undefined, {
        type: SEARCH_AIRFIELD_SUCCESS,
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
        type: SEARCH_AIRFIELD_SUCCESS,
      })
    ).toBeFalsy();
    expect(
      isSearchingReducer(undefined, {
        type: SEARCH_AIRFIELD_FAILURE,
      })
    ).toBeFalsy();
    expect(
      isSearchingReducer(undefined, {
        type: CLEAR_AIRFIELD_REQUEST,
      })
    ).toBeFalsy();
  });

  it("returns true when is searching", () => {
    expect(
      isSearchingReducer(undefined, {
        type: SEARCH_AIRFIELD_REQUEST,
      })
    ).toBeTruthy();
  });
});
