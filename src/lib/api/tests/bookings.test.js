import bookings, { promise } from "../bookings";

it("when searching results", () => {
  const returnValue = new Promise(promise);

  expect(bookings.search()).toEqual(returnValue);
});
