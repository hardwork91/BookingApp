import { call, put } from "redux-saga/effects";
import bookings from "../../../lib/api/bookings";
import { searchSaga } from "../saga";
import {
  SEARCH_BOOKING_REQUEST,
  SEARCH_BOOKING_SUCCESS,
  SEARCH_BOOKING_FAILURE,
} from "../constants";

describe("searchSaga", () => {
  const payload = { from: ["vob"], where: ["abd", "pso"] };

  describe("when search bookings succeeds", () => {
    const successResponse = {
      data: [{ apicode: "ADF" }],
    };
    const generator = searchSaga({ payload });

    it("calls the corresponding API function", () => {
      expect(generator.next().value).toEqual(call(bookings.search, payload));
    });

    it("put SEARCH_BOOKING_SUCCESS with the response", () => {
      expect(generator.next(successResponse).value).toEqual(
        put({
          type: SEARCH_BOOKING_SUCCESS,
          payload: {
            data: successResponse.data,
          },
        })
      );
    });

    it("must be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe("when search fails", () => {
    const response = {};
    const generator = searchSaga({ payload });

    it("calls the corresponding API function", () => {
      expect(generator.next().value).toEqual(call(bookings.search, payload));
    });

    it("put SEARCH_BOOKING_FAILURE with the response", () => {
      expect(generator.next(response).value).toEqual(
        put({
          type: SEARCH_BOOKING_FAILURE,
        })
      );
    });

    it("must be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe("when exection happens", () => {
    const error = { message: "error" };
    const generator = searchSaga({ payload });

    it("calls the corresponding API function", () => {
      expect(generator.next().value).toEqual(call(bookings.search, payload));
    });

    it("put USERS_PAGE_RESET_PASSWORD_FAILURE with the response", () => {
      expect(generator.throw(error).value).toEqual(
        put({
          type: SEARCH_BOOKING_FAILURE,
        })
      );
    });

    it("must be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
