import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import toJson from "enzyme-to-json";
import { generatePassengerSelectorLabel } from "../utils";

configure({ adapter: new Adapter() });

it("when generatePassengerSelectorLabel", () => {
  const passengers = { Child: 0, Adults: 1 };
  const label = generatePassengerSelectorLabel(passengers).label;
  const tree = mount(<div>{label}</div>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("when generatePassengerSelectorLabel and have more than one category selected", () => {
  const passengers = { Child: 3, Adults: 1 };
  const label = generatePassengerSelectorLabel(passengers).label;
  const tree = mount(
    <div>{generatePassengerSelectorLabel(passengers).label}</div>
  );
  expect(toJson(tree)).toMatchSnapshot();
});

it("when generatePassengerSelectorLabel and does not have any pssenger selected", () => {
  const passengers = { Child: 0, Adults: 0 };
  const label = generatePassengerSelectorLabel(passengers).label;
  const tree = mount(
    <div>{generatePassengerSelectorLabel(passengers).label}</div>
  );
  expect(toJson(tree)).toMatchSnapshot();
});
