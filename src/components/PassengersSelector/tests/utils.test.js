import React from "react";
import renderer from "react-test-renderer";
import { generatePassengerSelectorLabel } from "../utils";

it("when generatePassengerSelectorLabel", () => {
  const passengers = { Child: 0, Adults: 1 };
  const tree = renderer
    .create(generatePassengerSelectorLabel(passengers).label)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("when generatePassengerSelectorLabel and have more than one category selected", () => {
  const passengers = { Child: 3, Adults: 1 };
  const label = generatePassengerSelectorLabel(passengers).label;
  const tree = renderer.create(label).toJSON();
  expect(tree).toMatchSnapshot();
});

// it("when generatePassengerSelectorLabel and does not have any pssenger selected", () => {
//   const passengers = { Child: 0, Adults: 0 };
//   const label = generatePassengerSelectorLabel(passengers).label;
//   const tree = renderer
//     .create(
//       <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//         {label}
//       </a>
//     )
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
