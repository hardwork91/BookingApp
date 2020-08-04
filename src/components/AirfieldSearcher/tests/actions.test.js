import { search, clear } from "../actions";
import { SEARCH_AIRFIELD_REQUEST, CLEAR_AIRFIELD_REQUEST } from "../constants";

it("when search", () => {
  expect(search("a")).toEqual({
    type: SEARCH_AIRFIELD_REQUEST,
    payload: "a",
  });
});

it("when clear", () => {
  expect(clear()).toEqual({
    type: CLEAR_AIRFIELD_REQUEST,
  });
});
