import airfields from "../airfields";

jest.mock("axios", () => ({
  get: () => "get",
}));

it("when searching airports", () => {
  expect(airfields.search("a")).toEqual("get");
});
