import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import toJson from "enzyme-to-json";
import PassengersSelector from "../index";
import { PASSENGERS_INITIAL_VALUE, CHILD } from "../constants";

configure({ adapter: new Adapter() });

const setup = props => ({
  value: PASSENGERS_INITIAL_VALUE,
  onChange: jest.fn(),
  handleClearResults: jest.fn(),
  ...props,
});

describe("PassengersSelector", () => {
  it("render as expected", () => {
    const tree = mount(<PassengersSelector {...setup()} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("when handleVisibleChange", () => {
    const tree = mount(<PassengersSelector {...setup()} />);
    tree.instance().handleVisibleChange(true);
    expect(tree.state().visible).toBeTruthy();
  });

  it("when handleAmountChange", () => {
    const props = setup();
    const tree = mount(<PassengersSelector {...props} />);
    tree.instance().handleAmountChange(CHILD, 1);
    expect(props.onChange).toBeCalled();
    expect(props.handleClearResults).toBeCalled();
  });

  it("when handleOnClick", () => {
    const tree = mount(<PassengersSelector {...setup()} />);
    const preventDefault = jest.fn();
    tree.instance().handleOnClick({ preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
