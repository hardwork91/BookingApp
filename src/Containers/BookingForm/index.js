import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Form, Row, Button, Tooltip, DatePicker } from "antd";
import DropdownSelect from "../../components/DropdownSelect";
import PassengersSelector from "../../components/PassengersSelector";
import { PASSENGERS_INITIAL_VALUE } from "../../components/PassengersSelector/constants";
import AirfieldSearcher from "../../components/AirfieldSearcher";
import { generatePassengerSelectorLabel } from "../../components/PassengersSelector/utils";
import Results from "../../components/Results";
import { search, clear } from "./actions";
import {
  TOOLTIP_DELAY,
  ORIGIN_SELECTED_DATA,
  DESTINATION_SELECTED_DATA,
  ROUND_TRIP,
  FLIGHT_TYPES,
  ECONOMY,
  TRAVEL_CLASES,
} from "./constants";

const { RangePicker } = DatePicker;

export class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // those variables are used for store the selected options in each airport select, origin and destination
      [ORIGIN_SELECTED_DATA]: {},
      [DESTINATION_SELECTED_DATA]: {},
    };
  }

  // User can only select a range of days between today (included) and same day of next year (excluded)
  getDisabledTime = current => {
    return (
      current &&
      (current < moment().subtract(1, "d") ||
        current >
          moment()
            .add(1, "y")
            .subtract(1, "d"))
    );
  };

  // update the selected element in the state in the correct airport input
  setSelectedData = (field, { apicode, ...data }) => {
    this.setState({
      [field]: { ...this.state[field], [apicode]: data },
    });
  };

  // update the selected element in the state in origin airport input
  setOriginSelectedData = data =>
    this.setSelectedData(ORIGIN_SELECTED_DATA, data);

  // update the selected element in the state in destination airport input
  setDestinationSelectedData = data =>
    this.setSelectedData(DESTINATION_SELECTED_DATA, data);

  // same as set function but removing the deselected airport
  clearSelectedData = (field, apicode) => {
    const newState = this.state[field];
    delete newState[apicode];
    this.setState({
      [field]: newState,
    });
  };

  // same as set function but removing the deselected airport in origin airport input
  clearOriginSelectedData = apicode =>
    this.clearSelectedData(ORIGIN_SELECTED_DATA, apicode);

  // same as set function but removing the deselected airport in destination airport input
  clearDestinationSelectedData = apicode =>
    this.clearSelectedData(DESTINATION_SELECTED_DATA, apicode);

  // handle the submission request and dispatch the search booking request action
  handleSubmit = e => {
    const { search, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        search(values);
      }
    });
  };

  // swap the orign and destination selected airports
  handleSwapAirfields = () => {
    const {
      form: { getFieldValue, resetFields, setFieldsValue },
    } = this.props;
    const origin = getFieldValue("origin");
    const destination = getFieldValue("destination");
    resetFields(["origin", "destination"]);
    // a delay is used to help to finish the fade in/out animation
    setTimeout(() => {
      setFieldsValue({ origin: destination, destination: origin });
      // swap the state value too
      this.setState({
        [ORIGIN_SELECTED_DATA]: this.state[DESTINATION_SELECTED_DATA],
        [DESTINATION_SELECTED_DATA]: this.state[ORIGIN_SELECTED_DATA],
      });
    }, 300);
    // as the origin and destination values changed, the search booking results must be cleared
    this.handleClearResults();
  };

  // dispatch the clear result request action
  handleClearResults = () => this.props.clear();

  // render the upper panel
  renderFlightSelectionPanel = () => {
    const {
      isSearching,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Row type="flex" justify="start">
        <Form.Item>
          {getFieldDecorator("flightType", {
            initialValue: ROUND_TRIP,
          })(
            <DropdownSelect
              title="Flight type"
              options={FLIGHT_TYPES}
              disabled={isSearching}
              handleClearResults={this.handleClearResults}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("passengers", {
            initialValue: PASSENGERS_INITIAL_VALUE,
          })(
            <PassengersSelector
              disabled={isSearching}
              handleClearResults={this.handleClearResults}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("travelClass", {
            initialValue: ECONOMY,
          })(
            <DropdownSelect
              title="Travel class"
              options={TRAVEL_CLASES}
              disabled={isSearching}
              handleClearResults={this.handleClearResults}
            />
          )}
        </Form.Item>
      </Row>
    );
  };

  // render the lower panel
  renderOriginDestinationPanel = () => {
    const {
      isSearching,
      form: { getFieldDecorator, getFieldsValue },
    } = this.props;
    const { passengers, origin, destination, date } = getFieldsValue([
      "passengers",
      "origin",
      "destination",
      "date",
    ]);

    // obtain how many passenger has been selected
    const travelersAmount = generatePassengerSelectorLabel(passengers).amount;

    // should disable the swaping button if is searching airfields or both origin and destination fields are empty
    const shouldDisableSwapButton =
      isSearching ||
      ((!origin || origin.length === 0) &&
        (!destination || destination.length === 0));

    // should disable search booking button if is searching, has 0 travelers selected, does has a selected date range
    // or does not have an origin and destination selected
    const shouldDisableSearchButton =
      isSearching ||
      travelersAmount === 0 ||
      !date ||
      !origin ||
      origin.length === 0 ||
      !destination ||
      destination.length === 0;

    return (
      <Row>
        <Form.Item style={{ marginRight: 5 }}>
          {getFieldDecorator("origin", {
            initialValue: [],
          })(
            <AirfieldSearcher
              placeholder="From?"
              selectedData={this.state[ORIGIN_SELECTED_DATA]}
              setSelectedData={this.setOriginSelectedData}
              clearSelectedData={this.clearOriginSelectedData}
              disabled={isSearching}
              handleClearResults={this.handleClearResults}
              isOrigin
            />
          )}
        </Form.Item>
        <Tooltip
          title="Swap origin and destination"
          mouseEnterDelay={TOOLTIP_DELAY}
        >
          <Button
            disabled={shouldDisableSwapButton}
            icon="swap"
            onClick={this.handleSwapAirfields}
            style={{ margin: "4px 5px 0 0" }}
          />
        </Tooltip>
        <Form.Item style={{ marginRight: 5 }}>
          {getFieldDecorator("destination", {
            initialValue: [],
          })(
            <AirfieldSearcher
              placeholder="Where?"
              selectedData={this.state[DESTINATION_SELECTED_DATA]}
              setSelectedData={this.setDestinationSelectedData}
              clearSelectedData={this.clearDestinationSelectedData}
              disabled={isSearching}
              handleClearResults={this.handleClearResults}
            />
          )}
        </Form.Item>
        <Form.Item style={{ marginRight: 5 }}>
          {getFieldDecorator(
            "date",
            {}
          )(
            <RangePicker
              disabledDate={this.getDisabledTime}
              format="ddd, MM/DD"
              placeholder={["Departure Date", "Return Date"]}
              disabled={isSearching}
              onChange={this.handleClearResults}
            />
          )}
        </Form.Item>
        <Form.Item style={{ marginRight: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={shouldDisableSearchButton}
            loading={isSearching}
            icon="search"
          />
        </Form.Item>
      </Row>
    );
  };

  render() {
    const { bookings, isSearching } = this.props;

    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          style={{
            padding: "5px 20px 14px 20px",
            borderRadius: 5,
            boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          {this.renderFlightSelectionPanel()}
          {this.renderOriginDestinationPanel()}
        </Form>
        <Row type="flex" justify="start">
          <Results results={bookings} isLoading={isSearching} />
        </Row>
      </div>
    );
  }
}

// exported just for testing
export const mapStateToProps = ({ bookings: { bookings, isSearching } }) => ({
  bookings,
  isSearching,
});

// exported just for testing
export const mapDispatchToProps = dispatch => {
  return {
    search: payload => {
      dispatch(search(payload));
    },
    clear: payload => {
      dispatch(clear(payload));
    },
  };
};

// prop types validation
BookingForm.propTypes = {
  search: PropTypes.func,
  form: PropTypes.object,
  clear: PropTypes.func,
  isSearching: PropTypes.bool,
  bookings: PropTypes.array,
};

export default Form.create({})(
  connect(mapStateToProps, mapDispatchToProps)(BookingForm)
);
