import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import toJson from "enzyme-to-json";
import AmountSelector from "../AmountSelector";
import { CHILD } from "../constants";

configure({ adapter: new Adapter() });

const setup = props => ({
  category: CHILD,
  onChange: jest.fn(),
  amount: 2,
  ...props,
});

describe("AmountSelector", () => {
  it("render as expected", () => {
    const tree = mount(<AmountSelector {...setup()} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("when handleChange", () => {
    const props = setup();
    const tree = mount(<AmountSelector {...props} />);
    const value = 4;
    tree.instance().handleChange(value);
    expect(props.onChange).toBeCalledWith(CHILD, value);
  });
});
