import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import toJson from "enzyme-to-json";
import DropdownSelect from "../index";

configure({ adapter: new Adapter() });

const setup = props => ({
  options: [{ key: "1" }],
  title: "Travel Class",
  handleClearResults: jest.fn(),
  ...props,
});

describe("DropdownSelect", () => {
  it("render as expected", () => {
    const tree = mount(<DropdownSelect {...setup()} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("when handleSelect", () => {
    const props = setup({ onChange: jest.fn() });
    const tree = mount(<DropdownSelect {...props} />);
    const key = "1";
    tree.instance().handleSelect({ key });
    expect(tree.state().value).toEqual(key);
    expect(props.onChange).toBeCalled();
    expect(props.handleClearResults).toBeCalled();
  });

  it("when handleOnClick", () => {
    const tree = mount(<DropdownSelect {...setup()} />);
    const preventDefault = jest.fn();
    tree.instance().handleOnClick({ preventDefault });
    expect(preventDefault).toBeCalled();
  });
});
