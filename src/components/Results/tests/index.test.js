import React from "react";
import renderer from "react-test-renderer";
import Result from "../index";

it("render as expected when is loading", () => {
  const tree = renderer.create(<Result isLoading results={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("render as expected when status is online", () => {
  const tree = renderer
    .create(<Result results={[{ id: 1, label: "Result1" }]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
