import { mergeData } from "../utils";

it("when mergeData and one element exists on selectedData", () => {
  const selectedData = {
    ASP: { shortdisplayname: "Boston ASP" },
    BDS: { shortdisplayname: "Bolivia BDS" },
  };
  const data = [{ apicode: "ASP", shortdisplayname: "Boston ASP" }];
  const expectedResult = [
    { apicode: "BDS", shortdisplayname: "Bolivia BDS" },
    data[0],
  ];
  expect(mergeData(selectedData, data)).toEqual(expectedResult);
});

it("when mergeData and there are not elemnt selected from this data", () => {
  const selectedData = {
    ASP: { shortdisplayname: "Boston ASP" },
  };
  const data = [
    { apicode: "ASP", shortdisplayname: "Boston ASP" },
    { apicode: "BDS", shortdisplayname: "Bolivia BDS" },
  ];
  expect(mergeData(selectedData, data)).toEqual(data);
});
