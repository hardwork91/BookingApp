import React from "react";
import { createStore, applyMiddleware } from "redux";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { mount, configure } from "enzyme";
import toJson from "enzyme-to-json";
import appReducer from "../../../reducer";
import appSaga from "../../../saga";
import AirfieldSearcherComponent, {
  AirfieldSearcher,
  mapStateToProps,
  mapDispatchToProps,
} from "../index";
import { search, clear } from "../actions";

configure({ adapter: new Adapter() });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(appSaga);

const setup = props => ({
  value: [],
  onChange: jest.fn(),
  handleClearResults: jest.fn(),
  placeholder: "From",
  selectedData: {
    ASP: { shortdisplayname: "Boston ASP" },
    BDS: { shortdisplayname: "Bolivia BDS" },
  },
  isSearching: false,
  search: jest.fn(),
  setSelectedData: jest.fn(),
  airfields: [
    { apicode: "ASP", shortdisplayname: "Boston ASP" },
    { apicode: "BDS", shortdisplayname: "Bolivia BDS" },
  ],
  clear: jest.fn(),
  clearSelectedData: jest.fn(),
  onChange: jest.fn(),
  handleClearResults: jest.fn(),
  ...props,
});

describe("AirfieldSearcher", () => {
  describe("render as expected", () => {
    it("when conected component", () => {
      const tree = mount(
        <Provider store={store}>
          <AirfieldSearcherComponent {...setup()} />
        </Provider>
      );
      expect(toJson(tree)).toMatchSnapshot();
    });

    it("when has selected the max number of airports allowed", () => {
      const tree = mount(
        <AirfieldSearcher {...setup({ value: ["ASD", "NFV", "MMD"] })} />
      );
      expect(toJson(tree)).toMatchSnapshot();
    });

    it("when is searching", () => {
      const tree = mount(
        <AirfieldSearcher {...setup({ isSearching: true })} />
      );
      expect(toJson(tree)).toMatchSnapshot();
    });
  });

  describe("when handleSearch", () => {
    it("when has input value", () => {
      const props = setup();
      const tree = mount(<AirfieldSearcher {...props} />);
      const value = "a";
      tree.instance().handleSearch(value);
      expect(props.search).toBeCalledWith(value);
    });

    it("when has input value", () => {
      const props = setup();
      const tree = mount(<AirfieldSearcher {...props} />);
      tree.instance().handleSearch();
      expect(props.search).not.toBeCalled();
    });
  });

  it("when hanldeSelect", () => {
    const props = setup();
    const tree = mount(<AirfieldSearcher {...props} />);
    const option = "ASP";
    tree.instance().hanldeSelect(option);
    expect(props.setSelectedData).toBeCalledWith({
      apicode: "ASP",
      shortdisplayname: "Boston ASP",
    });
  });

  it("when hanldeDeselect", () => {
    const props = setup();
    const tree = mount(<AirfieldSearcher {...props} />);
    const option = "option1";
    tree.instance().hanldeDeselect(option);
    expect(props.clearSelectedData).toBeCalled();
  });

  it("when handleChange", () => {
    const props = setup();
    const tree = mount(<AirfieldSearcher {...props} />);
    const selectedOptions = [];
    tree.instance().handleChange(selectedOptions);
    expect(props.onChange).toBeCalledWith(selectedOptions);
    expect(props.handleClearResults).toBeCalled();
  });

  it("when mapStateToProps", () => {
    const airfields = {
      airfields: [],
      isSearching: false,
    };
    expect(mapStateToProps({ airfields })).toMatchSnapshot(airfields);
  });

  it("when mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).search("a");
    expect(dispatch.mock.calls[0][0]).toEqual(search("a"));
    mapDispatchToProps(dispatch).clear();
    expect(dispatch.mock.calls[1][0]).toEqual(clear());
  });
});
