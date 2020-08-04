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

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [ORIGIN_SELECTED_DATA]: {},
      [DESTINATION_SELECTED_DATA]: {},
    };
  }

  // Can only select days after today (included) and same day as today but next year (excluded)
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

  setSelectedData = (field, { apicode, ...data }) => {
    this.setState({
      [field]: { ...this.state[field], [apicode]: data },
    });
  };

  setOriginSelectedData = data =>
    this.setSelectedData(ORIGIN_SELECTED_DATA, data);

  setDestinationSelectedData = data =>
    this.setSelectedData(DESTINATION_SELECTED_DATA, data);

  clearSelectedData = (field, apicode) => {
    const newState = this.state[field];
    delete newState[apicode];
    this.setState({
      [field]: newState,
    });
  };

  clearOriginSelectedData = apicode =>
    this.clearSelectedData(ORIGIN_SELECTED_DATA, apicode);

  clearDestinationSelectedData = apicode =>
    this.clearSelectedData(DESTINATION_SELECTED_DATA, apicode);

  handleSubmit = e => {
    const { search, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        search(values);
      }
    });
  };

  handleSwapAirfields = () => {
    const {
      form: { getFieldValue, resetFields, setFieldsValue },
    } = this.props;
    const origin = getFieldValue("origin");
    const destination = getFieldValue("destination");
    resetFields(["origin", "destination"]);
    setTimeout(() => {
      setFieldsValue({ origin: destination, destination: origin });
      this.setState({
        [ORIGIN_SELECTED_DATA]: this.state[DESTINATION_SELECTED_DATA],
        [DESTINATION_SELECTED_DATA]: this.state[ORIGIN_SELECTED_DATA],
      });
    }, 300);
    this.handleClearResults();
  };

  handleClearResults = () => this.props.clear();

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

    const travelersAmount = generatePassengerSelectorLabel(passengers).amount;

    const shouldDisableSwapButton =
      !origin ||
      origin.length === 0 ||
      !destination ||
      destination.length === 0 ||
      isSearching;

    const shouldDisableSearchButton =
      travelersAmount === 0 ||
      !passengers ||
      !date ||
      shouldDisableSwapButton ||
      isSearching;

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

const mapStateToProps = ({ bookings: { bookings, isSearching } }) => ({
  bookings,
  isSearching,
});

const mapDispatchToProps = dispatch => {
  return {
    search: payload => {
      dispatch(search(payload));
    },
    clear: payload => {
      dispatch(clear(payload));
    },
  };
};

PassengersSelector.propTypes = {
  search: PropTypes.func,
  form: PropTypes.object,
  clear: PropTypes.func,
  isSearching: PropTypes.bool,
  bookings: PropTypes.array,
};

export default Form.create({})(
  connect(mapStateToProps, mapDispatchToProps)(BookingForm)
);
