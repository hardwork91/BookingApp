import React, { Component } from "react";
import moment from "moment";
import { Form, Row, Icon, Button, Tooltip, DatePicker } from "antd";
import DropdownSelect from "../../components/DropdownSelect";
import PassengersSelector from "../../components/PassengersSelector";
import { PASSENGERS_INITIAL_VALUE } from "../../components/PassengersSelector/constants";
import AirfieldSearcher from "../../components/AirfieldSearcher";
import { generatePassengerSelectorLabel } from "../../components/PassengersSelector/utils";
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

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

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
    console.log("DOING SUBMIT");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue, getFieldsValue },
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
      destination.length === 0;
    const shouldDisableSearchButton =
      travelersAmount === 0 || !passengers || !date || shouldDisableSwapButton;

    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={{
          padding: "10px 7px 16px 25px",
          backgroundColor: "aliceblue",
        }}
      >
        <Row type="flex" justify="start">
          <Form.Item>
            {getFieldDecorator("flightType", {
              rules: [
                { required: true, message: "Please select a flight type!" },
              ],
              initialValue: ROUND_TRIP,
            })(<DropdownSelect title="Flight type" options={FLIGHT_TYPES} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("passengers", {
              rules: [
                {
                  required: true,
                  message: "Please select a number of passengers!",
                },
              ],
              initialValue: PASSENGERS_INITIAL_VALUE,
            })(<PassengersSelector />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("travelClass", {
              rules: [
                { required: true, message: "Please select a travel class!" },
              ],
              initialValue: ECONOMY,
            })(<DropdownSelect title="Travel class" options={TRAVEL_CLASES} />)}
          </Form.Item>
        </Row>
        <Row type="flex" justify="start" style={{}}>
          <Form.Item>
            {getFieldDecorator("origin", {
              rules: [{ required: true, message: "Please select an origin!" }],
              initialValue: [],
            })(
              <AirfieldSearcher
                placeholder="From?"
                selectedData={this.state[ORIGIN_SELECTED_DATA]}
                setSelectedData={this.setOriginSelectedData}
                clearSelectedData={this.clearOriginSelectedData}
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
              style={{ margin: "4px 16px 0 0" }}
            />
          </Tooltip>
          <Form.Item>
            {getFieldDecorator("destination", {
              rules: [
                { required: true, message: "Please select a destination!" },
              ],
              initialValue: [],
            })(
              <AirfieldSearcher
                placeholder="Where?"
                selectedData={this.state[DESTINATION_SELECTED_DATA]}
                setSelectedData={this.setDestinationSelectedData}
                clearSelectedData={this.clearDestinationSelectedData}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("date", {
              rules: [
                {
                  required: true,
                  message: "Please select departure and return date!",
                },
              ],
            })(
              <RangePicker
                disabledDate={this.getDisabledTime}
                format="ddd, MM/DD"
                placeholder={["Departure Date", "Return Date"]}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={shouldDisableSearchButton}
              icon="search"
            >
              Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }
}

export default Form.create({})(BookingForm);
