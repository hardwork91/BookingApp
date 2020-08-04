import { call, put } from "redux-saga/effects";
import airfields from "../../../lib/api/airfields";
import { searchSaga } from "../saga";
import {
  SEARCH_AIRFIELD_REQUEST,
  SEARCH_AIRFIELD_SUCCESS,
  SEARCH_AIRFIELD_FAILURE,
} from "../constants";

describe("searchSaga", () => {
  const payload = "a";

  describe("when search airfields succeeds", () => {
    const successResponse = {
      data: [{ apicode: "ADF" }],
    };
    const generator = searchSaga({ payload });

    it("calls the corresponding API function", () => {
      expect(generator.next().value).toEqual(call(airfields.search, payload));
    });

    it("put SEARCH_AIRFIELD_SUCCESS with the response", () => {
      expect(generator.next(successResponse).value).toEqual(
        put({
          type: SEARCH_AIRFIELD_SUCCESS,
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
      expect(generator.next().value).toEqual(call(airfields.search, payload));
    });

    it("put SEARCH_AIRFIELD_FAILURE with the response", () => {
      expect(generator.next(response).value).toEqual(
        put({
          type: SEARCH_AIRFIELD_FAILURE,
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
      expect(generator.next().value).toEqual(call(airfields.search, payload));
    });

    it("put USERS_PAGE_RESET_PASSWORD_FAILURE with the response", () => {
      expect(generator.throw(error).value).toEqual(
        put({
          type: SEARCH_AIRFIELD_FAILURE,
        })
      );
    });

    it("must be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
