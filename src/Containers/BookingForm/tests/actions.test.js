import { search, clear } from "../actions";
import { SEARCH_BOOKING_REQUEST, CLEAR_BOOKING_REQUEST } from "../constants";

it("when search", () => {
  const payload = { from: ["vob"], where: ["abd", "pso"] };
  expect(search(payload)).toEqual({
    type: SEARCH_BOOKING_REQUEST,
    payload,
  });
});

it("when clear", () => {
  expect(clear()).toEqual({
    type: CLEAR_BOOKING_REQUEST,
  });
});
